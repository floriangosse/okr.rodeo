import verbPhrasesRaw from "./verb-phrases.json";
import metricObjectsRaw from "./metric-objects.json";
import buzzwordTailsRaw from "./buzzword-tails.json";

export interface Phrase {
  id: string;
  text: string;
}

function validate(data: unknown, listName: string): readonly Phrase[] {
  if (!Array.isArray(data)) throw new Error(`${listName}: expected array`);
  return data.map((item: unknown, i: number) => {
    if (typeof item !== "object" || item === null)
      throw new Error(`${listName}[${i}]: expected object`);
    const { id, text } = item as Record<string, unknown>;
    if (typeof id !== "string" || !/^[a-z0-9]{3}$/.test(id))
      throw new Error(`${listName}[${i}]: invalid id "${String(id)}"`);
    if (typeof text !== "string" || text.trim() === "")
      throw new Error(`${listName}[${i}]: invalid text`);
    return { id, text };
  });
}

export const verbPhrases: readonly Phrase[] = validate(
  verbPhrasesRaw,
  "verbPhrases",
);
export const metricObjects: readonly Phrase[] = validate(
  metricObjectsRaw,
  "metricObjects",
);
export const buzzwordTails: readonly Phrase[] = validate(
  buzzwordTailsRaw,
  "buzzwordTails",
);
