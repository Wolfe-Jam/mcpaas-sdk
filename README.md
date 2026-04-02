# mcpaas

[![npm](https://img.shields.io/npm/v/mcpaas)](https://www.npmjs.com/package/mcpaas)
[![MCPaaS](https://mcpaas.live/badge/Wolfe-Jam/mcpaas-sdk.svg)](https://mcpaas.live)

Typed TypeScript client for [MCPaaS](https://mcpaas.live) — the platform for AI context delivery.

Zero dependencies. Works everywhere `fetch` does: Bun, Node 18+, Deno, browsers, edge runtimes.

## Try It

```bash
bunx bun -e "import { MCPaaS } from './src'; const m = new MCPaaS(); console.log(await m.getRawSoul('spacex'))"
```

## Install

```bash
bun add mcpaas
# or
npm install mcpaas
```

## Quick Start

```typescript
import { MCPaaS } from 'mcpaas';

const m = new MCPaaS();

// Read live AI context (a "soul")
const spacex = await m.getRawSoul('spacex');
// => "SpaceX — Founded 2002 by Elon Musk..."

// Score any GitHub repo's AI-readiness
const repo = await m.scoreRepo('anthropics/claude-code');
// => { score: 72, repo: "anthropics/claude-code", language: "TypeScript", ... }

// Check if a namepoint handle is available
const check = await m.check('myhandle');
// => { handle: "myhandle", available: true, price: "$2/month" }

// Get tag intelligence across 700+ namepoints
const intel = await m.tagIntel();
// => { tags: [...], candidates: [...], merges: [...], analysed: 721 }
```

## What MCPaaS Does

MCPaaS delivers AI context at 300+ Cloudflare edges in sub-millisecond time. The platform provides:

- **Souls** — persistent AI context blocks (project DNA, personas, live data)
- **Namepoints** — claimed handles in a global directory (like DNS for AI context)
- **Scoring** — AI-readiness scores for repos and namepoints
- **Tag Intel** — pattern detection, co-occurrence analysis, and tag suggestions
- **Globe** — real-time execution stats from 300+ edge locations
- **Badges** — SVG badges for any GitHub repo's score

This SDK wraps all 15 public endpoints into typed methods with full IntelliSense.

## API Reference

### Souls

| Method | Returns | Description |
|--------|---------|-------------|
| `getSoul(name)` | `Promise<string>` | Structured soul content |
| `getRawSoul(name)` | `Promise<string>` | Plain text soul content |
| `listSouls()` | `Promise<SoulStats>` | Total count, top souls, daily operations |

### Scoring

| Method | Returns | Description |
|--------|---------|-------------|
| `score(handle)` | `Promise<ScoreResult>` | Score a namepoint (0-100) |
| `scoreRepo(repo)` | `Promise<RepoScore>` | Score a GitHub repo's AI-readiness |
| `leaderboard()` | `Promise<LeaderboardResult>` | Top and recent scored repos |

### Directory & Discovery

| Method | Returns | Description |
|--------|---------|-------------|
| `directory()` | `Promise<DirectoryResult>` | Full namepoint directory with tag index |
| `check(handle)` | `Promise<CheckResult>` | Handle availability and pricing |
| `count()` | `Promise<CountResult>` | Claimed/remaining namepoint counts |
| `discover()` | `Promise<DiscoverResult>` | Discovery feed (namepoints + souls) |

### Tag Intel

| Method | Returns | Description |
|--------|---------|-------------|
| `tagIntel()` | `Promise<TagIntelResult>` | Tag patterns, co-occurrence, candidates, merge suggestions |
| `suggestTags(handle)` | `Promise<SuggestResult>` | Suggested tags for a namepoint based on content |

### Badges

| Method | Returns | Description |
|--------|---------|-------------|
| `badge(owner, repo)` | `string` | SVG badge URL (synchronous) |

```typescript
m.badge('Wolfe-Jam', 'faf-cli')
// => "https://mcpaas.live/badge/Wolfe-Jam/faf-cli.svg"
```

### Globe

| Method | Returns | Description |
|--------|---------|-------------|
| `globe()` | `Promise<GlobeResult>` | Edge location execution stats from 300+ Cloudflare colos |

### Platform

| Method | Returns | Description |
|--------|---------|-------------|
| `health()` | `Promise<HealthResult>` | Service health + engine status |
| `info()` | `Promise<InfoResult>` | Server name and version |

## Configuration

```typescript
const m = new MCPaaS({
  baseUrl: 'https://mcpaas.live',  // default
});
```

## Error Handling

All methods throw `MCPaaSError` on non-2xx responses:

```typescript
import { MCPaaS, MCPaaSError } from 'mcpaas';

try {
  await m.getSoul('nonexistent');
} catch (e) {
  if (e instanceof MCPaaSError) {
    e.status  // 404
    e.body    // "Not found"
    e.path    // "/souls/nonexistent"
  }
}
```

## TypeScript

All response types are exported for use in your own code:

```typescript
import type { ScoreResult, DirectoryEntry, TagIntelResult } from 'mcpaas';
```

## License

MIT

## Links

- [MCPaaS Platform](https://mcpaas.live)
- [API Dashboard](https://mcpaas.live/souls/stats)
- [GitHub](https://github.com/Wolfe-Jam/mcpaas-sdk)
