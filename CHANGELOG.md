# Changelog

## 1.0.2

- Fixed `scoreRepo()` sending wrong field name (`repo` → `url`)
- Rewrote README: Bun-first identity, "Why Bun?" section, real examples, ecosystem footer
- Removed non-Mk4 badge (only Mk4 engine scores are valid)
- Added CHANGELOG.md
- First /pubpro protocol release

## 1.0.1

- Rewrote README: badges, API tables with return types, "What MCPaaS Does" explainer
- Bun-first install order

## 1.0.0

- Initial release: typed TypeScript SDK wrapping 15 MCPaaS endpoints
- Souls, Scoring, Directory, Tag Intel, Badges, Globe, Platform
- Zero runtime dependencies (native `fetch`)
- 19/19 tests passing against live mcpaas.live
- Reclaimed `mcpaas` npm name from radio client (now `radio-faf`)
