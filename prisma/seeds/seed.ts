import { prisma } from './client';
import { seedPart1 } from './words-part1.seed';
import { seedPart2 } from './words-part2.seed';
import { seedPart3 } from './words-part3.seed';



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

  // Summary
  const topicCount = await prisma.topic.count();
  const wordCount = await prisma.word.count();
  const topicWordCount = await prisma.topicWord.count();

  console.log('\n====================================');
  console.log(`🎉 Seed complete!`);
  console.log(`   ${topicCount} topics`);
  console.log(`   ${wordCount} unique words`);
  console.log(`   ${topicWordCount} topic-word links`);
}

main()
  .catch(e => { console.error('❌ Seed failed:', e); process.exit(1); })
  .finally(() => prisma.$disconnect());