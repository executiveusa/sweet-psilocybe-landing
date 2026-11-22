/**
 * Universal Gateway Skin Contract (gateway-skin/v1)
 *
 * Derived from the Synthia 3.1 25-part gateway anatomy teardown.
 * A skin changes data and assets; the renderer stays shared.
 */

export type RigType = "none" | "mixamo" | "vrm" | "custom";

export type GatewayMotionState =
  | "idle"
  | "hover"
  | "focus"
  | "enter"
  | "day"
  | "night";

export interface AssetLicenseRecord {
  id: string;
  assetPath: string;
  sourceUrl: string;
  author: string;
  spdx: string;
  attributionRequired: boolean;
  attributionText: string;
}

export interface GatewayDoor {
  id: string;
  label: {
    en: string;
    es: string;
  };
  subtitle: {
    en: string;
    es: string;
  };
  href: string;
  icon: string;
  color: string;
  position: [number, number, number];
  scale: number;
  locked?: boolean;
}

export interface GatewaySkinV1 {
  schemaVersion: "gateway-skin/v1";
  id: string;
  name: string;
  identity: {
    brandName: string;
    tagline: {
      en: string;
      es: string;
    };
    complianceBadge: {
      en: string;
      es: string;
    };
  };
  world: {
    defaultMode: "night" | "day";
    modes: {
      night: {
        background: string;
        fogColor: string;
        fogDensity: number;
        groundColor: string;
        skyTop: string;
        skyBottom: string;
        ambientIntensity: number;
        keyLightColor: string;
        keyLightIntensity: number;
        rimLightColor: string;
        rimLightIntensity: number;
        bloomThreshold: number;
        bloomIntensity: number;
        showStars: boolean;
      };
      day: {
        background: string;
        fogColor: string;
        fogDensity: number;
        groundColor: string;
        skyTop: string;
        skyBottom: string;
        ambientIntensity: number;
        keyLightColor: string;
        keyLightIntensity: number;
        rimLightColor: string;
        rimLightIntensity: number;
        bloomThreshold: number;
        bloomIntensity: number;
        showStars: boolean;
      };
    };
    backdrop?: {
      nightImage?: string;
      dayImage?: string;
      focalPoint: string;
    };
    hdri?: {
      nightUrl?: string;
      dayUrl?: string;
    };
  };
  camera: {
    desktop: {
      position: [number, number, number];
      target: [number, number, number];
      fov: number;
    };
    mobile: {
      position: [number, number, number];
      target: [number, number, number];
      fov: number;
    };
    minDistance: number;
    maxDistance: number;
  };
  centerpiece: {
    mode: "procedural-sanctuary" | "glb";
    glbUrl?: string;
    rig: RigType;
    position: [number, number, number];
    scale: number;
    materials: {
      primaryCap: string;
      secondaryCap: string;
      stem: string;
      gills: string;
      moss: string;
      emissive: string;
    };
  };
  companion: {
    enabled: boolean;
    name: string;
    mode: "spore-sprite" | "glb";
    glbUrl?: string;
    color: string;
    orbitRadius: number;
    orbitHeight: number;
  };
  particles: {
    kind: "spores" | "fireflies" | "dust" | "none";
    desktopCount: number;
    mobileCount: number;
    reducedMotionCount: number;
    color: string;
  };
  audio: {
    enabled: boolean;
    defaultMuted: true;
    mode: "web-audio-forest" | "file";
    fileUrl?: string;
    volume: number;
    attribution: string;
  };
  navigation: {
    skipHref: string;
    skipLabel: {
      en: string;
      es: string;
    };
    doors: GatewayDoor[];
  };
  policy: {
    respectReducedMotion: true;
    ageGateEnabled: boolean;
  };
  budgets: {
    maxInitialGlbBytes: number;
    maxTriangles: number;
    maxTextures: number;
    maxTextureEdgePx: number;
  };
  licenses: AssetLicenseRecord[];
}
