import { mkdirSync, renameSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const comment =
  "LGTM. It works today, and today is doing a lot of heavy lifting in that sentence.";

// Mirror the gate: UTF-8 text, 1-140 characters, single line, not only white space.
const chars = [...comment].length;
if (chars < 1 || chars > 140 || /[\r\n]/.test(comment) || comment.trim() === "") {
  throw new Error(`entry fails the gate: ${chars} chars`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const tmp = join(outDir, ".entry.txt.tmp");
writeFileSync(tmp, comment, "utf8");
renameSync(tmp, join(outDir, "entry.txt"));
