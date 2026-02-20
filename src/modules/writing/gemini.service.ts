import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';

// ── Response Types ──

export interface GeneratedPrompt {
  prompt: string;
  vocabHints: string[];
  grammarHints: string[];
}

export interface GradingResult {
  overallScore: number;
  correctedText: string;
  errors: GradingError[];
  generalFeedbackDe: string;
  generalFeedbackVi: string;
  strengths: string[];
  improvements: string[];
}

export interface GradingError {
  errorType: string;
  originalText: string;
  correctedText: string;
  explanationDe: string;
  explanationVi: string;
  severity: string;
  position: number;
}

export interface GrammarAnalysisResult {
  /** Câu gốc */
  sentence: string;
  /** Câu đã sửa (nếu có lỗi) */
  correctedSentence: string;
  /** Có lỗi ngữ pháp không */
  hasErrors: boolean;
  /** Thì của câu (Präsens, Perfekt, Präteritum...) */
  tense: string;
  tenseVi: string;
  /** Loại câu (Aussagesatz, Fragesatz, Imperativ...) */
  sentenceType: string;
  sentenceTypeVi: string;
  /** Phân tích từng thành phần */
  components: GrammarComponent[];
  /** Giải thích tổng quan bằng tiếng Việt */
  explanationVi: string;
  /** Quy tắc ngữ pháp liên quan */
  grammarRules: GrammarRule[];
  /** Mẹo ghi nhớ */
  tipVi: string;
}

export interface GrammarComponent {
  /** Text gốc: "Der Apfel" */
  text: string;
  /** Vai trò: subject, verb, object, adverb, preposition... */
  role: string;
  /** Vai trò tiếng Việt: "Chủ ngữ", "Động từ"... */
  roleVi: string;
  /** Case (nếu có): Nominativ, Akkusativ, Dativ, Genitiv */
  case?: string;
  caseVi?: string;
  /** Giải thích ngắn tiếng Việt */
  noteVi: string;
}

export interface GrammarRule {
  /** Tên quy tắc: "Verbposition im Aussagesatz" */
  rule: string;
  /** Giải thích tiếng Việt */
  ruleVi: string;
}


@Injectable()
export class GeminiService {
  private readonly logger = new Logger(GeminiService.name);
  private ai: GoogleGenAI;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('GEMINI_API_KEY');
    if (!apiKey) {
      this.logger.warn('GEMINI_API_KEY not set — AI features will be unavailable');
    }
    this.ai = new GoogleGenAI({ apiKey });
  }

  // ═══════════════════════════════════════════════════════════
  // 1. TẠO ĐỀ BÀI (Generate Writing Prompt)
  // ═══════════════════════════════════════════════════════════

  async generateWritingPrompt(config: {
    topic: string;
    cefrLevel: string;
    writingType: string;
    wordCountMin: number;
    wordCountMax: number;
  }): Promise<GeneratedPrompt> {
    const systemInstruction = `Du bist ein erfahrener Deutschlehrer, der Schreibübungen für vietnamesische Deutschlerner erstellt.

WICHTIG:
- Die Aufgabenstellung MUSS komplett auf Deutsch sein
- Vokabelhilfen: deutsches Wort mit vietnamesischer Übersetzung in Klammern, z.B. "die Wohnung (căn hộ)"
- Grammatikhilfen: Regel auf Deutsch mit kurzer vietnamesischer Erklärung in Klammern
- Niveau: ${config.cefrLevel} — verwende nur passenden Wortschatz und Grammatik für dieses Niveau
- Sei kreativ und realistisch — die Aufgabe soll einen alltäglichen Kontext haben
- Gib 5-8 Vokabelhilfen und 2-4 Grammatikhilfen`;

    const userPrompt = `Erstelle eine Schreibaufgabe:
- Thema: ${config.topic}
- Textsorte: ${this.getWritingTypeDE(config.writingType)}
- Wortanzahl: ${config.wordCountMin}-${config.wordCountMax} Wörter
- Niveau: ${config.cefrLevel}`;

    const responseSchema = {
      type: 'OBJECT' as const,
      properties: {
        prompt: {
          type: 'STRING' as const,
          description: 'Die komplette Aufgabenstellung auf Deutsch',
        },
        vocabHints: {
          type: 'ARRAY' as const,
          items: { type: 'STRING' as const },
          description: 'Vokabelhilfen mit vietnamesischer Übersetzung',
        },
        grammarHints: {
          type: 'ARRAY' as const,
          items: { type: 'STRING' as const },
          description: 'Grammatikhinweise mit vietnamesischer Erklärung',
        },
      },
      required: ['prompt', 'vocabHints', 'grammarHints'],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.8,
        },
      });

      if (!response.text) {
        throw new Error('Empty response from Gemini');
      }
      const result = JSON.parse(response.text) as GeneratedPrompt;

      // Validate kết quả
      if (!result.prompt || !result.vocabHints || !result.grammarHints) {
        throw new Error('Invalid response structure from Gemini');
      }

      return result;
    } catch (error) {
      this.logger.error(`Failed to generate writing prompt: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        'Không thể tạo đề bài. Vui lòng thử lại sau.',
      );
    }
  }

  // ═══════════════════════════════════════════════════════════
  // 2. CHẤM BÀI (Grade Writing)
  // ═══════════════════════════════════════════════════════════

  async gradeWriting(config: {
    prompt: string;
    userText: string;
    cefrLevel: string;
    writingType: string;
  }): Promise<GradingResult> {
    const systemInstruction = `Du bist ein erfahrener Deutschlehrer, der Texte von vietnamesischen Deutschlernern korrigiert und bewertet.

AUFGABEN:
1. Korrigiere den Text grammatisch und stilistisch
2. Erkläre JEDEN Fehler sowohl auf Deutsch als auch auf Vietnamesisch
3. Bewerte den Text mit einer Punktzahl von 0-100
4. Gib konstruktives Feedback auf Deutsch und Vietnamesisch
5. Nenne Stärken und Verbesserungsmöglichkeiten

FEHLERTYPEN (errorType):
- "article" — Der/Die/Das Fehler
- "grammar" — Allgemeine Grammatikfehler  
- "word_order" — Wortstellungsfehler
- "conjugation" — Verbkonjugation
- "case" — Kasusfehler (Nominativ/Akkusativ/Dativ/Genitiv)
- "spelling" — Rechtschreibfehler
- "vocabulary" — Wortwahl/Ausdruck

SCHWEREGRAD (severity):
- "error" — Klarer Grammatikfehler (wird rot markiert)
- "warning" — Leichter Fehler oder unnatürlicher Ausdruck (gelb)
- "suggestion" — Stilistischer Verbesserungsvorschlag (blau)

BEWERTUNGSKRITERIEN (Niveau ${config.cefrLevel}):
- Aufgabenerfüllung (hat der Schüler alle Punkte beantwortet?)
- Grammatische Korrektheit
- Wortschatz und Ausdruck
- Textstruktur und Kohärenz`;

    const userPrompt = `AUFGABENSTELLUNG:
${config.prompt}

NIVEAU: ${config.cefrLevel}
TEXTSORTE: ${this.getWritingTypeDE(config.writingType)}

TEXT DES SCHÜLERS:
---
${config.userText}
---

Bitte korrigiere und bewerte diesen Text ausführlich.`;

    const responseSchema = {
      type: 'OBJECT' as const,
      properties: {
        overallScore: {
          type: 'NUMBER' as const,
          description: 'Gesamtpunktzahl von 0 bis 100',
        },
        correctedText: {
          type: 'STRING' as const,
          description: 'Der vollständig korrigierte Text',
        },
        errors: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              errorType: { type: 'STRING' as const },
              originalText: { type: 'STRING' as const },
              correctedText: { type: 'STRING' as const },
              explanationDe: { type: 'STRING' as const },
              explanationVi: { type: 'STRING' as const },
              severity: { type: 'STRING' as const },
              position: { type: 'INTEGER' as const },
            },
            required: [
              'errorType', 'originalText', 'correctedText',
              'explanationDe', 'explanationVi', 'severity',
            ],
          },
        },
        generalFeedbackDe: {
          type: 'STRING' as const,
          description: 'Allgemeines Feedback auf Deutsch',
        },
        generalFeedbackVi: {
          type: 'STRING' as const,
          description: 'Nhận xét chung bằng tiếng Việt',
        },
        strengths: {
          type: 'ARRAY' as const,
          items: { type: 'STRING' as const },
          description: 'Stärken des Textes',
        },
        improvements: {
          type: 'ARRAY' as const,
          items: { type: 'STRING' as const },
          description: 'Verbesserungsvorschläge',
        },
      },
      required: [
        'overallScore', 'correctedText', 'errors',
        'generalFeedbackDe', 'generalFeedbackVi',
        'strengths', 'improvements',
      ],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.3, // Thấp hơn → chấm bài chính xác hơn
        },
      });

      if (!response.text) {
        throw new Error('Empty response from Gemini');
      }
      const result = JSON.parse(response.text) as GradingResult;

      // Validate
      if (result.overallScore === undefined || !result.correctedText) {
        throw new Error('Invalid grading response from Gemini');
      }

      // Clamp score 0-100
      result.overallScore = Math.max(0, Math.min(100, result.overallScore));

      return result;
    } catch (error) {
      this.logger.error(`Failed to grade writing: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        'Không thể chấm bài. Vui lòng thử lại sau.',
      );
    }
  }

  // ═══════════════════════════════════════════════════════════
  // Helper
  // ═══════════════════════════════════════════════════════════

  private getWritingTypeDE(type: string): string {
    const map: Record<string, string> = {
      email: 'E-Mail (informell oder formell)',
      brief: 'Formeller Brief',
      beschreibung: 'Bildbeschreibung / Beschreibung',
      tagebuch: 'Tagebucheintrag',
      dialog: 'Dialog / Gespräch',
      aufsatz: 'Kurzer Aufsatz',
      formular: 'Formular ausfüllen',
      einladung: 'Einladung',
      beschwerde: 'Beschwerde',
      bewerbung: 'Bewerbung',
    };
    return map[type] || type;
  }

  async analyzeGrammar(sentence: string, cefrLevel?: string): Promise<GrammarAnalysisResult> {
    const level = cefrLevel || 'A1';

    // Guard: reject empty or excessively long input before hitting the API
    if (!sentence || !sentence.trim()) {
      throw new InternalServerErrorException('Câu không được để trống.');
    }
    if (sentence.length > 500) {
      throw new InternalServerErrorException(
        'Câu quá dài. Vui lòng nhập câu ngắn hơn 500 ký tự.',
      );
    }

    const systemInstruction = `Du bist ein erfahrener Deutschlehrer für vietnamesische Lerner.

AUFGABE: Analysiere den folgenden deutschen Satz grammatisch.

REGELN:
- Erkläre auf dem Niveau ${level} — einfach und verständlich
- Alle vietnamesischen Erklärungen (roleVi, caseVi, noteVi, explanationVi, ruleVi, tenseVi, sentenceTypeVi, tipVi) MÜSSEN auf Vietnamesisch sein
- Alle deutschen Felder (role, case, rule, tense, sentenceType) MÜSSEN auf Deutsch sein
- Zerlege den Satz in grammatische Bestandteile (subject, verb, object, adverb, preposition, conjunction, etc.)
- Identifiziere Tempus, Satztyp und Kasus
- Gib praktische Tipps zum Merken auf Vietnamesisch
- Wenn der Satz Fehler hat, korrigiere ihn in correctedSentence`;

    const userPrompt = `Analysiere diesen Satz: "${sentence.trim()}"`;

    const responseSchema = {
      type: 'OBJECT' as const,
      properties: {
        sentence: { type: 'STRING' as const },
        correctedSentence: { type: 'STRING' as const },
        hasErrors: { type: 'BOOLEAN' as const },
        tense: { type: 'STRING' as const },
        tenseVi: { type: 'STRING' as const },
        sentenceType: { type: 'STRING' as const },
        sentenceTypeVi: { type: 'STRING' as const },
        components: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              text: { type: 'STRING' as const },
              role: { type: 'STRING' as const },
              roleVi: { type: 'STRING' as const },
              case: { type: 'STRING' as const },
              caseVi: { type: 'STRING' as const },
              noteVi: { type: 'STRING' as const },
            },
            required: ['text', 'role', 'roleVi', 'noteVi'],
          },
        },
        explanationVi: { type: 'STRING' as const },
        grammarRules: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              rule: { type: 'STRING' as const },
              ruleVi: { type: 'STRING' as const },
            },
            required: ['rule', 'ruleVi'],
          },
        },
        tipVi: { type: 'STRING' as const },
      },
      required: [
        'sentence', 'correctedSentence', 'hasErrors',
        'tense', 'tenseVi', 'sentenceType', 'sentenceTypeVi',
        'components', 'explanationVi', 'grammarRules', 'tipVi',
      ],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.3,
        },
      });

      if (!response.text) {
        throw new Error('Empty response from Gemini');
      }

      const result = JSON.parse(response.text) as GrammarAnalysisResult;

      // Validate the required fields that drive the UI
      if (!result.sentence || !result.components || !Array.isArray(result.components)) {
        throw new Error('Invalid grammar analysis structure from Gemini');
      }

      return result;
    } catch (error) {
      this.logger.error(
        `Failed to analyze grammar for sentence "${sentence.substring(0, 80)}": ${error.message}`,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Không thể phân tích ngữ pháp. Vui lòng thử lại sau.',
      );
    }
  }
}