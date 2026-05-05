import { nanoid } from "nanoid";
import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

const filePath = resolve("src/data/phrases.ts");
const source = readFileSync(filePath, "utf-8");

// Replace every id: "..." string with a fresh nanoid(8)
const updated = source.replace(/id: "[^"]+"/g, () => `id: "${nanoid(8)}"`);

writeFileSync(filePath, updated, "utf-8");
console.log("Done — phrase IDs regenerated.");
