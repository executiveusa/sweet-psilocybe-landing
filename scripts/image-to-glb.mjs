#!/usr/bin/env node
/**
 * Repeatable Studio Factory Script: Image -> Textured 3D GLB
 *
 * Converts a clean studio concept image (e.g. assets-src/concepts/mushroom-spirit-front.jpg)
 * into a runtime .glb mesh under public/models/ using Tripo3D API (TRIPO_API_KEY)
 * or fal.ai Hunyuan3D / Trellis (FAL_KEY).
 *
 * Usage:
 *   TRIPO_API_KEY=tsk_... node scripts/image-to-glb.mjs assets-src/concepts/mushroom-spirit-front.jpg public/models/mushroom-spirit.glb
 */

import fs from "node:fs";
import path from "node:path";

const [inputPath, outputPath] = process.argv.slice(2);

if (!inputPath || !outputPath) {
  console.error(
    "Usage: node scripts/image-to-glb.mjs <input-image> <output.glb>"
  );
  process.exit(1);
}

if (!fs.existsSync(inputPath)) {
  console.error(`Input image not found: ${inputPath}`);
  process.exit(1);
}

const tripoKey = process.env.TRIPO_API_KEY;
const falKey = process.env.FAL_KEY;

if (!tripoKey && !falKey) {
  console.error(
    "Missing TRIPO_API_KEY or FAL_KEY in environment. Add either key to run autonomous Image-to-3D."
  );
  process.exit(1);
}

async function runTripo(imgFile, outFile) {
  const form = new FormData();
  const bytes = fs.readFileSync(imgFile);
  form.append("file", new Blob([bytes]), path.basename(imgFile));

  const uploadRes = await fetch("https://api.tripo3d.ai/v2/openapi/upload", {
    method: "POST",
    headers: { Authorization: `Bearer ${tripoKey}` },
    body: form,
  });
  const uploadJson = await uploadRes.json();
  const imageToken = uploadJson?.data?.image_token;
  if (!imageToken) {
    throw new Error(`Tripo upload failed: ${JSON.stringify(uploadJson)}`);
  }

  const taskRes = await fetch("https://api.tripo3d.ai/v2/openapi/task", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tripoKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      type: "image_to_model",
      file: { type: "jpg", file_token: imageToken },
    }),
  });
  const taskJson = await taskRes.json();
  const taskId = taskJson?.data?.task_id;
  if (!taskId) {
    throw new Error(`Tripo task creation failed: ${JSON.stringify(taskJson)}`);
  }

  console.log(`Tripo3D task started: ${taskId}`);
  for (let i = 0; i < 60; i++) {
    await new Promise((r) => setTimeout(r, 4000));
    const pollRes = await fetch(
      `https://api.tripo3d.ai/v2/openapi/task/${taskId}`,
      { headers: { Authorization: `Bearer ${tripoKey}` } }
    );
    const pollJson = await pollRes.json();
    const status = pollJson?.data?.status;
    console.log(`Status [${i + 1}/60]: ${status}`);
    if (status === "success") {
      const modelUrl =
        pollJson.data.output?.pbr_model || pollJson.data.output?.model;
      if (!modelUrl) throw new Error("No GLB URL in Tripo output");
      const glbRes = await fetch(modelUrl);
      const glbBuf = Buffer.from(await glbRes.arrayBuffer());
      fs.mkdirSync(path.dirname(outFile), { recursive: true });
      fs.writeFileSync(outFile, glbBuf);
      console.log(
        `✅ Saved ${(glbBuf.length / 1024).toFixed(1)} KB GLB -> ${outFile}`
      );
      return;
    }
    if (status === "failed" || status === "cancelled") {
      throw new Error(`Tripo task ${status}`);
    }
  }
  throw new Error("Tripo task timed out");
}

async function runFal(imgFile, outFile) {
  const bytes = fs.readFileSync(imgFile);
  const dataUri = `data:image/jpeg;base64,${bytes.toString("base64")}`;
  const res = await fetch("https://fal.run/fal-ai/trellis", {
    method: "POST",
    headers: {
      Authorization: `Key ${falKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ image_url: dataUri }),
  });
  const json = await res.json();
  const modelUrl = json?.model_mesh?.url;
  if (!modelUrl) {
    throw new Error(`fal.ai Trellis failed: ${JSON.stringify(json)}`);
  }
  const glbRes = await fetch(modelUrl);
  const glbBuf = Buffer.from(await glbRes.arrayBuffer());
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, glbBuf);
  console.log(
    `✅ Saved ${(glbBuf.length / 1024).toFixed(1)} KB GLB -> ${outFile}`
  );
}

async function main() {
  const preferFal = process.argv.includes("--fal");
  if (preferFal && falKey) {
    await runFal(inputPath, outputPath);
    return;
  }
  if (tripoKey) {
    try {
      await runTripo(inputPath, outputPath);
      return;
    } catch (err) {
      if (falKey) {
        console.warn(`⚠️ Tripo failed (${err.message}); falling back to fal.ai Trellis...`);
        await runFal(inputPath, outputPath);
        return;
      }
      throw err;
    }
  }
  await runFal(inputPath, outputPath);
}

main().catch((err) => {
  console.error("❌ image-to-glb failed:", err.message);
  process.exit(1);
});
