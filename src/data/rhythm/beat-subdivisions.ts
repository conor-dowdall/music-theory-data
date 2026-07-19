/** A stable identity for dividing one abstract beat into equal steps. */
export type BeatSubdivisionKey =
  | "1-per-beat"
  | "2-per-beat"
  | "3-per-beat"
  | "4-per-beat"
  | "5-per-beat"
  | "6-per-beat"
  | "7-per-beat"
  | "8-per-beat";

/** The supported number of equal steps in one abstract beat. */
export type BeatSubdivisionCount = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** Exact relative duration of one equal beat-subdivision step. */
export interface BeatSubdivisionStep {
  readonly numerator: 1;
  readonly denominator: BeatSubdivisionCount;
}

/** A meter-neutral division of one abstract beat into equal steps. */
export interface BeatSubdivision {
  readonly key: BeatSubdivisionKey;
  readonly countPerBeat: BeatSubdivisionCount;
  readonly step: BeatSubdivisionStep;
}

/** Canonical equal subdivisions of one abstract beat. */
export const beatSubdivisions: Readonly<
  Record<BeatSubdivisionKey, BeatSubdivision>
> = {
  "1-per-beat": {
    key: "1-per-beat",
    countPerBeat: 1,
    step: { numerator: 1, denominator: 1 },
  },
  "2-per-beat": {
    key: "2-per-beat",
    countPerBeat: 2,
    step: { numerator: 1, denominator: 2 },
  },
  "3-per-beat": {
    key: "3-per-beat",
    countPerBeat: 3,
    step: { numerator: 1, denominator: 3 },
  },
  "4-per-beat": {
    key: "4-per-beat",
    countPerBeat: 4,
    step: { numerator: 1, denominator: 4 },
  },
  "5-per-beat": {
    key: "5-per-beat",
    countPerBeat: 5,
    step: { numerator: 1, denominator: 5 },
  },
  "6-per-beat": {
    key: "6-per-beat",
    countPerBeat: 6,
    step: { numerator: 1, denominator: 6 },
  },
  "7-per-beat": {
    key: "7-per-beat",
    countPerBeat: 7,
    step: { numerator: 1, denominator: 7 },
  },
  "8-per-beat": {
    key: "8-per-beat",
    countPerBeat: 8,
    step: { numerator: 1, denominator: 8 },
  },
};

/** Ordered keys for the supported equal beat subdivisions. */
export const beatSubdivisionKeys: readonly BeatSubdivisionKey[] = Object.keys(
  beatSubdivisions,
) as BeatSubdivisionKey[];

/** Returns whether a value is a supported equal beat-subdivision key. */
export function isBeatSubdivisionKey(
  value: unknown,
): value is BeatSubdivisionKey {
  return typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(beatSubdivisions, value);
}

/** Returns the number of equal steps per abstract beat. */
export function getBeatSubdivisionCount(
  key: BeatSubdivisionKey,
): BeatSubdivisionCount {
  return beatSubdivisions[key].countPerBeat;
}

/** Returns the exact relative duration of one subdivision step. */
export function getBeatSubdivisionStep(
  key: BeatSubdivisionKey,
): BeatSubdivisionStep {
  return beatSubdivisions[key].step;
}
