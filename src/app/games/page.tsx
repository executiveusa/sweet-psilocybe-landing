"use client";

import { motion } from "framer-motion";
import {
  GamesWrapper,
  GamesHero,
  GamesGrid,
  GameCard,
  GameHeader,
  TechBadge,
  GameDescription,
  PlayButton
} from "./styles";

const GAMES_DATA = [
  {
    title: "Fungi JS",
    description: "An interactive HTML5 simulation that allows you to manage and cultivate your own digital mushroom farm. Monitor humidity, temperature, and substrate levels.",
    tech: "html5",
    badgeLabel: "HTML5",
    link: "https://github.com/FeatheredSnek/fungi-js"
  },
  {
    title: "Fungal Colony Sim",
    description: "A beautiful WebGL-powered farming simulator. Watch intricate mycelial networks expand in real-time as they forage for nutrients.",
    tech: "webgl",
    badgeLabel: "WebGL",
    link: "https://skylorbeck.itch.io/fungal-colony-sim"
  },
  {
    title: "Mushroom Clicker",
    description: "An addictive idle incremental game. Start with a single spore and grow your fungal empire to intergalactic proportions.",
    tech: "html5",
    badgeLabel: "HTML5",
    link: "https://github.com/thealtingsage/mushroom-clicker"
  },
  {
    title: "3D Mushroom Scene",
    description: "A tranquil Three.js experiential journey through a bioluminescent mushroom forest. Interact with the environment in full 3D.",
    tech: "threejs",
    badgeLabel: "Three.js",
    link: "https://github.com/aiyah/mushroom"
  },
  {
    title: "Procedural Mushroom Generator",
    description: "Using p5.js algorithms, generate infinite unique mushroom morphologies. Perfect for creative coding enthusiasts.",
    tech: "p5js",
    badgeLabel: "p5.js",
    link: "https://github.com/funvill/GameOfShrooms2023"
  },
  {
    title: "Fungus Puzzle",
    description: "A challenging web-based puzzle game where you connect mycelium nodes to transport nutrients across the board efficiently.",
    tech: "html5",
    badgeLabel: "HTML5",
    link: "https://github.com/alexejrotar/fungus"
  }
];

export default function GamesPage() {
  return (
    <GamesWrapper>
      <GamesHero
        as={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1>Play &amp; Learn</h1>
        <p>Explore the fungal kingdom through interactive games and experiential simulations.</p>
      </GamesHero>

      <GamesGrid>
        {GAMES_DATA.map((game, i) => (
          <GameCard
            as={motion.div}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={game.title}
          >
            <GameHeader>
              <h2>{game.title}</h2>
              <TechBadge $type={game.tech as any}>{game.badgeLabel}</TechBadge>
            </GameHeader>
            
            <GameDescription>
              {game.description}
            </GameDescription>
            
            <PlayButton href={game.link} target="_blank" rel="noopener noreferrer">
              Play Game
            </PlayButton>
          </GameCard>
        ))}
      </GamesGrid>
    </GamesWrapper>
  );
}
