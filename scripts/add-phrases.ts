import { customAlphabet } from "nanoid";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const ALPHABET = "0123456789abcdefghijklmnopqrstuvwxyz";
const gen = customAlphabet(ALPHABET, 3);

interface PhraseEntry {
  id: string;
  text: string;
}

interface ToAddFile {
  verbPhrases: string[];
  metricObjects: string[];
  buzzwordTails: string[];
}

const dataDir = resolve("src/data");

function loadJson<T>(path: string): T {
  return JSON.parse(readFileSync(path, "utf-8")) as T;
}

function saveJson(path: string, data: unknown): void {
  writeFileSync(path, JSON.stringify(data, null, 2) + "\n", "utf-8");
}

function genUniqueId(existing: Set<string>): string {
  let id: string;
  do {
    id = gen();
  } while (existing.has(id));
  return id;
}

const toAddPath = resolve(dataDir, "phrases-to-add.json");
const toAdd = loadJson<ToAddFile>(toAddPath);

const categories: Array<{ key: keyof ToAddFile; file: string }> = [
  { key: "verbPhrases", file: "verb-phrases.json" },
  { key: "metricObjects", file: "metric-objects.json" },
  { key: "buzzwordTails", file: "buzzword-tails.json" },
];

let totalAdded = 0;

for (const { key, file } of categories) {
  const texts = toAdd[key];
  if (!texts?.length) continue;

  const filePath = resolve(dataDir, file);
  const phrases = loadJson<PhraseEntry[]>(filePath);
  const existingIds = new Set(phrases.map((p) => p.id));

  for (const text of texts) {
    const id = genUniqueId(existingIds);
    existingIds.add(id);
    phrases.push({ id, text });
    totalAdded++;
  }

  saveJson(filePath, phrases);
  toAdd[key] = [];
}

saveJson(toAddPath, toAdd);
console.log(`Added ${totalAdded} phrases.`);
