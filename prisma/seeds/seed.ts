import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Convert from old format to Prisma format
const words = [
  // ============ FOOD & DRINKS ============
  { word: 'Apfel', article: 'der', gender: 'masculine', plural: 'Äpfel', translationEn: 'apple', translationVi: 'quả táo', category: 'food', level: 'A1', examples: ['Der Apfel ist rot.', 'Ich esse einen Apfel.'], tips: ['Think of "Apple" - both start with A, der Apfel'], pronunciation: 'ˈapfəl', imageUrl: 'https://images.unsplash.com/photo-1584306670957-acf935f5033c?w=200&h=200&fit=crop' },
  { word: 'Banane', article: 'die', gender: 'feminine', plural: 'Bananen', translationEn: 'banana', translationVi: 'quả chuối', category: 'food', level: 'A1', examples: ['Die Banane ist gelb.', 'Ich mag Bananen.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'baˈnaːnə', imageUrl: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop' },
  { word: 'Brot', article: 'das', gender: 'neuter', plural: 'Brote', translationEn: 'bread', translationVi: 'bánh mì', category: 'food', level: 'A1', examples: ['Das Brot ist frisch.', 'Ich kaufe ein Brot.'], tips: [], pronunciation: 'broːt', imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop' },
  { word: 'Wasser', article: 'das', gender: 'neuter', plural: 'Wasser', translationEn: 'water', translationVi: 'nước', category: 'food', level: 'A1', examples: ['Das Wasser ist kalt.', 'Ich trinke Wasser.'], tips: [], pronunciation: 'ˈvasɐ', imageUrl: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=200&h=200&fit=crop' },
  { word: 'Kaffee', article: 'der', gender: 'masculine', plural: 'Kaffees', translationEn: 'coffee', translationVi: 'cà phê', category: 'food', level: 'A1', examples: ['Der Kaffee ist heiß.', 'Ich brauche einen Kaffee.'], tips: [], pronunciation: 'ˈkafe', imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=200&h=200&fit=crop' },
  { word: 'Milch', article: 'die', gender: 'feminine', plural: null, translationEn: 'milk', translationVi: 'sữa', category: 'food', level: 'A1', examples: ['Die Milch ist frisch.', 'Ich trinke Milch.'], tips: [], pronunciation: 'mɪlç' },
  { word: 'Ei', article: 'das', gender: 'neuter', plural: 'Eier', translationEn: 'egg', translationVi: 'trứng', category: 'food', level: 'A1', examples: ['Das Ei ist gekocht.', 'Ich esse ein Ei zum Frühstück.'], tips: [], pronunciation: 'aɪ' },
  { word: 'Fleisch', article: 'das', gender: 'neuter', plural: null, translationEn: 'meat', translationVi: 'thịt', category: 'food', level: 'A1', examples: ['Das Fleisch ist teuer.', 'Ich esse kein Fleisch.'], tips: [], pronunciation: 'flaɪʃ' },
  { word: 'Käse', article: 'der', gender: 'masculine', plural: null, translationEn: 'cheese', translationVi: 'phô mai', category: 'food', level: 'A1', examples: ['Der Käse schmeckt gut.', 'Ich kaufe Käse.'], tips: [], pronunciation: 'ˈkɛːzə' },
  { word: 'Suppe', article: 'die', gender: 'feminine', plural: 'Suppen', translationEn: 'soup', translationVi: 'súp', category: 'food', level: 'A1', examples: ['Die Suppe ist warm.', 'Ich koche eine Suppe.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈzʊpə' },
  { word: 'Restaurant', article: 'das', gender: 'neuter', plural: 'Restaurants', translationEn: 'restaurant', translationVi: 'nhà hàng', category: 'food', level: 'A1', examples: ['Das Restaurant ist teuer.', 'Wir essen im Restaurant.'], tips: [], pronunciation: 'ʁɛstoˈʁɑ̃ː' },

  // ============ ANIMALS ============
  { word: 'Hund', article: 'der', gender: 'masculine', plural: 'Hunde', translationEn: 'dog', translationVi: 'con chó', category: 'animals', level: 'A1', examples: ['Der Hund bellt.', 'Ich habe einen Hund.'], tips: [], pronunciation: 'hʊnt', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=200&h=200&fit=crop' },
  { word: 'Katze', article: 'die', gender: 'feminine', plural: 'Katzen', translationEn: 'cat', translationVi: 'con mèo', category: 'animals', level: 'A1', examples: ['Die Katze schläft.', 'Meine Katze ist schwarz.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈkatsə', imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=200&h=200&fit=crop' },
  { word: 'Vogel', article: 'der', gender: 'masculine', plural: 'Vögel', translationEn: 'bird', translationVi: 'con chim', category: 'animals', level: 'A1', examples: ['Der Vogel singt.', 'Ich sehe einen Vogel.'], tips: [], pronunciation: 'ˈfoːɡl̩' },
  { word: 'Fisch', article: 'der', gender: 'masculine', plural: 'Fische', translationEn: 'fish', translationVi: 'con cá', category: 'animals', level: 'A1', examples: ['Der Fisch schwimmt.', 'Ich esse Fisch.'], tips: [], pronunciation: 'fɪʃ' },
  { word: 'Pferd', article: 'das', gender: 'neuter', plural: 'Pferde', translationEn: 'horse', translationVi: 'con ngựa', category: 'animals', level: 'A1', examples: ['Das Pferd läuft schnell.', 'Ich reite ein Pferd.'], tips: [], pronunciation: 'pfeːɐ̯t' },
  { word: 'Maus', article: 'die', gender: 'feminine', plural: 'Mäuse', translationEn: 'mouse', translationVi: 'con chuột', category: 'animals', level: 'A1', examples: ['Die Maus ist klein.', 'Die Katze fängt die Maus.'], tips: [], pronunciation: 'maʊs' },
  { word: 'Schwein', article: 'das', gender: 'neuter', plural: 'Schweine', translationEn: 'pig', translationVi: 'con lợn', category: 'animals', level: 'A2', examples: ['Das Schwein ist rosa.', 'Das Schwein lebt auf dem Bauernhof.'], tips: [], pronunciation: 'ʃvaɪn' },
  { word: 'Kuh', article: 'die', gender: 'feminine', plural: 'Kühe', translationEn: 'cow', translationVi: 'con bò', category: 'animals', level: 'A2', examples: ['Die Kuh gibt Milch.', 'Die Kuh steht auf der Weide.'], tips: [], pronunciation: 'kuː' },

  // ============ FAMILY ============
  { word: 'Mutter', article: 'die', gender: 'feminine', plural: 'Mütter', translationEn: 'mother', translationVi: 'mẹ', category: 'family', level: 'A1', examples: ['Meine Mutter kocht gut.', 'Die Mutter liebt ihre Kinder.'], tips: [], pronunciation: 'ˈmʊtɐ' },
  { word: 'Vater', article: 'der', gender: 'masculine', plural: 'Väter', translationEn: 'father', translationVi: 'bố', category: 'family', level: 'A1', examples: ['Mein Vater arbeitet viel.', 'Der Vater spielt mit den Kindern.'], tips: [], pronunciation: 'ˈfaːtɐ' },
  { word: 'Kind', article: 'das', gender: 'neuter', plural: 'Kinder', translationEn: 'child', translationVi: 'đứa trẻ', category: 'family', level: 'A1', examples: ['Das Kind spielt.', 'Ich habe zwei Kinder.'], tips: [], pronunciation: 'kɪnt' },
  { word: 'Bruder', article: 'der', gender: 'masculine', plural: 'Brüder', translationEn: 'brother', translationVi: 'anh/em trai', category: 'family', level: 'A1', examples: ['Mein Bruder ist älter.', 'Ich habe einen Bruder.'], tips: [], pronunciation: 'ˈbʁuːdɐ' },
  { word: 'Schwester', article: 'die', gender: 'feminine', plural: 'Schwestern', translationEn: 'sister', translationVi: 'chị/em gái', category: 'family', level: 'A1', examples: ['Meine Schwester studiert.', 'Ich habe zwei Schwestern.'], tips: [], pronunciation: 'ˈʃvɛstɐ' },
  { word: 'Großmutter', article: 'die', gender: 'feminine', plural: 'Großmütter', translationEn: 'grandmother', translationVi: 'bà', category: 'family', level: 'A1', examples: ['Meine Großmutter ist 80 Jahre alt.', 'Ich besuche meine Großmutter.'], tips: ['Compound word: Groß (grand) + Mutter (mother)'], pronunciation: 'ˈɡʁoːsmʊtɐ' },
  { word: 'Großvater', article: 'der', gender: 'masculine', plural: 'Großväter', translationEn: 'grandfather', translationVi: 'ông', category: 'family', level: 'A1', examples: ['Mein Großvater erzählt Geschichten.', 'Der Großvater ist weise.'], tips: ['Compound word: Groß (grand) + Vater (father)'], pronunciation: 'ˈɡʁoːsfaːtɐ' },
  { word: 'Eltern', article: 'die', gender: 'feminine', plural: null, translationEn: 'parents', translationVi: 'bố mẹ', category: 'family', level: 'A1', examples: ['Meine Eltern wohnen in Berlin.', 'Die Eltern sind stolz.'], tips: ['Always plural, no singular form'], pronunciation: 'ˈɛltɐn' },
  { word: 'Familie', article: 'die', gender: 'feminine', plural: 'Familien', translationEn: 'family', translationVi: 'gia đình', category: 'family', level: 'A1', examples: ['Die Familie ist wichtig.', 'Meine Familie ist groß.'], tips: ['Words ending in -ie are always feminine'], pronunciation: 'faˈmiːliə' },

  // ============ HOUSE & HOME ============
  { word: 'Haus', article: 'das', gender: 'neuter', plural: 'Häuser', translationEn: 'house', translationVi: 'ngôi nhà', category: 'home', level: 'A1', examples: ['Das Haus ist groß.', 'Wir kaufen ein Haus.'], tips: [], pronunciation: 'haʊs' },
  { word: 'Wohnung', article: 'die', gender: 'feminine', plural: 'Wohnungen', translationEn: 'apartment', translationVi: 'căn hộ', category: 'home', level: 'A1', examples: ['Die Wohnung ist klein.', 'Ich suche eine Wohnung.'], tips: ['Words ending in -ung are always feminine'], pronunciation: 'ˈvoːnʊŋ' },
  { word: 'Zimmer', article: 'das', gender: 'neuter', plural: 'Zimmer', translationEn: 'room', translationVi: 'phòng', category: 'home', level: 'A1', examples: ['Das Zimmer ist hell.', 'Mein Zimmer ist ordentlich.'], tips: [], pronunciation: 'ˈtsɪmɐ' },
  { word: 'Küche', article: 'die', gender: 'feminine', plural: 'Küchen', translationEn: 'kitchen', translationVi: 'nhà bếp', category: 'home', level: 'A1', examples: ['Die Küche ist modern.', 'Ich koche in der Küche.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈkʏçə' },
  { word: 'Bad', article: 'das', gender: 'neuter', plural: 'Bäder', translationEn: 'bathroom', translationVi: 'phòng tắm', category: 'home', level: 'A1', examples: ['Das Bad ist sauber.', 'Ich bin im Bad.'], tips: [], pronunciation: 'baːt' },
  { word: 'Tür', article: 'die', gender: 'feminine', plural: 'Türen', translationEn: 'door', translationVi: 'cửa', category: 'home', level: 'A1', examples: ['Die Tür ist offen.', 'Schließ die Tür!'], tips: [], pronunciation: 'tyːɐ̯' },
  { word: 'Fenster', article: 'das', gender: 'neuter', plural: 'Fenster', translationEn: 'window', translationVi: 'cửa sổ', category: 'home', level: 'A1', examples: ['Das Fenster ist geschlossen.', 'Öffne das Fenster!'], tips: [], pronunciation: 'ˈfɛnstɐ' },
  { word: 'Tisch', article: 'der', gender: 'masculine', plural: 'Tische', translationEn: 'table', translationVi: 'cái bàn', category: 'home', level: 'A1', examples: ['Der Tisch ist rund.', 'Das Buch liegt auf dem Tisch.'], tips: [], pronunciation: 'tɪʃ' },
  { word: 'Stuhl', article: 'der', gender: 'masculine', plural: 'Stühle', translationEn: 'chair', translationVi: 'cái ghế', category: 'home', level: 'A1', examples: ['Der Stuhl ist bequem.', 'Setz dich auf den Stuhl!'], tips: [], pronunciation: 'ʃtuːl' },
  { word: 'Bett', article: 'das', gender: 'neuter', plural: 'Betten', translationEn: 'bed', translationVi: 'giường', category: 'home', level: 'A1', examples: ['Das Bett ist weich.', 'Ich liege im Bett.'], tips: [], pronunciation: 'bɛt' },
  { word: 'Sofa', article: 'das', gender: 'neuter', plural: 'Sofas', translationEn: 'sofa', translationVi: 'ghế sofa', category: 'home', level: 'A1', examples: ['Das Sofa ist neu.', 'Ich sitze auf dem Sofa.'], tips: [], pronunciation: 'ˈzoːfa' },

  // ============ TRANSPORT ============
  { word: 'Auto', article: 'das', gender: 'neuter', plural: 'Autos', translationEn: 'car', translationVi: 'xe hơi', category: 'transport', level: 'A1', examples: ['Das Auto ist schnell.', 'Ich fahre mit dem Auto.'], tips: [], pronunciation: 'ˈaʊto' },
  { word: 'Bus', article: 'der', gender: 'masculine', plural: 'Busse', translationEn: 'bus', translationVi: 'xe buýt', category: 'transport', level: 'A1', examples: ['Der Bus kommt.', 'Ich fahre mit dem Bus.'], tips: [], pronunciation: 'bʊs' },
  { word: 'Zug', article: 'der', gender: 'masculine', plural: 'Züge', translationEn: 'train', translationVi: 'tàu hỏa', category: 'transport', level: 'A1', examples: ['Der Zug fährt ab.', 'Ich nehme den Zug.'], tips: [], pronunciation: 'tsuːk' },
  { word: 'Fahrrad', article: 'das', gender: 'neuter', plural: 'Fahrräder', translationEn: 'bicycle', translationVi: 'xe đạp', category: 'transport', level: 'A1', examples: ['Das Fahrrad ist kaputt.', 'Ich fahre Fahrrad.'], tips: ['Compound word: Fahr (drive) + Rad (wheel)'], pronunciation: 'ˈfaːɐ̯ʁaːt' },
  { word: 'Flugzeug', article: 'das', gender: 'neuter', plural: 'Flugzeuge', translationEn: 'airplane', translationVi: 'máy bay', category: 'transport', level: 'A1', examples: ['Das Flugzeug startet.', 'Ich fliege mit dem Flugzeug.'], tips: ['Compound word: Flug (flight) + Zeug (thing)'], pronunciation: 'ˈfluːkˌtsɔɪk' },
  { word: 'Straße', article: 'die', gender: 'feminine', plural: 'Straßen', translationEn: 'street', translationVi: 'đường phố', category: 'transport', level: 'A1', examples: ['Die Straße ist leer.', 'Ich gehe über die Straße.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈʃtʁaːsə' },
  { word: 'Bahnhof', article: 'der', gender: 'masculine', plural: 'Bahnhöfe', translationEn: 'train station', translationVi: 'ga tàu', category: 'transport', level: 'A1', examples: ['Der Bahnhof ist groß.', 'Wir treffen uns am Bahnhof.'], tips: ['Compound word: Bahn (train) + Hof (yard)'], pronunciation: 'ˈbaːnhoːf' },

  // ============ BODY PARTS ============
  { word: 'Kopf', article: 'der', gender: 'masculine', plural: 'Köpfe', translationEn: 'head', translationVi: 'đầu', category: 'body', level: 'A1', examples: ['Der Kopf tut weh.', 'Ich nicke mit dem Kopf.'], tips: [], pronunciation: 'kɔpf' },
  { word: 'Hand', article: 'die', gender: 'feminine', plural: 'Hände', translationEn: 'hand', translationVi: 'bàn tay', category: 'body', level: 'A1', examples: ['Die Hand ist kalt.', 'Gib mir deine Hand!'], tips: [], pronunciation: 'hant' },
  { word: 'Fuß', article: 'der', gender: 'masculine', plural: 'Füße', translationEn: 'foot', translationVi: 'bàn chân', category: 'body', level: 'A1', examples: ['Der Fuß tut weh.', 'Ich gehe zu Fuß.'], tips: [], pronunciation: 'fuːs' },
  { word: 'Auge', article: 'das', gender: 'neuter', plural: 'Augen', translationEn: 'eye', translationVi: 'mắt', category: 'body', level: 'A1', examples: ['Das Auge ist blau.', 'Ich sehe mit den Augen.'], tips: [], pronunciation: 'ˈaʊɡə' },
  { word: 'Ohr', article: 'das', gender: 'neuter', plural: 'Ohren', translationEn: 'ear', translationVi: 'tai', category: 'body', level: 'A1', examples: ['Das Ohr hört gut.', 'Ich höre mit den Ohren.'], tips: [], pronunciation: 'oːɐ̯' },
  { word: 'Nase', article: 'die', gender: 'feminine', plural: 'Nasen', translationEn: 'nose', translationVi: 'mũi', category: 'body', level: 'A1', examples: ['Die Nase ist groß.', 'Ich rieche mit der Nase.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈnaːzə' },
  { word: 'Mund', article: 'der', gender: 'masculine', plural: 'Münder', translationEn: 'mouth', translationVi: 'miệng', category: 'body', level: 'A1', examples: ['Der Mund ist offen.', 'Ich spreche mit dem Mund.'], tips: [], pronunciation: 'mʊnt' },
  { word: 'Herz', article: 'das', gender: 'neuter', plural: 'Herzen', translationEn: 'heart', translationVi: 'trái tim', category: 'body', level: 'A1', examples: ['Das Herz schlägt.', 'Ich liebe dich von Herzen.'], tips: [], pronunciation: 'hɛʁts' },

  // ============ NATURE & WEATHER ============
  { word: 'Sonne', article: 'die', gender: 'feminine', plural: 'Sonnen', translationEn: 'sun', translationVi: 'mặt trời', category: 'nature', level: 'A1', examples: ['Die Sonne scheint.', 'Ich liebe die Sonne.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈzɔnə' },
  { word: 'Mond', article: 'der', gender: 'masculine', plural: 'Monde', translationEn: 'moon', translationVi: 'mặt trăng', category: 'nature', level: 'A1', examples: ['Der Mond ist hell.', 'Ich sehe den Mond.'], tips: [], pronunciation: 'moːnt' },
  { word: 'Stern', article: 'der', gender: 'masculine', plural: 'Sterne', translationEn: 'star', translationVi: 'ngôi sao', category: 'nature', level: 'A1', examples: ['Der Stern leuchtet.', 'Ich sehe viele Sterne.'], tips: [], pronunciation: 'ʃtɛʁn' },
  { word: 'Wetter', article: 'das', gender: 'neuter', plural: null, translationEn: 'weather', translationVi: 'thời tiết', category: 'nature', level: 'A1', examples: ['Das Wetter ist schön.', 'Wie ist das Wetter?'], tips: [], pronunciation: 'ˈvɛtɐ' },
  { word: 'Regen', article: 'der', gender: 'masculine', plural: null, translationEn: 'rain', translationVi: 'mưa', category: 'nature', level: 'A1', examples: ['Der Regen fällt.', 'Ich mag den Regen nicht.'], tips: [], pronunciation: 'ˈʁeːɡn̩' },
  { word: 'Schnee', article: 'der', gender: 'masculine', plural: null, translationEn: 'snow', translationVi: 'tuyết', category: 'nature', level: 'A1', examples: ['Der Schnee ist weiß.', 'Im Winter fällt Schnee.'], tips: [], pronunciation: 'ʃneː' },
  { word: 'Baum', article: 'der', gender: 'masculine', plural: 'Bäume', translationEn: 'tree', translationVi: 'cây', category: 'nature', level: 'A1', examples: ['Der Baum ist hoch.', 'Ich sitze unter dem Baum.'], tips: [], pronunciation: 'baʊm' },
  { word: 'Blume', article: 'die', gender: 'feminine', plural: 'Blumen', translationEn: 'flower', translationVi: 'hoa', category: 'nature', level: 'A1', examples: ['Die Blume ist schön.', 'Ich pflücke Blumen.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈbluːmə' },
  { word: 'Berg', article: 'der', gender: 'masculine', plural: 'Berge', translationEn: 'mountain', translationVi: 'núi', category: 'nature', level: 'A1', examples: ['Der Berg ist hoch.', 'Wir wandern in den Bergen.'], tips: [], pronunciation: 'bɛʁk' },
  { word: 'Meer', article: 'das', gender: 'neuter', plural: 'Meere', translationEn: 'sea', translationVi: 'biển', category: 'nature', level: 'A1', examples: ['Das Meer ist blau.', 'Wir fahren ans Meer.'], tips: [], pronunciation: 'meːɐ̯' },

  // ============ CLOTHING ============
  { word: 'Hemd', article: 'das', gender: 'neuter', plural: 'Hemden', translationEn: 'shirt', translationVi: 'áo sơ mi', category: 'clothing', level: 'A1', examples: ['Das Hemd ist weiß.', 'Ich trage ein Hemd.'], tips: [], pronunciation: 'hɛmt' },
  { word: 'Hose', article: 'die', gender: 'feminine', plural: 'Hosen', translationEn: 'pants/trousers', translationVi: 'quần', category: 'clothing', level: 'A1', examples: ['Die Hose ist blau.', 'Ich ziehe eine Hose an.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈhoːzə' },
  { word: 'Schuh', article: 'der', gender: 'masculine', plural: 'Schuhe', translationEn: 'shoe', translationVi: 'giày', category: 'clothing', level: 'A1', examples: ['Der Schuh ist neu.', 'Ich kaufe Schuhe.'], tips: [], pronunciation: 'ʃuː' },
  { word: 'Jacke', article: 'die', gender: 'feminine', plural: 'Jacken', translationEn: 'jacket', translationVi: 'áo khoác', category: 'clothing', level: 'A1', examples: ['Die Jacke ist warm.', 'Zieh deine Jacke an.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈjakə' },
  { word: 'Kleid', article: 'das', gender: 'neuter', plural: 'Kleider', translationEn: 'dress', translationVi: 'váy', category: 'clothing', level: 'A1', examples: ['Das Kleid ist schön.', 'Sie trägt ein rotes Kleid.'], tips: [], pronunciation: 'klaɪt' },

  // ============ GENERAL/COMMON ============
  { word: 'Mann', article: 'der', gender: 'masculine', plural: 'Männer', translationEn: 'man', translationVi: 'đàn ông', category: 'other', level: 'A1', examples: ['Der Mann ist groß.', 'Der Mann liest eine Zeitung.'], tips: [], pronunciation: 'man' },
  { word: 'Frau', article: 'die', gender: 'feminine', plural: 'Frauen', translationEn: 'woman/wife', translationVi: 'phụ nữ/vợ', category: 'other', level: 'A1', examples: ['Die Frau ist nett.', 'Meine Frau kocht gut.'], tips: [], pronunciation: 'fʁaʊ' },
  { word: 'Freund', article: 'der', gender: 'masculine', plural: 'Freunde', translationEn: 'friend (male)/boyfriend', translationVi: 'bạn/bạn trai', category: 'other', level: 'A1', examples: ['Mein Freund wohnt in Berlin.', 'Er ist mein bester Freund.'], tips: [], pronunciation: 'fʁɔɪnt' },
  { word: 'Freundin', article: 'die', gender: 'feminine', plural: 'Freundinnen', translationEn: 'friend (female)/girlfriend', translationVi: 'bạn gái', category: 'other', level: 'A1', examples: ['Meine Freundin studiert Medizin.', 'Sie ist meine beste Freundin.'], tips: ['Words ending in -in are always feminine (female form)'], pronunciation: 'ˈfʁɔɪndɪn' },
  { word: 'Name', article: 'der', gender: 'masculine', plural: 'Namen', translationEn: 'name', translationVi: 'tên', category: 'other', level: 'A1', examples: ['Mein Name ist Hans.', 'Wie ist Ihr Name?'], tips: [], pronunciation: 'ˈnaːmə' },
  { word: 'Geld', article: 'das', gender: 'neuter', plural: null, translationEn: 'money', translationVi: 'tiền', category: 'other', level: 'A1', examples: ['Das Geld ist wichtig.', 'Ich habe kein Geld.'], tips: [], pronunciation: 'ɡɛlt' },
  { word: 'Problem', article: 'das', gender: 'neuter', plural: 'Probleme', translationEn: 'problem', translationVi: 'vấn đề', category: 'other', level: 'A1', examples: ['Das ist kein Problem.', 'Ich habe ein Problem.'], tips: [], pronunciation: 'pʁoˈbleːm' },
  { word: 'Frage', article: 'die', gender: 'feminine', plural: 'Fragen', translationEn: 'question', translationVi: 'câu hỏi', category: 'other', level: 'A1', examples: ['Das ist eine gute Frage.', 'Ich habe eine Frage.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈfʁaːɡə' },
  { word: 'Antwort', article: 'die', gender: 'feminine', plural: 'Antworten', translationEn: 'answer', translationVi: 'câu trả lời', category: 'other', level: 'A1', examples: ['Die Antwort ist richtig.', 'Ich warte auf eine Antwort.'], tips: [], pronunciation: 'ˈantvɔʁt' },
  { word: 'Sprache', article: 'die', gender: 'feminine', plural: 'Sprachen', translationEn: 'language', translationVi: 'ngôn ngữ', category: 'other', level: 'A1', examples: ['Deutsch ist eine schöne Sprache.', 'Ich lerne viele Sprachen.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈʃpʁaːxə' },

  // ============ TECHNOLOGY ============
  { word: 'Handy', article: 'das', gender: 'neuter', plural: 'Handys', translationEn: 'mobile phone', translationVi: 'điện thoại di động', category: 'technology', level: 'A1', examples: ['Das Handy klingelt.', 'Wo ist mein Handy?'], tips: [], pronunciation: 'ˈhɛndi' },
  { word: 'Telefon', article: 'das', gender: 'neuter', plural: 'Telefone', translationEn: 'telephone', translationVi: 'điện thoại', category: 'technology', level: 'A1', examples: ['Das Telefon klingelt.', 'Ich benutze selten das Telefon.'], tips: [], pronunciation: 'teleˈfoːn' },
  { word: 'Internet', article: 'das', gender: 'neuter', plural: null, translationEn: 'internet', translationVi: 'internet', category: 'technology', level: 'A1', examples: ['Das Internet ist schnell.', 'Ich suche im Internet.'], tips: [], pronunciation: 'ˈɪntɐˌnɛt' },
  { word: 'Computer', article: 'der', gender: 'masculine', plural: 'Computer', translationEn: 'computer', translationVi: 'máy tính', category: 'technology', level: 'A1', examples: ['Der Computer ist neu.', 'Ich arbeite am Computer.'], tips: [], pronunciation: 'kɔmˈpjuːtɐ' },
  { word: 'E-Mail', article: 'die', gender: 'feminine', plural: 'E-Mails', translationEn: 'email', translationVi: 'email', category: 'technology', level: 'A1', examples: ['Die E-Mail ist wichtig.', 'Ich schreibe eine E-Mail.'], tips: [], pronunciation: 'ˈiːmeɪl' },
  { word: 'Foto', article: 'das', gender: 'neuter', plural: 'Fotos', translationEn: 'photo', translationVi: 'ảnh', category: 'technology', level: 'A1', examples: ['Das Foto ist schön.', 'Ich mache ein Foto.'], tips: [], pronunciation: 'ˈfoːto' },

  // ============ EDUCATION ============
  { word: 'Schule', article: 'die', gender: 'feminine', plural: 'Schulen', translationEn: 'school', translationVi: 'trường học', category: 'education', level: 'A1', examples: ['Die Schule beginnt um 8 Uhr.', 'Ich gehe zur Schule.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈʃuːlə' },
  { word: 'Buch', article: 'das', gender: 'neuter', plural: 'Bücher', translationEn: 'book', translationVi: 'sách', category: 'education', level: 'A1', examples: ['Das Buch ist interessant.', 'Ich lese ein Buch.'], tips: [], pronunciation: 'buːx' },
  { word: 'Lehrer', article: 'der', gender: 'masculine', plural: 'Lehrer', translationEn: 'teacher (male)', translationVi: 'thầy giáo', category: 'education', level: 'A1', examples: ['Der Lehrer erklärt die Aufgabe.', 'Mein Lehrer ist nett.'], tips: [], pronunciation: 'ˈleːʁɐ' },
  { word: 'Lehrerin', article: 'die', gender: 'feminine', plural: 'Lehrerinnen', translationEn: 'teacher (female)', translationVi: 'cô giáo', category: 'education', level: 'A1', examples: ['Die Lehrerin ist freundlich.', 'Meine Lehrerin kommt aus Berlin.'], tips: ['Words ending in -in are always feminine (female profession)'], pronunciation: 'ˈleːʁəʁɪn' },
  { word: 'Student', article: 'der', gender: 'masculine', plural: 'Studenten', translationEn: 'student (male)', translationVi: 'sinh viên nam', category: 'education', level: 'A1', examples: ['Der Student lernt Deutsch.', 'Ich bin Student.'], tips: [], pronunciation: 'ʃtuˈdɛnt' },
  { word: 'Studentin', article: 'die', gender: 'feminine', plural: 'Studentinnen', translationEn: 'student (female)', translationVi: 'sinh viên nữ', category: 'education', level: 'A1', examples: ['Die Studentin studiert Medizin.', 'Meine Schwester ist Studentin.'], tips: ['Words ending in -in are always feminine (female form)'], pronunciation: 'ʃtuˈdɛntɪn' },

  // ============ HEALTH ============
  { word: 'Hotel', article: 'das', gender: 'neuter', plural: 'Hotels', translationEn: 'hotel', translationVi: 'khách sạn', category: 'travel', level: 'A1', examples: ['Das Hotel ist groß.', 'Ich übernachte im Hotel.'], tips: [], pronunciation: 'hoˈtɛl' },
  { word: 'Krankenhaus', article: 'das', gender: 'neuter', plural: 'Krankenhäuser', translationEn: 'hospital', translationVi: 'bệnh viện', category: 'health', level: 'A2', examples: ['Das Krankenhaus ist modern.', 'Er liegt im Krankenhaus.'], tips: ['Compound word: Kranken (sick) + Haus (house)'], pronunciation: 'ˈkʁaŋkn̩ˌhaʊs' },
  { word: 'Arzt', article: 'der', gender: 'masculine', plural: 'Ärzte', translationEn: 'doctor (male)', translationVi: 'bác sĩ (nam)', category: 'health', level: 'A1', examples: ['Der Arzt untersucht mich.', 'Ich gehe zum Arzt.'], tips: [], pronunciation: 'aʁtst' },
  { word: 'Ärztin', article: 'die', gender: 'feminine', plural: 'Ärztinnen', translationEn: 'doctor (female)', translationVi: 'bác sĩ (nữ)', category: 'health', level: 'A1', examples: ['Die Ärztin ist freundlich.', 'Meine Ärztin ist sehr gut.'], tips: ['Words ending in -in are always feminine (female profession)'], pronunciation: 'ˈɛʁtstɪn' },
  { word: 'Medizin', article: 'die', gender: 'feminine', plural: 'Medizinen', translationEn: 'medicine', translationVi: 'thuốc', category: 'health', level: 'A2', examples: ['Die Medizin hilft.', 'Ich nehme Medizin.'], tips: [], pronunciation: 'mediˈtsiːn' },

  // ============ EMOTIONS ============
  { word: 'Liebe', article: 'die', gender: 'feminine', plural: null, translationEn: 'love', translationVi: 'tình yêu', category: 'other', level: 'A2', examples: ['Die Liebe ist wunderbar.', 'Ich glaube an die Liebe.'], tips: ['Words ending in -e are often feminine'], pronunciation: 'ˈliːbə' },

  // ============ MEDIA ============
  { word: 'Zeitung', article: 'die', gender: 'feminine', plural: 'Zeitungen', translationEn: 'newspaper', translationVi: 'báo', category: 'other', level: 'A2', examples: ['Die Zeitung ist aktuell.', 'Ich lese die Zeitung.'], tips: ['Words ending in -ung are always feminine'], pronunciation: 'ˈtsaɪtʊŋ' },
  { word: 'Musik', article: 'die', gender: 'feminine', plural: null, translationEn: 'music', translationVi: 'âm nhạc', category: 'other', level: 'A1', examples: ['Die Musik ist laut.', 'Ich höre gern Musik.'], tips: [], pronunciation: 'muˈziːk' },
  { word: 'Film', article: 'der', gender: 'masculine', plural: 'Filme', translationEn: 'film/movie', translationVi: 'phim', category: 'other', level: 'A1', examples: ['Der Film ist interessant.', 'Wir schauen einen Film.'], tips: [], pronunciation: 'fɪlm' },
];

async function main() {
  console.log('🌱 Seeding database...');
  console.log(`📝 Adding ${words.length} words...`);

  // Clear existing data
  console.log('🗑️  Clearing existing data...');
  await prisma.gameAnswer.deleteMany();
  await prisma.gameSession.deleteMany();
  await prisma.progress.deleteMany();
  await prisma.history.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.word.deleteMany();

  // Seed words
  let count = 0;
  for (const word of words) {
    await prisma.word.create({ data: word });
    count++;
    if (count % 20 === 0) {
      console.log(`  ✓ Added ${count}/${words.length} words...`);
    }
  }

  console.log(`\n✅ Successfully seeded ${count} words!`);

  // Show stats
  const stats = await prisma.word.groupBy({
    by: ['gender'],
    _count: { id: true },
  });
  
  console.log('\n📊 Statistics:');
  stats.forEach(s => {
    const article = s.gender === 'masculine' ? 'der' : s.gender === 'feminine' ? 'die' : 'das';
    console.log(`  ${article} (${s.gender}): ${s._count.id} words`);
  });

  const categories = await prisma.word.groupBy({
    by: ['category'],
    _count: { id: true },
  });
  
  console.log('\n📁 Categories:');
  categories.forEach(c => {
    console.log(`  ${c.category}: ${c._count.id} words`);
  });
}

main()
  .catch((e) => {
    console.error('❌ Error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });