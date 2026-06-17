import type { SrsCard, SrsQuality } from "@/lib/data/types";

const MIN_EASE = 1.3;
const INITIAL_EASE = 2.5;

export function createSrsCard(vocabItemId: string): SrsCard {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return {
    vocabItemId,
    interval: 1,
    easeFactor: INITIAL_EASE,
    repetitions: 0,
    nextReview: tomorrow.toISOString().split("T")[0],
    lastReviewed: null,
  };
}

export function grade(card: SrsCard, quality: SrsQuality): SrsCard {
  const now = new Date().toISOString().split("T")[0];
  let { interval, easeFactor, repetitions } = card;

  switch (quality) {
    case "again":
      interval = 1; // review again < 1 day (next day)
      repetitions = 0;
      // ease unchanged
      break;

    case "hard":
      interval = Math.round(interval * 1.2);
      easeFactor = Math.max(MIN_EASE, easeFactor - 0.15);
      repetitions += 1;
      break;

    case "good":
      if (repetitions === 0) {
        interval = 1;
      } else if (repetitions === 1) {
        interval = 6;
      } else {
        interval = Math.round(interval * easeFactor);
      }
      repetitions += 1;
      break;

    case "easy":
      if (repetitions === 0) {
        interval = 4;
      } else if (repetitions === 1) {
        interval = 10;
      } else {
        interval = Math.round(interval * easeFactor * 1.3);
      }
      easeFactor = Math.min(3.0, easeFactor + 0.15);
      repetitions += 1;
      break;
  }

  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + interval);

  return {
    ...card,
    interval,
    easeFactor,
    repetitions,
    nextReview: nextReviewDate.toISOString().split("T")[0],
    lastReviewed: now,
  };
}

export function isDueToday(card: SrsCard): boolean {
  const today = new Date().toISOString().split("T")[0];
  return card.nextReview <= today;
}

export function dueCount(cards: Record<string, SrsCard>): number {
  return Object.values(cards).filter(isDueToday).length;
}

export function dueTodayCards(cards: Record<string, SrsCard>): SrsCard[] {
  return Object.values(cards).filter(isDueToday);
}
