/**
 * MCPaaS SDK — Live Integration Tests
 * =====================================
 * Tests run against production mcpaas.live.
 * If MCPaaS is up, these pass.
 */

import { describe, test, expect } from 'bun:test';
import { MCPaaS, MCPaaSError } from '../src/index';

const m = new MCPaaS();

// ── Souls ────────────────────────────────────────────────────────────────────

describe('Souls', () => {
  test('getSoul returns content', async () => {
    const soul = await m.getSoul('faf');
    expect(soul).toBeTruthy();
    expect(typeof soul).toBe('string');
    expect(soul.length).toBeGreaterThan(10);
  });

  test('getRawSoul returns plain text', async () => {
    const raw = await m.getRawSoul('spacex');
    expect(raw).toBeTruthy();
    expect(typeof raw).toBe('string');
  });

  test('listSouls returns stats', async () => {
    const stats = await m.listSouls();
    expect(stats.total_souls).toBeGreaterThan(0);
    expect(stats.date).toBeTruthy();
  });

  test('getSoul throws on missing soul', async () => {
    try {
      await m.getSoul('__nonexistent_soul_xyz__');
      expect(true).toBe(false); // should not reach
    } catch (e) {
      expect(e).toBeInstanceOf(MCPaaSError);
      expect((e as MCPaaSError).status).toBeGreaterThanOrEqual(400);
    }
  });
});

// ── Scoring ──────────────────────────────────────────────────────────────────

describe('Scoring', () => {
  test('score returns a result', async () => {
    const result = await m.score('faf');
    expect(result.handle).toBe('faf');
    expect(typeof result.score).toBe('number');
    expect(typeof result.valid).toBe('boolean');
  });

  test('leaderboard returns top and recent', async () => {
    const lb = await m.leaderboard();
    expect(Array.isArray(lb.top)).toBe(true);
    expect(Array.isArray(lb.recent)).toBe(true);
    expect(typeof lb.total).toBe('number');
  });
});

// ── Directory & Discovery ────────────────────────────────────────────────────

describe('Directory & Discovery', () => {
  test('directory returns namepoints', async () => {
    const dir = await m.directory();
    expect(dir.count).toBeGreaterThan(0);
    expect(Array.isArray(dir.namepoints)).toBe(true);
    expect(dir.namepoints.length).toBeGreaterThan(0);
  });

  test('check returns availability', async () => {
    const result = await m.check('faf');
    expect(result.handle).toBe('faf');
    expect(typeof result.available).toBe('boolean');
  });

  test('count returns totals', async () => {
    const result = await m.count();
    expect(typeof result.claimed).toBe('number');
    expect(typeof result.remaining).toBe('number');
    expect(result.claimed).toBeGreaterThan(0);
    expect(Array.isArray(result.names)).toBe(true);
  });

  test('discover returns feed', async () => {
    const result = await m.discover();
    expect(Array.isArray(result.namepoints)).toBe(true);
    expect(Array.isArray(result.souls)).toBe(true);
    expect(typeof result.totalSouls).toBe('number');
  });
});

// ── Tag Intel ────────────────────────────────────────────────────────────────

describe('Tag Intel', () => {
  test('tagIntel returns analysis', async () => {
    const intel = await m.tagIntel();
    expect(Array.isArray(intel.tags)).toBe(true);
    expect(Array.isArray(intel.candidates)).toBe(true);
    expect(Array.isArray(intel.merges)).toBe(true);
    expect(typeof intel.analysed).toBe('number');
    expect(intel.updatedAt).toBeTruthy();
  });

  test('suggestTags returns suggestions', async () => {
    const result = await m.suggestTags('faf');
    expect(result.handle).toBe('faf');
    expect(Array.isArray(result.existingTags)).toBe(true);
    expect(Array.isArray(result.suggestions)).toBe(true);
  });
});

// ── Badges ───────────────────────────────────────────────────────────────────

describe('Badges', () => {
  test('badge returns a URL string', () => {
    const url = m.badge('Wolfe-Jam', 'faf-cli');
    expect(url).toBe('https://mcpaas.live/badge/Wolfe-Jam/faf-cli.svg');
  });

  test('badge encodes special characters', () => {
    const url = m.badge('org name', 'repo/name');
    expect(url).toContain('org%20name');
    expect(url).toContain('repo%2Fname');
  });
});

// ── Globe ────────────────────────────────────────────────────────────────────

describe('Globe', () => {
  test('globe returns location data', async () => {
    const result = await m.globe();
    expect(typeof result.total).toBe('number');
    expect(Array.isArray(result.locations)).toBe(true);
    expect(result.locations.length).toBeGreaterThan(0);
    expect(result.locations[0]).toHaveProperty('code');
    expect(result.locations[0]).toHaveProperty('lat');
    expect(result.locations[0]).toHaveProperty('lng');
  });
});

// ── Platform ─────────────────────────────────────────────────────────────────

describe('Platform', () => {
  test('health returns status', async () => {
    const result = await m.health();
    expect(result.status).toBeTruthy();
    expect(result.engine).toBeTruthy();
  });

  test('info returns name and version', async () => {
    const result = await m.info();
    expect(result.name).toBeTruthy();
    expect(result.version).toBeTruthy();
  });
});

// ── Custom Base URL ──────────────────────────────────────────────────────────

describe('Options', () => {
  test('default baseUrl is mcpaas.live', () => {
    const sdk = new MCPaaS();
    expect(sdk['baseUrl']).toBe('https://mcpaas.live');
  });

  test('custom baseUrl strips trailing slash', () => {
    const sdk = new MCPaaS({ baseUrl: 'https://custom.example.com/' });
    expect(sdk['baseUrl']).toBe('https://custom.example.com');
  });
});
