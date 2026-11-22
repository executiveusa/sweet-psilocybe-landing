import type { Metadata } from "next";
import LandingClient from "./LandingClient";

export const metadata: Metadata = {
  title: "Sweet Psilocybe — Evidence-Based Mycology Education & Artistic Merch",
  description:
    "A faceless mycology education & artistic merchandise brand. Peer-reviewed research, global mushroom library, arcade games, and print-on-demand apparel. No psilocybin sold.",
};

export default function LandingPage() {
  return <LandingClient />;
}
