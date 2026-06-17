"use client";

export interface SpeakOptions {
  lang?: string;
  rate?: number;
  pitch?: number;
}

let ttsAvailable: boolean | null = null;
let srVoice: SpeechSynthesisVoice | null = null;

function detectVoice(): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    ttsAvailable = false;
    return false;
  }

  const voices = window.speechSynthesis.getVoices();
  if (voices.length === 0) {
    // Voices load asynchronously on some browsers
    ttsAvailable = true; // optimistic — will find voice on first speak
    return true;
  }

  srVoice = voices.find((v) => v.lang.startsWith("sr")) ?? null;
  ttsAvailable = true;
  return true;
}

export function isTtsAvailable(): boolean {
  if (ttsAvailable === null) detectVoice();
  return ttsAvailable ?? false;
}

export function speak(
  text: string,
  options: SpeakOptions = {}
): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = options.lang ?? "sr-RS";
  utterance.rate = options.rate ?? 0.9;
  utterance.pitch = options.pitch ?? 1;

  if (!srVoice) {
    const voices = window.speechSynthesis.getVoices();
    srVoice = voices.find((v) => v.lang.startsWith("sr")) ?? null;
  }

  if (srVoice) utterance.voice = srVoice;

  window.speechSynthesis.speak(utterance);
}

export function stopSpeech(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = () => {
    detectVoice();
  };
}
