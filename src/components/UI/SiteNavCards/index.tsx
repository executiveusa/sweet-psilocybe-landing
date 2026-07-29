"use client";

import React from "react";
import { Section, Inner, Grid, Card, Icon, Title, Description } from "./styles";
import { motion } from "framer-motion";

const cardsData = [
  {
    title: "The Collection",
    description: "Premium mushroom-culture merchandise",
    icon: "🛒",
    url: "/store",
  },
  {
    title: "Research & Education",
    description: "Evidence-based articles with full citations",
    icon: "📚",
    url: "/blog",
  },
  {
    title: "Play & Learn",
    description: "Interactive mushroom games and experiences",
    icon: "🎮",
    url: "/games",
  },
  {
    title: "The Library",
    description: "Books, documentaries, and films from around the world",
    icon: "📖",
    url: "/library",
  },
  {
    title: "Research Hub",
    description: "Scientific resources and safety information",
    icon: "🔬",
    url: "/resources/research-hub",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const SiteNavCards = () => {
  return (
    <Section>
      <Inner>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Grid>
            {cardsData.map((card, index) => (
              <Card key={index} href={card.url} variants={cardVariants}>
                <Icon>{card.icon}</Icon>
                <Title>{card.title}</Title>
                <Description>{card.description}</Description>
              </Card>
            ))}
          </Grid>
        </motion.div>
      </Inner>
    </Section>
  );
};

export default SiteNavCards;
