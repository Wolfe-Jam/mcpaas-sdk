# mcpaas

TypeScript SDK for [MCPaaS](https://mcpaas.live) — Context, on-demand.

Zero dependencies. Works with Bun, Node 18+, Deno, browsers, and edge runtimes.

## Install

```bash
npm install mcpaas
# or
bun add mcpaas
```

## Quick Start

```typescript
import { MCPaaS } from 'mcpaas';

const m = new MCPaaS();

// Read a soul
const soul = await m.getRawSoul('spacex');
console.log(soul);

// Score a namepoint
const result = await m.score('faf');
console.log(result.score, result.tierReady);

// Check handle availability
const check = await m.check('myhandle');
console.log(check.available);
```

## API

### Souls

```typescript
m.getSoul('faf')        // Structured soul content
m.getRawSoul('spacex')  // Plain text soul
m.listSouls()           // Stats: counts, top souls, operations
```

### Scoring

```typescript
m.score('faf')                    // Score a namepoint
m.scoreRepo('owner/repo')        // Score a GitHub repo
m.leaderboard()                   // Top scored repos
```

### Directory & Discovery

```typescript
m.directory()           // Full namepoint directory
m.check('handle')       // Handle availability + pricing
m.count()               // Claimed/remaining counts
m.discover()            // Discovery feed (namepoints + souls)
```

### Tag Intel

```typescript
m.tagIntel()            // Tag patterns, co-occurrence, candidates, merges
m.suggestTags('handle') // Suggest tags for a namepoint
```

### Badges

```typescript
m.badge('owner', 'repo')  // Returns SVG badge URL (sync)
// => https://mcpaas.live/badge/owner/repo.svg
```

### Globe

```typescript
m.globe()  // Edge location stats from 300+ Cloudflare colos
```

### Platform

```typescript
m.health()  // Health check
m.info()    // Server info
```

## Configuration

```typescript
const m = new MCPaaS({
  baseUrl: 'https://mcpaas.live',  // default
});
```

## Error Handling

```typescript
import { MCPaaS, MCPaaSError } from 'mcpaas';

try {
  await m.getSoul('nonexistent');
} catch (e) {
  if (e instanceof MCPaaSError) {
    console.log(e.status);  // HTTP status code
    console.log(e.body);    // Response body
    console.log(e.path);    // Request path
  }
}
```

## License

MIT
