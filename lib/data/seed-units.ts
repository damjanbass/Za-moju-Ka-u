import type { Unit, VocabItem, AlphabetLetter, MinimalPair } from "./types";

// ─── Unit 0 — Alphabet & Sounds ─────────────────────────────────────────────

export const alphabetLetters: AlphabetLetter[] = [
  { latin: "A a", cyrillic: "А а", ipa: "/a/", spanishHint: "Como la 'a' en 'casa'", exampleWordSr: "auto", exampleWordSrCyrillic: "ауто", exampleWordEs: "coche", isNew: false },
  { latin: "B b", cyrillic: "Б б", ipa: "/b/", spanishHint: "Como la 'b' en 'barco'", exampleWordSr: "brat", exampleWordSrCyrillic: "брат", exampleWordEs: "hermano", isNew: false },
  { latin: "V v", cyrillic: "В в", ipa: "/v/", spanishHint: "Como la 'v' fricativa inglesa — siempre fricativa, nunca como 'b'", exampleWordSr: "voda", exampleWordSrCyrillic: "вода", exampleWordEs: "agua", isNew: false },
  { latin: "G g", cyrillic: "Г г", ipa: "/ɡ/", spanishHint: "Como la 'g' en 'gato'", exampleWordSr: "grad", exampleWordSrCyrillic: "град", exampleWordEs: "ciudad", isNew: false },
  { latin: "D d", cyrillic: "Д д", ipa: "/d/", spanishHint: "Como la 'd' en 'dado'", exampleWordSr: "dan", exampleWordSrCyrillic: "дан", exampleWordEs: "día", isNew: false },
  { latin: "Đ đ", cyrillic: "Ђ ђ", ipa: "/dʑ/", spanishHint: "Como una 'y' suave entre 'd' e 'y', como en italiano 'giorno'", exampleWordSr: "đak", exampleWordSrCyrillic: "ђак", exampleWordEs: "estudiante", isNew: true },
  { latin: "E e", cyrillic: "Е е", ipa: "/e/", spanishHint: "Como la 'e' en 'mesa'", exampleWordSr: "etaža", exampleWordSrCyrillic: "етажа", exampleWordEs: "planta (piso)", isNew: false },
  { latin: "Ž ž", cyrillic: "Ж ж", ipa: "/ʒ/", spanishHint: "Como la 'j' francesa en 'jour', o la 'g' en 'garage' (inglés)", exampleWordSr: "žena", exampleWordSrCyrillic: "жена", exampleWordEs: "mujer / esposa", isNew: true },
  { latin: "Z z", cyrillic: "З з", ipa: "/z/", spanishHint: "Como la 's' sonora — nunca como la 'z' del español peninsular", exampleWordSr: "zemlja", exampleWordSrCyrillic: "земља", exampleWordEs: "tierra", isNew: false },
  { latin: "I i", cyrillic: "И и", ipa: "/i/", spanishHint: "Como la 'i' en 'isla'", exampleWordSr: "ime", exampleWordSrCyrillic: "име", exampleWordEs: "nombre", isNew: false },
  { latin: "J j", cyrillic: "Ј ј", ipa: "/j/", spanishHint: "¡Exactamente como la 'y' en 'yo' o la 'i' en 'bien'! Nunca como la 'j' española.", exampleWordSr: "jabuka", exampleWordSrCyrillic: "јабука", exampleWordEs: "manzana", isNew: false },
  { latin: "K k", cyrillic: "К к", ipa: "/k/", spanishHint: "Como la 'c' en 'casa' o 'k' en 'kilo'", exampleWordSr: "kuća", exampleWordSrCyrillic: "кућа", exampleWordEs: "casa", isNew: false },
  { latin: "L l", cyrillic: "Л л", ipa: "/l/", spanishHint: "Como la 'l' en 'libro'", exampleWordSr: "levo", exampleWordSrCyrillic: "лево", exampleWordEs: "izquierda", isNew: false },
  { latin: "Lj lj", cyrillic: "Љ љ", ipa: "/ʎ/", spanishHint: "Como la 'll' en 'llave' (pronunciación palatal). ¡Ya la sabes!", exampleWordSr: "ljubav", exampleWordSrCyrillic: "љубав", exampleWordEs: "amor", isNew: false },
  { latin: "M m", cyrillic: "М м", ipa: "/m/", spanishHint: "Como la 'm' en 'mamá'", exampleWordSr: "majka", exampleWordSrCyrillic: "мајка", exampleWordEs: "madre", isNew: false },
  { latin: "N n", cyrillic: "Н н", ipa: "/n/", spanishHint: "Como la 'n' en 'noche'", exampleWordSr: "nebo", exampleWordSrCyrillic: "небо", exampleWordEs: "cielo", isNew: false },
  { latin: "Nj nj", cyrillic: "Њ њ", ipa: "/ɲ/", spanishHint: "Como la 'ñ' en 'niño'. ¡Ya la sabes!", exampleWordSr: "njiva", exampleWordSrCyrillic: "њива", exampleWordEs: "campo", isNew: false },
  { latin: "O o", cyrillic: "О о", ipa: "/o/", spanishHint: "Como la 'o' en 'ola'", exampleWordSr: "oko", exampleWordSrCyrillic: "oko", exampleWordEs: "ojo", isNew: false },
  { latin: "P p", cyrillic: "П п", ipa: "/p/", spanishHint: "Como la 'p' en 'pan'", exampleWordSr: "petak", exampleWordSrCyrillic: "петак", exampleWordEs: "viernes", isNew: false },
  { latin: "R r", cyrillic: "Р р", ipa: "/r/", spanishHint: "¡Como la 'rr' española! El serbio siempre tiene 'r' vibrante. Además, puede ser vocálica (prst = dedo).", exampleWordSr: "ruka", exampleWordSrCyrillic: "рука", exampleWordEs: "mano", isNew: false },
  { latin: "S s", cyrillic: "С с", ipa: "/s/", spanishHint: "Siempre sorda, como en 'sala'. Nunca como la 'z' española.", exampleWordSr: "srce", exampleWordSrCyrillic: "срце", exampleWordEs: "corazón", isNew: false },
  { latin: "T t", cyrillic: "Т т", ipa: "/t/", spanishHint: "Como la 't' en 'taza'", exampleWordSr: "tata", exampleWordSrCyrillic: "тата", exampleWordEs: "papá", isNew: false },
  { latin: "Ć ć", cyrillic: "Ћ ћ", ipa: "/tɕ/", spanishHint: "CH suave/palatal. Más adelante en la boca que č. Piensa en una 'ch' muy suave entre el paladar.", exampleWordSr: "ćao", exampleWordSrCyrillic: "ћао", exampleWordEs: "chao (saludo)", isNew: true },
  { latin: "U u", cyrillic: "У у", ipa: "/u/", spanishHint: "Como la 'u' en 'uva'", exampleWordSr: "ulica", exampleWordSrCyrillic: "улица", exampleWordEs: "calle", isNew: false },
  { latin: "F f", cyrillic: "Ф ф", ipa: "/f/", spanishHint: "Como la 'f' en 'fácil'", exampleWordSr: "fudbal", exampleWordSrCyrillic: "фудбал", exampleWordEs: "fútbol", isNew: false },
  { latin: "H h", cyrillic: "Х х", ipa: "/x/", spanishHint: "Como la 'j' española en 'jota'. Siempre se pronuncia en serbio.", exampleWordSr: "hleb", exampleWordSrCyrillic: "хлеб", exampleWordEs: "pan", isNew: false },
  { latin: "C c", cyrillic: "Ц ц", ipa: "/ts/", spanishHint: "¡Trampa! La 'c' serbia se pronuncia 'ts' (como 'pizza'). Nunca 'k' ni 's'.", exampleWordSr: "cena", exampleWordSrCyrillic: "цена", exampleWordEs: "precio", isNew: true },
  { latin: "Č č", cyrillic: "Ч ч", ipa: "/tʃ/", spanishHint: "CH fuerte, como en 'chocolate'. Igual que la 'ch' española.", exampleWordSr: "čaj", exampleWordSrCyrillic: "чај", exampleWordEs: "té", isNew: false },
  { latin: "Dž dž", cyrillic: "Џ џ", ipa: "/dʒ/", spanishHint: "Como la 'dg' en inglés 'judge' o la 'g' italiana en 'giocare'.", exampleWordSr: "džez", exampleWordSrCyrillic: "џез", exampleWordEs: "jazz", isNew: true },
  { latin: "Š š", cyrillic: "Ш ш", ipa: "/ʃ/", spanishHint: "SH del inglés 'she'. Como decir 'sh' silenciando a alguien.", exampleWordSr: "šta", exampleWordSrCyrillic: "шта", exampleWordEs: "qué", isNew: true },
];

export const minimalPairs: MinimalPair[] = [
  {
    word1Sr: "čaj", word1Es: "té",
    word2Sr: "ćao", word2Es: "chao",
    note: "č es CH fuerte (chocolate). ć es CH suave y palatal (más adentro en la boca)."
  },
  {
    word1Sr: "sat", word1Es: "hora / reloj",
    word2Sr: "šat", word2Es: "(ajedrez, voz coloquial)",
    note: "s es la 's' normal. š es SH del inglés."
  },
  {
    word1Sr: "žena", word1Es: "mujer",
    word2Sr: "zena", word2Es: "(forma incorrecta)",
    note: "ž suena como la 'j' francesa. z es la 's' sonora."
  },
  {
    word1Sr: "cena", word1Es: "precio",
    word2Sr: "sena", word2Es: "río Sena",
    note: "c en serbio = 'ts' (como en 'pizza'). Nunca como la 'c' del español."
  },
];

// ─── Vocabulary items for Units 1–2 ─────────────────────────────────────────

export const vocabItems: VocabItem[] = [
  // Unit 1 — Saludos / Greetings
  {
    id: "v-zdravo", serbianLatin: "Zdravo", serbianCyrillic: "Здраво", spanish: "Hola",
    exampleSentenceSr: "Zdravo! Kako si?", exampleSentenceSrCyrillic: "Здраво! Како си?",
    exampleSentenceEs: "¡Hola! ¿Cómo estás?", frequencyRank: 15, audioUrl: null,
    partOfSpeech: "interjection", notesForSpanishSpeaker: "Saludo informal. Sonido: ZDRA-vo. La zd- inicial es difícil, practica: 'z' + 'd' seguidos.",
  },
  {
    id: "v-dobar-dan", serbianLatin: "Dobar dan", serbianCyrillic: "Добар дан", spanish: "Buenos días / Buenas tardes",
    exampleSentenceSr: "Dobar dan! Dobro jutro.", exampleSentenceSrCyrillic: "Добар дан! Добро јутро.",
    exampleSentenceEs: "¡Buenos días! Buenos días (por la mañana).", frequencyRank: 22, audioUrl: null,
    partOfSpeech: "phrase", notesForSpanishSpeaker: "Literalmente 'buen día'. Dobar = bueno (masc.), dan = día.",
  },
  {
    id: "v-kako-se-zoves", serbianLatin: "Kako se zoveš?", serbianCyrillic: "Kako se zoveš?", spanish: "¿Cómo te llamas?",
    exampleSentenceSr: "Kako se zoveš? Ja se zovem Ana.", exampleSentenceSrCyrillic: "Како се зовеш? Ја се зовем Ана.",
    exampleSentenceEs: "¿Cómo te llamas? Me llamo Ana.", frequencyRank: 45, audioUrl: null,
    partOfSpeech: "phrase", notesForSpanishSpeaker: "Zoveš viene del verbo zvati (llamar). La estructura es igual que 'me llamo': se zovem = me llamo.",
  },
  {
    id: "v-ja-se-zovem", serbianLatin: "Ja se zovem", serbianCyrillic: "Ја се зовем", spanish: "Me llamo / Yo me llamo",
    exampleSentenceSr: "Ja se zovem Marko.", exampleSentenceSrCyrillic: "Ја се зовем Марко.",
    exampleSentenceEs: "Me llamo Marko.", frequencyRank: 46, audioUrl: null,
    partOfSpeech: "phrase", notesForSpanishSpeaker: "Ja = yo. El pronombre se puede omitir como en español.",
  },
  {
    id: "v-drago-mi-je", serbianLatin: "Drago mi je", serbianCyrillic: "Драго ми је", spanish: "Mucho gusto / Encantado/a",
    exampleSentenceSr: "Drago mi je, ja sam Petar.", exampleSentenceSrCyrillic: "Драго ми је, ја сам Петар.",
    exampleSentenceEs: "Mucho gusto, soy Petar.", frequencyRank: 80, audioUrl: null,
    partOfSpeech: "phrase", notesForSpanishSpeaker: "Literalmente 'me es grato'. Mi = me (dativo). No cambia por género.",
  },
  {
    id: "v-hvala", serbianLatin: "Hvala", serbianCyrillic: "Хвала", spanish: "Gracias",
    exampleSentenceSr: "Hvala lepo!", exampleSentenceSrCyrillic: "Хвала лепо!",
    exampleSentenceEs: "¡Muchas gracias! (literalmente: 'gracias bonito')", frequencyRank: 12, audioUrl: null,
    partOfSpeech: "interjection", notesForSpanishSpeaker: "La h se pronuncia siempre en serbio, como la 'j' española suave: HVA-la.",
  },
  {
    id: "v-molim", serbianLatin: "Molim", serbianCyrillic: "Молим", spanish: "Por favor / De nada",
    exampleSentenceSr: "Molim? Molim te.", exampleSentenceSrCyrillic: "Молим? Молим те.",
    exampleSentenceEs: "¿Cómo dijo? / Por favor.", frequencyRank: 18, audioUrl: null,
    partOfSpeech: "interjection", notesForSpanishSpeaker: "Molim tiene dos usos: 'por favor' y 'de nada' (respuesta a hvala). También se usa para pedir que repitan algo.",
  },
  {
    id: "v-da", serbianLatin: "Da", serbianCyrillic: "Да", spanish: "Sí",
    exampleSentenceSr: "Da, razumem.", exampleSentenceSrCyrillic: "Да, разумем.",
    exampleSentenceEs: "Sí, entiendo.", frequencyRank: 1, audioUrl: null,
    partOfSpeech: "interjection", notesForSpanishSpeaker: "La palabra más frecuente. Pronúnciala 'da', no como la 'd' española.",
  },
  {
    id: "v-ne", serbianLatin: "Ne", serbianCyrillic: "Не", spanish: "No",
    exampleSentenceSr: "Ne, hvala.", exampleSentenceSrCyrillic: "Не, хвала.",
    exampleSentenceEs: "No, gracias.", frequencyRank: 2, audioUrl: null,
    partOfSpeech: "interjection", notesForSpanishSpeaker: "Igual que el español. También funciona como prefijo de negación: ne razumem = no entiendo.",
  },
  {
    id: "v-dovidjenja", serbianLatin: "Doviđenja", serbianCyrillic: "Довиђења", spanish: "Adiós / Hasta luego",
    exampleSentenceSr: "Doviđenja! Vidimo se.", exampleSentenceSrCyrillic: "Довиђења! Видимо се.",
    exampleSentenceEs: "¡Adiós! Nos vemos.", frequencyRank: 55, audioUrl: null,
    partOfSpeech: "interjection", notesForSpanishSpeaker: "Literalmente 'hasta la vista'. Do = hasta, viđenja = la vista (del verbo videti, ver).",
  },
  {
    id: "v-kako-si", serbianLatin: "Kako si?", serbianCyrillic: "Како си?", spanish: "¿Cómo estás? (informal)",
    exampleSentenceSr: "Zdravo! Kako si?", exampleSentenceSrCyrillic: "Здраво! Како си?",
    exampleSentenceEs: "¡Hola! ¿Cómo estás?", frequencyRank: 30, audioUrl: null,
    partOfSpeech: "phrase", notesForSpanishSpeaker: "Kako = cómo, si = eres/estás (tú informal). Formal: Kako ste?",
  },
  {
    id: "v-dobro", serbianLatin: "Dobro", serbianCyrillic: "Добро", spanish: "Bien",
    exampleSentenceSr: "Dobro, hvala. A ti?", exampleSentenceSrCyrillic: "Добро, хвала. А ти?",
    exampleSentenceEs: "Bien, gracias. ¿Y tú?", frequencyRank: 8, audioUrl: null,
    partOfSpeech: "adverb", notesForSpanishSpeaker: "Dobro = bien, bueno (neutro). Dobar = bueno (masc.), Dobra = buena (fem.).",
  },
  // Unit 2 — People & Pronouns
  {
    id: "v-ja", serbianLatin: "ja", serbianCyrillic: "ја", spanish: "yo",
    exampleSentenceSr: "Ja sam student.", exampleSentenceSrCyrillic: "Ја сам студент.",
    exampleSentenceEs: "Yo soy estudiante.", frequencyRank: 5, audioUrl: null,
    partOfSpeech: "pronoun", notesForSpanishSpeaker: "Como en español, se puede omitir: 'Sam student' también funciona.",
  },
  {
    id: "v-ti", serbianLatin: "ti", serbianCyrillic: "ти", spanish: "tú",
    exampleSentenceSr: "Ti si moj prijatelj.", exampleSentenceSrCyrillic: "Ти си мој пријатељ.",
    exampleSentenceEs: "Tú eres mi amigo.", frequencyRank: 6, audioUrl: null,
    partOfSpeech: "pronoun", notesForSpanishSpeaker: "Ti es siempre informal. Vi = usted / vosotros (formal o plural).",
  },
  {
    id: "v-on", serbianLatin: "on", serbianCyrillic: "он", spanish: "él",
    exampleSentenceSr: "On je dobar čovek.", exampleSentenceSrCyrillic: "Он је добар човек.",
    exampleSentenceEs: "Él es un buen hombre.", frequencyRank: 7, audioUrl: null,
    partOfSpeech: "pronoun",
  },
  {
    id: "v-ona", serbianLatin: "ona", serbianCyrillic: "она", spanish: "ella",
    exampleSentenceSr: "Ona je moja sestra.", exampleSentenceSrCyrillic: "Она је моја сестра.",
    exampleSentenceEs: "Ella es mi hermana.", frequencyRank: 9, audioUrl: null,
    partOfSpeech: "pronoun",
  },
  {
    id: "v-mi", serbianLatin: "mi", serbianCyrillic: "ми", spanish: "nosotros",
    exampleSentenceSr: "Mi smo prijatelji.", exampleSentenceSrCyrillic: "Ми смо пријатељи.",
    exampleSentenceEs: "Nosotros somos amigos.", frequencyRank: 10, audioUrl: null,
    partOfSpeech: "pronoun",
  },
  {
    id: "v-vi", serbianLatin: "vi", serbianCyrillic: "ви", spanish: "vosotros / ustedes",
    exampleSentenceSr: "Vi ste dobri.", exampleSentenceSrCyrillic: "Ви сте добри.",
    exampleSentenceEs: "Vosotros sois buenos.", frequencyRank: 11, audioUrl: null,
    partOfSpeech: "pronoun", notesForSpanishSpeaker: "Vi sirve para usted (formal singular) y para vosotros/ustedes.",
  },
  {
    id: "v-oni", serbianLatin: "oni", serbianCyrillic: "они", spanish: "ellos / ellas",
    exampleSentenceSr: "Oni su studenti.", exampleSentenceSrCyrillic: "Они су студенти.",
    exampleSentenceEs: "Ellos son estudiantes.", frequencyRank: 13, audioUrl: null,
    partOfSpeech: "pronoun", notesForSpanishSpeaker: "Oni = ellos/ellas (masculino/mixto). One = ellas (sólo femenino).",
  },
  {
    id: "v-covek", serbianLatin: "čovek", serbianCyrillic: "човек", spanish: "hombre / persona",
    exampleSentenceSr: "On je dobar čovek.", exampleSentenceSrCyrillic: "Он је добар човек.",
    exampleSentenceEs: "Él es un buen hombre.", frequencyRank: 25, audioUrl: null,
    partOfSpeech: "noun", gender: "masculine", notesForSpanishSpeaker: "Čovek = hombre o persona en general. Č = CH como en 'chocolate'.",
  },
  {
    id: "v-zena", serbianLatin: "žena", serbianCyrillic: "жена", spanish: "mujer / esposa",
    exampleSentenceSr: "Ona je lepa žena.", exampleSentenceSrCyrillic: "Она је лепа жена.",
    exampleSentenceEs: "Ella es una mujer hermosa.", frequencyRank: 28, audioUrl: null,
    partOfSpeech: "noun", gender: "feminine", notesForSpanishSpeaker: "Ž = j francesa. Žena significa tanto 'mujer' como 'esposa' según contexto.",
  },
  {
    id: "v-dete", serbianLatin: "dete", serbianCyrillic: "дете", spanish: "niño / niña / hijo",
    exampleSentenceSr: "Dete spava.", exampleSentenceSrCyrillic: "Дете спава.",
    exampleSentenceEs: "El niño/la niña duerme.", frequencyRank: 32, audioUrl: null,
    partOfSpeech: "noun", gender: "neuter", notesForSpanishSpeaker: "¡Género neutro! Serbia tiene 3 géneros: masc., fem. y neutro. Dete es neutro (como Kind en alemán).",
  },
  {
    id: "v-prijatelj", serbianLatin: "prijatelj", serbianCyrillic: "пријатељ", spanish: "amigo",
    exampleSentenceSr: "On je moj prijatelj.", exampleSentenceSrCyrillic: "Он је мој пријатељ.",
    exampleSentenceEs: "Él es mi amigo.", frequencyRank: 40, audioUrl: null,
    partOfSpeech: "noun", gender: "masculine", notesForSpanishSpeaker: "Prijatelica = amiga. Lj = LL española palatal.",
  },
  {
    id: "v-sam", serbianLatin: "sam", serbianCyrillic: "сам", spanish: "soy / estoy (yo)",
    exampleSentenceSr: "Ja sam Marko.", exampleSentenceSrCyrillic: "Ја сам Марко.",
    exampleSentenceEs: "Soy Marko.", frequencyRank: 4, audioUrl: null,
    partOfSpeech: "verb", notesForSpanishSpeaker: "Sam = 1ª persona sing. del verbo biti (ser/estar). El serbio usa un solo verbo para ser y estar.",
  },
];

// Word of the day pool (pulled from vocab items)
export const wordOfTheDayPool: string[] = [
  "v-zdravo", "v-hvala", "v-da", "v-ne", "v-dobro",
  "v-prijatelj", "v-zena", "v-covek", "v-dete", "v-molim",
];

// ─── Units ────────────────────────────────────────────────────────────────────

export const units: Unit[] = [
  {
    id: "unit-0",
    title: "Abeceda y sonidos",
    description: "Aprende el alfabeto serbio y sus sonidos únicos. ¡Una vez que lo domines, todo se escribe como se pronuncia!",
    icon: "🔤",
    order: 0,
    color: "bg-blue-500",
    requiredXp: 0,
    lessons: [
      {
        id: "lesson-0-1", title: "Las letras serbias", description: "Los 30 caracteres del alfabeto latino serbio",
        unitId: "unit-0", order: 1, xpReward: 10, vocabItems: [],
        exercises: [
          { id: "e-01-1", type: "pronunciation", targetSr: "A a / А а", tipEs: "Como la 'a' en 'casa'. ¡Ya la conoces!" },
          { id: "e-01-2", type: "recognize", promptSr: "auto", correctAnswer: "coche", distractors: ["casa", "agua", "nombre"] },
          { id: "e-01-3", type: "pronunciation", targetSr: "B b / Б б", tipEs: "Como la 'b' en 'barco'" },
          { id: "e-01-4", type: "recognize", promptSr: "brat", correctAnswer: "hermano", distractors: ["madre", "amigo", "padre"] },
          { id: "e-01-5", type: "pronunciation", targetSr: "V v / В в", tipEs: "Como la 'v' fricativa inglesa — siempre fricativa, nunca como 'b'" },
          { id: "e-01-6", type: "recognize", promptSr: "voda", correctAnswer: "agua", distractors: ["leche", "vino", "fuego"] },
          { id: "e-01-7", type: "match", pairs: [{ sr: "auto", es: "coche" }, { sr: "brat", es: "hermano" }, { sr: "voda", es: "agua" }, { sr: "majka", es: "madre" }] },
        ],
      },
      {
        id: "lesson-0-2", title: "Sonidos nuevos: č, ć, š, ž", description: "Los sonidos que no existen en español",
        unitId: "unit-0", order: 2, xpReward: 15, vocabItems: [],
        exercises: [
          { id: "e-02-1", type: "pronunciation", targetSr: "Č č / Ч ч", tipEs: "CH fuerte como en 'chocolate'. Ejemplo: čaj = té" },
          { id: "e-02-2", type: "recognize", promptSr: "čaj", correctAnswer: "té", distractors: ["café", "agua", "leche"] },
          { id: "e-02-3", type: "pronunciation", targetSr: "Š š / Ш ш", tipEs: "SH del inglés 'she'. Como decir 'shh' para silenciar a alguien" },
          { id: "e-02-4", type: "recognize", promptSr: "šta", correctAnswer: "qué", distractors: ["quién", "dónde", "cuándo"] },
          { id: "e-02-5", type: "pronunciation", targetSr: "Ž ž / Ж ж", tipEs: "Como la 'j' francesa en 'jour'. Ejemplo: žena = mujer" },
          { id: "e-02-6", type: "recognize", promptSr: "žena", correctAnswer: "mujer / esposa", distractors: ["hombre", "niño", "amigo"] },
          { id: "e-02-7", type: "pronunciation", targetSr: "Ć ć / Ћ ћ", tipEs: "CH suave y palatal. Más adentro en la boca que č. Ejemplo: ćao = chao" },
          { id: "e-02-8", type: "recognize", promptSr: "ćao", correctAnswer: "chao (saludo)", distractors: ["hola", "adiós", "gracias"] },
          { id: "e-02-9", type: "match", pairs: [{ sr: "čaj", es: "té" }, { sr: "šta", es: "qué" }, { sr: "žena", es: "mujer" }, { sr: "ćao", es: "chao" }] },
        ],
      },
      {
        id: "lesson-0-3", title: "Latinica ↔ Ćirilica", description: "Lee y escribe en los dos alfabetos",
        unitId: "unit-0", order: 3, xpReward: 15, vocabItems: [],
        exercises: [
          { id: "e-03-1", type: "recognize", promptSr: "Здраво", correctAnswer: "Hola", distractors: ["Adiós", "Gracias", "Por favor"], explanation: "Здраво = Zdravo. Cada letra cirílica tiene su equivalente latino." },
          { id: "e-03-2", type: "recognize", promptSr: "Хвала", correctAnswer: "Gracias", distractors: ["Hola", "Por favor", "Adiós"], explanation: "Хвала = Hvala. Х=H, в=v, а=a, л=l, а=a" },
          { id: "e-03-3", type: "recognize", promptSr: "Добро", correctAnswer: "Bien", distractors: ["Mal", "Mucho", "Poco"], explanation: "Добро = Dobro. Д=D, о=o, б=b, р=r, о=o" },
          { id: "e-03-4", type: "recognize", promptSr: "Вода", correctAnswer: "agua", distractors: ["fuego", "tierra", "aire"] },
          { id: "e-03-5", type: "recognize", promptSr: "Мајка", correctAnswer: "madre", distractors: ["padre", "hermano", "amigo"] },
          { id: "e-03-6", type: "match", pairs: [{ sr: "Здраво", es: "Hola" }, { sr: "Хвала", es: "Gracias" }, { sr: "Добро", es: "Bien" }, { sr: "Вода", es: "agua" }] },
          { id: "e-03-7", type: "pronunciation", targetSr: "Ц ц → ts", tipEs: "¡Trampa! La 'c' cirílica serbia suena 'ts' (como en 'pizza'). Цена = cena = precio" },
        ],
      },
    ],
  },
  {
    id: "unit-1",
    title: "Saludos y presentaciones",
    description: "Las primeras palabras que necesitas: saludar, presentarte y despedirte.",
    icon: "👋",
    order: 1,
    color: "bg-primary",
    requiredXp: 0,
    lessons: [
      {
        id: "lesson-1-1", title: "Hola y adiós", description: "Zdravo, Doviđenja y más saludos esenciales",
        unitId: "unit-1", order: 1, xpReward: 10,
        vocabItems: vocabItems.filter(v => ["v-zdravo","v-dobar-dan","v-dovidjenja","v-da","v-ne"].includes(v.id)),
        exercises: [
          { id: "e-11-1", type: "recognize", promptSr: "Zdravo", correctAnswer: "Hola", distractors: ["Adiós", "Gracias", "Por favor"], vocabItemId: "v-zdravo" },
          { id: "e-11-2", type: "recognize", promptSr: "Dobar dan", correctAnswer: "Buenos días / Buenas tardes", distractors: ["Buenas noches", "Hasta luego", "Por favor"], vocabItemId: "v-dobar-dan" },
          { id: "e-11-3", type: "recognize", promptSr: "Da", correctAnswer: "Sí", distractors: ["No", "Quizás", "Nunca"], vocabItemId: "v-da" },
          { id: "e-11-4", type: "recognize", promptSr: "Ne", correctAnswer: "No", distractors: ["Sí", "Tal vez", "Siempre"], vocabItemId: "v-ne" },
          { id: "e-11-5", type: "recognize", promptSr: "Doviđenja", correctAnswer: "Adiós / Hasta luego", distractors: ["Hola", "Gracias", "Por favor"], vocabItemId: "v-dovidjenja" },
          { id: "e-11-6", type: "match", pairs: [{ sr: "Zdravo", es: "Hola" }, { sr: "Da", es: "Sí" }, { sr: "Ne", es: "No" }, { sr: "Doviđenja", es: "Adiós" }] },
          { id: "e-11-7", type: "reverse-translation", promptEs: "Hola", correctAnswerSr: "Zdravo", acceptedVariants: ["zdravo"] },
          { id: "e-11-8", type: "reverse-translation", promptEs: "Sí", correctAnswerSr: "Da", acceptedVariants: ["da"] },
        ],
      },
      {
        id: "lesson-1-2", title: "¿Cómo te llamas?", description: "Presentarte y preguntar el nombre",
        unitId: "unit-1", order: 2, xpReward: 10,
        vocabItems: vocabItems.filter(v => ["v-kako-se-zoves","v-ja-se-zovem","v-drago-mi-je"].includes(v.id)),
        exercises: [
          { id: "e-12-1", type: "recognize", promptSr: "Kako se zoveš?", correctAnswer: "¿Cómo te llamas?", distractors: ["¿Cómo estás?", "¿Dónde vives?", "¿Cuántos años tienes?"], vocabItemId: "v-kako-se-zoves" },
          { id: "e-12-2", type: "recognize", promptSr: "Ja se zovem", correctAnswer: "Me llamo / Yo me llamo", distractors: ["Soy estudiante", "Tengo nombre", "Vivo en Serbia"], vocabItemId: "v-ja-se-zovem" },
          { id: "e-12-3", type: "recognize", promptSr: "Drago mi je", correctAnswer: "Mucho gusto / Encantado", distractors: ["Hasta luego", "Buenos días", "Lo siento"], vocabItemId: "v-drago-mi-je" },
          { id: "e-12-4", type: "fill-gap", sentenceWithGap: "Ja ___ Marko.", correctAnswer: "se zovem", options: ["se zovem", "sam", "si", "je"], patternNote: "se zovem = me llamo (reflexivo de zvati = llamar)" },
          { id: "e-12-5", type: "reverse-translation", promptEs: "Mucho gusto", correctAnswerSr: "Drago mi je", acceptedVariants: ["drago mi je"] },
          { id: "e-12-6", type: "reverse-translation", promptEs: "Me llamo Ana", correctAnswerSr: "Ja se zovem Ana", acceptedVariants: ["ja se zovem ana", "se zovem ana", "zovem se ana"] },
        ],
      },
      {
        id: "lesson-1-3", title: "Gracias y por favor", description: "Hvala, molim y cortesía básica",
        unitId: "unit-1", order: 3, xpReward: 10,
        vocabItems: vocabItems.filter(v => ["v-hvala","v-molim","v-dobro","v-kako-si"].includes(v.id)),
        exercises: [
          { id: "e-13-1", type: "recognize", promptSr: "Hvala", correctAnswer: "Gracias", distractors: ["Por favor", "De nada", "Hola"], vocabItemId: "v-hvala" },
          { id: "e-13-2", type: "recognize", promptSr: "Molim", correctAnswer: "Por favor / De nada", distractors: ["Gracias", "Hola", "Hasta luego"], vocabItemId: "v-molim" },
          { id: "e-13-3", type: "recognize", promptSr: "Dobro", correctAnswer: "Bien", distractors: ["Mal", "Regular", "Mucho"], vocabItemId: "v-dobro" },
          { id: "e-13-4", type: "recognize", promptSr: "Kako si?", correctAnswer: "¿Cómo estás? (informal)", distractors: ["¿Cómo te llamas?", "¿Dónde estás?", "¿Cómo se llama?"], vocabItemId: "v-kako-si" },
          { id: "e-13-5", type: "match", pairs: [{ sr: "Hvala", es: "Gracias" }, { sr: "Molim", es: "Por favor" }, { sr: "Dobro", es: "Bien" }, { sr: "Kako si?", es: "¿Cómo estás?" }] },
          { id: "e-13-6", type: "reverse-translation", promptEs: "Gracias", correctAnswerSr: "Hvala", acceptedVariants: ["hvala"] },
          { id: "e-13-7", type: "reverse-translation", promptEs: "¿Cómo estás?", correctAnswerSr: "Kako si?", acceptedVariants: ["kako si?", "kako si"] },
        ],
      },
    ],
  },
  {
    id: "unit-2",
    title: "Personas y pronombres",
    description: "Ja, ti, on, ona... Los pronombres y palabras para personas. El serbio tiene 3 géneros.",
    icon: "👥",
    order: 2,
    color: "bg-secondary",
    requiredXp: 30,
    lessons: [
      {
        id: "lesson-2-1", title: "Pronombres personales", description: "Ja, ti, on, ona, mi, vi, oni",
        unitId: "unit-2", order: 1, xpReward: 10,
        vocabItems: vocabItems.filter(v => ["v-ja","v-ti","v-on","v-ona","v-mi","v-vi","v-oni"].includes(v.id)),
        exercises: [
          { id: "e-21-1", type: "recognize", promptSr: "ja", correctAnswer: "yo", distractors: ["tú", "él", "ella"], vocabItemId: "v-ja" },
          { id: "e-21-2", type: "recognize", promptSr: "ti", correctAnswer: "tú", distractors: ["yo", "él", "ella"], vocabItemId: "v-ti" },
          { id: "e-21-3", type: "recognize", promptSr: "on", correctAnswer: "él", distractors: ["yo", "tú", "ella"], vocabItemId: "v-on" },
          { id: "e-21-4", type: "recognize", promptSr: "ona", correctAnswer: "ella", distractors: ["yo", "tú", "él"], vocabItemId: "v-ona" },
          { id: "e-21-5", type: "match", pairs: [{ sr: "ja", es: "yo" }, { sr: "ti", es: "tú" }, { sr: "on", es: "él" }, { sr: "ona", es: "ella" }] },
          { id: "e-21-6", type: "recognize", promptSr: "mi", correctAnswer: "nosotros", distractors: ["vosotros", "ellos", "ustedes"], vocabItemId: "v-mi" },
          { id: "e-21-7", type: "recognize", promptSr: "oni", correctAnswer: "ellos / ellas", distractors: ["nosotros", "vosotros", "yo"], vocabItemId: "v-oni" },
          { id: "e-21-8", type: "fill-gap", sentenceWithGap: "___ sam student.", correctAnswer: "Ja", options: ["Ja", "Ti", "On", "Ona"], patternNote: "sam = 1ª persona singular de biti (ser/estar)" },
          { id: "e-21-9", type: "reverse-translation", promptEs: "yo", correctAnswerSr: "ja", acceptedVariants: ["ja"] },
        ],
      },
      {
        id: "lesson-2-2", title: "Personas: čovek, žena, dete", description: "Los tres géneros gramaticales",
        unitId: "unit-2", order: 2, xpReward: 10,
        vocabItems: vocabItems.filter(v => ["v-covek","v-zena","v-dete","v-prijatelj"].includes(v.id)),
        exercises: [
          { id: "e-22-1", type: "recognize", promptSr: "čovek", correctAnswer: "hombre / persona", distractors: ["mujer", "niño", "amigo"], vocabItemId: "v-covek" },
          { id: "e-22-2", type: "recognize", promptSr: "žena", correctAnswer: "mujer / esposa", distractors: ["hombre", "niño", "amiga"], vocabItemId: "v-zena" },
          { id: "e-22-3", type: "recognize", promptSr: "dete", correctAnswer: "niño / niña / hijo", distractors: ["hombre", "mujer", "amigo"], vocabItemId: "v-dete" },
          { id: "e-22-4", type: "recognize", promptSr: "prijatelj", correctAnswer: "amigo", distractors: ["hombre", "mujer", "niño"], vocabItemId: "v-prijatelj" },
          { id: "e-22-5", type: "match", pairs: [{ sr: "čovek", es: "hombre" }, { sr: "žena", es: "mujer" }, { sr: "dete", es: "niño" }, { sr: "prijatelj", es: "amigo" }] },
          { id: "e-22-6", type: "fill-gap", sentenceWithGap: "Ona je lepa ___.", correctAnswer: "žena", options: ["žena", "čovek", "dete", "prijatelj"], patternNote: "lepa = hermosa (adjetivo en forma femenina)" },
          { id: "e-22-7", type: "reverse-translation", promptEs: "amigo", correctAnswerSr: "prijatelj", acceptedVariants: ["prijatelj"] },
        ],
      },
      {
        id: "lesson-2-3", title: "El verbo biti (ser/estar)", description: "Ja sam, ti si, on je... El verbo ser+estar",
        unitId: "unit-2", order: 3, xpReward: 15,
        vocabItems: vocabItems.filter(v => ["v-sam"].includes(v.id)),
        exercises: [
          { id: "e-23-1", type: "recognize", promptSr: "sam", correctAnswer: "soy / estoy (yo)", distractors: ["eres/estás (tú)", "es/está (él/ella)", "somos/estamos"], vocabItemId: "v-sam" },
          { id: "e-23-2", type: "fill-gap", sentenceWithGap: "Ja ___ Marko.", correctAnswer: "sam", options: ["sam", "si", "je", "smo"], patternNote: "biti: ja sam = yo soy/estoy" },
          { id: "e-23-3", type: "fill-gap", sentenceWithGap: "Ti ___ dobar.", correctAnswer: "si", options: ["sam", "si", "je", "smo"], patternNote: "biti: ti si = tú eres/estás" },
          { id: "e-23-4", type: "fill-gap", sentenceWithGap: "On ___ student.", correctAnswer: "je", options: ["sam", "si", "je", "smo"], patternNote: "biti: on je = él es/está" },
          { id: "e-23-5", type: "recognize", promptSr: "Ti si", correctAnswer: "Tú eres / Tú estás", distractors: ["Yo soy", "Él es", "Nosotros somos"] },
          { id: "e-23-6", type: "reverse-translation", promptEs: "Soy Ana", correctAnswerSr: "Ja sam Ana", acceptedVariants: ["ja sam ana", "sam ana"] },
          { id: "e-23-7", type: "match", pairs: [{ sr: "sam", es: "soy" }, { sr: "si", es: "eres" }, { sr: "je", es: "es" }, { sr: "smo", es: "somos" }] },
        ],
      },
    ],
  },
];

export function getVocabById(id: string): VocabItem | undefined {
  return vocabItems.find(v => v.id === id);
}

export function getWordOfTheDay(): VocabItem {
  const dayIndex = Math.floor(Date.now() / 86400000) % wordOfTheDayPool.length;
  const id = wordOfTheDayPool[dayIndex];
  return getVocabById(id) ?? vocabItems[0];
}
