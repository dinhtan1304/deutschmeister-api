import { Injectable, Logger, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GoogleGenAI } from '@google/genai';
import {
  ExamReadingTeil, ExamWritingTeil, TeilGrading,
  EXAM_READING_CONFIG, EXAM_WRITING_CONFIG,
  TeilConfig,
} from '../exam-reading/data/exam-config';
import {
  ExamListeningTeil, ListeningTeilConfig,
  EXAM_LISTENING_CONFIG,
} from '../exam-listening/data/exam-listening-config';

// ── Response Types ──

export interface ReadingQuestion {
  id: string;
  type: 'multiple_choice' | 'true_false' | 'zuordnung';
  questionText: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanationVi: string;
  explanationDe: string;
}

export interface VocabHighlight {
  word: string;
  translation: string;
}

export interface GeneratedReadingExercise {
  title: string;
  passage: string;
  questions: ReadingQuestion[];
  vocabHighlights: VocabHighlight[];
}

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

  // ═══════════════════════════════════════════════════════════
  // 4. TẠO BÀI ĐỌC HIỂU (Generate Reading Exercise)
  // ═══════════════════════════════════════════════════════════

  async generateReadingExercise(config: {
    topic: string;
    cefrLevel: string;
    textType: string;
    questionCount: number;
  }): Promise<GeneratedReadingExercise> {
    const systemInstruction = `Du bist ein erfahrener Deutschlehrer, der Leseverständnisübungen für vietnamesische Deutschlerner erstellt.

AUFGABEN:
1. Schreibe einen authentischen deutschen Text (${this.getTextTypeDE(config.textType)}) zum Thema "${config.topic}"
2. Erstelle genau ${config.questionCount} Verständnisfragen mit klaren korrekten Antworten
3. Hebe 5-8 wichtige Vokabeln mit vietnamesischen Übersetzungen hervor

NIVEAU ${config.cefrLevel}:
- A1: sehr einfache Sätze (S-V-O), häufige Alltagsvokabeln, 80-120 Wörter
- A2: einfache Sätze, bekannte Themen, Konjunktiv vermeiden, 100-150 Wörter
- B1: mittlere Komplexität, Nebensätze erlaubt, 150-200 Wörter
- B2: komplexere Strukturen, fachlicher Wortschatz, 200-280 Wörter

FRAGETYPEN-REGELN:
- "multiple_choice": Erstelle 4 Optionen. Verwende als option-IDs: "a", "b", "c", "d". correctAnswer = ID der richtigen Option.
- "true_false": Mache eine Aussage zum Text. Verwende options: [{id:"true",text:"Richtig"},{id:"false",text:"Falsch"}]. correctAnswer = "true" oder "false".
- Fragen-IDs: "q1", "q2", "q3", usw.

WICHTIG:
- Text und Fragen MÜSSEN auf Deutsch sein
- explanationVi MUSS auf Vietnamesisch sein
- explanationDe MUSS auf Deutsch sein
- correctAnswer MUSS exakt mit einer Option-ID übereinstimmen
- Keine Wiederholungsfragen`;

    const userPrompt = `Erstelle eine Leseverständnisübung:
- Thema: ${config.topic}
- Textsorte: ${this.getTextTypeDE(config.textType)}
- Niveau: ${config.cefrLevel}
- Anzahl Fragen: ${config.questionCount}`;

    const responseSchema = {
      type: 'OBJECT' as const,
      properties: {
        title: { type: 'STRING' as const, description: 'Kurzer Titel des Textes auf Deutsch' },
        passage: { type: 'STRING' as const, description: 'Der vollständige deutsche Text' },
        questions: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              id: { type: 'STRING' as const },
              type: { type: 'STRING' as const },
              questionText: { type: 'STRING' as const },
              options: {
                type: 'ARRAY' as const,
                items: {
                  type: 'OBJECT' as const,
                  properties: {
                    id: { type: 'STRING' as const },
                    text: { type: 'STRING' as const },
                  },
                  required: ['id', 'text'],
                },
              },
              correctAnswer: { type: 'STRING' as const },
              explanationVi: { type: 'STRING' as const },
              explanationDe: { type: 'STRING' as const },
            },
            required: ['id', 'type', 'questionText', 'options', 'correctAnswer', 'explanationVi', 'explanationDe'],
          },
        },
        vocabHighlights: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              word: { type: 'STRING' as const },
              translation: { type: 'STRING' as const },
            },
            required: ['word', 'translation'],
          },
        },
      },
      required: ['title', 'passage', 'questions', 'vocabHighlights'],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema,
          temperature: 0.75,
        },
      });

      if (!response.text) {
        throw new Error('Empty response from Gemini');
      }

      const result = JSON.parse(response.text) as GeneratedReadingExercise;

      if (!result.title || !result.passage || !Array.isArray(result.questions)) {
        throw new Error('Invalid reading exercise structure from Gemini');
      }

      return result;
    } catch (error) {
      this.logger.error(`Failed to generate reading exercise: ${error.message}`, error.stack);
      throw new InternalServerErrorException(
        'Không thể tạo bài đọc. Vui lòng thử lại sau.',
      );
    }
  }

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

  private getTextTypeDE(type: string): string {
    const map: Record<string, string> = {
      anzeige: 'Anzeige / Bekanntmachung',
      kurznachricht: 'Kurznachricht / SMS',
      brief: 'Brief / E-Mail',
      artikel: 'Zeitungsartikel',
      dialog: 'Dialog / Gespräch',
      sign: 'Schild / Hinweisschild',
      mixed: 'Gemischte Textsorten',
      form: 'Formular / Tabelle',
    };
    return map[type] || type;
  }

  // ═══════════════════════════════════════════════════════════
  // 5. EXAM READING — Orchestrator
  // ═══════════════════════════════════════════════════════════

  async generateExamReading(examType: 'GOETHE' | 'TELC', cefrLevel: string): Promise<ExamReadingTeil[]> {
    const config = EXAM_READING_CONFIG[examType]?.[cefrLevel];
    if (!config) throw new InternalServerErrorException(`Unsupported exam: ${examType} ${cefrLevel}`);

    const teilPromises = config.teile.map((tc, i) =>
      this.generateTeilFromConfig(tc, i + 1, cefrLevel, config.teile.length),
    );
    const teile = await Promise.all(teilPromises);
    return teile;
  }

  private async generateTeilFromConfig(tc: TeilConfig, number: number, level: string, totalTeile: number): Promise<ExamReadingTeil> {
    switch (tc.type) {
      case 'richtig_falsch':
        return this.generateRichtigFalschTeil(number, level, tc.textType, tc.count, totalTeile);
      case 'multiple_choice':
        return this.generateMCQTeil(number, level, tc.numTexts, tc.perText, totalTeile);
      case 'zuordnung':
        return this.generateZuordnungTeil(number, level, tc.style, tc.requirements, tc.options, totalTeile);
      case 'ja_nein':
        return this.generateJaNeinTeil(number, level, tc.count, totalTeile);
      case 'sprachbausteine':
        return this.generateSprachbausteineTeil(number, level, tc.gaps, tc.hasWordBank);
      default:
        throw new InternalServerErrorException(`Unknown Teil type`);
    }
  }

  private async generateRichtigFalschTeil(
    number: number, level: string, textType: string, count: number, totalTeile: number,
  ): Promise<ExamReadingTeil> {
    const wordCount = level === 'A1' ? '100-140' : level === 'A2' ? '150-200' : '220-300';
    const instruction = `Lesen Sie den Text und entscheiden Sie: Richtig oder Falsch.`;

    const levelContentGuide = level === 'A1'
      ? 'Verwende einfache Sätze (S+V+O). Konkrete Alltagsthemen: Familie, Freizeit, Wohnen, Einkaufen. Nenne spezifische Namen, Orte und einfache Zahlen.'
      : level === 'A2'
      ? 'Verwende kurze und mittellange Sätze mit Nebensätzen (weil, wenn, dass). Themen: Arbeit, Reisen, Gesundheit, soziale Aktivitäten. Nenne konkrete Details: Datum, Uhrzeit, Preise, Orte.'
      : 'Verwende komplexe Sätze mit Relativsätzen und Modalpartikeln. Themen: gesellschaftliche Fragen, Beruf, Umwelt, Kultur. Mehrere Absätze mit Einleitung, Hauptteil und Schluss. Nenne viele spezifische Fakten, Statistiken oder Beispiele.';

    const systemInstruction = `Du bist ein Prüfungsersteller für das Goethe-/TELC-Zertifikat (Niveau ${level}).
Erstelle einen authentischen deutschen Text (${this.getTextTypeDE(textType)}) und ${count} Richtig/Falsch-Fragen dazu.

WICHTIG — TEXTLÄNGE: Der Text MUSS ${wordCount} Wörter lang sein. Zähle die Wörter und stelle sicher, dass du die Mindestanzahl erreichst. Schreibe KEINE kurzen Texte.

Inhaltliche Anforderungen:
- ${levelContentGuide}
- Füge spezifische Informationen ein (echte klingende Namen, Städte, Daten, Uhrzeiten, Zahlen, Preise)
- Der Text soll natürlich und authentisch klingen — wie in einer echten Prüfung
- Verteile den Inhalt gleichmäßig: mehrere Informationseinheiten, die je eine Frage ermöglichen

Technische Regeln:
- Jede Frage ist eine Aussage über den Text — der Lernende entscheidet: richtig oder falsch
- correctAnswer muss exakt "richtig" oder "falsch" sein
- Mische richtig und falsch (ca. 50/50)
- Fragen-IDs: "q1", "q2", ..., "q${count}"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch
- Der Text enthält genug Inhalt für alle ${count} eindeutigen, klar beantwortbaren Fragen`;

    const userPrompt = `Erstelle Teil ${number} (von ${totalTeile}): Richtig/Falsch-Übung
Niveau: ${level} | Textsorte: ${this.getTextTypeDE(textType)} | Anzahl Fragen: ${count}`;

    const schema = this.buildTeilSchema('richtig_falsch', count);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number,
        taskType: 'richtig_falsch',
        instruction: raw.instruction || instruction,
        maxPoints: count,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateRichtigFalschTeil Teil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Teil Richtig/Falsch.');
    }
  }

  private async generateMCQTeil(
    number: number, level: string, numTexts: number, perText: number, totalTeile: number,
  ): Promise<ExamReadingTeil> {
    const totalQ = numTexts * perText;
    const wordCount = level === 'A1' ? '100-140' : level === 'A2' ? '150-200' : '220-300';

    const mcqLevelGuide = level === 'A1'
      ? 'Einfache, klare Sätze. Alltagssituationen mit konkreten Namen, Zahlen und Orten.'
      : level === 'A2'
      ? 'Mittellange Sätze. Vielfältige Themen (Beruf, Freizeit, Reise). Konkrete Details: Daten, Preise, Uhrzeiten.'
      : 'Komplexe Sätze mit Neben- und Relativsätzen. Anspruchsvolle Themen (Gesellschaft, Umwelt, Kultur). Mehrere Absätze mit reichen Informationen, Zahlen, Zitaten oder Beispielen.';

    const systemInstruction = `Du bist ein Prüfungsersteller für das Goethe-/TELC-Zertifikat (Niveau ${level}).
Erstelle ${numTexts} authentische deutsche Texte und ${totalQ} Multiple-Choice-Fragen (je ${perText} Fragen pro Text).

WICHTIG — TEXTLÄNGE: Jeder Text MUSS ${wordCount} Wörter lang sein. Schreibe vollständige, inhaltlich reiche Texte — keine kurzen Zusammenfassungen.

Inhaltliche Anforderungen pro Text:
- ${mcqLevelGuide}
- Verschiedene Textsorten (E-Mail, Zeitungsartikel, Forenbeitrag, Prospekt, Bericht) — nicht immer dasselbe Format
- Nenne spezifische Details: echte klingende Namen, Orte, Daten, Zahlen, Preise
- Jeder Text enthält mindestens ${perText + 2} unterschiedliche Informationseinheiten

Technische Regeln:
- 3 Antwortoptionen pro Frage: "a", "b", "c" — nur eine ist korrekt
- Die falschen Optionen sind plausibel, aber klar falsch laut Text
- correctAnswer: exakt "a", "b" oder "c"
- Fragen-IDs: "q1"..."q${totalQ}" (fortlaufend über alle Texte)
- Text-IDs: "text_1", "text_2", usw.
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`;

    const userPrompt = `Erstelle Teil ${number} (von ${totalTeile}): Multiple-Choice-Übung
Niveau: ${level} | Anzahl Texte: ${numTexts} | Fragen pro Text: ${perText}`;

    const schema = this.buildTeilSchema('multiple_choice', totalQ);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number,
        taskType: 'multiple_choice',
        instruction: raw.instruction || `Lesen Sie die Texte und wählen Sie die richtige Antwort (a, b oder c).`,
        maxPoints: totalQ,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateMCQTeil Teil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Teil Multiple Choice.');
    }
  }

  private async generateZuordnungTeil(
    number: number, level: string, style: 'person_to_text' | 'simple_ab',
    reqCount: number, optCount: number, totalTeile: number,
  ): Promise<ExamReadingTeil> {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, optCount).split('');

    const systemInstruction = style === 'simple_ab'
      ? `Du bist ein Prüfungsersteller für das Goethe-Zertifikat ${level}.
Erstelle ${reqCount} Anforderungen (Wünsche/Bedürfnisse von Personen) und 2 Optionen (A und B), die je eine andere Möglichkeit beschreiben.

WICHTIG — TEXTLÄNGE: Jede Option (A und B) MUSS 50-80 Wörter lang sein. Beschreibe jede Option mit konkreten Details, Öffnungszeiten, Leistungen, Preisen oder Besonderheiten — kein kurzer Einzeiler.

Regeln:
- Die 2 Optionen beschreiben verschiedene Einrichtungen/Angebote zum selben Thema
- Jede Anforderung kann NUR Option A oder B zugeordnet werden — nie beide
- Die Anforderungen sind spezifisch genug, um eindeutig zugeordnet zu werden
- correctAnswer: "A" oder "B" (Großbuchstabe)
- Anforderungs-IDs: "q1"..."q${reqCount}"
- Text-IDs: "A", "B"
- explanationVi auf Vietnamesisch`
      : `Du bist ein Prüfungsersteller für das Goethe-/TELC-Zertifikat (Niveau ${level}).
Erstelle ${reqCount} Personen-Anforderungen und ${optCount} Anzeigen/Texte (${labels.join(', ')}).

WICHTIG — TEXTLÄNGE: Jede Anzeige/Text MUSS 60-90 Wörter lang sein. Füge spezifische Details ein: Öffnungszeiten, Preise, Angebote, Kontaktdaten, Besonderheiten — kein kurzer Einzeiler.

Regeln:
- Jeder Text hat ein klar definiertes, einzigartiges Thema (z.B. Sportkurs, Sprachkurs, Jobangebot, Veranstaltung, Wohnungsanzeige)
- ${reqCount} Anforderungen werden genau einer Anzeige zugeordnet (${optCount - reqCount} Anzeigen passen zu keiner Person — sie sind "Fallen")
- Die Anforderungen der Personen sind spezifisch und eindeutig einer Anzeige zuzuordnen
- correctAnswer: Großbuchstabe der passenden Anzeige (${labels.join('/')})
- Fragen-IDs: "q1"..."q${reqCount}"
- Text-IDs und labels: "${labels.join('", "')}"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`;

    const userPrompt = `Erstelle Teil ${number} (von ${totalTeile}): Zuordnungsübung
Niveau: ${level} | Stil: ${style} | Anforderungen: ${reqCount} | Optionen: ${optCount}`;

    const schema = this.buildTeilSchema('zuordnung', reqCount);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number,
        taskType: 'zuordnung',
        instruction: raw.instruction || `Lesen Sie die Texte (${labels.join(', ')}) und ordnen Sie zu.`,
        maxPoints: reqCount,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateZuordnungTeil Teil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Teil Zuordnung.');
    }
  }

  private async generateJaNeinTeil(number: number, level: string, count: number, totalTeile: number): Promise<ExamReadingTeil> {
    const systemInstruction = `Du bist ein Prüfungsersteller für das Goethe-Zertifikat ${level}.
Erstelle einen Diskussionsthema-Titel und ${count} Leserbriefe (je 80-120 Wörter) von verschiedenen Personen zu diesem Thema.

WICHTIG — TEXTLÄNGE: Jeder Leserbrief MUSS 80-120 Wörter lang sein. Schreibe vollständige Briefe mit persönlichen Argumenten, Beispielen aus dem Alltag, eigenen Erfahrungen und einer klaren Schlussaussage — kein kurzer Einzeiler.

Inhaltliche Anforderungen:
- Wähle ein gesellschaftlich relevantes Thema (z.B. Homeoffice, Vegetarismus, öffentlicher Nahverkehr, Social Media, Schule)
- Jede Person hat einen echten deutschen Namen und einen unterschiedlichen Beruf/Hintergrund
- Mische Meinungen: ca. die Hälfte dafür (ja), die Hälfte dagegen (nein)
- Jeder Brief enthält mindestens 2 konkrete Argumente oder Beispiele
- Die Meinung muss eindeutig erkennbar sein (klar dafür oder klar dagegen)

Technische Regeln:
- Text-IDs: "thema" (Thematitel), "p1"..."p${count}" (Leserbriefe), labels: "Person 1"..."Person ${count}"
- Questions: Eine Frage pro Person — "Ist [Name] für oder gegen [Thema]?"
- options: [{id:"ja", text:"Ja, dafür"}, {id:"nein", text:"Nein, dagegen"}]
- correctAnswer: "ja" oder "nein"
- Fragen-IDs: "q1"..."q${count}"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`;

    const userPrompt = `Erstelle Teil ${number} (von ${totalTeile}): Meinungsartikel (Ja/Nein)
Niveau: ${level} | Anzahl Personen: ${count}`;

    const schema = this.buildTeilSchema('ja_nein', count);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number,
        taskType: 'ja_nein',
        instruction: raw.instruction || `Lesen Sie die Meinungen. Sind die Personen für oder gegen das Thema?`,
        maxPoints: count,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateJaNeinTeil Teil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Teil Ja/Nein.');
    }
  }

  private async generateSprachbausteineTeil(
    number: number, level: string, totalGaps: number, hasWordBank: boolean,
  ): Promise<ExamReadingTeil> {
    const mcqGaps = hasWordBank ? Math.floor(totalGaps / 2) : totalGaps;
    const wbGaps = hasWordBank ? totalGaps - mcqGaps : 0;
    const wordCount = level === 'A2' ? '140-170' : '210-260';

    const systemInstruction = hasWordBank
      ? `Du bist ein Prüfungsersteller für das TELC-Zertifikat ${level}.
Erstelle einen zusammenhängenden deutschen Text (${wordCount} Wörter) mit ${totalGaps} Lücken.

WICHTIG — TEXTLÄNGE: Der Text MUSS ${wordCount} Wörter lang sein (inklusive der [GAP_X]-Markierungen). Schreibe einen thematisch kohärenten, inhaltlich reichen Text mit mehreren Absätzen.

Markiere die Lücken als [GAP_1], [GAP_2], ..., [GAP_${totalGaps}].
Teil 1 (Lücken 1-${mcqGaps}): Multiple Choice — jede Lücke hat 3 Optionen (a, b, c).
Teil 2 (Lücken ${mcqGaps + 1}-${totalGaps}): Wortliste — Lernende wählen aus einer Wortliste von ${wbGaps + 5} Wörtern (${wbGaps} richtig + 5 Ablenkwörter).

Regeln:
- Verteile die Lücken gleichmäßig über den gesamten Text
- Teste verschiedene Sprachstrukturen: Verbformen, Präpositionen, Konjunktionen, Modalverben, Artikel, Adjektivendungen
- Fragen-IDs: "q1"..."q${totalGaps}"
- Lücken 1-${mcqGaps}: options = [{id:"a",...}, {id:"b",...}, {id:"c",...}], correctAnswer = "a"/"b"/"c"
- Lücken ${mcqGaps + 1}-${totalGaps}: options = [] (leer), correctAnswer = das korrekte Wort (genau wie in wordBank)
- wordBank: Array mit ${wbGaps + 5} Wörtern (${wbGaps} korrekte + 5 Ablenkwörter, gemischt)
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`
      : `Du bist ein Prüfungsersteller für das TELC-Zertifikat ${level}.
Erstelle einen zusammenhängenden deutschen Text (${wordCount} Wörter) mit ${totalGaps} Lücken.

WICHTIG — TEXTLÄNGE: Der Text MUSS ${wordCount} Wörter lang sein (inklusive der [GAP_X]-Markierungen). Schreibe einen thematisch kohärenten Text mit mehreren Sinnabschnitten.

Markiere die Lücken als [GAP_1], [GAP_2], ..., [GAP_${totalGaps}].
Jede Lücke hat 3 Optionen (a, b, c) — nur eine ist grammatisch und kontextuell korrekt.

Regeln:
- Verteile die Lücken gleichmäßig über den Text (nicht alle am Anfang)
- Teste verschiedene Strukturen: Verbformen, Präpositionen, Konjunktionen, Modalverben, Artikel, Adjektivendungen
- Fragen-IDs: "q1"..."q${totalGaps}"
- options = [{id:"a",...}, {id:"b",...}, {id:"c",...}], correctAnswer = "a"/"b"/"c"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`;

    const userPrompt = `Erstelle Sprachbausteine Teil ${number}:
Niveau: ${level} | Lücken gesamt: ${totalGaps} | Wortliste: ${hasWordBank}`;

    const schema = this.buildSprachbausteineSchema(totalGaps, hasWordBank, wbGaps);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.6 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[]; wordBank?: string[] };
      return {
        number,
        taskType: 'sprachbausteine',
        instruction: raw.instruction || `Lesen Sie den Text und wählen Sie die richtige Lösung.`,
        maxPoints: totalGaps,
        texts: raw.texts,
        questions: raw.questions,
        wordBank: raw.wordBank,
      };
    } catch (e) {
      this.logger.error(`generateSprachbausteineTeil Teil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Sprachbausteine.');
    }
  }

  // ─── Shared Gemini schema builders ───────────────────────────────────────────

  private buildTeilSchema(taskType: string, _questionCount?: number) {
    const optionsSchema = taskType === 'zuordnung' || taskType === 'ja_nein'
      ? {}
      : {
          options: {
            type: 'ARRAY' as const,
            items: {
              type: 'OBJECT' as const,
              properties: { id: { type: 'STRING' as const }, text: { type: 'STRING' as const } },
              required: ['id', 'text'],
            },
          },
        };

    return {
      type: 'OBJECT' as const,
      properties: {
        instruction: { type: 'STRING' as const },
        texts: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              id: { type: 'STRING' as const },
              label: { type: 'STRING' as const },
              type: { type: 'STRING' as const },
              title: { type: 'STRING' as const },
              author: { type: 'STRING' as const },
              content: { type: 'STRING' as const },
            },
            required: ['id', 'type', 'content'],
          },
        },
        questions: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              id: { type: 'STRING' as const },
              questionText: { type: 'STRING' as const },
              ...optionsSchema,
              correctAnswer: { type: 'STRING' as const },
              explanationVi: { type: 'STRING' as const },
              explanationDe: { type: 'STRING' as const },
            },
            required: ['id', 'questionText', 'correctAnswer', 'explanationVi', 'explanationDe'],
          },
        },
      },
      required: ['instruction', 'texts', 'questions'],
    };
  }

  private buildSprachbausteineSchema(totalGaps: number, hasWordBank: boolean, wbGaps: number) {
    const base = this.buildTeilSchema('sprachbausteine', totalGaps);
    if (!hasWordBank) return base;
    return {
      ...base,
      properties: {
        ...base.properties,
        wordBank: {
          type: 'ARRAY' as const,
          items: { type: 'STRING' as const },
          description: `${wbGaps + 5} Wörter für Teil 2 der Sprachbausteine`,
        },
      },
    };
  }

  // ═══════════════════════════════════════════════════════════
  // 6. EXAM WRITING — Generate Prompts + Grade
  // ═══════════════════════════════════════════════════════════

  async generateExamWritingPrompts(examType: 'GOETHE' | 'TELC', cefrLevel: string): Promise<ExamWritingTeil[]> {
    const config = EXAM_WRITING_CONFIG[examType]?.[cefrLevel];
    if (!config) throw new InternalServerErrorException(`Unsupported writing exam: ${examType} ${cefrLevel}`);

    const systemInstruction = `Du bist ein Prüfungsersteller für das ${examType}-Zertifikat (Niveau ${cefrLevel}).
Erstelle ${config.teile.length} Schreibaufgaben, die dem echten Prüfungsformat entsprechen.
Jede Aufgabe hat:
- Eine klare Situation auf Deutsch (scenario)
- Eine klare Aufgabenstellung (taskDescription)
- 3-4 Punkte, die der Kandidat ansprechen muss (requiredPoints)
- Einen realistischen Alltagskontext`;

    const teilsDesc = config.teile.map((t, i) =>
      `Aufgabe ${i + 1} (${t.label}): ${this.getWritingTypeDE(t.taskType)}, ${t.minWords}-${t.maxWords} Wörter, ${t.maxPoints} Punkte`
    ).join('\n');

    const userPrompt = `Erstelle Schreibaufgaben für ${examType} ${cefrLevel}:\n${teilsDesc}`;

    const responseSchema = {
      type: 'OBJECT' as const,
      properties: {
        teile: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              scenario: { type: 'STRING' as const },
              taskDescription: { type: 'STRING' as const },
              requiredPoints: { type: 'ARRAY' as const, items: { type: 'STRING' as const } },
            },
            required: ['scenario', 'taskDescription', 'requiredPoints'],
          },
        },
      },
      required: ['teile'],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema, temperature: 0.8 },
      });
      const raw = JSON.parse(response.text!) as { teile: { scenario: string; taskDescription: string; requiredPoints: string[] }[] };

      return config.teile.map((tc, i) => ({
        number: i + 1,
        taskType: tc.taskType,
        scenario: raw.teile[i]?.scenario || '',
        taskDescription: raw.teile[i]?.taskDescription || '',
        requiredPoints: raw.teile[i]?.requiredPoints || [],
        minWords: tc.minWords,
        maxWords: tc.maxWords,
        maxPoints: tc.maxPoints,
      }));
    } catch (e) {
      this.logger.error(`generateExamWritingPrompts ${examType} ${cefrLevel}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo đề viết. Vui lòng thử lại.');
    }
  }

  async gradeExamWritingTeil(
    teil: ExamWritingTeil, userText: string, cefrLevel: string,
  ): Promise<TeilGrading> {
    if (!userText || userText.trim().length < 5) {
      return {
        teilNumber: teil.number,
        score: 0,
        maxPoints: teil.maxPoints,
        feedback: 'Bài viết trống hoặc quá ngắn.',
        corrections: [],
        strengths: [],
        improvements: ['Vui lòng viết đầy đủ bài.'],
      };
    }

    const systemInstruction = `Du bist ein erfahrener Deutschlehrer, der Prüfungsaufsätze für vietnamesische Lernende bewertet (Niveau ${cefrLevel}).
Bewerte den folgenden Text nach diesen Kriterien:
1. Aufgabenerfüllung: Wurden alle geforderten Punkte angesprochen?
2. Grammatik und Ausdruck
3. Wortschatz
4. Kohärenz und Struktur

Gib eine Punktzahl von 0-100 (wo 100 = perfekt für ${cefrLevel}).
Erkläre konkrete Fehler auf Deutsch und Vietnamesisch.
Nenne 2-3 Stärken und 2-3 Verbesserungsvorschläge.`;

    const userPrompt = `AUFGABE:
${teil.scenario}
${teil.taskDescription}
Zu behandelnde Punkte: ${teil.requiredPoints.join(' | ')}
Wortanzahl: ${teil.minWords}-${teil.maxWords}

TEXT DES KANDIDATEN:
---
${userText.trim()}
---`;

    const responseSchema = {
      type: 'OBJECT' as const,
      properties: {
        score: { type: 'NUMBER' as const },
        feedback: { type: 'STRING' as const },
        corrections: {
          type: 'ARRAY' as const,
          items: {
            type: 'OBJECT' as const,
            properties: {
              original: { type: 'STRING' as const },
              corrected: { type: 'STRING' as const },
              explanationVi: { type: 'STRING' as const },
              explanationDe: { type: 'STRING' as const },
            },
            required: ['original', 'corrected', 'explanationVi', 'explanationDe'],
          },
        },
        strengths: { type: 'ARRAY' as const, items: { type: 'STRING' as const } },
        improvements: { type: 'ARRAY' as const, items: { type: 'STRING' as const } },
      },
      required: ['score', 'feedback', 'corrections', 'strengths', 'improvements'],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: userPrompt,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema, temperature: 0.3 },
      });
      const raw = JSON.parse(response.text!) as { score: number; feedback: string; corrections: any[]; strengths: string[]; improvements: string[] };
      return {
        teilNumber: teil.number,
        score: Math.max(0, Math.min(100, raw.score)),
        maxPoints: teil.maxPoints,
        feedback: raw.feedback,
        corrections: raw.corrections || [],
        strengths: raw.strengths || [],
        improvements: raw.improvements || [],
      };
    } catch (e) {
      this.logger.error(`gradeExamWritingTeil Teil ${teil.number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể chấm bài viết. Vui lòng thử lại.');
    }
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

  // ═══════════════════════════════════════════════════════════════════════════
  // LISTENING — Free practice session
  // ═══════════════════════════════════════════════════════════════════════════

  async generateListeningSession(cefrLevel: string, scriptType: string): Promise<{
    title: string;
    transcript: string;
    questions: any[];
  }> {
    const wordCount = cefrLevel === 'A1' ? '80-120' : cefrLevel === 'A2' ? '130-180' : '200-280';
    const questionCount = cefrLevel === 'B1' ? 7 : 5;
    const scriptTypeDE = this.getScriptTypeDE(scriptType);

    const systemInstruction = `Du bist ein Hörübungs-Ersteller für Deutschlernende auf Niveau ${cefrLevel}.
Erstelle einen gesprochenen deutschen Text (${scriptTypeDE}) als Hörübung.

WICHTIG — LÄNGE: Das Skript MUSS ${wordCount} Wörter lang sein. Schreibe natürlich gesprochene Sprache.
Format je nach Textsorte:
- Dialogue: "[Name1:] Text [Name2:] Text" — natürliche Gesprächssprache, Kontraktionen, Umgangssprache
- Monologue/Radio/Interview: Zusammenhängender Text, wie für ein Mikrofon gesprochen

Erstelle auch ${questionCount} Verständnisfragen (Richtig/Falsch ODER Multiple Choice a/b/c).
Regeln:
- Mische Fragetypen: ca. Hälfte richtig_falsch, Hälfte multiple_choice
- correctAnswer: "richtig"/"falsch" ODER "a"/"b"/"c"
- options: für richtig_falsch leer lassen; für MCQ 3 Optionen
- Fragen-IDs: "q1"..."q${questionCount}"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch
- Fragen testen echtes Hörverstehen — keine Trivia, nur was im Text steht`;

    const schema = {
      type: 'object',
      properties: {
        title: { type: 'string' },
        transcript: { type: 'string' },
        questions: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              questionText: { type: 'string' },
              type: { type: 'string', enum: ['richtig_falsch', 'multiple_choice'] },
              options: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, text: { type: 'string' } }, required: ['id', 'text'] } },
              correctAnswer: { type: 'string' },
              explanationVi: { type: 'string' },
              explanationDe: { type: 'string' },
            },
            required: ['id', 'questionText', 'type', 'correctAnswer', 'explanationVi', 'explanationDe'],
          },
        },
      },
      required: ['title', 'transcript', 'questions'],
    };

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Erstelle eine ${scriptTypeDE}-Hörübung auf Niveau ${cefrLevel} mit ${questionCount} Verständnisfragen.`,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.8 },
      });
      return JSON.parse(response.text!);
    } catch (e) {
      this.logger.error(`generateListeningSession: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo bài nghe.');
    }
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // EXAM LISTENING — Generate full Hören exam
  // ═══════════════════════════════════════════════════════════════════════════

  async generateExamListening(examType: 'GOETHE' | 'TELC', cefrLevel: string): Promise<ExamListeningTeil[]> {
    const config = EXAM_LISTENING_CONFIG[examType]?.[cefrLevel];
    if (!config) throw new InternalServerErrorException('Config not found');

    const totalTeile = config.teile.length;
    const teile = await Promise.all(
      config.teile.map((tc, idx) => this.generateListeningTeilFromConfig(tc, idx + 1, cefrLevel, totalTeile)),
    );
    return teile;
  }

  private async generateListeningTeilFromConfig(
    tc: ListeningTeilConfig, number: number, level: string, totalTeile: number,
  ): Promise<ExamListeningTeil> {
    switch (tc.type) {
      case 'richtig_falsch':
        return this.generateListeningRichtigFalschTeil(number, level, tc.scriptType, tc.count, tc.playCount, totalTeile);
      case 'multiple_choice':
        return this.generateListeningMCQTeil(number, level, tc.numTexts, tc.perText, tc.scriptType, tc.playCount, totalTeile);
      case 'zuordnung':
        return this.generateListeningZuordnungTeil(number, level, tc.style, tc.requirements, tc.options, tc.scriptType, tc.playCount, totalTeile);
      default:
        throw new InternalServerErrorException('Unknown listening Teil type');
    }
  }

  private async generateListeningRichtigFalschTeil(
    number: number, level: string, scriptType: string, count: number, playCount: number, totalTeile: number,
  ): Promise<ExamListeningTeil> {
    const wordCount = level === 'A1' ? '80-120' : level === 'A2' ? '130-180' : '220-300';
    const scriptTypeDE = this.getScriptTypeDE(scriptType);

    const systemInstruction = `Du bist ein Hörprüfungs-Ersteller für das Goethe-/TELC-Zertifikat (Niveau ${level}).
Erstelle einen gesprochenen deutschen Text (${scriptTypeDE}) und ${count} Richtig/Falsch-Fragen.

WICHTIG — LÄNGE: Das Skript MUSS ${wordCount} Wörter lang sein. Natürliche Gesprächs-/Radiosprache.
Format: ${scriptType.includes('dialogue') || scriptType.includes('interview') ? '"[Name1:] Text [Name2:] Text"' : 'Zusammenhängender gesprochener Text'}

Regeln:
- Jede Frage ist eine Aussage über den Inhalt — der Lernende entscheidet: richtig oder falsch
- correctAnswer: exakt "richtig" oder "falsch" (ca. 50/50 mischen)
- Fragen-IDs: "q1"..."q${count}"
- Text-ID: "text_1", type: "${scriptType}"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch
- Fragen testen echtes Hörverstehen — konkrete Informationen aus dem Text`;

    const schema = this.buildListeningTeilSchema('richtig_falsch', count, 1);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Erstelle Hör-Teil ${number} (von ${totalTeile}): Richtig/Falsch\nNiveau: ${level} | Textsorte: ${scriptTypeDE} | Fragen: ${count}`,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number, taskType: 'richtig_falsch', playCount, maxPoints: count,
        instruction: raw.instruction || `Hören Sie den Text. Richtig oder Falsch?`,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateListeningRichtigFalschTeil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Hör-Teil Richtig/Falsch.');
    }
  }

  private async generateListeningMCQTeil(
    number: number, level: string, numTexts: number, perText: number,
    scriptType: string, playCount: number, totalTeile: number,
  ): Promise<ExamListeningTeil> {
    const totalQ = numTexts * perText;
    const wordPerText = level === 'A1' ? '40-70' : level === 'A2' ? '60-100' : '100-160';
    const scriptTypeDE = this.getScriptTypeDE(scriptType);
    const formatHint = scriptType.includes('dialogue') || scriptType.includes('interview')
      ? `Format: "[Name1:] ... [Name2:] ..." — kurze natürliche Dialoge`
      : `Format: kurze Ansagen/Mitteilungen, wie am Mikrofon gesprochen`;

    const systemInstruction = `Du bist ein Hörprüfungs-Ersteller für das Goethe-/TELC-Zertifikat (Niveau ${level}).
Erstelle ${numTexts} gesprochene deutsche Texte (${scriptTypeDE}) und ${totalQ} Multiple-Choice-Fragen (je ${perText} Fragen pro Text).

WICHTIG — LÄNGE: Jeder Text MUSS ${wordPerText} Wörter lang sein. ${formatHint}

Regeln:
- 3 Antwortoptionen pro Frage: "a", "b", "c" — nur eine korrekt
- Die falschen Optionen sind plausibel aber klar falsch laut Text
- correctAnswer: exakt "a", "b" oder "c"
- Fragen-IDs: "q1"..."q${totalQ}" (fortlaufend)
- Text-IDs: "text_1", "text_2", usw.
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`;

    const schema = this.buildListeningTeilSchema('multiple_choice', totalQ, numTexts);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Erstelle Hör-Teil ${number} (von ${totalTeile}): Multiple Choice\nNiveau: ${level} | Texte: ${numTexts} | Fragen/Text: ${perText}`,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number, taskType: 'multiple_choice', playCount, maxPoints: totalQ,
        instruction: raw.instruction || `Hören Sie die Texte. Wählen Sie die richtige Antwort (a, b oder c).`,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateListeningMCQTeil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Hör-Teil Multiple Choice.');
    }
  }

  private async generateListeningZuordnungTeil(
    number: number, level: string, style: 'person_to_text' | 'simple_ab',
    reqCount: number, optCount: number, scriptType: string, playCount: number, totalTeile: number,
  ): Promise<ExamListeningTeil> {
    const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, optCount).split('');
    const scriptTypeDE = this.getScriptTypeDE(scriptType);

    const systemInstruction = style === 'simple_ab'
      ? `Du bist ein Hörprüfungs-Ersteller für das Goethe-Zertifikat ${level}.
Erstelle ${reqCount} Anforderungen (gehörte Wünsche/Bedürfnisse) und 2 kurze Hörtexte (A und B).
WICHTIG: Jeder Hörtext MUSS 50-80 Wörter lang sein. Natürliche gesprochene Sprache.
Regeln:
- correctAnswer: "A" oder "B"
- Fragen-IDs: "q1"..."q${reqCount}"
- Text-IDs: "A", "B", type: "${scriptType}"
- explanationVi auf Vietnamesisch`
      : `Du bist ein Hörprüfungs-Ersteller für das Goethe-/TELC-Zertifikat (Niveau ${level}).
Erstelle ${reqCount} Personen-Anforderungen und ${optCount} kurze Hörtexte (${labels.join(', ')}).
WICHTIG: Jeder Hörtext MUSS 50-80 Wörter lang sein (${scriptTypeDE}). Natürliche Ansagen/Dialoge.
Regeln:
- ${reqCount} Anforderungen werden einer Anzeige zugeordnet (${optCount - reqCount} sind "Fallen")
- correctAnswer: Großbuchstabe (${labels.join('/')})
- Fragen-IDs: "q1"..."q${reqCount}"
- Text-IDs und labels: "${labels.join('", "')}", type: "${scriptType}"
- explanationVi auf Vietnamesisch, explanationDe auf Deutsch`;

    const schema = this.buildListeningTeilSchema('zuordnung', reqCount, optCount);

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Erstelle Hör-Teil ${number} (von ${totalTeile}): Zuordnung\nNiveau: ${level} | ${reqCount} Anforderungen, ${optCount} Texte`,
        config: { systemInstruction, responseMimeType: 'application/json', responseSchema: schema, temperature: 0.75 },
      });
      const raw = JSON.parse(response.text!) as { instruction?: string; texts: any[]; questions: any[] };
      return {
        number, taskType: 'zuordnung', playCount, maxPoints: reqCount,
        instruction: raw.instruction || `Hören Sie die Texte (${labels.join(', ')}) und ordnen Sie zu.`,
        texts: raw.texts,
        questions: raw.questions,
      };
    } catch (e) {
      this.logger.error(`generateListeningZuordnungTeil ${number}: ${e.message}`);
      throw new InternalServerErrorException('Không thể tạo Hör-Teil Zuordnung.');
    }
  }

  // ─── Helper: script type DE label ────────────────────────────────────────────

  private getScriptTypeDE(scriptType: string): string {
    const map: Record<string, string> = {
      dialogue: 'Dialog',
      short_dialogue: 'kurzer Dialog',
      situational_dialogue: 'Alltagsgespräch',
      monologue: 'Monolog',
      announcement: 'Ansage/Durchsage',
      short_announcement: 'kurze Ansage',
      radio_announcement: 'Radioansage',
      radio_report: 'Radiobericht',
      interview: 'Interview',
      phone_message: 'Telefonansage/Nachricht',
      discussion: 'Diskussion/Gespräch',
    };
    return map[scriptType] || scriptType;
  }

  // ─── Helper: build listening Teil JSON schema ─────────────────────────────────

  private buildListeningTeilSchema(_taskType: string, _questionCount: number, _textCount: number) {
    const questionProps: any = {
      id: { type: 'string' },
      questionText: { type: 'string' },
      correctAnswer: { type: 'string' },
      explanationVi: { type: 'string' },
      explanationDe: { type: 'string' },
      options: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, text: { type: 'string' } }, required: ['id', 'text'] } },
    };

    return {
      type: 'object',
      properties: {
        instruction: { type: 'string' },
        texts: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              label: { type: 'string' },
              type: { type: 'string' },
              title: { type: 'string' },
              content: { type: 'string' },
              speakers: { type: 'array', items: { type: 'string' } },
            },
            required: ['id', 'type', 'content'],
          },
        },
        questions: {
          type: 'array',
          items: { type: 'object', properties: questionProps, required: ['id', 'questionText', 'correctAnswer', 'explanationVi', 'explanationDe'] },
        },
      },
      required: ['texts', 'questions'],
    };
  }
}