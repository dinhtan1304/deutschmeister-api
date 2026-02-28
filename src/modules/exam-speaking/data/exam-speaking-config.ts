// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface ExamSpeakingTeil {
  number: number;
  taskType: string; // 'sich_vorstellen' | 'bitten' | 'reagieren' | 'planen' | 'praesentation' | 'monolog' | 'dialog' | 'ueber_sich'
  instruction: string;      // German instruction shown to user
  instructionVi: string;    // Vietnamese translation
  partnerLines?: string[];  // AI partner prompts shown as text + TTS
  wordCards?: string[];     // Vocab/picture cards shown to user
  keyPoints: string[];      // Points user should cover (hints)
  prepTimeSeconds: number;  // Prep countdown (0 = no prep)
  speakTimeSeconds: number; // Max recording time
  maxPoints: number;
}

export interface TeilGrading {
  score: number; // 0-100
  criteriaScores: {
    aufgabe: number;    // 0-25 Task completion
    aussprache: number; // 0-25 Pronunciation
    grammatik: number;  // 0-25 Grammar
    wortschatz: number; // 0-25 Vocabulary
  };
  feedbackVi: string;
  feedbackDe: string;
  corrections: string[];
  strengths: string[];
}

// ─── Teil Config ─────────────────────────────────────────────────────────────

export interface SpeakingTeilConfig {
  type: string;
  prepTime: number;
  speakTime: number;
}

export interface SpeakingLevelConfig {
  timeMin: number;
  totalPoints: number;
  teile: SpeakingTeilConfig[];
}

// ─── Exam Config ─────────────────────────────────────────────────────────────

export const EXAM_SPEAKING_CONFIG: Record<string, Record<string, SpeakingLevelConfig>> = {
  GOETHE: {
    A1: {
      timeMin: 8,
      totalPoints: 15,
      teile: [
        { type: 'sich_vorstellen', prepTime: 0, speakTime: 60 },
        { type: 'bitten',          prepTime: 0, speakTime: 60 },
        { type: 'reagieren',       prepTime: 0, speakTime: 60 },
      ],
    },
    A2: {
      timeMin: 10,
      totalPoints: 15,
      teile: [
        { type: 'ueber_sich', prepTime: 30, speakTime: 90 },
        { type: 'planen',     prepTime: 30, speakTime: 90 },
        { type: 'reagieren',  prepTime: 0,  speakTime: 60 },
      ],
    },
    B1: {
      timeMin: 15,
      totalPoints: 15,
      teile: [
        { type: 'planen',        prepTime: 60, speakTime: 120 },
        { type: 'praesentation', prepTime: 30, speakTime: 120 },
        { type: 'reagieren',     prepTime: 0,  speakTime: 90  },
      ],
    },
  },
  TELC: {
    A2: {
      timeMin: 10,
      totalPoints: 15,
      teile: [
        { type: 'sich_vorstellen', prepTime: 0,  speakTime: 60 },
        { type: 'dialog',          prepTime: 30, speakTime: 90 },
        { type: 'reagieren',       prepTime: 0,  speakTime: 60 },
      ],
    },
    B1: {
      timeMin: 12,
      totalPoints: 15,
      teile: [
        { type: 'dialog',  prepTime: 30, speakTime: 120 },
        { type: 'monolog', prepTime: 30, speakTime: 90  },
        { type: 'planen',  prepTime: 30, speakTime: 90  },
      ],
    },
  },
};
