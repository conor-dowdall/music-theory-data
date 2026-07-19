import {
  type ChordCollectionKey,
  type NoteCollectionKey,
  noteCollections,
} from "../note-collections/mod.ts";
import type {
  ChordCollection,
  ChordCollectionClassification,
  ChordCollectionFamily,
  ChordCollectionStructure,
  ChordCollectionSymbolRendering,
} from "../../types/note-collections.ts";

export type {
  ChordCollectionClassification,
  ChordCollectionFamily,
  ChordCollectionStructure,
  ChordCollectionSymbolRendering,
  RomanNumeralCase,
} from "../../types/note-collections.ts";

const _upperCaseRomanNumerals = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
] as const;

const _chordCollectionChordSuffixes = [
  "M",
  "6",
  "M7",
  "M9",
  "add9",
  "6/9",
  "m",
  "m6",
  "m7",
  "m(M7)",
  "m9",
  "m(add9)",
  "m6/9",
  "7",
  "9",
  "11",
  "13",
  "°",
  "°7",
  "ø7",
  "+",
  "+7",
  "+M7",
] as const;

const _lowerCaseRomanNumerals = [
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
] as const;

const _upperCaseChordCollectionRomanSuffixes = [
  "",
  "+",
  "+7",
  "+M7",
  "11",
  "13",
  "6",
  "6/9",
  "7",
  "9",
  "M7",
  "M9",
  "add9",
] as const;

const _lowerCaseChordCollectionRomanSuffixes = [
  "",
  "M7",
  "m(add9)",
  "m6",
  "m6/9",
  "m7",
  "m9",
  "°",
  "°7",
  "ø7",
] as const;

const _chordCollectionFamilies = [
  "major",
  "minor",
  "dominant",
  "diminished",
  "augmented",
] as const satisfies readonly ChordCollectionFamily[];

const _chordCollectionStructures = [
  "triad",
  "seventh",
  "added-tone",
  "extended",
] as const satisfies readonly ChordCollectionStructure[];

const _triadChordCollectionKeys = [
  "major",
  "minor",
  "diminishedTriad",
  "augmentedTriad",
] as const satisfies readonly ChordCollectionKey[];

const _seventhChordCollectionKeys = [
  "major7",
  "minor7",
  "minorMajor7",
  "dominant7",
  "diminished7",
  "halfDiminished7",
  "augmented7",
  "augmentedMajor7",
] as const satisfies readonly ChordCollectionKey[];

/** A chord collection that can result from stacking two thirds. */
export type TriadChordCollectionKey =
  (typeof _triadChordCollectionKeys)[number];

/** A chord collection that can result from stacking three thirds. */
export type SeventhChordCollectionKey =
  (typeof _seventhChordCollectionKeys)[number];

/** Canonical rendered suffix for a triad chord collection. */
export type TriadChordSuffix = "M" | "m" | "°" | "+";

/** Canonical rendered suffix for a seventh-chord collection. */
export type SeventhChordSuffix =
  | "M7"
  | "m7"
  | "m(M7)"
  | "7"
  | "°7"
  | "ø7"
  | "+7"
  | "+M7";

/** Exactly seven chord identities, one for each degree of a heptatonic scale. */
export type HeptatonicChordCollectionTuple<TKey extends ChordCollectionKey> =
  readonly [TKey, TKey, TKey, TKey, TKey, TKey, TKey];

/** Canonical triad and seventh-chord identities for a parent scale. */
export interface NoteCollectionHarmony {
  readonly triads: HeptatonicChordCollectionTuple<TriadChordCollectionKey>;
  readonly sevenths: HeptatonicChordCollectionTuple<
    SeventhChordCollectionKey
  >;
}

/** An uppercase roman numeral for scale degrees one through seven. */
export type UpperCaseRomanNumeral =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII";

/** A lowercase roman numeral for scale degrees one through seven. */
export type LowerCaseRomanNumeral =
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii";

/** Any supported roman numeral scale-degree symbol. */
export type RomanNumeral = UpperCaseRomanNumeral | LowerCaseRomanNumeral;

/** A roman-numeral triad symbol using a case-compatible quality suffix. */
export type RomanTriad =
  | UpperCaseRomanNumeral
  | `${UpperCaseRomanNumeral}+`
  | LowerCaseRomanNumeral
  | `${LowerCaseRomanNumeral}°`;

/** A roman-numeral seventh-chord symbol using a case-compatible quality suffix. */
export type RomanSeventhChord =
  | `${UpperCaseRomanNumeral}${"M7" | "7" | "+7" | "+M7"}`
  | `${LowerCaseRomanNumeral}${"M7" | "m7" | "°7" | "ø7"}`;

function getChordCollectionSymbolRenderings(): Record<
  ChordCollectionKey,
  ChordCollectionSymbolRendering & {
    readonly chordSuffix: ChordCollectionChordSuffix;
    readonly romanSuffix: ChordCollectionRomanSuffix;
  }
> {
  const renderings = Object.fromEntries(
    Object.entries(noteCollections).flatMap(([key, collection]) =>
      collection.category === "chord" ? [[key, collection.symbol]] : []
    ),
  );

  for (const rendering of Object.values(renderings)) {
    if (!isChordCollectionChordSuffix(rendering.chordSuffix)) {
      throw new Error(
        `Unsupported chord collection suffix: ${rendering.chordSuffix}`,
      );
    }
    if (!isChordCollectionRomanSuffix(rendering.romanSuffix)) {
      throw new Error(
        `Unsupported chord collection Roman suffix: ${rendering.romanSuffix}`,
      );
    }
    const hasValidCaseSpecificSuffix = rendering.numeralCase === "upper"
      ? isUpperCaseChordCollectionRomanSuffix(rendering.romanSuffix)
      : isLowerCaseChordCollectionRomanSuffix(rendering.romanSuffix);
    if (!hasValidCaseSpecificSuffix) {
      throw new Error(
        `Roman suffix ${rendering.romanSuffix} is invalid for ${rendering.numeralCase}case numerals`,
      );
    }
  }

  return renderings as Record<
    ChordCollectionKey,
    ChordCollectionSymbolRendering & {
      readonly chordSuffix: ChordCollectionChordSuffix;
      readonly romanSuffix: ChordCollectionRomanSuffix;
    }
  >;
}

/** A chord-symbol suffix appended after a root note, such as `m7` in `Dm7`. */
export type ChordCollectionChordSuffix =
  (typeof _chordCollectionChordSuffixes)[number];

/** A roman-symbol suffix appended after a roman numeral, such as `ø7` in `iiø7`. */
export type ChordCollectionRomanSuffix =
  | UpperCaseChordCollectionRomanSuffix
  | LowerCaseChordCollectionRomanSuffix;

/** A Roman suffix emitted with an uppercase numeral. */
export type UpperCaseChordCollectionRomanSuffix =
  (typeof _upperCaseChordCollectionRomanSuffixes)[number];

/** A Roman suffix emitted with a lowercase numeral. */
export type LowerCaseChordCollectionRomanSuffix =
  (typeof _lowerCaseChordCollectionRomanSuffixes)[number];

/** Every chord-symbol suffix emitted by a built-in chord collection. */
export const chordCollectionChordSuffixes:
  readonly ChordCollectionChordSuffix[] = _chordCollectionChordSuffixes;

/** Every Roman suffix emitted by a built-in chord collection. */
export const chordCollectionRomanSuffixes:
  readonly ChordCollectionRomanSuffix[] = Array.from(
    new Set([
      ..._upperCaseChordCollectionRomanSuffixes,
      ..._lowerCaseChordCollectionRomanSuffixes,
    ]),
  );

/** Roman suffixes valid with uppercase numerals. */
export const upperCaseChordCollectionRomanSuffixes:
  readonly UpperCaseChordCollectionRomanSuffix[] =
    _upperCaseChordCollectionRomanSuffixes;

/** Roman suffixes valid with lowercase numerals. */
export const lowerCaseChordCollectionRomanSuffixes:
  readonly LowerCaseChordCollectionRomanSuffix[] =
    _lowerCaseChordCollectionRomanSuffixes;

/** Returns whether a runtime value is a supported chord-collection suffix. */
export function isChordCollectionChordSuffix(
  value: unknown,
): value is ChordCollectionChordSuffix {
  return typeof value === "string" &&
    (chordCollectionChordSuffixes as readonly string[]).includes(value);
}

/** Supported primary chord families in recommended display order. */
export const chordCollectionFamilies: readonly ChordCollectionFamily[] =
  _chordCollectionFamilies;

/** Supported chord structures in recommended display order. */
export const chordCollectionStructures: readonly ChordCollectionStructure[] =
  _chordCollectionStructures;

/** Returns whether a runtime value is a supported chord-collection Roman suffix. */
export function isChordCollectionRomanSuffix(
  value: unknown,
): value is ChordCollectionRomanSuffix {
  return typeof value === "string" &&
    (chordCollectionRomanSuffixes as readonly string[]).includes(value);
}

/** Returns whether a runtime value is a Roman suffix valid with uppercase numerals. */
export function isUpperCaseChordCollectionRomanSuffix(
  value: unknown,
): value is UpperCaseChordCollectionRomanSuffix {
  return typeof value === "string" &&
    (upperCaseChordCollectionRomanSuffixes as readonly string[]).includes(
      value,
    );
}

/** Returns whether a runtime value is a Roman suffix valid with lowercase numerals. */
export function isLowerCaseChordCollectionRomanSuffix(
  value: unknown,
): value is LowerCaseChordCollectionRomanSuffix {
  return typeof value === "string" &&
    (lowerCaseChordCollectionRomanSuffixes as readonly string[]).includes(
      value,
    );
}

/** Returns whether a runtime value is a supported primary chord family. */
export function isChordCollectionFamily(
  value: unknown,
): value is ChordCollectionFamily {
  return typeof value === "string" &&
    (chordCollectionFamilies as readonly string[]).includes(value);
}

/** Returns whether a runtime value is a supported chord structure. */
export function isChordCollectionStructure(
  value: unknown,
): value is ChordCollectionStructure {
  return typeof value === "string" &&
    (chordCollectionStructures as readonly string[]).includes(value);
}

/** Every built-in chord collection key in catalog order. */
export const chordCollectionKeys: readonly ChordCollectionKey[] = Object
  .entries(
    noteCollections,
  ).flatMap(([key, collection]) =>
    collection.category === "chord" ? [key as ChordCollectionKey] : []
  );

function getExpectedChordCollectionStructure(
  collection: ChordCollection,
): ChordCollectionStructure {
  const degrees = collection.intervals.map((interval) => {
    const match = interval.match(/(\d+)$/u);
    return match ? Number(match[1]) : undefined;
  });
  const hasSeventh = degrees.includes(7);
  const hasCompoundExtension = degrees.some((degree) =>
    degree !== undefined && degree > 7
  );

  if (hasSeventh && hasCompoundExtension) return "extended";
  if (hasSeventh) return "seventh";
  if (collection.intervals.length > 3) return "added-tone";
  return "triad";
}

function getChordCollectionClassifications(): Record<
  ChordCollectionKey,
  ChordCollectionClassification
> {
  return Object.fromEntries(chordCollectionKeys.map((key) => {
    const collection = noteCollections[key];
    if (collection.category !== "chord") {
      throw new Error(`Expected ${key} to identify a chord collection`);
    }

    const expectedStructure = getExpectedChordCollectionStructure(collection);
    if (collection.classification.structure !== expectedStructure) {
      throw new Error(
        `Chord collection ${key} must use structure ${expectedStructure}`,
      );
    }

    return [key, collection.classification];
  })) as Record<ChordCollectionKey, ChordCollectionClassification>;
}

/** Stable classification metadata for every built-in chord collection. */
export const chordCollectionClassifications: Readonly<
  Record<ChordCollectionKey, ChordCollectionClassification>
> = getChordCollectionClassifications();

/** Returns classification metadata for a built-in chord collection. */
export function getChordCollectionClassification(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionClassification {
  return chordCollectionClassifications[chordCollectionKey];
}

/** Musical classification criteria for filtering chord collections. */
export interface ChordCollectionClassificationFilter {
  readonly family?: ChordCollectionFamily;
  readonly structure?: ChordCollectionStructure;
}

/** Returns chord collection keys matching all supplied classification criteria. */
export function getChordCollectionKeysByClassification(
  filter: ChordCollectionClassificationFilter = {},
): readonly ChordCollectionKey[] {
  return chordCollectionKeys.filter((key) => {
    const classification = chordCollectionClassifications[key];
    return (filter.family === undefined ||
      classification.family === filter.family) &&
      (filter.structure === undefined ||
        classification.structure === filter.structure);
  });
}

/** Symbol rendering metadata for every built-in chord collection. */
export const chordCollectionSymbolRenderings: Record<
  ChordCollectionKey,
  ChordCollectionSymbolRendering & {
    readonly chordSuffix: ChordCollectionChordSuffix;
    readonly romanSuffix: ChordCollectionRomanSuffix;
  }
> = getChordCollectionSymbolRenderings();

/** Built-in chord collections that represent triads. */
export const triadChordCollectionKeys: readonly TriadChordCollectionKey[] =
  _triadChordCollectionKeys;

/** Built-in chord collections that represent seventh chords. */
export const seventhChordCollectionKeys: readonly SeventhChordCollectionKey[] =
  _seventhChordCollectionKeys;

function validateStructuralChordCollectionKeys(
  structure: "triad" | "seventh",
  expectedKeys: readonly ChordCollectionKey[],
): void {
  const classifiedKeys = chordCollectionKeys.filter((key) =>
    chordCollectionClassifications[key].structure === structure
  );
  if (
    classifiedKeys.length !== expectedKeys.length ||
    classifiedKeys.some((key) => !expectedKeys.includes(key))
  ) {
    throw new Error(
      `${structure} chord collection keys must match chord classifications`,
    );
  }
}

validateStructuralChordCollectionKeys("triad", triadChordCollectionKeys);
validateStructuralChordCollectionKeys("seventh", seventhChordCollectionKeys);

/** Returns whether a chord collection key represents a triad. */
export function isTriadChordCollectionKey(
  value: unknown,
): value is TriadChordCollectionKey {
  return typeof value === "string" &&
    (triadChordCollectionKeys as readonly string[]).includes(value);
}

/** Returns whether a chord collection key represents a seventh chord. */
export function isSeventhChordCollectionKey(
  value: unknown,
): value is SeventhChordCollectionKey {
  return typeof value === "string" &&
    (seventhChordCollectionKeys as readonly string[]).includes(value);
}

const _supportedHarmonyParentKeys = [
  "ionian",
  "harmonicMinor",
  "melodicMinor",
] as const satisfies readonly NoteCollectionKey[];

/** A parent scale whose tertian harmony is supported by the package. */
export type SupportedHarmonyParentKey =
  (typeof _supportedHarmonyParentKeys)[number];

/** Parent scales whose tertian harmony is supported. */
export const supportedHarmonyParentKeys: readonly SupportedHarmonyParentKey[] =
  _supportedHarmonyParentKeys;

/** Returns whether a note collection key identifies a supported harmony parent. */
export function isSupportedHarmonyParentKey(
  key: unknown,
): key is SupportedHarmonyParentKey {
  return typeof key === "string" &&
    (supportedHarmonyParentKeys as readonly string[]).includes(key);
}

function getTertianChordSignature(
  scaleIntegers: readonly number[],
  rootIndex: number,
  chordToneCount: 3 | 4,
): readonly number[] {
  const rootInteger = scaleIntegers[rootIndex];
  if (rootInteger === undefined) {
    throw new Error(`Missing scale degree ${rootIndex}`);
  }

  return Array.from({ length: chordToneCount }, (_, chordToneIndex) => {
    const scalePosition = rootIndex + chordToneIndex * 2;
    const scaleInteger = scaleIntegers[scalePosition % scaleIntegers.length];
    if (scaleInteger === undefined) {
      throw new Error(`Missing scale position ${scalePosition}`);
    }
    const octaveOffset = Math.floor(scalePosition / scaleIntegers.length) * 12;
    return scaleInteger + octaveOffset - rootInteger;
  });
}

function compileTertianChordCollections<
  TKey extends TriadChordCollectionKey | SeventhChordCollectionKey,
>(
  scaleKey: NoteCollectionKey,
  candidateKeys: readonly TKey[],
  chordToneCount: 3 | 4,
): HeptatonicChordCollectionTuple<TKey> {
  const scale = noteCollections[scaleKey];
  if (scale.category !== "scale" || scale.integers.length !== 7) {
    throw new Error(
      `Harmony collection ${scaleKey} must be a seven-note scale`,
    );
  }

  const compiled = Array.from({ length: 7 }, (_, rootIndex) => {
    const signature = getTertianChordSignature(
      scale.integers,
      rootIndex,
      chordToneCount,
    );
    const matches = candidateKeys.filter((candidateKey) => {
      const candidate = noteCollections[candidateKey];
      return candidate.integers.length === signature.length &&
        candidate.integers.every((integer, index) =>
          integer === signature[index]
        );
    });

    if (matches.length !== 1) {
      throw new Error(
        `Expected one ${chordToneCount}-tone chord match for ${scaleKey} degree ${
          rootIndex + 1
        }; found ${matches.length}`,
      );
    }
    return matches[0];
  });

  return compiled as unknown as HeptatonicChordCollectionTuple<TKey>;
}

function compileNoteCollectionHarmony(
  parentKey: SupportedHarmonyParentKey,
): NoteCollectionHarmony {
  return {
    triads: compileTertianChordCollections(
      parentKey,
      triadChordCollectionKeys,
      3,
    ),
    sevenths: compileTertianChordCollections(
      parentKey,
      seventhChordCollectionKeys,
      4,
    ),
  };
}

/** Canonical compiled harmony for each explicitly supported parent scale. */
export const noteCollectionHarmonyByParentKey: Readonly<
  Record<SupportedHarmonyParentKey, NoteCollectionHarmony>
> = Object.fromEntries(
  supportedHarmonyParentKeys.map((parentKey) => [
    parentKey,
    compileNoteCollectionHarmony(parentKey),
  ]),
) as Record<SupportedHarmonyParentKey, NoteCollectionHarmony>;

function rotateHarmonyKeys<TKey extends ChordCollectionKey>(
  keys: HeptatonicChordCollectionTuple<TKey>,
  rotation: number,
): readonly TKey[] {
  const normalizedRotation = ((rotation % keys.length) + keys.length) %
    keys.length;
  return [
    ...keys.slice(normalizedRotation),
    ...keys.slice(0, normalizedRotation),
  ];
}

function validateSupportedModeHarmony(): void {
  for (const [rawKey, collection] of Object.entries(noteCollections)) {
    if (
      collection.category !== "scale" || collection.rotation === undefined ||
      !isSupportedHarmonyParentKey(collection.rotatedScale)
    ) continue;

    const key = rawKey as NoteCollectionKey;
    if (
      !Number.isInteger(collection.rotation) || collection.rotation < 0 ||
      collection.rotation >= 7
    ) {
      throw new Error(
        `Mode ${key} must use an integer rotation from 0 through 6`,
      );
    }
    if (key === collection.rotatedScale && collection.rotation !== 0) {
      throw new Error(`Harmony parent ${key} must use rotation 0`);
    }
    const parentHarmony = noteCollectionHarmonyByParentKey[
      collection.rotatedScale
    ];
    const compiledTriads = compileTertianChordCollections(
      key,
      triadChordCollectionKeys,
      3,
    );
    const compiledSevenths = compileTertianChordCollections(
      key,
      seventhChordCollectionKeys,
      4,
    );
    const rotatedTriads = rotateHarmonyKeys(
      parentHarmony.triads,
      collection.rotation,
    );
    const rotatedSevenths = rotateHarmonyKeys(
      parentHarmony.sevenths,
      collection.rotation,
    );

    if (
      compiledTriads.some((chordKey, index) =>
        chordKey !== rotatedTriads[index]
      ) || compiledSevenths.some((chordKey, index) =>
        chordKey !== rotatedSevenths[index]
      )
    ) {
      throw new Error(
        `Mode ${key} harmony does not match ${collection.rotatedScale} rotation ${collection.rotation}`,
      );
    }
  }
}

validateSupportedModeHarmony();

/** An array mapping 7 index scale degrees to their corresponding upper-case Roman numerals. */
export const upperCaseRomanNumerals: readonly UpperCaseRomanNumeral[] =
  _upperCaseRomanNumerals;

/** An array mapping 7 index scale degrees to their corresponding lower-case Roman numerals. */
export const lowerCaseRomanNumerals: readonly LowerCaseRomanNumeral[] =
  _lowerCaseRomanNumerals;

/** Returns symbol rendering metadata for a chord collection. */
export function getChordCollectionSymbolRendering(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionSymbolRendering & {
  readonly chordSuffix: ChordCollectionChordSuffix;
  readonly romanSuffix: ChordCollectionRomanSuffix;
} {
  return chordCollectionSymbolRenderings[chordCollectionKey];
}

/** Returns the chord-symbol suffix for a chord collection. */
export function getChordCollectionChordSuffix(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionChordSuffix {
  return getChordCollectionSymbolRendering(chordCollectionKey).chordSuffix;
}

/** Returns the roman-symbol suffix for a chord collection. */
export function getChordCollectionRomanSuffix(
  chordCollectionKey: ChordCollectionKey,
): ChordCollectionRomanSuffix {
  return getChordCollectionSymbolRendering(chordCollectionKey).romanSuffix;
}
