# mcpaas

[![npm](https://img.shields.io/npm/v/mcpaas?color=00CCFF)](https://www.npmjs.com/package/mcpaas)
[![FAF](https://mcpaas.live/badge/Wolfe-Jam/mcpaas-sdk.svg)](https://mcpaas.live)
[![Built with Bun](https://img.shields.io/badge/Built_with-Bun-f9f1e1?logo=bun)](https://bun.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AI context has an API. This is the client.**

Every soul, score, namepoint, tag, and edge location on [MCPaaS](https://mcpaas.live) — typed, zero-dep, one import.

```typescript
import { MCPaaS } from 'mcpaas';
const mcpaas = new MCPaaS();

const soul = await mcpaas.getRawSoul('spacex');
```

That's a live API call. Run it. You'll get SpaceX context back in ~50ms from the nearest Cloudflare edge.

---

## Install

```bash
bun add mcpaas                     # Bun-native
npm install mcpaas                 # Also works with Node 18+, Deno, browsers, edge runtimes
```

---

## What MCPaaS Does

MCPaaS is a context delivery platform running on 300+ Cloudflare edges.

| Concept | What it is |
|---------|-----------|
| **Soul** | A block of AI context — project DNA, persona, live data |
| **Namepoint** | A claimed handle in a global directory (like DNS for context) |
| **Score** | AI-readiness rating for a repo or namepoint (0-100) |
| **Tag Intel** | Pattern detection and co-occurrence analysis across all namepoints |
| **Globe** | Real-time execution stats from every edge location |
| **Badge** | SVG score badge for any GitHub repo |

This SDK wraps the public HTTP API into typed methods with full IntelliSense.

---

## Quick Start

```typescript
import { MCPaaS } from 'mcpaas';

const mcpaas = new MCPaaS();

// Read live AI context
const soul = await mcpaas.getRawSoul('spacex');

// Score a GitHub repo's AI-readiness
const repo = await mcpaas.scoreRepo('anthropics/claude-code');
console.log(repo.score, repo.language);

// Check if a namepoint handle is available
const check = await mcpaas.check('myhandle');
console.log(check.available);

// Tag intelligence across the entire directory
const intel = await mcpaas.tagIntel();
console.log(intel.tags.length, 'tag profiles');
```

---

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
mcpaas.badge('Wolfe-Jam', 'faf-cli')
// => "https://mcpaas.live/badge/Wolfe-Jam/faf-cli.svg"
```

### Globe

| Method | Returns | Description |
|--------|---------|-------------|
| `globe()` | `Promise<GlobeResult>` | Edge location stats from 300+ Cloudflare colos |

### Platform

| Method | Returns | Description |
|--------|---------|-------------|
| `health()` | `Promise<HealthResult>` | Service health + engine status |
| `info()` | `Promise<InfoResult>` | Server name and version |

---

## Error Handling

All methods throw `MCPaaSError` on non-2xx responses:

```typescript
import { MCPaaS, MCPaaSError } from 'mcpaas';

try {
  await mcpaas.getSoul('nonexistent');
} catch (e) {
  if (e instanceof MCPaaSError) {
    e.status  // 404
    e.body    // "Not found"
    e.path    // "/souls/nonexistent"
  }
}
```

## Exported Types

All response types are exported:

```typescript
import type { ScoreResult, DirectoryEntry, TagIntelResult } from 'mcpaas';
```

## Configuration

```typescript
const mcpaas = new MCPaaS({
  baseUrl: 'https://mcpaas.live',  // default
});
```

---

## Internals

Single file. 250 lines. Zero dependencies. Native `fetch` only.

```
src/index.ts     ← Types + MCPaaS class + MCPaaSError (that's it)
tests/sdk.test.ts ← 19 tests against live mcpaas.live
```

Built with Bun. Tested with Bun. Works anywhere `fetch` does.

---

## Why Bun?

Bun powers Claude Code. This SDK follows the same toolchain — `bun build`, `bun test`, TypeScript-native. No transpiler config, no bundler plugins, no runtime dependencies.

Node, Deno, browsers, and edge runtimes work too. But Bun is home.

---

## License

MIT

---

Built by [Wolfe James](https://github.com/Wolfe-Jam) | Powered by [MCPaaS](https://mcpaas.live) | Format: [FAF](https://faf.one)
