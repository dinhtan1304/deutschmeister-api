/**
 * SM-2 (SuperMemo 2) Spaced Repetition Algorithm
 *
 * Shared utility used by both:
 * - ProgressService (built-in Word library SRS)
 * - PersonalWordsService (user-imported Word Bank SRS)
 *
 * Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 */

export type SM2Rating = 'again' | 'hard' | 'good' | 'easy';

export interface SM2Input {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

export interface SM2Output {
  easeFactor: number;
  interval: number;
  repetitions: number;
}

/**
 * Map user rating to SM-2 quality score (0-5)
 */
const QUALITY_MAP: Record<SM2Rating, number> = {
  again: 0, // Failed recall — reset
  hard: 3,  // Correct with serious difficulty
  good: 4,  // Correct with some hesitation
  easy: 5,  // Perfect recall
};

/**
 * Calculate new SM-2 parameters after a review.
 *
 * @param input  Current card state { easeFactor, interval, repetitions }
 * @param rating User's self-reported recall quality
 * @returns      Updated { easeFactor, interval, repetitions }
 */
export function calculateSM2(input: SM2Input, rating: SM2Rating): SM2Output {
  const quality = QUALITY_MAP[rating];

  // Failed (quality < 3) — reset repetitions, review again tomorrow
  if (quality < 3) {
    return {
      easeFactor: input.easeFactor,
      interval: 1,
      repetitions: 0,
    };
  }

  // EF' = EF + (0.1 - (5-q) * (0.08 + (5-q) * 0.02))
  const newEF = Math.max(
    1.3,
    input.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)),
  );

  // Calculate new interval
  let newInterval: number;
  if (input.repetitions === 0) {
    newInterval = 1;
  } else if (input.repetitions === 1) {
    newInterval = 6;
  } else {
    newInterval = Math.round(input.interval * newEF);
  }

  return {
    easeFactor: Math.round(newEF * 100) / 100,
    interval: newInterval,
    repetitions: input.repetitions + 1,
  };
}

/**
 * Calculate next review date from interval.
 */
export function nextReviewDate(intervalDays: number): Date {
  const date = new Date();
  date.setDate(date.getDate() + intervalDays);
  return date;
}

/**
 * Check if a rating counts as "correct" for stats purposes.
 */
export function isCorrectRating(rating: SM2Rating): boolean {
  return rating !== 'again';
}