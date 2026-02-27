// ═══════════════════════════════════════════════════════════
// Chủ đề bài đọc theo CEFR Level
// ═══════════════════════════════════════════════════════════

export interface ReadingTopic {
  topic: string;
  labelDe: string;
  labelVi: string;
  icon: string;
}

export interface ReadingTextType {
  value: string;
  labelDe: string;
  labelVi: string;
  icon: string;
  levels: string[];
  description: string;
}

// ── Chủ đề theo Level ──

export const READING_TOPICS: Record<string, ReadingTopic[]> = {
  A1: [
    { topic: 'Wohnung', labelDe: 'Wohnung', labelVi: 'Nhà ở', icon: '🏠' },
    { topic: 'Familie', labelDe: 'Familie', labelVi: 'Gia đình', icon: '👨‍👩‍👧‍👦' },
    { topic: 'Einkaufen', labelDe: 'Einkaufen', labelVi: 'Mua sắm', icon: '🛒' },
    { topic: 'Essen und Trinken', labelDe: 'Essen und Trinken', labelVi: 'Ăn uống', icon: '🍽️' },
    { topic: 'Tagesablauf', labelDe: 'Tagesablauf', labelVi: 'Lịch trình trong ngày', icon: '⏰' },
    { topic: 'Schule', labelDe: 'Schule', labelVi: 'Trường học', icon: '🏫' },
    { topic: 'Freizeit', labelDe: 'Freizeit', labelVi: 'Thời gian rảnh', icon: '🎮' },
    { topic: 'Wetter', labelDe: 'Wetter', labelVi: 'Thời tiết', icon: '☀️' },
    { topic: 'Kleidung', labelDe: 'Kleidung', labelVi: 'Quần áo', icon: '👗' },
    { topic: 'Wegbeschreibung', labelDe: 'Wegbeschreibung', labelVi: 'Chỉ đường', icon: '🗺️' },
  ],
  A2: [
    { topic: 'Reisen', labelDe: 'Reisen', labelVi: 'Du lịch', icon: '✈️' },
    { topic: 'Gesundheit', labelDe: 'Gesundheit', labelVi: 'Sức khỏe', icon: '💪' },
    { topic: 'Verkehr', labelDe: 'Verkehr', labelVi: 'Giao thông', icon: '🚗' },
    { topic: 'Medien', labelDe: 'Medien', labelVi: 'Truyền thông', icon: '📱' },
    { topic: 'Feste und Feiertage', labelDe: 'Feste und Feiertage', labelVi: 'Lễ hội', icon: '🎉' },
    { topic: 'Beruf', labelDe: 'Beruf', labelVi: 'Nghề nghiệp', icon: '💼' },
    { topic: 'Nachbarschaft', labelDe: 'Nachbarschaft', labelVi: 'Khu phố', icon: '🏘️' },
    { topic: 'Umwelt', labelDe: 'Umwelt', labelVi: 'Môi trường', icon: '🌍' },
  ],
  B1: [
    { topic: 'Arbeitswelt', labelDe: 'Arbeitswelt', labelVi: 'Thế giới công việc', icon: '💼' },
    { topic: 'Kultur', labelDe: 'Kultur', labelVi: 'Văn hóa', icon: '🎭' },
    { topic: 'Technologie', labelDe: 'Technologie', labelVi: 'Công nghệ', icon: '💻' },
    { topic: 'Gesellschaft', labelDe: 'Gesellschaft', labelVi: 'Xã hội', icon: '🏛️' },
    { topic: 'Reisen und Tourismus', labelDe: 'Reisen und Tourismus', labelVi: 'Du lịch & Khám phá', icon: '🗺️' },
    { topic: 'Bildung', labelDe: 'Bildung', labelVi: 'Giáo dục', icon: '📚' },
  ],
  B2: [
    { topic: 'Gesellschaft und Politik', labelDe: 'Gesellschaft und Politik', labelVi: 'Xã hội & Chính trị', icon: '🏛️' },
    { topic: 'Wissenschaft', labelDe: 'Wissenschaft', labelVi: 'Khoa học', icon: '🔬' },
    { topic: 'Globalisierung', labelDe: 'Globalisierung', labelVi: 'Toàn cầu hóa', icon: '🌐' },
    { topic: 'Wirtschaft', labelDe: 'Wirtschaft', labelVi: 'Kinh tế', icon: '📈' },
    { topic: 'Umwelt und Klima', labelDe: 'Umwelt und Klima', labelVi: 'Môi trường & Khí hậu', icon: '🌱' },
  ],
};

// ── Loại văn bản ──

export const READING_TEXT_TYPES: ReadingTextType[] = [
  {
    value: 'anzeige',
    labelDe: 'Anzeige / Bekanntmachung',
    labelVi: 'Thông báo / Quảng cáo',
    icon: '📢',
    levels: ['A1', 'A2', 'B1', 'B2'],
    description: 'Kurze öffentliche Mitteilung (Stellenanzeige, Verkaufsanzeige, Ankündigung)',
  },
  {
    value: 'kurznachricht',
    labelDe: 'Kurznachricht / SMS',
    labelVi: 'Tin nhắn ngắn',
    icon: '💬',
    levels: ['A1', 'A2', 'B1'],
    description: 'Kurze persönliche Nachricht zwischen Bekannten',
  },
  {
    value: 'brief',
    labelDe: 'Brief / E-Mail',
    labelVi: 'Thư / Email',
    icon: '✉️',
    levels: ['A1', 'A2', 'B1', 'B2'],
    description: 'Formeller oder informeller Brief / E-Mail',
  },
  {
    value: 'artikel',
    labelDe: 'Zeitungsartikel',
    labelVi: 'Bài báo',
    icon: '📰',
    levels: ['A2', 'B1', 'B2'],
    description: 'Kurzer Zeitungs- oder Magazinartikel zu einem Thema',
  },
  {
    value: 'dialog',
    labelDe: 'Dialog / Gespräch',
    labelVi: 'Hội thoại',
    icon: '🗣️',
    levels: ['A1', 'A2', 'B1'],
    description: 'Schriftlicher Dialog zwischen zwei Personen',
  },
];
