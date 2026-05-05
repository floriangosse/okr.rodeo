import { customAlphabet } from "nanoid";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const gen = customAlphabet(ALPHABET, 3);

const filePath = resolve("src/data/phrases.ts");
const source = readFileSync(filePath, "utf-8");

const used = new Set<string>();
const updated = source.replace(/id: "[^"]+"/g, () => {
  let id: string;
  do { id = gen(); } while (used.has(id));
  used.add(id);
  return `id: "${id}"`;
});

writeFileSync(filePath, updated, "utf-8");
console.log(`Done — ${used.size} phrase IDs regenerated.`);
