import {
  CHROMATIC_NOTE_COUNT,
  type ChromaticIndex,
  type ChromaticTuple,
} from "../data/chromatic.ts";

export function isChromaticIndex(value: number): value is ChromaticIndex {
  return Number.isInteger(value) && value >= 0 && value < CHROMATIC_NOTE_COUNT;
}

export function normalizeChromaticIndex(value: number): ChromaticIndex {
  if (!Number.isFinite(value)) {
    throw new Error(`Chromatic index must be finite. Received ${value}.`);
  }

  if (!Number.isInteger(value)) {
    throw new Error(`Chromatic index must be an integer. Received ${value}.`);
  }

  const integer = value;
  return (
    (integer % CHROMATIC_NOTE_COUNT + CHROMATIC_NOTE_COUNT) %
    CHROMATIC_NOTE_COUNT
  ) as ChromaticIndex;
}

export function isChromaticTuple<T>(
  values: readonly T[],
): values is ChromaticTuple<T> {
  return values.length === CHROMATIC_NOTE_COUNT;
}

export function createChromaticTuple<T>(
  values: readonly T[],
): ChromaticTuple<T> {
  if (!isChromaticTuple(values)) {
    throw new Error(
      `Expected ${CHROMATIC_NOTE_COUNT} chromatic values. Received ${values.length}.`,
    );
  }

  return [...values] as unknown as ChromaticTuple<T>;
}
