import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

function createCRC32Table() {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[i] = c >>> 0;
  }
  return table;
}

const crcTable = createCRC32Table();

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(4 + 4 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const typeAndData = buf.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  buf.writeUInt32BE(crc, 8 + len);
  return buf;
}

// Distance from point (px, py) to segment (x1, y1)-(x2, y2)
function distToSegment(px, py, x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - x1, py - y1);
  const t = Math.max(0, Math.min(1, ((px - x1) * dx + (py - y1) * dy) / lenSq));
  const projX = x1 + t * dx;
  const projY = y1 + t * dy;
  return Math.hypot(px - projX, py - projY);
}

// SDF for rotated rounded rectangle (capsule/pill)
function sdfRotatedCapsule(px, py, cx, cy, angleDeg, halfW, halfH, radius) {
  const rad = (angleDeg * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const dx = px - cx;
  const dy = py - cy;
  const lx = Math.abs(dx * cos + dy * sin);
  const ly = Math.abs(-dx * sin + dy * cos);

  const qx = Math.max(lx - (halfW - radius), 0);
  const qy = Math.max(ly - (halfH - radius), 0);
  return Math.hypot(qx, qy) - radius;
}

function generatePng(width, height, isMaskable = false) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8-bit depth
  ihdrData[9] = 6; // RGBA
  ihdrData[10] = 0;
  ihdrData[11] = 0;
  ihdrData[12] = 0;
  const ihdr = makeChunk('IHDR', ihdrData);

  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(rowSize * height);

  // Geometry coordinate scaling from 512 base canvas
  // Base coordinates:
  // Center hub: (235, 260)
  // Left arm: (98, 228), radius: 25
  // Upper right arm: (420, 180), radius: 25
  // Neck: (210, 195), radius: 25
  // Bottom right leg: (338, 416), radius: 26
  // Top dot: center (203, 138), rot -22 deg, w 34, h 52, r 17
  // Bottom-left dot: center (204, 365), rot -30 deg, w 52, h 34, r 17

  // Scaling factor for target width/height
  const scale = (width / 512) * (isMaskable ? 0.72 : 0.88);
  const targetCx = width / 2;
  const targetCy = height / 2;
  const baseCx = 245;
  const baseCy = 265;

  const toX = (bx) => targetCx + (bx - baseCx) * scale;
  const toY = (by) => targetCy + (by - baseCy) * scale;
  const toR = (r) => r * scale;

  // Segments in target space
  const hubX = toX(235);
  const hubY = toY(260);

  const armLeft = [hubX, hubY, toX(98), toY(228), toR(25)];
  const armRight = [hubX, hubY, toX(420), toY(180), toR(25)];
  const armNeck = [hubX, hubY, toX(210), toY(195), toR(25)];
  const legBottom = [hubX, hubY, toX(338), toY(416), toR(26)];

  // Dots
  const dotTop = {
    cx: toX(203),
    cy: toY(138),
    angle: -22,
    hw: toR(17),
    hh: toR(26),
    r: toR(17)
  };

  const dotBottom = {
    cx: toX(204),
    cy: toY(365),
    angle: -30,
    hw: toR(26),
    hh: toR(17),
    r: toR(17)
  };

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter None

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;

      // Calculate minimal SDF distance to emblem parts
      const d1 = distToSegment(x, y, armLeft[0], armLeft[1], armLeft[2], armLeft[3]) - armLeft[4];
      const d2 = distToSegment(x, y, armRight[0], armRight[1], armRight[2], armRight[3]) - armRight[4];
      const d3 = distToSegment(x, y, armNeck[0], armNeck[1], armNeck[2], armNeck[3]) - armNeck[4];
      const d4 = distToSegment(x, y, legBottom[0], legBottom[1], legBottom[2], legBottom[3]) - legBottom[4];

      const dDot1 = sdfRotatedCapsule(x, y, dotTop.cx, dotTop.cy, dotTop.angle, dotTop.hw, dotTop.hh, dotTop.r);
      const dDot2 = sdfRotatedCapsule(x, y, dotBottom.cx, dotBottom.cy, dotBottom.angle, dotBottom.hw, dotBottom.hh, dotBottom.r);

      const minSdf = Math.min(d1, d2, d3, d4, dDot1, dDot2);

      // Antialiasing transition within 1.2px
      const coverage = Math.max(0, Math.min(1, 0.5 - minSdf / 1.2));

      // Background: #000000 pure black
      // Foreground: #FFFFFF pure white
      const colorVal = Math.round(coverage * 255);

      rawData[pxOffset] = colorVal;
      rawData[pxOffset + 1] = colorVal;
      rawData[pxOffset + 2] = colorVal;
      rawData[pxOffset + 3] = 255; // fully opaque
    }
  }

  const deflated = zlib.deflateSync(rawData);
  const idat = makeChunk('IDAT', deflated);
  const iend = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

const publicDir = path.resolve('public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), generatePng(192, 192, false));
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), generatePng(512, 512, false));
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), generatePng(180, 180, false));
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), generatePng(512, 512, true));
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), generatePng(64, 64, false));

console.log('Successfully generated all PWA icons and favicons from professional logo.');
