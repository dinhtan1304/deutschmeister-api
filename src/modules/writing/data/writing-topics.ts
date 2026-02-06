// ═══════════════════════════════════════════════════════════
// Chủ đề bài viết theo CEFR Level
// ═══════════════════════════════════════════════════════════

export interface WritingTopic {
  topic: string;
  labelDe: string;
  labelVi: string;
  icon: string;
}

export interface WritingType {
  value: string;
  labelDe: string;
  labelVi: string;
  icon: string;
  levels: string[]; // CEFR levels mà dạng bài này phù hợp
}

// ── Chủ đề theo Level ──

export const WRITING_TOPICS: Record<string, WritingTopic[]> = {
  A1: [
    { topic: 'Sich vorstellen', labelDe: 'Sich vorstellen', labelVi: 'Giới thiệu bản thân', icon: '👋' },
    { topic: 'Familie', labelDe: 'Familie', labelVi: 'Gia đình', icon: '👨‍👩‍👧‍👦' },
    { topic: 'Wohnung', labelDe: 'Wohnung', labelVi: 'Nhà ở', icon: '🏠' },
    { topic: 'Essen und Trinken', labelDe: 'Essen und Trinken', labelVi: 'Ăn uống', icon: '🍽️' },
    { topic: 'Einkaufen', labelDe: 'Einkaufen', labelVi: 'Mua sắm', icon: '🛒' },
    { topic: 'Tagesablauf', labelDe: 'Tagesablauf', labelVi: 'Lịch trình trong ngày', icon: '⏰' },
    { topic: 'Freizeit', labelDe: 'Freizeit', labelVi: 'Thời gian rảnh', icon: '🎮' },
    { topic: 'Wetter', labelDe: 'Wetter', labelVi: 'Thời tiết', icon: '☀️' },
    { topic: 'Kleidung', labelDe: 'Kleidung', labelVi: 'Quần áo', icon: '👗' },
    { topic: 'Wegbeschreibung', labelDe: 'Wegbeschreibung', labelVi: 'Chỉ đường', icon: '🗺️' },
    { topic: 'Arztbesuch', labelDe: 'Arztbesuch', labelVi: 'Đi khám bác sĩ', icon: '🏥' },
    { topic: 'Schule und Beruf', labelDe: 'Schule und Beruf', labelVi: 'Trường học & Nghề nghiệp', icon: '📚' },
  ],
  A2: [
    { topic: 'Reisen', labelDe: 'Reisen', labelVi: 'Du lịch', icon: '✈️' },
    { topic: 'Feste und Feiertage', labelDe: 'Feste und Feiertage', labelVi: 'Lễ hội', icon: '🎉' },
    { topic: 'Medien', labelDe: 'Medien', labelVi: 'Truyền thông', icon: '📱' },
    { topic: 'Gesundheit', labelDe: 'Gesundheit', labelVi: 'Sức khỏe', icon: '💪' },
    { topic: 'Umwelt', labelDe: 'Umwelt', labelVi: 'Môi trường', icon: '🌍' },
    { topic: 'Nachbarn', labelDe: 'Nachbarn', labelVi: 'Hàng xóm', icon: '🏘️' },
    { topic: 'Verkehr', labelDe: 'Verkehr', labelVi: 'Giao thông', icon: '🚗' },
    { topic: 'Wochenende', labelDe: 'Wochenende', labelVi: 'Cuối tuần', icon: '🌴' },
  ],
  B1: [
    { topic: 'Arbeitswelt', labelDe: 'Arbeitswelt', labelVi: 'Thế giới công việc', icon: '💼' },
    { topic: 'Kultur', labelDe: 'Kultur', labelVi: 'Văn hóa', icon: '🎭' },
    { topic: 'Erfahrungen', labelDe: 'Erfahrungen', labelVi: 'Kinh nghiệm sống', icon: '💡' },
    { topic: 'Zukunftspläne', labelDe: 'Zukunftspläne', labelVi: 'Kế hoạch tương lai', icon: '🎯' },
    { topic: 'Meinungen', labelDe: 'Meinungen äußern', labelVi: 'Bày tỏ ý kiến', icon: '💬' },
    { topic: 'Technologie', labelDe: 'Technologie', labelVi: 'Công nghệ', icon: '💻' },
  ],
  B2: [
    { topic: 'Gesellschaft', labelDe: 'Gesellschaft', labelVi: 'Xã hội', icon: '🏛️' },
    { topic: 'Wissenschaft', labelDe: 'Wissenschaft', labelVi: 'Khoa học', icon: '🔬' },
    { topic: 'Globalisierung', labelDe: 'Globalisierung', labelVi: 'Toàn cầu hóa', icon: '🌐' },
    { topic: 'Erörterung', labelDe: 'Erörterung', labelVi: 'Bài nghị luận', icon: '📝' },
    { topic: 'Bildungssystem', labelDe: 'Bildungssystem', labelVi: 'Hệ thống giáo dục', icon: '🎓' },
  ],
};

// ── Dạng bài viết ──

export const WRITING_TYPES: WritingType[] = [
  { value: 'email', labelDe: 'E-Mail', labelVi: 'Email', icon: '📧', levels: ['A1', 'A2', 'B1', 'B2'] },
  { value: 'brief', labelDe: 'Formeller Brief', labelVi: 'Thư trang trọng', icon: '✉️', levels: ['A2', 'B1', 'B2'] },
  { value: 'beschreibung', labelDe: 'Beschreibung', labelVi: 'Mô tả', icon: '🖼️', levels: ['A1', 'A2', 'B1'] },
  { value: 'tagebuch', labelDe: 'Tagebuch', labelVi: 'Nhật ký', icon: '📔', levels: ['A1', 'A2'] },
  { value: 'dialog', labelDe: 'Dialog', labelVi: 'Hội thoại', icon: '💬', levels: ['A1', 'A2'] },
  { value: 'aufsatz', labelDe: 'Aufsatz', labelVi: 'Bài luận', icon: '📝', levels: ['B1', 'B2'] },
  { value: 'einladung', labelDe: 'Einladung', labelVi: 'Thư mời', icon: '🎫', levels: ['A1', 'A2'] },
  { value: 'beschwerde', labelDe: 'Beschwerde', labelVi: 'Thư khiếu nại', icon: '😤', levels: ['A2', 'B1', 'B2'] },
  { value: 'bewerbung', labelDe: 'Bewerbung', labelVi: 'Đơn xin việc', icon: '💼', levels: ['B1', 'B2'] },
  { value: 'formular', labelDe: 'Formular', labelVi: 'Điền mẫu đơn', icon: '📋', levels: ['A1', 'A2'] },
];

// ── Gợi ý độ dài theo CEFR ──

export const WORD_COUNT_SUGGESTIONS: Record<string, { min: number; max: number; label: string }[]> = {
  A1: [
    { min: 20, max: 30, label: '20-30 từ (Rất ngắn)' },
    { min: 30, max: 50, label: '30-50 từ (Ngắn)' },
  ],
  A2: [
    { min: 30, max: 50, label: '30-50 từ (Ngắn)' },
    { min: 50, max: 80, label: '50-80 từ (Trung bình)' },
  ],
  B1: [
    { min: 80, max: 120, label: '80-120 từ (Trung bình)' },
    { min: 120, max: 180, label: '120-180 từ (Dài)' },
  ],
  B2: [
    { min: 150, max: 200, label: '150-200 từ (Dài)' },
    { min: 200, max: 300, label: '200-300 từ (Rất dài)' },
  ],
};
