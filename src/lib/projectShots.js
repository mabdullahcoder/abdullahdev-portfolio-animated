import { readdirSync } from "node:fs";
import path from "node:path";

const SHOTS_DIR = path.join(process.cwd(), "public", "images", "projects");
const IMAGE_FILE = /\.(avif|webp|png|jpe?g)$/i;

/**
 * Server-only. Finds project screenshots in `public/images/projects/`, keyed by file name
 * without extension (which must match the project's `id`, e.g. `lumen.png` → "lumen").
 * Runs during prerender, so in production a new screenshot appears on the next build;
 * in development, on the next page refresh.
 */
export function getProjectShots() {
  let files = [];
  try {
    files = readdirSync(SHOTS_DIR);
  } catch {
    return {};
  }
  return Object.fromEntries(
    files
      .filter((file) => IMAGE_FILE.test(file))
      .map((file) => [file.replace(IMAGE_FILE, "").toLowerCase(), `/images/projects/${file}`]),
  );
}
