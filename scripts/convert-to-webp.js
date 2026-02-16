const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directories to process
const directories = [
  'public/images/hero',
  'public/images/games',
  'public/images/tech',
  'public/blog/_featured',
];

async function convertToWebP(inputPath, outputPath, quality = 85) {
  try {
    await sharp(inputPath)
      .webp({ quality })
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`✓ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`  ${(inputSize / 1024).toFixed(1)}KB → ${(outputSize / 1024).toFixed(1)}KB (${savings}% smaller)\n`);

    return { inputSize, outputSize };
  } catch (error) {
    console.error(`✗ Failed to convert ${inputPath}:`, error.message);
    return null;
  }
}

async function processDirectory(dir) {
  const fullPath = path.join(process.cwd(), dir);

  if (!fs.existsSync(fullPath)) {
    console.log(`⊘ Directory not found: ${dir}\n`);
    return { totalInput: 0, totalOutput: 0, count: 0 };
  }

  console.log(`📁 Processing: ${dir}`);

  const files = fs.readdirSync(fullPath);
  const imageFiles = files.filter(file =>
    /\.(png|jpg|jpeg)$/i.test(file) && !file.endsWith('.webp')
  );

  let totalInput = 0;
  let totalOutput = 0;
  let converted = 0;

  for (const file of imageFiles) {
    const inputPath = path.join(fullPath, file);
    const outputPath = path.join(fullPath, file.replace(/\.(png|jpg|jpeg)$/i, '.webp'));

    // Skip if WebP already exists
    if (fs.existsSync(outputPath)) {
      console.log(`⊘ Skipping ${file} (WebP exists)\n`);
      continue;
    }

    const result = await convertToWebP(inputPath, outputPath);
    if (result) {
      totalInput += result.inputSize;
      totalOutput += result.outputSize;
      converted++;
    }
  }

  return { totalInput, totalOutput, count: converted };
}

async function main() {
  console.log('🚀 Starting image conversion to WebP\n');
  console.log('='.repeat(60) + '\n');

  let grandTotalInput = 0;
  let grandTotalOutput = 0;
  let grandTotalCount = 0;

  for (const dir of directories) {
    const { totalInput, totalOutput, count } = await processDirectory(dir);
    grandTotalInput += totalInput;
    grandTotalOutput += totalOutput;
    grandTotalCount += count;
    console.log('-'.repeat(60) + '\n');
  }

  if (grandTotalCount > 0) {
    const totalSavings = ((1 - grandTotalOutput / grandTotalInput) * 100).toFixed(1);
    console.log('📊 SUMMARY');
    console.log('='.repeat(60));
    console.log(`Total images converted: ${grandTotalCount}`);
    console.log(`Total size before: ${(grandTotalInput / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total size after: ${(grandTotalOutput / 1024 / 1024).toFixed(2)}MB`);
    console.log(`Total savings: ${((grandTotalInput - grandTotalOutput) / 1024 / 1024).toFixed(2)}MB (${totalSavings}%)`);
  } else {
    console.log('ℹ️  No images needed conversion (all already converted or directories empty)');
  }
}

main().catch(console.error);
