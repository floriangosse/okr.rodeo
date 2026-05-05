import { buzzwordTails, metricObjects, verbPhrases } from "../data/phrases";

function pick(list: readonly string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

export function generateKR(): string {
  return `${pick(verbPhrases)} ${pick(metricObjects)} ${pick(buzzwordTails)}`;
}

export function encodeKR(kr: string): string {
  return btoa(encodeURIComponent(kr));
}

export function decodeKR(encoded: string | null | undefined): string | null {
  if (!encoded) return null;
  try {
    return decodeURIComponent(atob(encoded));
  } catch {
    return null;
  }
}
