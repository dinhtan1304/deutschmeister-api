// ─── Shared TypeScript interfaces ───────────────────────────────────────────
export interface ExamText {
  id: string;
  label?: string; // 'A', 'B', 'C', ... for Zuordnung
  type: string;   // 'email' | 'anzeige' | 'artikel' | 'kurznachricht' | 'sign' | 'mixed'
  title?: string;
  author?: string;
  content: string;
}

export interface ExamTeilQuestion {
  id: string;
  questionText: string;
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanationVi: string;
  explanationDe: string;
}

export interface ExamReadingTeil {
  number: number;
  taskType: 'richtig_falsch' | 'multiple_choice' | 'zuordnung' | 'ja_nein' | 'sprachbausteine';
  instruction: string;
  maxPoints: number;
  texts: ExamText[];
  questions: ExamTeilQuestion[];
  wordBank?: string[]; // TELC Sprachbausteine Teil 2 only
}

// ─── Teil generator config ───────────────────────────────────────────────────
export type TeilConfig =
  | { type: 'richtig_falsch'; textType: string; count: number }
  | { type: 'multiple_choice'; numTexts: number; perText: number }
  | { type: 'zuordnung'; style: 'person_to_text' | 'simple_ab'; requirements: number; options: number }
  | { type: 'ja_nein'; count: number }
  | { type: 'sprachbausteine'; gaps: number; hasWordBank: boolean };

export interface LevelExamConfig {
  teile: TeilConfig[];
  totalPoints: number;
  timeMin: number;
}

export const EXAM_READING_CONFIG: Record<string, Record<string, LevelExamConfig>> = {
  GOETHE: {
    A1: {
      timeMin: 45,
      totalPoints: 15,
      teile: [
        { type: 'richtig_falsch', textType: 'email', count: 5 },
        { type: 'zuordnung', style: 'simple_ab', requirements: 5, options: 2 },
        { type: 'richtig_falsch', textType: 'sign', count: 5 },
      ],
    },
    A2: {
      timeMin: 30,
      totalPoints: 20,
      teile: [
        { type: 'multiple_choice', numTexts: 1, perText: 5 },
        { type: 'multiple_choice', numTexts: 1, perText: 5 },
        { type: 'multiple_choice', numTexts: 1, perText: 5 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 5, options: 6 },
      ],
    },
    B1: {
      timeMin: 65,
      totalPoints: 30,
      teile: [
        { type: 'richtig_falsch', textType: 'email', count: 6 },
        { type: 'multiple_choice', numTexts: 2, perText: 3 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 7, options: 10 },
        { type: 'ja_nein', count: 7 },
        { type: 'multiple_choice', numTexts: 1, perText: 4 },
      ],
    },
  },
  TELC: {
    A2: {
      timeMin: 45,
      totalPoints: 40,
      teile: [
        { type: 'richtig_falsch', textType: 'mixed', count: 5 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 5, options: 7 },
        { type: 'multiple_choice', numTexts: 1, perText: 5 },
        { type: 'richtig_falsch', textType: 'artikel', count: 5 },
        { type: 'sprachbausteine', gaps: 10, hasWordBank: false },
      ],
    },
    B1: {
      timeMin: 60,
      totalPoints: 60,
      teile: [
        { type: 'richtig_falsch', textType: 'artikel', count: 10 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 5, options: 8 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 5, options: 8 },
        { type: 'multiple_choice', numTexts: 1, perText: 5 },
        { type: 'richtig_falsch', textType: 'email', count: 5 },
        { type: 'sprachbausteine', gaps: 20, hasWordBank: true },
      ],
    },
  },
};

// ─── Writing Teil interfaces ─────────────────────────────────────────────────
export interface ExamWritingTeil {
  number: number;
  taskType: 'form_fill' | 'informal_email' | 'formal_email' | 'sms' | 'forum_comment';
  scenario: string;
  taskDescription: string;
  requiredPoints: string[];
  minWords: number;
  maxWords: number;
  maxPoints: number;
}

export interface TeilGrading {
  teilNumber: number;
  score: number; // 0-100
  maxPoints: number;
  feedback: string;
  corrections: Array<{
    original: string;
    corrected: string;
    explanationVi: string;
    explanationDe: string;
  }>;
  strengths: string[];
  improvements: string[];
}

export const EXAM_WRITING_CONFIG: Record<string, Record<string, { teile: ExamWritingTeilConfig[]; timeMin: number }>> = {
  GOETHE: {
    A1: {
      timeMin: 20,
      teile: [
        { taskType: 'form_fill', minWords: 0, maxWords: 30, maxPoints: 5, label: 'Formular ausfüllen' },
        { taskType: 'informal_email', minWords: 25, maxWords: 40, maxPoints: 10, label: 'E-Mail schreiben' },
      ],
    },
    A2: {
      timeMin: 30,
      teile: [
        { taskType: 'sms', minWords: 20, maxWords: 40, maxPoints: 10, label: 'SMS / Nachricht schreiben' },
        { taskType: 'informal_email', minWords: 30, maxWords: 50, maxPoints: 10, label: 'E-Mail schreiben' },
      ],
    },
    B1: {
      timeMin: 60,
      teile: [
        { taskType: 'informal_email', minWords: 70, maxWords: 100, maxPoints: 40, label: 'Informelle E-Mail' },
        { taskType: 'forum_comment', minWords: 70, maxWords: 100, maxPoints: 40, label: 'Forumsbeitrag' },
        { taskType: 'formal_email', minWords: 30, maxWords: 50, maxPoints: 20, label: 'Formelle E-Mail' },
      ],
    },
  },
  TELC: {
    A2: {
      timeMin: 30,
      teile: [
        { taskType: 'informal_email', minWords: 40, maxWords: 60, maxPoints: 60, label: 'E-Mail schreiben' },
      ],
    },
    B1: {
      timeMin: 30,
      teile: [
        { taskType: 'informal_email', minWords: 70, maxWords: 110, maxPoints: 45, label: 'E-Mail / Brief schreiben' },
      ],
    },
  },
};

export interface ExamWritingTeilConfig {
  taskType: ExamWritingTeil['taskType'];
  minWords: number;
  maxWords: number;
  maxPoints: number;
  label: string;
}
