export type LibraryTab = "books" | "documentaries" | "movies";

export type LibraryLanguage =
  | "English"
  | "French"
  | "German"
  | "Japanese"
  | "Spanish";

export interface LibraryItem {
  id: string;
  title: string;
  creator: string;
  year: string;
  language: LibraryLanguage;
  description: string;
  url: string;
  sourceLabel: string;
}

export const LIBRARY_DATA: Record<LibraryTab, LibraryItem[]> = {
  books: [
    {
      id: "entangled-life",
      title: "Entangled Life",
      creator: "Merlin Sheldrake",
      year: "2020",
      language: "English",
      description:
        "How fungi make our worlds, change our minds, and shape our futures — a foundational tour of mycorrhizal networks, lichens, and fungal intelligence.",
      url: "https://en.wikipedia.org/wiki/Entangled_Life",
      sourceLabel: "Wikipedia",
    },
    {
      id: "how-to-change-your-mind",
      title: "How to Change Your Mind",
      creator: "Michael Pollan",
      year: "2018",
      language: "English",
      description:
        "What the new science of psychedelics teaches us about consciousness, dying, addiction, depression, and modern clinical research.",
      url: "https://en.wikipedia.org/wiki/How_to_Change_Your_Mind",
      sourceLabel: "Wikipedia",
    },
    {
      id: "mycelium-running",
      title: "Mycelium Running",
      creator: "Paul Stamets",
      year: "2005",
      language: "English",
      description:
        "How mushrooms can help save the world — a Pacific Northwest manual on mycoremediation, mycofiltration, and ecological restoration.",
      url: "https://en.wikipedia.org/wiki/Mycelium_Running",
      sourceLabel: "Wikipedia",
    },
    {
      id: "mushroom-at-the-end-of-the-world",
      title: "Le Champignon de la Fin du Monde",
      creator: "Anna Lowenhaupt Tsing",
      year: "2017",
      language: "French",
      description:
        "Sur la possibilité de vivre dans les ruines du capitalisme — an anthropological study of matsutake foraging from Oregon forests to Japan.",
      url: "https://en.wikipedia.org/wiki/The_Mushroom_at_the_End_of_the_World",
      sourceLabel: "Wikipedia",
    },
    {
      id: "pilze-faszinierende-welt",
      title: "Pilze: Eine faszinierende Welt",
      creator: "Ewald Gerhardt",
      year: "2020",
      language: "German",
      description:
        "A comprehensive European mycology field reference covering forest fungal ecology, morphology, and accurate species identification.",
      url: "https://de.wikipedia.org/wiki/Ewald_Gerhardt",
      sourceLabel: "Wikipedia (DE)",
    },
    {
      id: "kinoko-no-fushigi",
      title: "きのこのふしぎ (The Wonder of Mushrooms)",
      creator: "Osamu Shirouzu",
      year: "2015",
      language: "Japanese",
      description:
        "An illustrated field journey through the ecological roles, decomposition cycles, and seasonal diversity of fungi in Japanese forests.",
      url: "https://ja.wikipedia.org/wiki/%E3%82%AD%E3%83%8E%E3%82%B3",
      sourceLabel: "Wikipedia (JA)",
    },
    {
      id: "hongos-de-espana-y-europa",
      title: "Hongos de España y Europa",
      creator: "Gabriel Moreno",
      year: "2010",
      language: "Spanish",
      description:
        "Detailed taxonomic reference for macrofungi documented across the Iberian peninsula and broader European woodlands.",
      url: "https://es.wikipedia.org/wiki/Fungi",
      sourceLabel: "Wikipedia (ES)",
    },
  ],
  documentaries: [
    {
      id: "fantastic-fungi",
      title: "Fantastic Fungi",
      creator: "Louie Schwartzberg",
      year: "2019",
      language: "English",
      description:
        "A time-lapse cinematic journey into the fungal kingdom, highlighting mycelial networks, ecological regeneration, and clinical mycology.",
      url: "https://fantasticfungi.com/",
      sourceLabel: "Official Site",
    },
    {
      id: "fungi-web-of-life",
      title: "Fungi: Web of Life",
      creator: "Gisela Kaufmann, Joseph Nizeti",
      year: "2023",
      language: "English",
      description:
        "Explores the vital role fungi play in Earth's ecosystems, guided by biologist Merlin Sheldrake through ancient rainforests.",
      url: "https://www.merlinsheldrake.com/",
      sourceLabel: "Merlin Sheldrake",
    },
    {
      id: "the-magic-of-mushrooms",
      title: "The Magic of Mushrooms",
      creator: "Richard Downell & Richard Fortey",
      year: "2014",
      language: "English",
      description:
        "Paleontologist and natural historian Professor Richard Fortey explores the hidden kingdom of fungi and its evolutionary history.",
      url: "https://en.wikipedia.org/wiki/Richard_Fortey",
      sourceLabel: "Wikipedia",
    },
    {
      id: "know-your-mushrooms",
      title: "Know Your Mushrooms",
      creator: "Ron Mann",
      year: "2008",
      language: "English",
      description:
        "Follows mycologists Gary Lincoff and Larry Evans on a wild mushroom foray in Telluride, blending foraging lore with fungal science.",
      url: "https://en.wikipedia.org/wiki/Know_Your_Mushrooms",
      sourceLabel: "Wikipedia",
    },
    {
      id: "dosed",
      title: "Dosed",
      creator: "Tyler Chandler",
      year: "2019",
      language: "English",
      description:
        "A Canadian documentary examining personal recovery journeys and the growing clinical conversation around psychedelic-assisted therapy.",
      url: "https://www.dosedmovie.com/",
      sourceLabel: "Official Site",
    },
    {
      id: "magic-medicine",
      title: "Magic Medicine",
      creator: "Monty Wates",
      year: "2018",
      language: "English",
      description:
        "An intimate documentary following Imperial College London's landmark clinical trial investigating psilocybin for treatment-resistant depression.",
      url: "https://www.imperial.ac.uk/psychedelic-research-centre/",
      sourceLabel: "Imperial College London",
    },
  ],
  movies: [
    {
      id: "matango",
      title: "Matango",
      creator: "Ishirō Honda",
      year: "1963",
      language: "Japanese",
      description:
        "A classic Toho psychological sci-fi film about castaways on a misty island transformed by an eerie bioluminescent mushroom ecosystem.",
      url: "https://en.wikipedia.org/wiki/Matango",
      sourceLabel: "Wikipedia",
    },
    {
      id: "annihilation",
      title: "Annihilation",
      creator: "Alex Garland",
      year: "2018",
      language: "English",
      description:
        "A visually arresting sci-fi thriller featuring intricate fungal-inspired biological refraction and ecological interconnectedness.",
      url: "https://en.wikipedia.org/wiki/Annihilation_(film)",
      sourceLabel: "Wikipedia",
    },
    {
      id: "the-last-of-us",
      title: "The Last of Us",
      creator: "Craig Mazin, Neil Druckmann",
      year: "2023",
      language: "English",
      description:
        "A drama series inspired by real-world entomopathogenic Cordyceps fungi, sparking widespread public curiosity about mycology.",
      url: "https://en.wikipedia.org/wiki/The_Last_of_Us_(TV_series)",
      sourceLabel: "Wikipedia",
    },
    {
      id: "shrooms",
      title: "Shrooms",
      creator: "Paddy Breathnach",
      year: "2007",
      language: "English",
      description:
        "An atmospheric Irish forest thriller centered around a group of travelers foraging in rural woodlands.",
      url: "https://en.wikipedia.org/wiki/Shrooms_(film)",
      sourceLabel: "Wikipedia",
    },
  ],
};

export const LIBRARY_LANGUAGES: LibraryLanguage[] = [
  "English",
  "French",
  "German",
  "Japanese",
  "Spanish",
];
