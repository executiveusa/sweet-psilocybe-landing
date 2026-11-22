"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

interface FallingItem {
  x: number;
  y: number;
  vy: number;
  r: number;
  kind: "spore" | "chanterelle" | "starcap" | "pinecone";
  rot: number;
  vrot: number;
}

interface BurstParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
}

const MYCOLOGY_FACTS = [
  "A single Armillaria ostoyae mycelium in Oregon spans 2,385 acres — Earth's largest living organism.",
  "Mycorrhizal fungi connect forest trees underground, trading phosphorus and nitrogen for up to 30% of a tree's carbon.",
  "Over 90% of land plants rely on symbiotic fungal networks to absorb water and minerals.",
  "Pacific Northwest old-growth forests host more than 3,000 documented species of macrofungi.",
  "Bioluminescent fungi emit green light via luciferin-luciferase reactions to attract spore-dispersing insects at night.",
];

function playChime(freq: number, enabled: boolean, type: OscillatorType = "sine") {
  if (!enabled || typeof window === "undefined") return;
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.19);
    setTimeout(() => ctx.close().catch(() => {}), 260);
  } catch {
    // ignore audio errors
  }
}

export default function CanopyCatchGame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  const [phase, setPhase] = useState<"idle" | "playing" | "gameover">("idle");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [frenzyActive, setFrenzyActive] = useState(false);
  const [sfxOn, setSfxOn] = useState(false);
  const [fact, setFact] = useState(MYCOLOGY_FACTS[0]);

  const stateRef = useRef({
    running: false,
    score: 0,
    lives: 3,
    combo: 0,
    frenzyUntil: 0,
    invulnUntil: 0,
    playerX: 360,
    targetX: 360,
    keys: { left: false, right: false },
    items: [] as FallingItem[],
    particles: [] as BurstParticle[],
    lastSpawn: 0,
    sfxOn: false,
  });

  useEffect(() => {
    stateRef.current.sfxOn = sfxOn;
  }, [sfxOn]);

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem("sp_canopy_highscore") || "0");
      if (Number.isFinite(saved) && saved > 0) setHighScore(saved);
    } catch {
      // ignore storage errors
    }
  }, []);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.running = true;
    s.score = 0;
    s.lives = 3;
    s.combo = 0;
    s.frenzyUntil = 0;
    s.invulnUntil = 0;
    s.playerX = 360;
    s.targetX = 360;
    s.items = [];
    s.particles = [];
    s.lastSpawn = performance.now();
    setScore(0);
    setLives(3);
    setFrenzyActive(false);
    setFact(MYCOLOGY_FACTS[Math.floor(Math.random() * MYCOLOGY_FACTS.length)]);
    setPhase("playing");
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        stateRef.current.keys.left = true;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        stateRef.current.keys.right = true;
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        stateRef.current.keys.left = false;
      }
      if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        stateRef.current.keys.right = false;
      }
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = 720;
    const H = 440;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const spawnBurst = (x: number, y: number, color: string, count = 12) => {
      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + Math.random() * 0.4;
        const speed = 1.4 + Math.random() * 2.8;
        stateRef.current.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          color,
        });
      }
    };

    const drawSpirit = (x: number, y: number, now: number, invuln: boolean, frenzy: boolean) => {
      if (invuln && Math.floor(now / 90) % 2 === 0) return;

      ctx.save();
      ctx.translate(x, y);

      // Soft aura
      const aura = ctx.createRadialGradient(0, -14, 6, 0, -14, frenzy ? 52 : 36);
      aura.addColorStop(0, frenzy ? "rgba(255, 233, 168, 0.55)" : "rgba(246, 175, 207, 0.38)");
      aura.addColorStop(1, "rgba(246, 175, 207, 0)");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(0, -14, frenzy ? 52 : 36, 0, Math.PI * 2);
      ctx.fill();

      // Emerald fern cloak
      ctx.fillStyle = "#2E5A44";
      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.quadraticCurveTo(-22, 6, -18, 22);
      ctx.lineTo(18, 22);
      ctx.quadraticCurveTo(22, 6, 0, -16);
      ctx.fill();

      // Creamy stem face
      ctx.fillStyle = "#F7F3EF";
      ctx.beginPath();
      ctx.ellipse(0, -15, 11, 10, 0, 0, Math.PI * 2);
      ctx.fill();

      // Glowing petal-pink cap
      ctx.fillStyle = frenzy ? "#FFD700" : "#F6AFCF";
      ctx.beginPath();
      ctx.ellipse(0, -24, 26, 14, 0, Math.PI, Math.PI * 2);
      ctx.quadraticCurveTo(26, -18, 0, -18);
      ctx.quadraticCurveTo(-26, -18, -26, -24);
      ctx.fill();

      // Cap spots
      ctx.fillStyle = "#FFF7FA";
      ctx.beginPath();
      ctx.arc(-11, -28, 3, 0, Math.PI * 2);
      ctx.arc(2, -32, 3.6, 0, Math.PI * 2);
      ctx.arc(13, -27, 2.8, 0, Math.PI * 2);
      ctx.fill();

      // Golden acorn lantern held at chest
      ctx.fillStyle = "#FFE9A8";
      ctx.beginPath();
      ctx.arc(0, 2, 5.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    };

    const loop = (now: number) => {
      const s = stateRef.current;

      // Twilight PNW canvas backdrop
      const bg = ctx.createLinearGradient(0, 0, 0, H);
      bg.addColorStop(0, "#091014");
      bg.addColorStop(0.65, "#11211B");
      bg.addColorStop(1, "#0B1612");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // Subtle silhouette evergreen treeline
      ctx.fillStyle = "rgba(11, 22, 18, 0.7)";
      for (let i = 0; i < 12; i++) {
        const tx = i * 68 + 14;
        ctx.beginPath();
        ctx.moveTo(tx, H - 30);
        ctx.lineTo(tx + 24, H - 120 - (i % 3) * 28);
        ctx.lineTo(tx + 48, H - 30);
        ctx.fill();
      }

      // Mossy floor
      ctx.fillStyle = "#1E3A2D";
      ctx.fillRect(0, H - 34, W, 34);

      if (s.running) {
        const frenzy = now < s.frenzyUntil;
        if (frenzy !== frenzyActive) setFrenzyActive(frenzy);

        // Keyboard movement
        if (s.keys.left) s.targetX -= 7.5;
        if (s.keys.right) s.targetX += 7.5;
        s.targetX = Math.max(32, Math.min(W - 32, s.targetX));
        s.playerX += (s.targetX - s.playerX) * 0.22;

        // Spawn rate scales smoothly with score
        const spawnInterval = Math.max(340, 820 - s.score * 0.65);
        if (now - s.lastSpawn > spawnInterval) {
          s.lastSpawn = now;
          const roll = Math.random();
          let kind: FallingItem["kind"] = "spore";
          if (roll > 0.93) kind = "starcap";
          else if (roll > 0.73) kind = "pinecone";
          else if (roll > 0.5) kind = "chanterelle";

          const speedBoost = Math.min(2.6, s.score / 220);
          s.items.push({
            x: 36 + Math.random() * (W - 72),
            y: -20,
            vy:
              (kind === "pinecone" ? 3.2 : kind === "starcap" ? 3.6 : 2.4) +
              Math.random() * 1.1 +
              speedBoost,
            r: kind === "pinecone" ? 14 : kind === "spore" ? 10 : 13,
            kind,
            rot: Math.random() * Math.PI * 2,
            vrot: (Math.random() - 0.5) * 0.08,
          });
        }

        // Update & draw falling items
        const playerY = H - 56;
        for (let i = s.items.length - 1; i >= 0; i--) {
          const item = s.items[i];
          item.y += frenzy && item.kind === "pinecone" ? item.vy * 0.6 : item.vy;
          item.rot += item.vrot;

          // Draw item
          ctx.save();
          ctx.translate(item.x, item.y);
          ctx.rotate(item.rot);
          if (item.kind === "spore") {
            ctx.fillStyle = "#FFE9A8";
            ctx.shadowColor = "#FFE9A8";
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(0, 0, item.r * 0.7, 0, Math.PI * 2);
            ctx.fill();
          } else if (item.kind === "chanterelle") {
            ctx.fillStyle = "#F6AFCF";
            ctx.shadowColor = "#F6AFCF";
            ctx.shadowBlur = 14;
            ctx.beginPath();
            ctx.arc(0, -3, item.r, Math.PI, Math.PI * 2);
            ctx.lineTo(5, 8);
            ctx.lineTo(-5, 8);
            ctx.closePath();
            ctx.fill();
          } else if (item.kind === "starcap") {
            ctx.fillStyle = "#A9C0B0";
            ctx.shadowColor = "#FFE9A8";
            ctx.shadowBlur = 18;
            ctx.beginPath();
            ctx.arc(0, 0, item.r, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(0, 0, item.r * 0.45, 0, Math.PI * 2);
            ctx.fill();
          } else {
            // Pinecone hazard
            ctx.fillStyle = "#7D3C3C";
            ctx.strokeStyle = "#FF8B8B";
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.ellipse(0, 0, item.r * 0.8, item.r, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.stroke();
          }
          ctx.restore();

          // Collision check
          const dx = item.x - s.playerX;
          const dy = item.y - (playerY - 12);
          const dist = Math.hypot(dx, dy);
          if (dist < item.r + 25) {
            if (item.kind === "pinecone") {
              if (now > s.invulnUntil) {
                s.lives -= 1;
                s.combo = 0;
                s.invulnUntil = now + 1200;
                setLives(s.lives);
                spawnBurst(item.x, item.y, "#FF8B8B", 16);
                playChime(180, s.sfxOn, "sawtooth");
                if (s.lives <= 0) {
                  s.running = false;
                  setPhase("gameover");
                  setFrenzyActive(false);
                  setFact(
                    MYCOLOGY_FACTS[
                      Math.floor(Math.random() * MYCOLOGY_FACTS.length)
                    ]
                  );
                  setHighScore((prev) => {
                    const next = Math.max(prev, s.score);
                    try {
                      localStorage.setItem("sp_canopy_highscore", String(next));
                    } catch {
                      // ignore
                    }
                    return next;
                  });
                }
              }
            } else {
              const mult = frenzy ? 2 : 1;
              if (item.kind === "spore") {
                s.score += 10 * mult;
                spawnBurst(item.x, item.y, "#FFE9A8", 10);
                playChime(523, s.sfxOn);
              } else if (item.kind === "chanterelle") {
                s.combo += 1;
                s.score += (25 + Math.min(25, s.combo * 5)) * mult;
                spawnBurst(item.x, item.y, "#F6AFCF", 14);
                playChime(659, s.sfxOn);
              } else if (item.kind === "starcap") {
                s.score += 50 * mult;
                s.frenzyUntil = now + 5000;
                spawnBurst(item.x, item.y, "#A9C0B0", 20);
                playChime(880, s.sfxOn, "triangle");
              }
              setScore(s.score);
            }
            s.items.splice(i, 1);
            continue;
          }

          if (item.y > H + 30) {
            s.items.splice(i, 1);
          }
        }
      }

      // Draw particles
      for (let i = s.particles.length - 1; i >= 0; i--) {
        const p = s.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.032;
        if (p.life <= 0) {
          s.particles.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Draw Mushroom Spirit hero
      drawSpirit(
        s.playerX,
        H - 56,
        now,
        now < s.invulnUntil,
        now < s.frenzyUntil
      );

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [frenzyActive]);

  const handlePointer = (clientX: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * 720;
    stateRef.current.targetX = relX;
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* HUD bar */}
      <div className="flex w-full max-w-[720px] flex-wrap items-center justify-between gap-2 rounded-2xl border border-petal/25 bg-ink/80 px-4 py-2.5 text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          <span className="font-bold text-petal">Score: {score}</span>
          <span className="text-fern">Best: {Math.max(highScore, score)}</span>
          {frenzyActive && (
            <span className="rounded-full bg-petal/25 px-2.5 py-0.5 text-xs font-bold text-petal">
              ✨ 2× SPORE FRENZY
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <span aria-label={`Lives remaining: ${lives}`}>
            {"🍄".repeat(Math.max(0, lives))}
            {"🖤".repeat(Math.max(0, 3 - lives))}
          </span>
          <button
            type="button"
            onClick={() => setSfxOn((v) => !v)}
            className="rounded-full border border-white/20 px-2.5 py-1 text-xs text-cream hover:border-petal"
          >
            {sfxOn ? "🔊 SFX" : "🔇 SFX"}
          </button>
        </div>
      </div>

      {/* Playable 60fps Canvas */}
      <div className="relative w-full max-w-[720px] overflow-hidden rounded-2xl border border-petal/30 shadow-2xl">
        <canvas
          ref={canvasRef}
          onMouseMove={(e) => handlePointer(e.clientX)}
          onTouchMove={(e) => {
            if (e.touches[0]) handlePointer(e.touches[0].clientX);
          }}
          className="block aspect-[720/440] w-full touch-none select-none cursor-crosshair"
        />

        {phase !== "playing" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-ink/75 p-6 text-center backdrop-blur-sm">
            <h3 className="text-2xl font-extrabold text-cream sm:text-3xl">
              {phase === "idle"
                ? "🍄 Mushroom Spirit: Canopy Catch"
                : `Run Complete — ${score} pts!`}
            </h3>

            {phase === "gameover" && score >= 250 && (
              <div className="mt-2 rounded-full border border-petal/50 bg-petal/20 px-4 py-1 text-xs font-bold text-petal">
                🏆 San Juan Forager Badge Unlocked!
              </div>
            )}

            <p className="mt-3 max-w-md text-xs leading-relaxed text-fern sm:text-sm">
              {phase === "idle"
                ? "Move with Mouse, Touch Drag, or Arrow Keys. Catch Golden Spores (+10), Petal Chanterelles (+25), and Starlight Caps (2× Frenzy). Avoid dark pinecones!"
                : `Did you know? ${fact}`}
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={startGame}
                className="rounded-full bg-petal px-6 py-2.5 text-sm font-bold text-ink shadow-glow-petal transition hover:bg-spore"
              >
                {phase === "idle" ? "Start Foraging" : "Play Again"}
              </button>

              {phase === "gameover" && score >= 250 && (
                <Link
                  href="/store"
                  className="rounded-full border border-fern/50 bg-fern/15 px-5 py-2.5 text-sm font-semibold text-cream transition hover:border-petal"
                >
                  Wear the Canopy &rarr;
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
