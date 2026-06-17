import type { Story } from "./types";

export const stories: Story[] = [
  {
    id: "jutro-u-beogradu",
    title: "Mañana en Belgrado",
    titleSr: "Jutro u Beogradu",
    level: "A1",
    xpReward: 25,
    vocabItemIds: ["v-dobar-dan", "v-hvala"],
    paragraphs: [
      {
        sr: "Ana se budi rano ujutru. Sunce već sija.",
        srCyrillic: "Ана се буди рано ујутру. Сунце већ сија.",
        es: "Ana se despierta temprano por la mañana. El sol ya brilla.",
      },
      {
        sr: "Ona pravi kafu i gleda kroz prozor. Vreme je lepo.",
        srCyrillic: "Она прави кафу и гледа кроз прозор. Време је лепо.",
        es: "Ella prepara café y mira por la ventana. El tiempo es bueno.",
      },
      {
        sr: "Ana uzima torbu i ide u pekaru. Kupuje hleb i kifle.",
        srCyrillic: "Ана узима торбу и иде у пекару. Купује хлеб и кифле.",
        es: "Ana coge el bolso y va a la panadería. Compra pan y medias lunas.",
      },
      {
        sr: "'Dobar dan!' kaže prodavačica. 'Hvala lepo!' odgovara Ana.",
        srCyrillic: "'Добар дан!' каже продавачица. 'Хвала лепо!' одговара Ана.",
        es: "'¡Buenos días!' dice la vendedora. '¡Muchas gracias!' responde Ana.",
      },
      {
        sr: "Ana se vraća kući. Pije kafu i jede kiflu. Srećan je početak dana.",
        srCyrillic: "Ана се враћа кући. Пије кафу и јела кифлу. Срећан је почетак дана.",
        es: "Ana vuelve a casa. Bebe café y come una media luna. Es un comienzo feliz del día.",
      },
    ],
    questions: [
      {
        question: "¿Qué prepara Ana por la mañana?",
        correctAnswer: "Café",
        distractors: ["Té", "Zumo", "Agua"],
      },
      {
        question: "¿Adónde va Ana con su bolso?",
        correctAnswer: "A la panadería",
        distractors: ["Al mercado", "Al café", "A la tienda"],
      },
      {
        question: "¿Qué tiempo hace?",
        correctAnswer: "Bueno, hace sol",
        distractors: ["Llueve", "Hace frío", "Está nublado"],
      },
    ],
  },
  {
    id: "u-prodavnici",
    title: "En la tienda",
    titleSr: "U prodavnici",
    level: "A1",
    xpReward: 25,
    vocabItemIds: ["v-molim", "v-hvala"],
    paragraphs: [
      {
        sr: "Marko ide u prodavnicu. Treba mu hleb, mleko i jabuke.",
        srCyrillic: "Марко иде у продавницу. Треба му хлеб, млеко и јабуке.",
        es: "Marko va a la tienda. Necesita pan, leche y manzanas.",
      },
      {
        sr: "On uzima korpu i ide kroz redove. Vidi hleb i stavlja ga u korpu.",
        srCyrillic: "Он узима корпу и иде кроз редове. Види хлеб и ставља га у корпу.",
        es: "Coge la cesta y va por los pasillos. Ve el pan y lo pone en la cesta.",
      },
      {
        sr: "Mleko je u frižideru. Jabuke su blizu ulaza. Marko ih uzima.",
        srCyrillic: "Млеко је у фрижидеру. Јабуке су близу улаза. Марко их узима.",
        es: "La leche está en el frigorífico. Las manzanas están cerca de la entrada. Marko las coge.",
      },
      {
        sr: "Na kasi prodavac kaže: 'Izvolite!' Marko plaća karticom.",
        srCyrillic: "На каси продавац каже: 'Извол ите!' Марко плаћа картицом.",
        es: "En la caja el vendedor dice: '¡Aquí tiene!' Marko paga con tarjeta.",
      },
      {
        sr: "'Hvala lepo!' kaže Marko. 'Molim!' odgovara prodavac. Marko odlazi kući.",
        srCyrillic: "'Хвала лепо!' каже Марко. 'Молим!' одговара продавац. Марко одлази кући.",
        es: "'¡Muchas gracias!' dice Marko. '¡De nada!' responde el vendedor. Marko se va a casa.",
      },
    ],
    questions: [
      {
        question: "¿Qué necesita Marko?",
        correctAnswer: "Pan, leche y manzanas",
        distractors: ["Café, té y agua", "Carne, queso y pan", "Fruta y verduras"],
      },
      {
        question: "¿Cómo paga Marko?",
        correctAnswer: "Con tarjeta",
        distractors: ["En efectivo", "Con cheque", "No paga"],
      },
      {
        question: "¿Dónde están las manzanas?",
        correctAnswer: "Cerca de la entrada",
        distractors: ["En el frigorífico", "Al fondo de la tienda", "Junto a la caja"],
      },
    ],
  },
  {
    id: "moja-porodica",
    title: "Mi familia",
    titleSr: "Moja porodica",
    level: "A1",
    xpReward: 25,
    vocabItemIds: [],
    paragraphs: [
      {
        sr: "Imam veliku porodicu. Volim svoju porodicu.",
        srCyrillic: "Имам велику породицу. Волим своју породицу.",
        es: "Tengo una familia grande. Quiero a mi familia.",
      },
      {
        sr: "Moj otac se zove Petar. On je lekar. Moja majka se zove Milica. Ona je učiteljica.",
        srCyrillic: "Мој отац се зове Петар. Он је лекар. Моја мајка се зове Милица. Она је учитељица.",
        es: "Mi padre se llama Petar. Él es médico. Mi madre se llama Milica. Ella es maestra.",
      },
      {
        sr: "Imam jednog brata. Zove se Stefan. Imam i dve sestre — Anu i Maju.",
        srCyrillic: "Имамједног брата. Зове се Стефан. Имам и две сестре — Ану и Маjу.",
        es: "Tengo un hermano. Se llama Stefan. Tengo también dos hermanas: Ana y Maja.",
      },
      {
        sr: "Živimo zajedno u Beogradu. Naša kuća je velika i lepa.",
        srCyrillic: "Живимо заједно у Београду. Наша кућа је велика и лепа.",
        es: "Vivimos juntos en Belgrado. Nuestra casa es grande y bonita.",
      },
      {
        sr: "Svake nedele jedemo zajedno. Majka pravi pasulj. Svi volimo da jedemo zajedno.",
        srCyrillic: "Сваке недељеједемо заједно. Мајка прави пасуљ. Сви волимо да једемо заједно.",
        es: "Cada domingo comemos juntos. La madre hace judías. A todos nos gusta comer juntos.",
      },
    ],
    questions: [
      {
        question: "¿Cuál es la profesión del padre?",
        correctAnswer: "Médico",
        distractors: ["Maestro", "Ingeniero", "Abogado"],
      },
      {
        question: "¿Cuántos hermanos tiene el narrador?",
        correctAnswer: "Un hermano y dos hermanas",
        distractors: ["Dos hermanos y una hermana", "Tres hermanos", "Solo hermanas"],
      },
      {
        question: "¿Qué hace la madre los domingos?",
        correctAnswer: "Hace judías",
        distractors: ["Hace sopa", "Hace carne", "Hace pastel"],
      },
    ],
  },
  {
    id: "beograd-je-lep",
    title: "Belgrado es hermosa",
    titleSr: "Beograd je lep",
    level: "A2",
    xpReward: 35,
    vocabItemIds: [],
    paragraphs: [
      {
        sr: "Beograd je glavni grad Srbije. Leži na ušću Save u Dunav. Ima oko dva miliona stanovnika.",
        srCyrillic: "Београд је главни град Србије. Лежи на ушћу Саве у Дунав. Има око два милиона становника.",
        es: "Belgrado es la capital de Serbia. Está situado en la confluencia del río Sava con el Danubio. Tiene unos dos millones de habitantes.",
      },
      {
        sr: "Kalemegdan je stara tvrđava u centru grada. Odatle se vidi ceo Novi Beograd. Turistima se jako sviđa.",
        srCyrillic: "Калемегдан је стара тврђава у центру града. Одатле се види цео Нови Београд. Туристима се јако свиђа.",
        es: "Kalemegdan es una antigua fortaleza en el centro de la ciudad. Desde allí se ve todo Novi Beograd. A los turistas les gusta mucho.",
      },
      {
        sr: "Skadarlija je bohemska ulica puna restorana i muzike. Tamo možete probati srpsku kuhinju: pljeskavicu, ćevape i ajvar.",
        srCyrillic: "Скадарлија је бохемска улица пуна ресторана и музике. Тамо можете пробати српску кухињу: пљескавицу, ћевапе и ајвар.",
        es: "Skadarlija es una calle bohemia llena de restaurantes y música. Allí puedes probar la cocina serbia: hamburguesas, kebabs y ajvar.",
      },
      {
        sr: "Noćni život u Beogradu je poznat u celoj Evropi. Splavovi na Savi rade do jutra. Mladi iz celog sveta dolaze ovde.",
        srCyrillic: "Ноћни живот у Београду је познат у целој Европи. Сплавови на Сави раде до јутра. Млади из целог света долазе овде.",
        es: "La vida nocturna de Belgrado es conocida en toda Europa. Las barcas-discotecas del Sava funcionan hasta el amanecer. Jóvenes de todo el mundo vienen aquí.",
      },
      {
        sr: "Ako posetite Beograd, nećete se razočarati. Grad je pun energije, kulture i istorije. Doviđenja, Beograde!",
        srCyrillic: "Ако посетите Београд, нећете се разочарати. Град је пун енергије, културе и историје. Довиђења, Београде!",
        es: "Si visitas Belgrado, no te decepcionarás. La ciudad está llena de energía, cultura e historia. ¡Hasta pronto, Belgrado!",
      },
    ],
    questions: [
      {
        question: "¿En qué confluencia de ríos está Belgrado?",
        correctAnswer: "Sava y Danubio",
        distractors: ["Drina y Morava", "Tisa y Danubio", "Sava y Morava"],
      },
      {
        question: "¿Qué es Skadarlija?",
        correctAnswer: "Una calle bohemia con restaurantes y música",
        distractors: ["Una fortaleza antigua", "Un barco-discoteca", "Un parque nacional"],
      },
      {
        question: "¿Por qué es famosa la vida nocturna de Belgrado?",
        correctAnswer: "Por las barcas-discotecas que funcionan hasta el amanecer",
        distractors: ["Por sus teatros de ópera", "Por sus festivales de cine", "Por sus casinos"],
      },
    ],
  },
];
