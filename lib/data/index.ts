// Data store facade — all data access goes through this module.
// The getTutorReply stub below is the only place to swap in a real AI backend.

export { units, vocabItems, getVocabById, getWordOfTheDay, alphabetLetters, minimalPairs } from "./seed-units";
export type { VocabItem, Unit, Lesson, Exercise, SrsCard, SrsQuality, DialogueNode, ConversationScene, Story, AlphabetLetter, MinimalPair } from "./types";

// ─── Conversation dialogue data ───────────────────────────────────────────────
// Scripted scenes only. No network requests, no API calls.

import type { ConversationScene } from "./types";

export const conversationScenes: ConversationScene[] = [
  {
    id: "scene-cafe",
    title: "En el café",
    description: "Pide un café y paga la cuenta. Escena ideal para el primer día en Serbia.",
    icon: "☕",
    level: "A1",
    xpReward: 20,
    startNodeId: "n1",
    nodes: {
      n1: {
        id: "n1",
        speakerLineSr: "Dobro jutro! Šta želite?",
        speakerLineSrCyrillic: "Добро јутро! Шта желите?",
        speakerLineEs: "¡Buenos días! ¿Qué desea?",
        correctionNote: "El camarero te saluda. Šta = qué, želite = desea (formal).",
        tipNext: "Vas a pedir un café. Di: 'Jednu kafu, molim.'",
        userOptions: [
          { sr: "Jednu kafu, molim.", es: "Un café, por favor.", nextNodeId: "n2", isBest: true },
          { sr: "Kafu.", es: "Café. (brusco)", nextNodeId: "n2", isBest: false },
          { sr: "Šta imate?", es: "¿Qué tienen?", nextNodeId: "n2b", isBest: false },
        ],
        acceptedTypedAnswers: ["jednu kafu molim", "jednu kafu, molim", "kafu molim", "kafu, molim"],
        vocabItemIds: [],
      },
      n2: {
        id: "n2",
        speakerLineSr: "Crnu ili belu?",
        speakerLineSrCyrillic: "Црну или белу?",
        speakerLineEs: "¿Negra o con leche?",
        correctionNote: "Crnu = negra (acusativo femenino). Belu = blanca/con leche. ¡Ya usas el caso acusativo sin saberlo!",
        tipNext: "Elige: 'Crnu, molim.' o 'Belu, molim.'",
        userOptions: [
          { sr: "Crnu, molim.", es: "Negra, por favor.", nextNodeId: "n3", isBest: true },
          { sr: "Belu, molim.", es: "Con leche, por favor.", nextNodeId: "n3", isBest: true },
        ],
        acceptedTypedAnswers: ["crnu molim", "crnu, molim", "belu molim", "belu, molim"],
        vocabItemIds: [],
      },
      n2b: {
        id: "n2b",
        speakerLineSr: "Imamo kafu, čaj, sok i vodu.",
        speakerLineSrCyrillic: "Имамо кафу, чај, сок и воду.",
        speakerLineEs: "Tenemos café, té, zumo y agua.",
        correctionNote: "Imamo = tenemos. Kafa → kafu, voda → vodu (acusativo). Los nombres cambian de forma.",
        tipNext: "Ahora pide lo que quieras: 'Jednu kafu, molim.'",
        userOptions: [
          { sr: "Jednu kafu, molim.", es: "Un café, por favor.", nextNodeId: "n3", isBest: true },
          { sr: "Čaj, molim.", es: "Té, por favor.", nextNodeId: "n3", isBest: false },
        ],
        acceptedTypedAnswers: ["jednu kafu molim", "jednu kafu, molim", "caj molim", "čaj, molim"],
        vocabItemIds: [],
      },
      n3: {
        id: "n3",
        speakerLineSr: "Izvolite. Nešto još?",
        speakerLineSrCyrillic: "Извол ите. Нешто још?",
        speakerLineEs: "Aquí tiene. ¿Algo más?",
        correctionNote: "Izvolite = 'aquí tiene' (también 'por favor' al entregar algo). Nešto još = ¿algo más?",
        tipNext: "Pide la cuenta: 'Račun, molim.'",
        userOptions: [
          { sr: "Račun, molim.", es: "La cuenta, por favor.", nextNodeId: "n4", isBest: true },
          { sr: "Ne, hvala.", es: "No, gracias.", nextNodeId: "n3b", isBest: false },
        ],
        acceptedTypedAnswers: ["racun molim", "račun, molim", "ne hvala", "ne, hvala"],
        vocabItemIds: [],
      },
      n3b: {
        id: "n3b",
        speakerLineSr: "U redu. Uživajte!",
        speakerLineSrCyrillic: "У реду. Уживајте!",
        speakerLineEs: "De acuerdo. ¡Disfrute!",
        correctionNote: "U redu = de acuerdo / está bien. Uživajte = disfrute (formal plural).",
        tipNext: "Cuando termines, pide la cuenta: 'Račun, molim.'",
        userOptions: [
          { sr: "Račun, molim.", es: "La cuenta, por favor.", nextNodeId: "n4", isBest: true },
        ],
        acceptedTypedAnswers: ["racun molim", "račun, molim"],
        vocabItemIds: [],
      },
      n4: {
        id: "n4",
        speakerLineSr: "Dvesta dinara, molim.",
        speakerLineSrCyrillic: "Двеста динара, молим.",
        speakerLineEs: "Doscientos dinares, por favor.",
        correctionNote: "Dvesta = doscientos. Dinar = moneda serbia. El precio usa el caso genitivo plural: dinara.",
        tipNext: "Responde: 'Izvolite.' (al pagar) o 'Koliko košta?' si necesitas confirmar el precio.",
        userOptions: [
          { sr: "Izvolite.", es: "Aquí tiene (al pagar).", nextNodeId: null, isBest: true },
          { sr: "Koliko košta?", es: "¿Cuánto cuesta?", nextNodeId: "n4b", isBest: false },
        ],
        acceptedTypedAnswers: ["izvolite", "koliko kosta", "koliko košta"],
        vocabItemIds: [],
      },
      n4b: {
        id: "n4b",
        speakerLineSr: "Kafa košta dvesta dinara.",
        speakerLineSrCyrillic: "Кафа кошта двеста динара.",
        speakerLineEs: "El café cuesta doscientos dinares.",
        correctionNote: "Košta = cuesta (de koštati). El sujeto vuelve al nominativo: kafa (no kafu).",
        tipNext: "Para terminar: 'Hvala lepo!'",
        userOptions: [
          { sr: "Hvala lepo!", es: "¡Muchas gracias!", nextNodeId: null, isBest: true },
        ],
        acceptedTypedAnswers: ["hvala lepo", "hvala lepo!", "hvala"],
        vocabItemIds: [],
      },
    },
  },
  {
    id: "scene-intro",
    title: "Presentarse",
    description: "Conócete con alguien nuevo. Practica nombre, origen y profesión.",
    icon: "🤝",
    level: "A1",
    xpReward: 20,
    startNodeId: "i1",
    nodes: {
      i1: {
        id: "i1",
        speakerLineSr: "Zdravo! Kako se zoveš?",
        speakerLineSrCyrillic: "Здраво! Како се зовеш?",
        speakerLineEs: "¡Hola! ¿Cómo te llamas?",
        correctionNote: "Kako se zoveš = ¿cómo te llamas? Literalmente '¿cómo te llamas?' Informal.",
        tipNext: "Responde: 'Zdravo! Ja se zovem [tu nombre].'",
        userOptions: [
          { sr: "Zdravo! Ja se zovem Ana.", es: "¡Hola! Me llamo Ana.", nextNodeId: "i2", isBest: true },
          { sr: "Zdravo! Zovem se Marko.", es: "¡Hola! Me llamo Marko.", nextNodeId: "i2", isBest: true },
          { sr: "Zdravo!", es: "¡Hola! (sin nombre)", nextNodeId: "i1b", isBest: false },
        ],
        acceptedTypedAnswers: ["ja se zovem", "zovem se", "zdravo ja se zovem"],
        vocabItemIds: ["v-zdravo","v-kako-se-zoves","v-ja-se-zovem"],
      },
      i1b: {
        id: "i1b",
        speakerLineSr: "A kako se zoveš ti?",
        speakerLineSrCyrillic: "А како се зовеш ти?",
        speakerLineEs: "¿Y tú cómo te llamas?",
        correctionNote: "Repite preguntando tu nombre. Ti = tú (pronombre de énfasis al final).",
        tipNext: "Ahora sí: 'Ja se zovem [nombre].'",
        userOptions: [
          { sr: "Ja se zovem Ana.", es: "Me llamo Ana.", nextNodeId: "i2", isBest: true },
        ],
        acceptedTypedAnswers: ["ja se zovem", "zovem se"],
        vocabItemIds: ["v-ja-se-zovem"],
      },
      i2: {
        id: "i2",
        speakerLineSr: "Drago mi je! Ja sam Nikola. Odakle si?",
        speakerLineSrCyrillic: "Драго ми је! Ја сам Никола. Одакле си?",
        speakerLineEs: "¡Mucho gusto! Soy Nikola. ¿De dónde eres?",
        correctionNote: "Drago mi je = mucho gusto. Odakle si = ¿de dónde eres? Oda = desde, kle = dónde, si = eres.",
        tipNext: "Di de dónde eres: 'Ja sam iz [país].' España = Španija.",
        userOptions: [
          { sr: "Drago mi je! Ja sam iz Španije.", es: "¡Mucho gusto! Soy de España.", nextNodeId: "i3", isBest: true },
          { sr: "Ja sam iz Meksika.", es: "Soy de México.", nextNodeId: "i3", isBest: true },
          { sr: "Drago mi je!", es: "¡Mucho gusto! (sin origen)", nextNodeId: "i2b", isBest: false },
        ],
        acceptedTypedAnswers: ["drago mi je", "ja sam iz spanije", "ja sam iz meksika", "iz spanije", "iz meksika"],
        vocabItemIds: ["v-drago-mi-je","v-sam"],
      },
      i2b: {
        id: "i2b",
        speakerLineSr: "Odakle si, ako smeš da pitam?",
        speakerLineSrCyrillic: "Одакле си, ако смеш да питам?",
        speakerLineEs: "¿De dónde eres, si puedo preguntar?",
        correctionNote: "Ako smeš da pitam = si puedo preguntar (expresión educada). Smeti = atreverse/poder.",
        tipNext: "Responde: 'Ja sam iz Španije.'",
        userOptions: [
          { sr: "Ja sam iz Španije.", es: "Soy de España.", nextNodeId: "i3", isBest: true },
        ],
        acceptedTypedAnswers: ["ja sam iz spanije", "iz spanije", "iz meksika", "ja sam iz meksika"],
        vocabItemIds: ["v-sam"],
      },
      i3: {
        id: "i3",
        speakerLineSr: "Super! Govoriš li srpski?",
        speakerLineSrCyrillic: "Супер! Говориш ли српски?",
        speakerLineEs: "¡Genial! ¿Hablas serbio?",
        correctionNote: "Govoriš = hablas (2ª pers. sing.). Li = partícula interrogativa (equivale a poner ¿? en la entonación).",
        tipNext: "Di que estás aprendiendo: 'Učim srpski.' (Aprendo serbio.)",
        userOptions: [
          { sr: "Malo. Učim srpski.", es: "Un poco. Estoy aprendiendo serbio.", nextNodeId: "i4", isBest: true },
          { sr: "Učim srpski!", es: "¡Estoy aprendiendo serbio!", nextNodeId: "i4", isBest: true },
          { sr: "Ne, ne govorim.", es: "No, no hablo.", nextNodeId: "i4", isBest: false },
        ],
        acceptedTypedAnswers: ["malo ucim srpski", "malo. ucim srpski", "ucim srpski", "ne ne govorim"],
        vocabItemIds: [],
      },
      i4: {
        id: "i4",
        speakerLineSr: "Odlično! Srpski je lep jezik. Srećno!",
        speakerLineSrCyrillic: "Одлично! Српски је леп језик. Срећно!",
        speakerLineEs: "¡Excelente! El serbio es un idioma hermoso. ¡Buena suerte!",
        correctionNote: "Odlično = excelente. Lep = hermoso/a. Jezik = idioma/lengua. Srećno = buena suerte.",
        tipNext: "¡Cierra la conversación con: 'Hvala! Doviđenja!'",
        userOptions: [
          { sr: "Hvala! Doviđenja!", es: "¡Gracias! ¡Adiós!", nextNodeId: null, isBest: true },
          { sr: "Hvala lepo!", es: "¡Muchas gracias!", nextNodeId: null, isBest: true },
        ],
        acceptedTypedAnswers: ["hvala dovidjenja", "hvala! doviđenja!", "hvala lepo"],
        vocabItemIds: ["v-hvala","v-dovidjenja"],
      },
    },
  },
];

// ─── FUTURE HOOK (disabled, zero cost) ───────────────────────────────────────
// To add a real AI tutor later, replace the body of getTutorReply with an
// async API call. The UI (conversation page) reads from this function only.
// Do NOT enable or call external services here without user consent.

// export async function getTutorReply(_input: string, _sceneId: string): Promise<string> {
//   throw new Error("AI tutor backend not configured. Keep using scripted scenes.");
// }
