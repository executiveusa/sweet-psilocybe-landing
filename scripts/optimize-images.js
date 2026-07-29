const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const imagesDir = path.join(__dirname, "../public/images");

// Supported input formats
const supportedFormats = [".jpg", ".jpeg", ".png"];

async function convertToWebP() {
  try {
    const files = fs.readdirSync(imagesDir);

    for (const file of files) {
      const filePath = path.join(imagesDir, file);
      const ext = path.extname(file).toLowerCase();

      if (supportedFormats.includes(ext)) {
        const basename = path.basename(file, ext);
        const webpPath = path.join(imagesDir, `${basename}.webp`);

        console.log(`Converting ${file} to WebP...`);

        // Convert to WebP with high quality
        await sharp(filePath)
          .webp({
            quality: 85,
            effort: 6, // Maximum compression effort
          })
          .toFile(webpPath);

        console.log(`✅ Converted ${file} to ${basename}.webp`);

        // Calculate size reduction
        const originalSize = fs.statSync(filePath).size;
        const webpSize = fs.statSync(webpPath).size;
        const reduction = (
          ((originalSize - webpSize) / originalSize) *
          100
        ).toFixed(1);

        console.log(
          `📊 Size reduction: ${reduction}% (${(originalSize / 1024).toFixed(
            1
          )}KB → ${(webpSize / 1024).toFixed(1)}KB)`
        );
      }
    }

    console.log("\n🎉 Image optimization complete!");
    console.log("💡 Next steps:");
    console.log("1. Update image references in components to use .webp files");
    console.log("2. Remove original .jpg/.png files after testing");
    console.log("3. Verify all images display correctly");
  } catch (error) {
    console.error("❌ Error converting images:", error);
  }
}

convertToWebP();
