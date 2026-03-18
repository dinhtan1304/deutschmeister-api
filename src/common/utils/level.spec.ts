import { getLevelFromXp } from './level';

describe('getLevelFromXp()', () => {
  // ─── Level boundaries ──────────────────────────────────────────────────────

  it('returns level 1 at 0 XP', () => {
    const r = getLevelFromXp(0);
    expect(r.level).toBe(1);
    expect(r.name).toBe('Anfänger');
    expect(r.nameVi).toBe('Người mới bắt đầu');
  });

  it('returns level 1 at 99 XP (just below threshold)', () => {
    expect(getLevelFromXp(99).level).toBe(1);
  });

  it('returns level 2 at exactly 100 XP', () => {
    const r = getLevelFromXp(100);
    expect(r.level).toBe(2);
    expect(r.name).toBe('Lernender');
  });

  it('returns level 3 at 250 XP', () => {
    expect(getLevelFromXp(250).level).toBe(3);
  });

  it('returns level 5 at 1000 XP', () => {
    expect(getLevelFromXp(1000).level).toBe(5);
  });

  it('returns level 10 (max) at 12000 XP', () => {
    const r = getLevelFromXp(12000);
    expect(r.level).toBe(10);
    expect(r.name).toBe('Deutschmeister');
  });

  it('stays at level 10 beyond 12000 XP', () => {
    expect(getLevelFromXp(99999).level).toBe(10);
  });

  // ─── Progress calculation ──────────────────────────────────────────────────

  it('returns progress=0 at level threshold start', () => {
    // Level 1: threshold 0, next threshold 100
    const r = getLevelFromXp(0);
    expect(r.progress).toBe(0);
    expect(r.xpInLevel).toBe(0);
  });

  it('returns progress=50 at midpoint of level 1 (50 XP)', () => {
    const r = getLevelFromXp(50);
    expect(r.progress).toBe(50);
  });

  it('returns progress=100 at max level', () => {
    const r = getLevelFromXp(12000);
    expect(r.progress).toBe(100);
  });

  it('calculates xpInLevel correctly within level 2 (100→250)', () => {
    const r = getLevelFromXp(175); // 175 - 100 = 75 into level 2
    expect(r.xpInLevel).toBe(75);
    expect(r.xpNeeded).toBe(150); // 250 - 100
    expect(r.progress).toBe(50);
  });

  it('returns correct nextLevelXp for level 1', () => {
    expect(getLevelFromXp(0).nextLevelXp).toBe(100);
  });

  it('returns correct nextLevelXp for level 2', () => {
    expect(getLevelFromXp(100).nextLevelXp).toBe(250);
  });

  it('returns currentLevelXp matching threshold', () => {
    const r = getLevelFromXp(500);
    expect(r.level).toBe(4);
    expect(r.currentLevelXp).toBe(500);
  });

  // ─── Edge cases ───────────────────────────────────────────────────────────

  it('handles negative XP gracefully (treated as 0)', () => {
    const r = getLevelFromXp(-10);
    expect(r.level).toBe(1);
  });

  it('handles very large XP (above max)', () => {
    const r = getLevelFromXp(1_000_000);
    expect(r.level).toBe(10);
    expect(r.progress).toBe(100);
  });
});
