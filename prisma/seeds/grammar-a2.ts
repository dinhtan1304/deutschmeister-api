import { prisma } from './client';

const lessons = [
    // =================================================================
    // LEKTION 1: PERFEKT MIT "HABEN"
    // =================================================================
    {
        slug: 'a2-l01-perfekt-haben',
        level: 'A2',
        lessonNumber: 1,
        titleDe: 'Perfekt mit "haben"',
        titleEn: 'Present Perfect with "haben"',
        titleVi: 'Thì Perfekt với "haben"',
        objectives: {
            de: ['Partizip II regelmäßiger Verben bilden (ge-...-t)', 'Partizip II unregelmäßiger Verben lernen', 'Perfekt mit "haben" korrekt verwenden', 'Über vergangene Ereignisse sprechen'],
            en: ['Form Partizip II of regular verbs (ge-...-t)', 'Learn Partizip II of irregular verbs', 'Use Perfekt with "haben" correctly', 'Talk about past events'],
            vi: ['Tạo Partizip II của động từ có quy tắc (ge-...-t)', 'Học Partizip II của động từ bất quy tắc', 'Dùng Perfekt với "haben" đúng cách', 'Nói về các sự kiện trong quá khứ']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Bildung des Perfekts', en: 'Forming the Perfect Tense', vi: 'Cách tạo thì Perfekt' },
                    content: 'The Perfekt is formed with haben/sein + Partizip II. Most verbs use haben. Structure: Subject + haben (conjugated) + ... + Partizip II (at the end).',
                    table: {
                        headers: ['Person', 'haben', 'Beispiel'],
                        rows: [
                            ['ich', 'habe', 'Ich habe gespielt.'],
                            ['du', 'hast', 'Du hast gegessen.'],
                            ['er/sie/es', 'hat', 'Er hat gekauft.'],
                            ['wir', 'haben', 'Wir haben gelernt.'],
                            ['ihr', 'habt', 'Ihr habt getrunken.'],
                            ['sie/Sie', 'haben', 'Sie haben geschrieben.'],
                        ]
                    }
                },
                {
                    title: { de: 'Partizip II: Regelmäßige Verben', en: 'Partizip II: Regular Verbs', vi: 'Partizip II: Động từ có quy tắc' },
                    content: 'Regular verbs: ge- + stem + -t. Verbs ending in -ieren: no ge- prefix.',
                    table: {
                        headers: ['Infinitiv', 'Partizip II', 'Bedeutung (vi)'],
                        rows: [
                            ['spielen', 'gespielt', 'chơi'],
                            ['kaufen', 'gekauft', 'mua'],
                            ['lernen', 'gelernt', 'học'],
                            ['machen', 'gemacht', 'làm'],
                            ['arbeiten', 'gearbeitet', 'làm việc'],
                            ['studieren', 'studiert', 'học đại học'],
                            ['telefonieren', 'telefoniert', 'gọi điện'],
                        ]
                    }
                },
                {
                    title: { de: 'Partizip II: Unregelmäßige Verben', en: 'Partizip II: Irregular Verbs', vi: 'Partizip II: Động từ bất quy tắc' },
                    content: 'Irregular verbs have unpredictable Partizip II forms. These must be memorized.',
                    table: {
                        headers: ['Infinitiv', 'Partizip II', 'Bedeutung (vi)'],
                        rows: [
                            ['essen', 'gegessen', 'ăn'],
                            ['trinken', 'getrunken', 'uống'],
                            ['schreiben', 'geschrieben', 'viết'],
                            ['lesen', 'gelesen', 'đọc'],
                            ['sehen', 'gesehen', 'nhìn/xem'],
                            ['nehmen', 'genommen', 'lấy'],
                            ['sprechen', 'gesprochen', 'nói'],
                            ['finden', 'gefunden', 'tìm thấy'],
                            ['helfen', 'geholfen', 'giúp đỡ'],
                            ['treffen', 'getroffen', 'gặp'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            // MCQ (8)
            { exerciseType: 'mcq', order: 1, questionDe: 'Was ist das Partizip II von "spielen"?', questionEn: 'What is the Partizip II of "spielen"?', questionVi: 'Partizip II của "spielen" là gì?', answerData: { options: ['gespielt', 'gespielen', 'spielte', 'gespelen'], correctIndex: 0 }, explanation: { de: 'Regelmäßig: ge- + spiel + -t = gespielt', en: 'Regular: ge- + spiel + -t = gespielt', vi: 'Có quy tắc: ge- + spiel + -t = gespielt' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Was ist das Partizip II von "essen"?', questionEn: 'What is the Partizip II of "essen"?', questionVi: 'Partizip II của "essen" là gì?', answerData: { options: ['gegessen', 'geessen', 'esste', 'gessen'], correctIndex: 0 }, explanation: { de: 'Unregelmäßig: gegessen', en: 'Irregular: gegessen', vi: 'Bất quy tắc: gegessen' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Wähle die richtige Perfektform: "Er ___ Fußball ___."', questionEn: 'Choose the correct Perfekt: "Er ___ Fußball ___."', questionVi: 'Chọn dạng Perfekt đúng: "Er ___ Fußball ___."', answerData: { options: ['hat / gespielt', 'ist / gespielt', 'hat / spielte', 'hatte / gespielt'], correctIndex: 0 }, explanation: { de: 'spielen → hat + gespielt', en: 'spielen → hat + gespielt', vi: 'spielen → hat + gespielt' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Was ist das Partizip II von "studieren"?', questionEn: 'What is the Partizip II of "studieren"?', questionVi: 'Partizip II của "studieren" là gì?', answerData: { options: ['studiert', 'gestudiert', 'studierte', 'gestudiert'], correctIndex: 0 }, explanation: { de: 'Verben auf -ieren bilden kein ge-: studiert', en: 'Verbs ending in -ieren have no ge-: studiert', vi: 'Động từ -ieren không có ge-: studiert' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Was ist das Partizip II von "schreiben"?', questionEn: 'What is the Partizip II of "schreiben"?', questionVi: 'Partizip II của "schreiben" là gì?', answerData: { options: ['geschrieben', 'geschreibt', 'geschrieben', 'schrieb'], correctIndex: 0 }, explanation: { de: 'Unregelmäßig: geschrieben', en: 'Irregular: geschrieben', vi: 'Bất quy tắc: geschrieben' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Wie lautet das Perfekt von "Wir trinken Wasser"?', questionEn: 'What is the Perfekt of "Wir trinken Wasser"?', questionVi: 'Perfekt của "Wir trinken Wasser" là gì?', answerData: { options: ['Wir haben Wasser getrunken.', 'Wir sind Wasser getrunken.', 'Wir haben Wasser trinkt.', 'Wir hatten Wasser getrunken.'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Was ist das Partizip II von "arbeiten"?', questionEn: 'What is the Partizip II of "arbeiten"?', questionVi: 'Partizip II của "arbeiten" là gì?', answerData: { options: ['gearbeitet', 'gearbeit', 'gearbeite', 'arbeitete'], correctIndex: 0 }, explanation: { de: 'Stamm endet auf -t: ge + arbeit + et = gearbeitet', en: 'Stem ends in -t: ge + arbeit + et = gearbeitet', vi: 'Gốc tận cùng bằng -t: ge + arbeit + et = gearbeitet' }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Ich ___ einen Film ___." Welche Formen passen?', questionEn: '"I ___ a film ___." Which forms fit?', questionVi: '"Tôi ___ một bộ phim ___." Dạng nào phù hợp?', answerData: { options: ['habe / gesehen', 'bin / gesehen', 'habe / sehe', 'hatte / gesehen'], correctIndex: 0 }, points: 1 },
            // Fill blank (7)
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich ___ heute viel ___ (lernen).', questionEn: 'I ___ a lot today (learn).', questionVi: 'Tôi đã học rất nhiều hôm nay.', answerData: { blanks: [{ answer: 'habe', alternatives: [] }, { answer: 'gelernt', alternatives: [] }] }, explanation: { de: 'lernen → habe + gelernt', en: 'lernen → habe + gelernt', vi: 'lernen → habe + gelernt' }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Wir ___ gestern Pizza ___ (essen).', questionEn: 'We ___ pizza yesterday (eat).', questionVi: 'Chúng tôi đã ăn pizza hôm qua.', answerData: { blanks: [{ answer: 'haben', alternatives: [] }, { answer: 'gegessen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Er ___ einen Brief ___ (schreiben).', questionEn: 'He ___ a letter (write).', questionVi: 'Anh ấy đã viết một bức thư.', answerData: { blanks: [{ answer: 'hat', alternatives: [] }, { answer: 'geschrieben', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Sie ___ an der Universität ___ (studieren).', questionEn: 'She ___ at the university (study).', questionVi: 'Cô ấy đã học ở đại học.', answerData: { blanks: [{ answer: 'hat', alternatives: [] }, { answer: 'studiert', alternatives: [] }] }, explanation: { de: '-ieren-Verben: kein ge-', en: '-ieren verbs: no ge-', vi: 'Động từ -ieren: không có ge-' }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ihr ___ sehr laut ___ (sprechen).', questionEn: 'You all ___ very loudly (speak).', questionVi: 'Các bạn đã nói rất to.', answerData: { blanks: [{ answer: 'habt', alternatives: [] }, { answer: 'gesprochen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Ich ___ meine Schlüssel nicht ___ (finden).', questionEn: 'I ___ my keys (not find).', questionVi: 'Tôi đã không tìm thấy chìa khóa của mình.', answerData: { blanks: [{ answer: 'habe', alternatives: [] }, { answer: 'gefunden', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Du ___ mir sehr ___ (helfen).', questionEn: 'You ___ me a lot (help).', questionVi: 'Bạn đã giúp tôi rất nhiều.', answerData: { blanks: [{ answer: 'hast', alternatives: [] }, { answer: 'geholfen', alternatives: [] }] }, points: 1 },
            // Reorder (4)
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'hat', 'gestern', 'Fußball', 'gespielt.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wir', 'haben', 'einen', 'Film', 'gesehen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'hat', 'das', 'Buch', 'gelesen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'habe', 'meinen', 'Freund', 'getroffen.'] }, points: 1 },
            // Error correct (3)
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Er hat das Buch gelest.', questionEn: 'Correct: Er hat das Buch gelest.', questionVi: 'Sửa lỗi: Er hat das Buch gelest.', answerData: { correctedText: 'Er hat das Buch gelesen.' }, explanation: { de: 'lesen → gelesen (unregelmäßig)', en: 'lesen → gelesen (irregular)', vi: 'lesen → gelesen (bất quy tắc)' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich habe studiert Deutsch an der Uni.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Ich habe Deutsch an der Uni studiert.' }, explanation: { de: 'Partizip II steht am Ende des Satzes.', en: 'Partizip II goes to the end of the sentence.', vi: 'Partizip II đứng ở cuối câu.' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Wir haben gespielt Fußball gestern.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Wir haben gestern Fußball gespielt.' }, explanation: { de: 'Partizip II immer ans Ende.', en: 'Partizip II always at the end.', vi: 'Partizip II luôn ở cuối.' }, points: 1 },
            // Translate (3)
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi đã uống cà phê sáng nay.', questionEn: 'I drank coffee this morning.', answerData: { acceptedAnswers: ['Ich habe heute Morgen Kaffee getrunken.', 'Ich habe heute morgen Kaffee getrunken.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Cô ấy đã mua một chiếc áo mới.', questionEn: 'She bought a new shirt.', answerData: { acceptedAnswers: ['Sie hat ein neues Hemd gekauft.', 'Sie hat eine neue Bluse gekauft.', 'Sie hat ein neues Shirt gekauft.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Chúng tôi đã làm bài tập về nhà.', questionEn: 'We did the homework.', answerData: { acceptedAnswers: ['Wir haben die Hausaufgaben gemacht.', 'Wir haben Hausaufgaben gemacht.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 2: PERFEKT MIT "SEIN"
    // =================================================================
    {
        slug: 'a2-l02-perfekt-sein',
        level: 'A2',
        lessonNumber: 2,
        titleDe: 'Perfekt mit "sein"',
        titleEn: 'Present Perfect with "sein"',
        titleVi: 'Thì Perfekt với "sein"',
        objectives: {
            de: ['Verben mit "sein" im Perfekt kennen', 'Bewegungsverben und Zustandsänderungen identifizieren', 'Perfekt mit "sein" korrekt bilden', 'haben vs. sein unterscheiden'],
            en: ['Know verbs using "sein" in Perfekt', 'Identify movement and state-change verbs', 'Form Perfekt with "sein" correctly', 'Distinguish haben vs. sein'],
            vi: ['Biết các động từ dùng "sein" trong Perfekt', 'Nhận biết động từ chuyển động và thay đổi trạng thái', 'Tạo Perfekt với "sein" đúng cách', 'Phân biệt haben và sein']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Perfekt mit "sein"', en: 'Perfect with "sein"', vi: 'Perfekt với "sein"' },
                    content: 'Some verbs use "sein" instead of "haben". These are mainly: 1) Verbs of movement/direction, 2) Verbs of change of state, 3) sein, bleiben, passieren.',
                    table: {
                        headers: ['Person', 'sein', 'Beispiel'],
                        rows: [
                            ['ich', 'bin', 'Ich bin gegangen.'],
                            ['du', 'bist', 'Du bist gefahren.'],
                            ['er/sie/es', 'ist', 'Er ist gekommen.'],
                            ['wir', 'sind', 'Wir sind geflogen.'],
                            ['ihr', 'seid', 'Ihr seid geblieben.'],
                            ['sie/Sie', 'sind', 'Sie sind angekommen.'],
                        ]
                    }
                },
                {
                    title: { de: 'Verben mit "sein"', en: 'Verbs with "sein"', vi: 'Các động từ dùng "sein"' },
                    content: 'Movement verbs (Wohin?) and state-change verbs always use sein in Perfekt.',
                    table: {
                        headers: ['Infinitiv', 'Partizip II', 'Bedeutung (vi)', 'Typ'],
                        rows: [
                            ['gehen', 'gegangen', 'đi bộ', 'Bewegung'],
                            ['fahren', 'gefahren', 'lái xe/đi', 'Bewegung'],
                            ['kommen', 'gekommen', 'đến', 'Bewegung'],
                            ['fliegen', 'geflogen', 'bay', 'Bewegung'],
                            ['laufen', 'gelaufen', 'chạy/đi bộ', 'Bewegung'],
                            ['reisen', 'gereist', 'du lịch', 'Bewegung'],
                            ['ankommen', 'angekommen', 'đến nơi', 'Bewegung'],
                            ['werden', 'geworden', 'trở thành', 'Zustandsänderung'],
                            ['aufwachen', 'aufgewacht', 'thức dậy', 'Zustandsänderung'],
                            ['einschlafen', 'eingeschlafen', 'ngủ thiếp đi', 'Zustandsänderung'],
                            ['sein', 'gewesen', 'là/ở', 'Sonderfall'],
                            ['bleiben', 'geblieben', 'ở lại', 'Sonderfall'],
                            ['passieren', 'passiert', 'xảy ra', 'Sonderfall'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            // MCQ (8)
            { exerciseType: 'mcq', order: 1, questionDe: '"fahren" bildet Perfekt mit...', questionEn: '"fahren" forms Perfekt with...', questionVi: '"fahren" tạo Perfekt với...', answerData: { options: ['sein', 'haben', 'werden', 'bleiben'], correctIndex: 0 }, explanation: { de: 'Bewegungsverb → sein: ist gefahren', en: 'Movement verb → sein: ist gefahren', vi: 'Động từ chuyển động → sein: ist gefahren' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"kaufen" bildet Perfekt mit...', questionEn: '"kaufen" forms Perfekt with...', questionVi: '"kaufen" tạo Perfekt với...', answerData: { options: ['haben', 'sein', 'werden', 'bleiben'], correctIndex: 0 }, explanation: { de: 'kaufen = kein Bewegungsverb → haben', en: 'kaufen is not a movement verb → haben', vi: 'kaufen không phải động từ chuyển động → haben' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Wähle die richtige Form: "Sie ___ nach Berlin ___."', questionEn: 'Choose the correct form: "She ___ to Berlin ___."', questionVi: 'Chọn dạng đúng: "Cô ấy ___ đến Berlin ___."', answerData: { options: ['ist / gefahren', 'hat / gefahren', 'ist / gefahrt', 'hat / fahren'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"bleiben" bildet Perfekt mit...', questionEn: '"bleiben" forms Perfekt with...', questionVi: '"bleiben" tạo Perfekt với...', answerData: { options: ['sein', 'haben', 'werden', 'lassen'], correctIndex: 0 }, explanation: { de: 'bleiben → ist geblieben (Sonderfall)', en: 'bleiben → ist geblieben (special case)', vi: 'bleiben → ist geblieben (trường hợp đặc biệt)' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Perfekt von "Er wird Arzt.":  ', questionEn: 'Perfekt of "Er wird Arzt.":  ', questionVi: 'Perfekt của "Er wird Arzt.":  ', answerData: { options: ['Er ist Arzt geworden.', 'Er hat Arzt geworden.', 'Er ist Arzt worden.', 'Er hat Arzt wurde.'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Welches Verb bildet Perfekt mit HABEN?', questionEn: 'Which verb forms Perfekt with HABEN?', questionVi: 'Động từ nào tạo Perfekt với HABEN?', answerData: { options: ['schreiben', 'gehen', 'fliegen', 'ankommen'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Perfekt von "Ich schlafe ein.":  ', questionEn: 'Perfekt of "I fall asleep.":  ', questionVi: 'Perfekt của "Tôi ngủ thiếp đi.":  ', answerData: { options: ['Ich bin eingeschlafen.', 'Ich habe eingeschlafen.', 'Ich bin einschlaft.', 'Ich habe einschlafen.'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Wir ___ in Paris ___." (sein)', questionEn: '"We ___ in Paris ___." (been)', questionVi: '"Chúng tôi ___ ở Paris ___." (ở)', answerData: { options: ['sind / gewesen', 'haben / gewesen', 'sind / gesein', 'haben / sein'], correctIndex: 0 }, points: 1 },
            // Fill blank (7)
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich ___ gestern in die Schule ___ (gehen).', questionEn: 'I ___ to school yesterday (go).', questionVi: 'Tôi đã đi đến trường hôm qua.', answerData: { blanks: [{ answer: 'bin', alternatives: [] }, { answer: 'gegangen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Er ___ um 8 Uhr ___ (aufwachen).', questionEn: 'He ___ at 8 o\'clock (wake up).', questionVi: 'Anh ấy đã thức dậy lúc 8 giờ.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }, { answer: 'aufgewacht', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Wir ___ letzten Sommer nach Deutschland ___ (reisen).', questionEn: 'We ___ to Germany last summer (travel).', questionVi: 'Chúng tôi đã đi du lịch đến Đức mùa hè vừa rồi.', answerData: { blanks: [{ answer: 'sind', alternatives: [] }, { answer: 'gereist', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Das Kind ___ schnell ___ (laufen).', questionEn: 'The child ___ quickly (run).', questionVi: 'Đứa trẻ đã chạy nhanh.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }, { answer: 'gelaufen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Sie ___ Lehrerin ___ (werden).', questionEn: 'She ___ a teacher (become).', questionVi: 'Cô ấy đã trở thành giáo viên.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }, { answer: 'geworden', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Der Zug ___ pünktlich ___ (ankommen).', questionEn: 'The train ___ on time (arrive).', questionVi: 'Tàu đã đến đúng giờ.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }, { answer: 'angekommen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Ihr ___ lange im Hotel ___ (bleiben).', questionEn: 'You all ___ at the hotel for a long time (stay).', questionVi: 'Các bạn đã ở lại khách sạn lâu.', answerData: { blanks: [{ answer: 'seid', alternatives: [] }, { answer: 'geblieben', alternatives: [] }] }, points: 1 },
            // Reorder (4)
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'ist', 'gestern', 'nach', 'Hause', 'gegangen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'ist', 'mit', 'dem', 'Zug', 'gefahren.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wir', 'sind', 'nach', 'Berlin', 'geflogen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Das', 'Baby', 'ist', 'eingeschlafen.'] }, points: 1 },
            // Error correct (3)
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Ich habe nach Berlin gefahren.', questionEn: 'Correct: Ich habe nach Berlin gefahren.', questionVi: 'Sửa lỗi: Ich habe nach Berlin gefahren.', answerData: { correctedText: 'Ich bin nach Berlin gefahren.' }, explanation: { de: 'fahren = Bewegungsverb → sein', en: 'fahren = movement verb → sein', vi: 'fahren = động từ chuyển động → sein' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Er ist Arzt gewerdet.', questionEn: 'Correct: Er ist Arzt gewerdet.', questionVi: 'Sửa lỗi: Er ist Arzt gewerdet.', answerData: { correctedText: 'Er ist Arzt geworden.' }, explanation: { de: 'werden → geworden (unregelmäßig)', en: 'werden → geworden (irregular)', vi: 'werden → geworden (bất quy tắc)' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Wir haben in Hamburg geblieben.', questionEn: 'Correct: Wir haben in Hamburg geblieben.', questionVi: 'Sửa lỗi: Wir haben in Hamburg geblieben.', answerData: { correctedText: 'Wir sind in Hamburg geblieben.' }, explanation: { de: 'bleiben → sein + geblieben', en: 'bleiben → sein + geblieben', vi: 'bleiben → sein + geblieben' }, points: 1 },
            // Translate (3)
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi đã đến muộn.', questionEn: 'I arrived late.', answerData: { acceptedAnswers: ['Ich bin zu spät gekommen.', 'Ich bin spät angekommen.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Anh ấy đã bay đến Paris.', questionEn: 'He flew to Paris.', answerData: { acceptedAnswers: ['Er ist nach Paris geflogen.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Các em đã chạy đến trường.', questionEn: 'They ran to school.', answerData: { acceptedAnswers: ['Sie sind zur Schule gelaufen.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 3: PRÄTERITUM
    // =================================================================
    {
        slug: 'a2-l03-praeteritum',
        level: 'A2',
        lessonNumber: 3,
        titleDe: 'Präteritum',
        titleEn: 'Simple Past (Präteritum)',
        titleVi: 'Quá khứ đơn (Präteritum)',
        objectives: {
            de: ['Präteritum von "sein" und "haben" bilden', 'Präteritum der Modalverben kennen', 'Unterschied Perfekt vs. Präteritum verstehen', 'Einfache Texte im Präteritum lesen'],
            en: ['Form Präteritum of "sein" and "haben"', 'Know Präteritum of modal verbs', 'Understand difference Perfekt vs. Präteritum', 'Read simple texts in Präteritum'],
            vi: ['Chia động từ sein/haben ở Präteritum', 'Học Präteritum của Modal verbs', 'Hiểu sự khác biệt Perfekt vs. Präteritum', 'Đọc văn bản đơn giản ở Präteritum']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Präteritum von "sein" und "haben"', en: 'Präteritum of "sein" and "haben"', vi: 'Präteritum của "sein" và "haben"' },
                    content: 'In spoken German, sein and haben are often used in Präteritum (not Perfekt). They are irregular.',
                    table: {
                        headers: ['Person', 'sein (war)', 'haben (hatte)'],
                        rows: [
                            ['ich', 'war', 'hatte'],
                            ['du', 'warst', 'hattest'],
                            ['er/sie/es', 'war', 'hatte'],
                            ['wir', 'waren', 'hatten'],
                            ['ihr', 'wart', 'hattet'],
                            ['sie/Sie', 'waren', 'hatten'],
                        ]
                    }
                },
                {
                    title: { de: 'Präteritum der Modalverben', en: 'Präteritum of Modal Verbs', vi: 'Präteritum của Modal verbs' },
                    content: 'Modal verbs are commonly used in Präteritum in both written and spoken German.',
                    table: {
                        headers: ['Infinitiv', 'Präteritum (ich/er)', 'Bedeutung (vi)'],
                        rows: [
                            ['müssen', 'musste', 'phải'],
                            ['können', 'konnte', 'có thể'],
                            ['wollen', 'wollte', 'muốn'],
                            ['sollen', 'sollte', 'nên/được yêu cầu'],
                            ['dürfen', 'durfte', 'được phép'],
                            ['mögen', 'mochte', 'thích'],
                        ]
                    }
                },
                {
                    title: { de: 'Perfekt vs. Präteritum', en: 'Perfekt vs. Präteritum', vi: 'Perfekt vs. Präteritum' },
                    content: 'Use Perfekt in spoken German for most verbs. Use Präteritum in written texts (stories, newspapers) and always for sein, haben, and modals.',
                    table: {
                        headers: ['Situation', 'Verwende', 'Beispiel'],
                        rows: [
                            ['Mündlich (Alltag)', 'Perfekt', '"Ich habe gegessen."'],
                            ['Schriftlich (Erzählung)', 'Präteritum', '"Er aß und trank."'],
                            ['sein/haben (immer)', 'Präteritum', '"Ich war müde."'],
                            ['Modalverben (oft)', 'Präteritum', '"Sie konnte nicht kommen."'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            // MCQ (8)
            { exerciseType: 'mcq', order: 1, questionDe: 'Präteritum von "sein" (ich):  ', questionEn: 'Präteritum of "sein" (I):  ', questionVi: 'Präteritum của "sein" (tôi):  ', answerData: { options: ['war', 'bin', 'wurde', 'sei'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Präteritum von "haben" (wir):  ', questionEn: 'Präteritum of "haben" (we):  ', questionVi: 'Präteritum của "haben" (chúng tôi):  ', answerData: { options: ['hatten', 'habt', 'haben', 'hätten'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Präteritum von "müssen" (er):  ', questionEn: 'Präteritum of "müssen" (he):  ', questionVi: 'Präteritum của "müssen" (anh ấy):  ', answerData: { options: ['musste', 'muss', 'müsste', 'gemüsst'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Präteritum von "können" (sie, Pl.):  ', questionEn: 'Präteritum of "können" (they):  ', questionVi: 'Präteritum của "können" (họ):  ', answerData: { options: ['konnten', 'können', 'konntet', 'könnten'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Wähle: "Gestern ___ ich sehr müde."', questionEn: 'Choose: "Yesterday I ___ very tired."', questionVi: 'Chọn: "Hôm qua tôi ___ rất mệt."', answerData: { options: ['war', 'bin', 'wurde', 'wäre'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Wähle: "Sie ___ keine Zeit."', questionEn: 'Choose: "She ___ no time."', questionVi: 'Chọn: "Cô ấy ___ không có thời gian."', answerData: { options: ['hatte', 'hat', 'habe', 'hätte'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Präteritum von "wollen" (du):  ', questionEn: 'Präteritum of "wollen" (you):  ', questionVi: 'Präteritum của "wollen" (bạn):  ', answerData: { options: ['wolltest', 'wollst', 'wolltest', 'wolltet'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Wir ___ gestern nicht schlafen." (können)', questionEn: '"We ___ not sleep yesterday." (be able to)', questionVi: '"Chúng tôi ___ không ngủ được hôm qua." (können)', answerData: { options: ['konnten', 'können', 'konnte', 'konntet'], correctIndex: 0 }, points: 1 },
            // Fill blank (7)
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Als Kind ___ ich sehr glücklich.', questionEn: 'As a child, I ___ very happy.', questionVi: 'Khi còn nhỏ, tôi ___ rất hạnh phúc.', answerData: { blanks: [{ answer: 'war', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Wir ___ gestern keine Zeit.', questionEn: 'We ___ no time yesterday.', questionVi: 'Chúng tôi ___ không có thời gian hôm qua.', answerData: { blanks: [{ answer: 'hatten', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Er ___ früh aufstehen. (müssen)', questionEn: 'He ___ get up early. (must)', questionVi: 'Anh ấy ___ phải dậy sớm.', answerData: { blanks: [{ answer: 'musste', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Die Kinder ___ nicht draußen spielen. (dürfen)', questionEn: 'The children ___ not play outside. (allowed)', questionVi: 'Những đứa trẻ ___ không được phép chơi ngoài trời.', answerData: { blanks: [{ answer: 'durften', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich ___ nach Hause gehen. (wollen)', questionEn: 'I ___ to go home. (want)', questionVi: 'Tôi ___ muốn về nhà.', answerData: { blanks: [{ answer: 'wollte', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Ihr ___ alle sehr laut. (sein)', questionEn: 'You all ___ very loud. (be)', questionVi: 'Các bạn ___ rất ồn ào.', answerData: { blanks: [{ answer: 'wart', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Sie ___ Klavierspielerin werden. (wollen)', questionEn: 'She ___ to become a pianist. (want)', questionVi: 'Cô ấy ___ muốn trở thành nghệ sĩ piano.', answerData: { blanks: [{ answer: 'wollte', alternatives: [] }] }, points: 1 },
            // Reorder (4)
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Gestern', 'war', 'ich', 'sehr', 'müde.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'konnte', 'nicht', 'kommen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wir', 'hatten', 'keine', 'Zeit.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'musste', 'früh', 'aufstehen.'] }, points: 1 },
            // Error correct (3)
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Gestern ich war krank.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Gestern war ich krank.' }, explanation: { de: 'Verb-Zweitstellung: Verb muss an Position 2.', en: 'Verb-second rule: verb must be in position 2.', vi: 'Quy tắc V2: động từ phải ở vị trí 2.' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Er hatte nicht kommen können.', questionEn: 'Correct: Er musste nach Hause gehen. → Präteritum', questionVi: 'Sửa lỗi: Wir mussten früh aufstehen.', answerData: { correctedText: 'Er konnte nicht kommen.' }, explanation: { de: 'Modalverb im Präteritum ohne Hilfsverb', en: 'Modal verb in Präteritum needs no auxiliary', vi: 'Modal verb ở Präteritum không cần động từ phụ' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Ich bin gestern müde geworden war.', questionEn: 'Correct the form.', questionVi: 'Sửa lỗi dạng động từ.', answerData: { correctedText: 'Ich war gestern müde.' }, explanation: { de: 'sein → einfach Präteritum: war', en: 'sein → simple Präteritum: war', vi: 'sein → Präteritum đơn giản: war' }, points: 1 },
            // Translate (3)
            { exerciseType: 'translate', order: 23, questionVi: 'Hôm qua tôi phải đi làm.', questionEn: 'Yesterday I had to go to work.', answerData: { acceptedAnswers: ['Gestern musste ich arbeiten gehen.', 'Gestern musste ich zur Arbeit gehen.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Họ muốn đến Đức.', questionEn: 'They wanted to go to Germany.', answerData: { acceptedAnswers: ['Sie wollten nach Deutschland gehen.', 'Sie wollten nach Deutschland fahren.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Khi còn nhỏ tôi không thể bơi.', questionEn: 'As a child, I couldn\'t swim.', answerData: { acceptedAnswers: ['Als Kind konnte ich nicht schwimmen.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 4: KOMPARATIV & SUPERLATIV
    // =================================================================
    {
        slug: 'a2-l04-komparativ',
        level: 'A2',
        lessonNumber: 4,
        titleDe: 'Komparativ und Superlativ',
        titleEn: 'Comparative and Superlative',
        titleVi: 'So sánh hơn và So sánh nhất',
        objectives: {
            de: ['Komparativ bilden (-er)', 'Superlativ bilden (am -sten / der/die/das -ste)', 'Unregelmäßige Formen lernen (gut, viel, gern)', 'Vergleichssätze mit "als" und "wie" bilden'],
            en: ['Form comparative (-er)', 'Form superlative (am -sten / der/die/das -ste)', 'Learn irregular forms (gut, viel, gern)', 'Build comparison sentences with "als" and "wie"'],
            vi: ['Tạo so sánh hơn (-er)', 'Tạo so sánh nhất (am -sten / der/die/das -ste)', 'Học các dạng bất quy tắc (gut, viel, gern)', 'Tạo câu so sánh với "als" và "wie"']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Grundstufe → Komparativ → Superlativ', en: 'Positive → Comparative → Superlative', vi: 'Gốc → So sánh hơn → So sánh nhất' },
                    content: 'Komparativ: adjektiv + -er. Superlativ: am + adjektiv + -sten (adverb) or der/die/das + adjektiv + -ste (attributive).',
                    table: {
                        headers: ['Grundstufe', 'Komparativ', 'Superlativ (am)', 'Bedeutung (vi)'],
                        rows: [
                            ['klein', 'kleiner', 'am kleinsten', 'nhỏ'],
                            ['groß', 'größer', 'am größten', 'lớn/cao'],
                            ['alt', 'älter', 'am ältesten', 'già/cũ'],
                            ['jung', 'jünger', 'am jüngsten', 'trẻ'],
                            ['schnell', 'schneller', 'am schnellsten', 'nhanh'],
                            ['lang', 'länger', 'am längsten', 'dài'],
                            ['kalt', 'kälter', 'am kältesten', 'lạnh'],
                            ['warm', 'wärmer', 'am wärmsten', 'ấm'],
                        ]
                    }
                },
                {
                    title: { de: 'Unregelmäßige Formen', en: 'Irregular Forms', vi: 'Các dạng bất quy tắc' },
                    content: 'Some adjectives/adverbs have completely irregular comparative and superlative forms.',
                    table: {
                        headers: ['Grundstufe', 'Komparativ', 'Superlativ', 'Bedeutung (vi)'],
                        rows: [
                            ['gut', 'besser', 'am besten', 'tốt'],
                            ['viel', 'mehr', 'am meisten', 'nhiều'],
                            ['gern', 'lieber', 'am liebsten', 'thích'],
                            ['hoch', 'höher', 'am höchsten', 'cao'],
                            ['nah', 'näher', 'am nächsten', 'gần'],
                        ]
                    }
                },
                {
                    title: { de: 'Vergleichssätze', en: 'Comparison Sentences', vi: 'Câu so sánh' },
                    content: 'Use "als" for unequal comparisons (comparative) and "so...wie" for equal comparisons.',
                    table: {
                        headers: ['Vergleich', 'Struktur', 'Beispiel'],
                        rows: [
                            ['Ungleich (mehr)', 'A + Komparativ + als + B', 'Er ist größer als sie.'],
                            ['Gleich', 'A + so + Grundstufe + wie + B', 'Er ist so groß wie sie.'],
                            ['Superlativ', 'A + Superlativ + von/unter', 'Er ist der Größte von allen.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 25,
        exercises: [
            // MCQ (8)
            { exerciseType: 'mcq', order: 1, questionDe: 'Komparativ von "gut":  ', questionEn: 'Comparative of "gut":  ', questionVi: 'So sánh hơn của "gut":  ', answerData: { options: ['besser', 'guter', 'mehr gut', 'am besten'], correctIndex: 0 }, explanation: { de: 'gut → besser (unregelmäßig)', en: 'gut → besser (irregular)', vi: 'gut → besser (bất quy tắc)' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Superlativ von "viel":  ', questionEn: 'Superlative of "viel":  ', questionVi: 'So sánh nhất của "viel":  ', answerData: { options: ['am meisten', 'am vielen', 'mehrst', 'am mehrsten'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Berlin ist ___ als Hamburg." (groß)', questionEn: '"Berlin is ___ than Hamburg." (big)', questionVi: '"Berlin ___ hơn Hamburg." (lớn)', answerData: { options: ['größer', 'großer', 'am größten', 'große'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Superlativ von "alt" (Adverb):  ', questionEn: 'Superlative of "alt" (adverb):  ', questionVi: 'So sánh nhất của "alt" (trạng từ):  ', answerData: { options: ['am ältesten', 'am alten', 'älteste', 'am altest'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Er singt ___ als ich." (gut)', questionEn: '"He sings ___ than me." (well)', questionVi: '"Anh ấy hát ___ hơn tôi." (tốt)', answerData: { options: ['besser', 'mehr gut', 'am besten', 'gut'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Wähle richtig: "Er ist ___ sein Bruder."', questionEn: 'Choose correctly: "He is as tall as his brother."', questionVi: 'Chọn đúng: "Anh ấy cao bằng anh trai."', answerData: { options: ['so groß wie', 'größer als', 'am größten wie', 'so groß als'], correctIndex: 0 }, explanation: { de: 'Gleichheit: so + Adj + wie', en: 'Equality: so + adj + wie', vi: 'Bằng nhau: so + tính từ + wie' }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Komparativ von "hoch":  ', questionEn: 'Comparative of "hoch":  ', questionVi: 'So sánh hơn của "hoch":  ', answerData: { options: ['höher', 'hocher', 'am höchsten', 'hochst'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Ich esse ___ Obst als Gemüse." (gern)', questionEn: '"I prefer fruit to vegetables."', questionVi: '"Tôi thích ăn hoa quả hơn rau."', answerData: { options: ['lieber', 'mehr gern', 'am liebsten', 'gerner'], correctIndex: 0 }, points: 1 },
            // Fill blank (7)
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Dieses Auto ist ___ als jenes. (schnell)', questionEn: 'This car is ___ than that one. (fast)', questionVi: 'Chiếc xe này nhanh hơn chiếc kia.', answerData: { blanks: [{ answer: 'schneller', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Er ist der ___ Schüler in der Klasse. (gut)', questionEn: 'He is the ___ student in the class. (best)', questionVi: 'Anh ấy là học sinh giỏi nhất trong lớp.', answerData: { blanks: [{ answer: 'beste', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Im Winter ist es ___ als im Herbst. (kalt)', questionEn: 'In winter it is ___ than in autumn. (cold)', questionVi: 'Mùa đông lạnh hơn mùa thu.', answerData: { blanks: [{ answer: 'kälter', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Das ist das ___ Gebäude der Stadt. (hoch)', questionEn: 'That is the ___ building in the city. (tall)', questionVi: 'Đó là tòa nhà cao nhất trong thành phố.', answerData: { blanks: [{ answer: 'höchste', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Sie arbeitet ___ als ihr Kollege. (viel)', questionEn: 'She works ___ than her colleague. (more)', questionVi: 'Cô ấy làm việc nhiều hơn đồng nghiệp.', answerData: { blanks: [{ answer: 'mehr', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Mein Hund ist ___ wie deiner. (alt)', questionEn: 'My dog is as ___ as yours. (old)', questionVi: 'Con chó của tôi già bằng con của bạn.', answerData: { blanks: [{ answer: 'alt', alternatives: [] }] }, explanation: { de: 'Gleichheit: so/genauso + Grundstufe + wie', en: 'Equality: so/genauso + base form + wie', vi: 'Bằng nhau: dùng dạng gốc' }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Am ___ mag ich Schokolade. (gern)', questionEn: 'I like chocolate the most. (most)', questionVi: 'Tôi thích sô cô la nhất.', answerData: { blanks: [{ answer: 'liebsten', alternatives: [] }] }, points: 1 },
            // Reorder (4)
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'ist', 'größer', 'als', 'sein', 'Bruder.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Das', 'ist', 'das', 'beste', 'Restaurant', 'in', 'der', 'Stadt.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'singt', 'besser', 'als', 'ich.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Im', 'Sommer', 'ist', 'es', 'am', 'wärmsten.'] }, points: 1 },
            // Error correct (3)
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Er ist der alteste Mensch hier.', questionEn: 'Correct: Er ist der alteste Mensch hier.', questionVi: 'Sửa lỗi: Er ist der alteste Mensch hier.', answerData: { correctedText: 'Er ist der älteste Mensch hier.' }, explanation: { de: 'alt → älteste (Umlaut!)', en: 'alt → älteste (Umlaut!)', vi: 'alt → älteste (đổi nguyên âm!)' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Dieses Auto ist schneller wie jenes.', questionEn: 'Correct: Dieses Auto ist schneller wie jenes.', questionVi: 'Sửa lỗi: Dieses Auto ist schneller wie jenes.', answerData: { correctedText: 'Dieses Auto ist schneller als jenes.' }, explanation: { de: 'Komparativ + als (nicht "wie")', en: 'Comparative + als (not "wie")', vi: 'So sánh hơn + als (không phải "wie")' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Sie spricht mehr gut als er.', questionEn: 'Correct: Sie spricht mehr gut als er.', questionVi: 'Sửa lỗi: Sie spricht mehr gut als er.', answerData: { correctedText: 'Sie spricht besser als er.' }, explanation: { de: 'gut → besser (unregelmäßig)', en: 'gut → besser (irregular)', vi: 'gut → besser (bất quy tắc)' }, points: 1 },
            // Translate (3)
            { exerciseType: 'translate', order: 23, questionVi: 'Cô ấy nói tiếng Đức tốt hơn tôi.', questionEn: 'She speaks German better than I do.', answerData: { acceptedAnswers: ['Sie spricht besser Deutsch als ich.', 'Sie spricht Deutsch besser als ich.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Đây là bộ phim hay nhất tôi từng xem.', questionEn: 'This is the best film I have ever seen.', answerData: { acceptedAnswers: ['Das ist der beste Film, den ich je gesehen habe.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Tôi thích trà hơn cà phê.', questionEn: 'I like tea more than coffee.', answerData: { acceptedAnswers: ['Ich trinke lieber Tee als Kaffee.', 'Ich mag Tee lieber als Kaffee.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 5: KONJUNKTIV II
    // =================================================================
    {
        slug: 'a2-l05-konjunktiv2',
        level: 'A2',
        lessonNumber: 5,
        titleDe: 'Konjunktiv II',
        titleEn: 'Subjunctive II (Konjunktiv II)',
        titleVi: 'Thức giả định (Konjunktiv II)',
        objectives: {
            de: ['würde + Infinitiv für höfliche Bitten verwenden', 'Formen von könnte, müsste, sollte, dürfte kennen', 'Wünsche und Möglichkeiten ausdrücken', 'Höfliche Anfragen formulieren'],
            en: ['Use würde + Infinitive for polite requests', 'Know forms of könnte, müsste, sollte, dürfte', 'Express wishes and possibilities', 'Formulate polite requests'],
            vi: ['Dùng würde + Infinitiv cho yêu cầu lịch sự', 'Biết các dạng könnte, müsste, sollte, dürfte', 'Diễn đạt ước muốn và khả năng', 'Đặt câu hỏi lịch sự']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'würde + Infinitiv', en: 'würde + Infinitive', vi: 'würde + Infinitiv' },
                    content: 'The most common Konjunktiv II form. Use würde + Infinitiv to express wishes, hypothetical situations, and polite requests.',
                    table: {
                        headers: ['Person', 'würde', 'Beispiel'],
                        rows: [
                            ['ich', 'würde', 'Ich würde gern reisen.'],
                            ['du', 'würdest', 'Würdest du mir helfen?'],
                            ['er/sie/es', 'würde', 'Er würde schlafen.'],
                            ['wir', 'würden', 'Wir würden gern kommen.'],
                            ['ihr', 'würdet', 'Ihr würdet das verstehen.'],
                            ['sie/Sie', 'würden', 'Sie würden Deutsch lernen.'],
                        ]
                    }
                },
                {
                    title: { de: 'Konjunktiv II der Modalverben', en: 'Konjunktiv II of Modal Verbs', vi: 'Konjunktiv II của Modal verbs' },
                    content: 'Modal verbs have their own Konjunktiv II forms (not würde + modal). These are very common in spoken German.',
                    table: {
                        headers: ['Infinitiv', 'Konjunktiv II (ich/er)', 'Bedeutung (vi)'],
                        rows: [
                            ['können', 'könnte', 'có thể (lịch sự)'],
                            ['müssen', 'müsste', 'nên/cần (lịch sự)'],
                            ['sollen', 'sollte', 'nên (lời khuyên)'],
                            ['dürfen', 'dürfte', 'có lẽ/được phép'],
                            ['mögen', 'möchte', 'muốn (rất lịch sự)'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 25,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Höfliche Bitte: "___ Sie mir bitte helfen?"', questionEn: 'Polite request: "___ you please help me?"', questionVi: 'Yêu cầu lịch sự: "___ bạn giúp tôi không?"', answerData: { options: ['Könnten', 'Können', 'Dürfen', 'Wollen'], correctIndex: 0 }, explanation: { de: 'können → könnten (Konjunktiv II)', en: 'können → könnten (Konjunktiv II)', vi: 'können → könnten (Konjunktiv II)' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Ich ___ gern nach Japan reisen." (Wunsch)', questionEn: '"I ___ like to travel to Japan." (wish)', questionVi: '"Tôi ___ muốn đi Nhật." (ước muốn)', answerData: { options: ['würde', 'werde', 'wurde', 'wäre'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Konjunktiv II von "können" (wir):  ', questionEn: 'Konjunktiv II of "können" (we):  ', questionVi: 'Konjunktiv II của "können" (chúng tôi):  ', answerData: { options: ['könnten', 'konnten', 'können', 'könntet'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Du ___ mehr schlafen." (Rat/Empfehlung)', questionEn: '"You ___ sleep more." (advice)', questionVi: '"Bạn ___ ngủ nhiều hơn." (lời khuyên)', answerData: { options: ['solltest', 'sollst', 'würdest', 'musst'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: 'Welcher Satz ist HÖFLICHER?', questionEn: 'Which sentence is MORE POLITE?', questionVi: 'Câu nào LỊCH SỰ HƠN?', answerData: { options: ['Könnten Sie das Fenster öffnen?', 'Öffnen Sie das Fenster!', 'Du musst das Fenster öffnen.', 'Mach das Fenster auf!'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Er ___ eigentlich hier sein." (Erwartung)', questionEn: '"He ___ actually be here." (expectation)', questionVi: '"Lẽ ra anh ấy ___ ở đây." (kỳ vọng)', answerData: { options: ['müsste', 'musste', 'muss', 'sollte'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Was ___ du an meiner Stelle tun?"', questionEn: '"What ___ you do in my place?"', questionVi: '"Bạn ___ làm gì nếu ở vị trí tôi?"', answerData: { options: ['würdest', 'wirst', 'wurdest', 'wärst'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Ich ___ gern einen Kaffee, bitte." (mögen)', questionEn: '"I ___ like a coffee, please." (mögen)', questionVi: '"Tôi ___ dùng một ly cà phê, cảm ơn." (mögen)', answerData: { options: ['möchte', 'mag', 'mögte', 'würde mögen'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich ___ gern in einem anderen Land leben. (würde)', questionEn: 'I would like to live in another country.', questionVi: 'Tôi muốn sống ở một đất nước khác.', answerData: { blanks: [{ answer: 'würde', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ du mir bitte das Salz geben? (können)', questionEn: 'Could you please pass me the salt?', questionVi: 'Bạn có thể đưa cho tôi lọ muối không?', answerData: { blanks: [{ answer: 'Könntest', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Du ___ mehr Wasser trinken. (sollen)', questionEn: 'You should drink more water.', questionVi: 'Bạn nên uống nhiều nước hơn.', answerData: { blanks: [{ answer: 'solltest', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Wir ___ gern früher kommen, aber wir hatten keine Zeit. (würde)', questionEn: 'We would have liked to come earlier but had no time.', questionVi: 'Chúng tôi muốn đến sớm hơn nhưng không có thời gian.', answerData: { blanks: [{ answer: 'würden', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Er ___ eigentlich um 10 hier sein. (müssen)', questionEn: 'He should actually be here at 10.', questionVi: 'Lẽ ra anh ấy phải ở đây lúc 10 giờ.', answerData: { blanks: [{ answer: 'müsste', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: '___ ich bitte das Fenster öffnen? (dürfen)', questionEn: 'May I open the window, please?', questionVi: 'Tôi có thể mở cửa sổ không?', answerData: { blanks: [{ answer: 'Dürfte', alternatives: ['Könnte'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Was ___ du dir zum Geburtstag wünschen? (würde)', questionEn: 'What would you wish for your birthday?', questionVi: 'Bạn muốn gì cho sinh nhật?', answerData: { blanks: [{ answer: 'würdest', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'würde', 'gern', 'nach', 'Paris', 'fahren.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Könnten', 'Sie', 'mir', 'bitte', 'helfen?'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Du', 'solltest', 'mehr', 'schlafen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Was', 'würden', 'Sie', 'an', 'meiner', 'Stelle', 'machen?'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Ich würde gern ein Kaffee möchten.', questionEn: 'Correct the form.', questionVi: 'Sửa lỗi dạng động từ.', answerData: { correctedText: 'Ich möchte gern einen Kaffee.' }, explanation: { de: 'möchte = Konjunktiv II von mögen, kein würde nötig', en: 'möchte = Konjunktiv II of mögen, no würde needed', vi: 'möchte = Konjunktiv II của mögen, không cần würde' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Können Sie mir bitte helfen? (noch höflicher)', questionEn: 'Make it more polite.', questionVi: 'Làm lịch sự hơn.', answerData: { correctedText: 'Könnten Sie mir bitte helfen?' }, explanation: { de: 'Konjunktiv II (könnten) ist höflicher als Präsens (können)', en: 'Konjunktiv II (könnten) is more polite than Präsens (können)', vi: 'Konjunktiv II (könnten) lịch sự hơn Präsens (können)' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Er würde können kommen.', questionEn: 'Correct: Er würde können kommen.', questionVi: 'Sửa lỗi: Er würde können kommen.', answerData: { correctedText: 'Er könnte kommen.' }, explanation: { de: 'Modalverben bilden Konjunktiv II ohne würde', en: 'Modal verbs form Konjunktiv II without würde', vi: 'Modal verbs tạo Konjunktiv II không cần würde' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi muốn một ly nước, cảm ơn.', questionEn: 'I would like a glass of water, please.', answerData: { acceptedAnswers: ['Ich möchte ein Glas Wasser, bitte.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Bạn có thể nói chậm hơn không?', questionEn: 'Could you speak more slowly?', answerData: { acceptedAnswers: ['Könnten Sie langsamer sprechen?', 'Könntest du langsamer sprechen?'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Tôi sẽ muốn sống ở Đức.', questionEn: 'I would like to live in Germany.', answerData: { acceptedAnswers: ['Ich würde gern in Deutschland leben.', 'Ich würde gerne in Deutschland leben.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 6: KAUSALSATZ MIT "WEIL" & "DA"
    // =================================================================
    {
        slug: 'a2-l06-weil-da',
        level: 'A2',
        lessonNumber: 6,
        titleDe: 'Kausalsatz: weil und da',
        titleEn: 'Causal Clauses: weil and da',
        titleVi: 'Mệnh đề nguyên nhân: weil và da',
        objectives: {
            de: ['Kausalsätze mit "weil" bilden', '"da" am Satzanfang verwenden', 'Wortstellung im Nebensatz verstehen', '"weil" vs. "denn" unterscheiden'],
            en: ['Form causal clauses with "weil"', 'Use "da" at the start of a sentence', 'Understand word order in subordinate clauses', 'Distinguish "weil" vs. "denn"'],
            vi: ['Tạo mệnh đề nguyên nhân với "weil"', 'Dùng "da" ở đầu câu', 'Hiểu trật tự từ trong mệnh đề phụ', 'Phân biệt "weil" và "denn"']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Wortstellung mit "weil"', en: 'Word Order with "weil"', vi: 'Trật tự từ với "weil"' },
                    content: '"weil" introduces a subordinate clause. The conjugated verb moves to the END of the clause.',
                    table: {
                        headers: ['Hauptsatz', 'Konjunktion', 'Nebensatz (Verb am Ende)'],
                        rows: [
                            ['Ich lerne Deutsch,', 'weil', 'ich in Deutschland arbeiten möchte.'],
                            ['Er kommt nicht,', 'weil', 'er krank ist.'],
                            ['Wir bleiben zu Hause,', 'weil', 'es regnet.'],
                            ['Sie ist müde,', 'weil', 'sie nicht geschlafen hat.'],
                        ]
                    }
                },
                {
                    title: { de: 'weil vs. denn vs. da', en: 'weil vs. denn vs. da', vi: 'weil vs. denn vs. da' },
                    content: 'All three express cause/reason but with different grammar.',
                    table: {
                        headers: ['Konjunktion', 'Position', 'Wortstellung', 'Beispiel'],
                        rows: [
                            ['weil', 'mitten im Satz', 'Verb am Ende', 'Er kommt nicht, weil er krank ist.'],
                            ['denn', 'mitten im Satz', 'normale Wortstellung', 'Er kommt nicht, denn er ist krank.'],
                            ['da', 'Satzanfang', 'Verb am Ende + Inversion', 'Da er krank ist, kommt er nicht.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 25,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: 'Wortstellung nach "weil": Das Verb steht...', questionEn: 'Word order after "weil": The verb is...', questionVi: 'Trật tự từ sau "weil": Động từ đứng...', answerData: { options: ['am Ende', 'an Position 2', 'am Anfang', 'vor dem Subjekt'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: 'Wähle richtig: "Er bleibt zu Hause, ___ er krank ist."', questionEn: 'Choose correctly.', questionVi: 'Chọn đúng: "Anh ấy ở nhà ___ anh ấy bị ốm."', answerData: { options: ['weil', 'weil ist krank', 'denn er krank ist', 'dass'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"___ es regnet, nehme ich einen Regenschirm." Welches Wort passt?', questionEn: '"___ it is raining, I take an umbrella."', questionVi: '"___ trời mưa, tôi mang ô."', answerData: { options: ['Da', 'Weil', 'Denn', 'Dass'], correctIndex: 0 }, explanation: { de: '"da" steht am Satzanfang', en: '"da" stands at the beginning', vi: '"da" đứng đầu câu' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Was ist FALSCH?', questionEn: 'What is WRONG?', questionVi: 'Câu nào SAI?', answerData: { options: ['Ich lerne, weil ich will Arzt werden.', 'Ich lerne, weil ich Arzt werden will.', 'Da ich Arzt werden will, lerne ich.', 'Ich lerne, denn ich will Arzt werden.'], correctIndex: 0 }, explanation: { de: 'Nach "weil" muss das Verb ans Ende', en: 'After "weil" the verb must go to the end', vi: 'Sau "weil" động từ phải đứng cuối' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Ich bin müde, ___ ich nicht geschlafen habe."', questionEn: '"I am tired ___ I have not slept."', questionVi: '"Tôi mệt ___ tôi không ngủ được."', answerData: { options: ['weil', 'denn', 'da', 'weil habe'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Welcher Satz ist KORREKT?', questionEn: 'Which sentence is CORRECT?', questionVi: 'Câu nào ĐÚNG?', answerData: { options: ['Er kommt nicht, weil er muss arbeiten.', 'Er kommt nicht, weil er arbeiten muss.', 'Er kommt nicht weil er muss arbeiten.', 'Er kommt nicht denn er arbeiten muss.'], correctIndex: 1 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"___ sie Hunger hat, isst sie einen Apfel."', questionEn: '"___ she is hungry, she eats an apple."', questionVi: '"___ cô ấy đói, cô ấy ăn một quả táo."', answerData: { options: ['Da', 'Weil', 'Denn', 'Aber'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Was ist der Unterschied zwischen "weil" und "denn"?', questionEn: 'What is the difference between "weil" and "denn"?', questionVi: 'Sự khác biệt giữa "weil" và "denn" là gì?', answerData: { options: ['"denn" = normale Wortstellung; "weil" = Verb ans Ende', '"weil" = normale Wortstellung; "denn" = Verb ans Ende', 'Kein Unterschied', '"denn" steht am Satzanfang'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich lerne Deutsch, weil ich in Deutschland arbeiten ___.', questionEn: 'I learn German because I want to work in Germany.', questionVi: 'Tôi học tiếng Đức vì tôi muốn làm việc ở Đức.', answerData: { blanks: [{ answer: 'möchte', alternatives: ['will'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Er kommt nicht, weil er krank ___.', questionEn: 'He is not coming because he is sick.', questionVi: 'Anh ấy không đến vì anh ấy bị ốm.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: '___ es heute regnet, bleiben wir zu Hause.', questionEn: 'Since it is raining today, we are staying home.', questionVi: 'Vì hôm nay trời mưa, chúng tôi ở nhà.', answerData: { blanks: [{ answer: 'Da', alternatives: ['Weil'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Sie ist glücklich, weil sie eine neue Arbeit gefunden ___.', questionEn: 'She is happy because she found a new job.', questionVi: 'Cô ấy hạnh phúc vì đã tìm được việc mới.', answerData: { blanks: [{ answer: 'hat', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich kaufe das Buch, weil es sehr interessant ___.', questionEn: 'I buy the book because it is very interesting.', questionVi: 'Tôi mua cuốn sách vì nó rất thú vị.', answerData: { blanks: [{ answer: 'ist', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Wir gehen früh schlafen, ___ wir morgen früh aufstehen müssen.', questionEn: 'We go to bed early because we have to get up early tomorrow.', questionVi: 'Chúng tôi đi ngủ sớm vì ngày mai phải dậy sớm.', answerData: { blanks: [{ answer: 'weil', alternatives: ['da', 'denn'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Er lernt Spanisch, weil er nach Spanien reisen ___.', questionEn: 'He learns Spanish because he wants to travel to Spain.', questionVi: 'Anh ấy học tiếng Tây Ban Nha vì muốn du lịch Tây Ban Nha.', answerData: { blanks: [{ answer: 'möchte', alternatives: ['will'] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'bin', 'müde,', 'weil', 'ich', 'nicht', 'geschlafen', 'habe.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Da', 'er', 'krank', 'ist,', 'bleibt', 'er', 'zu', 'Hause.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'lernt', 'Deutsch,', 'weil', 'sie', 'in', 'Deutschland', 'wohnen', 'möchte.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wir', 'essen', 'viel,', 'denn', 'wir', 'haben', 'Hunger.'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Er bleibt zu Hause, weil er ist krank.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Er bleibt zu Hause, weil er krank ist.' }, explanation: { de: 'Nach "weil" → Verb ans Ende', en: 'After "weil" → verb to the end', vi: 'Sau "weil" → động từ đứng cuối' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Weil es regnet, ich nehme einen Schirm.', questionEn: 'Correct the word order after the weil-clause.', questionVi: 'Sửa lỗi trật tự từ sau mệnh đề weil.', answerData: { correctedText: 'Weil es regnet, nehme ich einen Schirm.' }, explanation: { de: 'Inversion nach Nebensatz am Anfang', en: 'Inversion after fronted subordinate clause', vi: 'Đảo ngữ sau mệnh đề phụ đứng đầu' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Ich mag ihn, weil er ist nett und hilfsbereit.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Ich mag ihn, weil er nett und hilfsbereit ist.' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi học tiếng Đức vì tôi yêu thích ngôn ngữ này.', questionEn: 'I learn German because I love this language.', answerData: { acceptedAnswers: ['Ich lerne Deutsch, weil ich diese Sprache liebe.', 'Ich lerne Deutsch, weil ich diese Sprache mag.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Vì trời lạnh, tôi mặc áo khoác.', questionEn: 'Since it is cold, I wear a jacket.', answerData: { acceptedAnswers: ['Da es kalt ist, ziehe ich eine Jacke an.', 'Weil es kalt ist, ziehe ich eine Jacke an.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Cô ấy hạnh phúc vì cô ấy có nhiều bạn bè.', questionEn: 'She is happy because she has many friends.', answerData: { acceptedAnswers: ['Sie ist glücklich, weil sie viele Freunde hat.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 7: NEBENSATZ MIT "DASS" & "WENN"
    // =================================================================
    {
        slug: 'a2-l07-dass-wenn',
        level: 'A2',
        lessonNumber: 7,
        titleDe: 'Nebensatz mit "dass" und "wenn"',
        titleEn: 'Subordinate Clauses: dass and wenn',
        titleVi: 'Mệnh đề phụ với "dass" và "wenn"',
        objectives: {
            de: ['"dass"-Sätze nach Meinungsverben bilden', '"wenn"-Sätze für Bedingungen und Zeitpunkte', 'Verb-Endstellung im Nebensatz üben', '"wenn" vs. "ob" unterscheiden'],
            en: ['Form "dass" clauses after opinion verbs', '"wenn" clauses for conditions and times', 'Practice verb-final in subordinate clauses', 'Distinguish "wenn" vs. "ob"'],
            vi: ['Tạo mệnh đề "dass" sau động từ quan điểm', 'Mệnh đề "wenn" cho điều kiện và thời điểm', 'Luyện động từ cuối câu trong mệnh đề phụ', 'Phân biệt "wenn" và "ob"']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: '"dass"-Sätze', en: '"dass" Clauses', vi: 'Mệnh đề "dass"' },
                    content: '"dass" connects a main clause to a fact or opinion. Verb goes to the END.',
                    table: {
                        headers: ['Hauptsatz', 'dass + Nebensatz'],
                        rows: [
                            ['Ich denke,', 'dass Deutsch schwer ist.'],
                            ['Er sagt,', 'dass er morgen kommt.'],
                            ['Ich weiß,', 'dass sie Recht hat.'],
                            ['Es freut mich,', 'dass du hier bist.'],
                        ]
                    }
                },
                {
                    title: { de: '"wenn"-Sätze', en: '"wenn" Clauses', vi: 'Mệnh đề "wenn"' },
                    content: '"wenn" expresses conditions (if) or repeated events in the past (whenever). Verb goes to END.',
                    table: {
                        headers: ['Verwendung', 'Beispiel'],
                        rows: [
                            ['Bedingung (if)', 'Wenn ich Zeit habe, lese ich.'],
                            ['Wiederholt (whenever)', 'Wenn ich Hunger hatte, aß ich Obst.'],
                            ['Zeitpunkt (when, future)', 'Ruf mich an, wenn du ankommst.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 25,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"Ich denke, ___ Deutsch sehr interessant ist."', questionEn: '"I think ___ German is very interesting."', questionVi: '"Tôi nghĩ ___ tiếng Đức rất thú vị."', answerData: { options: ['dass', 'weil', 'wenn', 'ob'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"___ du Zeit hast, können wir spazieren gehen."', questionEn: '"___ you have time, we can go for a walk."', questionVi: '"___ bạn có thời gian, chúng ta có thể đi dạo."', answerData: { options: ['Wenn', 'Dass', 'Ob', 'Weil'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: 'Wortstellung nach "dass": Das Verb steht...', questionEn: 'Word order after "dass": The verb is...', questionVi: 'Trật tự từ sau "dass": Động từ đứng...', answerData: { options: ['am Ende', 'an Position 2', 'am Anfang', 'nach dem Subjekt'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Ich weiß nicht, ___ er kommt." (indirekte Frage)', questionEn: '"I don\'t know ___ he is coming." (indirect question)', questionVi: '"Tôi không biết ___ anh ấy có đến không."', answerData: { options: ['ob', 'dass', 'wenn', 'weil'], correctIndex: 0 }, explanation: { de: '"ob" für indirekte Ja/Nein-Fragen', en: '"ob" for indirect yes/no questions', vi: '"ob" cho câu hỏi gián tiếp có/không' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Es ist schön, ___ du mir hilfst."', questionEn: '"It\'s nice ___ you help me."', questionVi: '"Thật tốt ___ bạn giúp tôi."', answerData: { options: ['dass', 'wenn', 'weil', 'ob'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"___ es schneit, fahre ich mit dem Bus."', questionEn: '"___ it snows, I take the bus."', questionVi: '"___ trời tuyết, tôi đi xe buýt."', answerData: { options: ['Wenn', 'Dass', 'Weil', 'Da'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: 'Was ist RICHTIG?', questionEn: 'What is CORRECT?', questionVi: 'Câu nào ĐÚNG?', answerData: { options: ['Ich hoffe, dass er kommt.', 'Ich hoffe, dass er kommt morgen.', 'Ich hoffe dass er morgen kommt', 'Ich hoffe, er dass kommt.'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Sie sagt, ___ sie müde ___."', questionEn: '"She says ___ she is tired."', questionVi: '"Cô ấy nói ___ cô ấy mệt."', answerData: { options: ['dass / ist', 'dass / hat', 'weil / ist', 'ob / ist'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich glaube, ___ er die Wahrheit sagt.', questionEn: 'I believe that he is telling the truth.', questionVi: 'Tôi tin rằng anh ấy đang nói sự thật.', answerData: { blanks: [{ answer: 'dass', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: '___ du Hunger hast, sag mir Bescheid.', questionEn: 'If you are hungry, let me know.', questionVi: 'Nếu bạn đói, hãy cho tôi biết.', answerData: { blanks: [{ answer: 'Wenn', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Es tut mir leid, ___ ich zu spät komme.', questionEn: 'I am sorry that I am late.', questionVi: 'Tôi xin lỗi vì đến muộn.', answerData: { blanks: [{ answer: 'dass', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Ruf mich an, ___ du zu Hause bist.', questionEn: 'Call me when you are home.', questionVi: 'Gọi cho tôi khi bạn về đến nhà.', answerData: { blanks: [{ answer: 'wenn', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich weiß nicht, ___ er morgen kommt.', questionEn: 'I don\'t know whether he is coming tomorrow.', questionVi: 'Tôi không biết liệu anh ấy có đến ngày mai không.', answerData: { blanks: [{ answer: 'ob', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Er sagt, ___ er kein Geld ___.', questionEn: 'He says that he has no money.', questionVi: 'Anh ấy nói rằng anh ấy không có tiền.', answerData: { blanks: [{ answer: 'dass', alternatives: [] }, { answer: 'hat', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: '___ ich Zeit habe, lerne ich Gitarre.', questionEn: 'When I have time, I learn guitar.', questionVi: 'Khi tôi có thời gian, tôi học đàn guitar.', answerData: { blanks: [{ answer: 'Wenn', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'denke,', 'dass', 'Deutsch', 'sehr', 'wichtig', 'ist.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wenn', 'du', 'kommst,', 'rufe', 'mich', 'an.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'hofft,', 'dass', 'sie', 'ihm', 'hilft.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'weiß', 'nicht,', 'ob', 'er', 'kommt.'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Ich weiß, dass sie kommt morgen.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Ich weiß, dass sie morgen kommt.' }, explanation: { de: 'Nach "dass" → Verb ans Ende', en: 'After "dass" → verb to the end', vi: 'Sau "dass" → động từ đứng cuối' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Wenn ich bin müde, schlafe ich früh.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Wenn ich müde bin, schlafe ich früh.' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Er sagt dass er hat keine Zeit.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Er sagt, dass er keine Zeit hat.' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi hy vọng rằng bạn sẽ đến.', questionEn: 'I hope that you will come.', answerData: { acceptedAnswers: ['Ich hoffe, dass du kommst.', 'Ich hoffe, dass Sie kommen.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Nếu trời mưa, chúng ta ở nhà.', questionEn: 'If it rains, we stay home.', answerData: { acceptedAnswers: ['Wenn es regnet, bleiben wir zu Hause.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Anh ấy nói rằng anh ấy rất vui.', questionEn: 'He says that he is very happy.', answerData: { acceptedAnswers: ['Er sagt, dass er sehr glücklich ist.', 'Er sagt, dass er sehr froh ist.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 8: INFINITIV MIT "ZU"
    // =================================================================
    {
        slug: 'a2-l08-infinitiv-zu',
        level: 'A2',
        lessonNumber: 8,
        titleDe: 'Infinitiv mit "zu"',
        titleEn: 'Infinitive with "zu"',
        titleVi: 'Infinitiv với "zu"',
        objectives: {
            de: ['Infinitiv mit zu nach bestimmten Verben bilden', '"um...zu" für Zwecke verwenden', '"ohne...zu" und "(an)statt...zu" kennen', 'Bei trennbaren Verben: "zu" richtig einsetzen'],
            en: ['Form infinitive with zu after certain verbs', 'Use "um...zu" for purpose', 'Know "ohne...zu" and "(an)statt...zu"', 'Place "zu" correctly with separable verbs'],
            vi: ['Tạo Infinitiv mit zu sau một số động từ nhất định', 'Dùng "um...zu" để diễn đạt mục đích', 'Biết "ohne...zu" và "(an)statt...zu"', 'Đặt "zu" đúng vị trí với động từ tách được']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Infinitiv mit "zu"', en: 'Infinitive with "zu"', vi: 'Infinitiv với "zu"' },
                    content: 'After certain verbs and expressions, use zu + Infinitiv. With separable verbs, "zu" goes between prefix and verb stem.',
                    table: {
                        headers: ['Ausdruck', 'Beispiel'],
                        rows: [
                            ['versuchen + zu', 'Ich versuche, Deutsch zu lernen.'],
                            ['hoffen + zu', 'Er hofft, bald zu kommen.'],
                            ['vergessen + zu', 'Sie hat vergessen, anzurufen.'],
                            ['Es ist wichtig/schön/schwer + zu', 'Es ist wichtig, Sport zu treiben.'],
                            ['haben + Zeit/Lust + zu', 'Hast du Lust, spazieren zu gehen?'],
                        ]
                    }
                },
                {
                    title: { de: 'um...zu / ohne...zu / (an)statt...zu', en: 'um...zu / ohne...zu / (an)statt...zu', vi: 'um...zu / ohne...zu / (an)statt...zu' },
                    content: 'These constructions add meaning to the infinitive clause.',
                    table: {
                        headers: ['Konstruktion', 'Bedeutung', 'Beispiel'],
                        rows: [
                            ['um...zu', 'Zweck (damit)', 'Ich lerne, um Arzt zu werden.'],
                            ['ohne...zu', 'ohne diese Handlung', 'Er geht weg, ohne etwas zu sagen.'],
                            ['(an)statt...zu', 'anstelle von', 'Statt zu lernen, spielt er.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 25,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"Es ist wichtig, viel ___ trinken."', questionEn: '"It is important ___ drink a lot."', questionVi: '"Điều quan trọng là phải uống nhiều nước."', answerData: { options: ['zu', 'um', 'zu um', 'für'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Ich gehe in die Stadt, ___ Lebensmittel ___ kaufen."', questionEn: '"I go to the city ___ buy groceries."', questionVi: '"Tôi đi vào thành phố ___ mua thực phẩm."', answerData: { options: ['um / zu', 'zu / zu', 'für / zu', 'damit / zu'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Er geht weg, ___ etwas ___ sagen."', questionEn: '"He leaves ___ saying anything."', questionVi: '"Anh ấy đi mà không nói gì."', answerData: { options: ['ohne / zu', 'statt / zu', 'um / zu', 'damit / zu'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: 'Trennbares Verb: "Sie vergisst, ___ (anrufen)."', questionEn: 'Separable verb: "She forgets ___ (call)."', questionVi: 'Động từ tách: "Cô ấy quên ___ (gọi điện)."', answerData: { options: ['anzurufen', 'zu anrufen', 'anrufen zu', 'zu anruf'], correctIndex: 0 }, explanation: { de: 'Trennbare Verben: Präfix + zu + Stamm: an-zu-rufen = anzurufen', en: 'Separable verbs: prefix + zu + stem: anzurufen', vi: 'Động từ tách: tiền tố + zu + gốc: anzurufen' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"___ Sport zu treiben ist gesund."', questionEn: '"___ exercising is healthy."', questionVi: '"___ tập thể dục thì tốt cho sức khỏe."', answerData: { options: ['Regelmäßig', 'Um', 'Ohne', 'Statt'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Hast du Lust, heute Abend ___ kommen?"', questionEn: '"Would you like ___ come this evening?"', questionVi: '"Bạn có muốn ___ đến tối nay không?"', answerData: { options: ['zu', 'um zu', 'ohne zu', 'dass'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Statt ___ lernen, schaut er fern."', questionEn: '"Instead of studying, he watches TV."', questionVi: '"Thay vì học, anh ấy xem TV."', answerData: { options: ['zu', 'um zu', 'ohne', 'dass'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: 'Welcher Satz ist KORREKT?', questionEn: 'Which sentence is CORRECT?', questionVi: 'Câu nào ĐÚNG?', answerData: { options: ['Ich versuche, Deutsch zu lernen.', 'Ich versuche Deutsch lernen zu.', 'Ich versuche zu Deutsch lernen.', 'Ich versuche Deutsch lernen.'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich versuche, früh ___ aufstehen. (aufstehen)', questionEn: 'I try to get up early.', questionVi: 'Tôi cố gắng dậy sớm.', answerData: { blanks: [{ answer: 'aufzustehen', alternatives: [] }] }, explanation: { de: 'Trennbar: auf + zu + stehen = aufzustehen', en: 'Separable: auf + zu + stehen = aufzustehen', vi: 'Tách: auf + zu + stehen = aufzustehen' }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Es ist schön, mit Freunden ___ sprechen.', questionEn: 'It is nice to speak with friends.', questionVi: 'Thật tuyệt khi nói chuyện với bạn bè.', answerData: { blanks: [{ answer: 'zu', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Ich gehe in die Bibliothek, ___ Bücher ___ lesen.', questionEn: 'I go to the library to read books.', questionVi: 'Tôi đến thư viện để đọc sách.', answerData: { blanks: [{ answer: 'um', alternatives: [] }, { answer: 'zu', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Er isst, ___ gesund ___ sein.', questionEn: 'He eats (in order) to be healthy.', questionVi: 'Anh ấy ăn uống để khỏe mạnh.', answerData: { blanks: [{ answer: 'um', alternatives: [] }, { answer: 'zu', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Sie hat vergessen, ___ anrufen. (anrufen)', questionEn: 'She forgot to call.', questionVi: 'Cô ấy đã quên gọi điện.', answerData: { blanks: [{ answer: 'anzurufen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Er verlässt das Haus, ohne ___ sagen. (auf Wiedersehen sagen)', questionEn: 'He leaves the house without saying goodbye.', questionVi: 'Anh ấy rời nhà mà không nói tạm biệt.', answerData: { blanks: [{ answer: 'Auf Wiedersehen zu', alternatives: ['etwas zu'] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Hast du Zeit, heute ___ kommen?', questionEn: 'Do you have time to come today?', questionVi: 'Bạn có thời gian đến hôm nay không?', answerData: { blanks: [{ answer: 'zu', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Es', 'ist', 'wichtig,', 'viel', 'Wasser', 'zu', 'trinken.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'lerne', 'Deutsch,', 'um', 'in', 'Deutschland', 'zu', 'arbeiten.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'geht,', 'ohne', 'etwas', 'zu', 'sagen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'versuche,', 'jeden', 'Tag', 'Sport', 'zu', 'treiben.'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Er vergisst immer zu anrufen.', questionEn: 'Correct the separable verb form.', questionVi: 'Sửa lỗi dạng động từ tách.', answerData: { correctedText: 'Er vergisst immer anzurufen.' }, explanation: { de: 'Trennbar: an + zu + rufen = anzurufen', en: 'Separable: an + zu + rufen = anzurufen', vi: 'Tách: an + zu + rufen = anzurufen' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich gehe einkaufen um Lebensmittel zu kaufen.', questionEn: 'Add missing comma.', questionVi: 'Thêm dấu phẩy còn thiếu.', answerData: { correctedText: 'Ich gehe einkaufen, um Lebensmittel zu kaufen.' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Es ist wichtig Deutsch lernen.', questionEn: 'Add "zu" where needed.', questionVi: 'Thêm "zu" vào đúng chỗ.', answerData: { correctedText: 'Es ist wichtig, Deutsch zu lernen.' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi học tiếng Đức để tìm việc làm tốt hơn.', questionEn: 'I learn German to find a better job.', answerData: { acceptedAnswers: ['Ich lerne Deutsch, um eine bessere Arbeit zu finden.', 'Ich lerne Deutsch, um einen besseren Job zu finden.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Thật khó để nói tiếng Đức hoàn hảo.', questionEn: 'It is difficult to speak German perfectly.', answerData: { acceptedAnswers: ['Es ist schwer, perfekt Deutsch zu sprechen.', 'Es ist schwierig, perfekt Deutsch zu sprechen.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Anh ấy đi mà không chào tạm biệt.', questionEn: 'He leaves without saying goodbye.', answerData: { acceptedAnswers: ['Er geht, ohne auf Wiedersehen zu sagen.', 'Er geht, ohne sich zu verabschieden.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 9: REFLEXIVE VERBEN
    // =================================================================
    {
        slug: 'a2-l09-reflexive',
        level: 'A2',
        lessonNumber: 9,
        titleDe: 'Reflexive Verben',
        titleEn: 'Reflexive Verbs',
        titleVi: 'Động từ phản thân',
        objectives: {
            de: ['Reflexivpronomen im Akkusativ kennen', 'Häufige reflexive Verben lernen', 'Reflexivpronomen im Dativ verstehen', 'Sätze mit Reflexivverben bilden'],
            en: ['Know reflexive pronouns in accusative', 'Learn common reflexive verbs', 'Understand reflexive pronouns in dative', 'Form sentences with reflexive verbs'],
            vi: ['Biết đại từ phản thân ở cách Akkusativ', 'Học các động từ phản thân phổ biến', 'Hiểu đại từ phản thân ở cách Dativ', 'Tạo câu với động từ phản thân']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Reflexivpronomen (Akkusativ)', en: 'Reflexive Pronouns (Accusative)', vi: 'Đại từ phản thân (Akkusativ)' },
                    content: 'Most reflexive verbs use accusative reflexive pronouns. The subject and object refer to the same person.',
                    table: {
                        headers: ['Person', 'Reflexivpronomen (Akk)', 'Beispiel'],
                        rows: [
                            ['ich', 'mich', 'Ich wasche mich.'],
                            ['du', 'dich', 'Du freust dich.'],
                            ['er/sie/es', 'sich', 'Er ärgert sich.'],
                            ['wir', 'uns', 'Wir treffen uns.'],
                            ['ihr', 'euch', 'Ihr beeilt euch.'],
                            ['sie/Sie', 'sich', 'Sie erinnern sich.'],
                        ]
                    }
                },
                {
                    title: { de: 'Häufige reflexive Verben', en: 'Common Reflexive Verbs', vi: 'Các động từ phản thân phổ biến' },
                    content: 'These verbs always or often appear with a reflexive pronoun.',
                    table: {
                        headers: ['Verb', 'Bedeutung (vi)', 'Beispiel'],
                        rows: [
                            ['sich freuen (über/auf)', 'vui mừng', 'Ich freue mich über das Geschenk.'],
                            ['sich ärgern (über)', 'tức giận', 'Er ärgert sich über den Fehler.'],
                            ['sich erinnern (an + Akk)', 'nhớ lại', 'Ich erinnere mich an sie.'],
                            ['sich vorstellen', 'tự giới thiệu / tưởng tượng', 'Ich stelle mich vor.'],
                            ['sich beeilen', 'vội vàng', 'Wir müssen uns beeilen.'],
                            ['sich interessieren (für)', 'quan tâm đến', 'Sie interessiert sich für Musik.'],
                            ['sich fühlen', 'cảm thấy', 'Wie fühlen Sie sich?'],
                            ['sich waschen', 'rửa/tắm', 'Er wäscht sich die Hände.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 25,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"Ich freue ___ über das Geschenk."', questionEn: '"I am happy about the gift."', questionVi: '"Tôi vui về món quà."', answerData: { options: ['mich', 'mir', 'sich', 'dich'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Er wäscht ___ morgens." (sich)', questionEn: '"He washes (himself) in the morning."', questionVi: '"Anh ấy rửa mặt/tắm vào buổi sáng."', answerData: { options: ['sich', 'ihn', 'ihm', 'mich'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Wir ___ uns über den Regen." (ärgern)', questionEn: '"We are annoyed about the rain."', questionVi: '"Chúng tôi tức giận vì trời mưa."', answerData: { options: ['ärgern', 'freuen', 'erinnern', 'interessieren'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Ihr müsst ___ beeilen!"', questionEn: '"You all must hurry!"', questionVi: '"Các bạn phải vội lên!"', answerData: { options: ['euch', 'uns', 'sich', 'dich'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Sie interessiert ___ für Kunst."', questionEn: '"She is interested in art."', questionVi: '"Cô ấy quan tâm đến nghệ thuật."', answerData: { options: ['sich', 'ihr', 'sie', 'mich'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Ich erinnere ___ an unsere Reise."', questionEn: '"I remember our trip."', questionVi: '"Tôi nhớ lại chuyến đi của chúng ta."', answerData: { options: ['mich', 'mir', 'sich', 'uns'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Wie fühlen Sie ___ heute?"', questionEn: '"How do you feel today?"', questionVi: '"Hôm nay bạn cảm thấy thế nào?"', answerData: { options: ['sich', 'Ihnen', 'Sie', 'mich'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Stellt ___ bitte vor!" (vorstellen)', questionEn: '"Please introduce yourselves!"', questionVi: '"Xin hãy tự giới thiệu!"', answerData: { options: ['euch', 'uns', 'sich', 'dich'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Er freut ___ auf die Ferien.', questionEn: 'He is looking forward to the holidays.', questionVi: 'Anh ấy mong chờ kỳ nghỉ.', answerData: { blanks: [{ answer: 'sich', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Ich wasche ___ jeden Morgen.', questionEn: 'I wash myself every morning.', questionVi: 'Tôi rửa mặt mỗi buổi sáng.', answerData: { blanks: [{ answer: 'mich', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Wir treffen ___ um 8 Uhr.', questionEn: 'We meet at 8 o\'clock.', questionVi: 'Chúng tôi gặp nhau lúc 8 giờ.', answerData: { blanks: [{ answer: 'uns', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Du musst ___ mehr beeilen!', questionEn: 'You need to hurry more!', questionVi: 'Bạn phải vội lên!', answerData: { blanks: [{ answer: 'dich', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Sie interessiert ___ sehr für Geschichte.', questionEn: 'She is very interested in history.', questionVi: 'Cô ấy rất quan tâm đến lịch sử.', answerData: { blanks: [{ answer: 'sich', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Ich ärgere ___ über den Lärm.', questionEn: 'I am annoyed by the noise.', questionVi: 'Tôi bực bội vì tiếng ồn.', answerData: { blanks: [{ answer: 'mich', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Kannst du ___ noch an sie erinnern?', questionEn: 'Can you still remember her?', questionVi: 'Bạn có còn nhớ cô ấy không?', answerData: { blanks: [{ answer: 'dich', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'wäscht', 'sich', 'jeden', 'Morgen.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wir', 'freuen', 'uns', 'auf', 'das', 'Wochenende.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Sie', 'interessiert', 'sich', 'für', 'Musik.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ihr', 'müsst', 'euch', 'beeilen!'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Er freut ihm über das Geschenk.', questionEn: 'Correct the reflexive pronoun.', questionVi: 'Sửa lỗi đại từ phản thân.', answerData: { correctedText: 'Er freut sich über das Geschenk.' }, explanation: { de: 'er/sie/es → sich (nicht ihm/ihr)', en: 'er/sie/es → sich (not ihm/ihr)', vi: 'er/sie/es → sich (không phải ihm/ihr)' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich erinnere mich an sie nicht mehr.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Ich erinnere mich nicht mehr an sie.' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Wir müssen uns beeilen jetzt.', questionEn: 'Correct the word order.', questionVi: 'Sửa lỗi trật tự từ.', answerData: { correctedText: 'Wir müssen uns jetzt beeilen.' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Tôi vui vì được gặp bạn.', questionEn: 'I am happy to meet you.', answerData: { acceptedAnswers: ['Ich freue mich, Sie kennenzulernen.', 'Ich freue mich, dich kennenzulernen.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Cô ấy cảm thấy tốt hôm nay.', questionEn: 'She feels good today.', answerData: { acceptedAnswers: ['Sie fühlt sich heute gut.', 'Sie fühlt sich gut heute.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Chúng tôi phải vội vàng.', questionEn: 'We have to hurry.', answerData: { acceptedAnswers: ['Wir müssen uns beeilen.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 10: WECHSELPRÄPOSITIONEN
    // =================================================================
    {
        slug: 'a2-l10-wechselpraep',
        level: 'A2',
        lessonNumber: 10,
        titleDe: 'Wechselpräpositionen',
        titleEn: 'Two-Way Prepositions',
        titleVi: 'Giới từ hai chiều (Wechselpräpositionen)',
        objectives: {
            de: ['9 Wechselpräpositionen kennen', 'Akkusativ (Wohin?) vs. Dativ (Wo?) unterscheiden', 'Wechselpräpositionen in Sätzen verwenden', 'Lokale und direktionale Bedeutung verstehen'],
            en: ['Know the 9 two-way prepositions', 'Distinguish Accusative (Wohin?) vs. Dative (Wo?)', 'Use two-way prepositions in sentences', 'Understand local and directional meaning'],
            vi: ['Biết 9 giới từ hai chiều', 'Phân biệt Akkusativ (Đi đâu?) vs Dativ (Ở đâu?)', 'Dùng giới từ hai chiều trong câu', 'Hiểu nghĩa chỉ vị trí và hướng']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Die 9 Wechselpräpositionen', en: 'The 9 Two-Way Prepositions', vi: '9 giới từ hai chiều' },
                    content: 'These 9 prepositions use Accusative for movement/direction (Wohin?) and Dative for location (Wo?).',
                    table: {
                        headers: ['Präposition', 'Bedeutung (vi)', 'Akk (Wohin?)', 'Dat (Wo?)'],
                        rows: [
                            ['an', 'ở/vào', 'an die Wand (→)', 'an der Wand (⌖)'],
                            ['auf', 'trên/lên', 'auf den Tisch (→)', 'auf dem Tisch (⌖)'],
                            ['hinter', 'sau/ra sau', 'hinter das Haus (→)', 'hinter dem Haus (⌖)'],
                            ['in', 'trong/vào', 'in die Stadt (→)', 'in der Stadt (⌖)'],
                            ['neben', 'bên cạnh', 'neben das Auto (→)', 'neben dem Auto (⌖)'],
                            ['über', 'trên cao/qua', 'über die Brücke (→)', 'über der Stadt (⌖)'],
                            ['unter', 'dưới/xuống dưới', 'unter den Tisch (→)', 'unter dem Tisch (⌖)'],
                            ['vor', 'trước/ra trước', 'vor das Haus (→)', 'vor dem Haus (⌖)'],
                            ['zwischen', 'giữa', 'zwischen die Bücher (→)', 'zwischen den Büchern (⌖)'],
                        ]
                    }
                },
                {
                    title: { de: 'Wohin? (Akkusativ) vs. Wo? (Dativ)', en: 'Where to? (Acc) vs. Where? (Dat)', vi: 'Đi đâu? (Akk) vs. Ở đâu? (Dat)' },
                    content: 'Ask "Wohin?" for movement → Accusative. Ask "Wo?" for static location → Dative.',
                    table: {
                        headers: ['Frage', 'Kasus', 'Beispiel'],
                        rows: [
                            ['Wohin? (bewegung)', 'Akkusativ', 'Ich lege das Buch auf den Tisch.'],
                            ['Wo? (ort)', 'Dativ', 'Das Buch liegt auf dem Tisch.'],
                            ['Wohin?', 'Akkusativ', 'Er hängt das Bild an die Wand.'],
                            ['Wo?', 'Dativ', 'Das Bild hängt an der Wand.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"Das Buch liegt ___ Tisch." (auf)', questionEn: '"The book is on the table." (location)', questionVi: '"Cuốn sách nằm ___ bàn." (vị trí)', answerData: { options: ['auf dem', 'auf den', 'auf der', 'auf das'], correctIndex: 0 }, explanation: { de: 'Wo? (Ort) → Dativ: auf dem Tisch', en: 'Where? (location) → Dative: auf dem Tisch', vi: 'Ở đâu? → Dativ: auf dem Tisch' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Ich lege das Buch ___ Tisch." (auf)', questionEn: '"I put the book on the table." (direction)', questionVi: '"Tôi đặt cuốn sách ___ bàn." (hướng)', answerData: { options: ['auf den', 'auf dem', 'auf der', 'auf das'], correctIndex: 0 }, explanation: { de: 'Wohin? (Bewegung) → Akkusativ: auf den Tisch', en: 'Where to? (movement) → Accusative: auf den Tisch', vi: 'Đi đâu? → Akkusativ: auf den Tisch' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Das Bild hängt ___ Wand." (an, f)', questionEn: '"The picture hangs on the wall." (location)', questionVi: '"Bức tranh treo ___ tường." (vị trí)', answerData: { options: ['an der', 'an die', 'an dem', 'an das'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Wir fahren ___ Stadt." (in, f)', questionEn: '"We drive into the city." (direction)', questionVi: '"Chúng tôi lái xe vào ___ thành phố." (hướng)', answerData: { options: ['in die', 'in der', 'in das', 'in dem'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Die Katze liegt ___ Sofa." (unter, n)', questionEn: '"The cat is under the sofa." (location)', questionVi: '"Con mèo nằm ___ sofa." (vị trí)', answerData: { options: ['unter dem', 'unter den', 'unter das', 'unter der'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Er stellt die Vase ___ Tisch." (auf, m)', questionEn: '"He places the vase on the table." (direction)', questionVi: '"Anh ấy đặt bình hoa ___ bàn." (hướng)', answerData: { options: ['auf den', 'auf dem', 'auf der', 'auf das'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Das Auto steht ___ Garage." (in, f)', questionEn: '"The car is in the garage." (location)', questionVi: '"Xe ô tô đứng ___ gara." (vị trí)', answerData: { options: ['in der', 'in die', 'in das', 'in dem'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Die Kinder spielen ___ Haus." (vor, n)', questionEn: '"The children play in front of the house." (location)', questionVi: '"Những đứa trẻ chơi ___ nhà." (vị trí)', answerData: { options: ['vor dem', 'vor das', 'vor den', 'vor der'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich hänge das Bild ___ die Wand. (an)', questionEn: 'I hang the picture on the wall. (movement)', questionVi: 'Tôi treo bức tranh lên tường.', answerData: { blanks: [{ answer: 'an', alternatives: [] }] }, explanation: { de: 'Wohin? → Akkusativ: an die Wand', en: 'Where to? → Accusative: an die Wand', vi: 'Đặt lên → Akkusativ: an die Wand' }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Das Buch liegt ___ dem Regal. (in)', questionEn: 'The book is in the shelf. (location)', questionVi: 'Cuốn sách nằm trong kệ.', answerData: { blanks: [{ answer: 'in', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Er geht ___ das Kino. (in)', questionEn: 'He goes into the cinema. (direction)', questionVi: 'Anh ấy đi vào rạp chiếu phim.', answerData: { blanks: [{ answer: 'in', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Die Katze springt ___ den Tisch. (auf)', questionEn: 'The cat jumps onto the table. (direction)', questionVi: 'Con mèo nhảy lên bàn.', answerData: { blanks: [{ answer: 'auf', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Wir stehen ___ der Schule. (vor)', questionEn: 'We are standing in front of the school. (location)', questionVi: 'Chúng tôi đứng trước trường.', answerData: { blanks: [{ answer: 'vor', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Sie legt ihr Handy ___ das Buch. (neben)', questionEn: 'She puts her phone next to the book. (direction)', questionVi: 'Cô ấy đặt điện thoại cạnh cuốn sách.', answerData: { blanks: [{ answer: 'neben', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Der Hund schläft ___ dem Sofa. (unter)', questionEn: 'The dog sleeps under the sofa. (location)', questionVi: 'Con chó ngủ dưới ghế sofa.', answerData: { blanks: [{ answer: 'unter', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Das', 'Buch', 'liegt', 'auf', 'dem', 'Tisch.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'hängt', 'das', 'Bild', 'an', 'die', 'Wand.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Die', 'Katze', 'sitzt', 'unter', 'dem', 'Tisch.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Wir', 'fahren', 'in', 'die', 'Stadt.'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Das Buch liegt auf den Tisch.', questionEn: 'Correct the case (location, not direction).', questionVi: 'Sửa lỗi cách (vị trí, không phải hướng).', answerData: { correctedText: 'Das Buch liegt auf dem Tisch.' }, explanation: { de: 'liegen (Ort) → Dativ: auf dem Tisch', en: 'liegen (location) → Dative: auf dem Tisch', vi: 'liegen (vị trí) → Dativ: auf dem Tisch' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Ich lege das Buch auf dem Tisch.', questionEn: 'Correct the case (direction, not location).', questionVi: 'Sửa lỗi cách (hướng, không phải vị trí).', answerData: { correctedText: 'Ich lege das Buch auf den Tisch.' }, explanation: { de: 'legen (Bewegung/Wohin?) → Akkusativ: auf den Tisch', en: 'legen (movement/where to?) → Accusative: auf den Tisch', vi: 'legen (hướng/Wohin?) → Akkusativ: auf den Tisch' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Er hängt das Bild an der Wand.', questionEn: 'Correct (he is hanging it = movement).', questionVi: 'Sửa lỗi (đang treo = hướng).', answerData: { correctedText: 'Er hängt das Bild an die Wand.' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Cuốn sách nằm trên bàn.', questionEn: 'The book is on the table.', answerData: { acceptedAnswers: ['Das Buch liegt auf dem Tisch.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Tôi đặt điện thoại vào túi.', questionEn: 'I put the phone in the bag.', answerData: { acceptedAnswers: ['Ich lege das Handy in die Tasche.', 'Ich stecke das Handy in die Tasche.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Chúng tôi gặp nhau trước rạp chiếu phim.', questionEn: 'We meet in front of the cinema.', answerData: { acceptedAnswers: ['Wir treffen uns vor dem Kino.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 11: ADJEKTIVDEKLINATION
    // =================================================================
    {
        slug: 'a2-l11-adjektiv-deklination',
        level: 'A2',
        lessonNumber: 11,
        titleDe: 'Adjektivdeklination',
        titleEn: 'Adjective Endings',
        titleVi: 'Đuôi tính từ (Adjektivdeklination)',
        objectives: {
            de: ['Adjektivendungen nach bestimmtem Artikel kennen', 'Adjektivendungen nach unbestimmtem Artikel kennen', 'Adjektivendungen im Nominativ und Akkusativ anwenden', 'Attributive Adjektive korrekt deklinieren'],
            en: ['Know adjective endings after definite article', 'Know adjective endings after indefinite article', 'Apply endings in Nominative and Accusative', 'Correctly decline attributive adjectives'],
            vi: ['Biết đuôi tính từ sau mạo từ xác định', 'Biết đuôi tính từ sau mạo từ không xác định', 'Áp dụng đuôi ở Nominativ và Akkusativ', 'Chia đúng tính từ bổ ngữ']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Nach bestimmtem Artikel (der/die/das)', en: 'After Definite Article', vi: 'Sau mạo từ xác định (der/die/das)' },
                    content: 'After definite articles, adjectives use -e or -en endings.',
                    table: {
                        headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutrum', 'Plural'],
                        rows: [
                            ['Nominativ', 'der alt-e Mann', 'die alt-e Frau', 'das alt-e Kind', 'die alt-en Leute'],
                            ['Akkusativ', 'den alt-en Mann', 'die alt-e Frau', 'das alt-e Kind', 'die alt-en Leute'],
                            ['Dativ', 'dem alt-en Mann', 'der alt-en Frau', 'dem alt-en Kind', 'den alt-en Leuten'],
                        ]
                    }
                },
                {
                    title: { de: 'Nach unbestimmtem Artikel (ein/eine)', en: 'After Indefinite Article', vi: 'Sau mạo từ không xác định (ein/eine)' },
                    content: 'After indefinite articles (ein, eine, kein, mein, etc.) adjectives show more case information.',
                    table: {
                        headers: ['Kasus', 'Maskulin', 'Feminin', 'Neutrum', 'Plural (kein)'],
                        rows: [
                            ['Nominativ', 'ein alt-er Mann', 'eine alt-e Frau', 'ein alt-es Kind', 'keine alt-en Leute'],
                            ['Akkusativ', 'einen alt-en Mann', 'eine alt-e Frau', 'ein alt-es Kind', 'keine alt-en Leute'],
                            ['Dativ', 'einem alt-en Mann', 'einer alt-en Frau', 'einem alt-en Kind', 'keinen alt-en Leuten'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 35,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"Der ___ Mann kommt." (alt)', questionEn: '"The old man is coming."', questionVi: '"Người đàn ông ___ đến." (già)', answerData: { options: ['alte', 'alter', 'alten', 'altem'], correctIndex: 0 }, explanation: { de: 'Nom. Mask. nach "der" → -e', en: 'Nom. Masc. after "der" → -e', vi: 'Nominativ Maskulin sau "der" → -e' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Ich sehe den ___ Mann." (alt)', questionEn: '"I see the old man."', questionVi: '"Tôi nhìn thấy người đàn ông ___."', answerData: { options: ['alten', 'alte', 'alter', 'altes'], correctIndex: 0 }, explanation: { de: 'Akk. Mask. nach "den" → -en', en: 'Acc. Masc. after "den" → -en', vi: 'Akkusativ Maskulin sau "den" → -en' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Ein ___ Mann wohnt hier." (alt)', questionEn: '"An old man lives here."', questionVi: '"Một người đàn ông ___ sống ở đây."', answerData: { options: ['alter', 'alte', 'alten', 'altem'], correctIndex: 0 }, explanation: { de: 'Nom. Mask. nach "ein" → -er', en: 'Nom. Masc. after "ein" → -er', vi: 'Nominativ Maskulin sau "ein" → -er' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Sie trinkt ein ___ Wasser." (kalt, n)', questionEn: '"She drinks a cold water."', questionVi: '"Cô ấy uống một ly nước ___."', answerData: { options: ['kaltes', 'kalte', 'kalten', 'kalt'], correctIndex: 0 }, explanation: { de: 'Akk. Neutr. nach "ein" → -es', en: 'Acc. Neut. after "ein" → -es', vi: 'Akkusativ Neutrum sau "ein" → -es' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Die ___ Frau ist meine Mutter." (jung)', questionEn: '"The young woman is my mother."', questionVi: '"Người phụ nữ ___ là mẹ tôi."', answerData: { options: ['junge', 'jungen', 'junger', 'junges'], correctIndex: 0 }, explanation: { de: 'Nom. Fem. nach "die" → -e', en: 'Nom. Fem. after "die" → -e', vi: 'Nominativ Feminin sau "die" → -e' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: '"Ich kaufe eine ___ Tasche." (rot, f)', questionEn: '"I buy a red bag."', questionVi: '"Tôi mua một chiếc túi ___."', answerData: { options: ['rote', 'roter', 'roten', 'rotes'], correctIndex: 0 }, explanation: { de: 'Akk. Fem. nach "eine" → -e', en: 'Acc. Fem. after "eine" → -e', vi: 'Akkusativ Feminin sau "eine" → -e' }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Das ist ein ___ Buch." (gut, n)', questionEn: '"That is a good book."', questionVi: '"Đó là một cuốn sách ___."', answerData: { options: ['gutes', 'gute', 'guten', 'gut'], correctIndex: 0 }, explanation: { de: 'Nom. Neutr. nach "ein" → -es', en: 'Nom. Neut. after "ein" → -es', vi: 'Nominativ Neutrum sau "ein" → -es' }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Er hilft dem ___ Mann." (alt, Dativ)', questionEn: '"He helps the old man." (dative)', questionVi: '"Anh ấy giúp người đàn ông ___." (Dativ)', answerData: { options: ['alten', 'alte', 'alter', 'altem'], correctIndex: 0 }, explanation: { de: 'Dat. Mask. nach "dem" → -en', en: 'Dat. Masc. after "dem" → -en', vi: 'Dativ Maskulin sau "dem" → -en' }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Ich sehe die ___ Frau. (jung)', questionEn: 'I see the young woman.', questionVi: 'Tôi nhìn thấy người phụ nữ trẻ.', answerData: { blanks: [{ answer: 'junge', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Er kauft einen ___ Wagen. (neu, m)', questionEn: 'He buys a new car.', questionVi: 'Anh ấy mua một chiếc xe mới.', answerData: { blanks: [{ answer: 'neuen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Das ist ein ___ Tag. (schön, m)', questionEn: 'This is a beautiful day.', questionVi: 'Đây là một ngày đẹp.', answerData: { blanks: [{ answer: 'schöner', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Wir wohnen in einer ___ Stadt. (klein, f Dativ)', questionEn: 'We live in a small city.', questionVi: 'Chúng tôi sống ở một thành phố nhỏ.', answerData: { blanks: [{ answer: 'kleinen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Ich lese das ___ Buch. (interessant, n Akk)', questionEn: 'I read the interesting book.', questionVi: 'Tôi đọc cuốn sách thú vị.', answerData: { blanks: [{ answer: 'interessante', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Das Kind trinkt einen ___ Saft. (frisch, m Akk)', questionEn: 'The child drinks a fresh juice.', questionVi: 'Đứa trẻ uống nước ép tươi.', answerData: { blanks: [{ answer: 'frischen', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Sie hat eine ___ Idee. (gut, f)', questionEn: 'She has a good idea.', questionVi: 'Cô ấy có một ý kiến hay.', answerData: { blanks: [{ answer: 'gute', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Der', 'alte', 'Mann', 'wohnt', 'allein.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Er', 'trinkt', 'ein', 'kaltes', 'Wasser.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'sehe', 'einen', 'großen', 'Hund.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Das', 'ist', 'eine', 'schöne', 'Stadt.'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Ich sehe der alte Mann.', questionEn: 'Correct the article and case.', questionVi: 'Sửa lỗi mạo từ và cách.', answerData: { correctedText: 'Ich sehe den alten Mann.' }, explanation: { de: 'sehen + Akkusativ Maskulin → den alten Mann', en: 'sehen + Accusative Masculine → den alten Mann', vi: 'sehen + Akkusativ Maskulin → den alten Mann' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Sie kauft ein roter Mantel.', questionEn: 'Correct the article and adjective ending.', questionVi: 'Sửa lỗi mạo từ và đuôi tính từ.', answerData: { correctedText: 'Sie kauft einen roten Mantel.' }, explanation: { de: 'Akk. Mask. → einen + -en', en: 'Acc. Masc. → einen + -en', vi: 'Akkusativ Maskulin → einen + -en' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Das ist ein gut Idee.', questionEn: 'Correct the adjective ending.', questionVi: 'Sửa lỗi đuôi tính từ.', answerData: { correctedText: 'Das ist eine gute Idee.' }, explanation: { de: 'Idee = feminin, Nom. → eine gute Idee', en: 'Idee = feminine, Nom. → eine gute Idee', vi: 'Idee = giống cái, Nom. → eine gute Idee' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Đó là một cuốn sách thú vị.', questionEn: 'That is an interesting book.', answerData: { acceptedAnswers: ['Das ist ein interessantes Buch.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Tôi nhìn thấy một người đàn ông cao.', questionEn: 'I see a tall man.', answerData: { acceptedAnswers: ['Ich sehe einen großen Mann.', 'Ich sehe einen langen Mann.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Cô ấy uống cà phê nóng.', questionEn: 'She drinks hot coffee.', answerData: { acceptedAnswers: ['Sie trinkt einen heißen Kaffee.', 'Sie trinkt heißen Kaffee.'] }, points: 1 },
        ]
    },

    // =================================================================
    // LEKTION 12: RELATIVSÄTZE
    // =================================================================
    {
        slug: 'a2-l12-relativsaetze',
        level: 'A2',
        lessonNumber: 12,
        titleDe: 'Relativsätze',
        titleEn: 'Relative Clauses',
        titleVi: 'Mệnh đề quan hệ (Relativsätze)',
        objectives: {
            de: ['Relativpronomen im Nominativ und Akkusativ kennen', 'Relativsätze mit der/die/das/die bilden', 'Verb-Endstellung im Relativsatz verstehen', 'Substantive durch Relativsätze näher beschreiben'],
            en: ['Know relative pronouns in Nominative and Accusative', 'Form relative clauses with der/die/das/die', 'Understand verb-final in relative clauses', 'Describe nouns more closely with relative clauses'],
            vi: ['Biết đại từ quan hệ ở Nominativ và Akkusativ', 'Tạo mệnh đề quan hệ với der/die/das/die', 'Hiểu động từ đứng cuối trong mệnh đề quan hệ', 'Mô tả danh từ chi tiết hơn với mệnh đề quan hệ']
        },
        theoryContent: {
            sections: [
                {
                    title: { de: 'Relativpronomen (Nominativ & Akkusativ)', en: 'Relative Pronouns (Nom & Acc)', vi: 'Đại từ quan hệ (Nominativ & Akkusativ)' },
                    content: 'Relative pronouns agree with the gender of the noun they refer to. The verb goes to the END.',
                    table: {
                        headers: ['Genus', 'Nominativ (Subjekt)', 'Akkusativ (Objekt)', 'Beispiel (Nom)', 'Beispiel (Akk)'],
                        rows: [
                            ['Maskulin', 'der', 'den', 'Der Mann, der hier wohnt...', 'Der Mann, den ich kenne...'],
                            ['Feminin', 'die', 'die', 'Die Frau, die singt...', 'Die Frau, die ich sehe...'],
                            ['Neutrum', 'das', 'das', 'Das Kind, das lacht...', 'Das Kind, das ich mag...'],
                            ['Plural', 'die', 'die', 'Die Kinder, die spielen...', 'Die Kinder, die ich kenne...'],
                        ]
                    }
                },
                {
                    title: { de: 'Struktur des Relativsatzes', en: 'Structure of Relative Clauses', vi: 'Cấu trúc mệnh đề quan hệ' },
                    content: 'The relative clause is a subordinate clause. The verb goes to the END. It is separated by commas.',
                    table: {
                        headers: ['Hauptsatz', 'Relativsatz (Verb am Ende)'],
                        rows: [
                            ['Das ist der Mann,', 'der hier wohnt.'],
                            ['Ich kenne die Frau,', 'die Deutsch spricht.'],
                            ['Das ist das Buch,', 'das ich lese.'],
                            ['Ich mag die Schuhe,', 'die du trägst.'],
                        ]
                    }
                }
            ]
        },
        estimatedMinutes: 30,
        exercises: [
            { exerciseType: 'mcq', order: 1, questionDe: '"Das ist der Mann, ___ hier wohnt."', questionEn: '"That is the man who lives here."', questionVi: '"Đó là người đàn ông ___ sống ở đây."', answerData: { options: ['der', 'den', 'die', 'das'], correctIndex: 0 }, explanation: { de: 'Mann = maskulin, Nom. (Subjekt des Relativsatzes) → der', en: 'Mann = masculine, Nom. (subject of relative clause) → der', vi: 'Mann = giống đực, Nom. (chủ ngữ) → der' }, points: 1 },
            { exerciseType: 'mcq', order: 2, questionDe: '"Die Frau, ___ ich kenne, ist Ärztin."', questionEn: '"The woman whom I know is a doctor."', questionVi: '"Người phụ nữ ___ tôi quen là bác sĩ."', answerData: { options: ['die', 'der', 'das', 'den'], correctIndex: 0 }, explanation: { de: 'Frau = feminin, Akk. (Objekt "ich kenne") → die', en: 'Frau = feminine, Acc. (object "ich kenne") → die', vi: 'Frau = giống cái, Akk. (tân ngữ) → die' }, points: 1 },
            { exerciseType: 'mcq', order: 3, questionDe: '"Das Buch, ___ ich lese, ist interessant."', questionEn: '"The book that I am reading is interesting."', questionVi: '"Cuốn sách ___ tôi đọc rất thú vị."', answerData: { options: ['das', 'der', 'die', 'den'], correctIndex: 0 }, explanation: { de: 'Buch = Neutrum, Akk. → das', en: 'Buch = neuter, Acc. → das', vi: 'Buch = giống trung, Akk. → das' }, points: 1 },
            { exerciseType: 'mcq', order: 4, questionDe: '"Der Mann, ___ ich sehe, ist groß."', questionEn: '"The man whom I see is tall."', questionVi: '"Người đàn ông ___ tôi nhìn thấy rất cao."', answerData: { options: ['den', 'der', 'das', 'die'], correctIndex: 0 }, explanation: { de: 'Mann = maskulin, Akk. (Objekt "ich sehe") → den', en: 'Mann = masculine, Acc. (object "ich sehe") → den', vi: 'Mann = giống đực, Akk. (tân ngữ) → den' }, points: 1 },
            { exerciseType: 'mcq', order: 5, questionDe: '"Die Kinder, ___ spielen, sind laut."', questionEn: '"The children who are playing are loud."', questionVi: '"Những đứa trẻ ___ đang chơi rất ồn."', answerData: { options: ['die', 'der', 'das', 'den'], correctIndex: 0 }, explanation: { de: 'Plural → die (Nom.)', en: 'Plural → die (Nom.)', vi: 'Số nhiều → die (Nom.)' }, points: 1 },
            { exerciseType: 'mcq', order: 6, questionDe: 'Wortstellung im Relativsatz: Das Verb steht...', questionEn: 'Word order in relative clause: The verb is...', questionVi: 'Trật tự từ trong mệnh đề quan hệ: Động từ đứng...', answerData: { options: ['am Ende', 'an Position 2', 'am Anfang', 'nach dem Subjekt'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 7, questionDe: '"Das ist die Stadt, ___ ich liebe."', questionEn: '"That is the city that I love."', questionVi: '"Đó là thành phố ___ tôi yêu thích."', answerData: { options: ['die', 'der', 'das', 'den'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'mcq', order: 8, questionDe: '"Das Lied, ___ er singt, ist schön."', questionEn: '"The song that he sings is beautiful."', questionVi: '"Bài hát ___ anh ấy hát rất hay."', answerData: { options: ['das', 'die', 'der', 'den'], correctIndex: 0 }, points: 1 },
            { exerciseType: 'fill_blank', order: 9, questionDe: 'Das ist der Mann, ___ hier wohnt.', questionEn: 'That is the man who lives here.', questionVi: 'Đó là người đàn ông sống ở đây.', answerData: { blanks: [{ answer: 'der', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 10, questionDe: 'Ich kenne die Frau, ___ du liebst.', questionEn: 'I know the woman you love.', questionVi: 'Tôi biết người phụ nữ mà bạn yêu.', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 11, questionDe: 'Das ist das Kind, ___ immer lacht.', questionEn: 'That is the child who always laughs.', questionVi: 'Đó là đứa trẻ luôn cười.', answerData: { blanks: [{ answer: 'das', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 12, questionDe: 'Der Film, ___ ich gesehen habe, war toll.', questionEn: 'The film that I watched was great.', questionVi: 'Bộ phim mà tôi đã xem rất hay.', answerData: { blanks: [{ answer: 'den', alternatives: [] }] }, explanation: { de: 'Film = maskulin, Akk. (Objekt "ich gesehen habe") → den', en: 'Film = masculine, Acc. → den', vi: 'Film = giống đực, Akk. (tân ngữ) → den' }, points: 1 },
            { exerciseType: 'fill_blank', order: 13, questionDe: 'Die Schuhe, ___ sie kauft, sind teuer.', questionEn: 'The shoes she is buying are expensive.', questionVi: 'Đôi giày cô ấy mua rất đắt.', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 14, questionDe: 'Das ist die Lehrerin, ___ Deutsch unterrichtet.', questionEn: 'That is the teacher who teaches German.', questionVi: 'Đó là giáo viên dạy tiếng Đức.', answerData: { blanks: [{ answer: 'die', alternatives: [] }] }, points: 1 },
            { exerciseType: 'fill_blank', order: 15, questionDe: 'Der Hund, ___ ich streichle, ist sehr lieb.', questionEn: 'The dog that I pet is very sweet.', questionVi: 'Con chó mà tôi vuốt ve rất dễ thương.', answerData: { blanks: [{ answer: 'den', alternatives: [] }] }, points: 1 },
            { exerciseType: 'reorder', order: 16, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Das', 'ist', 'der', 'Mann,', 'der', 'hier', 'wohnt.'] }, points: 1 },
            { exerciseType: 'reorder', order: 17, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Das', 'Buch,', 'das', 'ich', 'lese,', 'ist', 'interessant.'] }, points: 1 },
            { exerciseType: 'reorder', order: 18, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Die', 'Frau,', 'die', 'er', 'kennt,', 'ist', 'Ärztin.'] }, points: 1 },
            { exerciseType: 'reorder', order: 19, questionDe: 'Bilde einen Satz:', questionEn: 'Form a sentence:', questionVi: 'Sắp xếp thành câu:', answerData: { correctOrder: ['Ich', 'mag', 'den', 'Mann,', 'den', 'du', 'kennst.'] }, points: 1 },
            { exerciseType: 'error_correct', order: 20, questionDe: 'Korrigiere: Das ist der Mann, den hier wohnt.', questionEn: 'Correct the relative pronoun (Nominative needed).', questionVi: 'Sửa đại từ quan hệ (cần Nominativ).', answerData: { correctedText: 'Das ist der Mann, der hier wohnt.' }, explanation: { de: 'hier wohnt = kein Objekt → Nominativ → der', en: 'wohnt = no object → Nominative → der', vi: 'wohnt = không có tân ngữ → Nominativ → der' }, points: 1 },
            { exerciseType: 'error_correct', order: 21, questionDe: 'Korrigiere: Das Buch, das ich lese ist interessant.', questionEn: 'Add the missing comma.', questionVi: 'Thêm dấu phẩy còn thiếu.', answerData: { correctedText: 'Das Buch, das ich lese, ist interessant.' }, explanation: { de: 'Relativsätze werden durch Kommas eingeschlossen', en: 'Relative clauses are enclosed by commas', vi: 'Mệnh đề quan hệ được bao bởi dấu phẩy' }, points: 1 },
            { exerciseType: 'error_correct', order: 22, questionDe: 'Korrigiere: Die Frau, die ich kenne ist sehr nett.', questionEn: 'Add the missing comma.', questionVi: 'Thêm dấu phẩy còn thiếu.', answerData: { correctedText: 'Die Frau, die ich kenne, ist sehr nett.' }, points: 1 },
            { exerciseType: 'translate', order: 23, questionVi: 'Đây là người phụ nữ mà tôi gặp hôm qua.', questionEn: 'This is the woman I met yesterday.', answerData: { acceptedAnswers: ['Das ist die Frau, die ich gestern getroffen habe.'] }, points: 1 },
            { exerciseType: 'translate', order: 24, questionVi: 'Anh ấy là người đàn ông sống ở đây.', questionEn: 'He is the man who lives here.', answerData: { acceptedAnswers: ['Er ist der Mann, der hier wohnt.'] }, points: 1 },
            { exerciseType: 'translate', order: 25, questionVi: 'Cuốn sách mà tôi đang đọc rất thú vị.', questionEn: 'The book that I am reading is very interesting.', answerData: { acceptedAnswers: ['Das Buch, das ich lese, ist sehr interessant.'] }, points: 1 },
        ]
    },
];

// =================================================================
// SEED FUNCTION
// =================================================================
export async function seedGrammarA2() {
    console.log('\n📝 Seeding Grammar A2 lessons...');

    let lessonCount = 0;
    let exerciseCount = 0;

    for (const lesson of lessons) {
        const { exercises, ...lessonData } = lesson;

        // Upsert lesson (skip if already exists)
        const existing = await prisma.grammarLesson.findUnique({ where: { slug: lessonData.slug } });
        if (existing) {
            console.log(`  ↩ Skipped (already exists): ${lessonData.titleEn}`);
            continue;
        }

        const created = await prisma.grammarLesson.create({
            data: {
                ...lessonData,
                order: lessonData.lessonNumber + 100, // A2 orders start at 101
            },
        });

        lessonCount++;

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

    console.log(`\n✅ Seeded ${lessonCount} A2 grammar lessons with ${exerciseCount} total exercises!`);
}

// Run if called directly
if (require.main === module) {
    seedGrammarA2()
        .catch((e) => { console.error('❌ Error:', e); process.exit(1); })
        .finally(async () => { await prisma.$disconnect(); });
}
