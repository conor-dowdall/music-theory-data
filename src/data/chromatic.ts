/** The number of pitch classes in 12-tone equal-tempered chromatic space. */
export const CHROMATIC_NOTE_COUNT = 12 as const;

/** A zero-indexed chromatic pitch-class or relative degree slot. */
export type ChromaticIndex =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11;

/** How a chromatic index should be interpreted. */
export type ChromaticMode = "absolute" | "relative";

/** A fixed 12-slot tuple indexed by chromatic pitch class or relative degree. */
export type ChromaticTuple<T> = readonly [
  T,
  T,
  T,
  T,
  T,
  T,
  T,
  T,
  T,
  T,
  T,
  T,
];

/** The ordered set of all valid chromatic indexes from C/root through B/7. */
export const CHROMATIC_INDEXES: ChromaticTuple<ChromaticIndex> = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
] as const;

/** A variable-length set of chromatic indexes, such as the pitch classes in a scale or dyad. */
export type ChromaticIndexSet = readonly ChromaticIndex[];
