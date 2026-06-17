// Bidirectional latinica <-> ćirilica transliteration
// Handles all 30 Serbian letters including digraphs

const latinToCyrillic: [string, string][] = [
  // Digraphs MUST come before single letters
  ["LJ", "Љ"],
  ["NJ", "Њ"],
  ["DŽ", "Џ"],
  ["Lj", "Љ"],
  ["Nj", "Њ"],
  ["Dž", "Џ"],
  ["lj", "љ"],
  ["nj", "њ"],
  ["dž", "џ"],
  // Single letters
  ["A", "А"],
  ["B", "Б"],
  ["V", "В"],
  ["G", "Г"],
  ["D", "Д"],
  ["Đ", "Ђ"],
  ["E", "Е"],
  ["Ž", "Ж"],
  ["Z", "З"],
  ["I", "И"],
  ["J", "Ј"],
  ["K", "К"],
  ["L", "Л"],
  ["M", "М"],
  ["N", "Н"],
  ["O", "О"],
  ["P", "П"],
  ["R", "Р"],
  ["S", "С"],
  ["T", "Т"],
  ["Ć", "Ћ"],
  ["U", "У"],
  ["F", "Ф"],
  ["H", "Х"],
  ["C", "Ц"],
  ["Č", "Ч"],
  ["Š", "Ш"],
  ["a", "а"],
  ["b", "б"],
  ["v", "в"],
  ["g", "г"],
  ["d", "д"],
  ["đ", "ђ"],
  ["e", "е"],
  ["ž", "ж"],
  ["z", "з"],
  ["i", "и"],
  ["j", "ј"],
  ["k", "к"],
  ["l", "л"],
  ["m", "м"],
  ["n", "н"],
  ["o", "о"],
  ["p", "п"],
  ["r", "р"],
  ["s", "с"],
  ["t", "т"],
  ["ć", "ћ"],
  ["u", "у"],
  ["f", "ф"],
  ["h", "х"],
  ["c", "ц"],
  ["č", "ч"],
  ["š", "ш"],
];

const cyrillicToLatin: [string, string][] = [
  ["А", "A"], ["Б", "B"], ["В", "V"], ["Г", "G"], ["Д", "D"],
  ["Ђ", "Đ"], ["Е", "E"], ["Ж", "Ž"], ["З", "Z"], ["И", "I"],
  ["Ј", "J"], ["К", "K"], ["Љ", "Lj"], ["М", "M"], ["Н", "N"],
  ["Њ", "Nj"], ["О", "O"], ["П", "P"], ["Р", "R"], ["С", "S"],
  ["Т", "T"], ["Ћ", "Ć"], ["У", "U"], ["Ф", "F"], ["Х", "H"],
  ["Ц", "C"], ["Ч", "Č"], ["Џ", "Dž"], ["Ш", "Š"],
  ["а", "a"], ["б", "b"], ["в", "v"], ["г", "g"], ["д", "d"],
  ["ђ", "đ"], ["е", "e"], ["ж", "ž"], ["з", "z"], ["и", "i"],
  ["ј", "j"], ["к", "k"], ["љ", "lj"], ["м", "m"], ["н", "n"],
  ["њ", "nj"], ["о", "o"], ["п", "p"], ["р", "r"], ["с", "s"],
  ["т", "t"], ["ћ", "ć"], ["у", "u"], ["ф", "f"], ["х", "h"],
  ["ц", "c"], ["ч", "č"], ["џ", "dž"], ["ш", "š"],
];

export function latinToCyr(text: string): string {
  let result = text;
  for (const [latin, cyrillic] of latinToCyrillic) {
    result = result.split(latin).join(cyrillic);
  }
  return result;
}

export function cyrToLatin(text: string): string {
  let result = text;
  for (const [cyrillic, latin] of cyrillicToLatin) {
    result = result.split(cyrillic).join(latin);
  }
  return result;
}

export function transliterate(text: string, script: "latin" | "cyrillic"): string {
  if (script === "cyrillic") return latinToCyr(text);
  return cyrToLatin(text);
}

export function isCyrillic(text: string): boolean {
  return /[Ѐ-ӿ]/.test(text);
}

export function toLatin(text: string): string {
  return isCyrillic(text) ? cyrToLatin(text) : text;
}

export function toCyrillic(text: string): string {
  return isCyrillic(text) ? text : latinToCyr(text);
}
