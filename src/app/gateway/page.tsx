"use client";

import GatewayShell from "@/gateway-kit/components/GatewayShell";
import { sweetPsilocybeSkin } from "@/gateway-kit/skins/sweet-psilocybe";

export default function GatewayPage() {
  return <GatewayShell skin={sweetPsilocybeSkin} />;
}
