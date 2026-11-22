#!/usr/bin/env node
/**
 * Pre-Flight Safety Gate & Gateway Skin Validator (gateway-skin/v1)
 * Runs automatically on `prebuild`. Verifies:
 * 1. Skin manifest contract keys + licensed asset existence
 * 2. All 5 PNW WebP backdrops exist and are within 300 KB budget
 * 3. Any GLB files in public/models/ or public/skins/ have valid 'glTF' header and are <= 4 MB
 * 4. SECRET_GUARD: zero hardcoded API keys or private keys in src/
 */

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SKIN_FILE = path.join(ROOT, "src/gateway-kit/skins/sweet-psilocybe.ts");
const MAX_GLB_BYTES = 4 * 1024 * 1024;
const MAX_BACKDROP_BYTES = 300 * 1024;

const REQUIRED_BACKDROPS = [
  "public/background/home-golden-dusk.webp",
  "public/background/home-twilight.webp",
  "public/background/store-background.webp",
  "public/background/blog-background.webp",
  "public/background/library-background.webp",
  "public/background/games-background.webp",
];

const SECRET_PATTERNS = [
  /sk-[A-Za-z0-9]{24,}/,
  /tsk_[A-Za-z0-9]{20,}/,
  /gsk_[A-Za-z0-9]{20,}/,
  /hf_[A-Za-z0-9]{20,}/,
  /AIzaSy[A-Za-z0-9_-]{25,}/,
  /-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----/,
];

let errors = 0;

function fail(msg) {
  console.error(`❌ [pre-flight] ${msg}`);
  errors++;
}

function pass(msg) {
  console.log(`✅ [pre-flight] ${msg}`);
}

// 1. Validate skin contract & licenses
if (!fs.existsSync(SKIN_FILE)) {
  fail(`Missing skin file: ${SKIN_FILE}`);
  process.exit(1);
}

const skinSource = fs.readFileSync(SKIN_FILE, "utf8");
for (const requiredKey of [
  'schemaVersion: "gateway-skin/v1"',
  "budgets:",
  "licenses:",
  "navigation:",
  "centerpiece:",
  "companion:",
  "audio:",
]) {
  if (!skinSource.includes(requiredKey)) {
    fail(`Skin missing required contract field: ${requiredKey}`);
  }
}

const assetPathMatches = [...skinSource.matchAll(/assetPath:\s*"([^"]+)"/g)];
if (assetPathMatches.length === 0) {
  fail("No license assetPath entries found in skin manifest.");
} else {
  for (const match of assetPathMatches) {
    const rel = match[1];
    if (!fs.existsSync(path.join(ROOT, rel))) {
      fail(`Licensed asset not found on disk: ${rel}`);
    } else {
      pass(`Verified licensed asset: ${rel}`);
    }
  }
}

// 2. Validate PNW WebP backdrops exist and stay fast
for (const rel of REQUIRED_BACKDROPS) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    fail(`Missing required backdrop: ${rel}`);
  } else {
    const size = fs.statSync(abs).size;
    if (size > MAX_BACKDROP_BYTES) {
      fail(
        `Backdrop exceeds 300 KB budget (${(size / 1024).toFixed(1)} KB): ${rel}`
      );
    } else {
      pass(`Backdrop OK (${(size / 1024).toFixed(1)} KB): ${rel}`);
    }
  }
}

// 3. Inspect any .glb files under public/models/ and public/skins/
for (const relDir of ["public/models", "public/skins"]) {
  const dir = path.join(ROOT, relDir);
  if (!fs.existsSync(dir)) continue;
  const walk = (current) => {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        walk(full);
      } else if (entry.name.toLowerCase().endsWith(".glb")) {
        const stat = fs.statSync(full);
        const rel = path.relative(ROOT, full);
        if (stat.size > MAX_GLB_BYTES) {
          fail(
            `GLB exceeds 4MB budget (${(stat.size / 1024 / 1024).toFixed(2)} MB): ${rel}`
          );
        } else {
          const fd = fs.openSync(full, "r");
          const header = Buffer.alloc(4);
          fs.readSync(fd, header, 0, 4, 0);
          fs.closeSync(fd);
          if (header.toString("ascii") !== "glTF") {
            fail(`Invalid GLB magic header in ${rel}`);
          } else {
            pass(`Valid GLB (${(stat.size / 1024).toFixed(1)} KB): ${rel}`);
          }
        }
      }
    }
  };
  walk(dir);
}

// 4. SECRET_GUARD scan across src/
const scanSecrets = (dir) => {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanSecrets(full);
    } else if (/\.(ts|tsx|js|jsx|mjs|json)$/.test(entry.name)) {
      const content = fs.readFileSync(full, "utf8");
      for (const rx of SECRET_PATTERNS) {
        if (rx.test(content)) {
          fail(`SECRET_GUARD triggered in ${path.relative(ROOT, full)}`);
          break;
        }
      }
    }
  }
};
scanSecrets(path.join(ROOT, "src"));
pass("SECRET_GUARD scan passed across src/");

if (errors > 0) {
  console.error(`\nPre-flight safety gate failed with ${errors} error(s).`);
  process.exit(1);
}

console.log("\n🛡️ Pre-flight safety gate passed cleanly.");
