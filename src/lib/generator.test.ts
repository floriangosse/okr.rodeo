import { describe, expect, test } from "vitest";
import { buzzwordTails, verbPhrases } from "../data/phrases";
import { decodeKR, encodeKR, generateKR } from "./generator";

describe("generator", () => {
  test("generateKR returns a non-empty string", () => {
    const result = generateKR();
    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
  });

  test("generateKR result starts with a verb phrase and ends with a buzzword tail", () => {
    for (let i = 0; i < 50; i++) {
      const result = generateKR();
      const hasVerb = verbPhrases.some((v) => result.startsWith(v));
      const hasTail = buzzwordTails.some((t) => result.endsWith(t));
      expect(hasVerb).toBe(true);
      expect(hasTail).toBe(true);
    }
  });

  test("encodeKR and decodeKR are inverse operations", () => {
    const kr = "Scale developer velocity by 2x across all verticals";
    expect(decodeKR(encodeKR(kr))).toBe(kr);
  });

  test("decodeKR returns null for invalid input", () => {
    expect(decodeKR(null)).toBeNull();
    expect(decodeKR("")).toBeNull();
    expect(decodeKR(undefined)).toBeNull();
  });
});
