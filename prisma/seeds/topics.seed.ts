/**
 * Seed Data: 12 chủ đề A1 theo Goethe-Zertifikat
 * 
 * Chạy: npx prisma db seed
 * Hoặc: npx ts-node prisma/seeds/topics.seed.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================
// 12 Chủ đề A1 theo Goethe
// ============================================
const A1_TOPICS = [
  {
    slug: 'persoenliche-angaben',
    nameDe: 'Persönliche Angaben',
    nameEn: 'Personal Information',
    nameVi: 'Thông tin cá nhân',
    descriptionDe: 'Name, Alter, Herkunft, Beruf',
    descriptionEn: 'Name, age, origin, profession',
    descriptionVi: 'Tên, tuổi, quê quán, nghề nghiệp',
    icon: '👤',
    color: '#3B82F6',
    order: 1,
  },
  {
    slug: 'familie-freunde',
    nameDe: 'Familie und Freunde',
    nameEn: 'Family and Friends',
    nameVi: 'Gia đình và bạn bè',
    descriptionDe: 'Familienmitglieder, Beziehungen',
    descriptionEn: 'Family members, relationships',
    descriptionVi: 'Thành viên gia đình, các mối quan hệ',
    icon: '👨‍👩‍👧‍👦',
    color: '#EC4899',
    order: 2,
  },
  {
    slug: 'wohnen',
    nameDe: 'Wohnen',
    nameEn: 'Housing',
    nameVi: 'Nhà ở',
    descriptionDe: 'Wohnung, Haus, Möbel, Zimmer',
    descriptionEn: 'Apartment, house, furniture, rooms',
    descriptionVi: 'Căn hộ, nhà, nội thất, phòng',
    icon: '🏠',
    color: '#10B981',
    order: 3,
  },
  {
    slug: 'essen-trinken',
    nameDe: 'Essen und Trinken',
    nameEn: 'Food and Drinks',
    nameVi: 'Đồ ăn và thức uống',
    descriptionDe: 'Lebensmittel, Getränke, Restaurant',
    descriptionEn: 'Groceries, beverages, restaurant',
    descriptionVi: 'Thực phẩm, đồ uống, nhà hàng',
    icon: '🍽️',
    color: '#F59E0B',
    order: 4,
  },
  {
    slug: 'einkaufen',
    nameDe: 'Einkaufen',
    nameEn: 'Shopping',
    nameVi: 'Mua sắm',
    descriptionDe: 'Geschäfte, Preise, Kleidung',
    descriptionEn: 'Shops, prices, clothing',
    descriptionVi: 'Cửa hàng, giá cả, quần áo',
    icon: '🛒',
    color: '#8B5CF6',
    order: 5,
  },
  {
    slug: 'koerper-gesundheit',
    nameDe: 'Körper und Gesundheit',
    nameEn: 'Body and Health',
    nameVi: 'Cơ thể và sức khỏe',
    descriptionDe: 'Körperteile, Arzt, Krankheiten',
    descriptionEn: 'Body parts, doctor, illnesses',
    descriptionVi: 'Bộ phận cơ thể, bác sĩ, bệnh tật',
    icon: '🏥',
    color: '#EF4444',
    order: 6,
  },
  {
    slug: 'arbeit-beruf',
    nameDe: 'Arbeit und Beruf',
    nameEn: 'Work and Profession',
    nameVi: 'Công việc và nghề nghiệp',
    descriptionDe: 'Berufe, Arbeitsplatz, Kollegen',
    descriptionEn: 'Professions, workplace, colleagues',
    descriptionVi: 'Nghề nghiệp, nơi làm việc, đồng nghiệp',
    icon: '💼',
    color: '#6366F1',
    order: 7,
  },
  {
    slug: 'schule-ausbildung',
    nameDe: 'Schule und Ausbildung',
    nameEn: 'School and Education',
    nameVi: 'Trường học và đào tạo',
    descriptionDe: 'Schulfächer, Klassenraum, Lernen',
    descriptionEn: 'School subjects, classroom, learning',
    descriptionVi: 'Môn học, lớp học, học tập',
    icon: '🎓',
    color: '#14B8A6',
    order: 8,
  },
  {
    slug: 'freizeit-hobbys',
    nameDe: 'Freizeit und Hobbys',
    nameEn: 'Leisure and Hobbies',
    nameVi: 'Thời gian rảnh và sở thích',
    descriptionDe: 'Sport, Musik, Aktivitäten',
    descriptionEn: 'Sports, music, activities',
    descriptionVi: 'Thể thao, âm nhạc, hoạt động',
    icon: '⚽',
    color: '#22C55E',
    order: 9,
  },
  {
    slug: 'reisen-verkehr',
    nameDe: 'Reisen und Verkehr',
    nameEn: 'Travel and Transport',
    nameVi: 'Du lịch và giao thông',
    descriptionDe: 'Verkehrsmittel, Urlaub, Richtungen',
    descriptionEn: 'Transportation, vacation, directions',
    descriptionVi: 'Phương tiện, kỳ nghỉ, chỉ đường',
    icon: '✈️',
    color: '#0EA5E9',
    order: 10,
  },
  {
    slug: 'natur-wetter',
    nameDe: 'Natur und Wetter',
    nameEn: 'Nature and Weather',
    nameVi: 'Thiên nhiên và thời tiết',
    descriptionDe: 'Jahreszeiten, Tiere, Pflanzen',
    descriptionEn: 'Seasons, animals, plants',
    descriptionVi: 'Mùa, động vật, thực vật',
    icon: '🌤️',
    color: '#84CC16',
    order: 11,
  },
  {
    slug: 'medien-kommunikation',
    nameDe: 'Medien und Kommunikation',
    nameEn: 'Media and Communication',
    nameVi: 'Truyền thông và liên lạc',
    descriptionDe: 'Telefon, Internet, Post',
    descriptionEn: 'Phone, internet, mail',
    descriptionVi: 'Điện thoại, internet, bưu điện',
    icon: '📱',
    color: '#A855F7',
    order: 12,
  },
];

// ============================================
// Sample Words per Topic (10-15 từ mỗi topic)
// ============================================
const TOPIC_WORDS: Record<string, Array<{
  word: string;
  article: string;
  gender: 'masculine' | 'feminine' | 'neuter';
  plural?: string;
  translationEn: string;
  translationVi: string;
  isCore?: boolean;
}>> = {
  'persoenliche-angaben': [
    { word: 'Name', article: 'der', gender: 'masculine', plural: 'Namen', translationEn: 'name', translationVi: 'tên', isCore: true },
    { word: 'Vorname', article: 'der', gender: 'masculine', plural: 'Vornamen', translationEn: 'first name', translationVi: 'tên', isCore: true },
    { word: 'Nachname', article: 'der', gender: 'masculine', plural: 'Nachnamen', translationEn: 'last name', translationVi: 'họ', isCore: true },
    { word: 'Alter', article: 'das', gender: 'neuter', translationEn: 'age', translationVi: 'tuổi', isCore: true },
    { word: 'Adresse', article: 'die', gender: 'feminine', plural: 'Adressen', translationEn: 'address', translationVi: 'địa chỉ', isCore: true },
    { word: 'Geburtstag', article: 'der', gender: 'masculine', plural: 'Geburtstage', translationEn: 'birthday', translationVi: 'sinh nhật' },
    { word: 'Geburtsort', article: 'der', gender: 'masculine', plural: 'Geburtsorte', translationEn: 'birthplace', translationVi: 'nơi sinh' },
    { word: 'Land', article: 'das', gender: 'neuter', plural: 'Länder', translationEn: 'country', translationVi: 'quốc gia', isCore: true },
    { word: 'Stadt', article: 'die', gender: 'feminine', plural: 'Städte', translationEn: 'city', translationVi: 'thành phố', isCore: true },
    { word: 'Nationalität', article: 'die', gender: 'feminine', plural: 'Nationalitäten', translationEn: 'nationality', translationVi: 'quốc tịch' },
    { word: 'Beruf', article: 'der', gender: 'masculine', plural: 'Berufe', translationEn: 'profession', translationVi: 'nghề nghiệp', isCore: true },
    { word: 'Telefonnummer', article: 'die', gender: 'feminine', plural: 'Telefonnummern', translationEn: 'phone number', translationVi: 'số điện thoại', isCore: true },
  ],
  'familie-freunde': [
    { word: 'Familie', article: 'die', gender: 'feminine', plural: 'Familien', translationEn: 'family', translationVi: 'gia đình', isCore: true },
    { word: 'Mutter', article: 'die', gender: 'feminine', plural: 'Mütter', translationEn: 'mother', translationVi: 'mẹ', isCore: true },
    { word: 'Vater', article: 'der', gender: 'masculine', plural: 'Väter', translationEn: 'father', translationVi: 'bố', isCore: true },
    { word: 'Bruder', article: 'der', gender: 'masculine', plural: 'Brüder', translationEn: 'brother', translationVi: 'anh/em trai', isCore: true },
    { word: 'Schwester', article: 'die', gender: 'feminine', plural: 'Schwestern', translationEn: 'sister', translationVi: 'chị/em gái', isCore: true },
    { word: 'Kind', article: 'das', gender: 'neuter', plural: 'Kinder', translationEn: 'child', translationVi: 'con', isCore: true },
    { word: 'Sohn', article: 'der', gender: 'masculine', plural: 'Söhne', translationEn: 'son', translationVi: 'con trai' },
    { word: 'Tochter', article: 'die', gender: 'feminine', plural: 'Töchter', translationEn: 'daughter', translationVi: 'con gái' },
    { word: 'Großmutter', article: 'die', gender: 'feminine', plural: 'Großmütter', translationEn: 'grandmother', translationVi: 'bà' },
    { word: 'Großvater', article: 'der', gender: 'masculine', plural: 'Großväter', translationEn: 'grandfather', translationVi: 'ông' },
    { word: 'Freund', article: 'der', gender: 'masculine', plural: 'Freunde', translationEn: 'friend (male)', translationVi: 'bạn (nam)', isCore: true },
    { word: 'Freundin', article: 'die', gender: 'feminine', plural: 'Freundinnen', translationEn: 'friend (female)', translationVi: 'bạn (nữ)', isCore: true },
    { word: 'Mann', article: 'der', gender: 'masculine', plural: 'Männer', translationEn: 'man/husband', translationVi: 'đàn ông/chồng', isCore: true },
    { word: 'Frau', article: 'die', gender: 'feminine', plural: 'Frauen', translationEn: 'woman/wife', translationVi: 'phụ nữ/vợ', isCore: true },
  ],
  'wohnen': [
    { word: 'Haus', article: 'das', gender: 'neuter', plural: 'Häuser', translationEn: 'house', translationVi: 'nhà', isCore: true },
    { word: 'Wohnung', article: 'die', gender: 'feminine', plural: 'Wohnungen', translationEn: 'apartment', translationVi: 'căn hộ', isCore: true },
    { word: 'Zimmer', article: 'das', gender: 'neuter', plural: 'Zimmer', translationEn: 'room', translationVi: 'phòng', isCore: true },
    { word: 'Küche', article: 'die', gender: 'feminine', plural: 'Küchen', translationEn: 'kitchen', translationVi: 'bếp', isCore: true },
    { word: 'Bad', article: 'das', gender: 'neuter', plural: 'Bäder', translationEn: 'bathroom', translationVi: 'phòng tắm', isCore: true },
    { word: 'Schlafzimmer', article: 'das', gender: 'neuter', plural: 'Schlafzimmer', translationEn: 'bedroom', translationVi: 'phòng ngủ', isCore: true },
    { word: 'Wohnzimmer', article: 'das', gender: 'neuter', plural: 'Wohnzimmer', translationEn: 'living room', translationVi: 'phòng khách' },
    { word: 'Tisch', article: 'der', gender: 'masculine', plural: 'Tische', translationEn: 'table', translationVi: 'bàn', isCore: true },
    { word: 'Stuhl', article: 'der', gender: 'masculine', plural: 'Stühle', translationEn: 'chair', translationVi: 'ghế', isCore: true },
    { word: 'Bett', article: 'das', gender: 'neuter', plural: 'Betten', translationEn: 'bed', translationVi: 'giường', isCore: true },
    { word: 'Schrank', article: 'der', gender: 'masculine', plural: 'Schränke', translationEn: 'cupboard/wardrobe', translationVi: 'tủ' },
    { word: 'Fenster', article: 'das', gender: 'neuter', plural: 'Fenster', translationEn: 'window', translationVi: 'cửa sổ' },
    { word: 'Tür', article: 'die', gender: 'feminine', plural: 'Türen', translationEn: 'door', translationVi: 'cửa', isCore: true },
    { word: 'Lampe', article: 'die', gender: 'feminine', plural: 'Lampen', translationEn: 'lamp', translationVi: 'đèn' },
  ],
  'essen-trinken': [
    { word: 'Wasser', article: 'das', gender: 'neuter', translationEn: 'water', translationVi: 'nước', isCore: true },
    { word: 'Brot', article: 'das', gender: 'neuter', plural: 'Brote', translationEn: 'bread', translationVi: 'bánh mì', isCore: true },
    { word: 'Kaffee', article: 'der', gender: 'masculine', translationEn: 'coffee', translationVi: 'cà phê', isCore: true },
    { word: 'Tee', article: 'der', gender: 'masculine', plural: 'Tees', translationEn: 'tea', translationVi: 'trà', isCore: true },
    { word: 'Milch', article: 'die', gender: 'feminine', translationEn: 'milk', translationVi: 'sữa', isCore: true },
    { word: 'Fleisch', article: 'das', gender: 'neuter', translationEn: 'meat', translationVi: 'thịt', isCore: true },
    { word: 'Fisch', article: 'der', gender: 'masculine', plural: 'Fische', translationEn: 'fish', translationVi: 'cá', isCore: true },
    { word: 'Obst', article: 'das', gender: 'neuter', translationEn: 'fruit', translationVi: 'trái cây', isCore: true },
    { word: 'Gemüse', article: 'das', gender: 'neuter', translationEn: 'vegetables', translationVi: 'rau', isCore: true },
    { word: 'Apfel', article: 'der', gender: 'masculine', plural: 'Äpfel', translationEn: 'apple', translationVi: 'táo' },
    { word: 'Ei', article: 'das', gender: 'neuter', plural: 'Eier', translationEn: 'egg', translationVi: 'trứng', isCore: true },
    { word: 'Käse', article: 'der', gender: 'masculine', translationEn: 'cheese', translationVi: 'phô mai' },
    { word: 'Reis', article: 'der', gender: 'masculine', translationEn: 'rice', translationVi: 'cơm/gạo', isCore: true },
    { word: 'Restaurant', article: 'das', gender: 'neuter', plural: 'Restaurants', translationEn: 'restaurant', translationVi: 'nhà hàng' },
  ],
  'einkaufen': [
    { word: 'Geschäft', article: 'das', gender: 'neuter', plural: 'Geschäfte', translationEn: 'shop', translationVi: 'cửa hàng', isCore: true },
    { word: 'Supermarkt', article: 'der', gender: 'masculine', plural: 'Supermärkte', translationEn: 'supermarket', translationVi: 'siêu thị', isCore: true },
    { word: 'Preis', article: 'der', gender: 'masculine', plural: 'Preise', translationEn: 'price', translationVi: 'giá', isCore: true },
    { word: 'Geld', article: 'das', gender: 'neuter', translationEn: 'money', translationVi: 'tiền', isCore: true },
    { word: 'Euro', article: 'der', gender: 'masculine', plural: 'Euro(s)', translationEn: 'euro', translationVi: 'euro', isCore: true },
    { word: 'Cent', article: 'der', gender: 'masculine', plural: 'Cent(s)', translationEn: 'cent', translationVi: 'cent' },
    { word: 'Kleidung', article: 'die', gender: 'feminine', translationEn: 'clothes', translationVi: 'quần áo', isCore: true },
    { word: 'Hose', article: 'die', gender: 'feminine', plural: 'Hosen', translationEn: 'pants', translationVi: 'quần' },
    { word: 'Hemd', article: 'das', gender: 'neuter', plural: 'Hemden', translationEn: 'shirt', translationVi: 'áo sơ mi' },
    { word: 'Schuhe', article: 'die', gender: 'feminine', plural: 'Schuhe', translationEn: 'shoes', translationVi: 'giày', isCore: true },
    { word: 'Tasche', article: 'die', gender: 'feminine', plural: 'Taschen', translationEn: 'bag', translationVi: 'túi' },
    { word: 'Größe', article: 'die', gender: 'feminine', plural: 'Größen', translationEn: 'size', translationVi: 'kích cỡ' },
  ],
  'koerper-gesundheit': [
    { word: 'Kopf', article: 'der', gender: 'masculine', plural: 'Köpfe', translationEn: 'head', translationVi: 'đầu', isCore: true },
    { word: 'Auge', article: 'das', gender: 'neuter', plural: 'Augen', translationEn: 'eye', translationVi: 'mắt', isCore: true },
    { word: 'Nase', article: 'die', gender: 'feminine', plural: 'Nasen', translationEn: 'nose', translationVi: 'mũi' },
    { word: 'Mund', article: 'der', gender: 'masculine', plural: 'Münder', translationEn: 'mouth', translationVi: 'miệng' },
    { word: 'Ohr', article: 'das', gender: 'neuter', plural: 'Ohren', translationEn: 'ear', translationVi: 'tai' },
    { word: 'Hand', article: 'die', gender: 'feminine', plural: 'Hände', translationEn: 'hand', translationVi: 'tay', isCore: true },
    { word: 'Fuß', article: 'der', gender: 'masculine', plural: 'Füße', translationEn: 'foot', translationVi: 'chân', isCore: true },
    { word: 'Arzt', article: 'der', gender: 'masculine', plural: 'Ärzte', translationEn: 'doctor', translationVi: 'bác sĩ', isCore: true },
    { word: 'Ärztin', article: 'die', gender: 'feminine', plural: 'Ärztinnen', translationEn: 'doctor (female)', translationVi: 'bác sĩ (nữ)' },
    { word: 'Krankenhaus', article: 'das', gender: 'neuter', plural: 'Krankenhäuser', translationEn: 'hospital', translationVi: 'bệnh viện', isCore: true },
    { word: 'Apotheke', article: 'die', gender: 'feminine', plural: 'Apotheken', translationEn: 'pharmacy', translationVi: 'hiệu thuốc' },
    { word: 'Medikament', article: 'das', gender: 'neuter', plural: 'Medikamente', translationEn: 'medicine', translationVi: 'thuốc' },
  ],
  'arbeit-beruf': [
    { word: 'Arbeit', article: 'die', gender: 'feminine', plural: 'Arbeiten', translationEn: 'work', translationVi: 'công việc', isCore: true },
    { word: 'Büro', article: 'das', gender: 'neuter', plural: 'Büros', translationEn: 'office', translationVi: 'văn phòng', isCore: true },
    { word: 'Chef', article: 'der', gender: 'masculine', plural: 'Chefs', translationEn: 'boss', translationVi: 'sếp', isCore: true },
    { word: 'Kollege', article: 'der', gender: 'masculine', plural: 'Kollegen', translationEn: 'colleague (male)', translationVi: 'đồng nghiệp (nam)' },
    { word: 'Kollegin', article: 'die', gender: 'feminine', plural: 'Kolleginnen', translationEn: 'colleague (female)', translationVi: 'đồng nghiệp (nữ)' },
    { word: 'Lehrer', article: 'der', gender: 'masculine', plural: 'Lehrer', translationEn: 'teacher (male)', translationVi: 'giáo viên (nam)', isCore: true },
    { word: 'Lehrerin', article: 'die', gender: 'feminine', plural: 'Lehrerinnen', translationEn: 'teacher (female)', translationVi: 'giáo viên (nữ)' },
    { word: 'Student', article: 'der', gender: 'masculine', plural: 'Studenten', translationEn: 'student (male)', translationVi: 'sinh viên (nam)', isCore: true },
    { word: 'Studentin', article: 'die', gender: 'feminine', plural: 'Studentinnen', translationEn: 'student (female)', translationVi: 'sinh viên (nữ)' },
    { word: 'Computer', article: 'der', gender: 'masculine', plural: 'Computer', translationEn: 'computer', translationVi: 'máy tính', isCore: true },
    { word: 'Termin', article: 'der', gender: 'masculine', plural: 'Termine', translationEn: 'appointment', translationVi: 'cuộc hẹn' },
  ],
  'schule-ausbildung': [
    { word: 'Schule', article: 'die', gender: 'feminine', plural: 'Schulen', translationEn: 'school', translationVi: 'trường học', isCore: true },
    { word: 'Universität', article: 'die', gender: 'feminine', plural: 'Universitäten', translationEn: 'university', translationVi: 'đại học', isCore: true },
    { word: 'Kurs', article: 'der', gender: 'masculine', plural: 'Kurse', translationEn: 'course', translationVi: 'khóa học', isCore: true },
    { word: 'Klasse', article: 'die', gender: 'feminine', plural: 'Klassen', translationEn: 'class', translationVi: 'lớp' },
    { word: 'Buch', article: 'das', gender: 'neuter', plural: 'Bücher', translationEn: 'book', translationVi: 'sách', isCore: true },
    { word: 'Heft', article: 'das', gender: 'neuter', plural: 'Hefte', translationEn: 'notebook', translationVi: 'vở' },
    { word: 'Stift', article: 'der', gender: 'masculine', plural: 'Stifte', translationEn: 'pen', translationVi: 'bút' },
    { word: 'Tafel', article: 'die', gender: 'feminine', plural: 'Tafeln', translationEn: 'blackboard', translationVi: 'bảng đen' },
    { word: 'Hausaufgabe', article: 'die', gender: 'feminine', plural: 'Hausaufgaben', translationEn: 'homework', translationVi: 'bài tập về nhà' },
    { word: 'Prüfung', article: 'die', gender: 'feminine', plural: 'Prüfungen', translationEn: 'exam', translationVi: 'kỳ thi', isCore: true },
    { word: 'Sprache', article: 'die', gender: 'feminine', plural: 'Sprachen', translationEn: 'language', translationVi: 'ngôn ngữ', isCore: true },
  ],
  'freizeit-hobbys': [
    { word: 'Sport', article: 'der', gender: 'masculine', translationEn: 'sport', translationVi: 'thể thao', isCore: true },
    { word: 'Fußball', article: 'der', gender: 'masculine', translationEn: 'football/soccer', translationVi: 'bóng đá', isCore: true },
    { word: 'Musik', article: 'die', gender: 'feminine', translationEn: 'music', translationVi: 'âm nhạc', isCore: true },
    { word: 'Film', article: 'der', gender: 'masculine', plural: 'Filme', translationEn: 'movie', translationVi: 'phim', isCore: true },
    { word: 'Kino', article: 'das', gender: 'neuter', plural: 'Kinos', translationEn: 'cinema', translationVi: 'rạp chiếu phim' },
    { word: 'Buch', article: 'das', gender: 'neuter', plural: 'Bücher', translationEn: 'book', translationVi: 'sách' },
    { word: 'Hobby', article: 'das', gender: 'neuter', plural: 'Hobbys', translationEn: 'hobby', translationVi: 'sở thích', isCore: true },
    { word: 'Spiel', article: 'das', gender: 'neuter', plural: 'Spiele', translationEn: 'game', translationVi: 'trò chơi' },
    { word: 'Konzert', article: 'das', gender: 'neuter', plural: 'Konzerte', translationEn: 'concert', translationVi: 'buổi hòa nhạc' },
    { word: 'Party', article: 'die', gender: 'feminine', plural: 'Partys', translationEn: 'party', translationVi: 'tiệc' },
    { word: 'Schwimmen', article: 'das', gender: 'neuter', translationEn: 'swimming', translationVi: 'bơi lội' },
  ],
  'reisen-verkehr': [
    { word: 'Auto', article: 'das', gender: 'neuter', plural: 'Autos', translationEn: 'car', translationVi: 'ô tô', isCore: true },
    { word: 'Bus', article: 'der', gender: 'masculine', plural: 'Busse', translationEn: 'bus', translationVi: 'xe buýt', isCore: true },
    { word: 'Zug', article: 'der', gender: 'masculine', plural: 'Züge', translationEn: 'train', translationVi: 'tàu hỏa', isCore: true },
    { word: 'Flugzeug', article: 'das', gender: 'neuter', plural: 'Flugzeuge', translationEn: 'airplane', translationVi: 'máy bay', isCore: true },
    { word: 'Fahrrad', article: 'das', gender: 'neuter', plural: 'Fahrräder', translationEn: 'bicycle', translationVi: 'xe đạp', isCore: true },
    { word: 'Bahnhof', article: 'der', gender: 'masculine', plural: 'Bahnhöfe', translationEn: 'train station', translationVi: 'nhà ga', isCore: true },
    { word: 'Flughafen', article: 'der', gender: 'masculine', plural: 'Flughäfen', translationEn: 'airport', translationVi: 'sân bay' },
    { word: 'Straße', article: 'die', gender: 'feminine', plural: 'Straßen', translationEn: 'street', translationVi: 'đường phố' },
    { word: 'Fahrkarte', article: 'die', gender: 'feminine', plural: 'Fahrkarten', translationEn: 'ticket', translationVi: 'vé', isCore: true },
    { word: 'Urlaub', article: 'der', gender: 'masculine', plural: 'Urlaube', translationEn: 'vacation', translationVi: 'kỳ nghỉ', isCore: true },
    { word: 'Reise', article: 'die', gender: 'feminine', plural: 'Reisen', translationEn: 'trip', translationVi: 'chuyến đi' },
  ],
  'natur-wetter': [
    { word: 'Wetter', article: 'das', gender: 'neuter', translationEn: 'weather', translationVi: 'thời tiết', isCore: true },
    { word: 'Sonne', article: 'die', gender: 'feminine', plural: 'Sonnen', translationEn: 'sun', translationVi: 'mặt trời', isCore: true },
    { word: 'Regen', article: 'der', gender: 'masculine', translationEn: 'rain', translationVi: 'mưa', isCore: true },
    { word: 'Schnee', article: 'der', gender: 'masculine', translationEn: 'snow', translationVi: 'tuyết' },
    { word: 'Wind', article: 'der', gender: 'masculine', plural: 'Winde', translationEn: 'wind', translationVi: 'gió' },
    { word: 'Himmel', article: 'der', gender: 'masculine', translationEn: 'sky', translationVi: 'bầu trời' },
    { word: 'Baum', article: 'der', gender: 'masculine', plural: 'Bäume', translationEn: 'tree', translationVi: 'cây', isCore: true },
    { word: 'Blume', article: 'die', gender: 'feminine', plural: 'Blumen', translationEn: 'flower', translationVi: 'hoa', isCore: true },
    { word: 'Tier', article: 'das', gender: 'neuter', plural: 'Tiere', translationEn: 'animal', translationVi: 'động vật', isCore: true },
    { word: 'Hund', article: 'der', gender: 'masculine', plural: 'Hunde', translationEn: 'dog', translationVi: 'chó', isCore: true },
    { word: 'Katze', article: 'die', gender: 'feminine', plural: 'Katzen', translationEn: 'cat', translationVi: 'mèo', isCore: true },
    { word: 'Berg', article: 'der', gender: 'masculine', plural: 'Berge', translationEn: 'mountain', translationVi: 'núi' },
    { word: 'Meer', article: 'das', gender: 'neuter', plural: 'Meere', translationEn: 'sea', translationVi: 'biển' },
  ],
  'medien-kommunikation': [
    { word: 'Telefon', article: 'das', gender: 'neuter', plural: 'Telefone', translationEn: 'telephone', translationVi: 'điện thoại', isCore: true },
    { word: 'Handy', article: 'das', gender: 'neuter', plural: 'Handys', translationEn: 'mobile phone', translationVi: 'điện thoại di động', isCore: true },
    { word: 'Internet', article: 'das', gender: 'neuter', translationEn: 'internet', translationVi: 'internet', isCore: true },
    { word: 'E-Mail', article: 'die', gender: 'feminine', plural: 'E-Mails', translationEn: 'email', translationVi: 'email', isCore: true },
    { word: 'Brief', article: 'der', gender: 'masculine', plural: 'Briefe', translationEn: 'letter', translationVi: 'thư', isCore: true },
    { word: 'Post', article: 'die', gender: 'feminine', translationEn: 'mail/post office', translationVi: 'bưu điện' },
    { word: 'Zeitung', article: 'die', gender: 'feminine', plural: 'Zeitungen', translationEn: 'newspaper', translationVi: 'báo' },
    { word: 'Fernseher', article: 'der', gender: 'masculine', plural: 'Fernseher', translationEn: 'television', translationVi: 'ti vi' },
    { word: 'Radio', article: 'das', gender: 'neuter', plural: 'Radios', translationEn: 'radio', translationVi: 'radio' },
    { word: 'Nachricht', article: 'die', gender: 'feminine', plural: 'Nachrichten', translationEn: 'message/news', translationVi: 'tin nhắn/tin tức' },
  ],
};

// ============================================
// Seed Function
// ============================================
async function seedTopics() {
  console.log('🌱 Seeding Vocabulary Topics A1...\n');

  for (const topicData of A1_TOPICS) {
    console.log(`📁 Creating topic: ${topicData.nameDe}`);

    // Create or update topic
    const topic = await prisma.topic.upsert({
      where: { slug: topicData.slug },
      update: topicData,
      create: {
        ...topicData,
        level: 'A1',
      },
    });

    // Get words for this topic
    const words = TOPIC_WORDS[topicData.slug] || [];
    console.log(`   → Adding ${words.length} words...`);

    let addedCount = 0;
    let order = 1;

    for (const wordData of words) {
      // Find or create word in main Words table
      let word = await prisma.word.findFirst({
        where: {
          word: wordData.word,
          article: wordData.article,
        },
      });

      if (!word) {
        word = await prisma.word.create({
          data: {
            word: wordData.word,
            article: wordData.article,
            gender: wordData.gender,
            plural: wordData.plural,
            translationEn: wordData.translationEn,
            translationVi: wordData.translationVi,
            category: topicData.slug,
            level: 'A1',
            examples: [],
            tips: [],
          },
        });
      }

      // Link word to topic
      try {
        await prisma.topicWord.create({
          data: {
            topicId: topic.id,
            wordId: word.id,
            isCore: wordData.isCore || false,
            order: order++,
          },
        });
        addedCount++;
      } catch (e) {
        // Already exists, skip
      }
    }

    // Update word count
    await prisma.topic.update({
      where: { id: topic.id },
      data: { wordCount: addedCount },
    });

    console.log(`   ✅ Added ${addedCount} words to "${topicData.nameDe}"\n`);
  }

  console.log('🎉 Seeding complete!');

  // Print summary
  const stats = await prisma.topic.aggregate({
    _count: true,
    _sum: { wordCount: true },
  });

  console.log(`\n📊 Summary:`);
  console.log(`   Topics: ${stats._count}`);
  console.log(`   Total words: ${stats._sum.wordCount}`);
}

// Run seed
seedTopics()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
