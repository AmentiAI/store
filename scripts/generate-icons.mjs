import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, "public", "thrift-sharks-logo.png");
const BG = { r: 0, g: 0, b: 0, alpha: 1 };

async function squareLogo(size, paddingRatio = 0.08) {
  const pad = Math.round(size * paddingRatio);
  const inner = Math.max(1, size - pad * 2);

  const fitted = await sharp(SOURCE)
    .rotate()
    .resize(inner, inner, {
      fit: "contain",
      background: BG,
      kernel: sharp.kernel.lanczos3,
    })
    .png()
    .toBuffer();

  return sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: BG,
    },
  })
    .composite([{ input: fitted, gravity: "centre" }])
    .png({ compressionLevel: 9 })
    .toBuffer();
}

function pngsToIco(images) {
  const count = images.length;
  const headerSize = 6 + 16 * count;
  let offset = headerSize;
  const entries = [];
  const payloads = [];

  for (const { size, png } of images) {
    entries.push({ size, png, offset, bytes: png.length });
    offset += png.length;
    payloads.push(png);
  }

  const buf = Buffer.alloc(offset);
  buf.writeUInt16LE(0, 0);
  buf.writeUInt16LE(1, 2);
  buf.writeUInt16LE(count, 4);

  entries.forEach((entry, i) => {
    const o = 6 + i * 16;
    buf.writeUInt8(entry.size === 256 ? 0 : entry.size, o);
    buf.writeUInt8(entry.size === 256 ? 0 : entry.size, o + 1);
    buf.writeUInt8(0, o + 2);
    buf.writeUInt8(0, o + 3);
    buf.writeUInt16LE(1, o + 4);
    buf.writeUInt16LE(32, o + 6);
    buf.writeUInt32LE(entry.bytes, o + 8);
    buf.writeUInt32LE(entry.offset, o + 12);
  });

  let cursor = headerSize;
  for (const png of payloads) {
    png.copy(buf, cursor);
    cursor += png.length;
  }

  return buf;
}

async function writePng(filePath, size, padding) {
  const png = await squareLogo(size, padding);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, png);
  const meta = await sharp(png).metadata();
  console.log(
    `${path.relative(ROOT, filePath)}  ${meta.width}x${meta.height}  ${meta.format}  ${png.length} bytes`,
  );
  return png;
}

const meta = await sharp(SOURCE).metadata();
console.log(
  `source: ${meta.width}x${meta.height} format=${meta.format} space=${meta.space}`,
);

const appDir = path.join(ROOT, "src", "app");
const publicDir = path.join(ROOT, "public");

const png16 = await writePng(path.join(publicDir, "favicon-16x16.png"), 16, 0.06);
const png32 = await writePng(path.join(publicDir, "favicon-32x32.png"), 32, 0.06);
const png48 = await writePng(path.join(publicDir, "favicon-48x48.png"), 48, 0.06);
await writePng(path.join(publicDir, "apple-touch-icon.png"), 180, 0.08);
await writePng(path.join(publicDir, "apple-touch-icon-precomposed.png"), 180, 0.08);
await writePng(path.join(publicDir, "apple-touch-icon-180x180.png"), 180, 0.08);
await writePng(path.join(publicDir, "android-chrome-192x192.png"), 192, 0.08);
await writePng(path.join(publicDir, "android-chrome-512x512.png"), 512, 0.08);
await writePng(path.join(publicDir, "mstile-150x150.png"), 150, 0.08);

await writePng(path.join(appDir, "icon.png"), 32, 0.06);
await writePng(path.join(appDir, "icon1.png"), 192, 0.08);
await writePng(path.join(appDir, "apple-icon.png"), 180, 0.08);

const ico = pngsToIco([
  { size: 16, png: png16 },
  { size: 32, png: png32 },
  { size: 48, png: png48 },
]);

await writeFile(path.join(appDir, "favicon.ico"), ico);
await writeFile(path.join(publicDir, "favicon.ico"), ico);
console.log(`src/app/favicon.ico  ico  ${ico.length} bytes`);
console.log(`public/favicon.ico  ico  ${ico.length} bytes`);
