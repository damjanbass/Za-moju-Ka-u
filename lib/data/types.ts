// Core data types for the entire application

export interface VocabItem {
  id: string;
  serbianLatin: string;
  serbianCyrillic: string;
  spanish: string;
  exampleSentenceSr: string;
  exampleSentenceSrCyrillic: string;
  exampleSentenceEs: string;
  frequencyRank: number;
  audioUrl: string | null;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "conjunction" | "interjection" | "numeral" | "phrase";
  gender?: "masculine" | "feminine" | "neuter";
  notesForSpanishSpeaker?: string;
  tags?: string[];
}

export type ExerciseType =
  | "recognize"
  | "match"
  | "build-sentence"
  | "type"
  | "fill-gap"
  | "listening"
  | "pronunciation"
  | "reverse-translation";

export interface BaseExercise {
  id: string;
  type: ExerciseType;
  vocabItemId?: string;
  explanation?: string; // Spanish micro-explanation shown after error
}

export interface RecognizeExercise extends BaseExercise {
  type: "recognize";
  promptSr: string;
  correctAnswer: string; // Spanish meaning
  distractors: string[]; // 3 wrong Spanish meanings
}

export interface MatchExercise extends BaseExercise {
  type: "match";
  pairs: Array<{ sr: string; es: string }>;
}

export interface BuildSentenceExercise extends BaseExercise {
  type: "build-sentence";
  promptEs: string;
  correctOrderSr: string[];
  distractorWords?: string[];
}

export interface TypeExercise extends BaseExercise {
  type: "type";
  promptEs: string;
  correctAnswerSr: string;
  acceptedVariants?: string[];
}

export interface FillGapExercise extends BaseExercise {
  type: "fill-gap";
  sentenceWithGap: string; // e.g. "Vidim ___"
  correctAnswer: string;
  options: string[];
  patternNote?: string; // grammar pattern label
}

export interface ListeningExercise extends BaseExercise {
  type: "listening";
  audioTextSr: string;
  question: string; // in Spanish
  correctAnswer: string;
  distractors: string[];
}

export interface PronunciationExercise extends BaseExercise {
  type: "pronunciation";
  targetSr: string;
  tipEs: string;
}

export interface ReverseTranslationExercise extends BaseExercise {
  type: "reverse-translation";
  promptEs: string;
  correctAnswerSr: string;
  acceptedVariants?: string[];
}

export type Exercise =
  | RecognizeExercise
  | MatchExercise
  | BuildSentenceExercise
  | TypeExercise
  | FillGapExercise
  | ListeningExercise
  | PronunciationExercise
  | ReverseTranslationExercise;

export interface Lesson {
  id: string;
  title: string; // Spanish
  description: string; // Spanish
  unitId: string;
  order: number;
  exercises: Exercise[];
  vocabItems: VocabItem[];
  xpReward: number;
}

export interface Unit {
  id: string;
  title: string; // Spanish
  description: string; // Spanish
  icon: string; // emoji
  order: number;
  lessons: Lesson[];
  color: string; // Tailwind color class
  requiredXp: number; // XP needed to unlock (0 = always unlocked)
}

// SRS (Spaced Repetition System) card
export interface SrsCard {
  vocabItemId: string;
  interval: number; // days until next review
  easeFactor: number; // starts at 2.5
  repetitions: number;
  nextReview: string; // ISO date string
  lastReviewed: string | null;
}

export type SrsQuality = "again" | "hard" | "good" | "easy";

// Conversation system
export interface DialogueOption {
  sr: string;
  es: string;
  nextNodeId: string | null; // null = end of scene
  isBest: boolean;
  acceptedTypedAnswers?: string[]; // lowercase normalized variants
}

export interface DialogueNode {
  id: string;
  speakerLineSr: string;
  speakerLineSrCyrillic: string;
  speakerLineEs: string;
  userOptions: DialogueOption[];
  acceptedTypedAnswers?: string[]; // lowercase normalized variants for free-text input
  correctionNote?: string; // Spanish feedback shown after user responds
  tipNext?: string; // Spanish hint for the upcoming phrase
  vocabItemIds?: string[]; // items added to SRS on this node
}

export interface ConversationScene {
  id: string;
  title: string; // Spanish
  description: string; // Spanish
  icon: string;
  level: "A1" | "A2" | "B1" | "B2";
  startNodeId: string;
  nodes: Record<string, DialogueNode>;
  xpReward: number;
}

// Graded reader stories
export interface StoryParagraph {
  sr: string;
  srCyrillic: string;
  es: string;
}

export interface ComprehensionQuestion {
  question: string; // Spanish
  correctAnswer: string;
  distractors: string[];
}

export interface Story {
  id: string;
  title: string; // Spanish
  titleSr: string;
  level: "A1" | "A2" | "B1" | "B2";
  paragraphs: StoryParagraph[];
  vocabItemIds: string[];
  questions: ComprehensionQuestion[];
  xpReward: number;
}

// Grammar module

export interface GrammarExample {
  sr: string;
  srCyrillic?: string;
  es: string;
  highlight?: string; // substring in sr to visually accent
}

export interface GrammarPattern {
  name: string;
  explanation: string;
  examples: GrammarExample[];
}

export interface GrammarTopic {
  id: string; // matches the [topic] URL slug
  title: string; // Spanish
  subtitle: string;
  icon: string;
  level: "A1" | "A2" | "B1" | "B2";
  intro: string;
  patterns: GrammarPattern[];
  tipForSpanishSpeakers: string;
}

// Alphabet module
export interface AlphabetLetter {
  latin: string;
  cyrillic: string;
  ipa: string;
  spanishHint: string; // how to explain the sound to a Spanish speaker
  exampleWordSr: string;
  exampleWordSrCyrillic: string;
  exampleWordEs: string;
  isNew: boolean; // true if the sound doesn't exist in Spanish
}

export interface MinimalPair {
  word1Sr: string;
  word1Es: string;
  word2Sr: string;
  word2Es: string;
  note: string; // Spanish explanation of the distinction
}
