import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const lessons = [
    // =================================================================
    // LEKTION 1: ALPHABET & AUSSPRACHE
    // =================================================================
    {
        slug: 'a1-l01-alphabet',
        level: 'A1',
        lessonNumber: 1,
        titleDe: 'Alphabet und Aussprache',
        titleEn: 'Alphabet & Pronunciation',
        titleVi: 'Bảng chữ cái & Phát âm',
        objectives: {
            de: ['26 Buchstaben und 4 Sonderzeichen lesen', 'Umlaute (ä, ö, ü) und Eszett (ß) verstehen', 'Besondere Laute üben (ch, sch, sp, st, ei, ie, eu)', 'Namen buchstabieren'],
            en: ['Read 26 letters and 4 special characters', 'Understand Umlauts (ä, ö, ü) and Eszett (ß)', 'Practice special sounds (ch, sch, sp, st, ei, ie, eu)', 'Spell names'],
            vi: ['Đọc 26 chữ cái và 4 ký tự đặc biệt', 'Hiểu Umlaute (ä, ö, ü) và Eszett (ß)', 'Luyện âm đặc biệt (ch, sch, sp, st, ei, ie, eu)', 'Đánh vần tên']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Das Alphabet', en: 'The Alphabet', vi: 'Bảng chữ cái' },
                    content: 'German has 26 basic letters, similar to English, plus 4 special characters: Ä, Ö, Ü, ß.',
                    table: {
                        headers: ['Letter', 'Name', 'Pronunciation', 'Example'],
                        rows: [
                            ['A a', 'ah', '/aː/', 'Apfel (táo/apple)'],
                            ['B b', 'beh', '/beː/', 'Buch (sách/book)'],
                            ['C c', 'tseh', '/tseː/', 'Café'],
                            ['D d', 'deh', '/deː/', 'Deutsch'],
                            ['E e', 'eh', '/eː/', 'Eltern (bố mẹ/parents)'],
                            ['F f', 'eff', '/ɛf/', 'Freund (bạn/friend)'],
                            ['G g', 'geh', '/geː/', 'Gut (tốt/good)'],
                            ['H h', 'hah', '/haː/', 'Haus (nhà/house)'],
                            ['I i', 'ih', '/iː/', 'Insel (đảo/island)'],
                            ['J j', 'yot', '/jɔt/', 'Ja (vâng/yes)'],
                            ['K k', 'kah', '/kaː/', 'Kind (trẻ em/child)'],
                            ['L l', 'ell', '/ɛl/', 'Liebe (tình yêu/love)'],
                            ['M m', 'emm', '/ɛm/', 'Mutter (mẹ/mother)'],
                            ['N n', 'enn', '/ɛn/', 'Name (tên/name)'],
                            ['O o', 'oh', '/oː/', 'Onkel (chú/uncle)'],
                            ['P p', 'peh', '/peː/', 'Papa (bố/dad)'],
                            ['Q q', 'kuh', '/kuː/', 'Quelle (nguồn/source)'],
                            ['R r', 'err', '/ɛʁ/', 'Rot (đỏ/red)'],
                            ['S s', 'ess', '/ɛs/', 'Sonne (mặt trời/sun)'],
                            ['T t', 'teh', '/teː/', 'Tag (ngày/day)'],
                            ['U u', 'uh', '/uː/', 'Uhr (đồng hồ/clock)'],
                            ['V v', 'fau', '/faʊ/', 'Vater (cha/father)'],
                            ['W w', 'weh', '/veː/', 'Wasser (nước/water)'],
                            ['X x', 'iks', '/ɪks/', 'Taxi'],
                            ['Y y', 'üpsilon', '/ˈʏpsilɔn/', 'Yoga'],
                            ['Z z', 'tsett', '/tsɛt/', 'Zeit (thời gian/time)']
                        ]
                    }
                },
                {
                    title: { de: 'Sonderzeichen (Umlaute & Eszett)', en: 'Special Characters', vi: 'Ký tự đặc biệt' },
                    content: 'Umlaute change the sound of vowels. Eszett (ß) is a sharp S sound, only used after long vowels or diphthongs.',
                    table: {
                        headers: ['Char', 'Name', 'Sound', 'Example'],
                        rows: [
                            ['Ä ä', 'A-Umlaut', '/ɛː/ như "e" trong "bed"', 'Mädchen (cô gái/girl)'],
                            ['Ö ö', 'O-Umlaut', '/øː/ như "ơ" tiếng Việt', 'schön (đẹp/beautiful)'],
                            ['Ü ü', 'U-Umlaut', '/yː/ như "u" tiếng Pháp', 'fünf (năm/five)'],
                            ['ß', 'Eszett', '/s/ như "ss"', 'Straße (đường phố/street)']
                        ]
                    }
                },
                {
                    title: { de: 'Besondere Laute', en: 'Special Sounds', vi: 'Âm đặc biệt' },
                    content: 'Key sound combinations. CH has two sounds: hard /x/ after a,o,u,au and soft /ç/ after e,i,ä,ö,ü,ei,eu.',
                    table: {
                        headers: ['Combo', 'Sound', 'Example', 'Meaning'],
                        rows: [
                            ['sch', '/ʃ/ (sh)', 'Schule', 'trường học/school'],
                            ['sp (đầu từ)', '/ʃp/', 'spielen', 'chơi/to play'],
                            ['st (đầu từ)', '/ʃt/', 'Stadt', 'thành phố/city'],
                            ['ei', '/aɪ/ (ai)', 'mein', 'của tôi/my'],
                            ['ie', '/iː/ (i dài)', 'Liebe', 'tình yêu/love'],
                            ['eu/äu', '/ɔʏ/ (oi)', 'heute', 'hôm nay/today']
                        ]
                    }
                },
                {
                    title: { de: 'ie vs ei', en: 'ie vs ei', vi: 'So sánh ie và ei' },
                    content: 'Memory tip: pronounce the SECOND letter. ie = /iː/ (long i), ei = /aɪ/ (like "eye").',
                    table: {
                        headers: ['ie = /iː/', 'ei = /aɪ/'],
                        rows: [
                            ['Liebe (tình yêu)', 'klein (nhỏ)'],
                            ['vier (bốn)', 'drei (ba)'],
                            ['spielen (chơi)', 'Ei (trứng)'],
                            ['sieben (bảy)', 'zeigen (chỉ)']
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            // === A: MCQ (8) ===
            { exerciseType: 'mcq', order: 1, questionDe: 'Wie spricht man "sch" in "Schule" aus?', questionEn: 'How is "sch" in "Schule" pronounced?', questionVi: 'Âm "sch" trong "Schule" phát âm thế nào?', answerData: { options: ['/s/ (s)', '/ʃ/ (sh)', '/tʃ/ (ch)', '/k/ (k)'], correctIndex: 1 }, explanation: { de: 'sch = /ʃ/ wie englisch "sh"', en: 'sch = /ʃ/ like English "sh"', vi: 'sch phát âm giống sh trong tiếng Anh' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Welches Wort hat den /aɪ/ Laut?', questionEn: 'Which word has the /aɪ/ sound?', questionVi: 'Từ nào có âm /aɪ/?', answerData: { options: ['sieben', 'Liebe', 'drei', 'vier'], correctIndex: 2 }, explanation: { de: 'ei = /aɪ/, drei hat ei', en: 'ei = /aɪ/, drei has ei', vi: 'ei đọc là /aɪ/, drei có ei' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Wie spricht man "ß" aus?', questionEn: 'How is "ß" pronounced?', questionVi: 'Chữ "ß" phát âm thế nào?', answerData: { options: ['/b/', '/p/', '/s/', '/z/'], correctIndex: 2 }, explanation: { de: 'ß ist ein scharfes S', en: 'ß is a sharp S', vi: 'ß là âm s mạnh' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'In "ich", wie spricht man "ch" aus?', questionEn: 'In "ich", how is "ch" pronounced?', questionVi: 'Trong "ich", âm "ch" phát âm thế nào?', answerData: { options: ['/x/ (ach-Laut)', '/ç/ (ich-Laut)', '/k/', '/tʃ/'], correctIndex: 1 }, explanation: { de: 'Nach i ist ch weich /ç/', en: 'After i, ch is soft /ç/', vi: 'Sau i, ch là âm nhẹ /ç/' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Welches Wort beginnt mit /ʃt/?', questionEn: 'Which word starts with /ʃt/?', questionVi: 'Từ nào bắt đầu bằng /ʃt/?', answerData: { options: ['Sonne', 'Stadt', 'Salat', 'Sofa'], correctIndex: 1 }, explanation: { de: 'st am Wortanfang = /ʃt/', en: 'st at start = /ʃt/', vi: 'st ở đầu từ = /ʃt/' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Wie klingt "Ö"?', questionEn: 'How does "Ö" sound?', questionVi: '"Ö" nghe gần giống âm nào?', answerData: { options: ['o', 'ơ (Vietnamese)', 'u', 'a'], correctIndex: 1 }, explanation: { de: 'Ö klingt ähnlich wie "ơ"', en: 'Ö sounds similar to Vietnamese "ơ"', vi: 'Ö gần giống âm "ơ"' }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Welchen Diphthong hat "heute"?', questionEn: 'What diphthong does "heute" have?', questionVi: '"heute" có nguyên âm đôi nào?', answerData: { options: ['ei', 'ie', 'eu', 'au'], correctIndex: 2 }, explanation: { de: 'heute enthält eu', en: 'heute contains eu', vi: 'heute chứa eu' }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'In "Buch", wie spricht man "ch" aus?', questionEn: 'In "Buch", how is "ch" pronounced?', questionVi: 'Trong "Buch", "ch" phát âm thế nào?', answerData: { options: ['/ç/ (weich)', '/x/ (hart/Rachen)', '/k/', 'stumm'], correctIndex: 1 }, explanation: { de: 'Nach u ist ch hart /x/', en: 'After u, ch is hard /x/', vi: 'Sau u, ch là âm mạnh /x/' }, points: 1 },
            // === B: Fill blank (7) ===
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ergänze den Umlaut: M___dchen (girl)', questionEn: 'Fill in the Umlaut: M___dchen', questionVi: 'Điền Umlaut: M___dchen (cô gái)', answerData: { blanks: [{ answer: 'ä', alternatives: ['Ä'] }] }, explanation: { de: 'Mädchen', en: 'Mädchen', vi: 'Mädchen' }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Ergänze den Umlaut: sch___n (beautiful)', questionEn: 'Fill in the Umlaut: sch___n', questionVi: 'Điền Umlaut: sch___n (đẹp)', answerData: { blanks: [{ answer: 'ö', alternatives: ['Ö'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Ergänze den Umlaut: f___nf (five)', questionEn: 'Fill in: f___nf', questionVi: 'Điền Umlaut: f___nf (năm)', answerData: { blanks: [{ answer: 'ü', alternatives: ['Ü'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'ie oder ei? dr___ (three)', questionEn: 'ie or ei? dr___', questionVi: 'ie hay ei? dr___ (ba)', answerData: { blanks: [{ answer: 'ei', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'ie oder ei? v___r (four)', questionEn: 'ie or ei? v___r', questionVi: 'ie hay ei? v___r (bốn)', answerData: { blanks: [{ answer: 'ie', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'ß oder ss? Stra___e (street)', questionEn: 'ß or ss? Stra___e', questionVi: 'ß hay ss? Stra___e (đường)', answerData: { blanks: [{ answer: 'ß', alternatives: [] }] }, explanation: { de: 'Nach langem Vokal: ß', en: 'After long vowel: ß', vi: 'Sau nguyên âm dài: ß' }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'ß oder ss? Flu___ (river)', questionEn: 'ß or ss? Flu___', questionVi: 'ß hay ss? Flu___ (sông)', answerData: { blanks: [{ answer: 'ss', alternatives: [] }] }, explanation: { de: 'Nach kurzem Vokal: ss', en: 'After short vowel: ss', vi: 'Sau nguyên âm ngắn: ss' }, points: 1 },
            // === C: Reorder/Matching (5) ===
            { exerciseType: 'reorder', order: 16, questionDe: 'Ordne: Buchstabiere SCHÖN', questionEn: 'Spell: SCHÖN', questionVi: 'Đánh vần: SCHÖN', answerData: { correctOrder: ['S', 'C', 'H', 'Ö', 'N'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Ordne: Buchstabiere MÄDCHEN', questionEn: 'Spell: MÄDCHEN', questionVi: 'Đánh vần: MÄDCHEN', answerData: { correctOrder: ['M', 'Ä', 'D', 'C', 'H', 'E', 'N'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Ordne: Buchstabiere DEUTSCH', questionEn: 'Spell: DEUTSCH', questionVi: 'Đánh vần: DEUTSCH', answerData: { correctOrder: ['D', 'E', 'U', 'T', 'S', 'C', 'H'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Ordne: Buchstabiere STRAẞE', questionEn: 'Spell: STRASSE', questionVi: 'Đánh vần: STRAẞE', answerData: { correctOrder: ['S', 'T', 'R', 'A', 'ẞ', 'E'] }, points: 1 },
            { exerciseType: 'reorder', order: 20, questionDe: 'Ordne: Buchstabiere MÜTTER', questionEn: 'Spell: MÜTTER', questionVi: 'Đánh vần: MÜTTER', answerData: { correctOrder: ['M', 'Ü', 'T', 'T', 'E', 'R'] }, points: 1 },
            // === D: Error Correction (5) ===
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Strase', questionEn: 'Correct: Strase', questionVi: 'Sửa lỗi: Strase', answerData: { correctedText: 'Straße' }, explanation: { de: 'ß nach langem Vokal', en: 'ß after long vowel', vi: 'ß sau nguyên âm dài' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: schn (meaning: beautiful)', questionEn: 'Correct: schn (meaning: beautiful)', questionVi: 'Sửa lỗi: schn (nghĩa: đẹp)', answerData: { correctedText: 'schön' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: funf (meaning: five)', questionEn: 'Correct: funf (meaning: five)', questionVi: 'Sửa lỗi: funf (nghĩa: năm)', answerData: { correctedText: 'fünf' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Madchen (meaning: girl)', questionEn: 'Correct: Madchen (meaning: girl)', questionVi: 'Sửa lỗi: Madchen (nghĩa: cô gái)', answerData: { correctedText: 'Mädchen' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: hute (meaning: today)', questionEn: 'Correct: hute (meaning: today)', questionVi: 'Sửa lỗi: hute (nghĩa: hôm nay)', answerData: { correctedText: 'heute' }, points: 1 },
            // === E: Fill blank advanced (5) ===
            { exerciseType: 'fill_blank', order: 26, questionDe: 'Ergänze: ___ule (school)', questionEn: 'Fill in: ___ule (school)', questionVi: 'Điền: ___ule (trường học)', answerData: { blanks: [{ answer: 'Sch', alternatives: ['sch'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 27, questionDe: 'Ergänze: ___ielen (to play)', questionEn: 'Fill in: ___ielen (to play)', questionVi: 'Điền: ___ielen (chơi)', answerData: { blanks: [{ answer: 'sp', alternatives: ['Sp'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 28, questionDe: 'Ergänze Diphthong: h___te (today)', questionEn: 'Fill diphthong: h___te', questionVi: 'Điền nguyên âm đôi: h___te (hôm nay)', answerData: { blanks: [{ answer: 'eu', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 29, questionDe: 'Ergänze Diphthong: L___be (love)', questionEn: 'Fill diphthong: L___be', questionVi: 'Điền nguyên âm đôi: L___be (tình yêu)', answerData: { blanks: [{ answer: 'ie', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 30, questionDe: 'Ergänze Diphthong: H___s (house)', questionEn: 'Fill diphthong: H___s', questionVi: 'Điền nguyên âm đôi: H___s (nhà)', answerData: { blanks: [{ answer: 'au', alternatives: [] }] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 2: PERSONALPRONOMEN
    // =================================================================
    {
        slug: 'a1-l02-personal-pronouns',
        level: 'A1',
        lessonNumber: 2,
        titleDe: 'Personalpronomen',
        titleEn: 'Personal Pronouns',
        titleVi: 'Đại từ nhân xưng',
        objectives: {
            de: ['7 Personalpronomen lernen', 'Du vs Sie unterscheiden', 'Pronomen im Kontext verwenden'],
            en: ['Learn 7 personal pronouns', 'Distinguish du vs Sie', 'Use pronouns in context'],
            vi: ['Học 7 đại từ nhân xưng', 'Phân biệt du và Sie', 'Sử dụng đại từ trong ngữ cảnh']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Personalpronomen', en: 'Personal Pronouns', vi: 'Đại từ nhân xưng' },
                    content: 'German has 9 personal pronoun forms covering person, number, and formality.',
                    table: {
                        headers: ['Person', 'Singular', 'Plural'],
                        rows: [
                            ['1.', 'ich (tôi/I)', 'wir (chúng tôi/we)'],
                            ['2. (informal)', 'du (bạn/you)', 'ihr (các bạn/you all)'],
                            ['3.', 'er/sie/es (anh ấy/cô ấy/nó)', 'sie (họ/they)'],
                            ['2. (formal)', 'Sie (Ông/Bà/You)', 'Sie (Quý vị/You)']
                        ]
                    }
                },
                {
                    title: { de: 'Du vs Sie', en: 'Du vs Sie', vi: 'Du và Sie' },
                    content: 'Du is informal (friends, family, children). Sie is formal (strangers, workplace, elderly). Sie (formal) is ALWAYS capitalized!',
                    table: {
                        headers: ['Du (thân mật)', 'Sie (trang trọng)'],
                        rows: [
                            ['Bạn bè / Friends', 'Người lạ / Strangers'],
                            ['Gia đình / Family', 'Công sở / Workplace'],
                            ['Trẻ em / Children', 'Người lớn tuổi / Elderly'],
                            ['Đồng nghiệp thân', 'Khách hàng / Customers']
                        ]
                    }
                },
                {
                    title: { de: 'Pronomen für Dinge', en: 'Pronouns for Things', vi: 'Đại từ cho đồ vật' },
                    content: 'Objects have grammatical gender in German! Use er (masculine), sie (feminine), es (neuter) based on the article.',
                    table: {
                        headers: ['Noun', 'Gender', 'Pronoun'],
                        rows: [
                            ['der Tisch (cái bàn)', 'masculine', 'er'],
                            ['die Lampe (cái đèn)', 'feminine', 'sie'],
                            ['das Buch (cuốn sách)', 'neuter', 'es']
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        prerequisiteIds: ['a1-l01-alphabet'],
        exercises: [
            // === A: MCQ (8) ===
            { exerciseType: 'mcq', order: 1, questionDe: 'Welches Pronomen für sich selbst?', questionEn: 'Which pronoun for yourself?', questionVi: 'Đại từ nào cho bản thân?', answerData: { options: ['du', 'ich', 'er', 'wir'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Mit Kunden spricht man per...', questionEn: 'With customers you use...', questionVi: 'Với khách hàng dùng...', answerData: { options: ['du', 'ihr', 'Sie', 'er'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Peter ist Lehrer." - Ersetze Peter:', questionEn: 'Replace "Peter":',  questionVi: 'Thay "Peter":', answerData: { options: ['sie', 'er', 'es', 'Sie'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Das Mädchen ist klein." - Ersetze "das Mädchen":', questionEn: 'Replace "das Mädchen":', questionVi: 'Thay "das Mädchen":', answerData: { options: ['sie (vì là girl)', 'er', 'es (giống trung/neuter)', 'du'], correctIndex: 2 }, explanation: { de: 'Das Mädchen ist Neutrum → es', en: 'Das Mädchen is neuter → es', vi: 'Das Mädchen giống trung → es' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Welches Pronomen wird IMMER großgeschrieben?', questionEn: 'Which pronoun is ALWAYS capitalized?', questionVi: 'Đại từ nào LUÔN viết hoa?', answerData: { options: ['ich', 'er', 'sie (họ)', 'Sie (formal)'], correctIndex: 3 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Maria und ich" wird ersetzt durch:', questionEn: '"Maria and I" is replaced by:', questionVi: '"Maria và tôi" thay bằng:', answerData: { options: ['sie', 'ihr', 'wir', 'es'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Mit einer Gruppe von Freunden:', questionEn: 'With a group of friends:', questionVi: 'Với nhóm bạn thân:', answerData: { options: ['du', 'Sie', 'ihr', 'wir'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Der Tisch" (maskulin) → Pronomen?', questionEn: '"Der Tisch" (masculine) → pronoun?', questionVi: '"Der Tisch" (giống nam) → đại từ?', answerData: { options: ['sie', 'er', 'es', 'das'], correctIndex: 1 }, points: 1 },
            // === B: Fill blank (7) ===
            { exerciseType: 'fill_blank', order: 9, questionDe: '___ bin Anna.', questionEn: '___ am Anna.', questionVi: '___ là Anna. (I)', answerData: { blanks: [{ answer: 'Ich', alternatives: ['ich'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ bist müde.', questionEn: '___ are tired.', questionVi: '___ mệt. (you informal)', answerData: { blanks: [{ answer: 'Du', alternatives: ['du'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '___ ist Lehrer. (anh ấy/he)', questionEn: '___ ist Lehrer. (he)', questionVi: '___ ist Lehrer. (anh ấy)', answerData: { blanks: [{ answer: 'Er', alternatives: ['er'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Die Frau ist nett. → ___ ist nett.', questionEn: 'Die Frau ist nett. → ___ ist nett.', questionVi: 'Die Frau ist nett. → ___ ist nett.', answerData: { blanks: [{ answer: 'Sie', alternatives: ['sie'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Das Kind spielt. → ___ spielt.', questionEn: 'Das Kind spielt. → ___ spielt.', questionVi: 'Das Kind chơi. → ___ spielt.', answerData: { blanks: [{ answer: 'Es', alternatives: ['es'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: '(Formal) Woher kommen ___?', questionEn: '(Formal) Where do ___ come from?', questionVi: '(Trang trọng) ___ từ đâu đến?', answerData: { blanks: [{ answer: 'Sie', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Anna und ich → ___', questionEn: 'Anna and I → ___', questionVi: 'Anna và tôi → ___', answerData: { blanks: [{ answer: 'wir', alternatives: ['Wir'] }] }, points: 1 },
            // === C: Reorder (5) ===
            { exerciseType: 'reorder', order: 16, questionDe: 'bin / ich / Student', questionEn: 'Reorder: bin / ich / Student', questionVi: 'Xếp câu: bin / ich / Student', answerData: { correctOrder: ['Ich', 'bin', 'Student'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'ist / er / aus Berlin', questionEn: 'Reorder: ist / er / aus Berlin', questionVi: 'Xếp câu: ist / er / aus Berlin', answerData: { correctOrder: ['Er', 'ist', 'aus', 'Berlin'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Sie / sind / Lehrerin / ?', questionEn: 'Reorder: Sie / sind / Lehrerin / ?', questionVi: 'Xếp câu: Sie / sind / Lehrerin / ?', answerData: { correctOrder: ['Sind', 'Sie', 'Lehrerin?'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'wir / müde / sind', questionEn: 'Reorder: wir / müde / sind', questionVi: 'Xếp câu: wir / müde / sind', answerData: { correctOrder: ['Wir', 'sind', 'müde'] }, points: 1 },
            { exerciseType: 'reorder', order: 20, questionDe: 'du / woher / kommst / ?', questionEn: 'Reorder: du / woher / kommst / ?', questionVi: 'Xếp câu: du / woher / kommst / ?', answerData: { correctOrder: ['Woher', 'kommst', 'du?'] }, points: 1 },
            // === D: Translate (5) ===
            { exerciseType: 'translate', order: 21, questionDe: 'Übersetze: "Tôi là sinh viên."', questionEn: 'Translate: "I am a student."', questionVi: 'Dịch: "Tôi là sinh viên."', answerData: { acceptedAnswers: ['Ich bin Student', 'Ich bin Studentin'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionDe: 'Übersetze: "Cô ấy là bác sĩ."', questionEn: 'Translate: "She is a doctor."', questionVi: 'Dịch: "Cô ấy là bác sĩ."', answerData: { acceptedAnswers: ['Sie ist Ärztin', 'Sie ist Arztin'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionDe: 'Übersetze: "Chúng tôi từ Việt Nam."', questionEn: 'Translate: "We are from Vietnam."', questionVi: 'Dịch: "Chúng tôi từ Việt Nam."', answerData: { acceptedAnswers: ['Wir kommen aus Vietnam', 'Wir sind aus Vietnam'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionDe: 'Übersetze: "Ông/Bà khỏe không?" (formal)', questionEn: 'Translate: "How are you?" (formal)', questionVi: 'Dịch: "Ông/Bà khỏe không?"', answerData: { acceptedAnswers: ['Wie geht es Ihnen?', 'Wie geht es Ihnen', 'Geht es Ihnen gut?'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionDe: 'Übersetze: "Họ là bạn bè."', questionEn: 'Translate: "They are friends."', questionVi: 'Dịch: "Họ là bạn bè."', answerData: { acceptedAnswers: ['Sie sind Freunde'] }, points: 1 },
            // === E: Error Correction (5) ===
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Der Mann ist nett. Sie ist aus Berlin.', questionEn: 'Correct the pronoun error.', questionVi: 'Sửa lỗi đại từ.', answerData: { correctedText: 'Der Mann ist nett. Er ist aus Berlin.' }, explanation: { de: 'Mann = maskulin → er', en: 'Mann = masculine → er', vi: 'Mann = giống nam → er' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Woher kommen du? (to a stranger)', questionEn: 'Correct (speaking to a stranger)', questionVi: 'Sửa lỗi (nói với người lạ)', answerData: { correctedText: 'Woher kommen Sie?' }, explanation: { de: 'Fremde → Sie (formal)', en: 'Strangers → Sie (formal)', vi: 'Người lạ → Sie (trang trọng)' }, points: 1 },
            { exerciseType: 'error_correct', order: 28, questionDe: 'Korrigiere: Das Buch ist gut. Er ist interessant.', questionEn: 'Correct the pronoun.', questionVi: 'Sửa lỗi đại từ.', answerData: { correctedText: 'Das Buch ist gut. Es ist interessant.' }, explanation: { de: 'Buch = Neutrum → es', en: 'Buch = neuter → es', vi: 'Buch giống trung → es' }, points: 1 },
            { exerciseType: 'error_correct', order: 29, questionDe: 'Korrigiere: ich bin Student. (Satzanfang)', questionEn: 'Correct: ich bin Student. (start of sentence)', questionVi: 'Sửa lỗi: ich bin Student. (đầu câu)', answerData: { correctedText: 'Ich bin Student.' }, explanation: { de: 'Satzanfang → großschreiben', en: 'Start of sentence → capitalize', vi: 'Đầu câu → viết hoa' }, points: 1 },
            { exerciseType: 'error_correct', order: 30, questionDe: 'Korrigiere: Maria und ich sind hier. Er sind Freunde.', questionEn: 'Correct the pronoun.', questionVi: 'Sửa lỗi đại từ.', answerData: { correctedText: 'Maria und ich sind hier. Wir sind Freunde.' }, explanation: { de: 'Maria und ich = wir', en: 'Maria and I = wir', vi: 'Maria và tôi = wir' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 3: VERB "SEIN" (TO BE)
    // =================================================================
    {
        slug: 'a1-l03-verb-sein',
        level: 'A1',
        lessonNumber: 3,
        titleDe: 'Das Verb "sein"',
        titleEn: 'The Verb "sein" (to be)',
        titleVi: 'Động từ "sein" (là)',
        objectives: {
            de: ['Konjugation von "sein" im Präsens', '"sein" für Berufe, Nationalitäten, Adjektive', 'Verneinung mit "nicht"'],
            en: ['Conjugate "sein" in present tense', 'Use "sein" for professions, nationalities, adjectives', 'Negation with "nicht"'],
            vi: ['Chia "sein" ở thì hiện tại', 'Dùng "sein" cho nghề nghiệp, quốc tịch, tính từ', 'Phủ định với "nicht"']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Konjugation', en: 'Conjugation', vi: 'Bảng chia' },
                    content: '"sein" is the most irregular verb in German, similar to "to be" in English.',
                    table: { headers: ['Pronoun', 'sein', 'Example'], rows: [
                        ['ich', 'bin', 'Ich bin Student.'], ['du', 'bist', 'Du bist nett.'],
                        ['er/sie/es', 'ist', 'Er ist Lehrer.'], ['wir', 'sind', 'Wir sind Freunde.'],
                        ['ihr', 'seid', 'Ihr seid müde.'], ['sie/Sie', 'sind', 'Sie sind aus Berlin.']
                    ] }
                },
                {
                    title: { de: 'Berufe (ohne Artikel!)', en: 'Professions (no article!)', vi: 'Nghề nghiệp (KHÔNG dùng mạo từ!)' },
                    content: '⚠️ Unlike English, German does NOT use an article before professions: ❌ Ich bin ein Lehrer ✅ Ich bin Lehrer.',
                    table: { headers: ['Deutsch', 'English', 'Note'], rows: [
                        ['Ich bin Lehrer.', 'I am a teacher.', 'NO article!'],
                        ['Sie ist Ärztin.', 'She is a doctor.', 'Female form: -in'],
                        ['Er ist Student.', 'He is a student.', '']
                    ] }
                },
                {
                    title: { de: 'Verneinung', en: 'Negation', vi: 'Phủ định' },
                    content: 'Negate with "nicht" after "sein": Ich bin nicht müde.',
                    table: { headers: ['Affirmative', 'Negative'], rows: [
                        ['Ich bin müde.', 'Ich bin nicht müde.'],
                        ['Er ist Lehrer.', 'Er ist nicht Lehrer.'],
                        ['Wir sind in Berlin.', 'Wir sind nicht in Berlin.']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30,
        prerequisiteIds: ['a1-l02-personal-pronouns'],
        exercises: [
            // === A: MCQ (6) ===
            { exerciseType: 'mcq', order: 1, questionDe: 'Ich ___ Student.', questionEn: 'Ich ___ Student.', questionVi: 'Ich ___ Student.', answerData: { options: ['ist', 'bin', 'bist', 'sind'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Welcher Satz ist richtig?', questionEn: 'Which sentence is correct?', questionVi: 'Câu nào đúng?', answerData: { options: ['Ich bin ein Lehrer.', 'Ich bin Lehrer.', 'Ich bin der Lehrer.', 'Ich Lehrer bin.'], correctIndex: 1 }, explanation: { de: 'Kein Artikel vor Berufen!', en: 'No article before professions!', vi: 'KHÔNG mạo từ trước nghề nghiệp!' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Ihr ___ aus Deutschland.', questionEn: 'Ihr ___ aus Deutschland.', questionVi: 'Ihr ___ aus Deutschland.', answerData: { options: ['ist', 'bin', 'seid', 'sind'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Verneinung von "Sie ist müde"?', questionEn: 'Negation of "Sie ist müde"?', questionVi: 'Phủ định của "Sie ist müde"?', answerData: { options: ['Sie ist kein müde.', 'Sie nicht ist müde.', 'Sie ist nicht müde.', 'Sie ist müde nicht.'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Das Buch ___ interessant.', questionEn: 'Das Buch ___ interessant.', questionVi: 'Das Buch ___ interessant.', answerData: { options: ['bin', 'bist', 'ist', 'sind'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Formell: "Du bist nett" → ?', questionEn: 'Formal version of "Du bist nett"?', questionVi: 'Dạng trang trọng của "Du bist nett"?', answerData: { options: ['Er ist nett.', 'Ihr seid nett.', 'Sie sind nett.', 'Wir sind nett.'], correctIndex: 2 }, points: 1 },
            // === B: Fill blank (7) ===
            { exerciseType: 'fill_blank', order: 7, questionDe: 'Ich ___ Anna.', questionEn: 'I ___ Anna.', questionVi: 'Tôi ___ Anna.', answerData: { blanks: [{ answer: 'bin', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Du ___ müde.', questionEn: 'You ___ tired.', questionVi: 'Bạn ___ mệt.', answerData: { blanks: [{ answer: 'bist', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Er ___ Arzt.', questionEn: 'He ___ a doctor.', questionVi: 'Anh ấy ___ bác sĩ.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Wir ___ Freunde.', questionEn: 'We ___ friends.', questionVi: 'Chúng tôi ___ bạn bè.', answerData: { blanks: [{ answer: 'sind', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Ihr ___ nett.', questionEn: 'You all ___ nice.', questionVi: 'Các bạn ___ tốt.', answerData: { blanks: [{ answer: 'seid', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Sie (họ) ___ aus Berlin.', questionEn: 'They ___ from Berlin.', questionVi: 'Họ ___ từ Berlin.', answerData: { blanks: [{ answer: 'sind', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich bin ___ (Vietnamese, female).', questionEn: 'I am ___ (Vietnamese, female).', questionVi: 'Tôi là ___ (người Việt, nữ).', answerData: { blanks: [{ answer: 'Vietnamesin', alternatives: ['vietnamesin'] }] }, points: 1 },
            // === C: Reorder (5) ===
            { exerciseType: 'reorder', order: 14, questionDe: 'bin / Studentin / ich', questionEn: 'Reorder: bin / Studentin / ich', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'bin', 'Studentin'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'nicht / ist / er / müde', questionEn: 'Reorder: nicht / ist / er / müde', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Er', 'ist', 'nicht', 'müde'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'ihr / seid / woher / ?', questionEn: 'Reorder: ihr / seid / woher / ?', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Woher', 'seid', 'ihr?'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Berlin / wir / in / sind', questionEn: 'Reorder: Berlin / wir / in / sind', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Wir', 'sind', 'in', 'Berlin'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Sie / Frau Müller / sind / ?', questionEn: 'Reorder: Sie / Frau Müller / sind / ?', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Sind', 'Sie', 'Frau', 'Müller?'] }, points: 1 },
            // === D: Translate (5) ===
            { exerciseType: 'translate', order: 19, questionDe: '"Tôi là sinh viên."', questionEn: '"I am a student."', questionVi: '"Tôi là sinh viên."', answerData: { acceptedAnswers: ['Ich bin Student', 'Ich bin Studentin'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionDe: '"Anh ấy không phải bác sĩ."', questionEn: '"He is not a doctor."', questionVi: '"Anh ấy không phải bác sĩ."', answerData: { acceptedAnswers: ['Er ist nicht Arzt'] }, points: 1 },
            { exerciseType: 'translate', order: 21, questionDe: '"Chúng tôi ở Việt Nam."', questionEn: '"We are in Vietnam."', questionVi: '"Chúng tôi ở Việt Nam."', answerData: { acceptedAnswers: ['Wir sind in Vietnam'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionDe: '"Cuốn sách rất thú vị."', questionEn: '"The book is very interesting."', questionVi: '"Cuốn sách rất thú vị."', answerData: { acceptedAnswers: ['Das Buch ist sehr interessant'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionDe: '"Ông có phải ông Schmidt?"', questionEn: '"Are you Mr. Schmidt?" (formal)', questionVi: '"Ông có phải ông Schmidt?"', answerData: { acceptedAnswers: ['Sind Sie Herr Schmidt?', 'Sind Sie Herr Schmidt'] }, points: 1 },
            // === E: Error Correction (5) ===
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Ich bin ein Student.', questionEn: 'Correct: Ich bin ein Student.', questionVi: 'Sửa lỗi: Ich bin ein Student.', answerData: { correctedText: 'Ich bin Student.' }, explanation: { de: 'Kein Artikel vor Berufen', en: 'No article before professions', vi: 'Không mạo từ trước nghề nghiệp' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Du ist müde.', questionEn: 'Correct: Du ist müde.', questionVi: 'Sửa lỗi: Du ist müde.', answerData: { correctedText: 'Du bist müde.' }, points: 1 },
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Wir ist Freunde.', questionEn: 'Correct: Wir ist Freunde.', questionVi: 'Sửa lỗi: Wir ist Freunde.', answerData: { correctedText: 'Wir sind Freunde.' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Sie ist nicht müde nicht.', questionEn: 'Correct: Sie ist nicht müde nicht.', questionVi: 'Sửa lỗi: Sie ist nicht müde nicht.', answerData: { correctedText: 'Sie ist nicht müde.' }, points: 1 },
            { exerciseType: 'error_correct', order: 28, questionDe: 'Korrigiere: Ihr sind nett.', questionEn: 'Correct: Ihr sind nett.', questionVi: 'Sửa lỗi: Ihr sind nett.', answerData: { correctedText: 'Ihr seid nett.' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 4: VERB "HABEN" (TO HAVE)
    // =================================================================
    {
        slug: 'a1-l04-verb-haben',
        level: 'A1',
        lessonNumber: 4,
        titleDe: 'Das Verb "haben"',
        titleEn: 'The Verb "haben" (to have)',
        titleVi: 'Động từ "haben" (có)',
        objectives: {
            de: ['Konjugation von "haben" im Präsens', '"haben" für Besitz, Alter, Redewendungen', 'Verneinung mit "kein"'],
            en: ['Conjugate "haben" in present tense', 'Use "haben" for possession, age, idioms', 'Negation with "kein"'],
            vi: ['Chia "haben" ở thì hiện tại', 'Dùng "haben" cho sở hữu, tuổi, thành ngữ', 'Phủ định với "kein"']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Konjugation', en: 'Conjugation', vi: 'Bảng chia' },
                    content: '"haben" is slightly irregular: du hast (not habst), er/sie/es hat (not habt).',
                    table: { headers: ['Pronoun', 'haben', 'Example'], rows: [
                        ['ich', 'habe', 'Ich habe ein Buch.'], ['du', 'hast', 'Du hast eine Katze.'],
                        ['er/sie/es', 'hat', 'Er hat Hunger.'], ['wir', 'haben', 'Wir haben Zeit.'],
                        ['ihr', 'habt', 'Ihr habt Glück.'], ['sie/Sie', 'haben', 'Sie haben ein Auto.']
                    ] }
                },
                {
                    title: { de: 'Verwendung', en: 'Usage', vi: 'Cách dùng' },
                    content: '"haben" is used for possession, age (Ich bin 20 Jahre alt BUT Ich habe Geburtstag), and many idioms.',
                    table: { headers: ['Expression', 'Meaning', 'Note'], rows: [
                        ['Hunger haben', 'to be hungry', 'NOT "sein"!'],
                        ['Durst haben', 'to be thirsty', ''],
                        ['Angst haben', 'to be afraid', ''],
                        ['Recht haben', 'to be right', ''],
                        ['Zeit haben', 'to have time', ''],
                        ['Glück haben', 'to be lucky', '']
                    ] }
                },
                {
                    title: { de: 'Verneinung mit kein', en: 'Negation with kein', vi: 'Phủ định với kein' },
                    content: 'Use "kein/keine" (not "nicht ein") to negate nouns with ein/eine: Ich habe ein Auto → Ich habe kein Auto.',
                    table: { headers: ['Positive', 'Negative'], rows: [
                        ['Ich habe ein Buch.', 'Ich habe kein Buch.'],
                        ['Er hat eine Katze.', 'Er hat keine Katze.'],
                        ['Wir haben Hunger.', 'Wir haben keinen Hunger.']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30,
        prerequisiteIds: ['a1-l03-verb-sein'],
        exercises: [
            // === A: MCQ (8) ===
            { exerciseType: 'mcq', order: 1, questionDe: 'Du ___ ein Buch.', questionEn: 'Du ___ ein Buch.', questionVi: 'Du ___ ein Buch.', answerData: { options: ['habe', 'hast', 'hat', 'haben'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Er ___ Hunger.', questionEn: 'Er ___ Hunger.', questionVi: 'Er ___ Hunger.', answerData: { options: ['habe', 'hast', 'hat', 'habt'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Ich habe ein Auto" - Verneinung?', questionEn: 'Negate: "Ich habe ein Auto"', questionVi: 'Phủ định: "Ich habe ein Auto"', answerData: { options: ['Ich habe nicht Auto.', 'Ich habe kein Auto.', 'Ich nicht habe Auto.', 'Ich habe ein nicht Auto.'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Wir ___ Zeit.', questionEn: 'Wir ___ Zeit.', questionVi: 'Wir ___ Zeit.', answerData: { options: ['hast', 'hat', 'habt', 'haben'], correctIndex: 3 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Ich bin hungrig" auf Deutsch besser:', questionEn: '"I am hungry" in German:', questionVi: '"Tôi đói" tiếng Đức nói thế nào?', answerData: { options: ['Ich bin Hunger.', 'Ich habe Hunger.', 'Ich bin hungrig.', 'B und C sind beide richtig.'], correctIndex: 3 }, explanation: { de: '"Ich habe Hunger" und "Ich bin hungrig" sind beide korrekt', en: 'Both are correct, but "Hunger haben" is more common', vi: 'Cả hai đều đúng, nhưng "Hunger haben" phổ biến hơn' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Ihr ___ Glück.', questionEn: 'Ihr ___ Glück.', questionVi: 'Ihr ___ Glück.', answerData: { options: ['habe', 'hast', 'hat', 'habt'], correctIndex: 3 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Negate: "Sie hat eine Schwester."', questionEn: 'Negate: "Sie hat eine Schwester."', questionVi: 'Phủ định: "Sie hat eine Schwester."', answerData: { options: ['Sie hat nicht eine Schwester.', 'Sie hat keine Schwester.', 'Sie nicht hat eine Schwester.', 'Sie hat eine nicht Schwester.'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Welcher Satz ist falsch?', questionEn: 'Which sentence is wrong?', questionVi: 'Câu nào sai?', answerData: { options: ['Ich habe Hunger.', 'Du habst ein Buch.', 'Er hat Zeit.', 'Wir haben Glück.'], correctIndex: 1 }, explanation: { de: 'du hast (nicht habst!)', en: 'du hast (not habst!)', vi: 'du hast (không phải habst!)' }, points: 1 },
            // === B: Fill blank (7) ===
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich ___ ein Buch.', questionEn: 'I ___ a book.', questionVi: 'Tôi ___ một cuốn sách.', answerData: { blanks: [{ answer: 'habe', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Du ___ eine Katze.', questionEn: 'You ___ a cat.', questionVi: 'Bạn ___ một con mèo.', answerData: { blanks: [{ answer: 'hast', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Sie (she) ___ Durst.', questionEn: 'She ___ thirsty.', questionVi: 'Cô ấy ___ khát.', answerData: { blanks: [{ answer: 'hat', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Wir ___ keine Zeit.', questionEn: 'We ___ no time.', questionVi: 'Chúng tôi ___ không có thời gian.', answerData: { blanks: [{ answer: 'haben', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ihr ___ Glück.', questionEn: 'You all ___ lucky.', questionVi: 'Các bạn ___ may mắn.', answerData: { blanks: [{ answer: 'habt', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Ich habe ___ Auto. (negation)', questionEn: 'I have ___ car. (negation)', questionVi: 'Tôi ___ xe hơi. (phủ định)', answerData: { blanks: [{ answer: 'kein', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Er hat ___ Schwester. (negation)', questionEn: 'He has ___ sister. (negation)', questionVi: 'Anh ấy không có ___ chị gái. (phủ định)', answerData: { blanks: [{ answer: 'keine', alternatives: [] }] }, points: 1 },
            // === C: Reorder (5) ===
            { exerciseType: 'reorder', order: 16, questionDe: 'habe / ein / ich / Buch', questionEn: 'Reorder:', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'habe', 'ein', 'Buch'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Hunger / hat / er', questionEn: 'Reorder:', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Er', 'hat', 'Hunger'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'keine / wir / haben / Zeit', questionEn: 'Reorder:', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Wir', 'haben', 'keine', 'Zeit'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'ihr / habt / Kinder / ?', questionEn: 'Reorder:', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Habt', 'ihr', 'Kinder?'] }, points: 1 },
            { exerciseType: 'reorder', order: 20, questionDe: 'Sie / haben / Recht', questionEn: 'Reorder:', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Sie', 'haben', 'Recht'] }, points: 1 },
            // === D: Translate (5) ===
            { exerciseType: 'translate', order: 21, questionDe: '"Tôi có một cuốn sách."', questionEn: '"I have a book."', questionVi: '"Tôi có một cuốn sách."', answerData: { acceptedAnswers: ['Ich habe ein Buch', 'Ich habe ein Buch.'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionDe: '"Anh ấy đói."', questionEn: '"He is hungry."', questionVi: '"Anh ấy đói."', answerData: { acceptedAnswers: ['Er hat Hunger', 'Er hat Hunger.', 'Er ist hungrig', 'Er ist hungrig.'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionDe: '"Chúng tôi không có thời gian."', questionEn: '"We have no time."', questionVi: '"Chúng tôi không có thời gian."', answerData: { acceptedAnswers: ['Wir haben keine Zeit', 'Wir haben keine Zeit.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionDe: '"Bạn có bao nhiêu anh chị em?"', questionEn: '"How many siblings do you have?"', questionVi: '"Bạn có bao nhiêu anh chị em?"', answerData: { acceptedAnswers: ['Wie viele Geschwister hast du?', 'Wie viele Geschwister hast du'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionDe: '"Cô ấy không có xe hơi."', questionEn: '"She has no car."', questionVi: '"Cô ấy không có xe hơi."', answerData: { acceptedAnswers: ['Sie hat kein Auto', 'Sie hat kein Auto.'] }, points: 1 },
            // === E: Error Correction (5) ===
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Du habst ein Buch.', questionEn: 'Correct: Du habst ein Buch.', questionVi: 'Sửa: Du habst ein Buch.', answerData: { correctedText: 'Du hast ein Buch.' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Ich habe nicht ein Auto.', questionEn: 'Correct: Ich habe nicht ein Auto.', questionVi: 'Sửa: Ich habe nicht ein Auto.', answerData: { correctedText: 'Ich habe kein Auto.' }, explanation: { de: 'nicht ein → kein', en: 'nicht ein → kein', vi: 'nicht ein → kein' }, points: 1 },
            { exerciseType: 'error_correct', order: 28, questionDe: 'Korrigiere: Er habe Hunger.', questionEn: 'Correct: Er habe Hunger.', questionVi: 'Sửa: Er habe Hunger.', answerData: { correctedText: 'Er hat Hunger.' }, points: 1 },
            { exerciseType: 'error_correct', order: 29, questionDe: 'Korrigiere: Ich bin Hunger.', questionEn: 'Correct: Ich bin Hunger.', questionVi: 'Sửa: Ich bin Hunger.', answerData: { correctedText: 'Ich habe Hunger.' }, explanation: { de: 'Hunger haben (nicht sein)', en: 'Hunger haben (not sein)', vi: 'Hunger haben (không phải sein)' }, points: 1 },
            { exerciseType: 'error_correct', order: 30, questionDe: 'Korrigiere: Wir habt keine Zeit.', questionEn: 'Correct: Wir habt keine Zeit.', questionVi: 'Sửa: Wir habt keine Zeit.', answerData: { correctedText: 'Wir haben keine Zeit.' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 5: REGELMÄSSIGE VERBEN
    // =================================================================
    {
        slug: 'a1-l05-regular-verbs',
        level: 'A1',
        lessonNumber: 5,
        titleDe: 'Regelmäßige Verben',
        titleEn: 'Regular Verb Conjugation',
        titleVi: 'Chia động từ quy tắc',
        objectives: {
            de: ['Regelmäßige Verbendungen lernen', 'Häufige Verben konjugieren', 'Sätze mit Verben bilden'],
            en: ['Learn regular verb endings', 'Conjugate common verbs', 'Build sentences with verbs'],
            vi: ['Học đuôi động từ quy tắc', 'Chia các động từ phổ biến', 'Đặt câu với động từ']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Verbendungen', en: 'Verb Endings', vi: 'Đuôi động từ' },
                    content: 'Regular verbs follow a pattern: remove -en from infinitive, add personal endings.',
                    table: { headers: ['Pronoun', 'Ending', 'machen', 'lernen', 'spielen'], rows: [
                        ['ich', '-e', 'mache', 'lerne', 'spiele'],
                        ['du', '-st', 'machst', 'lernst', 'spielst'],
                        ['er/sie/es', '-t', 'macht', 'lernt', 'spielt'],
                        ['wir', '-en', 'machen', 'lernen', 'spielen'],
                        ['ihr', '-t', 'macht', 'lernt', 'spielt'],
                        ['sie/Sie', '-en', 'machen', 'lernen', 'spielen']
                    ] }
                },
                {
                    title: { de: 'Häufige regelmäßige Verben', en: 'Common Regular Verbs', vi: 'Động từ quy tắc thường gặp' },
                    content: 'Key verbs to memorize at A1 level.',
                    table: { headers: ['Verb', 'Meaning DE', 'Meaning VI'], rows: [
                        ['machen', 'to do/make', 'làm'],
                        ['lernen', 'to learn', 'học'],
                        ['spielen', 'to play', 'chơi'],
                        ['wohnen', 'to live', 'sống/ở'],
                        ['kommen', 'to come', 'đến'],
                        ['kaufen', 'to buy', 'mua'],
                        ['fragen', 'to ask', 'hỏi'],
                        ['hören', 'to hear/listen', 'nghe'],
                        ['brauchen', 'to need', 'cần'],
                        ['trinken', 'to drink', 'uống']
                    ] }
                },
                {
                    title: { de: 'Besonderheiten', en: 'Special Cases', vi: 'Trường hợp đặc biệt' },
                    content: 'Verbs with stem ending in -t, -d, -chn, -ffn add extra -e- before -st and -t endings.',
                    table: { headers: ['Verb', 'du', 'er/sie/es', 'ihr'], rows: [
                        ['arbeiten', 'arbeitest', 'arbeitet', 'arbeitet'],
                        ['finden', 'findest', 'findet', 'findet'],
                        ['öffnen', 'öffnest', 'öffnet', 'öffnet']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30,
        prerequisiteIds: ['a1-l04-verb-haben'],
        exercises: [
            // === A: MCQ (8) ===
            { exerciseType: 'mcq', order: 1, questionDe: 'Ich ___ Deutsch. (lernen)', questionEn: 'Ich ___ Deutsch.', questionVi: 'Ich ___ tiếng Đức.', answerData: { options: ['lerne', 'lernst', 'lernt', 'lernen'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Du ___ in Berlin. (wohnen)', questionEn: 'Du ___ in Berlin.', questionVi: 'Du ___ ở Berlin.', answerData: { options: ['wohne', 'wohnst', 'wohnt', 'wohnen'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Er ___ Fußball. (spielen)', questionEn: 'Er ___ Fußball.', questionVi: 'Er ___ bóng đá.', answerData: { options: ['spiele', 'spielst', 'spielt', 'spielen'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Wir ___ Musik. (hören)', questionEn: 'Wir ___ Musik.', questionVi: 'Wir ___ nhạc.', answerData: { options: ['höre', 'hörst', 'hört', 'hören'], correctIndex: 3 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Du ___ viel. (arbeiten)', questionEn: 'Du ___ a lot.', questionVi: 'Du ___ nhiều.', answerData: { options: ['arbeitst', 'arbeitest', 'arbeitet', 'arbeiten'], correctIndex: 1 }, explanation: { de: 'Stamm auf -t: du arbeitest (extra -e-)', en: 'Stem ends in -t: du arbeitest (extra -e-)', vi: 'Gốc tận cùng -t: thêm -e-' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Welche Endung für "ihr"?', questionEn: 'What ending for "ihr"?', questionVi: 'Đuôi nào cho "ihr"?', answerData: { options: ['-e', '-st', '-t', '-en'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Sie (formal) ___ aus Vietnam. (kommen)', questionEn: 'Sie ___ aus Vietnam.', questionVi: 'Ông/Bà ___ từ Việt Nam.', answerData: { options: ['komme', 'kommst', 'kommt', 'kommen'], correctIndex: 3 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Welcher Satz ist richtig?', questionEn: 'Which is correct?', questionVi: 'Câu nào đúng?', answerData: { options: ['Er arbeit viel.', 'Er arbeitet viel.', 'Er arbeitt viel.', 'Er arbeite viel.'], correctIndex: 1 }, points: 1 },
            // === B: Fill blank (7) ===
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich ___ Kaffee. (trinken)', questionEn: 'I ___ coffee.', questionVi: 'Tôi ___ cà phê.', answerData: { blanks: [{ answer: 'trinke', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Du ___ aus Deutschland. (kommen)', questionEn: 'You ___ from Germany.', questionVi: 'Bạn ___ từ Đức.', answerData: { blanks: [{ answer: 'kommst', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Er ___ ein Buch. (kaufen)', questionEn: 'He ___ a book.', questionVi: 'Anh ấy ___ một cuốn sách.', answerData: { blanks: [{ answer: 'kauft', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Wir ___ Deutsch. (lernen)', questionEn: 'We ___ German.', questionVi: 'Chúng tôi ___ tiếng Đức.', answerData: { blanks: [{ answer: 'lernen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ihr ___ Tennis. (spielen)', questionEn: 'You all ___ tennis.', questionVi: 'Các bạn ___ tennis.', answerData: { blanks: [{ answer: 'spielt', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Sie ___ in München. (wohnen) (she)', questionEn: 'She ___ in Munich.', questionVi: 'Cô ấy ___ ở München.', answerData: { blanks: [{ answer: 'wohnt', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Er ___ die Tür. (öffnen)', questionEn: 'He ___ the door.', questionVi: 'Anh ấy ___ cửa.', answerData: { blanks: [{ answer: 'öffnet', alternatives: [] }] }, points: 1 },
            // === C: Reorder (5) ===
            { exerciseType: 'reorder', order: 16, questionDe: 'Deutsch / wir / lernen', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Wir', 'lernen', 'Deutsch'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Fußball / er / spielt', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Er', 'spielt', 'Fußball'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'du / woher / kommst / ?', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Woher', 'kommst', 'du?'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'kaufen / Brot / wir', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Wir', 'kaufen', 'Brot'] }, points: 1 },
            { exerciseType: 'reorder', order: 20, questionDe: 'in Berlin / ich / wohne', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'wohne', 'in', 'Berlin'] }, points: 1 },
            // === D: Translate (5) ===
            { exerciseType: 'translate', order: 21, questionVi: '"Tôi học tiếng Đức."', questionEn: '"I learn German."', answerData: { acceptedAnswers: ['Ich lerne Deutsch', 'Ich lerne Deutsch.'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionVi: '"Anh ấy chơi bóng đá."', questionEn: '"He plays football."', answerData: { acceptedAnswers: ['Er spielt Fußball', 'Er spielt Fussball'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: '"Chúng tôi mua bánh mì."', questionEn: '"We buy bread."', answerData: { acceptedAnswers: ['Wir kaufen Brot', 'Wir kaufen Brot.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: '"Cô ấy sống ở Berlin."', questionEn: '"She lives in Berlin."', answerData: { acceptedAnswers: ['Sie wohnt in Berlin', 'Sie wohnt in Berlin.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: '"Bạn uống gì?"', questionEn: '"What do you drink?"', answerData: { acceptedAnswers: ['Was trinkst du?', 'Was trinkst du', 'Was trinken Sie?'] }, points: 1 },
            // === E: Error Correction (5) ===
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Er arbeit viel.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Er arbeitet viel.' }, explanation: { de: 'Stamm auf -t: arbeit-et', en: 'Stem ending -t: arbeit-et', vi: 'Gốc tận cùng -t: thêm -et' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Ich lerne Deutsch.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Ich lerne Deutsch.' }, explanation: { de: 'Der Satz ist korrekt!', en: 'The sentence is correct!', vi: 'Câu này đúng rồi!' }, points: 1 },
            { exerciseType: 'error_correct', order: 28, questionDe: 'Korrigiere: Du spielen Tennis.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Du spielst Tennis.' }, points: 1 },
            { exerciseType: 'error_correct', order: 29, questionDe: 'Korrigiere: Wir wohnt in Berlin.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Wir wohnen in Berlin.' }, points: 1 },
            { exerciseType: 'error_correct', order: 30, questionDe: 'Korrigiere: Sie kommst aus Vietnam.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Sie kommt aus Vietnam.' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 6: UNREGELMÄSSIGE VERBEN
    // =================================================================
    {
        slug: 'a1-l06-irregular-verbs',
        level: 'A1',
        lessonNumber: 6,
        titleDe: 'Unregelmäßige Verben',
        titleEn: 'Irregular Verb Conjugation',
        titleVi: 'Chia động từ bất quy tắc',
        objectives: {
            de: ['Vokalwechsel a→ä, e→i, e→ie lernen', 'Wichtige unregelmäßige Verben konjugieren'],
            en: ['Learn vowel changes a→ä, e→i, e→ie', 'Conjugate important irregular verbs'],
            vi: ['Học biến đổi nguyên âm a→ä, e→i, e→ie', 'Chia các động từ bất quy tắc quan trọng']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Vokalwechsel', en: 'Vowel Changes', vi: 'Biến đổi nguyên âm' },
                    content: 'Irregular verbs change their stem vowel for du and er/sie/es forms ONLY.',
                    table: { headers: ['Type', 'ich', 'du', 'er/sie/es', 'wir'], rows: [
                        ['a→ä: fahren', 'fahre', 'fährst', 'fährt', 'fahren'],
                        ['a→ä: schlafen', 'schlafe', 'schläfst', 'schläft', 'schlafen'],
                        ['e→i: sprechen', 'spreche', 'sprichst', 'spricht', 'sprechen'],
                        ['e→i: essen', 'esse', 'isst', 'isst', 'essen'],
                        ['e→ie: lesen', 'lese', 'liest', 'liest', 'lesen'],
                        ['e→ie: sehen', 'sehe', 'siehst', 'sieht', 'sehen']
                    ] }
                },
                {
                    title: { de: 'Wichtige Verben', en: 'Key Irregular Verbs', vi: 'Động từ bất quy tắc quan trọng' },
                    content: 'These are the most common irregular verbs at A1.',
                    table: { headers: ['Infinitiv', 'du', 'er/sie/es', 'Nghĩa/Meaning'], rows: [
                        ['fahren', 'fährst', 'fährt', 'đi (xe)/to drive'],
                        ['schlafen', 'schläfst', 'schläft', 'ngủ/to sleep'],
                        ['laufen', 'läufst', 'läuft', 'chạy/to run'],
                        ['sprechen', 'sprichst', 'spricht', 'nói/to speak'],
                        ['essen', 'isst', 'isst', 'ăn/to eat'],
                        ['geben', 'gibst', 'gibt', 'cho/to give'],
                        ['nehmen', 'nimmst', 'nimmt', 'lấy/to take'],
                        ['lesen', 'liest', 'liest', 'đọc/to read'],
                        ['sehen', 'siehst', 'sieht', 'thấy/to see']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30,
        prerequisiteIds: ['a1-l05-regular-verbs'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Er ___ ein Buch. (lesen)', questionVi: 'Er ___ sách.', answerData: { options: ['lest', 'lest', 'liest', 'lesen'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Du ___ Deutsch. (sprechen)', questionVi: 'Du ___ tiếng Đức.', answerData: { options: ['sprechst', 'sprichst', 'spricht', 'sprechen'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Sie ___ nach Berlin. (fahren, she)', questionVi: 'Cô ấy ___ đến Berlin.', answerData: { options: ['fahrt', 'fährst', 'fährt', 'fahren'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Welcher Vokalwechsel hat "essen"?', questionEn: 'What vowel change does "essen" have?', questionVi: '"essen" có biến đổi nguyên âm gì?', answerData: { options: ['a→ä', 'e→i', 'e→ie', 'keine Änderung'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Wir ___ jeden Tag 8 Stunden. (schlafen)', questionVi: 'Chúng tôi ___ 8 tiếng mỗi ngày.', answerData: { options: ['schläfen', 'schlaft', 'schlafen', 'schläft'], correctIndex: 2 }, explanation: { de: 'wir → kein Vokalwechsel!', en: 'wir → no vowel change!', vi: 'wir → KHÔNG đổi nguyên âm!' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Er ___ Pizza. (essen)', questionVi: 'Er ___ pizza.', answerData: { options: ['esst', 'isst', 'esst', 'essen'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Du ___ schnell. (laufen)', questionVi: 'Du ___ nhanh.', answerData: { options: ['laufst', 'läufst', 'läuft', 'laufen'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Er ___ mir das Buch. (geben)', questionVi: 'Er ___ tôi cuốn sách.', answerData: { options: ['gebt', 'gebst', 'gibt', 'geben'], correctIndex: 2 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Du ___ zu schnell. (fahren)', questionVi: 'Du ___ quá nhanh.', answerData: { blanks: [{ answer: 'fährst', alternatives: ['faehrst'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Er ___ gern. (lesen)', questionVi: 'Er ___ thích.', answerData: { blanks: [{ answer: 'liest', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Sie ___ gut Deutsch. (sprechen, she)', questionVi: 'Cô ấy ___ tiếng Đức giỏi.', answerData: { blanks: [{ answer: 'spricht', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Du ___ eine Tablette. (nehmen)', questionVi: 'Du ___ một viên thuốc.', answerData: { blanks: [{ answer: 'nimmst', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Wir ___ den Film. (sehen)', questionVi: 'Chúng tôi ___ phim.', answerData: { blanks: [{ answer: 'sehen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Er ___ lange. (schlafen)', questionVi: 'Er ___ dài.', answerData: { blanks: [{ answer: 'schläft', alternatives: ['schlaeft'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Du ___ viel Pizza. (essen)', questionVi: 'Du ___ nhiều pizza.', answerData: { blanks: [{ answer: 'isst', alternatives: [] }] }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 16, questionDe: 'Deutsch / er / spricht / gut', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Er', 'spricht', 'gut', 'Deutsch'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'liest / sie / ein Buch', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Sie', 'liest', 'ein', 'Buch'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'nach / fährt / Berlin / er', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Er', 'fährt', 'nach', 'Berlin'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'isst / was / du / ?', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Was', 'isst', 'du?'] }, points: 1 },
            { exerciseType: 'reorder', order: 20, questionDe: 'nimmt / den Bus / sie', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Sie', 'nimmt', 'den', 'Bus'] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 21, questionVi: '"Anh ấy nói tiếng Đức."', questionEn: '"He speaks German."', answerData: { acceptedAnswers: ['Er spricht Deutsch', 'Er spricht Deutsch.'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionVi: '"Cô ấy đọc một cuốn sách."', questionEn: '"She reads a book."', answerData: { acceptedAnswers: ['Sie liest ein Buch', 'Sie liest ein Buch.'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: '"Bạn ăn gì?"', questionEn: '"What do you eat?"', answerData: { acceptedAnswers: ['Was isst du?', 'Was isst du', 'Was essen Sie?'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: '"Anh ấy lái xe đến Berlin."', questionEn: '"He drives to Berlin."', answerData: { acceptedAnswers: ['Er fährt nach Berlin', 'Er fährt nach Berlin.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: '"Cô ấy ngủ dài."', questionEn: '"She sleeps long."', answerData: { acceptedAnswers: ['Sie schläft lange', 'Sie schläft lange.', 'Sie schläft lang'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Er sprecht Deutsch.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Er spricht Deutsch.' }, explanation: { de: 'e→i: sprechen → spricht', en: 'e→i: sprechen → spricht', vi: 'e→i: sprechen → spricht' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Du fahrst nach Berlin.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Du fährst nach Berlin.' }, points: 1 },
            { exerciseType: 'error_correct', order: 28, questionDe: 'Korrigiere: Wir fähren nach Hause.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Wir fahren nach Hause.' }, explanation: { de: 'wir → kein Vokalwechsel!', en: 'wir → no vowel change!', vi: 'wir → KHÔNG đổi nguyên âm!' }, points: 1 },
            { exerciseType: 'error_correct', order: 29, questionDe: 'Korrigiere: Er esst Pizza.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Er isst Pizza.' }, points: 1 },
            { exerciseType: 'error_correct', order: 30, questionDe: 'Korrigiere: Du lesst ein Buch.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Du liest ein Buch.' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 7: BESTIMMTE ARTIKEL (DER/DIE/DAS)
    // =================================================================
    {
        slug: 'a1-l07-definite-articles',
        level: 'A1',
        lessonNumber: 7,
        titleDe: 'Bestimmte Artikel: der, die, das',
        titleEn: 'Definite Articles: der, die, das',
        titleVi: 'Mạo từ xác định: der, die, das',
        objectives: {
            de: ['Drei Genera (maskulin, feminin, neutral)', 'Regeln zur Genuserkennung', 'Artikel korrekt verwenden'],
            en: ['Three genders (masculine, feminine, neuter)', 'Rules for gender recognition', 'Use articles correctly'],
            vi: ['Ba giống (nam, nữ, trung)', 'Quy tắc nhận biết giống', 'Sử dụng mạo từ đúng']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Die drei Genera', en: 'The Three Genders', vi: 'Ba giống' },
                    content: 'Every German noun has a grammatical gender. You MUST memorize the article with the noun!',
                    table: { headers: ['Gender', 'Article', 'Color', 'Examples'], rows: [
                        ['Maskulin', 'der', '🔵 Blue', 'der Mann, der Tisch, der Hund'],
                        ['Feminin', 'die', '🔴 Pink', 'die Frau, die Lampe, die Katze'],
                        ['Neutrum', 'das', '🟢 Green', 'das Kind, das Buch, das Haus']
                    ] }
                },
                {
                    title: { de: 'Tipps zur Erkennung', en: 'Gender Recognition Tips', vi: 'Mẹo nhận biết' },
                    content: 'Endings can help predict gender:',
                    table: { headers: ['Ending', 'Gender', 'Examples'], rows: [
                        ['-er, -ling, -ismus', 'der (maskulin)', 'der Computer, der Frühling'],
                        ['-e, -ung, -heit, -keit, -tion, -ie, -in', 'die (feminin)', 'die Lampe, die Zeitung, die Freiheit'],
                        ['-chen, -lein, -ment, -um', 'das (neutrum)', 'das Mädchen, das Dokument']
                    ] }
                }
            ]
        },
        estimatedMinutes: 25,
        prerequisiteIds: ['a1-l06-irregular-verbs'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '___ Mann ist groß.', questionVi: '___ Mann lớn.', answerData: { options: ['der', 'die', 'das', 'ein'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '___ Frau ist nett.', questionVi: '___ Frau tốt bụng.', answerData: { options: ['der', 'die', 'das', 'eine'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '___ Kind spielt.', questionVi: '___ Kind chơi.', answerData: { options: ['der', 'die', 'das', 'ein'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '___ Zeitung ist alt.', questionVi: 'Tờ báo cũ.', answerData: { options: ['der', 'die', 'das', 'den'], correctIndex: 1 }, explanation: { de: '-ung → immer feminin', en: '-ung → always feminine', vi: '-ung → luôn giống nữ' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '___ Mädchen ist klein.', questionVi: 'Cô gái nhỏ.', answerData: { options: ['der', 'die', 'das', 'den'], correctIndex: 2 }, explanation: { de: '-chen → immer Neutrum!', en: '-chen → always neuter!', vi: '-chen → luôn giống trung!' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Welches Genus hat "-ung"?', questionVi: '"-ung" thuộc giống nào?', answerData: { options: ['maskulin', 'feminin', 'neutrum', 'alle'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '___ Computer ist neu.', questionVi: 'Máy tính mới.', answerData: { options: ['der', 'die', 'das', 'den'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '___ Lampe ist alt.', questionVi: 'Cái đèn cũ.', answerData: { options: ['der', 'die', 'das', 'den'], correctIndex: 1 }, explanation: { de: '-e → oft feminin', en: '-e → often feminine', vi: '-e → thường giống nữ' }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 9, questionDe: '___ Hund ist braun. (dog)', questionVi: '___ Hund nâu.', answerData: { blanks: [{ answer: 'Der', alternatives: ['der'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ Katze schläft. (cat)', questionVi: '___ Katze ngủ.', answerData: { blanks: [{ answer: 'Die', alternatives: ['die'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '___ Buch ist interessant. (book)', questionVi: '___ Buch thú vị.', answerData: { blanks: [{ answer: 'Das', alternatives: ['das'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: '___ Wohnung ist groß. (apartment)', questionVi: '___ căn hộ lớn.', answerData: { blanks: [{ answer: 'Die', alternatives: ['die'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: '___ Auto ist schnell. (car)', questionVi: '___ ô tô nhanh.', answerData: { blanks: [{ answer: 'Das', alternatives: ['das'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: '___ Schule ist groß. (school)', questionVi: '___ trường học lớn.', answerData: { blanks: [{ answer: 'Die', alternatives: ['die'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: '___ Tisch ist rund. (table)', questionVi: '___ bàn tròn.', answerData: { blanks: [{ answer: 'Der', alternatives: ['der'] }] }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 16, questionDe: 'ist / der Mann / groß', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Der', 'Mann', 'ist', 'groß'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'schläft / die Katze', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Die', 'Katze', 'schläft'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'das Buch / liegt / auf dem Tisch', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Das', 'Buch', 'liegt', 'auf', 'dem', 'Tisch'] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 19, questionVi: '"Cái bàn tròn."', questionEn: '"The table is round."', answerData: { acceptedAnswers: ['Der Tisch ist rund', 'Der Tisch ist rund.'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Con mèo ngủ."', questionEn: '"The cat sleeps."', answerData: { acceptedAnswers: ['Die Katze schläft', 'Die Katze schläft.'] }, points: 1 },
            { exerciseType: 'translate', order: 21, questionVi: '"Cuốn sách hay."', questionEn: '"The book is interesting."', answerData: { acceptedAnswers: ['Das Buch ist interessant', 'Das Buch ist interessant.'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionVi: '"Căn hộ lớn."', questionEn: '"The apartment is big."', answerData: { acceptedAnswers: ['Die Wohnung ist groß', 'Die Wohnung ist groß.', 'Die Wohnung ist gross'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: '"Con chó nâu."', questionEn: '"The dog is brown."', answerData: { acceptedAnswers: ['Der Hund ist braun', 'Der Hund ist braun.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Das Mann ist groß.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Der Mann ist groß.' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Der Frau ist nett.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Frau ist nett.' }, points: 1 },
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Die Mädchen spielt.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Das Mädchen spielt.' }, explanation: { de: '-chen → Neutrum', en: '-chen → neuter', vi: '-chen → giống trung' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Der Zeitung ist alt.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Zeitung ist alt.' }, points: 1 },
            { exerciseType: 'error_correct', order: 28, questionDe: 'Korrigiere: Das Katze ist schwarz.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Katze ist schwarz.' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 8: UNBESTIMMTE ARTIKEL (EIN/EINE)
    // =================================================================
    {
        slug: 'a1-l08-indefinite-articles',
        level: 'A1',
        lessonNumber: 8,
        titleDe: 'Unbestimmte Artikel: ein, eine',
        titleEn: 'Indefinite Articles: ein, eine',
        titleVi: 'Mạo từ không xác định: ein, eine',
        objectives: {
            de: ['Unbestimmte Artikel kennen', 'Bestimmte vs unbestimmte Artikel unterscheiden'],
            en: ['Know indefinite articles', 'Distinguish definite vs indefinite articles'],
            vi: ['Biết mạo từ không xác định', 'Phân biệt mạo từ xác định và không xác định']
        },
        theoryContent: { sections: [
            { title: { de: 'Unbestimmte Artikel', en: 'Indefinite Articles', vi: 'Mạo từ không xác định' }, content: 'ein (masc/neut), eine (fem). No plural indefinite article!', table: { headers: ['Gender', 'Definite', 'Indefinite', 'Example'], rows: [
                ['Maskulin', 'der', 'ein', 'ein Mann'], ['Feminin', 'die', 'eine', 'eine Frau'],
                ['Neutrum', 'das', 'ein', 'ein Kind'], ['Plural', 'die', '—', 'Kinder (no article)']
            ] } },
            { title: { de: 'Wann verwenden?', en: 'When to use?', vi: 'Khi nào dùng?' }, content: 'Definite (der/die/das) = specific, known. Indefinite (ein/eine) = unspecific, first mention.', table: { headers: ['Situation', 'Article', 'Example'], rows: [
                ['First mention', 'ein/eine', 'Ich habe einen Hund.'], ['Known/specific', 'der/die/das', 'Der Hund ist braun.'],
                ['Unique item', 'der/die/das', 'Die Sonne scheint.'], ['Profession', 'none!', 'Ich bin Lehrer.']
            ] } }
        ] },
        estimatedMinutes: 25,
        prerequisiteIds: ['a1-l07-definite-articles'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Ich habe ___ Buch.', questionVi: 'Tôi có ___ sách.', answerData: { options: ['der', 'die', 'ein', 'eine'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Das ist ___ Frau.', questionVi: 'Đây là ___ người phụ nữ.', answerData: { options: ['ein', 'eine', 'der', 'das'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Ich bin ___ Student.', questionVi: 'Tôi là ___ sinh viên.', answerData: { options: ['ein', 'eine', 'der', 'kein Artikel'], correctIndex: 3 }, explanation: { de: 'Kein Artikel vor Berufen!', en: 'No article before professions!', vi: 'Không mạo từ trước nghề nghiệp!' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '___ Kinder spielen.', questionVi: 'Mấy đứa trẻ chơi.', answerData: { options: ['Ein', 'Eine', 'Die', '—(kein Artikel)'], correctIndex: 3 }, explanation: { de: 'Kein unbestimmter Artikel im Plural', en: 'No indefinite article in plural', vi: 'Không có mạo từ không xác định ở số nhiều' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Er kauft ___ Auto.', questionVi: 'Anh ấy mua ___ ô tô.', answerData: { options: ['ein', 'eine', 'der', 'die'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '___ Sonne scheint. (unique)', questionVi: '___ mặt trời chiếu sáng.', answerData: { options: ['Ein', 'Eine', 'Die', 'Das'], correctIndex: 2 }, explanation: { de: 'Einzigartige Dinge → bestimmter Artikel', en: 'Unique things → definite article', vi: 'Thứ duy nhất → mạo từ xác định' }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 7, questionDe: 'Ich habe ___ Katze. (cat, fem)', questionVi: 'Tôi có ___ con mèo.', answerData: { blanks: [{ answer: 'eine', alternatives: ['Eine'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Das ist ___ Hund. (dog, masc)', questionVi: 'Đây là ___ con chó.', answerData: { blanks: [{ answer: 'ein', alternatives: ['Ein'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich sehe ___ Kind. (child, neut)', questionVi: 'Tôi thấy ___ đứa trẻ.', answerData: { blanks: [{ answer: 'ein', alternatives: ['Ein'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ Buch liegt auf dem Tisch. (specific)', questionVi: '___ cuốn sách nằm trên bàn.', answerData: { blanks: [{ answer: 'Das', alternatives: ['das'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Sie ist ___ Lehrerin. (profession)', questionVi: 'Cô ấy là ___ giáo viên.', answerData: { blanks: [{ answer: '', alternatives: ['—'] }] }, explanation: { de: 'Kein Artikel vor Berufen', en: 'No article before professions', vi: 'Không mạo từ trước nghề nghiệp' }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Er hat ___ Schwester. (sister, fem)', questionVi: 'Anh ấy có ___ chị gái.', answerData: { blanks: [{ answer: 'eine', alternatives: ['Eine'] }] }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 13, questionDe: 'ein Buch / ich / habe', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'habe', 'ein', 'Buch'] }, points: 1 },
            { exerciseType: 'reorder', order: 14, questionDe: 'eine / Katze / ist / das', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Das', 'ist', 'eine', 'Katze'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'kauft / sie / ein Auto', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Sie', 'kauft', 'ein', 'Auto'] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 16, questionVi: '"Tôi có một cuốn sách."', questionEn: '"I have a book."', answerData: { acceptedAnswers: ['Ich habe ein Buch', 'Ich habe ein Buch.'] }, points: 1 },
            { exerciseType: 'translate', order: 17, questionVi: '"Đây là một con mèo."', questionEn: '"This is a cat."', answerData: { acceptedAnswers: ['Das ist eine Katze', 'Das ist eine Katze.'] }, points: 1 },
            { exerciseType: 'translate', order: 18, questionVi: '"Cô ấy mua một căn hộ."', questionEn: '"She buys an apartment."', answerData: { acceptedAnswers: ['Sie kauft eine Wohnung', 'Sie kauft eine Wohnung.'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Cuốn sách hay." (specific)', questionEn: '"The book is interesting."', answerData: { acceptedAnswers: ['Das Buch ist interessant', 'Das Buch ist interessant.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Ich bin ein Lehrer.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Ich bin Lehrer.' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich habe eine Buch.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Ich habe ein Buch.' }, explanation: { de: 'Buch = Neutrum → ein', en: 'Buch = neuter → ein', vi: 'Buch giống trung → ein' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Er hat ein Schwester.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Er hat eine Schwester.' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: Das ist ein Frau.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Das ist eine Frau.' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Ich sehe eine Kinder.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Ich sehe Kinder.' }, explanation: { de: 'Kein unbestimmter Artikel im Plural', en: 'No indefinite article in plural', vi: 'Không mạo từ không xác định ở số nhiều' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Das ist der Katze. (first mention)', questionVi: 'Sửa lỗi (lần đầu nhắc):', answerData: { correctedText: 'Das ist eine Katze.' }, points: 1 },
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Ich habe ein Hund. (Akkusativ)', questionVi: 'Sửa lỗi (Akkusativ):', answerData: { correctedText: 'Ich habe einen Hund.' }, explanation: { de: 'Akkusativ maskulin: ein → einen', en: 'Accusative masculine: ein → einen', vi: 'Cách Akkusativ giống nam: ein → einen' }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 9: PLURALBILDUNG
    // =================================================================
    {
        slug: 'a1-l09-noun-plurals',
        level: 'A1',
        lessonNumber: 9,
        titleDe: 'Pluralbildung der Nomen',
        titleEn: 'Noun Plurals',
        titleVi: 'Danh từ số nhiều',
        objectives: {
            de: ['5 Pluraltypen kennen', 'Häufige Pluralformen bilden', 'Artikel im Plural'],
            en: ['Know 5 plural types', 'Form common plural forms', 'Articles in plural'],
            vi: ['Biết 5 kiểu số nhiều', 'Tạo dạng số nhiều phổ biến', 'Mạo từ ở số nhiều']
        },
        theoryContent: { sections: [
            { title: { de: 'Pluraltypen', en: 'Plural Types', vi: '5 kiểu số nhiều' }, content: 'All nouns use "die" in plural. The noun ending changes in 5 ways:', table: { headers: ['Type', 'Rule', 'Singular → Plural'], rows: [
                ['-e', 'Add -e (often with Umlaut)', 'der Tisch → die Tische'],
                ['-n/-en', 'Add -n or -en', 'die Lampe → die Lampen'],
                ['-er', 'Add -er (often with Umlaut)', 'das Kind → die Kinder'],
                ['-s', 'Add -s (loanwords)', 'das Auto → die Autos'],
                ['—', 'No change (often with Umlaut)', 'der Lehrer → die Lehrer']
            ] } },
            { title: { de: 'Wichtig', en: 'Important', vi: 'Quan trọng' }, content: 'In plural, ALL nouns use "die" regardless of original gender. der Tisch → die Tische, das Kind → die Kinder.', table: { headers: ['Singular', 'Plural', 'Note'], rows: [
                ['der Mann', 'die Männer', '-er + Umlaut'], ['die Frau', 'die Frauen', '-en'],
                ['das Haus', 'die Häuser', '-er + Umlaut'], ['das Auto', 'die Autos', '-s'],
                ['der Apfel', 'die Äpfel', '— + Umlaut'], ['die Blume', 'die Blumen', '-n']
            ] } }
        ] },
        estimatedMinutes: 30,
        prerequisiteIds: ['a1-l08-indefinite-articles'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Plural von "das Kind"?', questionVi: 'Số nhiều của "das Kind"?', answerData: { options: ['die Kinds', 'die Kinder', 'die Kindern', 'die Kind'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Plural von "die Frau"?', questionVi: 'Số nhiều của "die Frau"?', answerData: { options: ['die Fraus', 'die Fraue', 'die Frauen', 'die Fräu'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Plural von "das Auto"?', questionVi: 'Số nhiều của "das Auto"?', answerData: { options: ['die Auten', 'die Autos', 'die Autoe', 'die Autor'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Plural von "der Mann"?', questionVi: 'Số nhiều của "der Mann"?', answerData: { options: ['die Manns', 'die Männe', 'die Männer', 'die Manner'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Welcher Artikel im Plural?', questionVi: 'Mạo từ nào ở số nhiều?', answerData: { options: ['der', 'die', 'das', 'den'], correctIndex: 1 }, explanation: { de: 'Im Plural immer "die"', en: 'Always "die" in plural', vi: 'Số nhiều luôn dùng "die"' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Plural von "der Tisch"?', questionVi: 'Số nhiều của "der Tisch"?', answerData: { options: ['die Tischs', 'die Tische', 'die Tischen', 'die Tischer'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Plural von "das Haus"?', questionVi: 'Số nhiều của "das Haus"?', answerData: { options: ['die Haus', 'die Hause', 'die Häuser', 'die Hauser'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Plural von "die Lampe"?', questionVi: 'Số nhiều của "die Lampe"?', answerData: { options: ['die Lampes', 'die Lampen', 'die Lampeen', 'die Lamper'], correctIndex: 1 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 9, questionDe: 'der Apfel → die ___ (apples)', questionVi: 'der Apfel → die ___', answerData: { blanks: [{ answer: 'Äpfel', alternatives: ['Aepfel'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'die Blume → die ___ (flowers)', questionVi: 'die Blume → die ___', answerData: { blanks: [{ answer: 'Blumen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'das Buch → die ___ (books)', questionVi: 'das Buch → die ___', answerData: { blanks: [{ answer: 'Bücher', alternatives: ['Buecher'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'der Stuhl → die ___ (chairs)', questionVi: 'der Stuhl → die ___', answerData: { blanks: [{ answer: 'Stühle', alternatives: ['Stuehle'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'das Foto → die ___ (photos)', questionVi: 'das Foto → die ___', answerData: { blanks: [{ answer: 'Fotos', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'der Lehrer → die ___ (teachers)', questionVi: 'der Lehrer → die ___', answerData: { blanks: [{ answer: 'Lehrer', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'die Wohnung → die ___ (apartments)', questionVi: 'die Wohnung → die ___', answerData: { blanks: [{ answer: 'Wohnungen', alternatives: [] }] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 16, questionVi: '"Những đứa trẻ chơi."', questionEn: '"The children play."', answerData: { acceptedAnswers: ['Die Kinder spielen', 'Die Kinder spielen.'] }, points: 1 },
            { exerciseType: 'translate', order: 17, questionVi: '"Những cuốn sách hay."', questionEn: '"The books are interesting."', answerData: { acceptedAnswers: ['Die Bücher sind interessant', 'Die Bücher sind interessant.', 'Die Buecher sind interessant'] }, points: 1 },
            { exerciseType: 'translate', order: 18, questionVi: '"Tôi có hai con mèo."', questionEn: '"I have two cats."', answerData: { acceptedAnswers: ['Ich habe zwei Katzen', 'Ich habe zwei Katzen.'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Những bông hoa đẹp."', questionEn: '"The flowers are beautiful."', answerData: { acceptedAnswers: ['Die Blumen sind schön', 'Die Blumen sind schön.', 'Die Blumen sind schoen'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Những ô tô nhanh."', questionEn: '"The cars are fast."', answerData: { acceptedAnswers: ['Die Autos sind schnell', 'Die Autos sind schnell.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Die Kinds spielen.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Kinder spielen.' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Der Bücher sind alt.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Bücher sind alt.' }, explanation: { de: 'Plural → immer "die"', en: 'Plural → always "die"', vi: 'Số nhiều → luôn "die"' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: Die Manner arbeiten.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Männer arbeiten.' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Die Hauser sind groß.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Die Häuser sind groß.' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Ich habe zwei Hund.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Ich habe zwei Hunde.' }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 26, questionDe: 'spielen / die Kinder / im Park', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Die', 'Kinder', 'spielen', 'im', 'Park'] }, points: 1 },
            { exerciseType: 'reorder', order: 27, questionDe: 'zwei / Katzen / ich / habe', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'habe', 'zwei', 'Katzen'] }, points: 1 },
            { exerciseType: 'reorder', order: 28, questionDe: 'die Blumen / schön / sind', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Die', 'Blumen', 'sind', 'schön'] }, points: 1 },
            { exerciseType: 'reorder', order: 29, questionDe: 'schnell / sind / die Autos', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Die', 'Autos', 'sind', 'schnell'] }, points: 1 },
            { exerciseType: 'reorder', order: 30, questionDe: 'die Häuser / groß / sind', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Die', 'Häuser', 'sind', 'groß'] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 10: ZAHLEN 1-100
    // =================================================================
    {
        slug: 'a1-l10-numbers',
        level: 'A1',
        lessonNumber: 10,
        titleDe: 'Zahlen 1-100',
        titleEn: 'Numbers 1-100',
        titleVi: 'Số đếm 1-100',
        objectives: {
            de: ['Zahlen 1-100 lesen und schreiben', 'Besonderheit: Einer VOR Zehner'],
            en: ['Read and write numbers 1-100', 'Special: ones BEFORE tens'],
            vi: ['Đọc và viết số 1-100', 'Đặc biệt: hàng đơn vị ĐỌC TRƯỚC hàng chục']
        },
        theoryContent: { sections: [
            { title: { de: 'Zahlen 1-20', en: 'Numbers 1-20', vi: 'Số 1-20' }, content: 'Numbers 1-12 are unique. 13-19 follow pattern: [unit]zehn.', table: { headers: ['Number', 'German', 'Note'], rows: [
                ['1', 'eins', ''], ['2', 'zwei', ''], ['3', 'drei', ''], ['4', 'vier', ''],
                ['5', 'fünf', ''], ['6', 'sechs', ''], ['7', 'sieben', ''], ['8', 'acht', ''],
                ['9', 'neun', ''], ['10', 'zehn', ''], ['11', 'elf', 'unique'], ['12', 'zwölf', 'unique'],
                ['13', 'dreizehn', '3+zehn'], ['16', 'sechzehn', 'sechs→sech!'], ['17', 'siebzehn', 'sieben→sieb!'], ['20', 'zwanzig', '']
            ] } },
            { title: { de: '21-100', en: '21-100', vi: '21-100' }, content: '⚠️ German reads ones BEFORE tens: 25 = fünf-und-zwanzig (five-and-twenty).', table: { headers: ['Number', 'German', 'Pattern'], rows: [
                ['21', 'einundzwanzig', '1 + und + 20'], ['35', 'fünfunddreißig', '5 + und + 30'],
                ['42', 'zweiundvierzig', '2 + und + 40'], ['67', 'siebenundsechzig', '7 + und + 60'],
                ['30', 'dreißig', 'ß (not z!)'], ['100', 'hundert', '']
            ] } }
        ] },
        estimatedMinutes: 25,
        prerequisiteIds: ['a1-l09-noun-plurals'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '25 auf Deutsch?', questionVi: '25 tiếng Đức?', answerData: { options: ['zwanzigfünf', 'fünfundzwanzig', 'zweiundvünfzig', 'fünfzwanzig'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"siebenunddreißig" = ?', questionVi: '"siebenunddreißig" = ?', answerData: { options: ['73', '37', '47', '27'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '30 auf Deutsch?', questionVi: '30 tiếng Đức?', answerData: { options: ['dreizig', 'dreißig', 'dreisig', 'dreiβig'], correctIndex: 1 }, explanation: { de: '30 = dreißig (mit ß)', en: '30 = dreißig (with ß)', vi: '30 = dreißig (có ß)' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '16 auf Deutsch?', questionVi: '16 tiếng Đức?', answerData: { options: ['sechszehn', 'sechzehn', 'sechzehn', 'siebzehn'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Was ist besonders an deutschen Zahlen?', questionVi: 'Điều gì đặc biệt ở số tiếng Đức?', answerData: { options: ['Zehner zuerst', 'Einer zuerst', 'Gleich wie Englisch', 'Rückwärts'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"zweiundvierzig" = ?', questionVi: '"zweiundvierzig" = ?', answerData: { options: ['24', '42', '44', '22'], correctIndex: 1 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 7, questionDe: '12 = ___', questionVi: '12 = ___', answerData: { blanks: [{ answer: 'zwölf', alternatives: ['zwoelf', 'Zwölf'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: '15 = ___', questionVi: '15 = ___', answerData: { blanks: [{ answer: 'fünfzehn', alternatives: ['Fünfzehn', 'fuenfzehn'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: '48 = ___', questionVi: '48 = ___', answerData: { blanks: [{ answer: 'achtundvierzig', alternatives: ['Achtundvierzig'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '63 = ___', questionVi: '63 = ___', answerData: { blanks: [{ answer: 'dreiundsechzig', alternatives: ['Dreiundsechzig'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '100 = ___', questionVi: '100 = ___', answerData: { blanks: [{ answer: 'hundert', alternatives: ['Hundert', 'einhundert'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: '71 = ___', questionVi: '71 = ___', answerData: { blanks: [{ answer: 'einundsiebzig', alternatives: ['Einundsiebzig'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: '99 = ___', questionVi: '99 = ___', answerData: { blanks: [{ answer: 'neunundneunzig', alternatives: ['Neunundneunzig'] }] }, points: 1 },
            // Translate (number to word and vice versa)
            { exerciseType: 'translate', order: 14, questionDe: 'Schreibe als Zahl: "sechsundfünfzig"', questionEn: 'Write as number:', questionVi: 'Viết thành số:', answerData: { acceptedAnswers: ['56'] }, points: 1 },
            { exerciseType: 'translate', order: 15, questionDe: 'Schreibe als Zahl: "vierundachtzig"', questionEn: 'Write as number:', questionVi: 'Viết thành số:', answerData: { acceptedAnswers: ['84'] }, points: 1 },
            { exerciseType: 'translate', order: 16, questionDe: 'Schreibe als Zahl: "dreiunddreißig"', questionEn: 'Write as number:', questionVi: 'Viết thành số:', answerData: { acceptedAnswers: ['33'] }, points: 1 },
            { exerciseType: 'translate', order: 17, questionVi: '"Tôi 25 tuổi."', questionEn: '"I am 25 years old."', answerData: { acceptedAnswers: ['Ich bin fünfundzwanzig Jahre alt', 'Ich bin 25 Jahre alt', 'Ich bin fünfundzwanzig Jahre alt.'] }, points: 1 },
            { exerciseType: 'translate', order: 18, questionVi: '"Cô ấy có 3 con mèo."', questionEn: '"She has 3 cats."', answerData: { acceptedAnswers: ['Sie hat drei Katzen', 'Sie hat drei Katzen.', 'Sie hat 3 Katzen'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 19, questionDe: 'Korrigiere: fünfzwanzig (25)', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'fünfundzwanzig' }, explanation: { de: 'Einer + UND + Zehner', en: 'Ones + UND + tens', vi: 'Hàng đơn vị + UND + hàng chục' }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: dreizig (30)', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'dreißig' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: sechszehn (16)', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'sechzehn' }, explanation: { de: 'sechs → sech- (vor -zehn)', en: 'sechs → sech- (before -zehn)', vi: 'sechs → sech- (trước -zehn)' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: zwanzigfünf (25)', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'fünfundzwanzig' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: siebenzehn (17) - richtig oder falsch?', questionVi: 'Đúng hay sai?', answerData: { correctedText: 'siebzehn' }, explanation: { de: 'sieben → sieb- (vor -zehn)', en: 'sieben → sieb- (before -zehn)', vi: 'sieben → sieb- (trước -zehn)' }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 24, questionDe: 'Jahre / bin / alt / ich / zwanzig', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'bin', 'zwanzig', 'Jahre', 'alt'] }, points: 1 },
            { exerciseType: 'reorder', order: 25, questionDe: 'Kinder / drei / hat / sie', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Sie', 'hat', 'drei', 'Kinder'] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 11: ZEIT & DATUM
    // =================================================================
    {
        slug: 'a1-l11-time-dates',
        level: 'A1', lessonNumber: 11,
        titleDe: 'Uhrzeiten und Datum', titleEn: 'Time & Dates', titleVi: 'Thời gian & Ngày tháng',
        objectives: { de: ['Uhrzeiten lesen', 'Wochentage und Monate kennen'], en: ['Tell time', 'Know weekdays and months'], vi: ['Đọc giờ', 'Biết thứ và tháng'] },
        theoryContent: { sections: [
            { title: { de: 'Uhrzeiten', en: 'Time', vi: 'Giờ' }, content: 'Formal: 14:30 = vierzehn Uhr dreißig. Informal: halb drei (half past two).', table: { headers: ['Time', 'Formal', 'Informal'], rows: [
                ['8:00', 'acht Uhr', 'acht Uhr'], ['8:15', 'acht Uhr fünfzehn', 'Viertel nach acht'],
                ['8:30', 'acht Uhr dreißig', 'halb neun'], ['8:45', 'acht Uhr fünfundvierzig', 'Viertel vor neun']
            ] } },
            { title: { de: 'Wochentage', en: 'Weekdays', vi: 'Thứ' }, content: 'All weekdays are masculine (der).', table: { headers: ['German', 'English', 'Vietnamese'], rows: [
                ['Montag', 'Monday', 'Thứ Hai'], ['Dienstag', 'Tuesday', 'Thứ Ba'], ['Mittwoch', 'Wednesday', 'Thứ Tư'],
                ['Donnerstag', 'Thursday', 'Thứ Năm'], ['Freitag', 'Friday', 'Thứ Sáu'], ['Samstag', 'Saturday', 'Thứ Bảy'], ['Sonntag', 'Sunday', 'Chủ Nhật']
            ] } },
            { title: { de: 'Monate', en: 'Months', vi: 'Tháng' }, content: 'All months are masculine (der).', table: { headers: ['German', 'English'], rows: [
                ['Januar', 'January'], ['Februar', 'February'], ['März', 'March'], ['April', 'April'],
                ['Mai', 'May'], ['Juni', 'June'], ['Juli', 'July'], ['August', 'August'],
                ['September', 'September'], ['Oktober', 'October'], ['November', 'November'], ['Dezember', 'December']
            ] } }
        ] },
        estimatedMinutes: 30, prerequisiteIds: ['a1-l10-numbers'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '8:30 informell?', questionVi: '8:30 dạng thân mật?', answerData: { options: ['halb acht', 'halb neun', 'acht und halb', 'dreißig nach acht'], correctIndex: 1 }, explanation: { de: 'halb neun = 30 min VOR 9 = 8:30', en: 'halb neun = 30 min BEFORE 9 = 8:30', vi: 'halb neun = 30 phút TRƯỚC 9 = 8:30' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Viertel nach drei" = ?', questionVi: '"Viertel nach drei" = ?', answerData: { options: ['2:45', '3:15', '3:45', '4:15'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Viertel vor acht" = ?', questionVi: '"Viertel vor acht" = ?', answerData: { options: ['7:15', '7:45', '8:15', '8:45'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Welcher Tag kommt nach Mittwoch?', questionVi: 'Ngày nào sau Thứ Tư?', answerData: { options: ['Dienstag', 'Donnerstag', 'Freitag', 'Montag'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Welcher Monat kommt nach März?', questionVi: 'Tháng nào sau März?', answerData: { options: ['Februar', 'April', 'Mai', 'Juni'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Am Montag" bedeutet:', questionVi: '"Am Montag" nghĩa là:', answerData: { options: ['On Monday', 'In Monday', 'At Monday', 'From Monday'], correctIndex: 0 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 7, questionDe: '9:15 informell = Viertel ___ neun', questionVi: '9:15 = Viertel ___ neun', answerData: { blanks: [{ answer: 'nach', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: '10:45 informell = Viertel ___ elf', questionVi: '10:45 = Viertel ___ elf', answerData: { blanks: [{ answer: 'vor', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: '6:30 informell = ___ sieben', questionVi: '6:30 = ___ sieben', answerData: { blanks: [{ answer: 'halb', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Der Tag nach Freitag ist ___.', questionVi: 'Ngày sau thứ Sáu là ___.', answerData: { blanks: [{ answer: 'Samstag', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Der Monat nach Juni ist ___.', questionVi: 'Tháng sau Juni là ___.', answerData: { blanks: [{ answer: 'Juli', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Weihnachten ist im ___.', questionVi: 'Giáng sinh vào tháng ___.', answerData: { blanks: [{ answer: 'Dezember', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: '14:00 formell = ___ Uhr', questionVi: '14:00 = ___ Uhr', answerData: { blanks: [{ answer: 'vierzehn', alternatives: [] }] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 14, questionVi: '"Bây giờ là 3 giờ."', questionEn: '"It is 3 o\'clock."', answerData: { acceptedAnswers: ['Es ist drei Uhr', 'Es ist drei Uhr.', 'Es ist 3 Uhr'] }, points: 1 },
            { exerciseType: 'translate', order: 15, questionVi: '"Hôm nay là thứ Hai."', questionEn: '"Today is Monday."', answerData: { acceptedAnswers: ['Heute ist Montag', 'Heute ist Montag.'] }, points: 1 },
            { exerciseType: 'translate', order: 16, questionVi: '"Tôi đến vào thứ Ba."', questionEn: '"I come on Tuesday."', answerData: { acceptedAnswers: ['Ich komme am Dienstag', 'Ich komme am Dienstag.'] }, points: 1 },
            { exerciseType: 'translate', order: 17, questionVi: '"Sinh nhật tôi vào tháng Năm."', questionEn: '"My birthday is in May."', answerData: { acceptedAnswers: ['Mein Geburtstag ist im Mai', 'Mein Geburtstag ist im Mai.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 18, questionDe: 'Korrigiere: Es ist halb acht. (meaning 7:30)', questionVi: 'Đúng hay sai? (nghĩa 7:30)', answerData: { correctedText: 'Es ist halb acht.' }, explanation: { de: 'Richtig! halb acht = 7:30', en: 'Correct! halb acht = 7:30', vi: 'Đúng rồi! halb acht = 7:30' }, points: 1 },
            { exerciseType: 'error_correct', order: 19, questionDe: 'Korrigiere: Ich komme in Montag.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Ich komme am Montag.' }, explanation: { de: 'Am + Wochentag', en: 'Am + weekday', vi: 'Am + thứ' }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Mein Geburtstag ist in Mai.', questionVi: 'Sửa lỗi:', answerData: { correctedText: 'Mein Geburtstag ist im Mai.' }, explanation: { de: 'Im + Monat', en: 'Im + month', vi: 'Im + tháng' }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 21, questionDe: 'drei / es / ist / Uhr', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Es', 'ist', 'drei', 'Uhr'] }, points: 1 },
            { exerciseType: 'reorder', order: 22, questionDe: 'Montag / heute / ist', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Heute', 'ist', 'Montag'] }, points: 1 },
            { exerciseType: 'reorder', order: 23, questionDe: 'um / Uhr / ich / acht / komme', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Ich', 'komme', 'um', 'acht', 'Uhr'] }, points: 1 },
            { exerciseType: 'reorder', order: 24, questionDe: 'am / gehe / Freitag / ich / ins Kino', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Am', 'Freitag', 'gehe', 'ich', 'ins', 'Kino'] }, points: 1 },
            { exerciseType: 'reorder', order: 25, questionDe: 'der Kurs / um / beginnt / neun Uhr', questionVi: 'Xếp câu:', answerData: { correctOrder: ['Der', 'Kurs', 'beginnt', 'um', 'neun', 'Uhr'] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 12: NOMINATIV
    // =================================================================
    {
        slug: 'a1-l12-nominative',
        level: 'A1', lessonNumber: 12,
        titleDe: 'Der Nominativ', titleEn: 'Nominative Case', titleVi: 'Cách Nominativ',
        objectives: { de: ['Nominativ als Subjektfall', 'Artikel im Nominativ'], en: ['Nominative as subject case', 'Articles in nominative'], vi: ['Nominativ là cách chủ ngữ', 'Mạo từ ở Nominativ'] },
        theoryContent: { sections: [
            { title: { de: 'Was ist Nominativ?', en: 'What is Nominative?', vi: 'Nominativ là gì?' }, content: 'Nominative = the SUBJECT of the sentence. Ask "Wer/Was?" (Who/What?) to find it.', table: { headers: ['Gender', 'Definite', 'Indefinite', 'Negative'], rows: [
                ['Maskulin', 'der', 'ein', 'kein'], ['Feminin', 'die', 'eine', 'keine'],
                ['Neutrum', 'das', 'ein', 'kein'], ['Plural', 'die', '—', 'keine']
            ] } },
            { title: { de: 'Beispiele', en: 'Examples', vi: 'Ví dụ' }, content: 'The subject performs the action.', table: { headers: ['Sentence', 'Subject (Nominativ)', 'Question'], rows: [
                ['Der Mann liest.', 'der Mann', 'WER liest? → der Mann'],
                ['Das Buch ist gut.', 'das Buch', 'WAS ist gut? → das Buch'],
                ['Eine Frau singt.', 'eine Frau', 'WER singt? → eine Frau']
            ] } }
        ] },
        estimatedMinutes: 25, prerequisiteIds: ['a1-l11-time-dates'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"___ Hund bellt." (Nominativ)', questionVi: '"___ Hund sủa."', answerData: { options: ['Den', 'Der', 'Dem', 'Des'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Was ist das Subjekt? "Die Kinder spielen im Park."', questionVi: 'Chủ ngữ là gì?', answerData: { options: ['im Park', 'spielen', 'Die Kinder', 'Park'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"___ Buch ist interessant."', answerData: { options: ['Der', 'Die', 'Das', 'Den'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"___ Katze schläft."', answerData: { options: ['Der', 'Die', 'Das', 'Ein'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Nominativ fragt man mit:', questionVi: 'Nominativ hỏi bằng:', answerData: { options: ['Wen/Was?', 'Wer/Was?', 'Wem?', 'Wessen?'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"___ Mann ist nett." (indef.)', answerData: { options: ['Einen', 'Ein', 'Einem', 'Eines'], correctIndex: 1 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 7, questionDe: '___ Lehrer erklärt. (der)', questionVi: '___ giáo viên giải thích.', answerData: { blanks: [{ answer: 'Der', alternatives: ['der'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: '___ Kind lacht. (das)', questionVi: '___ đứa trẻ cười.', answerData: { blanks: [{ answer: 'Das', alternatives: ['das'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: '___ Frau singt. (die)', questionVi: '___ người phụ nữ hát.', answerData: { blanks: [{ answer: 'Die', alternatives: ['die'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ Hund ist groß. (ein)', questionVi: '___ con chó lớn.', answerData: { blanks: [{ answer: 'Ein', alternatives: ['ein'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '___ Studentin lernt. (eine)', questionVi: '___ sinh viên nữ học.', answerData: { blanks: [{ answer: 'Eine', alternatives: ['eine'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: '___ Autos sind schnell. (die, plural)', questionVi: '___ ô tô nhanh.', answerData: { blanks: [{ answer: 'Die', alternatives: ['die'] }] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 13, questionVi: '"Người đàn ông đọc sách."', questionEn: '"The man reads."', answerData: { acceptedAnswers: ['Der Mann liest', 'Der Mann liest.'] }, points: 1 },
            { exerciseType: 'translate', order: 14, questionVi: '"Một người phụ nữ hát."', questionEn: '"A woman sings."', answerData: { acceptedAnswers: ['Eine Frau singt', 'Eine Frau singt.'] }, points: 1 },
            { exerciseType: 'translate', order: 15, questionVi: '"Cuốn sách hay."', questionEn: '"The book is interesting."', answerData: { acceptedAnswers: ['Das Buch ist interessant', 'Das Buch ist interessant.'] }, points: 1 },
            { exerciseType: 'translate', order: 16, questionVi: '"Những đứa trẻ chơi."', questionEn: '"The children play."', answerData: { acceptedAnswers: ['Die Kinder spielen', 'Die Kinder spielen.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 17, questionDe: 'Korrigiere: Den Mann ist groß.', answerData: { correctedText: 'Der Mann ist groß.' }, explanation: { de: 'Subjekt = Nominativ → der', en: 'Subject = Nominative → der', vi: 'Chủ ngữ = Nominativ → der' }, points: 1 },
            { exerciseType: 'error_correct', order: 18, questionDe: 'Korrigiere: Einen Hund bellt.', answerData: { correctedText: 'Ein Hund bellt.' }, points: 1 },
            { exerciseType: 'error_correct', order: 19, questionDe: 'Korrigiere: Dem Kind spielt.', answerData: { correctedText: 'Das Kind spielt.' }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 20, questionDe: 'der Mann / liest / ein Buch', answerData: { correctOrder: ['Der', 'Mann', 'liest', 'ein', 'Buch'] }, points: 1 },
            { exerciseType: 'reorder', order: 21, questionDe: 'singt / eine Frau / im Park', answerData: { correctOrder: ['Eine', 'Frau', 'singt', 'im', 'Park'] }, points: 1 },
            { exerciseType: 'reorder', order: 22, questionDe: 'spielen / die Kinder / draußen', answerData: { correctOrder: ['Die', 'Kinder', 'spielen', 'draußen'] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 13: AKKUSATIV
    // =================================================================
    {
        slug: 'a1-l13-accusative',
        level: 'A1', lessonNumber: 13,
        titleDe: 'Der Akkusativ', titleEn: 'Accusative Case - Introduction', titleVi: 'Cách Akkusativ - Giới thiệu',
        objectives: { de: ['Akkusativ als Objektfall', 'Nur maskulin ändert sich: der→den, ein→einen'], en: ['Accusative as object case', 'Only masculine changes: der→den, ein→einen'], vi: ['Akkusativ là cách tân ngữ', 'Chỉ giống nam thay đổi: der→den, ein→einen'] },
        theoryContent: { sections: [
            { title: { de: 'Akkusativ-Artikel', en: 'Accusative Articles', vi: 'Mạo từ Akkusativ' }, content: '⚠️ Only MASCULINE changes! Feminine, neuter and plural stay the same.', table: { headers: ['Gender', 'Nominativ', 'Akkusativ', 'Change?'], rows: [
                ['Maskulin', 'der / ein / kein', 'den / einen / keinen', '✅ YES!'],
                ['Feminin', 'die / eine / keine', 'die / eine / keine', '❌ No change'],
                ['Neutrum', 'das / ein / kein', 'das / ein / kein', '❌ No change'],
                ['Plural', 'die / — / keine', 'die / — / keine', '❌ No change']
            ] } },
            { title: { de: 'Wann Akkusativ?', en: 'When Accusative?', vi: 'Khi nào dùng Akkusativ?' }, content: 'Use accusative for the DIRECT OBJECT. Ask "Wen/Was?" (Whom/What?).', table: { headers: ['Sentence', 'Subject (Nom)', 'Object (Akk)'], rows: [
                ['Ich sehe den Mann.', 'Ich', 'den Mann'],
                ['Er kauft einen Apfel.', 'Er', 'einen Apfel'],
                ['Sie liest das Buch.', 'Sie', 'das Buch (no change!)']
            ] } }
        ] },
        estimatedMinutes: 30, prerequisiteIds: ['a1-l12-nominative'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Ich sehe ___ Mann.', answerData: { options: ['der', 'den', 'dem', 'des'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Er kauft ___ Buch.', answerData: { options: ['der', 'den', 'das', 'dem'], correctIndex: 2 }, explanation: { de: 'Neutrum → kein Wechsel', en: 'Neuter → no change', vi: 'Giống trung → không đổi' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Ich habe ___ Hund.', answerData: { options: ['ein', 'einen', 'einer', 'einem'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Sie trinkt ___ Kaffee. (masc)', answerData: { options: ['ein', 'einen', 'eine', 'einem'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Wir kaufen ___ Lampe. (fem)', answerData: { options: ['der', 'den', 'die', 'dem'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Welches Genus ändert sich im Akkusativ?', questionVi: 'Giống nào thay đổi ở Akkusativ?', answerData: { options: ['Alle', 'Nur Maskulin', 'Nur Feminin', 'Nur Neutrum'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Er hat ___ Schwester. (keine)', answerData: { options: ['kein', 'keine', 'keinen', 'keiner'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Ich sehe ___ Kinder. (plural)', answerData: { options: ['der', 'den', 'die', 'das'], correctIndex: 2 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich kaufe ___ Apfel. (einen)', answerData: { blanks: [{ answer: 'einen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Sie liest ___ Buch. (das)', answerData: { blanks: [{ answer: 'das', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Wir trinken ___ Kaffee. (den)', answerData: { blanks: [{ answer: 'den', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Er hat ___ Auto. (kein)', answerData: { blanks: [{ answer: 'kein', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich sehe ___ Frau. (die)', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Er hat ___ Bruder. (keinen)', answerData: { blanks: [{ answer: 'keinen', alternatives: [] }] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 15, questionVi: '"Tôi thấy người đàn ông."', questionEn: '"I see the man."', answerData: { acceptedAnswers: ['Ich sehe den Mann', 'Ich sehe den Mann.'] }, points: 1 },
            { exerciseType: 'translate', order: 16, questionVi: '"Anh ấy mua một quả táo."', questionEn: '"He buys an apple."', answerData: { acceptedAnswers: ['Er kauft einen Apfel', 'Er kauft einen Apfel.'] }, points: 1 },
            { exerciseType: 'translate', order: 17, questionVi: '"Cô ấy đọc cuốn sách."', questionEn: '"She reads the book."', answerData: { acceptedAnswers: ['Sie liest das Buch', 'Sie liest das Buch.'] }, points: 1 },
            { exerciseType: 'translate', order: 18, questionVi: '"Tôi không có xe hơi."', questionEn: '"I have no car."', answerData: { acceptedAnswers: ['Ich habe kein Auto', 'Ich habe kein Auto.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 19, questionDe: 'Korrigiere: Ich sehe der Mann.', answerData: { correctedText: 'Ich sehe den Mann.' }, explanation: { de: 'Akkusativ maskulin: der → den', en: 'Accusative masculine: der → den', vi: 'Akkusativ giống nam: der → den' }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Er kauft ein Hund.', answerData: { correctedText: 'Er kauft einen Hund.' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich trinke den Milch.', answerData: { correctedText: 'Ich trinke die Milch.' }, explanation: { de: 'Milch = feminin → die (kein Wechsel)', en: 'Milch = feminine → die (no change)', vi: 'Milch = giống nữ → die (không đổi)' }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 22, questionDe: 'den Mann / ich / sehe', answerData: { correctOrder: ['Ich', 'sehe', 'den', 'Mann'] }, points: 1 },
            { exerciseType: 'reorder', order: 23, questionDe: 'einen Apfel / er / kauft', answerData: { correctOrder: ['Er', 'kauft', 'einen', 'Apfel'] }, points: 1 },
            { exerciseType: 'reorder', order: 24, questionDe: 'das Buch / sie / liest', answerData: { correctOrder: ['Sie', 'liest', 'das', 'Buch'] }, points: 1 },
            { exerciseType: 'reorder', order: 25, questionDe: 'die Kinder / wir / sehen', answerData: { correctOrder: ['Wir', 'sehen', 'die', 'Kinder'] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 14: AKKUSATIV-PRÄPOSITIONEN
    // =================================================================
    {
        slug: 'a1-l14-accusative-prepositions',
        level: 'A1', lessonNumber: 14,
        titleDe: 'Präpositionen mit Akkusativ', titleEn: 'Accusative Prepositions', titleVi: 'Giới từ với Akkusativ',
        objectives: { de: ['5 Akkusativ-Präpositionen lernen: für, durch, gegen, ohne, um'], en: ['Learn 5 accusative prepositions'], vi: ['Học 5 giới từ đi với Akkusativ'] },
        theoryContent: { sections: [
            { title: { de: 'Die Präpositionen', en: 'The Prepositions', vi: 'Các giới từ' }, content: 'These prepositions ALWAYS require Accusative. Mnemonic: DOGFU (durch, ohne, gegen, für, um).', table: { headers: ['Preposition', 'Meaning', 'Example'], rows: [
                ['für', 'for/cho', 'Das ist für den Mann.'],
                ['durch', 'through/qua', 'Wir gehen durch den Park.'],
                ['gegen', 'against/chống', 'Er ist gegen den Plan.'],
                ['ohne', 'without/không có', 'Ich gehe ohne einen Regenschirm.'],
                ['um', 'around/quanh', 'Wir laufen um den See.']
            ] } }
        ] },
        estimatedMinutes: 25, prerequisiteIds: ['a1-l13-accusative'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Das Geschenk ist für ___ Vater.', answerData: { options: ['der', 'den', 'dem', 'des'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Wir gehen durch ___ Park.', answerData: { options: ['der', 'den', 'dem', 'des'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Ich gehe ohne ___ Freund.', answerData: { options: ['mein', 'meinen', 'meinem', 'meiner'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Er läuft um ___ See.', answerData: { options: ['der', 'den', 'dem', 'des'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Das ist für ___ Kinder. (plural)', answerData: { options: ['der', 'den', 'die', 'dem'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Welche Präposition passt? "Das Buch ist ___ dich."', answerData: { options: ['durch', 'gegen', 'für', 'um'], correctIndex: 2 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 7, questionDe: 'Das ist für ___ Mutter. (die)', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Wir fahren durch ___ Stadt. (die)', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Er ist gegen ___ Idee. (die)', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Ich gehe ___ Regenschirm. (without)', answerData: { blanks: [{ answer: 'ohne', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Das Geschenk ist ___ meinen Bruder. (for)', answerData: { blanks: [{ answer: 'für', alternatives: [] }] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 12, questionVi: '"Quà cho bố."', questionEn: '"The gift is for dad."', answerData: { acceptedAnswers: ['Das Geschenk ist für den Vater', 'Das Geschenk ist für den Vater.'] }, points: 1 },
            { exerciseType: 'translate', order: 13, questionVi: '"Tôi đi không mang ô."', questionEn: '"I go without an umbrella."', answerData: { acceptedAnswers: ['Ich gehe ohne Regenschirm', 'Ich gehe ohne einen Regenschirm'] }, points: 1 },
            { exerciseType: 'translate', order: 14, questionVi: '"Chúng tôi đi qua công viên."', questionEn: '"We walk through the park."', answerData: { acceptedAnswers: ['Wir gehen durch den Park', 'Wir gehen durch den Park.'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 15, questionDe: 'Korrigiere: Das ist für der Mann.', answerData: { correctedText: 'Das ist für den Mann.' }, points: 1 },
            { exerciseType: 'error_correct', order: 16, questionDe: 'Korrigiere: Wir gehen durch der Park.', answerData: { correctedText: 'Wir gehen durch den Park.' }, points: 1 },
            { exerciseType: 'error_correct', order: 17, questionDe: 'Korrigiere: Er läuft um der See.', answerData: { correctedText: 'Er läuft um den See.' }, points: 1 },
            // Reorder
            { exerciseType: 'reorder', order: 18, questionDe: 'für / das Geschenk / den Vater / ist', answerData: { correctOrder: ['Das', 'Geschenk', 'ist', 'für', 'den', 'Vater'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'durch / wir / den Park / gehen', answerData: { correctOrder: ['Wir', 'gehen', 'durch', 'den', 'Park'] }, points: 1 },
            { exerciseType: 'reorder', order: 20, questionDe: 'ohne / ich / gehe / Regenschirm', answerData: { correctOrder: ['Ich', 'gehe', 'ohne', 'Regenschirm'] }, points: 1 },
        ]
    },
    // =================================================================
    // LEKTION 15: MODALVERBEN (1)
    // =================================================================
    {
        slug: 'a1-l15-modal-verbs-1',
        level: 'A1', lessonNumber: 15,
        titleDe: 'Modalverben (1): können, möchten, wollen', titleEn: 'Modal Verbs (1)', titleVi: 'Động từ khuyết thiếu (1): können, möchten, wollen',
        objectives: { de: ['Können, möchten, wollen konjugieren', 'Satzklammer verstehen'], en: ['Conjugate können, möchten, wollen', 'Understand sentence bracket'], vi: ['Chia können, möchten, wollen', 'Hiểu khung câu'] },
        theoryContent: { sections: [
            { title: { de: 'Konjugation', en: 'Conjugation', vi: 'Bảng chia' }, content: 'Modal verbs are irregular. The main verb goes to the END in infinitive form!', table: { headers: ['Pronoun', 'können (can)', 'möchten (would like)', 'wollen (want)'], rows: [
                ['ich', 'kann', 'möchte', 'will'], ['du', 'kannst', 'möchtest', 'willst'],
                ['er/sie/es', 'kann', 'möchte', 'will'], ['wir', 'können', 'möchten', 'wollen'],
                ['ihr', 'könnt', 'möchtet', 'wollt'], ['sie/Sie', 'können', 'möchten', 'wollen']
            ] } },
            { title: { de: 'Satzklammer', en: 'Sentence Bracket', vi: 'Khung câu' }, content: 'Modal verb = position 2. Main verb = END (infinitive).', table: { headers: ['Structure', 'Example'], rows: [
                ['S + Modal + ... + Infinitiv', 'Ich kann gut Deutsch sprechen.'],
                ['', 'Er möchte ein Buch kaufen.'],
                ['', 'Wir wollen nach Berlin fahren.']
            ] } }
        ] },
        estimatedMinutes: 30, prerequisiteIds: ['a1-l14-accusative-prepositions'],
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Ich ___ Deutsch sprechen.', answerData: { options: ['können', 'kann', 'kannst', 'könnt'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Er ___ ein Buch kaufen.', answerData: { options: ['möchte', 'möchten', 'möchtest', 'möchtet'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Wir ___ nach Berlin fahren.', answerData: { options: ['will', 'willst', 'wollen', 'wollt'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Wo steht das Hauptverb bei Modalverben?', questionVi: 'Động từ chính ở đâu?', answerData: { options: ['Position 1', 'Position 2', 'Mitte', 'Ende (Infinitiv)'], correctIndex: 3 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Du ___ gut schwimmen.', answerData: { options: ['kann', 'kannst', 'können', 'könnt'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Ihr ___ Pizza essen.', answerData: { options: ['wollt', 'wollen', 'will', 'willst'], correctIndex: 0 }, points: 1 },
            // Fill blank
            { exerciseType: 'fill_blank', order: 7, questionDe: 'Ich ___ Kaffee trinken. (möchten)', answerData: { blanks: [{ answer: 'möchte', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Er ___ gut schwimmen. (können)', answerData: { blanks: [{ answer: 'kann', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Wir ___ ein Auto kaufen. (wollen)', answerData: { blanks: [{ answer: 'wollen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Du ___ gut kochen. (können)', answerData: { blanks: [{ answer: 'kannst', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Sie (she) ___ nach Hause gehen. (möchten)', answerData: { blanks: [{ answer: 'möchte', alternatives: [] }] }, points: 1 },
            // Reorder (important for Satzklammer)
            { exerciseType: 'reorder', order: 12, questionDe: 'sprechen / ich / Deutsch / kann', answerData: { correctOrder: ['Ich', 'kann', 'Deutsch', 'sprechen'] }, points: 1 },
            { exerciseType: 'reorder', order: 13, questionDe: 'kaufen / möchte / ein Buch / er', answerData: { correctOrder: ['Er', 'möchte', 'ein', 'Buch', 'kaufen'] }, points: 1 },
            { exerciseType: 'reorder', order: 14, questionDe: 'fahren / wir / nach Berlin / wollen', answerData: { correctOrder: ['Wir', 'wollen', 'nach', 'Berlin', 'fahren'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'schwimmen / kannst / du / gut / ?', answerData: { correctOrder: ['Kannst', 'du', 'gut', 'schwimmen?'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'essen / ihr / Pizza / wollt', answerData: { correctOrder: ['Ihr', 'wollt', 'Pizza', 'essen'] }, points: 1 },
            // Translate
            { exerciseType: 'translate', order: 17, questionVi: '"Tôi có thể nói tiếng Đức."', questionEn: '"I can speak German."', answerData: { acceptedAnswers: ['Ich kann Deutsch sprechen', 'Ich kann Deutsch sprechen.'] }, points: 1 },
            { exerciseType: 'translate', order: 18, questionVi: '"Anh ấy muốn mua một cuốn sách."', questionEn: '"He would like to buy a book."', answerData: { acceptedAnswers: ['Er möchte ein Buch kaufen', 'Er möchte ein Buch kaufen.'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Chúng tôi muốn đi Berlin."', questionEn: '"We want to go to Berlin."', answerData: { acceptedAnswers: ['Wir wollen nach Berlin fahren', 'Wir wollen nach Berlin fahren.'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Bạn có thể bơi không?"', questionEn: '"Can you swim?"', answerData: { acceptedAnswers: ['Kannst du schwimmen?', 'Kannst du schwimmen', 'Können Sie schwimmen?'] }, points: 1 },
            // Error correct
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich kann Deutsch spreche.', answerData: { correctedText: 'Ich kann Deutsch sprechen.' }, explanation: { de: 'Infinitiv am Ende!', en: 'Infinitive at the end!', vi: 'Nguyên mẫu ở cuối câu!' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Er möchte kaufen ein Buch.', answerData: { correctedText: 'Er möchte ein Buch kaufen.' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: Wir wollen fahren nach Berlin.', answerData: { correctedText: 'Wir wollen nach Berlin fahren.' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Du könnt gut kochen.', answerData: { correctedText: 'Du kannst gut kochen.' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Ich will gehe nach Hause.', answerData: { correctedText: 'Ich will nach Hause gehen.' }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 16: MODALVERBEN (2) — müssen, dürfen, sollen
    // =================================================================
    {
        slug: 'a1-l16-modal-verbs-2',
        level: 'A1',
        lessonNumber: 16,
        titleDe: 'Modalverben (2): müssen, dürfen, sollen',
        titleEn: 'Modal Verbs (2): müssen, dürfen, sollen',
        titleVi: 'Động từ khuyết thiếu (2): müssen, dürfen, sollen',
        objectives: {
            de: ['müssen, dürfen, sollen konjugieren', 'Pflicht, Erlaubnis, Empfehlung ausdrücken', 'Satzklammer mit Modalverben üben'],
            en: ['Conjugate müssen, dürfen, sollen', 'Express obligation, permission, recommendation', 'Practice sentence bracket with modal verbs'],
            vi: ['Chia müssen, dürfen, sollen', 'Diễn đạt bắt buộc, được phép, nên', 'Luyện khung câu với động từ khuyết thiếu']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Konjugation', en: 'Conjugation', vi: 'Bảng chia' },
                    content: 'müssen (must/have to), dürfen (may/allowed to), sollen (should/supposed to). All follow modal verb sentence bracket: modal at position 2, infinitive at end.',
                    table: { headers: ['Pronoun', 'müssen', 'dürfen', 'sollen'], rows: [
                        ['ich', 'muss', 'darf', 'soll'],
                        ['du', 'musst', 'darfst', 'sollst'],
                        ['er/sie/es', 'muss', 'darf', 'soll'],
                        ['wir', 'müssen', 'dürfen', 'sollen'],
                        ['ihr', 'müsst', 'dürft', 'sollt'],
                        ['sie/Sie', 'müssen', 'dürfen', 'sollen']
                    ] }
                },
                {
                    title: { de: 'Bedeutung', en: 'Meaning', vi: 'Ý nghĩa' },
                    content: 'müssen = obligation/necessity. dürfen = permission (nicht dürfen = prohibition). sollen = recommendation/moral duty.',
                    table: { headers: ['Verb', 'Meaning', 'Example', 'Nghĩa'], rows: [
                        ['müssen', 'must / have to', 'Ich muss arbeiten.', 'Tôi phải làm việc.'],
                        ['nicht müssen', 'don\'t have to', 'Du musst nicht kommen.', 'Bạn không cần phải đến.'],
                        ['dürfen', 'may / allowed to', 'Hier darf man rauchen.', 'Ở đây được phép hút thuốc.'],
                        ['nicht dürfen', 'must not / forbidden', 'Man darf hier nicht parken.', 'Không được đậu xe ở đây.'],
                        ['sollen', 'should / supposed to', 'Du sollst mehr schlafen.', 'Bạn nên ngủ nhiều hơn.']
                    ] }
                },
                {
                    title: { de: 'müssen vs. nicht dürfen', en: 'müssen vs. nicht dürfen', vi: 'Phân biệt' },
                    content: '⚠️ "nicht müssen" ≠ "must not"! nicht müssen = don\'t have to (no obligation). nicht dürfen = must not (prohibition).',
                    table: { headers: ['German', 'English', 'Vietnamese'], rows: [
                        ['Du musst nicht kommen.', 'You don\'t have to come.', 'Bạn không cần đến.'],
                        ['Du darfst nicht rauchen.', 'You must not smoke.', 'Bạn không được hút thuốc.']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30, prerequisiteIds: ['a1-l15-modal-verbs-1'],
        exercises: [
            // MCQ (6)
            { exerciseType: 'mcq', order: 1, questionDe: 'Ich ___ morgen früh aufstehen.', questionVi: 'Tôi phải dậy sớm ngày mai.', answerData: { options: ['muss', 'müssen', 'musst', 'müsst'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Hier ___ man nicht rauchen.', questionVi: 'Ở đây không được hút thuốc.', answerData: { options: ['muss', 'darf', 'soll', 'kann'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Du ___ mehr Wasser trinken. (recommendation)', answerData: { options: ['musst', 'darfst', 'sollst', 'willst'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Wir ___ heute nicht arbeiten. (no obligation)', answerData: { options: ['dürfen nicht', 'müssen nicht', 'sollen nicht', 'können nicht'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '___ ich hier fotografieren? (asking permission)', answerData: { options: ['Muss', 'Soll', 'Darf', 'Will'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Ihr ___ leise sein. Die Kinder schlafen.', answerData: { options: ['sollt', 'sollen', 'sollst', 'soll'], correctIndex: 0 }, points: 1 },
            // Fill blank (6)
            { exerciseType: 'fill_blank', order: 7, questionDe: 'Er ___ zum Arzt gehen. (müssen)', questionVi: 'Anh ấy phải đi bác sĩ.', answerData: { blanks: [{ answer: 'muss', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Wir ___ hier nicht parken. (dürfen)', questionVi: 'Chúng tôi không được đậu xe ở đây.', answerData: { blanks: [{ answer: 'dürfen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Du ___ pünktlich sein. (sollen)', answerData: { blanks: [{ answer: 'sollst', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Kinder ___ nicht Alkohol trinken. (dürfen)', answerData: { blanks: [{ answer: 'dürfen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Ich ___ jeden Tag Deutsch lernen. (müssen)', answerData: { blanks: [{ answer: 'muss', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Ihr ___ nicht so laut sein. (sollen)', answerData: { blanks: [{ answer: 'sollt', alternatives: [] }] }, points: 1 },
            // Reorder (5)
            { exerciseType: 'reorder', order: 13, questionDe: 'gehen / ich / muss / zum Arzt', answerData: { correctOrder: ['Ich', 'muss', 'zum', 'Arzt', 'gehen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 14, questionDe: 'nicht / darf / man / hier / rauchen', answerData: { correctOrder: ['Man', 'darf', 'hier', 'nicht', 'rauchen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'trinken / du / sollst / mehr Wasser', answerData: { correctOrder: ['Du', 'sollst', 'mehr', 'Wasser', 'trinken.'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'aufstehen / wir / müssen / früh', answerData: { correctOrder: ['Wir', 'müssen', 'früh', 'aufstehen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'fotografieren / darf / ich / hier / ?', answerData: { correctOrder: ['Darf', 'ich', 'hier', 'fotografieren?'] }, points: 1 },
            // Translate (4)
            { exerciseType: 'translate', order: 18, questionVi: '"Tôi phải đi làm."', questionEn: '"I have to go to work."', answerData: { acceptedAnswers: ['Ich muss arbeiten.', 'Ich muss arbeiten', 'Ich muss zur Arbeit gehen.'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Bạn không được hút thuốc ở đây."', questionEn: '"You must not smoke here."', answerData: { acceptedAnswers: ['Du darfst hier nicht rauchen.', 'Man darf hier nicht rauchen.', 'Sie dürfen hier nicht rauchen.'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Bạn nên ngủ nhiều hơn."', questionEn: '"You should sleep more."', answerData: { acceptedAnswers: ['Du sollst mehr schlafen.', 'Du sollst mehr schlafen', 'Sie sollen mehr schlafen.'] }, points: 1 },
            { exerciseType: 'translate', order: 21, questionVi: '"Chúng tôi không cần phải đến."', questionEn: '"We don\'t have to come."', answerData: { acceptedAnswers: ['Wir müssen nicht kommen.', 'Wir müssen nicht kommen'] }, points: 1 },
            // Error correct (4)
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Ich muss gehe zum Arzt.', answerData: { correctedText: 'Ich muss zum Arzt gehen.' }, explanation: { de: 'Infinitiv am Ende!', en: 'Infinitive at the end!', vi: 'Nguyên mẫu ở cuối câu!' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: Du darfst nicht rauchen hier.', answerData: { correctedText: 'Du darfst hier nicht rauchen.' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Er müssen arbeiten.', answerData: { correctedText: 'Er muss arbeiten.' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Ihr sollt nicht so laut sein nicht.', answerData: { correctedText: 'Ihr sollt nicht so laut sein.' }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 17: GRUNDLEGENDE SATZSTRUKTUR
    // =================================================================
    {
        slug: 'a1-l17-sentence-structure',
        level: 'A1',
        lessonNumber: 17,
        titleDe: 'Grundlegende Satzstruktur',
        titleEn: 'Basic Sentence Structure',
        titleVi: 'Cấu trúc câu cơ bản',
        objectives: {
            de: ['S-V-O Wortstellung verstehen', 'Verb an Position 2 (V2-Regel)', 'Zeitangaben und Inversion', 'Sätze mit mehreren Elementen bilden'],
            en: ['Understand S-V-O word order', 'Verb at position 2 (V2 rule)', 'Time expressions and inversion', 'Form sentences with multiple elements'],
            vi: ['Hiểu trật tự S-V-O', 'Động từ ở vị trí thứ 2 (quy tắc V2)', 'Trạng từ thời gian và đảo ngữ', 'Tạo câu với nhiều thành phần']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'S-V-O Grundstellung', en: 'S-V-O Basic Order', vi: 'Trật tự S-V-O cơ bản' },
                    content: 'In German declarative sentences, the conjugated verb is ALWAYS at position 2. This is the most important rule!',
                    table: { headers: ['Position 1', 'Position 2 (Verb!)', 'Rest'], rows: [
                        ['Ich', 'lerne', 'Deutsch.'],
                        ['Der Mann', 'kauft', 'ein Buch.'],
                        ['Wir', 'spielen', 'Fußball.'],
                        ['Die Kinder', 'gehen', 'in die Schule.']
                    ] }
                },
                {
                    title: { de: 'Inversion (Umstellung)', en: 'Inversion', vi: 'Đảo ngữ' },
                    content: 'When time/place starts the sentence, subject and verb SWAP positions. Verb stays at position 2!',
                    table: { headers: ['Position 1', 'Position 2 (Verb!)', 'Subject', 'Rest'], rows: [
                        ['Heute', 'lerne', 'ich', 'Deutsch.'],
                        ['Morgen', 'kauft', 'er', 'ein Auto.'],
                        ['In Berlin', 'wohnt', 'meine Schwester', '.'],
                        ['Am Montag', 'gehen', 'wir', 'ins Kino.']
                    ] }
                },
                {
                    title: { de: 'TeKaMoLo', en: 'TeKaMoLo', vi: 'TeKaMoLo' },
                    content: 'Order of adverbials: Temporal (when) → Kausal (why) → Modal (how) → Lokal (where). Memory: TeKaMoLo!',
                    table: { headers: ['Te (wann?)', 'Ka (warum?)', 'Mo (wie?)', 'Lo (wo/wohin?)'], rows: [
                        ['Ich fahre', 'morgen', '', 'mit dem Zug', 'nach Berlin.'],
                        ['Er geht', 'heute', 'wegen Kopfschmerzen', 'nicht', 'zur Arbeit.']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30, prerequisiteIds: ['a1-l16-modal-verbs-2'],
        exercises: [
            // MCQ (6)
            { exerciseType: 'mcq', order: 1, questionDe: 'Wo steht das Verb im deutschen Aussagesatz?', questionVi: 'Động từ ở vị trí nào trong câu trần thuật?', answerData: { options: ['Position 1', 'Position 2', 'Am Ende', 'Egal'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Welcher Satz ist richtig?', answerData: { options: ['Heute ich lerne Deutsch.', 'Heute lerne ich Deutsch.', 'Ich heute lerne Deutsch.', 'Lerne ich heute Deutsch.'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Morgen ___ er nach Berlin."', answerData: { options: ['fahrt', 'fährt', 'fahren', 'fährst'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Was ist TeKaMoLo?', questionVi: 'TeKaMoLo là gì?', answerData: { options: ['Ein Verb', 'Eine Stadt', 'Temporal-Kausal-Modal-Lokal', 'Ein Name'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Welcher Satz hat die richtige Wortstellung?', answerData: { options: ['Ich fahre nach Berlin morgen.', 'Ich fahre morgen nach Berlin.', 'Ich morgen fahre nach Berlin.', 'Nach Berlin ich fahre morgen.'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Am Montag ___ wir ins Kino."', answerData: { options: ['gehen', 'geht', 'gehe', 'gehst'], correctIndex: 0 }, points: 1 },
            // Fill blank (5)
            { exerciseType: 'fill_blank', order: 7, questionDe: 'Heute ___ ich Deutsch. (lernen)', answerData: { blanks: [{ answer: 'lerne', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Morgen ___ wir nach Hamburg. (fahren)', answerData: { blanks: [{ answer: 'fahren', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'In Berlin ___ meine Eltern. (wohnen)', answerData: { blanks: [{ answer: 'wohnen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Am Abend ___ er ein Buch. (lesen)', answerData: { blanks: [{ answer: 'liest', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Um 8 Uhr ___ die Schule. (beginnen)', answerData: { blanks: [{ answer: 'beginnt', alternatives: [] }] }, points: 1 },
            // Reorder (6)
            { exerciseType: 'reorder', order: 12, questionDe: 'Deutsch / ich / lerne / heute', answerData: { correctOrder: ['Heute', 'lerne', 'ich', 'Deutsch.'] }, points: 1 },
            { exerciseType: 'reorder', order: 13, questionDe: 'fährt / nach Berlin / morgen / er', answerData: { correctOrder: ['Morgen', 'fährt', 'er', 'nach', 'Berlin.'] }, points: 1 },
            { exerciseType: 'reorder', order: 14, questionDe: 'kauft / ein Auto / der Mann', answerData: { correctOrder: ['Der', 'Mann', 'kauft', 'ein', 'Auto.'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'ins Kino / am Montag / gehen / wir', answerData: { correctOrder: ['Am', 'Montag', 'gehen', 'wir', 'ins', 'Kino.'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'morgen / ich / nach Berlin / fahre / mit dem Zug', answerData: { correctOrder: ['Ich', 'fahre', 'morgen', 'mit', 'dem', 'Zug', 'nach', 'Berlin.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'wohnt / in Berlin / meine Schwester', answerData: { correctOrder: ['Meine', 'Schwester', 'wohnt', 'in', 'Berlin.'] }, points: 1 },
            // Translate (4)
            { exerciseType: 'translate', order: 18, questionVi: '"Hôm nay tôi học tiếng Đức."', questionEn: '"Today I learn German."', answerData: { acceptedAnswers: ['Heute lerne ich Deutsch.', 'Heute lerne ich Deutsch', 'Ich lerne heute Deutsch.'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Ngày mai anh ấy đi Berlin."', questionEn: '"Tomorrow he goes to Berlin."', answerData: { acceptedAnswers: ['Morgen fährt er nach Berlin.', 'Er fährt morgen nach Berlin.'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Chị tôi sống ở Berlin."', questionEn: '"My sister lives in Berlin."', answerData: { acceptedAnswers: ['Meine Schwester wohnt in Berlin.', 'In Berlin wohnt meine Schwester.'] }, points: 1 },
            { exerciseType: 'translate', order: 21, questionVi: '"Thứ hai chúng tôi đi xem phim."', questionEn: '"On Monday we go to the cinema."', answerData: { acceptedAnswers: ['Am Montag gehen wir ins Kino.', 'Wir gehen am Montag ins Kino.'] }, points: 1 },
            // Error correct (4)
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Heute ich lerne Deutsch.', answerData: { correctedText: 'Heute lerne ich Deutsch.' }, explanation: { de: 'Verb auf Position 2!', en: 'Verb at position 2!', vi: 'Động từ ở vị trí 2!' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: Ich fahre nach Berlin morgen.', answerData: { correctedText: 'Ich fahre morgen nach Berlin.' }, explanation: { de: 'TeKaMoLo: Temporal vor Lokal!', en: 'TeKaMoLo: Temporal before Local!', vi: 'TeKaMoLo: Thời gian trước địa điểm!' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Morgen ich fahre nach Hamburg.', answerData: { correctedText: 'Morgen fahre ich nach Hamburg.' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Der Mann ein Buch kauft.', answerData: { correctedText: 'Der Mann kauft ein Buch.' }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 18: JA/NEIN-FRAGEN
    // =================================================================
    {
        slug: 'a1-l18-yes-no-questions',
        level: 'A1',
        lessonNumber: 18,
        titleDe: 'Ja/Nein-Fragen',
        titleEn: 'Yes/No Questions',
        titleVi: 'Câu hỏi Yes/No',
        objectives: {
            de: ['Ja/Nein-Fragen bilden (Verb an Position 1)', 'Ja, Nein, Doch korrekt verwenden', 'Fragen mit Modalverben stellen'],
            en: ['Form yes/no questions (verb at position 1)', 'Use Ja, Nein, Doch correctly', 'Ask questions with modal verbs'],
            vi: ['Tạo câu hỏi yes/no (động từ ở vị trí 1)', 'Dùng đúng Ja, Nein, Doch', 'Đặt câu hỏi với động từ khuyết thiếu']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Bildung', en: 'Formation', vi: 'Cách tạo' },
                    content: 'Move the conjugated verb to position 1. The subject follows. Intonation rises at the end.',
                    table: { headers: ['Statement', 'Yes/No Question'], rows: [
                        ['Du bist müde.', 'Bist du müde?'],
                        ['Er spricht Deutsch.', 'Spricht er Deutsch?'],
                        ['Sie können schwimmen.', 'Können Sie schwimmen?'],
                        ['Ihr habt Hunger.', 'Habt ihr Hunger?']
                    ] }
                },
                {
                    title: { de: 'Ja / Nein / Doch', en: 'Ja / Nein / Doch', vi: 'Ja / Nein / Doch' },
                    content: '⚠️ "Doch" is used to contradict a negative question. This doesn\'t exist in English or Vietnamese!',
                    table: { headers: ['Question', 'Positive', 'Negative'], rows: [
                        ['Bist du müde?', 'Ja, ich bin müde.', 'Nein, ich bin nicht müde.'],
                        ['Sprichst du Deutsch?', 'Ja, ich spreche Deutsch.', 'Nein, ich spreche kein Deutsch.'],
                        ['Bist du NICHT müde?', 'Doch, ich bin müde!', 'Nein, ich bin nicht müde.'],
                        ['Hast du KEIN Geld?', 'Doch, ich habe Geld!', 'Nein, ich habe kein Geld.']
                    ] }
                },
                {
                    title: { de: 'Fragen mit Modalverben', en: 'Questions with Modal Verbs', vi: 'Câu hỏi với động từ khuyết thiếu' },
                    content: 'Modal verb goes to position 1, main verb stays at the end as infinitive.',
                    table: { headers: ['Question', 'Meaning'], rows: [
                        ['Kannst du schwimmen?', 'Can you swim?'],
                        ['Darf ich hier sitzen?', 'May I sit here?'],
                        ['Müssen wir gehen?', 'Do we have to go?'],
                        ['Möchtest du Kaffee?', 'Would you like coffee?']
                    ] }
                }
            ]
        },
        estimatedMinutes: 25, prerequisiteIds: ['a1-l17-sentence-structure'],
        exercises: [
            // MCQ (6)
            { exerciseType: 'mcq', order: 1, questionDe: 'Wo steht das Verb in einer Ja/Nein-Frage?', questionVi: 'Động từ ở đâu trong câu hỏi yes/no?', answerData: { options: ['Am Ende', 'Position 1', 'Position 2', 'Position 3'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"___ du Deutsch?"', answerData: { options: ['Sprichst', 'Sprecht', 'Sprechen', 'Spricht'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Hast du kein Geld?" — "___! Ich habe 50 Euro!"', questionVi: '"Bạn không có tiền à?" — phản bác khẳng định', answerData: { options: ['Ja', 'Nein', 'Doch', 'Nicht'], correctIndex: 2 }, explanation: { de: 'Doch widerspricht eine negative Frage positiv.', en: 'Doch contradicts a negative question positively.', vi: 'Doch phản bác câu hỏi phủ định → khẳng định.' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Welche Frage ist richtig?', answerData: { options: ['Du bist müde?', 'Bist du müde?', 'Müde bist du?', 'Du müde bist?'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Bist du nicht hungrig?" — "Nein, ___"', answerData: { options: ['ich bin hungrig.', 'ich bin nicht hungrig.', 'ich habe Hunger.', 'ich bin müde.'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"___ ich hier sitzen?" (permission)', answerData: { options: ['Muss', 'Soll', 'Kann', 'Darf'], correctIndex: 3 }, points: 1 },
            // Fill blank (5)
            { exerciseType: 'fill_blank', order: 7, questionDe: '___ du morgen Zeit? (haben)', answerData: { blanks: [{ answer: 'Hast', alternatives: ['hast'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 8, questionDe: '___ ihr fertig? (sein)', answerData: { blanks: [{ answer: 'Seid', alternatives: ['seid'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: '___ Sie aus Deutschland? (kommen)', answerData: { blanks: [{ answer: 'Kommen', alternatives: ['kommen'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '"Hast du kein Auto?" — "___, ich habe eins!" (contradict)', answerData: { blanks: [{ answer: 'Doch', alternatives: ['doch'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '___ wir heute Pizza essen? (können)', answerData: { blanks: [{ answer: 'Können', alternatives: ['können'] }] }, points: 1 },
            // Reorder (5)
            { exerciseType: 'reorder', order: 12, questionDe: 'du / müde / bist / ?', answerData: { correctOrder: ['Bist', 'du', 'müde?'] }, points: 1 },
            { exerciseType: 'reorder', order: 13, questionDe: 'Deutsch / er / spricht / ?', answerData: { correctOrder: ['Spricht', 'er', 'Deutsch?'] }, points: 1 },
            { exerciseType: 'reorder', order: 14, questionDe: 'schwimmen / kannst / du / ?', answerData: { correctOrder: ['Kannst', 'du', 'schwimmen?'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'hier / ich / sitzen / darf / ?', answerData: { correctOrder: ['Darf', 'ich', 'hier', 'sitzen?'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'ihr / habt / Hunger / ?', answerData: { correctOrder: ['Habt', 'ihr', 'Hunger?'] }, points: 1 },
            // Translate (4)
            { exerciseType: 'translate', order: 17, questionVi: '"Bạn nói tiếng Đức không?"', questionEn: '"Do you speak German?"', answerData: { acceptedAnswers: ['Sprichst du Deutsch?', 'Sprechen Sie Deutsch?'] }, points: 1 },
            { exerciseType: 'translate', order: 18, questionVi: '"Tôi có thể ngồi đây không?"', questionEn: '"May I sit here?"', answerData: { acceptedAnswers: ['Darf ich hier sitzen?', 'Kann ich hier sitzen?'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Các bạn mệt không?"', questionEn: '"Are you (plural) tired?"', answerData: { acceptedAnswers: ['Seid ihr müde?', 'Sind Sie müde?'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Bạn có muốn cà phê không?"', questionEn: '"Would you like coffee?"', answerData: { acceptedAnswers: ['Möchtest du Kaffee?', 'Möchten Sie Kaffee?'] }, points: 1 },
            // Error correct (4)
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Du bist müde?', answerData: { correctedText: 'Bist du müde?' }, explanation: { de: 'Verb auf Position 1!', en: 'Verb at position 1!', vi: 'Động từ ở vị trí 1!' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Spricht Deutsch er?', answerData: { correctedText: 'Spricht er Deutsch?' }, points: 1 },
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: "Hast du kein Geld?" — "Ja, ich habe Geld!"', answerData: { correctedText: '"Hast du kein Geld?" — "Doch, ich habe Geld!"' }, explanation: { de: 'Doch für positive Antwort auf negative Frage!', en: 'Doch for positive answer to negative question!', vi: 'Doch để phản bác câu hỏi phủ định!' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Kannst du schwimmen kannst?', answerData: { correctedText: 'Kannst du schwimmen?' }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 19: W-FRAGEN
    // =================================================================
    {
        slug: 'a1-l19-w-questions',
        level: 'A1',
        lessonNumber: 19,
        titleDe: 'W-Fragen',
        titleEn: 'W-Questions',
        titleVi: 'Câu hỏi W-',
        objectives: {
            de: ['W-Fragewörter kennen und verwenden', 'Unterschied zwischen W-Fragen und Ja/Nein-Fragen', 'Passende W-Wörter für verschiedene Informationen wählen'],
            en: ['Know and use W-question words', 'Distinguish W-questions from yes/no questions', 'Choose appropriate W-words for different information'],
            vi: ['Biết và dùng các từ hỏi W-', 'Phân biệt câu hỏi W- và câu hỏi yes/no', 'Chọn từ hỏi phù hợp cho các loại thông tin']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'W-Fragewörter', en: 'W-Question Words', vi: 'Các từ hỏi W-' },
                    content: 'W-words always start the sentence, followed by the verb at position 2, then the subject.',
                    table: { headers: ['W-Wort', 'Meaning', 'Nghĩa', 'Example'], rows: [
                        ['Wer?', 'Who?', 'Ai?', 'Wer ist das? (Đó là ai?)'],
                        ['Was?', 'What?', 'Cái gì?', 'Was machst du? (Bạn làm gì?)'],
                        ['Wo?', 'Where? (location)', 'Ở đâu?', 'Wo wohnst du? (Bạn sống ở đâu?)'],
                        ['Woher?', 'Where from?', 'Từ đâu?', 'Woher kommst du? (Bạn từ đâu đến?)'],
                        ['Wohin?', 'Where to?', 'Đi đâu?', 'Wohin fährst du? (Bạn đi đâu?)'],
                        ['Wann?', 'When?', 'Khi nào?', 'Wann kommst du? (Bạn đến khi nào?)'],
                        ['Warum?', 'Why?', 'Tại sao?', 'Warum lernst du Deutsch? (Tại sao bạn học tiếng Đức?)'],
                        ['Wie?', 'How?', 'Như thế nào?', 'Wie geht es dir? (Bạn khỏe không?)'],
                        ['Wie viel(e)?', 'How much/many?', 'Bao nhiêu?', 'Wie viel kostet das? (Giá bao nhiêu?)'],
                        ['Welch-?', 'Which?', 'Cái nào?', 'Welche Farbe? (Màu nào?)']
                    ] }
                },
                {
                    title: { de: 'Satzstruktur', en: 'Sentence Structure', vi: 'Cấu trúc câu' },
                    content: 'W-word at position 1 → Verb at position 2 → Subject → Rest. Same V2 rule as statements!',
                    table: { headers: ['W-Wort (Pos. 1)', 'Verb (Pos. 2)', 'Subject', 'Rest'], rows: [
                        ['Wo', 'wohnst', 'du', '?'],
                        ['Was', 'macht', 'er', 'am Wochenende?'],
                        ['Wann', 'fährt', 'der Zug', 'ab?'],
                        ['Warum', 'lernst', 'du', 'Deutsch?']
                    ] }
                },
                {
                    title: { de: 'Wo vs. Woher vs. Wohin', en: 'Wo vs. Woher vs. Wohin', vi: 'Phân biệt Wo / Woher / Wohin' },
                    content: 'Three "where" words for different situations: location, origin, destination.',
                    table: { headers: ['Word', 'Asks about', 'Example'], rows: [
                        ['Wo?', 'Location (stationary)', 'Wo bist du? — In Berlin.'],
                        ['Woher?', 'Origin (from where)', 'Woher kommst du? — Aus Vietnam.'],
                        ['Wohin?', 'Destination (to where)', 'Wohin gehst du? — Nach Hause.']
                    ] }
                }
            ]
        },
        estimatedMinutes: 30, prerequisiteIds: ['a1-l18-yes-no-questions'],
        exercises: [
            // MCQ (7)
            { exerciseType: 'mcq', order: 1, questionDe: '___ wohnst du?', questionVi: 'Bạn sống ở đâu?', answerData: { options: ['Wer', 'Was', 'Wo', 'Wohin'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '___ kommst du?', questionVi: 'Bạn từ đâu đến?', answerData: { options: ['Wo', 'Woher', 'Wohin', 'Wann'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '___ lernst du Deutsch?', questionVi: 'Tại sao bạn học tiếng Đức?', answerData: { options: ['Was', 'Wann', 'Warum', 'Wie'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '___ kostet das? (How much?)', answerData: { options: ['Was', 'Wie', 'Wie viel', 'Welche'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '___ ist das? — Das ist mein Bruder.', answerData: { options: ['Was', 'Wer', 'Wo', 'Wie'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '___ fährst du? — Nach Berlin.', answerData: { options: ['Wo', 'Woher', 'Wohin', 'Wann'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '___ kommt der Zug? — Um 15 Uhr.', answerData: { options: ['Wo', 'Was', 'Wie', 'Wann'], correctIndex: 3 }, points: 1 },
            // Fill blank (6)
            { exerciseType: 'fill_blank', order: 8, questionDe: '___ machst du am Wochenende? (What)', answerData: { blanks: [{ answer: 'Was', alternatives: ['was'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: '___ geht es Ihnen? (How)', answerData: { blanks: [{ answer: 'Wie', alternatives: ['wie'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ Kinder hast du? (How many)', answerData: { blanks: [{ answer: 'Wie viele', alternatives: ['Wie viel', 'wie viele'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '___ heißen Sie? (What ... called)', answerData: { blanks: [{ answer: 'Wie', alternatives: ['wie'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: '___ gehst du? — Zum Supermarkt. (Where to)', answerData: { blanks: [{ answer: 'Wohin', alternatives: ['wohin'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: '___ Farbe magst du? (Which)', answerData: { blanks: [{ answer: 'Welche', alternatives: ['welche'] }] }, points: 1 },
            // Reorder (5)
            { exerciseType: 'reorder', order: 14, questionDe: 'du / wo / wohnst / ?', answerData: { correctOrder: ['Wo', 'wohnst', 'du?'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'am Wochenende / was / du / machst / ?', answerData: { correctOrder: ['Was', 'machst', 'du', 'am', 'Wochenende?'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Deutsch / warum / du / lernst / ?', answerData: { correctOrder: ['Warum', 'lernst', 'du', 'Deutsch?'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'der Zug / wann / ab / fährt / ?', answerData: { correctOrder: ['Wann', 'fährt', 'der', 'Zug', 'ab?'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'kommst / woher / du / ?', answerData: { correctOrder: ['Woher', 'kommst', 'du?'] }, points: 1 },
            // Translate (5)
            { exerciseType: 'translate', order: 19, questionVi: '"Bạn tên gì?"', questionEn: '"What is your name?"', answerData: { acceptedAnswers: ['Wie heißt du?', 'Wie heißen Sie?', 'Wie ist dein Name?'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Bạn ở đâu?"', questionEn: '"Where are you?"', answerData: { acceptedAnswers: ['Wo bist du?', 'Wo sind Sie?'] }, points: 1 },
            { exerciseType: 'translate', order: 21, questionVi: '"Bạn từ đâu đến?"', questionEn: '"Where are you from?"', answerData: { acceptedAnswers: ['Woher kommst du?', 'Woher kommen Sie?'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionVi: '"Giá bao nhiêu?"', questionEn: '"How much does it cost?"', answerData: { acceptedAnswers: ['Wie viel kostet das?', 'Was kostet das?'] }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: '"Tại sao bạn học tiếng Đức?"', questionEn: '"Why do you learn German?"', answerData: { acceptedAnswers: ['Warum lernst du Deutsch?', 'Warum lernen Sie Deutsch?'] }, points: 1 },
            // Error correct (4)
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Wo kommst du? (asking about origin)', answerData: { correctedText: 'Woher kommst du?' }, explanation: { de: 'Wo = Ort, Woher = Herkunft!', en: 'Wo = location, Woher = origin!', vi: 'Wo = nơi ở, Woher = từ đâu đến!' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Was wohnst du?', answerData: { correctedText: 'Wo wohnst du?' }, points: 1 },
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Wann du kommst?', answerData: { correctedText: 'Wann kommst du?' }, explanation: { de: 'Verb auf Position 2!', en: 'Verb at position 2!', vi: 'Động từ ở vị trí 2!' }, points: 1 },
            { exerciseType: 'error_correct', order: 27, questionDe: 'Korrigiere: Wohin bist du? — In Berlin.', answerData: { correctedText: 'Wo bist du? — In Berlin.' }, explanation: { de: 'Wo = Ort (statisch), Wohin = Richtung!', en: 'Wo = location, Wohin = direction!', vi: 'Wo = vị trí, Wohin = hướng đi!' }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 20: VERNEINUNG (nicht / kein)
    // =================================================================
    {
        slug: 'a1-l20-negation',
        level: 'A1',
        lessonNumber: 20,
        titleDe: 'Verneinung: nicht und kein',
        titleEn: 'Negation: nicht and kein',
        titleVi: 'Phủ định: nicht và kein',
        objectives: {
            de: ['Unterschied zwischen nicht und kein verstehen', 'Position von nicht im Satz', 'kein korrekt deklinieren (Nominativ + Akkusativ)', 'Verschiedene Satztypen verneinen'],
            en: ['Understand difference between nicht and kein', 'Position of nicht in sentences', 'Decline kein correctly (Nominative + Accusative)', 'Negate different sentence types'],
            vi: ['Phân biệt nicht và kein', 'Vị trí của nicht trong câu', 'Chia kein đúng (Nominativ + Akkusativ)', 'Phủ định các loại câu khác nhau']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'nicht vs. kein', en: 'nicht vs. kein', vi: 'Phân biệt nicht và kein' },
                    content: 'nicht = "not" (negates verbs, adjectives, adverbs, specific nouns). kein = "no/not a" (negates nouns with ein/eine or no article).',
                    table: { headers: ['Use nicht for', 'Use kein for', 'Example nicht', 'Example kein'], rows: [
                        ['Verbs', 'Noun with ein/eine', 'Ich komme nicht.', 'Ich habe kein Auto.'],
                        ['Adjectives', 'Noun without article', 'Er ist nicht müde.', 'Ich habe keine Zeit.'],
                        ['Noun with der/die/das', 'Uncountable nouns', 'Ich mag das Buch nicht.', 'Ich trinke keinen Kaffee.'],
                        ['Adverbs', '', 'Er kommt nicht heute.', ''],
                        ['Prepositional phrases', '', 'Ich bin nicht in Berlin.', '']
                    ] }
                },
                {
                    title: { de: 'Position von nicht', en: 'Position of nicht', vi: 'Vị trí của nicht' },
                    content: 'nicht usually goes BEFORE what it negates. If negating the whole sentence, nicht goes at the end (or before the final verb part).',
                    table: { headers: ['Type', 'Position', 'Example'], rows: [
                        ['Whole sentence', 'End', 'Ich komme heute nicht.'],
                        ['Adjective', 'Before adj.', 'Er ist nicht müde.'],
                        ['Adverb', 'Before adverb', 'Sie singt nicht gut.'],
                        ['Prep. phrase', 'Before prep.', 'Ich bin nicht in Berlin.'],
                        ['With modal', 'Before infinitive', 'Ich kann nicht schwimmen.']
                    ] }
                },
                {
                    title: { de: 'kein-Deklination', en: 'kein Declension', vi: 'Chia kein' },
                    content: 'kein declines like ein: kein (m./n.), keine (f./pl.).',
                    table: { headers: ['', 'Maskulin', 'Feminin', 'Neutrum', 'Plural'], rows: [
                        ['Nominativ', 'kein', 'keine', 'kein', 'keine'],
                        ['Akkusativ', 'keinen', 'keine', 'kein', 'keine']
                    ] }
                }
            ]
        },
        estimatedMinutes: 28, prerequisiteIds: ['a1-l19-w-questions'],
        exercises: [
            // MCQ (7)
            { exerciseType: 'mcq', order: 1, questionDe: '"Ich habe ___ Auto." (I have no car)', answerData: { options: ['nicht', 'kein', 'keinen', 'keine'], correctIndex: 1 }, explanation: { de: 'Auto = Neutrum Nominativ → kein', en: 'Auto = neuter nominative → kein', vi: 'Auto = giống trung chủ cách → kein' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Er ist ___ müde."', answerData: { options: ['nicht', 'kein', 'keine', 'keinen'], correctIndex: 0 }, explanation: { de: 'Adjektiv → nicht', en: 'Adjective → nicht', vi: 'Tính từ → nicht' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Ich trinke ___ Kaffee."', answerData: { options: ['nicht', 'kein', 'keinen', 'keine'], correctIndex: 2 }, explanation: { de: 'Kaffee = Maskulin Akkusativ → keinen', en: 'Kaffee = masculine accusative → keinen', vi: 'Kaffee = giống đực tân cách → keinen' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Wir haben ___ Kinder." (no children)', answerData: { options: ['nicht', 'kein', 'keine', 'keinen'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Ich bin ___ in Berlin."', answerData: { options: ['nicht', 'kein', 'keine', 'keinen'], correctIndex: 0 }, explanation: { de: 'Präpositionalphrase → nicht', en: 'Prepositional phrase → nicht', vi: 'Giới từ → nicht' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Sie hat ___ Schwester." (no sister)', answerData: { options: ['nicht', 'kein', 'keine', 'keinen'], correctIndex: 2 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Ich kann ___ schwimmen."', answerData: { options: ['nicht', 'kein', 'keine', 'keinen'], correctIndex: 0 }, points: 1 },
            // Fill blank (6)
            { exerciseType: 'fill_blank', order: 8, questionDe: 'Das ist ___ mein Buch. (not)', answerData: { blanks: [{ answer: 'nicht', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich habe ___ Geld. (no)', answerData: { blanks: [{ answer: 'kein', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Er spricht ___ Deutsch. (no, zero amount)', answerData: { blanks: [{ answer: 'kein', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Wir kommen ___ aus Deutschland. (not)', answerData: { blanks: [{ answer: 'nicht', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Sie hat ___ Freund. (no boyfriend, masculine Akk)', answerData: { blanks: [{ answer: 'keinen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich verstehe das ___. (not, end of sentence)', answerData: { blanks: [{ answer: 'nicht', alternatives: [] }] }, points: 1 },
            // Reorder (4)
            { exerciseType: 'reorder', order: 14, questionDe: 'nicht / ich / müde / bin', answerData: { correctOrder: ['Ich', 'bin', 'nicht', 'müde.'] }, points: 1 },
            { exerciseType: 'reorder', order: 15, questionDe: 'kein / ich / Auto / habe', answerData: { correctOrder: ['Ich', 'habe', 'kein', 'Auto.'] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'keine / wir / Zeit / haben', answerData: { correctOrder: ['Wir', 'haben', 'keine', 'Zeit.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'nicht / er / in Berlin / wohnt', answerData: { correctOrder: ['Er', 'wohnt', 'nicht', 'in', 'Berlin.'] }, points: 1 },
            // Translate (5)
            { exerciseType: 'translate', order: 18, questionVi: '"Tôi không mệt."', questionEn: '"I am not tired."', answerData: { acceptedAnswers: ['Ich bin nicht müde.', 'Ich bin nicht müde'] }, points: 1 },
            { exerciseType: 'translate', order: 19, questionVi: '"Anh ấy không có xe."', questionEn: '"He has no car."', answerData: { acceptedAnswers: ['Er hat kein Auto.', 'Er hat kein Auto'] }, points: 1 },
            { exerciseType: 'translate', order: 20, questionVi: '"Chúng tôi không có thời gian."', questionEn: '"We have no time."', answerData: { acceptedAnswers: ['Wir haben keine Zeit.', 'Wir haben keine Zeit'] }, points: 1 },
            { exerciseType: 'translate', order: 21, questionVi: '"Cô ấy không sống ở Berlin."', questionEn: '"She doesn\'t live in Berlin."', answerData: { acceptedAnswers: ['Sie wohnt nicht in Berlin.', 'Sie lebt nicht in Berlin.'] }, points: 1 },
            { exerciseType: 'translate', order: 22, questionVi: '"Tôi không uống cà phê."', questionEn: '"I don\'t drink coffee."', answerData: { acceptedAnswers: ['Ich trinke keinen Kaffee.', 'Ich trinke keinen Kaffee'] }, points: 1 },
            // Error correct (4)
            { exerciseType: 'error_correct', order: 23, questionDe: 'Korrigiere: Ich habe nicht Auto.', answerData: { correctedText: 'Ich habe kein Auto.' }, explanation: { de: 'Nomen mit ein → kein, nicht nicht!', en: 'Noun with ein → kein, not nicht!', vi: 'Danh từ với ein → kein, không phải nicht!' }, points: 1 },
            { exerciseType: 'error_correct', order: 24, questionDe: 'Korrigiere: Er ist kein müde.', answerData: { correctedText: 'Er ist nicht müde.' }, explanation: { de: 'Adjektiv → nicht!', en: 'Adjective → nicht!', vi: 'Tính từ → nicht!' }, points: 1 },
            { exerciseType: 'error_correct', order: 25, questionDe: 'Korrigiere: Ich trinke nicht Kaffee.', answerData: { correctedText: 'Ich trinke keinen Kaffee.' }, explanation: { de: 'Nomen ohne Artikel → kein (+ Akk. maskulin = keinen)', en: 'Noun without article → kein (+ Acc. masc. = keinen)', vi: 'Danh từ không mạo từ → kein (+ tân cách nam = keinen)' }, points: 1 },
            { exerciseType: 'error_correct', order: 26, questionDe: 'Korrigiere: Wir haben keine Hunger.', answerData: { correctedText: 'Wir haben keinen Hunger.' }, explanation: { de: 'Hunger = maskulin Akkusativ → keinen!', en: 'Hunger = masculine accusative → keinen!', vi: 'Hunger = giống đực tân cách → keinen!' }, points: 1 },
        ]
    },
];

// =================================================================
// SEED FUNCTION
// =================================================================
export async function seedGrammarA1() {
    console.log('📝 Seeding Grammar A1 lessons...');

    // Clear existing grammar data
    console.log('🗑️  Clearing existing grammar data...');
    await prisma.grammarProgress.deleteMany();
    await prisma.grammarExercise.deleteMany();
    await prisma.grammarLesson.deleteMany();

    let lessonCount = 0;
    let exerciseCount = 0;

    for (const lesson of lessons) {
        const { exercises, ...lessonData } = lesson;

        // Create lesson
        const created = await prisma.grammarLesson.create({
            data: {
                ...lessonData,
                order: lessonData.lessonNumber,
            },
        });

        lessonCount++;

        // Create exercises for this lesson
        for (const exercise of exercises) {
            await prisma.grammarExercise.create({
                data: {
                    lessonId: created.id,
                    ...exercise,
                },
            });
            exerciseCount++;
        }

        console.log(`  ✓ Lesson ${lessonData.lessonNumber}: ${lessonData.titleEn} (${exercises.length} exercises)`);
    }

    console.log(`\n✅ Seeded ${lessonCount} grammar lessons with ${exerciseCount} total exercises!`);

    // Stats
    const byType = await prisma.grammarExercise.groupBy({
        by: ['exerciseType'],
        _count: { id: true },
    });
    console.log('\n📊 Exercises by type:');
    byType.forEach(t => console.log(`  ${t.exerciseType}: ${t._count.id}`));
}

// Run if called directly
if (require.main === module) {
    seedGrammarA1()
        .catch((e) => { console.error('❌ Error:', e); process.exit(1); })
        .finally(async () => { await prisma.$disconnect(); });
}