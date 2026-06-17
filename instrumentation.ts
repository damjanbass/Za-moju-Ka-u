// Next.js instrumentation hook — runs before any page handler.
//
// Node.js 22+ exposes a global `localStorage` when started with
// `--localstorage-file`. Next.js 15 dev overlay checks
// `typeof localStorage !== 'undefined'` before calling `.getItem()`,
// but in Node.js 25 the object exists with `.getItem === undefined`,
// causing a TypeError. Patch it here with an in-memory implementation.
export async function register() {
  if (
    typeof globalThis !== "undefined" &&
    typeof (globalThis as Record<string, unknown>).localStorage !== "undefined" &&
    typeof (globalThis.localStorage as Storage | undefined)?.getItem !== "function"
  ) {
    const store = new Map<string, string>();
    (globalThis as Record<string, unknown>).localStorage = {
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => { store.set(key, String(value)); },
      removeItem: (key: string) => { store.delete(key); },
      clear: () => { store.clear(); },
      key: (index: number) => Array.from(store.keys())[index] ?? null,
      get length() { return store.size; },
    } as Storage;
  }
}
