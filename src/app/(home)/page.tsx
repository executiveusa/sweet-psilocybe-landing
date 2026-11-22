"use client";

import AgeGate from "@/components/UI/AgeGate";
import GatewayShell from "@/gateway-kit/components/GatewayShell";
import { sweetPsilocybeSkin } from "@/gateway-kit/skins/sweet-psilocybe";

export default function Home() {
  return (
    <>
      <AgeGate />
      <GatewayShell skin={sweetPsilocybeSkin} />
    </>
  );
}
