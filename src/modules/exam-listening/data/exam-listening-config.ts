// ─── Interfaces ───────────────────────────────────────────────────────────────

export interface ExamListeningText {
  id: string;
  label?: string;
  type: string;    // 'dialogue' | 'monologue' | 'announcement' | 'interview' | 'radio'
  title?: string;
  content: string; // Audio script (hidden during exam)
  speakers?: string[]; // Optional speaker names (for dialogues)
}

export interface ExamListeningQuestion {
  id: string;
  questionText: string;
  options?: { id: string; text: string }[];
  correctAnswer: string;
  explanationVi: string;
  explanationDe: string;
}

export interface ExamListeningTeil {
  number: number;
  taskType: 'richtig_falsch' | 'multiple_choice' | 'zuordnung';
  instruction: string;
  playCount: number;   // max replays allowed (1 or 2)
  maxPoints: number;
  texts: ExamListeningText[];
  questions: ExamListeningQuestion[];
}

// ─── Teil Generator Config ───────────────────────────────────────────────────

export type ListeningTeilConfig =
  | { type: 'richtig_falsch'; scriptType: string; count: number; playCount: number }
  | { type: 'multiple_choice'; numTexts: number; perText: number; scriptType: string; playCount: number }
  | { type: 'zuordnung'; style: 'person_to_text' | 'simple_ab'; requirements: number; options: number; scriptType: string; playCount: number };

export interface ListeningLevelConfig {
  teile: ListeningTeilConfig[];
  totalPoints: number;
  timeMin: number;
}

// ─── Exam Config ─────────────────────────────────────────────────────────────

export const EXAM_LISTENING_CONFIG: Record<string, Record<string, ListeningLevelConfig>> = {
  GOETHE: {
    A1: {
      timeMin: 20,
      totalPoints: 15,
      teile: [
        { type: 'richtig_falsch', scriptType: 'announcement', count: 5, playCount: 1 },
        { type: 'multiple_choice', numTexts: 5, perText: 1, scriptType: 'short_dialogue', playCount: 1 },
        { type: 'richtig_falsch', scriptType: 'phone_message', count: 5, playCount: 2 },
      ],
    },
    A2: {
      timeMin: 25,
      totalPoints: 20,
      teile: [
        { type: 'richtig_falsch', scriptType: 'radio_announcement', count: 5, playCount: 1 },
        { type: 'multiple_choice', numTexts: 4, perText: 1, scriptType: 'dialogue', playCount: 1 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 5, options: 7, scriptType: 'announcement', playCount: 1 },
        { type: 'richtig_falsch', scriptType: 'interview', count: 5, playCount: 2 },
      ],
    },
    B1: {
      timeMin: 40,
      totalPoints: 30,
      teile: [
        { type: 'richtig_falsch', scriptType: 'radio_report', count: 10, playCount: 1 },
        { type: 'multiple_choice', numTexts: 5, perText: 1, scriptType: 'situational_dialogue', playCount: 1 },
        { type: 'zuordnung', style: 'person_to_text', requirements: 5, options: 6, scriptType: 'discussion', playCount: 1 },
        { type: 'multiple_choice', numTexts: 1, perText: 7, scriptType: 'interview', playCount: 2 },
      ],
    },
  },
  TELC: {
    A2: {
      timeMin: 20,
      totalPoints: 30,
      teile: [
        { type: 'multiple_choice', numTexts: 10, perText: 1, scriptType: 'short_announcement', playCount: 1 },
        { type: 'multiple_choice', numTexts: 5, perText: 2, scriptType: 'dialogue', playCount: 1 },
        { type: 'richtig_falsch', scriptType: 'monologue', count: 10, playCount: 1 },
      ],
    },
    B1: {
      timeMin: 30,
      totalPoints: 30,
      teile: [
        { type: 'multiple_choice', numTexts: 10, perText: 1, scriptType: 'short_announcement', playCount: 1 },
        { type: 'multiple_choice', numTexts: 5, perText: 2, scriptType: 'radio_report', playCount: 1 },
        { type: 'richtig_falsch', scriptType: 'monologue', count: 7, playCount: 2 },
      ],
    },
  },
};
