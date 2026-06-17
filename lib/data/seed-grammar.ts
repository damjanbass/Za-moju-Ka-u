import type { GrammarTopic } from "./types";

export const grammarTopics: GrammarTopic[] = [
  {
    id: "genero",
    title: "Género gramatical",
    subtitle: "Masculino, femenino y neutro — y cómo reconocerlos",
    icon: "🏷️",
    level: "A1",
    intro:
      "El serbio tiene tres géneros: masculino, femenino y neutro. La buena noticia es que la terminación de la palabra te dice casi siempre el género, ¡sin memorizar listas!",
    patterns: [
      {
        name: "Masculino — terminan en consonante",
        explanation:
          "La mayoría de los sustantivos que acaban en consonante son masculinos. Como en español 'el' corresponde al género masculino.",
        examples: [
          { sr: "grad", srCyrillic: "град", es: "ciudad", highlight: "grad" },
          { sr: "brat", srCyrillic: "брат", es: "hermano", highlight: "brat" },
          { sr: "prozor", srCyrillic: "прозор", es: "ventana", highlight: "prozor" },
          { sr: "auto", srCyrillic: "ауто", es: "coche", highlight: "auto" },
        ],
      },
      {
        name: "Femenino — terminan en -a",
        explanation:
          "Los sustantivos que acaban en -a son casi siempre femeninos, igual que en español (mesa, casa, silla).",
        examples: [
          { sr: "žena", srCyrillic: "жена", es: "mujer", highlight: "a" },
          { sr: "majka", srCyrillic: "мајка", es: "madre", highlight: "a" },
          { sr: "knjiga", srCyrillic: "књига", es: "libro", highlight: "a" },
          { sr: "voda", srCyrillic: "вода", es: "agua", highlight: "a" },
        ],
      },
      {
        name: "Neutro — terminan en -o o -e",
        explanation:
          "Los sustantivos terminados en -o o -e son neutros. No existe en español, pero es fácil de identificar.",
        examples: [
          { sr: "selo", srCyrillic: "село", es: "pueblo (aldea)", highlight: "o" },
          { sr: "more", srCyrillic: "море", es: "mar", highlight: "e" },
          { sr: "dete", srCyrillic: "дете", es: "niño/a", highlight: "e" },
          { sr: "nebo", srCyrillic: "небо", es: "cielo", highlight: "o" },
        ],
      },
      {
        name: "Adjetivos que concuerdan",
        explanation:
          "Los adjetivos cambian su terminación según el género del sustantivo, como en español.",
        examples: [
          { sr: "lep grad — lepa žena — lepo selo", srCyrillic: "леп град — лепа жена — лепо село", es: "ciudad bonita — mujer bonita — pueblo bonito" },
          { sr: "dobar brat — dobra knjiga — dobro dete", srCyrillic: "добар брат — добра књига — добро дете", es: "buen hermano — buen libro — buen niño" },
        ],
      },
    ],
    tipForSpanishSpeakers:
      "Si sabes español, la terminación -a = femenino es idéntica. El truco extra: masculino = consonante final (en lugar de -o del español). Neutro = -o/-e serbio. ¡Tres reglas simples!",
  },
  {
    id: "biti",
    title: "El verbo 'biti' — Ser/Estar",
    subtitle: "El verbo más importante del serbio",
    icon: "🔑",
    level: "A1",
    intro:
      "Biti (ser/estar) es el verbo más usado en serbio. A diferencia del español, un solo verbo sirve para los dos significados. Tiene dos formas: la larga (énfasis) y la corta (la más común).",
    patterns: [
      {
        name: "Forma corta (clítico) — la más usada",
        explanation:
          "En el habla normal se usan las formas cortas. Son átonas (sin acento propio) y van pegadas a la primera palabra de la frase.",
        examples: [
          { sr: "Ja sam student.", srCyrillic: "Ја сам студент.", es: "Soy estudiante.", highlight: "sam" },
          { sr: "Ti si umorasan.", srCyrillic: "Ти си уморасан.", es: "Estás cansado.", highlight: "si" },
          { sr: "On/ona/ono je ovde.", srCyrillic: "Он/она/оно је овде.", es: "Él/ella/eso está aquí.", highlight: "je" },
          { sr: "Mi smo srećni.", srCyrillic: "Ми смо срећни.", es: "Somos/estamos felices.", highlight: "smo" },
          { sr: "Vi ste nastavnici.", srCyrillic: "Ви сте наставници.", es: "Sois/son profesores.", highlight: "ste" },
          { sr: "Oni su prijatelji.", srCyrillic: "Они су пријатељи.", es: "Son amigos.", highlight: "su" },
        ],
      },
      {
        name: "Forma larga (énfasis o sujeto implícito)",
        explanation:
          "Las formas largas se usan al inicio de frase (sin sujeto explícito) o para dar énfasis.",
        examples: [
          { sr: "Jesam! / Nisi u pravu.", srCyrillic: "Јесам! / Ниси у праву.", es: "¡Sí que soy! / No tienes razón." },
          { sr: "Jeste li gladni?", srCyrillic: "Јесте ли гладни?", es: "¿Tenéis/tienen hambre? (pregunta formal)" },
        ],
      },
      {
        name: "Negación: nije, nisam, nisi...",
        explanation:
          "La negación de biti une el prefijo ni- con la forma corta correspondiente.",
        examples: [
          { sr: "Nisam umoran.", srCyrillic: "Нисам уморан.", es: "No estoy cansado.", highlight: "Nisam" },
          { sr: "Nije ovde.", srCyrillic: "Није овде.", es: "No está aquí.", highlight: "Nije" },
          { sr: "Nismo gladni.", srCyrillic: "Нисмо гладни.", es: "No tenemos hambre.", highlight: "Nismo" },
        ],
      },
    ],
    tipForSpanishSpeakers:
      "En serbio NO existe la distinción ser/estar: biti sirve para ambos ('soy médico' y 'estoy cansado'). La forma corta (sam, si, je, smo, ste, su) es la que más oirás. La negativa es nisam, nisi, nije... muy regular.",
  },
  {
    id: "presente",
    title: "Presente de indicativo",
    subtitle: "Conjugar verbos regulares en presente",
    icon: "⚡",
    level: "A1",
    intro:
      "El serbio tiene verbos regulares que siguen patrones predecibles. Hay tres grupos principales de conjugación, identificados por la vocal temática: -a-, -i- y -e-.",
    patterns: [
      {
        name: "Grupo -a- : čitati (leer)",
        explanation:
          "Los verbos del grupo -a- añaden las desinencias directamente a la raíz. Muy común entre los verbos de movimiento y acción.",
        examples: [
          { sr: "ja čitam — ti čitaš — on/ona čita", srCyrillic: "ја читам — ти читаш — он/она чита", es: "leo — lees — lee" },
          { sr: "mi čitamo — vi čitate — oni čitaju", srCyrillic: "ми читамо — ви читате — они читају", es: "leemos — leéis — leen" },
          { sr: "Govorim srpski. Govoriš li srpski?", srCyrillic: "Говорим српски. Говориш ли српски?", es: "Hablo serbio. ¿Hablas serbio?", highlight: "Govorim" },
        ],
      },
      {
        name: "Grupo -i- : govoriti (hablar)",
        explanation:
          "Los verbos terminados en -iti tienen vocal temática -i- en presente. Son muy frecuentes.",
        examples: [
          { sr: "ja govorim — ti govoriš — on/ona govori", srCyrillic: "ја говорим — ти говориш — он/она говори", es: "hablo — hablas — habla" },
          { sr: "mi govorimo — vi govorite — oni govore", srCyrillic: "ми говоримо — ви говорите — они говоре", es: "hablamos — habláis — hablan" },
          { sr: "Volim kafu. Voliš li čaj?", srCyrillic: "Волим кафу. Волиш ли чај?", es: "Me gusta el café. ¿Te gusta el té?", highlight: "Volim" },
        ],
      },
      {
        name: "Partícula interrogativa 'li'",
        explanation:
          "Para hacer preguntas sí/no en serbio no se cambia el orden de la frase: se añade 'li' después del verbo.",
        examples: [
          { sr: "Govoriš li srpski?", srCyrillic: "Говориш ли српски?", es: "¿Hablas serbio?", highlight: "li" },
          { sr: "Živite li u Beogradu?", srCyrillic: "Живите ли у Београду?", es: "¿Vivís/viven en Belgrado?", highlight: "li" },
          { sr: "Imaš li brata?", srCyrillic: "Имаш ли брата?", es: "¿Tienes un hermano?", highlight: "li" },
        ],
      },
    ],
    tipForSpanishSpeakers:
      "Las desinencias serbias (-m, -š, -∅, -mo, -te, -ju/-e) son muy regulares, más que en español. La partícula 'li' para preguntas es el equivalente del signo '¿' — simplísima de usar.",
  },
  {
    id: "acusativo",
    title: "El caso acusativo",
    subtitle: "El objeto directo en serbio — el caso más común",
    icon: "🎯",
    level: "A2",
    intro:
      "El serbio tiene 7 casos (declinaciones de los sustantivos). El acusativo es el más frecuente después del nominativo: marca el objeto directo de los verbos y se usa con muchas preposiciones de movimiento.",
    patterns: [
      {
        name: "Acusativo masculino inanimado — igual al nominativo",
        explanation:
          "Los sustantivos masculinos inanimados (cosas, no personas) no cambian en acusativo. ¡Es la forma más fácil!",
        examples: [
          { sr: "Vidim grad.", srCyrillic: "Видим град.", es: "Veo la ciudad. (grad no cambia)", highlight: "grad" },
          { sr: "Pijem čaj.", srCyrillic: "Пијем чај.", es: "Bebo té. (čaj no cambia)", highlight: "čaj" },
          { sr: "Čitam roman.", srCyrillic: "Читам роман.", es: "Leo una novela. (roman no cambia)", highlight: "roman" },
        ],
      },
      {
        name: "Acusativo femenino — -a → -u",
        explanation:
          "Los sustantivos femeninos en -a cambian a -u en acusativo. Compara: žena (mujer) → vidim ženu (veo a una mujer).",
        examples: [
          { sr: "Vidim ženu.", srCyrillic: "Видим жену.", es: "Veo a una mujer. (žena → ženu)", highlight: "ženu" },
          { sr: "Pijem kafu.", srCyrillic: "Пијем кафу.", es: "Bebo café. (kafa → kafu)", highlight: "kafu" },
          { sr: "Imam sestru.", srCyrillic: "Имам сестру.", es: "Tengo una hermana. (sestra → sestru)", highlight: "sestru" },
        ],
      },
      {
        name: "Acusativo masculino animado (personas) — igual al genitivo",
        explanation:
          "Los sustantivos masculinos que designan seres vivos añaden -a en acusativo. Esto distingue 'ver un hombre' de 'ser un hombre'.",
        examples: [
          { sr: "Vidim brata.", srCyrillic: "Видим брата.", es: "Veo a mi hermano. (brat → brata)", highlight: "brata" },
          { sr: "Poznajem doktora.", srCyrillic: "Познајем доктора.", es: "Conozco a un médico. (doktor → doktora)", highlight: "doktora" },
        ],
      },
      {
        name: "Acusativo con preposiciones de movimiento",
        explanation:
          "Las preposiciones u (en/a) y na (a/sobre) usan acusativo cuando indican movimiento hacia un lugar.",
        examples: [
          { sr: "Idem u grad.", srCyrillic: "Идем у град.", es: "Voy a la ciudad. (movimiento → acusativo)", highlight: "grad" },
          { sr: "Idem u prodavnicu.", srCyrillic: "Идем у продавницу.", es: "Voy a la tienda. (prodavnica → prodavnicu)", highlight: "prodavnicu" },
          { sr: "Idem na posao.", srCyrillic: "Идем на посао.", es: "Voy al trabajo.", highlight: "posao" },
        ],
      },
    ],
    tipForSpanishSpeakers:
      "El acusativo es tu aliado: ya lo usas sin saberlo en escenas de café ('kafu, molim' = una-café-en-acusativo). El cambio -a → -u en femeninos es la única regla nueva para el 80% de los casos. Practica con: Vidim/pijem/imam + sustantivo.",
  },
  {
    id: "casos",
    title: "Los 7 casos del serbio",
    subtitle: "Una vista general del sistema de declinación",
    icon: "🗺️",
    level: "B1",
    intro:
      "El serbio tiene 7 casos gramaticales: cada sustantivo, pronombre y adjetivo cambia de forma según su función en la frase. Al principio parece mucho, pero cada caso tiene una función clara — como preposiciones integradas en la palabra.",
    patterns: [
      {
        name: "1. Nominativo — el sujeto",
        explanation: "El sustantivo en su forma base. Es el sujeto de la acción.",
        examples: [
          { sr: "Devojka čita.", srCyrillic: "Девојка чита.", es: "La chica lee. (devojka = sujeto)" },
        ],
      },
      {
        name: "2. Genitivo — posesión, cantidad, negación",
        explanation: "Equivale al 'de' español. También marca la negación del objeto y las cantidades.",
        examples: [
          { sr: "Knjiga devojke.", srCyrillic: "Књига девојке.", es: "El libro de la chica." },
          { sr: "Nemam vremena.", srCyrillic: "Немам времена.", es: "No tengo tiempo. (negación)" },
        ],
      },
      {
        name: "3. Dativo — receptor o beneficiario",
        explanation: "Equivale al objeto indirecto español ('a alguien', 'para alguien').",
        examples: [
          { sr: "Dajem knjige devojci.", srCyrillic: "Дајем књиге девојки.", es: "Le doy libros a la chica." },
          { sr: "Drago mi je.", srCyrillic: "Драго ми је.", es: "Mucho gusto. (mi = me, dativo)" },
        ],
      },
      {
        name: "4. Acusativo — objeto directo y movimiento",
        explanation: "El objeto directo y el destino del movimiento. El más frecuente tras el nominativo.",
        examples: [
          { sr: "Vidim devojku.", srCyrillic: "Видим девојку.", es: "Veo a la chica." },
          { sr: "Idem u grad.", srCyrillic: "Идем у град.", es: "Voy a la ciudad." },
        ],
      },
      {
        name: "5. Vocativo — llamar a alguien",
        explanation: "Para dirigirse directamente a alguien. Cambia ligeramente la terminación.",
        examples: [
          { sr: "Marko! → Marko, dođi!", srCyrillic: "Марко! → Марко, дођи!", es: "¡Marko, ven!" },
          { sr: "Mama! → Mama, gde si?", srCyrillic: "Мама! → Мама, где си?", es: "¡Mamá, dónde estás?" },
        ],
      },
      {
        name: "6. Instrumental — compañía y medio",
        explanation: "Con quién o con qué. Equivale a 'con' español.",
        examples: [
          { sr: "Idem sa prijateljem.", srCyrillic: "Идем са пријатељем.", es: "Voy con un amigo." },
          { sr: "Pišem olovkom.", srCyrillic: "Пишем оловком.", es: "Escribo con un lápiz." },
        ],
      },
      {
        name: "7. Lokativ — ubicación (siempre con preposición)",
        explanation: "Dónde algo está o sucede. Siempre va con preposición (u, na, o, pri...).",
        examples: [
          { sr: "Živim u Beogradu.", srCyrillic: "Живим у Београду.", es: "Vivo en Belgrado. (u + lokativ)" },
          { sr: "Govorimo o ljubavi.", srCyrillic: "Говоримо о љубави.", es: "Hablamos de amor. (o + lokativ)" },
        ],
      },
    ],
    tipForSpanishSpeakers:
      "Siete parece mucho, pero aprende de uno en uno: empieza por nominativo (ya lo sabes), acusativo (objeto directo y movimiento), genitivo (posesión). Los demás vendrán solos con la exposición. El serbio es muy regular dentro de cada caso.",
  },
];
