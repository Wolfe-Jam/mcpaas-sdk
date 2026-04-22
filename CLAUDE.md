---
mcpaas:
  role: sdk
  depends_on: [mcpaas.live/raw, mcpaas.live/api, mcpaas.live/mcp]
  capabilities: [souls-read, repo-scoring, tag-discovery, globe-query]
  siblings: [mcpaas-cf, mcpaas-beacon]
---

<!-- faf: mcpaas | TypeScript | MCPaaS SDK — Context, on-demand. Read souls, score repos, discover tags, query the globe. -->

# CLAUDE.md — mcpaas

## What This Is

MCPaaS SDK — Context, on-demand. Read souls, score repos, discover tags, query the globe.

## Stack

- **Language:** TypeScript

## Context

- **Who:** Developers integrating MCPaaS context into apps, agents, and workflows
- **What:** MCPaaS SDK — Context, on-demand. Read souls, score repos, discover tags, query the globe.
- **Why:** Eliminates hand-rolled HTTP calls — typed SDK wraps 15 public MCPaaS endpoints
- **Where:** npm (mcpaas), GitHub (Wolfe-Jam/mcpaas-sdk), consumed via mcpaas.live
- **When:** v1.0.0, 2026-04-02
- **How:** npm install mcpaas && import { MCPaaS } from 'mcpaas'

---

*STATUS: BI-SYNC ACTIVE — 2026-04-02T05:46:30.084Z*
