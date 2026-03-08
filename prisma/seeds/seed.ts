import { prisma } from './client';
import { seedPart1 } from './words-part1.seed';
import { seedPart2 } from './words-part2.seed';
import { seedPart3 } from './words-part3.seed';
import { seedGrammarA1 } from './grammar-a1';
import { seedGrammarA2 } from './grammar-a2';

async function main() {
  console.log('🚀 Deutschmeister Full Database Seed');
  console.log('====================================\n');

  // Clear existing topic data
  console.log('🗑️  Clearing existing topic data...');
  await prisma.topicWord.deleteMany();
  await prisma.topicProgress.deleteMany();
  await prisma.topic.deleteMany();
  console.log('  ✓ Cleared\n');

  await seedPart1();  // A1: 12 topics, ~461 words
  await seedPart2();  // A2+B1: 12 topics, ~341 words
  await seedPart3();  // B2+Professional: 12 topics, ~416 words

  // Grammar — A1 clears all grammar data first, then A2 appends
  await seedGrammarA1();
  await seedGrammarA2();

  // Summary
  const topicCount = await prisma.topic.count();
  const wordCount = await prisma.word.count();
  const topicWordCount = await prisma.topicWord.count();
  const grammarLessonCount = await prisma.grammarLesson.count();
  const grammarExerciseCount = await prisma.grammarExercise.count();

  console.log('\n====================================');
  console.log(`🎉 Seed complete!`);
  console.log(`   ${topicCount} topics`);
  console.log(`   ${wordCount} unique words`);
  console.log(`   ${topicWordCount} topic-word links`);
  console.log(`   ${grammarLessonCount} grammar lessons`);
  console.log(`   ${grammarExerciseCount} grammar exercises`);
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());