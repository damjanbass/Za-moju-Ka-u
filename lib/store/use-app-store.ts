import { create } from "zustand";
import type { SrsCard, SrsQuality } from "@/lib/data/types";
import { grade, createSrsCard, dueCount } from "@/lib/srs";

export type Script = "latin" | "cyrillic";
export type DailyGoal = 5 | 10 | 20 | 30;
export type LearningGoal = "travel" | "family" | "work" | "culture";

interface Preferences {
  script: Script;
  audioSpeed: number;
  dailyGoal: DailyGoal;
  sound: boolean;
  learningGoal: LearningGoal | null;
  minutesPerDay: DailyGoal;
  onboardingComplete: boolean;
}

interface Progress {
  xp: number;
  streak: number;
  lastActiveDate: string | null;
  completedLessons: string[];
  unlockedUnits: string[];
}

interface AppState {
  preferences: Preferences;
  progress: Progress;
  srs: Record<string, SrsCard>;
  _hydrated: boolean;

  // Internal hydration action
  _hydrate: (saved: Partial<AppState>) => void;

  // Preference actions
  setScript: (script: Script) => void;
  setAudioSpeed: (speed: number) => void;
  setDailyGoal: (goal: DailyGoal) => void;
  setSound: (on: boolean) => void;
  setLearningGoal: (goal: LearningGoal) => void;
  setMinutesPerDay: (minutes: DailyGoal) => void;
  completeOnboarding: () => void;

  // Progress actions
  addXp: (amount: number) => void;
  completeLesson: (lessonId: string) => void;
  unlockUnit: (unitId: string) => void;
  updateStreak: () => void;

  // SRS actions
  addSrsCards: (vocabItemIds: string[]) => void;
  gradeSrsCard: (vocabItemId: string, quality: SrsQuality) => void;
  getDueCount: () => number;
}

const defaultPreferences: Preferences = {
  script: "latin",
  audioSpeed: 1.0,
  dailyGoal: 10,
  sound: true,
  learningGoal: null,
  minutesPerDay: 10,
  onboardingComplete: false,
};

const defaultProgress: Progress = {
  xp: 0,
  streak: 0,
  lastActiveDate: null,
  completedLessons: [],
  unlockedUnits: ["unit-0", "unit-1"],
};

export const useAppStore = create<AppState>()((set, get) => ({
  preferences: defaultPreferences,
  progress: defaultProgress,
  srs: {},
  _hydrated: false,

  _hydrate: (saved) =>
    set(() => ({
      preferences: { ...defaultPreferences, ...(saved.preferences ?? {}) },
      progress: { ...defaultProgress, ...(saved.progress ?? {}) },
      srs: saved.srs ?? {},
      _hydrated: true,
    })),

  setScript: (script) =>
    set((s) => ({ preferences: { ...s.preferences, script } })),

  setAudioSpeed: (audioSpeed) =>
    set((s) => ({ preferences: { ...s.preferences, audioSpeed } })),

  setDailyGoal: (dailyGoal) =>
    set((s) => ({ preferences: { ...s.preferences, dailyGoal } })),

  setSound: (sound) =>
    set((s) => ({ preferences: { ...s.preferences, sound } })),

  setLearningGoal: (learningGoal) =>
    set((s) => ({ preferences: { ...s.preferences, learningGoal } })),

  setMinutesPerDay: (minutesPerDay) =>
    set((s) => ({ preferences: { ...s.preferences, minutesPerDay } })),

  completeOnboarding: () =>
    set((s) => ({
      preferences: { ...s.preferences, onboardingComplete: true },
    })),

  addXp: (amount) =>
    set((s) => ({
      progress: { ...s.progress, xp: s.progress.xp + amount },
    })),

  completeLesson: (lessonId) =>
    set((s) => {
      if (s.progress.completedLessons.includes(lessonId)) return s;
      return {
        progress: {
          ...s.progress,
          completedLessons: [...s.progress.completedLessons, lessonId],
        },
      };
    }),

  unlockUnit: (unitId) =>
    set((s) => {
      if (s.progress.unlockedUnits.includes(unitId)) return s;
      return {
        progress: {
          ...s.progress,
          unlockedUnits: [...s.progress.unlockedUnits, unitId],
        },
      };
    }),

  updateStreak: () =>
    set((s) => {
      const today = new Date().toISOString().split("T")[0];
      const last = s.progress.lastActiveDate;
      if (last === today) return s;
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().split("T")[0];
      const newStreak = last === yStr ? s.progress.streak + 1 : 1;
      return {
        progress: { ...s.progress, streak: newStreak, lastActiveDate: today },
      };
    }),

  addSrsCards: (vocabItemIds) =>
    set((s) => {
      const newCards = { ...s.srs };
      for (const id of vocabItemIds) {
        if (!newCards[id]) newCards[id] = createSrsCard(id);
      }
      return { srs: newCards };
    }),

  gradeSrsCard: (vocabItemId, quality) =>
    set((s) => {
      const card = s.srs[vocabItemId];
      if (!card) return s;
      return { srs: { ...s.srs, [vocabItemId]: grade(card, quality) } };
    }),

  getDueCount: () => dueCount(get().srs),
}));

const STORAGE_KEY = "katica-app-store";

export function loadFromStorage(): Partial<AppState> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Partial<AppState>;
  } catch {
    return {};
  }
}

export function saveToStorage(state: AppState): void {
  try {
    const { preferences, progress, srs } = state;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ preferences, progress, srs }));
  } catch {}
}
