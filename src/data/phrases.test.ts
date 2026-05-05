import { describe, expect, test } from "vitest";
import { buzzwordTails, metricObjects, verbPhrases } from "./phrases";

describe("phrases", () => {
  test("each list has exactly 100 items", () => {
    expect(verbPhrases.length).toBe(100);
    expect(metricObjects.length).toBe(100);
    expect(buzzwordTails.length).toBe(100);
  });

  test("all items have non-empty id and text", () => {
    [...verbPhrases, ...metricObjects, ...buzzwordTails].forEach((phrase) => {
      expect(phrase.id.trim().length).toBeGreaterThan(0);
      expect(phrase.text.trim().length).toBeGreaterThan(0);
    });
  });

  test("all IDs are unique within each list", () => {
    const checkUnique = (list: readonly { id: string }[], _name: string) => {
      const ids = list.map((p) => p.id);
      const unique = new Set(ids);
      expect(unique.size).toBe(ids.length);
    };
    checkUnique(verbPhrases, "verbPhrases");
    checkUnique(metricObjects, "metricObjects");
    checkUnique(buzzwordTails, "buzzwordTails");
  });

  test("all IDs are 3-character alphanumeric strings", () => {
    [...verbPhrases, ...metricObjects, ...buzzwordTails].forEach((phrase) => {
      expect(phrase.id).toMatch(/^[A-Za-z0-9]{3}$/);
    });
  });
});
