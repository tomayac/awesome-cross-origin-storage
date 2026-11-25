# Cross-Origin Storage usage on GitHub

Scanned 2026-11-25. 1476 files matched the search. After dropping vendored libraries, agent skills, 10 copies, and 4 repositories that only carry IDL generated from [webref](https://github.com/w3c/webref), 21 repositories use the new API, 8 only the old one, and 32 only link to the specification. 🆕 marks repositories not seen in the previous run, which also appear in the [RSS feed](usage-report.xml).

## `getFileHandle()`

### Code

- [DefinitelyTyped/DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) (★51492, pushed 2026-11-25): The repository for high quality TypeScript type definitions.
  - [types/wicg-cross-origin-storage/wicg-cross-origin-storage-tests.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/aad73e323a660cef014c092a0898b961f16ec933/types/wicg-cross-origin-storage/wicg-cross-origin-storage-tests.ts) (code, also old API)
  - [types/wicg-cross-origin-storage/index.d.ts](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/aad73e323a660cef014c092a0898b961f16ec933/types/wicg-cross-origin-storage/index.d.ts) (code, also old API)
- [emscripten-core/emscripten](https://github.com/emscripten-core/emscripten) (★27794, pushed 2026-11-25): Emscripten: An LLVM-to-WebAssembly Compiler
  - [src/preamble.js](https://github.com/emscripten-core/emscripten/blob/26fa03e2ad5aba9a2be222c83cc980824fa3c0b1/src/preamble.js) (code)
  - [site/source/docs/compiling/CrossOriginStorage.rst](https://github.com/emscripten-core/emscripten/blob/26fa03e2ad5aba9a2be222c83cc980824fa3c0b1/site/source/docs/compiling/CrossOriginStorage.rst) (docs or mention)
- [chromium/chromium](https://github.com/chromium/chromium) (★25431, pushed 2026-11-25): The official GitHub mirror of the Chromium source
  - [content/browser/cross_origin_storage/cross_origin_storage_browsertest.cc](https://github.com/chromium/chromium/blob/ded55eab6ec8a7c3a4c2fc3fee434835a5451668/content/browser/cross_origin_storage/cross_origin_storage_browsertest.cc) (code, also old API)
  - [content/browser/cross_origin_storage/cross_origin_storage_manager_impl.h](https://github.com/chromium/chromium/blob/ded55eab6ec8a7c3a4c2fc3fee434835a5451668/content/browser/cross_origin_storage/cross_origin_storage_manager_impl.h) (code)
- [apache/tvm](https://github.com/apache/tvm) (★13924, pushed 2026-11-24): Open Machine Learning Compiler Framework
  - [web/src/artifact_cache.ts](https://github.com/apache/tvm/blob/1091f2fc97187bdef99272cb2c598dc3dd572d7c/web/src/artifact_cache.ts) (code)
- [ngxson/wllama](https://github.com/ngxson/wllama) (★1412, pushed 2026-11-23): WebAssembly binding for llama.cpp - Enabling on-browser LLM inference
  - [src/storage/cos.ts](https://github.com/ngxson/wllama/blob/c87585843be05973f1fd82b53d28659c45e1c41a/src/storage/cos.ts) (code)
- [software-mansion/popcorn](https://github.com/software-mansion/popcorn) (★788, pushed 2026-11-25): Running Elixir in the browser
  - [popcorn/js/src/assets.ts](https://github.com/software-mansion/popcorn/blob/7be8a130cc592ba2996b330ad09a5ba2ed94d310/popcorn/js/src/assets.ts) (code)
  - [popcorn/js/e2e/runtime.spec.ts](https://github.com/software-mansion/popcorn/blob/7be8a130cc592ba2996b330ad09a5ba2ed94d310/popcorn/js/e2e/runtime.spec.ts) (test)
- [danielroe/cross-origin-storage](https://github.com/danielroe/cross-origin-storage) (★35, pushed 2026-11-25): Load shared dependencies from Cross-Origin Storage (COS).
  - [packages/vite-plugin-cross-origin-storage/src/loader.ts](https://github.com/danielroe/cross-origin-storage/blob/3ae4b1d2c0a6fb9ccd3ecf70143c31b4300b75b3/packages/vite-plugin-cross-origin-storage/src/loader.ts) (code)
  - [packages/vite-plugin-cross-origin-storage/test/browser.test.ts](https://github.com/danielroe/cross-origin-storage/blob/3ae4b1d2c0a6fb9ccd3ecf70143c31b4300b75b3/packages/vite-plugin-cross-origin-storage/test/browser.test.ts) (test)
- [narcotic-sh/parakeet.wgsl](https://github.com/narcotic-sh/parakeet.wgsl) (★19, pushed 2026-11-04): Port of NVIDIA's Parakeet TDT 0.6B V2 model in raw WebGPU + SIMD WASM
  - [src/model-cache.ts](https://github.com/narcotic-sh/parakeet.wgsl/blob/3e1844ff18a3216bc29ad7077b759de9705559e6/src/model-cache.ts) (code)
  - [test/model-cache.test.ts](https://github.com/narcotic-sh/parakeet.wgsl/blob/3e1844ff18a3216bc29ad7077b759de9705559e6/test/model-cache.test.ts) (test)
  - [test/model-cache-invariants.test.ts](https://github.com/narcotic-sh/parakeet.wgsl/blob/3e1844ff18a3216bc29ad7077b759de9705559e6/test/model-cache-invariants.test.ts) (test)
- [FireTable/project-xiaochun](https://github.com/FireTable/project-xiaochun) (★7, pushed 2026-11-22): 100% browser-native anime VTuber — local LLM (WebLLM Qwen3) + EMAGE full-body motion + Edge-TTS. Real-time chat with VRM characters, no backend.
  - [packages/web-runtime/src/artifact_cache.ts](https://github.com/FireTable/project-xiaochun/blob/0cabca463744f3833c59c70fe6febdbf9906fba3/packages/web-runtime/src/artifact_cache.ts) (code)
- [adelpro/quranlm](https://github.com/adelpro/quranlm) (★1, pushed 2026-11-18): QuranLM is a browser-side AI companion for the Quran, built on top of LiteRT-LM — Google's in-browser LLM runtime powered by WebGPU. A Gemma model runs entirely on your device: every prompt, every response, every Quran search happens locally. Nothing leaves your machine, nothing is logged.
  - [src/services/cross-origin-storage.ts](https://github.com/adelpro/quranlm/blob/961821772b047ef9511323463016ce1ad41c606e/src/services/cross-origin-storage.ts) (code, also old API)
  - [src/vite-env.d.ts](https://github.com/adelpro/quranlm/blob/961821772b047ef9511323463016ce1ad41c606e/src/vite-env.d.ts) (code, also old API)
- [ykoh42/web-llm-adapters](https://github.com/ykoh42/web-llm-adapters) (★0, pushed 2026-11-13): WebLLM adapters for AI agent frameworks.
  - [examples/strands-web-llm/browser/src/engine/load.ts](https://github.com/ykoh42/web-llm-adapters/blob/a98dc93ab8c158a3dc632461c890e958ce313e91/examples/strands-web-llm/browser/src/engine/load.ts) (code)

### Docs or mention

- [huggingface/blog](https://github.com/huggingface/blog) (★3575, pushed 2026-11-25): Public repo for HF blog posts
  - [cross-origin-storage.md](https://github.com/huggingface/blog/blob/b8fb20d7f84d2470779f40a53fea5015d85b22bc/cross-origin-storage.md) (docs or mention)
- [cybozu/frontend-monthly](https://github.com/cybozu/frontend-monthly) (★15, pushed 2026-11-20)
  - [src/content/posts/2026/11.md](https://github.com/cybozu/frontend-monthly/blob/062509a7a4c52763ddd227bfce0508b9cdc7885d/src/content/posts/2026/11.md) (docs or mention)
- [kripken/emscripten-site](https://github.com/kripken/emscripten-site) (★14, pushed 2026-11-21): Emscripten website
  - [_sources/docs/compiling/CrossOriginStorage.rst.txt](https://github.com/kripken/emscripten-site/blob/504dbc5c4e2bc07a5f871adb441ec3a423b270e9/_sources/docs/compiling/CrossOriginStorage.rst.txt) (docs or mention)
  - [docs/compiling/CrossOriginStorage.html](https://github.com/kripken/emscripten-site/blob/504dbc5c4e2bc07a5f871adb441ec3a423b270e9/docs/compiling/CrossOriginStorage.html) (docs or mention)
- [speced/bikeshed-data](https://github.com/speced/bikeshed-data) (★11, pushed 2026-11-25): Bikeshed datafiles and scripts to update them.
  - [data/anchors/anchors-cr.data](https://github.com/speced/bikeshed-data/blob/7b16eb36243bf7c91eeb6b17f0848fbe269c2134/data/anchors/anchors-cr.data) (docs or mention)
  - [data/anchors/anchors-ha.data](https://github.com/speced/bikeshed-data/blob/7b16eb36243bf7c91eeb6b17f0848fbe269c2134/data/anchors/anchors-ha.data) (docs or mention)
  - [data/anchors/anchors-ge.data](https://github.com/speced/bikeshed-data/blob/7b16eb36243bf7c91eeb6b17f0848fbe269c2134/data/anchors/anchors-ge.data) (docs or mention)
- [ahmadalfy/blog](https://github.com/ahmadalfy/blog) (★4, pushed 2026-11-17): Source code for alfy.me
  - [_posts/2026-08-31-cross-origin-storage.md](https://github.com/ahmadalfy/blog/blob/14cd0e1f92a5ddb0cc1b798e8889eda01cc28ded/_posts/2026-08-31-cross-origin-storage.md) (docs or mention)
- 🆕 [eqrion/webidl-index](https://github.com/eqrion/webidl-index) (★1, pushed 2026-11-23)
  - [data/snapshots/blink/157.json](https://github.com/eqrion/webidl-index/blob/9380e19b14725988fef44cbeb5a972ecf095413f/data/snapshots/blink/157.json) (docs or mention)
  - [data/snapshots/blink/158.json](https://github.com/eqrion/webidl-index/blob/9380e19b14725988fef44cbeb5a972ecf095413f/data/snapshots/blink/158.json) (docs or mention)
- [foolip/spec-stats](https://github.com/foolip/spec-stats) (★0, pushed 2026-11-25)
  - [data/github/whatwg/html/issues/12770/index.json](https://github.com/foolip/spec-stats/blob/c170a38fcdbb91aecc65c46fb6c28c0e42d49366/data/github/whatwg/html/issues/12770/index.json) (docs or mention)
  - [data/github/whatwg/html/issues/12771/index.json](https://github.com/foolip/spec-stats/blob/c170a38fcdbb91aecc65c46fb6c28c0e42d49366/data/github/whatwg/html/issues/12771/index.json) (docs or mention)
  - [data/github/whatwg/fetch/issues/1954/index.json](https://github.com/foolip/spec-stats/blob/c170a38fcdbb91aecc65c46fb6c28c0e42d49366/data/github/whatwg/fetch/issues/1954/index.json) (docs or mention)
- [klaaay/weekly-gen](https://github.com/klaaay/weekly-gen) (★0, pushed 2026-11-25)
  - [outputs/2026-11-19_frontendfoc_Frontend_Focus_Issue_767_summary.md](https://github.com/klaaay/weekly-gen/blob/671b178d9ae45431bd26742b4f89ccae5cc5ce4e/outputs/2026-11-19_frontendfoc_Frontend_Focus_Issue_767_summary.md) (docs or mention)
  - [outputs/2026-11-18_javascriptweekly_JavaScript_Weekly_Issue_811_summary.md](https://github.com/klaaay/weekly-gen/blob/671b178d9ae45431bd26742b4f89ccae5cc5ce4e/outputs/2026-11-18_javascriptweekly_JavaScript_Weekly_Issue_811_summary.md) (docs or mention)
- [sakupi01/csswg-llm-wiki-raw](https://github.com/sakupi01/csswg-llm-wiki-raw) (★0, pushed 2026-11-24): Raw-data mirror layer for csswg-llm-wiki (CSSWG primary sources)
  - [github/csswg-drafts/issues/14xxx/14056.md](https://github.com/sakupi01/csswg-llm-wiki-raw/blob/19e7b887778f35dbb71120c0e11ff5e14a0b1b85/github/csswg-drafts/issues/14xxx/14056.md) (docs or mention)
- [wuhy80/llm-news-tracker](https://github.com/wuhy80/llm-news-tracker) (★0, pushed 2026-11-25): 大模型行业落地、Agent 技术、模型发布与评测的日/周/月静态情报站
  - [data/articles/2026/06/23/2fa0e37477dd.json](https://github.com/wuhy80/llm-news-tracker/blob/ab26e62875adc432908b264d0efbb922e67e49e5/data/articles/2026/06/23/2fa0e37477dd.json) (docs or mention)

## Old API (`requestFileHandle()`)

### Code

- [huggingface/transformers.js](https://github.com/huggingface/transformers.js) (★16457, pushed 2026-11-25): State-of-the-art Machine Learning for the web. Run 🤗 Transformers directly in your browser, with no need for a server!
  - [packages/transformers/src/utils/cache/CrossOriginStorageCache.js](https://github.com/huggingface/transformers.js/blob/890e398f3fe99e52e855ffc4f2c81fccbe762dd5/packages/transformers/src/utils/cache/CrossOriginStorageCache.js) (code)
  - [packages/transformers/src/utils/cache/cross-origin-storage.d.ts](https://github.com/huggingface/transformers.js/blob/890e398f3fe99e52e855ffc4f2c81fccbe762dd5/packages/transformers/src/utils/cache/cross-origin-storage.d.ts) (code)
- [koneb71/vikado](https://github.com/koneb71/vikado) (★2, pushed 2026-11-09): Free, open-source, local-first web video editor with server-side MP4 export
  - [web/.pnpm-store/v11/files/1c/f6500752f827735d8f7ebb1372df9d1ecf84c9ab8527e9ce94235d1d8668973261c07392d3dbfd7482c771150657706dbd5c6ec98b39e09cca18896a8f6b6d](https://github.com/koneb71/vikado/blob/d339f6aea6adf7b0a85dd731f4c8b55d2585915e/web/.pnpm-store/v11/files/1c/f6500752f827735d8f7ebb1372df9d1ecf84c9ab8527e9ce94235d1d8668973261c07392d3dbfd7482c771150657706dbd5c6ec98b39e09cca18896a8f6b6d) (code)
  - [web/.pnpm-store/v11/files/94/874140900f4bc9e2a1182e5a8ece440fb6985623c133ea73f4958fdcc76e5a8b9f9891b5fa517151fb814e19cb74621635366342e47e23995d0aea1e34781c](https://github.com/koneb71/vikado/blob/d339f6aea6adf7b0a85dd731f4c8b55d2585915e/web/.pnpm-store/v11/files/94/874140900f4bc9e2a1182e5a8ece440fb6985623c133ea73f4958fdcc76e5a8b9f9891b5fa517151fb814e19cb74621635366342e47e23995d0aea1e34781c) (code)

### Docs or mention

- [rockbenben/free-llm-intel](https://github.com/rockbenben/free-llm-intel) (★67, pushed 2026-11-25): AI 厂商动态别挨家追：每天巡检 OpenAI、Claude、Gemini、DeepSeek、通义、Kimi 等的官方博客与更新页，生成可订阅的 RSS，英文原文逐段精译为中文，并附 70 家免费额度 / 限时活动总表（实时抓自官方页、带官方链接可复核）
  - [docs/articles/huggingface/2e297cf400e7.md](https://github.com/rockbenben/free-llm-intel/blob/8c40a361b6418e1883075edb728a9b71948af17c/docs/articles/huggingface/2e297cf400e7.md) (docs or mention)
  - [docs/articles/huggingface/2e297cf400e7.en.md](https://github.com/rockbenben/free-llm-intel/blob/8c40a361b6418e1883075edb728a9b71948af17c/docs/articles/huggingface/2e297cf400e7.en.md) (docs or mention)
- [Hugging-Face-KREW/hugging-face-krew.github.io](https://github.com/Hugging-Face-KREW/hugging-face-krew.github.io) (★6, pushed 2026-11-25): Hugging Face KREW Blog
  - [_posts/2026-06-23-cross-origin-storage.md](https://github.com/Hugging-Face-KREW/hugging-face-krew.github.io/blob/b7e15bb830a5e99db1045e0682d196c5a2e0d6b4/_posts/2026-06-23-cross-origin-storage.md) (docs or mention)
- [aitobox/ATBInsight](https://github.com/aitobox/ATBInsight) (★0, pushed 2026-11-25): Decoding the future of AI, line by line.
  - [docs/blog/posts/2026-08-07-在 Transformers.js 中体验提议中的跨域存储 API.md](https://github.com/aitobox/ATBInsight/blob/506a6d7a2c270a7fbec6a95b99b2f4b3e6b3ac4d/docs/blog/posts/2026-08-07-在 Transformers.js 中体验提议中的跨域存储 API.md) (docs or mention)
- [flutter-zl/web-triage](https://github.com/flutter-zl/web-triage) (★0, pushed 2026-11-18): weekly web-triage
  - [weekly-log/2026-08-05.md](https://github.com/flutter-zl/web-triage/blob/f6311fbac4b5a44d08c1d73542db4481abe62292/weekly-log/2026-08-05.md) (docs or mention)
  - [weekly-log/2026-07-08.md](https://github.com/flutter-zl/web-triage/blob/f6311fbac4b5a44d08c1d73542db4481abe62292/weekly-log/2026-07-08.md) (docs or mention)
  - [weekly-log/2026-07-22.md](https://github.com/flutter-zl/web-triage/blob/f6311fbac4b5a44d08c1d73542db4481abe62292/weekly-log/2026-07-22.md) (docs or mention)
- [gtcode-dot-com/l](https://github.com/gtcode-dot-com/l) (★0, pushed 2026-11-21): gtcode-dot-com.github.io
  - [hugo-site/content/news/ai-research/experimenting-with-the-proposed-cross-origin-storage-api-in-transformers-js/index.md](https://github.com/gtcode-dot-com/l/blob/487ca78e77c7cf9918c8b6f21f58200225d653a4/hugo-site/content/news/ai-research/experimenting-with-the-proposed-cross-origin-storage-api-in-transformers-js/index.md) (docs or mention)
- [jasonrdsouza/gazette](https://github.com/jasonrdsouza/gazette) (★0, pushed 2026-11-25): Personal newspaper service
  - [editions/20260831.json](https://github.com/jasonrdsouza/gazette/blob/41b9fdb8af91672dea58e2089fc366953a411a8a/editions/20260831.json) (docs or mention)

## Links to the specification only

### Code

- [aih/uscode-redesign](https://github.com/aih/uscode-redesign) (★2, pushed 2026-11-24): Prototype to re-build and a new and redesigned uscode.house.gov
  - [frontend/src/pages/about.astro](https://github.com/aih/uscode-redesign/blob/3f1697b02e5d2376caa2022fe465bbad7f2f2d8a/frontend/src/pages/about.astro) (code)

### Test

- [pmeenan/ai-skills](https://github.com/pmeenan/ai-skills) (★1, pushed 2026-11-14): Collection of skills I use for working with AI tools
  - [chromium-code-review/scripts/tests/test_phase_brief_and_profile.py](https://github.com/pmeenan/ai-skills/blob/9c94e0e42f036bfbfa26d90ebf47cab96d264c4e/chromium-code-review/scripts/tests/test_phase_brief_and_profile.py) (test)

### Docs or mention

- [mlc-ai/web-llm](https://github.com/mlc-ai/web-llm) (★19406, pushed 2026-11-20): High-performance In-browser LLM Inference Engine 
  - [examples/cache-usage/README.md](https://github.com/mlc-ai/web-llm/blob/df83db6cb05bd78daf0cb1afd8c5da550c4a7c6e/examples/cache-usage/README.md) (docs or mention)
  - [examples/README.md](https://github.com/mlc-ai/web-llm/blob/df83db6cb05bd78daf0cb1afd8c5da550c4a7c6e/examples/README.md) (docs or mention)
  - [README.md](https://github.com/mlc-ai/web-llm/blob/df83db6cb05bd78daf0cb1afd8c5da550c4a7c6e/README.md) (docs or mention)
- [abpframework/abp](https://github.com/abpframework/abp) (★14471, pushed 2026-11-25): Open-source web application framework for ASP.NET Core! Offers an opinionated architecture to build enterprise software solutions with best practices on top of the .NET. Provides the fundamental infrastructure, cross-cutting-concern implementations, startup templates, application modules, UI themes, tooling and documentation.
  - [docs/en/Community-Articles/2026-06-01-DevDays-Conf-2026-From-a-Speakers-View/Post.md](https://github.com/abpframework/abp/blob/58a24ad90afe7580c4734510c5e05627885de66c/docs/en/Community-Articles/2026-06-01-DevDays-Conf-2026-From-a-Speakers-View/Post.md) (docs or mention)
- [w3c/browser-specs](https://github.com/w3c/browser-specs) (★340, pushed 2026-11-25): A machine-readable list of Web specifications
  - [specs.json](https://github.com/w3c/browser-specs/blob/6fe8532be65b76219febd22995bb36fb8edd886e/specs.json) (docs or mention)
- [specinfra/specref](https://github.com/specinfra/specref) (★173, pushed 2026-11-25): An open-source, community-maintained database of Web standards & related references.
  - [refs/browser-specs.json](https://github.com/specinfra/specref/blob/252a9a31092fb63478148b95e441c40513e939e0/refs/browser-specs.json) (docs or mention)
- [miantiao-me/github-stars](https://github.com/miantiao-me/github-stars) (★120, pushed 2026-11-21): A Cloudflare-powered MCP (Model Context Protocol) Server that allows you to search and query your GitHub starred repositories using natural language.
  - [stars/mlc-ai/web-llm.md](https://github.com/miantiao-me/github-stars/blob/e07f28efeb757c41223cc3766ecebda8c9cbfddf/stars/mlc-ai/web-llm.md) (docs or mention)
- [prebid/prebid.github.io](https://github.com/prebid/prebid.github.io) (★86, pushed 2026-11-23): Repo that controls Prebid.org website
  - [download.md](https://github.com/prebid/prebid.github.io/blob/b20c83d5f4a623854b540d6907c97b40ec065e27/download.md) (docs or mention)
- [JinDX/htmlspecs.com](https://github.com/JinDX/htmlspecs.com) (★34, pushed 2026-11-25): HTML 及相关 API，CSS 标准系列，HTTP 标准系列 🌐📡
  - [README.md](https://github.com/JinDX/htmlspecs.com/blob/548d951422b321fb2ec75f3460d4a932e120f3df/README.md) (docs or mention)
- [explainers-by-googlers/decisions-api](https://github.com/explainers-by-googlers/decisions-api) (★32, pushed 2026-11-24): An explainer exploring fast, type-safe, on-device ML decisions, classification, scoring, and ranking
  - [README.md](https://github.com/explainers-by-googlers/decisions-api/blob/5ce6e10a81f766efaec670282696c0c57ba2de50/README.md) (docs or mention)
- [webmachinelearning/meetings](https://github.com/webmachinelearning/meetings) (★32, pushed 2026-11-16): 🗒 Agendas, minutes and other meeting material
  - [telcons/2026-08-27-wg-agenda.md](https://github.com/webmachinelearning/meetings/blob/8c172be0a035b76abe2086dff377ccb224dbcf6f/telcons/2026-08-27-wg-agenda.md) (docs or mention)
  - [2026-10-26-dublin/README.md](https://github.com/webmachinelearning/meetings/blob/8c172be0a035b76abe2086dff377ccb224dbcf6f/2026-10-26-dublin/README.md) (docs or mention)
- [JinDX/jp.htmlspecs.com](https://github.com/JinDX/jp.htmlspecs.com) (★25, pushed 2026-11-25): HTML および関連 API、CSS 仕様シリーズ、HTTP 仕様シリーズ 🌐📡
  - [README.md](https://github.com/JinDX/jp.htmlspecs.com/blob/03dd64cae47464734dea761f9ed82efd59d55466/README.md) (docs or mention)
- [WebPerformanceReport/wpr-perf-links](https://github.com/WebPerformanceReport/wpr-perf-links) (★16, pushed 2026-11-21): Curated links about Web Performance, used in the Perf Links section of WebPerformance Report.
  - [2026/perf-links.md](https://github.com/WebPerformanceReport/wpr-perf-links/blob/f0d8bebc1eb94488853bab2a1c09eee9a069c62b/2026/perf-links.md) (docs or mention)
  - [2026/perf-links.json](https://github.com/WebPerformanceReport/wpr-perf-links/blob/f0d8bebc1eb94488853bab2a1c09eee9a069c62b/2026/perf-links.json) (docs or mention)
- [WICG/wicg.github.io](https://github.com/WICG/wicg.github.io) (★14, pushed 2026-11-01)
  - [tracking.html](https://github.com/WICG/wicg.github.io/blob/942958c1509c6d879971656e13b14cc51bc8e835/tracking.html) (docs or mention)
  - [tracking.json](https://github.com/WICG/wicg.github.io/blob/942958c1509c6d879971656e13b14cc51bc8e835/tracking.json) (docs or mention)
- [reclear-io/llmref](https://github.com/reclear-io/llmref) (★13, pushed 2026-11-21): Open, versioned documentation and semantic search for AI coding tools
  - [registry/web-llm/2026.07.02/llms-full.txt](https://github.com/reclear-io/llmref/blob/89c4b44d2b614054693460e2fcbf02d2df6fee4c/registry/web-llm/2026.07.02/llms-full.txt) (docs or mention)
- [w3c/groups](https://github.com/w3c/groups) (★12, pushed 2026-11-25): Complement to https://www.w3.org/groups/
  - [cg/wicg/repositories.json](https://github.com/w3c/groups/blob/03d115538a65f35758098a2aecf1d4788c7f13d3/cg/wicg/repositories.json) (docs or mention)
- [jnjaeschke/webspec-index](https://github.com/jnjaeschke/webspec-index) (★10, pushed 2026-11-11): Indexes whatwg specs and provides access as mcp server
  - [data/w3c_specs.json](https://github.com/jnjaeschke/webspec-index/blob/a8a94f6f770cfa491367a1b57a85ee9e9ae07e2b/data/w3c_specs.json) (docs or mention)
- [JinDX/ko.htmlspecs.com](https://github.com/JinDX/ko.htmlspecs.com) (★6, pushed 2026-11-25): HTML 및 관련 API, CSS 표준 시리즈, HTTP 표준 시리즈 🌐📡  
  - [README.md](https://github.com/JinDX/ko.htmlspecs.com/blob/efed4828f4edb42e3f62980395735cf214275d3b/README.md) (docs or mention)
- [w3c-cg/pm-kr](https://github.com/w3c-cg/pm-kr) (★5, pushed 2026-11-25): The same knowledge (a character, a formula, a concept) is duplicated dozens of times across the web — in fonts, embeddings, accessibility metadata, visual assets — maintained separately, drifting apart. PM-KR standardizes storing knowledge once as executable procedures, consumable by both humans and AI from a single source.
  - [glossary/README.md](https://github.com/w3c-cg/pm-kr/blob/e47269c346218bce47463fa5116ce7abfa7fd947/glossary/README.md) (docs or mention)
- [bakkot/matrix-logs](https://github.com/bakkot/matrix-logs) (★4, pushed 2026-11-25): logs for tc39's matrix channels
  - [docs/WHATWG/2026-08-26.html](https://github.com/bakkot/matrix-logs/blob/5286b5cf9ca4a5741a429dc7211d9f9cd0a895f4/docs/WHATWG/2026-08-26.html) (docs or mention)
  - [docs/WHATWG/plaintext/2026-08.txt](https://github.com/bakkot/matrix-logs/blob/5286b5cf9ca4a5741a429dc7211d9f9cd0a895f4/docs/WHATWG/plaintext/2026-08.txt) (docs or mention)
  - [json/WHATWG/2026-08-26.json](https://github.com/bakkot/matrix-logs/blob/5286b5cf9ca4a5741a429dc7211d9f9cd0a895f4/json/WHATWG/2026-08-26.json) (docs or mention)
- [edtechdev/notes](https://github.com/edtechdev/notes) (★3, pushed 2026-11-23): Logseq tagged links
  - [journals/2026_06_25.md](https://github.com/edtechdev/notes/blob/eed1ce7ec7c712bee70c30cb5fb2c8efd2cf2d9c/journals/2026_06_25.md) (docs or mention)
  - [journals/2026_07_03.md](https://github.com/edtechdev/notes/blob/eed1ce7ec7c712bee70c30cb5fb2c8efd2cf2d9c/journals/2026_07_03.md) (docs or mention)
- [eduardoworrel/state-of-the-art-webai](https://github.com/eduardoworrel/state-of-the-art-webai) (★2, pushed 2026-11-24): A community map and awesome list of the WebAI stack: from choosing a model to running it in the browser. EN/PT.
  - [README.md](https://github.com/eduardoworrel/state-of-the-art-webai/blob/3add764d6cf6ad43bfea8396daeae37355ddaa13/README.md) (docs or mention)
  - [README.pt.md](https://github.com/eduardoworrel/state-of-the-art-webai/blob/3add764d6cf6ad43bfea8396daeae37355ddaa13/README.pt.md) (docs or mention)
  - [data/layers.yml](https://github.com/eduardoworrel/state-of-the-art-webai/blob/3add764d6cf6ad43bfea8396daeae37355ddaa13/data/layers.yml) (docs or mention)
- [francisreubenr-rvu/sih26171-dhristi](https://github.com/francisreubenr-rvu/sih26171-dhristi) (★2, pushed 2026-09-23): SIH26171 DHRISTI. Current project master plus the local Warden branch. Not submission ready.
  - [Raw/domain/webllm-readme.txt](https://github.com/francisreubenr-rvu/sih26171-dhristi/blob/8b2298e4c28f3c730509439a9464f2c0706206c7/Raw/domain/webllm-readme.txt) (docs or mention)
- [farre/webspec-tracer](https://github.com/farre/webspec-tracer) (★1, pushed 2026-08-12): Firefox extension for creating traces from web specifications
  - [assets/w3c_specs.json](https://github.com/farre/webspec-tracer/blob/f5d333db93dfb08cd36bb9d1f0ea7e0cb0e83dea/assets/w3c_specs.json) (docs or mention)
- [az9713/transformer.js-tutorial](https://github.com/az9713/transformer.js-tutorial) (★0, pushed 2026-06-08): A zero-to-hero deep-dive tutorial for Hugging Face Transformers.js, with an interactive WebGPU explainer
  - [docs/reference/env-settings.md](https://github.com/az9713/transformer.js-tutorial/blob/c5a83b786fc860a4e2e77ac1f717644e5e749e89/docs/reference/env-settings.md) (docs or mention)
- [frederico-kluser/som-webcore](https://github.com/frederico-kluser/som-webcore) (★0, pushed 2026-11-24): Infraestrutura open-source de inferência WebGPU/Wasm32 em passada única para Condicionais Abstratas (JEV) no navegador. RFC/blueprint + memória CoALA.
  - [docs/standards/prior-art.md](https://github.com/frederico-kluser/som-webcore/blob/fd15709a4ca9a6bad25942e958ac82da67e331eb/docs/standards/prior-art.md) (docs or mention)
- [guileen/mioa-core](https://github.com/guileen/mioa-core) (★0, pushed 2026-11-12): Shared Mioa runtime core and headless control service
  - [tests/standards/catalog.json](https://github.com/guileen/mioa-core/blob/dc714a844652684d9e29a4676d91fc1dd745f784/tests/standards/catalog.json) (docs or mention)
- [hazadus/bluesky-reader](https://github.com/hazadus/bluesky-reader) (★0, pushed 2026-11-24): Архив моей ленты Bluesky с посуточной разбивкой для удобного чтения с любого устройства.
  - [feeds/2026-06-17.md](https://github.com/hazadus/bluesky-reader/blob/0195bf128b45a6893ee07752b60814cf869e2332/feeds/2026-06-17.md) (docs or mention)
  - [feeds/2026-09-28.md](https://github.com/hazadus/bluesky-reader/blob/0195bf128b45a6893ee07752b60814cf869e2332/feeds/2026-09-28.md) (docs or mention)
  - [feeds/2026-06-27.md](https://github.com/hazadus/bluesky-reader/blob/0195bf128b45a6893ee07752b60814cf869e2332/feeds/2026-06-27.md) (docs or mention)
- [hazadus/mastodon-reader](https://github.com/hazadus/mastodon-reader) (★0, pushed 2026-11-25): Мои ежедневные ленты Mastodon в формате Markdown для удобного чтения
  - [feeds/2026-06-27.md](https://github.com/hazadus/mastodon-reader/blob/51d3981275bec8ee3c6d5c6faad72e8053e18ab8/feeds/2026-06-27.md) (docs or mention)
  - [feeds/2026-06-26.md](https://github.com/hazadus/mastodon-reader/blob/51d3981275bec8ee3c6d5c6faad72e8053e18ab8/feeds/2026-06-26.md) (docs or mention)
  - [feeds/2026-06-17.md](https://github.com/hazadus/mastodon-reader/blob/51d3981275bec8ee3c6d5c6faad72e8053e18ab8/feeds/2026-06-17.md) (docs or mention)
- [Puppo/guess-who](https://github.com/Puppo/guess-who) (★0, pushed 2026-11-14): 🕵️‍♀️ Tabletop Guess Who? powered by Chrome's Built-in AI Decisions API (with local WebGPU fallback) — single-pass yes/no reasoning over character dossiers, zero cloud calls.
  - [docs/reviews/decisions-api-explainer.md](https://github.com/Puppo/guess-who/blob/c2b5d1ad2f695b969ea8d8fac2a851d5be6e521f/docs/reviews/decisions-api-explainer.md) (docs or mention)
- [srivtx/deepforge](https://github.com/srivtx/deepforge) (★0, pushed 2026-09-27): build ml from scratch  and beyond 
  - [docs/research/wave-46-candidates-e-systems.md](https://github.com/srivtx/deepforge/blob/e2c067cea9ec7f46b92e741732a12d2b4e5ee035/docs/research/wave-46-candidates-e-systems.md) (docs or mention)
- [xiaoqianran/huggingface-docs](https://github.com/xiaoqianran/huggingface-docs) (★0, pushed 2026-11-25): Hugging Face documentation mirror (Hub, Transformers, Diffusers, Datasets…)
  - [docs/pages/transformers.js/api/env.md](https://github.com/xiaoqianran/huggingface-docs/blob/1af6fb2ff8a240d954f42a14c13c9a34ace9ecd9/docs/pages/transformers.js/api/env.md) (docs or mention)
