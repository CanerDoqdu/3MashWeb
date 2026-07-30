import fs from "node:fs";

const xml = fs.readFileSync("tmp/products.xml", "utf8");
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const skip = /(@3mashsocial|facebook|instagram|linkedin|pay\.ikas|fonts\.)/i;
const videoRe =
  /(https?:\\?\/\\?\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be|vimeo\.com)[^"' <>)]+|https?:\\?\/\\?\/[^"' <>)]+\.(?:mp4|webm|ogg)(?:\?[^"' <>)]+)?)/gi;

const normalize = (value) =>
  value
    .replace(/\\\//g, "/")
    .replace(/\\u0026/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/\\u003d/g, "=")
    .replace(/\\u003f/g, "?");

const rows = [];

for (const url of urls) {
  const html = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } })
    .then((response) => response.text())
    .catch(() => "");
  const decoded = normalize(html);
  const videos = [...decoded.matchAll(videoRe)]
    .map((match) => normalize(match[1]))
    .filter((videoUrl) => !skip.test(videoUrl));
  const uniqueVideos = [...new Set(videos)];
  const slug = new URL(url).pathname.slice(1);
  const row = { slug, url, videos: uniqueVideos };
  rows.push(row);
  console.log(JSON.stringify(row));
  await new Promise((resolve) => setTimeout(resolve, 150));
}

fs.writeFileSync("tmp/product-videos.json", `${JSON.stringify(rows, null, 2)}\n`);
