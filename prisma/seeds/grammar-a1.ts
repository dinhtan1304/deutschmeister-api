import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const lessons = [
    {
        slug: 'a1-l01-alphabet',
        level: 'A1',
        lessonNumber: 1,
        titleDe: 'Alphabet und Aussprache',
        titleEn: 'Alphabet & Pronunciation',
        titleVi: 'Bảng chữ cái & Phát âm',
        objectives: {
            de: ['26 Buchstaben lesen', 'Umlaute verstehen', 'Aussprache üben', 'Namen buchstabieren'],
            en: ['Read 26 letters', 'Understand Umlauts', 'Practice pronunciation', 'Spell names'],
            vi: ['Đọc 26 chữ cái', 'Hiểu Umlaute', 'Luyện phát âm', 'Đánh vần tên']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Das Alphabet', en: 'The Alphabet', vi: 'Bảng chữ cái' },
                    content: 'German has 26 basic letters, similar to English, plus 4 special characters: Ä, Ö, Ü, ß.',
                    table: {
                        headers: ['Letter', 'Pronunciation', 'Example'],
                        rows: [
                            ['A a', '/a:/', 'Apfel'], ['B b', '/be:/', 'Buch'], ['C c', '/tse:/', 'Café'],
                            ['D d', '/de:/', 'Deutsch'], ['E e', '/e:/', 'Eltern'], ['F f', '/ɛf/', 'Freund'],
                            ['G g', '/ge:/', 'Gut'], ['H h', '/ha:/', 'Haus'], ['I i', '/i:/', 'Insel'],
                            ['J j', '/jɔt/', 'Ja'], ['K k', '/ka:/', 'Kind'], ['L l', '/ɛl/', 'Liebe'],
                            ['M m', '/ɛm/', 'Mutter'], ['N n', '/ɛn/', 'Name'], ['O o', '/o:/', 'Onkel'],
                            ['P p', '/pe:/', 'Papa'], ['Q q', '/ku:/', 'Quelle'], ['R r', '/ɛʁ/', 'Rot'],
                            ['S s', '/ɛs/', 'Sonne'], ['T t', '/te:/', 'Tag'], ['U u', '/u:/', 'Uhr'],
                            ['V v', '/faʊ/', 'Vater'], ['W w', '/ve:/', 'Wasser'], ['X x', '/ɪks/', 'Taxi'],
                            ['Y y', '/ˈʏpsilɔn/', 'Yoga'], ['Z z', '/tsɛt/', 'Zeit']
                        ]
                    }
                },
                {
                    title: { de: 'Sonderzeichen', en: 'Special Characters', vi: 'Ký tự đặc biệt' },
                    content: 'Umlaute change the sound of vowels. Eszett (ß) is a sharp S sound.',
                    table: {
                        headers: ['Char', 'Sound', 'Example'],
                        rows: [
                            ['Ä ä', '/ɛː/ (bed)', 'Mädchen'],
                            ['Ö ö', '/øː/ (French eu)', 'schön'],
                            ['Ü ü', '/yː/ (French u)', 'fünf'],
                            ['ß', '/s/ (ss)', 'Straße']
                        ]
                    }
                },
                {
                    title: { de: 'Besondere Laute', en: 'Special Sounds', vi: 'Âm đặc biệt' },
                    content: 'Key sound combinations in German.',
                    table: {
                        headers: ['Combo', 'Sound', 'Example'],
                        rows: [
                            ['sch', '/ʃ/ (sh)', 'Schule'],
                            ['sp', '/ʃp/ (shp) [start]', 'spielen'],
                            ['st', '/ʃt/ (sht) [start]', 'Stadt'],
                            ['ei', '/aɪ/ (eye)', 'mein'],
                            ['ie', '/iː/ (bee)', 'Liebe'],
                            ['eu/äu', '/ɔʏ/ (oy)', 'heute']
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            // === Section A: MCQ (8 questions) ===
            {
                exerciseType: 'mcq',
                order: 1,
                questionDe: 'Wie spricht man "sch" in "Schule" aus?',
                questionEn: 'How is "sch" in "Schule" pronounced?',
                questionVi: 'Âm "sch" trong từ "Schule" phát âm thế nào?',
                answerData: { options: ['/s/ (s)', '/ʃ/ (sh)', '/tʃ/ (ch)', '/k/ (k)'], correctIndex: 1 },
                explanation: { de: 'sch = /ʃ/ like English sh', en: 'sch = /ʃ/ like English sh', vi: 'sch phát âm giống sh trong tiếng Anh' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 2,
                questionDe: 'Welches Wort hat den /aɪ/ Laut (wie "eye")?',
                questionEn: 'Which word has the /aɪ/ sound (like "eye")?',
                questionVi: 'Từ nào có âm /aɪ/ (như "ai")?',
                answerData: { options: ['sieben', 'Liebe', 'drei', 'vier'], correctIndex: 2 },
                explanation: { de: 'ei = /aɪ/', en: 'ei = /aɪ/', vi: 'ei đọc là /aɪ/' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 3,
                questionDe: 'Wie spricht man "ß" aus?',
                questionEn: 'How is "ß" pronounced?',
                questionVi: 'Chữ "ß" phát âm thế nào?',
                answerData: { options: ['/b/', '/p/', '/s/', '/z/'], correctIndex: 2 },
                explanation: { de: 'ß ist ein scharfes S', en: 'ß is a sharp S', vi: 'ß là âm s mạnh' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 4,
                questionDe: 'In "ich", wie spricht man "ch" aus?',
                questionEn: 'In "ich", how is "ch" pronounced?',
                questionVi: 'Trong "ich", âm "ch" phát âm thế nào?',
                answerData: { options: ['/x/ (ach-Laut)', '/ç/ (ich-Laut)', '/k/', '/tʃ/'], correctIndex: 1 },
                explanation: { de: 'After i, it is the soft ich-Sound', en: 'After i, it is the soft ich-Sound', vi: 'Sau i là âm ch mềm' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 5,
                questionDe: 'Welches Wort beginnt mit /ʃt/ (scht)?',
                questionEn: 'Which word starts with /ʃt/ (scht)?',
                questionVi: 'Từ nào bắt đầu bằng âm /ʃt/ (scht)?',
                answerData: { options: ['Sonne', 'Stadt', 'Salat', 'Sofa'], correctIndex: 1 },
                explanation: { de: 'st at start = scht', en: 'st at start = scht', vi: 'st ở đầu từ đọc là scht' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 6,
                questionDe: 'Wie klingt "Ö"?',
                questionEn: 'How does "Ö" sound?',
                questionVi: 'Âm "Ö" nghe gần giống âm nào?',
                answerData: { options: ['o', 'ơ (Vietnamese)', 'u', 'a'], correctIndex: 1 },
                explanation: { de: 'Ö is similar to ơ', en: 'Ö is similar to ơ', vi: 'Ö gần giống ơ' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 7,
                questionDe: 'Welchen Diphthong hat "heute"?',
                questionEn: 'What diphthong does "heute" have?',
                questionVi: 'Từ "heute" có nguyên âm đôi nào?',
                answerData: { options: ['ei', 'ie', 'eu', 'au'], correctIndex: 2 },
                explanation: { de: 'heute contains eu', en: 'heute contains eu', vi: 'heute chứa eu' },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 8,
                questionDe: 'In "Buch", wie spricht man "ch" aus?',
                questionEn: 'In "Buch", how is "ch" pronounced?',
                questionVi: 'Trong "Buch", âm "ch" phát âm thế nào?',
                answerData: { options: ['/ç/ (soft)', '/x/ (hard/throat)', '/k/', 'silent'], correctIndex: 1 },
                explanation: { de: 'After u, ch is hard /x/', en: 'After u, ch is hard /x/', vi: 'Sau u, ch là âm kh mạnh' },
                points: 1
            },

            // === Section B: Fill in the blank (7 questions) ===
            {
                exerciseType: 'fill_blank',
                order: 9,
                questionDe: 'Ergänze den Umlaut: M___dchen',
                questionEn: 'Fill in the Umlaut: M___dchen',
                questionVi: 'Điền Umlaut: M___dchen',
                answerData: { blanks: [{ answer: 'ä', alternatives: ['Ä'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 10,
                questionDe: 'Ergänze den Umlaut: sch___n',
                questionEn: 'Fill in the Umlaut: sch___n',
                questionVi: 'Điền Umlaut: sch___n',
                answerData: { blanks: [{ answer: 'ö', alternatives: ['Ö'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 11,
                questionDe: 'Ergänze den Umlaut: f___nf',
                questionEn: 'Fill in the Umlaut: f___nf',
                questionVi: 'Điền Umlaut: f___nf',
                answerData: { blanks: [{ answer: 'ü', alternatives: ['Ü'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 12,
                questionDe: 'Ergänze ie oder ei: dr___',
                questionEn: 'Fill in ie or ei: dr___',
                questionVi: 'Điền ie hoặc ei: dr___',
                answerData: { blanks: [{ answer: 'ei', alternatives: ['Ei', 'EI'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 13,
                questionDe: 'Ergänze ie oder ei: v___r',
                questionEn: 'Fill in ie or ei: v___r',
                questionVi: 'Điền ie hoặc ei: v___r',
                answerData: { blanks: [{ answer: 'ie', alternatives: ['Ie', 'IE'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 14,
                questionDe: 'Ergänze ß oder ss: Stra___e',
                questionEn: 'Fill in ß or ss: Stra___e',
                questionVi: 'Điền ß hoặc ss: Stra___e',
                answerData: { blanks: [{ answer: 'ß', alternatives: [] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 15,
                questionDe: 'Ergänze ß oder ss: Flu___',
                questionEn: 'Fill in ß or ss: Flu___',
                questionVi: 'Điền ß hoặc ss: Flu___',
                answerData: { blanks: [{ answer: 'ss', alternatives: ['SS'] }] },
                points: 1
            },

            // === Section C: Reorder / Matching (represented as reorder for simplicity or custom type) ===
            // Using reorder for spelling names
            {
                exerciseType: 'reorder',
                order: 16,
                questionDe: 'Ordne die Buchstaben: M-Ä-D-C-H-E-N',
                questionEn: 'Order the letters: M-Ä-D-C-H-E-N',
                questionVi: 'Sắp xếp chữ cái: M-Ä-D-C-H-E-N',
                answerData: { correctOrder: ['M', 'ä', 'd', 'c', 'h', 'e', 'n'] },
                points: 1
            },

            // === Section D: Translation (5 questions) ===
            {
                exerciseType: 'translate',
                order: 17,
                questionDe: 'Mutter',
                questionEn: 'Mutter',
                questionVi: 'Mutter',
                answerData: { acceptedAnswers: ['mother', 'mẹ'] },
                points: 1
            },
            {
                exerciseType: 'translate',
                order: 18,
                questionDe: 'Vater',
                questionEn: 'Vater',
                questionVi: 'Vater',
                answerData: { acceptedAnswers: ['father', 'bố', 'cha', 'ba'] },
                points: 1
            },

            // === Section E: Error Correction (5 questions) ===
            {
                exerciseType: 'error_correct',
                order: 19,
                questionDe: 'Korrigiere: Strase',
                questionEn: 'Correct: Strase',
                questionVi: 'Sửa lỗi: Strase',
                answerData: { correctedText: 'Straße' },
                explanation: { de: 'Use ß after long vowel', en: 'Use ß after long vowel', vi: 'Dùng ß sau nguyên âm dài' },
                points: 1
            },
            {
                exerciseType: 'error_correct',
                order: 20,
                questionDe: 'Korrigiere: schon (meaning beautiful)',
                questionEn: 'Correct: schon (meaning beautiful)',
                questionVi: 'Sửa lỗi: schon (nghĩa là đẹp)',
                answerData: { correctedText: 'schön' },
                points: 1
            }
        ]
    },
    // =================================================================
    // LESSON 2: PERSONAL PRONOUNS
    // =================================================================
    {
        slug: 'a1-l02-personal-pronouns',
        level: 'A1',
        lessonNumber: 2,
        titleDe: 'Personalpronomen',
        titleEn: 'Personal Pronouns',
        titleVi: 'Đại từ nhân xưng',
        objectives: {
            de: ['Ich, du, er/sie/es...', 'Du vs Sie unterscheiden'],
            en: ['I, you, he/she/it...', 'Distinguish du vs Sie'],
            vi: ['Nhận biết 7 đại từ', 'Phân biệt du và Sie']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Die Pronomen', en: 'The Pronouns', vi: 'Các đại từ' },
                    content: 'German pronouns change based on person and number.',
                    table: {
                        headers: ['Person', 'Singular', 'Plural'],
                        rows: [
                            ['1st', 'ich (I)', 'wir (we)'],
                            ['2nd (informal)', 'du (you)', 'ihr (you guys)'],
                            ['3rd', 'er/sie/es (he/she/it)', 'sie (they)'],
                            ['2nd (Formal)', 'Sie (You)', 'Sie (You)']
                        ]
                    }
                },
                {
                    title: { de: 'Du vs Sie', en: 'Du vs Sie', vi: 'Du và Sie' },
                    content: 'Du is informal (friends, family). Sie is formal (strangers, work).',
                    table: {
                        headers: ['Context', 'Pronoun'],
                        rows: [
                            ['Friend/Family', 'du'],
                            ['Stranger/Boss', 'Sie']
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            {
                exerciseType: 'mcq',
                order: 1,
                questionDe: 'Welches Pronomen für sich selbst?',
                questionEn: 'Which pronoun for yourself?',
                questionVi: 'Đại từ nào dùng cho bản thân?',
                answerData: { options: ['du', 'ich', 'er', 'wir'], correctIndex: 1 },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 2,
                questionDe: 'Mit Kunden spricht man per...',
                questionEn: 'With customers you use...',
                questionVi: 'Với khách hàng dùng...',
                answerData: { options: ['du', 'ihr', 'Sie', 'er'], correctIndex: 2 },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 3,
                questionDe: 'Ersetze "Peter": ___ ist Lehrer.',
                questionEn: 'Replace "Peter": ___ ist Lehrer.',
                questionVi: 'Thay thế "Peter": ___ ist Lehrer.',
                answerData: { options: ['sie', 'er', 'es', 'Sie'], correctIndex: 1 },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 4,
                questionDe: 'Ersetze "Das Kind": ___ spielt.',
                questionEn: 'Replace "Das Kind": ___ spielt.',
                questionVi: 'Thay thế "Das Kind": ___ spielt.',
                answerData: { options: ['sie', 'er', 'es', 'du'], correctIndex: 2 },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 5,
                questionDe: 'Welches Pronomen wird immer großgeschrieben?',
                questionEn: 'Which pronoun is always capitalized?',
                questionVi: 'Đại từ nào luôn viết hoa?',
                answerData: { options: ['ich', 'er', 'sie', 'Sie'], correctIndex: 3 },
                points: 1
            },
            // Fill blank
            {
                exerciseType: 'fill_blank',
                order: 6,
                questionDe: '___ bin Anna.',
                questionEn: '___ bin Anna.',
                questionVi: '___ bin Anna.',
                answerData: { blanks: [{ answer: 'Ich', alternatives: ['ich'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 7,
                questionDe: '___ bist nett.',
                questionEn: '___ bist nett.',
                questionVi: '___ bist nett.',
                answerData: { blanks: [{ answer: 'Du', alternatives: ['du'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 8,
                questionDe: '___ ist Lehrer. (He)',
                questionEn: '___ ist Lehrer. (He)',
                questionVi: '___ ist Lehrer. (Anh ấy)',
                answerData: { blanks: [{ answer: 'Er', alternatives: ['er'] }] },
                points: 1
            },
            // Reorder
            {
                exerciseType: 'reorder',
                order: 9,
                questionDe: 'Satzbau: bin / ich / Student',
                questionEn: 'Order: bin / ich / Student',
                questionVi: 'Xếp câu: bin / ich / Student',
                answerData: { correctOrder: ['Ich', 'bin', 'Student'] },
                points: 1
            },
            {
                exerciseType: 'reorder',
                order: 10,
                questionDe: 'Satzbau: ist / er / hier',
                questionEn: 'Order: ist / er / hier',
                questionVi: 'Xếp câu: ist / er / hier',
                answerData: { correctOrder: ['Er', 'ist', 'hier'] },
                points: 1
            },
            // Error correct
            {
                exerciseType: 'error_correct',
                order: 11,
                questionDe: 'Korrigiere: ich bin Anna (capitalize)',
                questionEn: 'Correct: ich bin Anna',
                questionVi: 'Sửa lỗi: ich bin Anna',
                answerData: { correctedText: 'Ich bin Anna' },
                points: 1
            },
            {
                exerciseType: 'error_correct',
                order: 12,
                questionDe: 'Korrigiere: Woher kommen du?',
                questionEn: 'Correct: Woher kommen du?',
                questionVi: 'Sửa lỗi: Woher kommen du?',
                answerData: { correctedText: 'Woher kommen Sie?' }, // Assuming formal context implied or grammar fix
                explanation: { de: 'kommen requires Sie or wir/sie', en: 'kommen requires Sie or wir/sie', vi: 'kommen đi với Sie/wir/sie' },
                points: 1
            }
        ]
    },
    // =================================================================
    // LESSON 3: VERB SEIN
    // =================================================================
    {
        slug: 'a1-l03-verb-sein',
        level: 'A1',
        lessonNumber: 3,
        titleDe: 'Das Verb "sein"',
        titleEn: 'The Verb "sein" (to be)',
        titleVi: 'Động từ "sein" (là)',
        objectives: {
            de: ['Konjugation von sein', 'Berufe und Nationalitäten'],
            en: ['Conjugation of sein', 'Professions and nationalities'],
            vi: ['Chia động từ sein', 'Nghề nghiệp và quốc tịch']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Konjugation', en: 'Conjugation', vi: 'Chia động từ' },
                    content: 'Sein is irregular.',
                    table: {
                        headers: ['Person', 'sein', 'Example'],
                        rows: [
                            ['ich', 'bin', 'Ich bin Student.'],
                            ['du', 'bist', 'Du bist nett.'],
                            ['er/sie/es', 'ist', 'Er ist Lehrer.'],
                            ['wir', 'sind', 'Wir sind Freunde.'],
                            ['ihr', 'seid', 'Ihr seid müde.'],
                            ['sie/Sie', 'sind', 'Sie sind hier.']
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            {
                exerciseType: 'mcq',
                order: 1,
                questionDe: 'Ich ___ Student.',
                questionEn: 'Ich ___ Student.',
                questionVi: 'Ich ___ Student.',
                answerData: { options: ['ist', 'bin', 'bist', 'sind'], correctIndex: 1 },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 2,
                questionDe: 'Ihr ___ aus Deutschland.',
                questionEn: 'Ihr ___ aus Deutschland.',
                questionVi: 'Ihr ___ aus Deutschland.',
                answerData: { options: ['ist', 'bin', 'seid', 'sind'], correctIndex: 2 },
                points: 1
            },
            {
                exerciseType: 'mcq',
                order: 3,
                questionDe: 'Das Buch ___ interessant.',
                questionEn: 'The book ___ interesting.',
                questionVi: 'Cuốn sách ___ thú vị.',
                answerData: { options: ['bin', 'bist', 'ist', 'sind'], correctIndex: 2 },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 4,
                questionDe: 'Ich ___ Anna.',
                questionEn: 'I ___ Anna.',
                questionVi: 'Tôi ___ Anna.',
                answerData: { blanks: [{ answer: 'bin', alternatives: ['Bin'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 5,
                questionDe: 'Du ___ müde.',
                questionEn: 'You ___ tired.',
                questionVi: 'Bạn ___ mệt.',
                answerData: { blanks: [{ answer: 'bist', alternatives: ['Bist'] }] },
                points: 1
            },
            {
                exerciseType: 'fill_blank',
                order: 6,
                questionDe: 'Wir ___ Freunde.',
                questionEn: 'We ___ friends.',
                questionVi: 'Chúng tôi ___ bạn.',
                answerData: { blanks: [{ answer: 'sind', alternatives: ['Sind'] }] },
                points: 1
            },
            {
                exerciseType: 'error_correct',
                order: 7,
                questionDe: 'Korrigiere: Ich bin ein Lehrer.',
                questionEn: 'Correct: Ich bin ein Lehrer.',
                questionVi: 'Sửa lỗi: Ich bin ein Lehrer.',
                answerData: { correctedText: 'Ich bin Lehrer' },
                explanation: { de: 'No article for professions', en: 'No article for professions', vi: 'Không dùng mạo từ cho nghề nghiệp' },
                points: 1
            },
            {
                exerciseType: 'error_correct',
                order: 8,
                questionDe: 'Korrigiere: Du ist nett.',
                questionEn: 'Correct: Du ist nett.',
                questionVi: 'Sửa lỗi: Du ist nett.',
                answerData: { correctedText: 'Du bist nett' },
                points: 1
            }
        ]
    }
];

async function main() {
    console.log('🌱 Seeding A1 Grammar Lessons...');

    for (const lesson of lessons) {
        console.log(`  Processing lesson: ${lesson.slug}...`);

        // Delete existing to avoid duplicates
        const exist = await prisma.grammarLesson.findUnique({ where: { slug: lesson.slug } });
        if (exist) {
            await prisma.grammarLesson.delete({ where: { slug: lesson.slug } });
        }

        // Create lesson
        await prisma.grammarLesson.create({
            data: {
                slug: lesson.slug,
                level: lesson.level,
                lessonNumber: lesson.lessonNumber,
                titleDe: lesson.titleDe,
                titleEn: lesson.titleEn,
                titleVi: lesson.titleVi,
                objectives: lesson.objectives,
                theoryContent: lesson.theoryContent,
                estimatedMinutes: lesson.estimatedMinutes,
                exercises: {
                    create: lesson.exercises.map(ex => ({
                        exerciseType: ex.exerciseType,
                        order: ex.order,
                        questionDe: ex.questionDe,
                        questionEn: ex.questionEn,
                        questionVi: ex.questionVi,
                        answerData: ex.answerData,
                        explanation: ex.explanation,
                        points: ex.points
                    }))
                }
            }
        });
    }

    console.log('✅ A1 Grammar Seeding Completed!');
}

main()
    .catch((e) => {
        console.error('❌ Error:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
