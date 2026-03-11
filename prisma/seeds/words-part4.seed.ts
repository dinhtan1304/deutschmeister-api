import { prisma } from './client';

// ============================================
// Part 4: Goethe-Standard Vocabulary
// New topics: Kleidung, Tiere, Wochentage/Monate, Sport, Haushalt
// ============================================

const TOPICS_PART4 = [
  {
    slug: 'kleidung-mode',
    nameDe: 'Kleidung und Mode',
    nameEn: 'Clothing and Fashion',
    nameVi: 'Quần áo và thời trang',
    descriptionDe: 'Kleidungsstücke, Accessoires, Größen, Stoffe und Farben',
    descriptionEn: 'Clothing items, accessories, sizes, fabrics and colors',
    descriptionVi: 'Trang phục, phụ kiện, kích cỡ, chất liệu và màu sắc',
    icon: '👗', color: '#EC4899', order: 37, level: 'A1', type: 'general',
  },
  {
    slug: 'tiere',
    nameDe: 'Tiere',
    nameEn: 'Animals',
    nameVi: 'Động vật',
    descriptionDe: 'Haustiere, Wildtiere, Bauernhoftiere und Tiere im Zoo',
    descriptionEn: 'Pets, wild animals, farm animals and zoo animals',
    descriptionVi: 'Thú cưng, động vật hoang dã, động vật nông trại và thú vườn thú',
    icon: '🐾', color: '#92400E', order: 38, level: 'A1', type: 'general',
  },
  {
    slug: 'wochentage-monate',
    nameDe: 'Wochentage und Monate',
    nameEn: 'Days and Months',
    nameVi: 'Ngày trong tuần và tháng',
    descriptionDe: 'Wochentage, Monate, Jahreszeiten und Zeitausdrücke',
    descriptionEn: 'Days of the week, months, seasons and time expressions',
    descriptionVi: 'Ngày trong tuần, tháng, mùa và cách diễn đạt thời gian',
    icon: '📅', color: '#0EA5E9', order: 39, level: 'A1', type: 'general',
  },
  {
    slug: 'sport-fitness',
    nameDe: 'Sport und Fitness',
    nameEn: 'Sports and Fitness',
    nameVi: 'Thể thao và thể dục',
    descriptionDe: 'Sportarten, Wettkämpfe, Trainingsgeräte und Sportvereine',
    descriptionEn: 'Sports types, competitions, training equipment and sports clubs',
    descriptionVi: 'Các môn thể thao, thi đấu, dụng cụ tập luyện và câu lạc bộ',
    icon: '🏃', color: '#F97316', order: 40, level: 'A2', type: 'general',
  },
  {
    slug: 'haushalt-geraete',
    nameDe: 'Haushalt und Geräte',
    nameEn: 'Household and Appliances',
    nameVi: 'Đồ gia dụng và thiết bị',
    descriptionDe: 'Küchengeräte, Haushaltsgeräte, Geschirr und Reinigung',
    descriptionEn: 'Kitchen appliances, household devices, tableware and cleaning',
    descriptionVi: 'Đồ bếp, thiết bị gia dụng, bộ đồ ăn và dọn dẹp',
    icon: '🍳', color: '#6366F1', order: 41, level: 'A2', type: 'general',
  },
];

const TOPIC_WORDS_PART4: Record<string, Array<{
  word: string; article: string; gender: string; plural: string | null;
  translationEn: string; translationVi: string;
  examples: string[]; tips: string[]; level: string; isCore?: boolean;
}>> = {

  // ─── Kleidung und Mode ─────────────────────────────────────────────────────
  'kleidung-mode': [
    { word: 'Hose', article: 'die', gender: 'feminine', plural: 'Hosen', translationEn: 'trousers/pants', translationVi: 'quần dài', examples: ['Ich trage eine schwarze Hose.', 'Die Hose passt gut.'], tips: ['die Hose - feminine', 'Words ending in -e are often feminine'], level: 'A1', isCore: true },
    { word: 'Jacke', article: 'die', gender: 'feminine', plural: 'Jacken', translationEn: 'jacket', translationVi: 'áo khoác', examples: ['Ich brauche eine warme Jacke.', 'Die Jacke ist zu klein.'], tips: ['die Jacke - feminine', 'Words ending in -e are often feminine'], level: 'A1', isCore: true },
    { word: 'Hemd', article: 'das', gender: 'neuter', plural: 'Hemden', translationEn: 'shirt', translationVi: 'áo sơ mi', examples: ['Er trägt ein weißes Hemd.', 'Das Hemd ist gebügelt.'], tips: ['das Hemd - neuter', 'Mostly worn by men'], level: 'A1', isCore: true },
    { word: 'Bluse', article: 'die', gender: 'feminine', plural: 'Blusen', translationEn: 'blouse', translationVi: 'áo blouse', examples: ['Sie trägt eine elegante Bluse.', 'Die Bluse ist aus Seide.'], tips: ['die Bluse - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: true },
    { word: 'Kleid', article: 'das', gender: 'neuter', plural: 'Kleider', translationEn: 'dress', translationVi: 'váy đầm', examples: ['Das rote Kleid ist schön.', 'Sie trägt ein Sommerkleid.'], tips: ['das Kleid - neuter', 'Kleider can also mean "clothes" in plural'], level: 'A1', isCore: true },
    { word: 'Rock', article: 'der', gender: 'masculine', plural: 'Röcke', translationEn: 'skirt', translationVi: 'váy ngắn', examples: ['Der Rock ist zu kurz.', 'Sie trägt einen langen Rock.'], tips: ['der Rock - masculine (exception! though worn by women)', 'Umlaut in plural: Rock → Röcke'], level: 'A1', isCore: true },
    { word: 'Pullover', article: 'der', gender: 'masculine', plural: 'Pullover', translationEn: 'sweater/jumper', translationVi: 'áo len', examples: ['Im Winter trage ich einen Pullover.', 'Der Pullover ist warm.'], tips: ['der Pullover - masculine', 'Same in singular and plural'], level: 'A1', isCore: true },
    { word: 'T-Shirt', article: 'das', gender: 'neuter', plural: 'T-Shirts', translationEn: 'T-shirt', translationVi: 'áo phông', examples: ['Das T-Shirt ist bequem.', 'Im Sommer trage ich T-Shirts.'], tips: ['das T-Shirt - neuter', 'English loanword'], level: 'A1', isCore: true },
    { word: 'Mantel', article: 'der', gender: 'masculine', plural: 'Mäntel', translationEn: 'coat/overcoat', translationVi: 'áo khoác dài', examples: ['Im Herbst brauche ich einen Mantel.', 'Der Mantel ist sehr teuer.'], tips: ['der Mantel - masculine', 'Umlaut in plural: Mantel → Mäntel'], level: 'A1', isCore: true },
    { word: 'Schuh', article: 'der', gender: 'masculine', plural: 'Schuhe', translationEn: 'shoe', translationVi: 'giày', examples: ['Diese Schuhe sind unbequem.', 'Ich kaufe neue Schuhe.'], tips: ['der Schuh - masculine', 'Usually used in plural'], level: 'A1', isCore: true },
    { word: 'Stiefel', article: 'der', gender: 'masculine', plural: 'Stiefel', translationEn: 'boot', translationVi: 'ủng/boots', examples: ['Im Winter trage ich Stiefel.', 'Die Stiefel sind aus Leder.'], tips: ['der Stiefel - masculine', 'Same in singular and plural'], level: 'A1', isCore: true },
    { word: 'Socke', article: 'die', gender: 'feminine', plural: 'Socken', translationEn: 'sock', translationVi: 'tất/vớ', examples: ['Ich trage warme Socken.', 'Die Socken passen zusammen.'], tips: ['die Socke - feminine', 'Usually used in plural'], level: 'A1', isCore: true },
    { word: 'Mütze', article: 'die', gender: 'feminine', plural: 'Mützen', translationEn: 'hat/beanie', translationVi: 'mũ len', examples: ['Im Winter trage ich eine Mütze.', 'Die Mütze ist warm.'], tips: ['die Mütze - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: true },
    { word: 'Schal', article: 'der', gender: 'masculine', plural: 'Schals', translationEn: 'scarf', translationVi: 'khăn quàng cổ', examples: ['Der Schal hält warm.', 'Ich habe einen bunten Schal.'], tips: ['der Schal - masculine'], level: 'A1', isCore: true },
    { word: 'Handschuh', article: 'der', gender: 'masculine', plural: 'Handschuhe', translationEn: 'glove', translationVi: 'găng tay', examples: ['Ich brauche Handschuhe im Winter.', 'Die Handschuhe sind aus Wolle.'], tips: ['der Handschuh - masculine', 'Hand (hand) + Schuh (shoe) = hand shoe!'], level: 'A1', isCore: true },
    { word: 'Anzug', article: 'der', gender: 'masculine', plural: 'Anzüge', translationEn: 'suit (men\'s)', translationVi: 'bộ vest', examples: ['Er trägt einen Anzug zur Arbeit.', 'Der Anzug sitzt perfekt.'], tips: ['der Anzug - masculine', 'Umlaut in plural: Anzug → Anzüge'], level: 'A1', isCore: false },
    { word: 'Krawatte', article: 'die', gender: 'feminine', plural: 'Krawatten', translationEn: 'tie', translationVi: 'cà vạt', examples: ['Er trägt eine Krawatte.', 'Die Krawatte ist aus Seide.'], tips: ['die Krawatte - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: false },
    { word: 'Jeans', article: 'die', gender: 'feminine', plural: 'Jeans', translationEn: 'jeans', translationVi: 'quần jeans', examples: ['Ich trage gerne Jeans.', 'Die Jeans ist eng.'], tips: ['die Jeans - feminine', 'Singular and plural the same form'], level: 'A1', isCore: false },
    { word: 'Gürtel', article: 'der', gender: 'masculine', plural: 'Gürtel', translationEn: 'belt', translationVi: 'thắt lưng/dây nịt', examples: ['Der Gürtel ist zu eng.', 'Ich brauche einen neuen Gürtel.'], tips: ['der Gürtel - masculine', 'Same in singular and plural'], level: 'A1', isCore: false },
    { word: 'Tasche', article: 'die', gender: 'feminine', plural: 'Taschen', translationEn: 'bag/pocket', translationVi: 'túi xách/túi', examples: ['Ich habe eine neue Tasche.', 'Das ist in meiner Tasche.'], tips: ['die Tasche - feminine', 'Can mean both bag and pocket'], level: 'A1', isCore: false },
    { word: 'Größe', article: 'die', gender: 'feminine', plural: 'Größen', translationEn: 'size', translationVi: 'kích cỡ', examples: ['Welche Größe haben Sie?', 'Die Größe passt nicht.'], tips: ['die Größe - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: false },
    { word: 'Farbe', article: 'die', gender: 'feminine', plural: 'Farben', translationEn: 'color', translationVi: 'màu sắc', examples: ['Welche Farbe möchten Sie?', 'Die Farbe gefällt mir.'], tips: ['die Farbe - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: false },
    { word: 'Stoff', article: 'der', gender: 'masculine', plural: 'Stoffe', translationEn: 'fabric/material', translationVi: 'vải/chất liệu', examples: ['Der Stoff ist weich.', 'Aus welchem Stoff ist das?'], tips: ['der Stoff - masculine'], level: 'A1', isCore: false },
    { word: 'Baumwolle', article: 'die', gender: 'feminine', plural: null, translationEn: 'cotton', translationVi: 'vải bông', examples: ['Das Hemd ist aus Baumwolle.', 'Baumwolle ist bequem.'], tips: ['die Baumwolle - feminine', 'Baum (tree) + Wolle (wool) = tree wool!'], level: 'A2', isCore: false },
    { word: 'Wolle', article: 'die', gender: 'feminine', plural: null, translationEn: 'wool', translationVi: 'len', examples: ['Der Pullover ist aus Wolle.', 'Wolle hält warm.'], tips: ['die Wolle - feminine', 'Words ending in -e often feminine'], level: 'A2', isCore: false },
    { word: 'Leder', article: 'das', gender: 'neuter', plural: null, translationEn: 'leather', translationVi: 'da', examples: ['Das Leder ist weich.', 'Schuhe aus Leder.'], tips: ['das Leder - neuter'], level: 'A2', isCore: false },
    { word: 'Kleidung', article: 'die', gender: 'feminine', plural: null, translationEn: 'clothing', translationVi: 'quần áo (nói chung)', examples: ['Ich kaufe neue Kleidung.', 'Warme Kleidung ist wichtig.'], tips: ['die Kleidung - feminine, uncountable', 'Words ending in -ung always feminine'], level: 'A1', isCore: false },
    { word: 'Umkleidekabine', article: 'die', gender: 'feminine', plural: 'Umkleidekabinen', translationEn: 'fitting room', translationVi: 'phòng thử đồ', examples: ['Wo ist die Umkleidekabine?', 'Ich möchte das anprobieren.'], tips: ['die Umkleidekabine - feminine', 'Important in Goethe A1 shopping contexts'], level: 'A1', isCore: false },
  ],

  // ─── Tiere ─────────────────────────────────────────────────────────────────
  'tiere': [
    { word: 'Hund', article: 'der', gender: 'masculine', plural: 'Hunde', translationEn: 'dog', translationVi: 'chó', examples: ['Der Hund bellt laut.', 'Ich habe einen Hund.'], tips: ['der Hund - masculine', 'Common pet in Germany'], level: 'A1', isCore: true },
    { word: 'Katze', article: 'die', gender: 'feminine', plural: 'Katzen', translationEn: 'cat', translationVi: 'mèo', examples: ['Die Katze schläft.', 'Meine Katze heißt Mimi.'], tips: ['die Katze - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: true },
    { word: 'Vogel', article: 'der', gender: 'masculine', plural: 'Vögel', translationEn: 'bird', translationVi: 'chim', examples: ['Der Vogel singt.', 'Viele Vögel im Park.'], tips: ['der Vogel - masculine', 'Umlaut in plural: Vogel → Vögel'], level: 'A1', isCore: true },
    { word: 'Fisch', article: 'der', gender: 'masculine', plural: 'Fische', translationEn: 'fish', translationVi: 'cá', examples: ['Der Fisch schwimmt im Wasser.', 'Wir haben Fische im Aquarium.'], tips: ['der Fisch - masculine'], level: 'A1', isCore: true },
    { word: 'Pferd', article: 'das', gender: 'neuter', plural: 'Pferde', translationEn: 'horse', translationVi: 'ngựa', examples: ['Das Pferd läuft schnell.', 'Ich reite gern auf Pferden.'], tips: ['das Pferd - neuter'], level: 'A1', isCore: true },
    { word: 'Kuh', article: 'die', gender: 'feminine', plural: 'Kühe', translationEn: 'cow', translationVi: 'bò cái', examples: ['Die Kuh gibt Milch.', 'Kühe grasen auf der Wiese.'], tips: ['die Kuh - feminine', 'Umlaut in plural: Kuh → Kühe'], level: 'A1', isCore: true },
    { word: 'Schwein', article: 'das', gender: 'neuter', plural: 'Schweine', translationEn: 'pig', translationVi: 'lợn', examples: ['Das Schwein grunzt.', 'Schweine leben auf dem Bauernhof.'], tips: ['das Schwein - neuter', 'Also used figuratively: Schwein haben = to be lucky'], level: 'A1', isCore: true },
    { word: 'Schaf', article: 'das', gender: 'neuter', plural: 'Schafe', translationEn: 'sheep', translationVi: 'cừu', examples: ['Das Schaf blökt.', 'Wolle kommt vom Schaf.'], tips: ['das Schaf - neuter'], level: 'A1', isCore: true },
    { word: 'Hase', article: 'der', gender: 'masculine', plural: 'Hasen', translationEn: 'hare/rabbit', translationVi: 'thỏ rừng', examples: ['Der Hase läuft schnell.', 'Zu Ostern kommt der Osterhase.'], tips: ['der Hase - masculine', 'Easter bunny = Osterhase'], level: 'A1', isCore: true },
    { word: 'Kaninchen', article: 'das', gender: 'neuter', plural: 'Kaninchen', translationEn: 'rabbit', translationVi: 'thỏ nhà', examples: ['Das Kaninchen ist ein Haustier.', 'Kaninchen mögen Karotten.'], tips: ['das Kaninchen - neuter', 'Diminutive ending -chen is always neuter'], level: 'A1', isCore: false },
    { word: 'Maus', article: 'die', gender: 'feminine', plural: 'Mäuse', translationEn: 'mouse', translationVi: 'chuột', examples: ['Die Maus ist klein.', 'Die Katze jagt die Maus.'], tips: ['die Maus - feminine', 'Umlaut in plural: Maus → Mäuse', 'Also: computer mouse'], level: 'A1', isCore: false },
    { word: 'Bär', article: 'der', gender: 'masculine', plural: 'Bären', translationEn: 'bear', translationVi: 'gấu', examples: ['Der Bär schläft im Winter.', 'Berlin hat einen Bären im Wappen.'], tips: ['der Bär - masculine', 'The bear is Berlin\'s symbol!'], level: 'A1', isCore: true },
    { word: 'Tiger', article: 'der', gender: 'masculine', plural: 'Tiger', translationEn: 'tiger', translationVi: 'hổ', examples: ['Der Tiger ist ein Raubtier.', 'Tiger leben in Asien.'], tips: ['der Tiger - masculine', 'Same in singular and plural'], level: 'A1', isCore: false },
    { word: 'Löwe', article: 'der', gender: 'masculine', plural: 'Löwen', translationEn: 'lion', translationVi: 'sư tử', examples: ['Der Löwe ist der König der Tiere.', 'Löwen leben in Afrika.'], tips: ['der Löwe - masculine', 'Words ending in -e for male animals often masculine'], level: 'A1', isCore: false },
    { word: 'Elefant', article: 'der', gender: 'masculine', plural: 'Elefanten', translationEn: 'elephant', translationVi: 'voi', examples: ['Der Elefant hat einen langen Rüssel.', 'Elefanten sind sehr intelligent.'], tips: ['der Elefant - masculine', 'Words ending in -ant often masculine'], level: 'A1', isCore: false },
    { word: 'Affe', article: 'der', gender: 'masculine', plural: 'Affen', translationEn: 'monkey/ape', translationVi: 'khỉ', examples: ['Der Affe klettert auf den Baum.', 'Affen sind sehr klug.'], tips: ['der Affe - masculine', 'Words ending in -e for male animals often masculine'], level: 'A1', isCore: false },
    { word: 'Schlange', article: 'die', gender: 'feminine', plural: 'Schlangen', translationEn: 'snake', translationVi: 'rắn', examples: ['Die Schlange ist giftig.', 'Schlangen mögen Wärme.'], tips: ['die Schlange - feminine', 'Also means "queue/line" in everyday German!'], level: 'A1', isCore: false },
    { word: 'Delfin', article: 'der', gender: 'masculine', plural: 'Delfine', translationEn: 'dolphin', translationVi: 'cá heo', examples: ['Der Delfin ist sehr klug.', 'Delfine schwimmen schnell.'], tips: ['der Delfin - masculine', 'Also spelled: Delphin'], level: 'A2', isCore: false },
    { word: 'Hamster', article: 'der', gender: 'masculine', plural: 'Hamster', translationEn: 'hamster', translationVi: 'chuột hamster', examples: ['Mein Kind hat einen Hamster.', 'Der Hamster läuft im Rad.'], tips: ['der Hamster - masculine', 'Very popular pet in Germany'], level: 'A1', isCore: false },
    { word: 'Schildkröte', article: 'die', gender: 'feminine', plural: 'Schildkröten', translationEn: 'turtle/tortoise', translationVi: 'rùa', examples: ['Die Schildkröte bewegt sich langsam.', 'Schildkröten leben sehr lang.'], tips: ['die Schildkröte - feminine', 'Schild (shield) + Kröte (toad) = shield-toad!'], level: 'A2', isCore: false },
    { word: 'Schmetterling', article: 'der', gender: 'masculine', plural: 'Schmetterlinge', translationEn: 'butterfly', translationVi: 'bướm', examples: ['Der Schmetterling ist bunt.', 'Schmetterlinge mögen Blumen.'], tips: ['der Schmetterling - masculine', 'Words ending in -ling are always masculine'], level: 'A2', isCore: false },
    { word: 'Biene', article: 'die', gender: 'feminine', plural: 'Bienen', translationEn: 'bee', translationVi: 'ong', examples: ['Die Biene macht Honig.', 'Bienen sind wichtig für die Natur.'], tips: ['die Biene - feminine', 'Words ending in -e often feminine'], level: 'A2', isCore: false },
    { word: 'Tier', article: 'das', gender: 'neuter', plural: 'Tiere', translationEn: 'animal', translationVi: 'động vật', examples: ['Das Tier ist wild.', 'Welches Tier magst du?'], tips: ['das Tier - neuter'], level: 'A1', isCore: true },
    { word: 'Haustier', article: 'das', gender: 'neuter', plural: 'Haustiere', translationEn: 'pet', translationVi: 'thú cưng', examples: ['Haben Sie ein Haustier?', 'Mein Haustier ist ein Hund.'], tips: ['das Haustier - neuter', 'Haus + Tier = house animal'], level: 'A1', isCore: true },
    { word: 'Wildtier', article: 'das', gender: 'neuter', plural: 'Wildtiere', translationEn: 'wild animal', translationVi: 'động vật hoang dã', examples: ['Das Wildtier lebt in der Natur.', 'Wildtiere soll man nicht füttern.'], tips: ['das Wildtier - neuter', 'Wild + Tier = wild animal'], level: 'A2', isCore: false },
    { word: 'Zoo', article: 'der', gender: 'masculine', plural: 'Zoos', translationEn: 'zoo', translationVi: 'vườn thú', examples: ['Wir gehen in den Zoo.', 'Der Zoo hat viele Tiere.'], tips: ['der Zoo - masculine'], level: 'A1', isCore: true },
  ],

  // ─── Wochentage und Monate ─────────────────────────────────────────────────
  'wochentage-monate': [
    { word: 'Montag', article: 'der', gender: 'masculine', plural: 'Montage', translationEn: 'Monday', translationVi: 'Thứ Hai', examples: ['Am Montag arbeite ich.', 'Montag ist der erste Werktag.'], tips: ['der Montag - masculine', 'ALL days of the week are masculine in German!', 'Mond = moon (Moon-day)'], level: 'A1', isCore: true },
    { word: 'Dienstag', article: 'der', gender: 'masculine', plural: 'Dienstage', translationEn: 'Tuesday', translationVi: 'Thứ Ba', examples: ['Am Dienstag habe ich Kurs.', 'Dienstag ist mein freier Tag.'], tips: ['der Dienstag - masculine', 'ALL days are masculine: der Montag, Dienstag...'], level: 'A1', isCore: true },
    { word: 'Mittwoch', article: 'der', gender: 'masculine', plural: 'Mittwoche', translationEn: 'Wednesday', translationVi: 'Thứ Tư', examples: ['Mittwoch ist die Mitte der Woche.', 'Am Mittwoch gehe ich schwimmen.'], tips: ['der Mittwoch - masculine', 'Mitte + Woche = mid-week'], level: 'A1', isCore: true },
    { word: 'Donnerstag', article: 'der', gender: 'masculine', plural: 'Donnerstage', translationEn: 'Thursday', translationVi: 'Thứ Năm', examples: ['Am Donnerstag haben wir eine Prüfung.', 'Donnerstag kommt nach Mittwoch.'], tips: ['der Donnerstag - masculine', 'Donner = thunder (Thor\'s day)'], level: 'A1', isCore: true },
    { word: 'Freitag', article: 'der', gender: 'masculine', plural: 'Freitage', translationEn: 'Friday', translationVi: 'Thứ Sáu', examples: ['Freitag ist der letzte Arbeitstag.', 'Am Freitag gehen wir aus.'], tips: ['der Freitag - masculine', 'Frei + Tag = free day (Freya\'s day)'], level: 'A1', isCore: true },
    { word: 'Samstag', article: 'der', gender: 'masculine', plural: 'Samstage', translationEn: 'Saturday', translationVi: 'Thứ Bảy', examples: ['Am Samstag schlafe ich lang.', 'Samstag ist kein Schultag.'], tips: ['der Samstag - masculine', 'Also called "Sonnabend" in northern Germany'], level: 'A1', isCore: true },
    { word: 'Sonntag', article: 'der', gender: 'masculine', plural: 'Sonntage', translationEn: 'Sunday', translationVi: 'Chủ Nhật', examples: ['Am Sonntag ruhe ich mich aus.', 'Sonntag ist ein Ruhetag.'], tips: ['der Sonntag - masculine', 'Sonne = sun (Sun-day)'], level: 'A1', isCore: true },
    { word: 'Januar', article: 'der', gender: 'masculine', plural: 'Januare', translationEn: 'January', translationVi: 'Tháng Một', examples: ['Im Januar ist es kalt.', 'Der Januar hat 31 Tage.'], tips: ['der Januar - masculine', 'ALL months are masculine in German!'], level: 'A1', isCore: true },
    { word: 'Februar', article: 'der', gender: 'masculine', plural: 'Februare', translationEn: 'February', translationVi: 'Tháng Hai', examples: ['Der Februar ist der kürzeste Monat.', 'Im Februar ist Valentinstag.'], tips: ['der Februar - masculine', 'Shortest month: 28 or 29 days'], level: 'A1', isCore: true },
    { word: 'März', article: 'der', gender: 'masculine', plural: 'März', translationEn: 'March', translationVi: 'Tháng Ba', examples: ['Im März beginnt der Frühling.', 'Der März hat 31 Tage.'], tips: ['der März - masculine', 'Named after Mars (Roman god of war)'], level: 'A1', isCore: true },
    { word: 'April', article: 'der', gender: 'masculine', plural: 'Aprile', translationEn: 'April', translationVi: 'Tháng Tư', examples: ['Im April regnet es oft.', 'April, April — ein Scherzmonat!'], tips: ['der April - masculine', 'April Fools\' Day is April 1st'], level: 'A1', isCore: true },
    { word: 'Mai', article: 'der', gender: 'masculine', plural: 'Maie', translationEn: 'May', translationVi: 'Tháng Năm', examples: ['Im Mai blühen die Blumen.', 'Am 1. Mai ist Tag der Arbeit.'], tips: ['der Mai - masculine', 'May 1st is Labor Day in Germany'], level: 'A1', isCore: true },
    { word: 'Juni', article: 'der', gender: 'masculine', plural: 'Junis', translationEn: 'June', translationVi: 'Tháng Sáu', examples: ['Im Juni beginnt der Sommer.', 'Der Juni ist ein warmer Monat.'], tips: ['der Juni - masculine', 'Summer begins around June 21st'], level: 'A1', isCore: true },
    { word: 'Juli', article: 'der', gender: 'masculine', plural: 'Julis', translationEn: 'July', translationVi: 'Tháng Bảy', examples: ['Im Juli machen wir Urlaub.', 'Der Juli ist heiß.'], tips: ['der Juli - masculine', 'Named after Julius Caesar'], level: 'A1', isCore: true },
    { word: 'August', article: 'der', gender: 'masculine', plural: 'Auguste', translationEn: 'August', translationVi: 'Tháng Tám', examples: ['Im August gehen viele in den Urlaub.', 'Der August ist der wärmste Monat.'], tips: ['der August - masculine', 'Named after Emperor Augustus'], level: 'A1', isCore: true },
    { word: 'September', article: 'der', gender: 'masculine', plural: 'September', translationEn: 'September', translationVi: 'Tháng Chín', examples: ['Im September beginnt die Schule.', 'Der September ist golden.'], tips: ['der September - masculine', 'Septem = 7 in Latin (was 7th month in old calendar)'], level: 'A1', isCore: true },
    { word: 'Oktober', article: 'der', gender: 'masculine', plural: 'Oktober', translationEn: 'October', translationVi: 'Tháng Mười', examples: ['Im Oktober ist Oktoberfest.', 'Der Oktober ist bunt.'], tips: ['der Oktober - masculine', 'Oktoberfest is in September-October in Munich!'], level: 'A1', isCore: true },
    { word: 'November', article: 'der', gender: 'masculine', plural: 'November', translationEn: 'November', translationVi: 'Tháng Mười Một', examples: ['Im November ist es trüb.', 'Der November ist nebelig.'], tips: ['der November - masculine', 'Novem = 9 (was 9th month in old calendar)'], level: 'A1', isCore: true },
    { word: 'Dezember', article: 'der', gender: 'masculine', plural: 'Dezember', translationEn: 'December', translationVi: 'Tháng Mười Hai', examples: ['Im Dezember ist Weihnachten.', 'Der Dezember ist kalt und festlich.'], tips: ['der Dezember - masculine', 'Decem = 10 (was 10th month). Christmas month!'], level: 'A1', isCore: true },
    { word: 'Frühling', article: 'der', gender: 'masculine', plural: 'Frühlinge', translationEn: 'spring', translationVi: 'mùa xuân', examples: ['Im Frühling blühen die Blumen.', 'Der Frühling kommt nach dem Winter.'], tips: ['der Frühling - masculine', 'ALL seasons are masculine: der Frühling, Sommer, Herbst, Winter'], level: 'A1', isCore: true },
    { word: 'Sommer', article: 'der', gender: 'masculine', plural: 'Sommer', translationEn: 'summer', translationVi: 'mùa hè', examples: ['Im Sommer ist es heiß.', 'Ich liebe den Sommer.'], tips: ['der Sommer - masculine', 'ALL seasons are masculine!'], level: 'A1', isCore: true },
    { word: 'Herbst', article: 'der', gender: 'masculine', plural: 'Herbste', translationEn: 'autumn/fall', translationVi: 'mùa thu', examples: ['Im Herbst werden die Blätter bunt.', 'Der Herbst ist meine Lieblingsjahreszeit.'], tips: ['der Herbst - masculine', 'ALL seasons are masculine!'], level: 'A1', isCore: true },
    { word: 'Winter', article: 'der', gender: 'masculine', plural: 'Winter', translationEn: 'winter', translationVi: 'mùa đông', examples: ['Im Winter schneit es.', 'Der Winter ist kalt.'], tips: ['der Winter - masculine', 'ALL seasons are masculine: der Frühling, Sommer, Herbst, Winter'], level: 'A1', isCore: true },
    { word: 'Wochenende', article: 'das', gender: 'neuter', plural: 'Wochenenden', translationEn: 'weekend', translationVi: 'cuối tuần', examples: ['Am Wochenende schlafe ich lang.', 'Schönes Wochenende!'], tips: ['das Wochenende - neuter', 'Woche (week) + Ende (end)'], level: 'A1', isCore: true },
    { word: 'Werktag', article: 'der', gender: 'masculine', plural: 'Werktage', translationEn: 'working day/weekday', translationVi: 'ngày làm việc', examples: ['An Werktagen bin ich beschäftigt.', 'Montag bis Freitag sind Werktage.'], tips: ['der Werktag - masculine', 'Werk (work) + Tag (day)'], level: 'A2', isCore: false },
    { word: 'Feiertag', article: 'der', gender: 'masculine', plural: 'Feiertage', translationEn: 'public holiday', translationVi: 'ngày lễ', examples: ['Am Feiertag ist die Bank geschlossen.', 'In Deutschland gibt es viele Feiertage.'], tips: ['der Feiertag - masculine', 'Feier (celebration) + Tag (day)'], level: 'A2', isCore: false },
    { word: 'Jahreszeit', article: 'die', gender: 'feminine', plural: 'Jahreszeiten', translationEn: 'season', translationVi: 'mùa trong năm', examples: ['Welche Jahreszeit magst du?', 'Es gibt vier Jahreszeiten.'], tips: ['die Jahreszeit - feminine', 'Jahr (year) + Zeit (time)'], level: 'A1', isCore: false },
    { word: 'Kalender', article: 'der', gender: 'masculine', plural: 'Kalender', translationEn: 'calendar', translationVi: 'lịch', examples: ['Ich schaue in den Kalender.', 'Der Kalender zeigt den Termin.'], tips: ['der Kalender - masculine'], level: 'A1', isCore: false },
    { word: 'Datum', article: 'das', gender: 'neuter', plural: 'Daten', translationEn: 'date', translationVi: 'ngày tháng', examples: ['Was ist heute das Datum?', 'Das Datum ist der 3. Oktober.'], tips: ['das Datum - neuter', 'Plural: Daten (also means "data")'], level: 'A1', isCore: true },
    { word: 'Monat', article: 'der', gender: 'masculine', plural: 'Monate', translationEn: 'month', translationVi: 'tháng', examples: ['Ein Monat hat 30 oder 31 Tage.', 'In welchem Monat haben Sie Geburtstag?'], tips: ['der Monat - masculine', 'Mond (moon) → Monat (month): moon-based calendar'], level: 'A1', isCore: true },
    { word: 'Woche', article: 'die', gender: 'feminine', plural: 'Wochen', translationEn: 'week', translationVi: 'tuần', examples: ['Eine Woche hat sieben Tage.', 'Nächste Woche habe ich Urlaub.'], tips: ['die Woche - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: true },
    { word: 'Jahr', article: 'das', gender: 'neuter', plural: 'Jahre', translationEn: 'year', translationVi: 'năm', examples: ['Ein Jahr hat 12 Monate.', 'Frohes neues Jahr!'], tips: ['das Jahr - neuter'], level: 'A1', isCore: true },
  ],

  // ─── Sport und Fitness ─────────────────────────────────────────────────────
  'sport-fitness': [
    { word: 'Sport', article: 'der', gender: 'masculine', plural: null, translationEn: 'sport/sports', translationVi: 'thể thao', examples: ['Ich treibe gern Sport.', 'Sport ist gesund.'], tips: ['der Sport - masculine, uncountable'], level: 'A1', isCore: true },
    { word: 'Fußball', article: 'der', gender: 'masculine', plural: 'Fußbälle', translationEn: 'football/soccer', translationVi: 'bóng đá', examples: ['Ich spiele Fußball.', 'Deutschland ist Fußball-Weltmeister.'], tips: ['der Fußball - masculine', 'Most popular sport in Germany'], level: 'A1', isCore: true },
    { word: 'Basketball', article: 'der', gender: 'masculine', plural: 'Basketbälle', translationEn: 'basketball', translationVi: 'bóng rổ', examples: ['Er spielt Basketball in der Schule.', 'Basketball macht Spaß.'], tips: ['der Basketball - masculine', 'Ball words are often masculine: der Ball, Fußball, Basketball'], level: 'A2', isCore: false },
    { word: 'Tennis', article: 'das', gender: 'neuter', plural: null, translationEn: 'tennis', translationVi: 'quần vợt', examples: ['Ich spiele Tennis am Wochenende.', 'Tennis ist ein Rückschlagsport.'], tips: ['das Tennis - neuter', 'Sport names with no article in sentences: Tennis spielen'], level: 'A2', isCore: true },
    { word: 'Schwimmen', article: 'das', gender: 'neuter', plural: null, translationEn: 'swimming', translationVi: 'bơi lội', examples: ['Schwimmen ist gesund.', 'Ich gehe gern schwimmen.'], tips: ['das Schwimmen - neuter', 'Infinitives used as nouns are always neuter'], level: 'A1', isCore: true },
    { word: 'Radfahren', article: 'das', gender: 'neuter', plural: null, translationEn: 'cycling', translationVi: 'đạp xe', examples: ['Radfahren macht Spaß.', 'Ich gehe Radfahren.'], tips: ['das Radfahren - neuter', 'Infinitives used as nouns are always neuter'], level: 'A1', isCore: true },
    { word: 'Laufen', article: 'das', gender: 'neuter', plural: null, translationEn: 'running', translationVi: 'chạy bộ', examples: ['Laufen ist kostenlos.', 'Ich gehe morgens laufen.'], tips: ['das Laufen - neuter', 'Infinitives as nouns are always neuter'], level: 'A1', isCore: true },
    { word: 'Yoga', article: 'das', gender: 'neuter', plural: null, translationEn: 'yoga', translationVi: 'yoga', examples: ['Ich mache Yoga.', 'Yoga entspannt den Körper.'], tips: ['das Yoga - neuter', 'Loanword from Sanskrit'], level: 'A2', isCore: false },
    { word: 'Fitness', article: 'die', gender: 'feminine', plural: null, translationEn: 'fitness', translationVi: 'thể lực/tập gym', examples: ['Fitness ist wichtig für die Gesundheit.', 'Ich gehe ins Fitnessstudio.'], tips: ['die Fitness - feminine'], level: 'A2', isCore: false },
    { word: 'Mannschaft', article: 'die', gender: 'feminine', plural: 'Mannschaften', translationEn: 'team', translationVi: 'đội/nhóm', examples: ['Die Mannschaft spielt gut.', 'Ich bin in der Mannschaft.'], tips: ['die Mannschaft - feminine', 'Words ending in -schaft are always feminine'], level: 'A2', isCore: true },
    { word: 'Stadion', article: 'das', gender: 'neuter', plural: 'Stadien', translationEn: 'stadium', translationVi: 'sân vận động', examples: ['Das Stadion ist groß.', 'Wir gehen ins Stadion.'], tips: ['das Stadion - neuter', 'Words ending in -ion/-ium often neuter'], level: 'A2', isCore: true },
    { word: 'Trainer', article: 'der', gender: 'masculine', plural: 'Trainer', translationEn: 'trainer/coach', translationVi: 'huấn luyện viên', examples: ['Der Trainer erklärt die Übung.', 'Unser Trainer ist streng.'], tips: ['der Trainer - masculine', 'Person words ending in -er often masculine'], level: 'A2', isCore: false },
    { word: 'Wettkampf', article: 'der', gender: 'masculine', plural: 'Wettkämpfe', translationEn: 'competition', translationVi: 'cuộc thi đấu', examples: ['Beim Wettkampf gewinnen.', 'Nächste Woche ist ein Wettkampf.'], tips: ['der Wettkampf - masculine', 'Wett + Kampf = contest + fight'], level: 'A2', isCore: false },
    { word: 'Training', article: 'das', gender: 'neuter', plural: 'Trainings', translationEn: 'training', translationVi: 'buổi tập luyện', examples: ['Das Training beginnt um 18 Uhr.', 'Nach dem Training bin ich müde.'], tips: ['das Training - neuter', 'English loanword'], level: 'A2', isCore: true },
    { word: 'Ball', article: 'der', gender: 'masculine', plural: 'Bälle', translationEn: 'ball', translationVi: 'bóng', examples: ['Der Ball ist rund.', 'Schieß den Ball ins Tor!'], tips: ['der Ball - masculine', 'Umlaut in plural: Ball → Bälle'], level: 'A1', isCore: true },
    { word: 'Schläger', article: 'der', gender: 'masculine', plural: 'Schläger', translationEn: 'racket/bat', translationVi: 'vợt/gậy', examples: ['Der Tennisschläger ist neu.', 'Ich brauche einen Schläger.'], tips: ['der Schläger - masculine', 'Used for tennis, badminton, table tennis'], level: 'A2', isCore: false },
    { word: 'Schwimmbad', article: 'das', gender: 'neuter', plural: 'Schwimmbäder', translationEn: 'swimming pool', translationVi: 'bể bơi', examples: ['Ich gehe ins Schwimmbad.', 'Das Schwimmbad öffnet um 7 Uhr.'], tips: ['das Schwimmbad - neuter', 'Schwimm + Bad = swim + bath'], level: 'A1', isCore: true },
    { word: 'Turnhalle', article: 'die', gender: 'feminine', plural: 'Turnhallen', translationEn: 'gymnasium', translationVi: 'nhà thể chất', examples: ['Wir turnen in der Turnhalle.', 'Die Turnhalle ist groß.'], tips: ['die Turnhalle - feminine', 'Turn + Halle = gymnastics + hall'], level: 'A2', isCore: false },
    { word: 'Tor', article: 'das', gender: 'neuter', plural: 'Tore', translationEn: 'goal (sports)/gate', translationVi: 'cổng/bàn thắng', examples: ['Er schießt ein Tor!', 'Das Tor steht leer.'], tips: ['das Tor - neuter', 'Also means gate/door (larger than Tür)'], level: 'A2', isCore: false },
    { word: 'Sportverein', article: 'der', gender: 'masculine', plural: 'Sportvereine', translationEn: 'sports club', translationVi: 'câu lạc bộ thể thao', examples: ['Ich bin im Sportverein.', 'Der Sportverein trainiert dienstags.'], tips: ['der Sportverein - masculine', 'Sport + Verein = sport + club'], level: 'A2', isCore: false },
    { word: 'Meisterschaft', article: 'die', gender: 'feminine', plural: 'Meisterschaften', translationEn: 'championship', translationVi: 'giải vô địch', examples: ['Die Weltmeisterschaft ist in Deutschland.', 'Er gewinnt die Meisterschaft.'], tips: ['die Meisterschaft - feminine', 'Words ending in -schaft always feminine'], level: 'B1', isCore: false },
    { word: 'Medaille', article: 'die', gender: 'feminine', plural: 'Medaillen', translationEn: 'medal', translationVi: 'huy chương', examples: ['Sie gewinnt eine Goldmedaille.', 'Medaillen bei den Olympischen Spielen.'], tips: ['die Medaille - feminine', 'Words ending in -e often feminine'], level: 'B1', isCore: false },
    { word: 'Olympiade', article: 'die', gender: 'feminine', plural: 'Olympiaden', translationEn: 'Olympics', translationVi: 'Thế vận hội', examples: ['Die Olympiade ist alle vier Jahre.', 'Athleten aus aller Welt bei der Olympiade.'], tips: ['die Olympiade - feminine', 'Words ending in -ade often feminine'], level: 'B1', isCore: false },
    { word: 'Spieler', article: 'der', gender: 'masculine', plural: 'Spieler', translationEn: 'player', translationVi: 'cầu thủ/người chơi', examples: ['Der Spieler ist verletzt.', 'Wie viele Spieler sind in der Mannschaft?'], tips: ['der Spieler - masculine', 'Person words ending in -er often masculine'], level: 'A2', isCore: false },
    { word: 'Trikot', article: 'das', gender: 'neuter', plural: 'Trikots', translationEn: 'jersey/kit', translationVi: 'áo thi đấu', examples: ['Das Trikot ist rot und weiß.', 'Ich kaufe ein Trikot.'], tips: ['das Trikot - neuter', 'Loanword from French'], level: 'A2', isCore: false },
  ],

  // ─── Haushalt und Geräte ───────────────────────────────────────────────────
  'haushalt-geraete': [
    { word: 'Kühlschrank', article: 'der', gender: 'masculine', plural: 'Kühlschränke', translationEn: 'refrigerator', translationVi: 'tủ lạnh', examples: ['Der Kühlschrank ist voll.', 'Stell die Milch in den Kühlschrank.'], tips: ['der Kühlschrank - masculine', 'Kühl + Schrank = cool + cabinet'], level: 'A1', isCore: true },
    { word: 'Waschmaschine', article: 'die', gender: 'feminine', plural: 'Waschmaschinen', translationEn: 'washing machine', translationVi: 'máy giặt', examples: ['Die Waschmaschine läuft.', 'Ich wäsche die Kleidung in der Waschmaschine.'], tips: ['die Waschmaschine - feminine', 'Wasch + Maschine = wash + machine'], level: 'A1', isCore: true },
    { word: 'Geschirrspüler', article: 'der', gender: 'masculine', plural: 'Geschirrspüler', translationEn: 'dishwasher', translationVi: 'máy rửa bát', examples: ['Der Geschirrspüler ist kaputt.', 'Ich räume den Geschirrspüler ein.'], tips: ['der Geschirrspüler - masculine', 'Geschirr (dishes) + Spüler (rinser)'], level: 'A2', isCore: false },
    { word: 'Mikrowelle', article: 'die', gender: 'feminine', plural: 'Mikrowellen', translationEn: 'microwave', translationVi: 'lò vi sóng', examples: ['Ich wärme das Essen in der Mikrowelle.', 'Die Mikrowelle piept.'], tips: ['die Mikrowelle - feminine', 'Mikro + Welle = micro + wave'], level: 'A2', isCore: false },
    { word: 'Herd', article: 'der', gender: 'masculine', plural: 'Herde', translationEn: 'stove/cooker', translationVi: 'bếp (lò)', examples: ['Ich koche auf dem Herd.', 'Der Herd ist heiß.'], tips: ['der Herd - masculine'], level: 'A1', isCore: true },
    { word: 'Backofen', article: 'der', gender: 'masculine', plural: 'Backöfen', translationEn: 'oven', translationVi: 'lò nướng', examples: ['Der Backofen ist auf 200 Grad.', 'Ich backe Kuchen im Backofen.'], tips: ['der Backofen - masculine', 'Back + Ofen = bake + oven'], level: 'A1', isCore: true },
    { word: 'Staubsauger', article: 'der', gender: 'masculine', plural: 'Staubsauger', translationEn: 'vacuum cleaner', translationVi: 'máy hút bụi', examples: ['Ich sauge mit dem Staubsauger.', 'Der Staubsauger macht Lärm.'], tips: ['der Staubsauger - masculine', 'Staub (dust) + Sauger (sucker) = dust sucker!'], level: 'A2', isCore: false },
    { word: 'Bügeleisen', article: 'das', gender: 'neuter', plural: 'Bügeleisen', translationEn: 'iron (for clothes)', translationVi: 'bàn là', examples: ['Ich bügle mit dem Bügeleisen.', 'Das Bügeleisen ist heiß.'], tips: ['das Bügeleisen - neuter', 'Bügel (hanger/iron) + Eisen (iron/metal)'], level: 'A2', isCore: false },
    { word: 'Toaster', article: 'der', gender: 'masculine', plural: 'Toaster', translationEn: 'toaster', translationVi: 'máy nướng bánh mì', examples: ['Der Toaster macht Toast.', 'Ich stecke das Brot in den Toaster.'], tips: ['der Toaster - masculine', 'Loanword from English'], level: 'A1', isCore: false },
    { word: 'Kaffeemaschine', article: 'die', gender: 'feminine', plural: 'Kaffeemaschinen', translationEn: 'coffee maker', translationVi: 'máy pha cà phê', examples: ['Die Kaffeemaschine kocht Kaffee.', 'Ich putze die Kaffeemaschine.'], tips: ['die Kaffeemaschine - feminine', 'Kaffee + Maschine = coffee + machine'], level: 'A1', isCore: false },
    { word: 'Topf', article: 'der', gender: 'masculine', plural: 'Töpfe', translationEn: 'pot/saucepan', translationVi: 'nồi', examples: ['Ich koche Suppe im Topf.', 'Der Topf ist zu groß.'], tips: ['der Topf - masculine', 'Umlaut in plural: Topf → Töpfe'], level: 'A1', isCore: true },
    { word: 'Pfanne', article: 'die', gender: 'feminine', plural: 'Pfannen', translationEn: 'pan/frying pan', translationVi: 'chảo', examples: ['Ich brate Eier in der Pfanne.', 'Die Pfanne ist heiß.'], tips: ['die Pfanne - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: true },
    { word: 'Messer', article: 'das', gender: 'neuter', plural: 'Messer', translationEn: 'knife', translationVi: 'dao', examples: ['Ich schneide mit dem Messer.', 'Das Messer ist scharf.'], tips: ['das Messer - neuter', 'Same in singular and plural'], level: 'A1', isCore: true },
    { word: 'Gabel', article: 'die', gender: 'feminine', plural: 'Gabeln', translationEn: 'fork', translationVi: 'nĩa', examples: ['Ich esse mit Messer und Gabel.', 'Gib mir bitte eine Gabel.'], tips: ['die Gabel - feminine'], level: 'A1', isCore: true },
    { word: 'Löffel', article: 'der', gender: 'masculine', plural: 'Löffel', translationEn: 'spoon', translationVi: 'thìa', examples: ['Ich esse Suppe mit dem Löffel.', 'Gib mir einen Löffel Zucker.'], tips: ['der Löffel - masculine', 'Same in singular and plural'], level: 'A1', isCore: true },
    { word: 'Tasse', article: 'die', gender: 'feminine', plural: 'Tassen', translationEn: 'cup/mug', translationVi: 'cốc/tách', examples: ['Eine Tasse Kaffee, bitte.', 'Die Tasse ist heiß.'], tips: ['die Tasse - feminine', 'Words ending in -e often feminine'], level: 'A1', isCore: true },
    { word: 'Glas', article: 'das', gender: 'neuter', plural: 'Gläser', translationEn: 'glass', translationVi: 'cốc thủy tinh', examples: ['Ein Glas Wasser, bitte.', 'Das Glas ist leer.'], tips: ['das Glas - neuter', 'Umlaut in plural: Glas → Gläser'], level: 'A1', isCore: true },
    { word: 'Teller', article: 'der', gender: 'masculine', plural: 'Teller', translationEn: 'plate', translationVi: 'đĩa', examples: ['Der Teller ist voll.', 'Ich spüle den Teller.'], tips: ['der Teller - masculine', 'Same in singular and plural'], level: 'A1', isCore: true },
    { word: 'Schüssel', article: 'die', gender: 'feminine', plural: 'Schüsseln', translationEn: 'bowl', translationVi: 'bát/tô', examples: ['Ich esse Salat aus der Schüssel.', 'Die Schüssel ist zu klein.'], tips: ['die Schüssel - feminine'], level: 'A1', isCore: true },
    { word: 'Mülleimer', article: 'der', gender: 'masculine', plural: 'Mülleimer', translationEn: 'trash can/bin', translationVi: 'thùng rác', examples: ['Wirf das in den Mülleimer.', 'Der Mülleimer ist voll.'], tips: ['der Mülleimer - masculine', 'Müll (trash) + Eimer (bucket) = trash bucket'], level: 'A1', isCore: false },
    { word: 'Regal', article: 'das', gender: 'neuter', plural: 'Regale', translationEn: 'shelf', translationVi: 'kệ', examples: ['Das Regal ist aus Holz.', 'Ich stelle die Bücher ins Regal.'], tips: ['das Regal - neuter'], level: 'A2', isCore: false },
    { word: 'Schrank', article: 'der', gender: 'masculine', plural: 'Schränke', translationEn: 'cabinet/wardrobe', translationVi: 'tủ', examples: ['Die Kleider hängen im Schrank.', 'Räum deinen Schrank auf!'], tips: ['der Schrank - masculine', 'Umlaut in plural: Schrank → Schränke'], level: 'A1', isCore: true },
    { word: 'Wäsche', article: 'die', gender: 'feminine', plural: null, translationEn: 'laundry/washing', translationVi: 'đồ giặt', examples: ['Ich mache die Wäsche.', 'Die Wäsche ist sauber.'], tips: ['die Wäsche - feminine, usually uncountable'], level: 'A2', isCore: false },
    { word: 'Putzmittel', article: 'das', gender: 'neuter', plural: 'Putzmittel', translationEn: 'cleaning product', translationVi: 'chất tẩy rửa', examples: ['Ich kaufe Putzmittel im Supermarkt.', 'Das Putzmittel riecht stark.'], tips: ['das Putzmittel - neuter', 'Putz (clean) + Mittel (means/product)'], level: 'A2', isCore: false },
    { word: 'Haushalt', article: 'der', gender: 'masculine', plural: 'Haushalte', translationEn: 'household', translationVi: 'hộ gia đình', examples: ['Im Haushalt gibt es viel zu tun.', 'Wir teilen den Haushalt.'], tips: ['der Haushalt - masculine', 'Haus (house) + Halt (holding) = household management'], level: 'A2', isCore: true },
  ],
};

export async function seedPart4() {
  console.log('\n🌱 Part 4: Seeding Goethe-Standard Topics (5 topics)...');

  // Create topics
  for (const topicData of TOPICS_PART4) {
    const existing = await prisma.topic.findUnique({ where: { slug: topicData.slug } });
    if (!existing) {
      await prisma.topic.create({ data: topicData });
    }
  }
  console.log('  ✓ Created 5 Goethe-Standard topics');

  // Create words and link to topics
  let wordCount = 0;
  for (const topicData of TOPICS_PART4) {
    const topic = await prisma.topic.findUnique({ where: { slug: topicData.slug } });
    if (!topic) continue;
    const words = TOPIC_WORDS_PART4[topicData.slug] || [];
    let order = 1;
    for (const w of words) {
      let word = await prisma.word.findFirst({ where: { word: w.word, article: w.article } });
      if (!word) {
        word = await prisma.word.create({
          data: {
            word: w.word, article: w.article, gender: w.gender,
            plural: w.plural ?? null, translationEn: w.translationEn,
            translationVi: w.translationVi, category: topicData.slug,
            level: w.level, examples: w.examples, tips: w.tips,
          },
        });
        wordCount++;
      }
      // Skip if already linked
      const existingLink = await prisma.topicWord.findFirst({
        where: { topicId: topic.id, wordId: word.id },
      });
      if (!existingLink) {
        await prisma.topicWord.create({
          data: { topicId: topic.id, wordId: word.id, isCore: w.isCore || false, order: order },
        });
      }
      order++;
    }
    await prisma.topic.update({ where: { id: topic.id }, data: { wordCount: words.length } });
    console.log(`  ✓ ${topicData.slug}: ${words.length} words`);
  }
  console.log(`\n✅ Part 4 done: ${wordCount} unique new words created`);
}

// Run directly
if (require.main === module) {
  seedPart4()
    .catch(e => { console.error('❌ Error:', e); process.exit(1); })
    .finally(() => prisma.$disconnect());
}
