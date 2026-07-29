"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LibraryWrapper,
  LibraryHero,
  TabsContainer,
  TabButton,
  MediaGrid,
  MediaCard,
  MediaMeta,
  MediaDescription,
  ViewLink
} from "./styles";

type Tab = "books" | "documentaries" | "movies";

const LIBRARY_DATA = {
  books: [
    {
      title: "How to Change Your Mind",
      creator: "Michael Pollan",
      year: "2018",
      language: "English",
      description: "What the new science of psychedelics teaches us about consciousness, dying, addiction, depression, and transcendence.",
      link: "#"
    },
    {
      title: "Le Champignon de la Fin du Monde",
      creator: "Anna Lowenhaupt Tsing",
      year: "2017",
      language: "French",
      description: "Sur la possibilité de vivre dans les ruines du capitalisme. An exploration of the matsutake mushroom and global supply chains.",
      link: "#"
    },
    {
      title: "Mycelium Running",
      creator: "Paul Stamets",
      year: "2005",
      language: "English",
      description: "How mushrooms can help save the world. A manual for the mycological rescue of the planet.",
      link: "#"
    },
    {
      title: "Pilze: Eine faszinierende Welt",
      creator: "Ewald Gerhardt",
      year: "2020",
      language: "German",
      description: "A comprehensive guide to the fascinating world of European fungi, their ecology and identification.",
      link: "#"
    },
    {
      title: "きのこのふしぎ (The Wonder of Mushrooms)",
      creator: "Osamu Shirouzu",
      year: "2015",
      language: "Japanese",
      description: "An illustrated journey through the ecological roles of fungi in Japanese forests.",
      link: "#"
    },
    {
      title: "Hongos de España y Europa",
      creator: "Gabriel Moreno",
      year: "2010",
      language: "Spanish",
      description: "Detailed taxonomic reference for mushrooms found across the Iberian peninsula and broader Europe.",
      link: "#"
    }
  ],
  documentaries: [
    {
      title: "Fantastic Fungi",
      creator: "Louie Schwartzberg",
      year: "2019",
      language: "English",
      description: "A descriptive time-lapse journey about the magical, mysterious and medicinal world of fungi and their power to heal, sustain and contribute to the regeneration of life.",
      link: "#"
    },
    {
      title: "Fungi: Web of Life",
      creator: "Gisela Kaufmann, Joseph Nizeti",
      year: "2023",
      language: "English",
      description: "Explores the vital role fungi play in Earth's ecosystems, featuring biologist Merlin Sheldrake.",
      link: "#"
    },
    {
      title: "The Magic of Mushrooms",
      creator: "Richard Downell",
      year: "2014",
      language: "English",
      description: "Professor Richard Fortey explores the fascinating and normally hidden kingdom of fungi.",
      link: "#"
    },
    {
      title: "Know Your Mushrooms",
      creator: "Ron Mann",
      year: "2008",
      language: "English",
      description: "Follows visionaries Gary Lincoff and Larry Evans on a hunt for wild mushrooms and the deeper meaning attached to them.",
      link: "#"
    },
    {
      title: "Dosed",
      creator: "Tyler Chandler",
      year: "2019",
      language: "English",
      description: "A woman's journey exploring psychedelic medicine like magic mushrooms and iboga to cure her severe anxiety and opioid addiction.",
      link: "#"
    },
    {
      title: "Magic Medicine",
      creator: "Monty Wates",
      year: "2018",
      language: "English",
      description: "Intimate portrait of the first ever medical trial of psilocybin treating major depression.",
      link: "#"
    }
  ],
  movies: [
    {
      title: "Matango",
      creator: "Ishirō Honda",
      year: "1963",
      language: "Japanese",
      description: "A psychological horror film about a group of castaways on an island who slowly mutate into mushroom-like creatures.",
      link: "#"
    },
    {
      title: "Annihilation",
      creator: "Alex Garland",
      year: "2018",
      language: "English",
      description: "While not strictly about mushrooms, the film features heavy fungal-inspired biological mutations and themes of ecological interconnectedness.",
      link: "#"
    },
    {
      title: "The Last of Us",
      creator: "Craig Mazin, Neil Druckmann",
      year: "2023",
      language: "English",
      description: "A post-apocalyptic drama series exploring a world devastated by a mass fungal infection (Cordyceps).",
      link: "#"
    },
    {
      title: "Shrooms",
      creator: "Paddy Breathnach",
      year: "2007",
      language: "English",
      description: "A horror film following a group of American students who travel to Ireland to camp and look for magic mushrooms.",
      link: "#"
    }
  ]
};

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("books");

  const currentData = LIBRARY_DATA[activeTab];

  return (
    <LibraryWrapper>
      <LibraryHero
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>The Library</h1>
        <p>The world's mushroom knowledge, curated for you</p>
      </LibraryHero>

      <TabsContainer>
        <TabButton 
          $active={activeTab === "books"} 
          onClick={() => setActiveTab("books")}
        >
          Books
        </TabButton>
        <TabButton 
          $active={activeTab === "documentaries"} 
          onClick={() => setActiveTab("documentaries")}
        >
          Documentaries
        </TabButton>
        <TabButton 
          $active={activeTab === "movies"} 
          onClick={() => setActiveTab("movies")}
        >
          Movies &amp; Media
        </TabButton>
      </TabsContainer>

      <AnimatePresence mode="wait">
        <MediaGrid
          as={motion.div}
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {currentData.map((item, i) => (
            <MediaCard
              key={item.title}
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <h2>{item.title}</h2>
              <MediaMeta>
                <span className="highlight">{item.creator}</span>
                <span>&bull;</span>
                <span>{item.year}</span>
                <span>&bull;</span>
                <span>{item.language}</span>
              </MediaMeta>
              <MediaDescription>
                {item.description}
              </MediaDescription>
              <div>
                <ViewLink href={item.link}>
                  View Details
                </ViewLink>
              </div>
            </MediaCard>
          ))}
        </MediaGrid>
      </AnimatePresence>
    </LibraryWrapper>
  );
}
