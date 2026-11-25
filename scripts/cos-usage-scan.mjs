#!/usr/bin/env node
// SPDX-FileCopyrightText: 2026 Thomas Steiner
// SPDX-License-Identifier: Apache-2.0

// Searches GitHub code for usage of the Cross-Origin Storage API and writes a
// Markdown report that flags repositories new since the previous run.
// Repositories on the new API (`navigator.crossOriginStorage.getFileHandle()`)
// and those still only on the old one (`requestFileHandle()`) are reported in
// separate sections.
//
// Dropped along the way: forks, copies of another matching repository,
// vendored libraries and bundles, agent skills (`.agents/**`, `skills/**`),
// copies of the modern-web-guidance content, and files generated from
// `@webref/idl`. Files that only link to the specification or its repository
// are reported in a section of their own.
//
// Usage: node scripts/cos-usage-scan.mjs [--out usage-report.md] [--state file]
// The GitHub Actions workflow in `.github/workflows/usage-report.yml` runs it
// weekly and commits the report, which GitHub Pages publishes.
// Requires an authenticated `gh` CLI. The first run takes a while because
// GitHub's code search allows about 10 requests per minute. Later runs reuse
// the per-file results cached in the state file, keyed by blob SHA.

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const run = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const arg = (name, fallback) => {
  const i = process.argv.indexOf(`--${name}`);
  return i > -1 ? process.argv[i + 1] : fallback;
};
const OUT = arg('out', join(here, 'cos-usage-report.md'));
const STATE = arg('state', join(here, '.cos-usage-state.json'));

// GitHub code search caps every query at 1,000 results and often far fewer,
// so the broad term is split by language to see more files.
const QUERIES = [
  'crossOriginStorage.getFileHandle',
  'navigator.crossOriginStorage',
  '"crossOriginStorage" in navigator',
  'CROSS_ORIGIN_STORAGE',
  'crossOriginStorage.requestFileHandle',
  'crossOriginStorage.requestFileHandles',
  // Unquoted: `gh` escapes inner quotes, which breaks the query.
  'wicg.github.io/cross-origin-storage',
  'github.com/WICG/cross-origin-storage',
  ...[
    'javascript',
    'typescript',
    'html',
    'markdown',
    'python',
    'vue',
    'svelte',
    'lean',
  ].map((l) => `crossOriginStorage language:${l}`),
];

// Case-insensitive, so that WebIDL-style names such as
// `CrossOriginStorageManager.getFileHandle` match too. The window covers the
// common `const cos = navigator.crossOriginStorage; … cos.getFileHandle()`
// pattern while keeping OPFS's `FileSystemDirectoryHandle.getFileHandle()`
// elsewhere in a file from counting.
const NEW_API =
  /crossOriginStorage[\s\S]{0,300}?getFileHandle|getFileHandle[\s\S]{0,60}?crossOriginStorage/i;
const OLD_API =
  /crossOriginStorage[\s\S]{0,300}?requestFileHandles?\b|requestFileHandles?\b[\s\S]{0,60}?crossOriginStorage/i;
const EMSCRIPTEN_OPT_IN = /CROSS_ORIGIN_STORAGE\s*=\s*(1|true)/;
const SPEC_LINK =
  /wicg\.github\.io\/cross-origin-storage|github\.com\/WICG\/cross-origin-storage/i;
const GENERATED = /generated|do not edit/i;
// The modern-web-guidance content (GoogleChrome/modern-web-guidance-src and
// the skills built from it) travels under these guide and feature slugs.
const GUIDANCE =
  /modern-web-guidance|avoid-redundant-large-asset-downloads|load-shared-resources-declaratively|tmp-cross-origin-storage|pending-web-features/i;

const API_LABELS = {
  new: 'New API (`getFileHandle()`)',
  old: 'Old API (`requestFileHandle()`)',
  link: 'Links to the specification only',
};
const KINDS = ['code', 'test', 'Emscripten opt-in', 'docs or mention'];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Waits until GitHub's rate limits have room again. Primary limits report
// their reset time. Secondary limits do not, so those back off by attempt.
async function waitForRateLimit(attempt) {
  let until = Date.now() + 60_000 * (attempt + 1);
  try {
    const { stdout } = await run('gh', ['api', 'rate_limit']);
    const exhausted = Object.values(JSON.parse(stdout).resources).filter(
      (r) => r.remaining === 0,
    );
    if (exhausted.length)
      until = Math.max(...exhausted.map((r) => r.reset * 1_000)) + 5_000;
  } catch {}
  console.error(
    `rate limited, waiting ${Math.round((until - Date.now()) / 1_000)}s`,
  );
  await sleep(Math.max(until - Date.now(), 5_000));
}

async function gh(args, { raw = false } = {}) {
  for (let attempt = 0; attempt < 8; attempt++) {
    try {
      const { stdout } = await run('gh', args, { maxBuffer: 64 * 1024 * 1024 });
      return raw ? stdout : JSON.parse(stdout);
    } catch (err) {
      const msg = String(err.stderr || err.message);
      // Only rate limits and server errors are worth waiting out. Any other
      // 403, such as a token that may not search code, fails at once.
      if (/rate limit|HTTP 429/i.test(msg)) {
        await waitForRateLimit(attempt);
        continue;
      }
      if (/HTTP 5\d\d/.test(msg)) {
        await sleep(30_000 * (attempt + 1));
        continue;
      }
      if (/404|Not Found/i.test(msg)) return null;
      throw err;
    }
  }
  // Giving up silently would publish a partial report.
  throw new Error(`gh ${args.join(' ')} kept failing`);
}

// Pages through code search one request at a time, so that a rate limit only
// repeats the page it hit. The search API returns at most 1,000 results.
async function searchCode(q) {
  const hits = [];
  for (let page = 1; page <= 10; page++) {
    const res = await gh([
      'api',
      '-X',
      'GET',
      'search/code',
      '-f',
      `q=${q}`,
      '-F',
      'per_page=100',
      '-F',
      `page=${page}`,
    ]);
    for (const i of res.items)
      hits.push({
        repository: { nameWithOwner: i.repository.full_name },
        path: i.path,
        url: i.html_url,
        sha: i.sha,
      });
    await sleep(7_000);
    if (res.items.length < 100 || hits.length >= res.total_count) break;
  }
  return hits;
}

const rawFile = (repo, path) =>
  gh(
    [
      'api',
      '-H',
      'Accept: application/vnd.github.raw',
      `repos/${repo}/contents/${path.split('/').map(encodeURIComponent).join('/')}`,
    ],
    { raw: true },
  );

// A file counts as a bundle when it is large or minified, or names a library
// known to ship Cross-Origin Storage support near its top. Emscripten is left
// out on purpose: its glue code only calls the API when a project opts in with
// `-sCROSS_ORIGIN_STORAGE`, which makes such a file real usage.
function looksBundled(text) {
  if (text.length > 150_000) return true;
  if (text.length / text.split('\n').length > 400) return true;
  return /\bwllama\b|tvmjs/i.test(text.slice(0, 2_000));
}

// Returns the kind of a matched file, or `null` for files the report drops.
// The path decides first, since prose and data files often embed `<script>`
// snippets. Only then does the content get a say.
function classify(path, text) {
  const p = path.toLowerCase();
  const name = p.split('/').pop();
  if (/(^|\/)(\.agents|skills)\//.test(p)) return null;
  // WebIDL files are copies of the spec's IDL, as synced by webref into
  // web-platform-tests and the like. Paths naming webref hold its data.
  if (/\.idl$/.test(name) || /(^|\/)webref\//.test(p)) return null;
  if (GUIDANCE.test(p) || GUIDANCE.test(text.slice(0, 5_000))) return null;
  if (
    /(^|\/)(vendor|vendored|third_party|node_modules|libs?|dist|runtimes?)\//.test(
      p,
    ) ||
    /\.(bundle|min)\.[cm]?js$/.test(name) ||
    /wllama|tvmjs/.test(name)
  )
    return null;
  if (/\.(md|mdx|rst|txt|json|ya?ml|csv|xml|data)$/.test(name))
    return 'docs or mention';
  if (
    /\.html?$/.test(name) &&
    (/(^|\/)(docs?|guides?|references?|articles?|posts?|news|content|_sources|names|site)\//.test(
      p,
    ) ||
      !/<script\b[^>]*>(?:(?!<\/script>)[\s\S])*crossOriginStorage/i.test(text))
  )
    return 'docs or mention';
  if (
    /(^|\/)(tests?|spec|__tests__|e2e)\//.test(p) ||
    /\.(test|spec)\.[jt]sx?$/.test(p)
  )
    return 'test';
  if (/\.[cm]?[jt]sx?$/.test(name) && looksBundled(text)) return null;
  return 'code';
}

// Repositories that build from webref: a dependency on `@webref/*`, or a
// workflow that checks out w3c/webref.
async function usesWebref(repo) {
  const pkg = await rawFile(repo, 'package.json');
  if (pkg && /"@webref\//.test(pkg)) return true;
  const workflows =
    (await gh(['api', `repos/${repo}/contents/.github/workflows`])) || [];
  for (const { path } of Array.isArray(workflows) ? workflows : []) {
    if (/webref/i.test((await rawFile(repo, path)) || '')) return true;
  }
  return false;
}

async function main() {
  const state = JSON.parse(await readFile(STATE, 'utf8').catch(() => '{}'));
  state.seen ??= [];
  state.files ??= {};
  state.webref ??= {};

  // 1. Search.
  const files = new Map();
  for (const q of QUERIES) {
    const hits = await searchCode(q);
    console.error(`${hits.length}\t${q}`);
    for (const h of hits)
      files.set(`${h.repository.nameWithOwner}/${h.path}`, h);
  }
  // An empty result would overwrite the report with nothing.
  if (!files.size) throw new Error('Code search returned no results.');

  // 2. Fetch each file, unless its blob is cached, and look for either API.
  const byRepo = new Map();
  const fileCache = {};
  let fetched = 0;
  for (const [key, { repository, path, url, sha }] of files) {
    const repo = repository.nameWithOwner;
    const cacheKey = `${key}@${sha}`;
    let info = state.files[cacheKey];
    if (!info) {
      const text = await rawFile(repo, path);
      if (++fetched % 100 === 0) console.error(`fetched ${fetched} files`);
      if (!text) continue;
      const newApi = NEW_API.test(text);
      const optIn = EMSCRIPTEN_OPT_IN.test(text);
      const oldApi = OLD_API.test(text);
      const link = SPEC_LINK.test(text);
      const head = text.slice(0, 2_000);
      info = {
        api: newApi || optIn ? 'new' : oldApi ? 'old' : link ? 'link' : null,
        kind: optIn && !newApi ? 'Emscripten opt-in' : classify(path, text),
        oldApiToo: newApi && oldApi,
        webrefHeader: /webref/i.test(head),
        generated: GENERATED.test(head),
      };
    }
    fileCache[cacheKey] = info;
    if (!info.api || !info.kind) continue;
    if (!byRepo.has(repo)) byRepo.set(repo, []);
    byRepo.get(repo).push({ path, url, ...info });
  }
  // Only the blobs seen in this run are kept, so the cache never outgrows the
  // current search results.
  state.files = fileCache;

  // 3. Drop forks and files generated from webref. Fork status comes along with
  // the metadata the report needs anyway, so it is fetched fresh.
  const candidates = [];
  let forks = 0;
  let webref = 0;
  for (const repo of [...byRepo.keys()].sort((a, b) => a.localeCompare(b))) {
    const meta = (await gh(['api', `repos/${repo}`])) || {};
    if (meta.fork) {
      forks++;
      continue;
    }
    let fs = byRepo.get(repo).filter((f) => !f.webrefHeader);
    if (fs.some((f) => f.generated || f.kind === 'docs or mention')) {
      state.webref[repo] ??= await usesWebref(repo);
      if (state.webref[repo])
        fs = fs.filter((f) => !f.generated && f.kind !== 'docs or mention');
    }
    if (!fs.length) {
      webref++;
      continue;
    }
    // A repository is listed once, under the newest API it uses.
    const api = ['new', 'old', 'link'].find((a) => fs.some((f) => f.api === a));
    candidates.push({
      repo,
      meta,
      api,
      files: fs.filter((f) => f.api === api),
    });
  }

  // Copies of a repository pushed as standalone repositories carry its files
  // at the same path, or below an extra prefix when vendored whole. Of two
  // repositories sharing a path, the one with more stars counts as the
  // original. Paths of three segments or more are specific enough to tell such
  // a copy apart from a coincidental `docs/index.md`.
  const stars = (r) => r.meta.stargazers_count || 0;
  const deep = (p) => p.split('/').length >= 3;
  const copyOf = (r) =>
    candidates.find(
      (o) =>
        o !== r &&
        (stars(o) > stars(r) ||
          (stars(o) === stars(r) && o.repo.localeCompare(r.repo) < 0)) &&
        r.files.some(
          (f) =>
            deep(f.path) &&
            o.files.some(
              (g) =>
                deep(g.path) &&
                (f.path === g.path || f.path.endsWith(`/${g.path}`)),
            ),
        ),
    );
  // A copy of a copy is reported against the original at the end of the chain.
  // `copyOf()` only ever points at a repository ranked higher, so the chain
  // ends.
  const original = (r) => {
    for (let o = copyOf(r); o; o = copyOf(o)) r = o;
    return r;
  };
  const copies = candidates
    .filter((r) => copyOf(r))
    .map((r) => ({ r, of: original(r) }));
  const external = candidates.filter((r) => !copies.some((c) => c.r === r));

  // 4. Report. Seen entries are keyed by API, so a repository that migrates
  // from the old API to the new one is flagged again.
  const seen = new Set(
    state.seen.map((s) => (s.includes(':') ? s : `new:${s}`)),
  );
  const best = (r) => Math.min(...r.files.map((f) => KINDS.indexOf(f.kind)));
  external.sort((a, b) => best(a) - best(b) || stars(b) - stars(a));
  const count = (api) => external.filter((r) => r.api === api).length;
  const lines = [
    `# Cross-Origin Storage usage on GitHub`,
    '',
    `Scanned ${new Date().toISOString().slice(0, 10)}. ${files.size} files matched the search. After dropping vendored libraries, agent skills, ${forks} forks, ${copies.length} copies, and ${webref} repositories that only carry IDL generated from webref, ${count('new')} repositories use the new API, ${count('old')} only the old one, and ${count('link')} only link to the specification. 🆕 marks repositories not seen in the previous run.`,
    '',
  ];
  for (const api of Object.keys(API_LABELS)) {
    if (!count(api)) continue;
    lines.push(`## ${API_LABELS[api]}`, '');
    for (const kind of KINDS) {
      const group = external.filter(
        (r) => r.api === api && KINDS[best(r)] === kind,
      );
      if (!group.length) continue;
      lines.push(`### ${kind[0].toUpperCase()}${kind.slice(1)}`, '');
      for (const { repo, meta, files: fs } of group) {
        const tag = seen.has(`${api}:${repo}`) ? '' : '🆕 ';
        const desc = meta.description ? `: ${meta.description}` : '';
        lines.push(
          `- ${tag}[${repo}](https://github.com/${repo}) (★${stars({ meta })}, pushed ${String(meta.pushed_at).slice(0, 10)})${desc}`,
        );
        for (const f of fs.slice(0, 3))
          lines.push(
            `  - [${f.path}](${f.url}) (${f.kind}${f.oldApiToo ? ', also old API' : ''})`,
          );
      }
      lines.push('');
    }
  }
  // Listed so the copy heuristic can be checked by eye.
  if (copies.length) {
    lines.push(
      '## Dropped as copies',
      '',
      ...copies.map(
        ({ r, of }) =>
          `- [${r.repo}](https://github.com/${r.repo}), copy of [${of.repo}](https://github.com/${of.repo})`,
      ),
      '',
    );
  }
  await mkdir(dirname(OUT), { recursive: true });
  // Repository descriptions are third-party text. GitHub Pages runs the report
  // through Jekyll, so Liquid's `{{` and `{%` are escaped.
  await writeFile(OUT, lines.join('\n').replace(/\{([{%])/g, '&#123;$1'));
  state.seen = [
    ...new Set([...seen, ...external.map((r) => `${r.api}:${r.repo}`)]),
  ];
  delete state.contrib;
  await writeFile(STATE, JSON.stringify(state, null, 2));
  console.error(`Wrote ${OUT}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
