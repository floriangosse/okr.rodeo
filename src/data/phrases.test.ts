import { describe, expect, test } from "vitest";
import { buzzwordTails, metricObjects, verbPhrases } from "./phrases";

describe("phrases", () => {
  test("each list has at least 15 items", () => {
    expect(verbPhrases.length).toBeGreaterThanOrEqual(15);
    expect(metricObjects.length).toBeGreaterThanOrEqual(15);
    expect(buzzwordTails.length).toBeGreaterThanOrEqual(15);
  });

  test("all items are non-empty strings", () => {
    [...verbPhrases, ...metricObjects, ...buzzwordTails].forEach((item) => {
      expect(typeof item).toBe("string");
      expect(item.trim().length).toBeGreaterThan(0);
    });
  });
});
