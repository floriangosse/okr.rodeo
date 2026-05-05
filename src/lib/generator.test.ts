import { describe, expect, test } from "vitest";
import { buzzwordTails, metricObjects, verbPhrases } from "../data/phrases";
import { GeneratedKR, generateKR, krFromId } from "./generator";

describe("generator", () => {
  test("generateKR returns a GeneratedKR with non-empty text and krId", () => {
    const result = generateKR();
    expect(result.text.length).toBeGreaterThan(0);
    expect(result.krId.length).toBeGreaterThan(0);
  });

  test("generateKR text starts with a verb phrase and ends with a buzzword tail", () => {
    for (let i = 0; i < 50; i++) {
      const result = generateKR();
      const hasVerb = verbPhrases.some((v) => result.text.startsWith(v.text));
      const hasMetric = metricObjects.some((m) => result.text.includes(m.text));
      const hasTail = buzzwordTails.some((t) => result.text.endsWith(t.text));
      expect(hasVerb).toBe(true);
      expect(hasMetric).toBe(true);
      expect(hasTail).toBe(true);
    }
  });

  test("generateKR krId has format verbId.metricId.tailId", () => {
    for (let i = 0; i < 20; i++) {
      const result = generateKR();
      const parts = result.krId.split(".");
      expect(parts.length).toBe(3);
      expect(verbPhrases.some((v) => v.id === parts[0])).toBe(true);
      expect(metricObjects.some((m) => m.id === parts[1])).toBe(true);
      expect(buzzwordTails.some((t) => t.id === parts[2])).toBe(true);
    }
  });

  test("krFromId reconstructs a GeneratedKR from a valid krId", () => {
    const original = generateKR();
    const reconstructed = krFromId(original.krId);
    expect(reconstructed).not.toBeNull();
    expect(reconstructed!.text).toBe(original.text);
    expect(reconstructed!.krId).toBe(original.krId);
  });

  test("krFromId returns null for invalid input", () => {
    expect(krFromId(null)).toBeNull();
    expect(krFromId("")).toBeNull();
    expect(krFromId(undefined)).toBeNull();
    expect(krFromId("only.two")).toBeNull();
    expect(krFromId("bad.ids.here")).toBeNull();
  });
});
