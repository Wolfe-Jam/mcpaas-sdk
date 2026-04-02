/**
 * MCPaaS SDK — Context, on-demand.
 * =================================
 * Zero-dependency TypeScript client for the MCPaaS platform.
 * Works with Bun, Node 18+, Deno, browsers, and edge runtimes.
 *
 * Usage:
 *   import { MCPaaS } from 'mcpaas';
 *   const m = new MCPaaS();
 *   const soul = await m.getRawSoul('spacex');
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface MCPaaSOptions {
  /** Base URL of the MCPaaS instance. Default: https://mcpaas.live */
  baseUrl?: string;
}

export interface SoulStats {
  date: string;
  total_souls: number;
  operations_today: Record<string, number>;
  top_souls: Array<{ soul: string; reads: number }>;
}

export interface ScoreResult {
  handle: string;
  score: number;
  tierReady: boolean;
  valid: boolean;
  engine: string;
}

export interface RepoScore {
  score: number;
  repo: string;
  hasFaf: boolean;
  language: string;
  stars: number;
  description: string;
}

export interface LeaderboardResult {
  top: Array<{ repo: string; score: number; language: string }>;
  recent: Array<{ repo: string; score: number; language: string }>;
  total: number;
}

export interface DirectoryEntry {
  handle: string;
  name: string;
  tagline: string;
  role: string;
  avatar: number;
  tags: string[];
  userTags: string[];
  score: number;
}

export interface DirectoryResult {
  count: number;
  namepoints: DirectoryEntry[];
  userTagIndex: Array<{ tag: string; count: number }>;
}

export interface CheckResult {
  handle: string;
  available: boolean;
  price?: number;
  tier?: string;
}

export interface CountResult {
  claimed: number;
  remaining: number;
  tier: string;
  price: string;
  annual: string;
  names: string[];
}

export interface DiscoverResult {
  namepoints: DirectoryEntry[];
  souls: string[];
  totalSouls: number;
}

export interface TagProfile {
  tag: string;
  count: number;
  cooccurs: Array<{ tag: string; overlap: number }>;
}

export interface TagCandidate {
  term: string;
  count: number;
  source: string;
}

export interface TagMerge {
  canonical: string;
  variants: string[];
}

export interface TagIntelResult {
  tags: TagProfile[];
  candidates: TagCandidate[];
  merges: TagMerge[];
  analysed: number;
  updatedAt: string;
}

export interface SuggestResult {
  handle: string;
  existingTags: string[];
  suggestions: string[];
}

export interface GlobeLocation {
  code: string;
  count: number;
  lat: number;
  lng: number;
  city: string;
  active: boolean;
}

export interface GlobeResult {
  total: number;
  activeLocations: number;
  totalLocations: number;
  locations: GlobeLocation[];
  updated: string;
}

export interface HealthResult {
  status: string;
  engine: string;
  engineStatus: string;
  engineScore: number;
  engineSize: string;
  [key: string]: unknown;
}

export interface InfoResult {
  name: string;
  version: string;
  [key: string]: unknown;
}

// ── SDK ───────────────────────────────────────────────────────────────────────

export class MCPaaS {
  private baseUrl: string;

  constructor(options?: MCPaaSOptions) {
    this.baseUrl = (options?.baseUrl || 'https://mcpaas.live').replace(/\/$/, '');
  }

  // ── Souls ───────────────────────────────────────────────────────────────

  /** Fetch structured soul content by name */
  async getSoul(name: string): Promise<string> {
    return this.text(`/souls/${enc(name)}`);
  }

  /** Fetch raw plain-text soul content */
  async getRawSoul(name: string): Promise<string> {
    return this.text(`/raw/${enc(name)}`);
  }

  /** Get soul stats (counts, top souls, operations) */
  async listSouls(): Promise<SoulStats> {
    return this.json('/souls/stats');
  }

  // ── Scoring ─────────────────────────────────────────────────────────────

  /** Score a namepoint by handle */
  async score(handle: string): Promise<ScoreResult> {
    return this.json(`/api/namepoints/score?handle=${enc(handle)}`);
  }

  /** Score a GitHub repo (owner/repo or full URL) */
  async scoreRepo(repo: string): Promise<RepoScore> {
    return this.json('/api/play/score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ repo }),
    });
  }

  /** Get the scoring leaderboard */
  async leaderboard(): Promise<LeaderboardResult> {
    return this.json('/api/play/leaderboard');
  }

  // ── Directory & Discovery ───────────────────────────────────────────────

  /** Get the full namepoint directory */
  async directory(): Promise<DirectoryResult> {
    return this.json('/api/namepoints/directory');
  }

  /** Check if a handle is available */
  async check(handle: string): Promise<CheckResult> {
    return this.json(`/api/namepoints/check?handle=${enc(handle)}`);
  }

  /** Get namepoint counts */
  async count(): Promise<CountResult> {
    return this.json('/api/namepoints/count');
  }

  /** Discovery feed (namepoints + souls) */
  async discover(): Promise<DiscoverResult> {
    return this.json('/api/play/discover');
  }

  // ── Tag Intel ───────────────────────────────────────────────────────────

  /** Full tag intelligence: patterns, co-occurrence, candidates, merges */
  async tagIntel(): Promise<TagIntelResult> {
    return this.json('/api/tags/intel');
  }

  /** Suggest tags for a namepoint based on content patterns */
  async suggestTags(handle: string): Promise<SuggestResult> {
    return this.json(`/api/tags/suggest?handle=${enc(handle)}`);
  }

  // ── Badges ──────────────────────────────────────────────────────────────

  /** Get the badge URL for a GitHub repo (synchronous — returns URL string) */
  badge(owner: string, repo: string): string {
    return `${this.baseUrl}/badge/${enc(owner)}/${enc(repo)}.svg`;
  }

  // ── Globe ───────────────────────────────────────────────────────────────

  /** Get edge location execution stats from 300+ Cloudflare colos */
  async globe(): Promise<GlobeResult> {
    return this.json('/api/globe');
  }

  // ── Platform ────────────────────────────────────────────────────────────

  /** Health check */
  async health(): Promise<HealthResult> {
    return this.json('/health');
  }

  /** Server info */
  async info(): Promise<InfoResult> {
    return this.json('/info');
  }

  // ── Internal ────────────────────────────────────────────────────────────

  private async json<T>(path: string, init?: RequestInit): Promise<T> {
    const res = await fetch(`${this.baseUrl}${path}`, init);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new MCPaaSError(res.status, text || res.statusText, path);
    }
    return res.json() as Promise<T>;
  }

  private async text(path: string): Promise<string> {
    const res = await fetch(`${this.baseUrl}${path}`);
    if (!res.ok) {
      const body = await res.text().catch(() => '');
      throw new MCPaaSError(res.status, body || res.statusText, path);
    }
    return res.text();
  }
}

// ── Error ─────────────────────────────────────────────────────────────────────

export class MCPaaSError extends Error {
  constructor(
    public status: number,
    public body: string,
    public path: string
  ) {
    super(`MCPaaS ${status}: ${body} (${path})`);
    this.name = 'MCPaaSError';
  }
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function enc(s: string): string {
  return encodeURIComponent(s);
}

export default MCPaaS;
