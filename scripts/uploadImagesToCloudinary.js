/**
 * Script: uploadImagesToCloudinary.js
 * ------------------------------------
 * Uploads all images from frontend/images to Cloudinary under
 * the folder "sunrise-school/gallery".
 * 
 * Run from the /backend directory:
 *   node scripts/uploadImagesToCloudinary.js
 */

const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

// Load environment variables from backend .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Path to the images folder (relative to this script)
const imagesDir = path.join(__dirname, '..', '..', 'frontend', 'images');

async function uploadImages() {
  console.log('🚀 Starting Cloudinary upload...\n');
  console.log(`📁 Source folder: ${imagesDir}\n`);

  // Check if images directory exists
  if (!fs.existsSync(imagesDir)) {
    console.error('❌ Images directory not found:', imagesDir);
    process.exit(1);
  }

  // Get all image files
  const files = fs.readdirSync(imagesDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext);
  });

  if (files.length === 0) {
    console.log('⚠️  No image files found in the directory.');
    process.exit(0);
  }

  console.log(`📸 Found ${files.length} image(s) to upload.\n`);
  console.log('='.repeat(60));

  const results = [];
  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = path.join(imagesDir, file);

    // Create a clean public_id from the filename (no extension, no spaces)
    const publicId = `sunrise-school/gallery/${path.basename(file, path.extname(file)).replace(/\s+/g, '_')}`;

    try {
      process.stdout.write(`[${i + 1}/${files.length}] Uploading: ${file} ... `);

      const result = await cloudinary.uploader.upload(filePath, {
        public_id: publicId,
        folder: 'sunrise-school/gallery',
        resource_type: 'image',
        overwrite: true,
        quality: 'auto',
        fetch_format: 'auto',
      });

      successCount++;
      results.push({
        file,
        url: result.secure_url,
        public_id: result.public_id,
      });

      console.log('✅ Done');
      console.log(`   URL: ${result.secure_url}`);
    } catch (error) {
      failCount++;
      console.log('❌ Failed');
      console.error(`   Error: ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n✅ Upload complete! ${successCount} succeeded, ${failCount} failed.\n`);

  if (results.length > 0) {
    // Save results to a JSON file for easy reference
    const outputPath = path.join(__dirname, 'cloudinary_upload_results.json');
    fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
    console.log(`📄 Results saved to: ${outputPath}`);
    console.log('\n📋 All uploaded URLs:\n');
    results.forEach((r, idx) => {
      console.log(`${idx + 1}. ${r.url}`);
    });
  }
}

uploadImages().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
