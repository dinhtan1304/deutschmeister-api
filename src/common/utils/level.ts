const XP_THRESHOLDS = [0, 100, 250, 500, 1000, 2000, 3500, 5500, 8000, 12000];

const LEVEL_NAMES = [
  { name: 'Anfänger', nameVi: 'Người mới bắt đầu' },
  { name: 'Lernender', nameVi: 'Người học' },
  { name: 'Fortgeschrittener', nameVi: 'Trung cấp' },
  { name: 'Kenntnisreicher', nameVi: 'Có kiến thức' },
  { name: 'Geübter', nameVi: 'Có kinh nghiệm' },
  { name: 'Erfahrener', nameVi: 'Thành thạo' },
  { name: 'Experte', nameVi: 'Chuyên gia' },
  { name: 'Meister', nameVi: 'Bậc thầy' },
  { name: 'Virtuose', nameVi: 'Bậc cao thủ' },
  { name: 'Deutschmeister', nameVi: 'Deutschmeister' },
];

export interface LevelInfo {
  level: number;
  name: string;
  nameVi: string;
  currentLevelXp: number;
  nextLevelXp: number;
  xpInLevel: number;
  xpNeeded: number;
  progress: number; // 0-100
}

export function getLevelFromXp(xp: number): LevelInfo {
  let level = 1;
  for (let i = XP_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= XP_THRESHOLDS[i]) {
      level = i + 1;
      break;
    }
  }

  const levelIndex = level - 1;
  const currentLevelXp = XP_THRESHOLDS[levelIndex] ?? 0;
  const nextLevelXp = XP_THRESHOLDS[levelIndex + 1] ?? XP_THRESHOLDS[XP_THRESHOLDS.length - 1];
  const xpInLevel = xp - currentLevelXp;
  const xpNeeded = nextLevelXp - currentLevelXp;
  const progress = level >= XP_THRESHOLDS.length ? 100 : Math.floor((xpInLevel / xpNeeded) * 100);

  return {
    level,
    name: LEVEL_NAMES[levelIndex]?.name ?? 'Deutschmeister',
    nameVi: LEVEL_NAMES[levelIndex]?.nameVi ?? 'Deutschmeister',
    currentLevelXp,
    nextLevelXp,
    xpInLevel,
    xpNeeded,
    progress,
  };
}
