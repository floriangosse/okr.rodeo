import { buzzwordTails, metricObjects, verbPhrases } from "../data/phrases";
import type { Phrase } from "../data/phrases";

export interface GeneratedKR {
  text: string;
  krId: string;
}

function pick(list: readonly Phrase[]): Phrase {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateKR(): GeneratedKR {
  const v = pick(verbPhrases);
  const m = pick(metricObjects);
  const t = pick(buzzwordTails);
  return {
    text: `${v.text} ${m.text} ${t.text}`,
    krId: `${v.id}.${m.id}.${t.id}`,
  };
}

export function krFromId(
  krId: string | null | undefined,
): GeneratedKR | null {
  if (!krId) return null;
  const parts = krId.split(".");
  if (parts.length !== 3) return null;
  const [vId, mId, tId] = parts;
  const v = verbPhrases.find((p) => p.id === vId);
  const m = metricObjects.find((p) => p.id === mId);
  const t = buzzwordTails.find((p) => p.id === tId);
  if (!v || !m || !t) return null;
  return {
    text: `${v.text} ${m.text} ${t.text}`,
    krId,
  };
}
