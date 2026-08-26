# Awesome Cross-Origin Storage (COS) [![Awesome](https://awesome.re/badge.svg)](https://awesome.re)

> A curated list of resources for the [Cross-Origin Storage (COS) API](https://github.com/WICG/cross-origin-storage), a proposed Web platform API that lets sites store and retrieve large, content-addressed resources, such as AI models, WebAssembly runtimes, Web fonts, and shared libraries, from a shared, cross-origin storage bucket keyed by the SHA-256 hash of a file's bytes, so the same bytes don't need to be downloaded again for every origin that uses them. See the Standardization section below for background.

<p align="center">
  <img src="cos-logo.png" width="120" alt="Cross-Origin Storage icon">
</p>

Cross-Origin Storage is content-addressed, not name-addressed: `navigator.crossOriginStorage.requestFileHandle(hash)` looks up an entry by the hash of its bytes, so any origin that stores or requests identical bytes resolves to the same entry regardless of the URL it came from. There's no traditional browser permission prompt. Instead, access is controlled at write time via an `origins` option: same-site only by default, an explicit list of allowed origins, or `'*'` for global availability, and visibility can only become more permissive later, never less.

For privacy, a second, independent gate controls whether the browser discloses that a resource exists to a *different* origin at all. Only entries on the Public Hash List (PHL), a shared, vendor-neutral allowlist of well-known resources (popular libraries, fonts, WebAssembly runtimes, AI models) that meet a minimum cross-origin popularity (k-anonymity) threshold, can be truthfully reported as present to a requesting origin; everything else returns `NotFoundError`, the same error used when a file is genuinely absent, so cache state can't be probed cross-origin. Browsers may also randomly return `NotFoundError` for files that do qualify ("GREASE'ing"), except where the file is large enough that a spurious re-download would be disproportionate to the privacy benefit.

The API isn't shipped in any browser yet. The projects below currently build against a browser extension (see Implementations below) that polyfills `navigator.crossOriginStorage.requestFileHandle()`, `origins`-based access control, and a PHL gate backed by a live, community-maintained hash list (see Public Hash List below); the exact gating behavior is still evolving along with the spec. Besides the imperative JS API, the spec also proposes declarative integration via a `crossoriginstorage` attribute on HTML `<link>`/`<script>`, a `crossOriginStorage` import attribute for JS module imports, and a new `<cross-origin-storage>` request-url-modifier usable inside CSS `url()`, for example in `@font-face`. A fourth integration covers the imperative case: a `crossOriginStorage` option on `fetch()`'s `RequestInit`.

## Contents

- [Implementations](#implementations)
- [Prototype Browser Implementations](#prototype-browser-implementations)
- [Public Hash List](#public-hash-list)
- [Demos](#demos)
- [Tools](#tools)
- [Standardization](#standardization)
- [Related](#related)

## Implementations

Projects that have added opt-in Cross-Origin Storage support, typically as a progressive enhancement layered on top of the extension below.

- [Cross-Origin Storage Extension (Chrome)](https://chromewebstore.google.com/detail/cross-origin-storage/denpnpcgjgikjpoglpjefakmdcbmlgih) - Browser extension that polyfills the proposed API by injecting `navigator.crossOriginStorage.requestFileHandle()` into every page. ([source](https://github.com/web-ai-community/cross-origin-storage-extension))
- [Cross-Origin Storage Extension (Firefox)](https://addons.mozilla.org/en-US/firefox/addon/cross-origin-storage/) - Browser extension that polyfills the proposed API by injecting `navigator.crossOriginStorage.requestFileHandle()` into every page. Same source as the Chrome extension above.
- [Cross-Origin Storage Extension (Safari)](https://apps.apple.com/app/cross-origin-storage/id6788319695) - Browser extension that polyfills the proposed API by injecting `navigator.crossOriginStorage.requestFileHandle()` into every page. Same source as the Chrome extension above.
- [Emscripten](https://emscripten.org/docs/compiling/CrossOriginStorage.html) - Adds Cross-Origin Storage support for sharing generated WebAssembly files. ([PR](https://github.com/emscripten-core/emscripten/pull/27066))
- [Flutter](https://github.com/flutter/flutter/issues/181433#issuecomment-4361950100) - Adds Cross-Origin Storage support for sharing the Skia WebAssembly runtime. ([PR](https://github.com/flutter/flutter/pull/184149))
- [Prompt API Polyfill](https://www.npmjs.com/package/prompt-api-polyfill) - Polyfills the Prompt API (`LanguageModel`); shares the AI model via Cross-Origin Storage when its [WebLLM backend](https://github.com/GoogleChromeLabs/web-ai-demos/blob/190f209c0f993b9abc6d530d33f40849cc11b70b/prompt-api-polyfill/backends/webllm.js#L59-L60) or [Transformers.js backend](https://github.com/GoogleChromeLabs/web-ai-demos/blob/190f209c0f993b9abc6d530d33f40849cc11b70b/prompt-api-polyfill/backends/transformers.js#L32-L33) is enabled. ([source](https://github.com/GoogleChromeLabs/web-ai-demos/tree/main/prompt-api-polyfill))
- [Transformers.js](https://huggingface.co/docs/transformers.js/api/env#envtransformersenvironment--object) - Adds Cross-Origin Storage support for sharing AI models and WebAssembly runtimes. ([PR](https://github.com/huggingface/transformers.js/pull/1549))
- [WebLLM](https://webllm.mlc.ai/docs/user/advanced_usage.html#using-cross-origin-storage-cache) - Adds Cross-Origin Storage support for sharing AI models and WebAssembly runtimes. ([PR](https://github.com/mlc-ai/web-llm/pull/748))
- [wllama](https://github.com/ngxson/wllama/pull/248) - Adds Cross-Origin Storage support for sharing AI models.

## Prototype Browser Implementations

Native (non-polyfilled) implementations of Cross-Origin Storage in browser engines, ready for testing. Unofficial personal forks, not yet upstreamed.

- [Chromium](https://chromium-review.googlesource.com/c/chromium/src/+/8256403) - Prototype implementation in Chromium, as a work-in-progress Gerrit CL rather than a GitHub fork. ([binaries](https://github.com/tomayac/Chromium/releases))
- [Firefox](https://github.com/tomayac/firefox) - Prototype implementation in Firefox. ([binaries](https://github.com/tomayac/firefox/releases))
- [Ladybird](https://github.com/tomayac/ladybird) - Prototype implementation in the Ladybird browser engine. ([binaries](https://github.com/tomayac/ladybird/releases))
- [Servo](https://github.com/tomayac/servo) - Prototype implementation in the Servo browser engine. ([binaries](https://github.com/tomayac/servo/releases))
- [WebKit](https://github.com/tomayac/WebKit) - Prototype implementation in the WebKit browser engine. ([binaries](https://github.com/tomayac/WebKit/releases))

## Public Hash List

Infrastructure behind the PHL availability-gating allowlist described above.

- [Explainer](https://github.com/WICG/cross-origin-storage/blob/main/public-hash-list/phl-explainer.md) - Design document for the Public Hash List: motivation, objective, and the target governance end state (a dedicated, cross-vendor repository under the WHATWG).
- [WICG/cross-origin-storage/public-hash-list/implementation](https://github.com/WICG/cross-origin-storage/tree/main/public-hash-list/implementation) - Generates the Public Hash List: gathers SHA-256 hashes of widely-deployed files from popular CDN catalogs, npm popularity rankings, and HTTP Archive crawl data (hashes must appear on at least 100 independent origins to qualify), plus hand-curated AI model and manual-addition sections, and publishes the result as a flat, Public-Suffix-List-style allowlist. ([data file](https://github.com/WICG/cross-origin-storage/blob/main/public-hash-list/implementation/data/public-hash-list.dat))

## Demos

Working examples of Cross-Origin Storage sharing real-world assets between unrelated origins.

- [Declarative integrations](https://github.com/web-ai-community/cross-origin-storage-extension#supported-integrations) - Documented, working code samples for all four ways to use Cross-Origin Storage: the imperative JS API, the CSS `cross-origin-storage()` function, the declarative HTML `crossoriginstorage` attribute, and declarative JS import attributes.
- [ffmpeg.wasm](https://tomayac.github.io/ffmpeg.wasm/apps/hello-world/) - Shares the FFmpeg WebAssembly binary across origins. ([source](https://github.com/tomayac/ffmpeg.wasm/blob/main/packages/util/src/index.ts), [PR](https://github.com/ffmpegwasm/ffmpeg.wasm/pull/940))
- [Google Fonts](https://tomayac.github.io/google-fonts-cos/index.html) - Shares Google Fonts files across origins. ([source](https://github.com/tomayac/google-fonts-cos/), [embed code generator](https://tomayac.github.io/google-fonts-cos/generator.html))
- [React](https://github.com/tomayac/react-app-cos) - Shares the React library across origins using the [Vite plugin cross-origin storage](https://github.com/danielroe/cross-origin-storage).
- [SQLite Wasm](https://chrome.dev/sqlite-wasm-cos/) - Shares `sqlite3.wasm` across origins. ([source](https://github.com/GoogleChrome/samples/tree/gh-pages/sqlite-wasm-cos))
- [Three.js Quake](https://web-ai-community.github.io/three-quake/) & [Three.js Descent](https://tomayac.github.io/three-descent/) - Two browser games that share the Three.js library between them using the [Vite plugin cross-origin storage](https://github.com/danielroe/cross-origin-storage). ([Quake source](https://github.com/tomayac/three-quake), [Descent source](https://github.com/tomayac/three-descent))
- [WebNN Samples](https://tomayac.github.io/webnn-samples/) & [WebNN Samples mirror](https://web-ai-community.github.io/webnn-samples/) - Two deployments of the WebNN sample suite that share AI model weights between them. Each model's individual `.npy` tensor files are packed into one content-addressed bundle, so a model fetched by one deployment loads from Cross-Origin Storage on the other. ([source](https://github.com/tomayac/webnn-samples), [mirror source](https://github.com/web-ai-community/webnn-samples))

## Tools

- [@types/wicg-cross-origin-storage](https://www.npmjs.com/package/@types/wicg-cross-origin-storage) - TypeScript type definitions for the proposed API. ([source](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/wicg-cross-origin-storage))
- [cos-resource-fetcher](https://github.com/GoogleChromeLabs/web-ai-demos/tree/main/cos-resource-fetcher) - Fetches large resource blobs, such as model weights and WebAssembly files, via Cross-Origin Storage when available, automatically falling back to the [Cache API](https://developer.mozilla.org/en-US/docs/Web/API/Cache).
- [npm-sha256-hash-fetcher](https://github.com/tomayac/npm-sha256-hash-fetcher) - Zero-dependency library that fetches the latest resolved version and SHA-256 file hashes for npm packages via the jsDelivr API, for computing the hashes Cross-Origin Storage needs.
- [Vite plugin cross-origin storage](https://github.com/danielroe/cross-origin-storage) - Vite plugin that bundles vendor chunks, such as React or Three.js, into separate vendor chunks and automatically injects a loader script that fetches them from Cross-Origin Storage.

## Standardization

- [Explainer](https://github.com/WICG/cross-origin-storage/blob/main/README.md) - The WICG explainer for the Cross-Origin Storage API, covering motivation and use cases.
- [Spec](https://wicg.github.io/cross-origin-storage/) - The rendered Cross-Origin Storage API spec draft.
- [W3C TAG Design Review](https://github.com/w3ctag/design-reviews/issues/1254) - Early incubation review of Cross-Origin Storage by the W3C Technical Architecture Group.
- [CSS Working Group issue](https://github.com/w3c/csswg-drafts/issues/14056) - Proposal for the `<cross-origin-storage>` request-url-modifier used in CSS `url()`.
- [WHATWG HTML issue: `crossoriginstorage` attribute](https://github.com/whatwg/html/issues/12770) - Proposal to add the `crossoriginstorage` attribute to `<link>` and `<script>`.
- [WHATWG HTML issue: `crossOriginStorage` import attribute](https://github.com/whatwg/html/issues/12771) - Proposal to add the `crossOriginStorage` import attribute for JS module imports.
- [WHATWG Fetch issue: `crossOriginStorage` request option](https://github.com/whatwg/fetch/issues/1954) - Proposal to add a `crossOriginStorage` option to `RequestInit`, so imperative `fetch()` calls can opt into Cross-Origin Storage alongside `integrity`.
- [`web-features` entry request](https://github.com/web-platform-dx/web-features/issues/4029) - Request to add Cross-Origin Storage as a tracked feature in the `web-features` project.
- [Web Platform Tests PR](https://github.com/web-platform-tests/wpt/pull/61811) - Adds cross-browser interoperability tests for the Cross-Origin Storage API.
- [Chromium umbrella bug](https://crbug.com/547587764) - Tracks Chromium implementation work for Cross-Origin Storage. ([subtasks](https://crbug.com/547587764/dependencies))
- [Intent to Prototype](https://groups.google.com/a/chromium.org/g/blink-dev/c/p5nq70aN63o/m/uNm_oaEOBQAJ) - Blink-dev thread announcing Chromium's intent to prototype Cross-Origin Storage.
- [Cross-Origin Storage on Chrome Platform Status](https://chromestatus.com/feature/5163371507875840) - Tracks the feature's implementation status in Chrome.
- [Mozilla Standards Position](https://github.com/mozilla/standards-positions/issues/1427) - Mozilla's standards position request for Cross-Origin Storage.
- [WebKit Standards Position](https://github.com/WebKit/standards-positions/issues/703) - WebKit's standards position request for Cross-Origin Storage.

## Related

- [Experimenting with the proposed Cross-Origin Storage API in Transformers.js](https://huggingface.co/blog/cross-origin-storage) - Hugging Face blog post on using Cross-Origin Storage to share large AI model files and WebAssembly runtimes across origins, by Thomas Steiner.
- [Working Draft podcast: Cross-Origin Storage API – Caching über Origins hinweg, mit Thomas Steiner](https://workingdraft.de/723/) - Podcast episode about Cross-Origin Storage, with Thomas Steiner. In German.

## Contributing

Contributions welcome! Read the [contribution guidelines](contributing.md) first.

This work is licensed under a [CC0 1.0 Universal](license.md) license.
