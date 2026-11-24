// The One-Line Exit (Node 22, standard library only).
//
// The entry is a single-line resignation letter: the company fire warden
// quits, effective immediately, because after three years of fire drills
// he has finally found the exit. This program carries that line to the
// house: it loads LINE.txt from the repository root, runs it through a
// checklist of small rules, and writes it to /output/entry.txt, where the
// judge reads it.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const MAX_CHARS = 140;

type Problem = { rule: string; detail: string };

function loadLetter(): string {
  const path = join(BOT_DIR, "LINE.txt");
  if (!existsSync(path)) {
    throw new Error("LINE.txt is missing from the repository root");
  }
  // The file ends with a single newline; strip it so the letter itself is
  // exactly one line with no trailing blank line.
  return readFileSync(path, "utf8").replace(/\r?\n$/, "");
}

function checkLetter(text: string): Problem[] {
  const problems: Problem[] = [];
  if (text.length < 1 || text.length > MAX_CHARS) {
    problems.push({
      rule: "length",
      detail: `letter must be 1 to ${MAX_CHARS} characters, got ${text.length}`,
    });
  }
  if (text.trim().length === 0) {
    problems.push({ rule: "blank", detail: "letter must not be only white space" });
  }
  if (/[\r\n]/.test(text)) {
    problems.push({ rule: "one-line", detail: "letter must be a single line" });
  }
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(text)) {
    problems.push({ rule: "clean-text", detail: "letter must not contain control characters" });
  }
  if (text !== text.trim()) {
    problems.push({ rule: "no-padding", detail: "letter must not start or end with white space" });
  }
  if (!/[.!?]$/.test(text)) {
    problems.push({ rule: "letter-ending", detail: "letter must end with terminal punctuation" });
  }
  return problems;
}

function publish(text: string): void {
  const target = join(OUTPUT_DIR, "entry.txt");
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(target, text);
  const roundTrip = readFileSync(target, "utf8");
  if (roundTrip !== text) {
    throw new Error("round-trip check failed: output bytes differ from LINE.txt");
  }
}

const letter = loadLetter();
const problems = checkLetter(letter);
if (problems.length > 0) {
  for (const p of problems) {
    console.error(`rejected [${p.rule}]: ${p.detail}`);
  }
  process.exit(1);
}
publish(letter);
// The leaderboard tie-break counts bytes, so log both measures.
const bytes = Buffer.byteLength(letter, "utf8");
console.log(`resignation letter (${letter.length} chars, ${bytes} bytes): ${letter}`);
