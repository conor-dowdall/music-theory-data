import {
  chordProgressionBarGroups,
  chordProgressionCategoryGroups,
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import { getChordCollectionChordSuffix } from "../data/chords/mod.ts";
import { noteNameToIntegerMap } from "../data/labels/note-labels.ts";
import type {
  ChordProgression,
  ChordProgressionAnalysisRomanSymbol,
  ChordProgressionCategoryKey,
  ChordProgressionChord,
  ChordProgressionRomanAccidental,
  ChordProgressionRomanSymbol,
} from "../types/chord-progressions.ts";
import type { NoteName, RootNote } from "../data/labels/note-labels.ts";
import type { ChromaticIndex } from "../data/chromatic.ts";
import type { ChordCollectionKey } from "../data/note-collections/mod.ts";
import {
  getNoteNamesForRootAndIntervals,
  resolvePracticalRootNote,
} from "./note-names.ts";
import { getRomanNumeralForScaleIndexAndChordCollectionKey } from "./chords.ts";

/** A resolved chord in a progression, including its root and chord collection. */
export interface ChordProgressionChordReference {
  /**
   * The spelled root note for the resolved chord.
   * This is a `NoteName`, not necessarily the narrower `RootNote`; theoretically
   * correct transpositions may produce double accidentals.
   */
  readonly rootNote: NoteName;
  /** A supported playable/editable root with the same pitch class as `rootNote`. */
  readonly practicalRootNote: RootNote;
  /** The definitive chromatic pitch class shared by both root spellings. */
  readonly pitchClass: ChromaticIndex;
  /** The rendered chord name, combining root note and chord suffix. */
  readonly chordName: string;
  /** The chord collection key that supplies the chord quality. */
  readonly chordCollectionKey: ChordCollectionKey;
}

/** One authored progression event with all root, analysis, and timing data resolved. */
export interface ResolvedChordProgressionEvent {
  /** Zero-based position in the authored `progression.chords` array. */
  readonly eventIndex: number;
  /** The original authored chord event. */
  readonly chord: ChordProgressionChord;
  /** The chord resolved for the requested tonic. */
  readonly reference: ChordProgressionChordReference;
  /** The tonic-relative symbol derived directly from degree and chord quality. */
  readonly directRomanSymbol: ChordProgressionRomanSymbol;
  /** The display/analysis symbol, preferring authored functional analysis. */
  readonly romanSymbol: ChordProgressionAnalysisRomanSymbol;
  /** Absolute event start measured from the beginning of the progression. */
  readonly startInBars: number;
  /** Authored duration, measured in meter-neutral bars. */
  readonly durationInBars: number;
}

/** A bar-relative grouping of resolved progression events. */
export interface ChordProgressionBar {
  /** Zero-based bar position in the resolved progression. */
  readonly barIndex: number;
  /** Absolute start of this bar in the progression. */
  readonly startInBars: number;
  /** One full bar, except when the progression ends with a partial bar. */
  readonly durationInBars: number;
  /**
   * Resolved event indexes that overlap this bar, in authored order.
   * An event lasting multiple bars therefore appears in multiple bar groups.
   */
  readonly eventIndexes: readonly number[];
}

/** A canonical, duration-aware realization of an authored chord progression. */
export interface ResolvedChordProgression {
  /** Ordered events preserving every authored chord relationship by index. */
  readonly events: readonly ResolvedChordProgressionEvent[];
  /** Events grouped by each bar they overlap. */
  readonly bars: readonly ChordProgressionBar[];
  /** Sum of all authored event durations. */
  readonly totalDurationInBars: number;
  /** Smallest equal bar subdivision that represents every event duration. */
  readonly requiredBarDivision: number;
}

interface ResolvedChordProgressionChordReference {
  readonly chord: ChordProgressionChord;
  readonly reference: ChordProgressionChordReference;
}

const BAR_DURATION_EPSILON = 0.000000001;
const MAX_REQUIRED_BAR_DIVISION = 1_000_000;
const DIATONIC_SCALE_DEGREES = 7;
const INTERVAL_LABEL_REGEX = /^(𝄫|♭|♮|♯|𝄪)?(\d+)$/;

/** Returns whether a string is one of the built-in chord progression keys. */
export function isValidChordProgressionKey(
  key: string,
): key is ChordProgressionKey {
  return Object.prototype.hasOwnProperty.call(chordProgressions, key);
}

function resolveProgression(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgression | undefined {
  if (typeof progressionOrKey !== "string") return progressionOrKey;
  return chordProgressions[progressionOrKey];
}

function createChordProgressionChordReference(
  chord: ChordProgressionChord,
  chordRootNote: NoteName,
): ChordProgressionChordReference {
  const pitchClass = noteNameToIntegerMap.get(chordRootNote);
  if (pitchClass === undefined) {
    throw new Error(
      `No chromatic index mapping for note name: ${chordRootNote}`,
    );
  }

  return {
    rootNote: chordRootNote,
    practicalRootNote: resolvePracticalRootNote(chordRootNote),
    pitchClass,
    chordName: chordRootNote +
      getChordCollectionChordSuffix(chord.chordCollectionKey),
    chordCollectionKey: chord.chordCollectionKey,
  };
}

function getResolvedChordProgressionChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ResolvedChordProgressionChordReference[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  const chordRootNotes = getNoteNamesForRootAndIntervals(
    rootNote,
    progression.chords.map((chord) => chord.degree),
  );

  return progression.chords.map((chord, index) => {
    const chordRootNote = chordRootNotes[index];
    if (!chordRootNote) {
      throw new Error(`Unable to resolve chord root for event ${index}`);
    }

    return {
      chord,
      reference: createChordProgressionChordReference(chord, chordRootNote),
    };
  });
}

function greatestCommonDivisor(left: number, right: number): number {
  let a = Math.abs(left);
  let b = Math.abs(right);

  while (b > 0) {
    const next = a % b;
    a = b;
    b = next;
  }

  return a || 1;
}

function leastCommonMultiple(left: number, right: number): number {
  const result = (left / greatestCommonDivisor(left, right)) * right;
  if (!Number.isSafeInteger(result)) {
    throw new Error("Chord progression requires an unsafe bar division");
  }
  return result;
}

function getSimpleFractionDenominator(value: number): number {
  let previousNumerator = 0;
  let numerator = 1;
  let previousDenominator = 1;
  let denominator = 0;
  let remainderValue = value;

  for (let iteration = 0; iteration < 64; iteration += 1) {
    const whole = Math.floor(remainderValue);
    const nextNumerator = whole * numerator + previousNumerator;
    const nextDenominator = whole * denominator + previousDenominator;

    if (nextDenominator > MAX_REQUIRED_BAR_DIVISION) break;

    if (
      Math.abs(value - nextNumerator / nextDenominator) <=
        BAR_DURATION_EPSILON
    ) {
      return nextDenominator;
    }

    previousNumerator = numerator;
    numerator = nextNumerator;
    previousDenominator = denominator;
    denominator = nextDenominator;

    const fractionalRemainder = remainderValue - whole;
    if (fractionalRemainder <= Number.EPSILON) break;
    remainderValue = 1 / fractionalRemainder;
  }

  throw new Error(
    `Chord duration cannot be represented with a practical bar division: ${value}`,
  );
}

function createResolvedChordProgressionBars(
  events: readonly ResolvedChordProgressionEvent[],
  totalDurationInBars: number,
): ChordProgressionBar[] {
  const barCount = Math.ceil(totalDurationInBars - BAR_DURATION_EPSILON);

  return Array.from({ length: barCount }, (_, barIndex) => {
    const startInBars = barIndex;
    const endInBars = Math.min(barIndex + 1, totalDurationInBars);

    return {
      barIndex,
      startInBars,
      durationInBars: endInBars - startInBars,
      eventIndexes: events.flatMap((event) => {
        const eventEndInBars = event.startInBars + event.durationInBars;
        const startsBeforeBarEnds = event.startInBars <
          endInBars - BAR_DURATION_EPSILON;
        const endsAfterBarStarts = eventEndInBars >
          startInBars + BAR_DURATION_EPSILON;
        const overlapsBar = startsBeforeBarEnds && endsAfterBarStarts;
        return overlapsBar ? [event.eventIndex] : [];
      }),
    };
  });
}

function getRomanAccidentalForIntervalLabel(
  accidental: string | undefined,
): ChordProgressionRomanAccidental {
  switch (accidental) {
    case undefined:
    case "":
    case "♮":
      return "";
    case "𝄫":
    case "♭":
    case "♯":
    case "𝄪":
      return accidental;
    default:
      throw new Error(`Invalid chord degree accidental: ${accidental}`);
  }
}

/** Returns the direct tonic-relative Roman symbol for a progression chord. */
export function getChordProgressionChordDirectRomanSymbol(
  chord: ChordProgressionChord,
): ChordProgressionRomanSymbol {
  const match = chord.degree.match(INTERVAL_LABEL_REGEX);
  if (!match) {
    throw new Error(`Invalid chord degree: ${chord.degree}`);
  }

  const [, rawAccidental, degreeLabel] = match;
  const degree = Number(degreeLabel);
  if (!Number.isInteger(degree) || degree < 1) {
    throw new Error(`Invalid chord degree: ${chord.degree}`);
  }

  const scaleIndex = (degree - 1) % DIATONIC_SCALE_DEGREES;
  const romanSymbol = getRomanNumeralForScaleIndexAndChordCollectionKey(
    scaleIndex,
    chord.chordCollectionKey,
  );

  if (romanSymbol === undefined) {
    throw new Error(
      `Unhandled chord collection: ${chord.chordCollectionKey}`,
    );
  }

  const accidental = getRomanAccidentalForIntervalLabel(rawAccidental);
  return `${accidental}${romanSymbol}` as ChordProgressionRomanSymbol;
}

/**
 * Resolves a progression into one canonical event timeline for the requested
 * tonic. The result keeps authored chords, concrete chord references, Roman
 * analysis, and meter-neutral timing together instead of in parallel arrays.
 */
export function resolveChordProgression(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ResolvedChordProgression {
  let startInBars = 0;
  let requiredBarDivision = 1;

  const events = getResolvedChordProgressionChordReferences(
    rootNote,
    progressionOrKey,
  ).map(({ chord, reference }, eventIndex) => {
    if (
      !Number.isFinite(chord.durationInBars) ||
      chord.durationInBars <= BAR_DURATION_EPSILON
    ) {
      throw new Error(
        `Invalid duration for chord progression event ${eventIndex}: ${chord.durationInBars}`,
      );
    }

    requiredBarDivision = leastCommonMultiple(
      requiredBarDivision,
      getSimpleFractionDenominator(chord.durationInBars),
    );

    const directRomanSymbol = getChordProgressionChordDirectRomanSymbol(chord);
    const event: ResolvedChordProgressionEvent = {
      eventIndex,
      chord,
      reference,
      directRomanSymbol,
      romanSymbol: chord.analysis?.romanSymbol ?? directRomanSymbol,
      startInBars,
      durationInBars: chord.durationInBars,
    };
    startInBars += chord.durationInBars;
    return event;
  });

  return {
    events,
    bars: createResolvedChordProgressionBars(events, startInBars),
    totalDurationInBars: startInBars,
    requiredBarDivision,
  };
}

/** Returns the spelled chord names for a progression in the requested root. */
export function getChordProgressionChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return resolveChordProgression(rootNote, progressionOrKey).events.map(
    ({ reference }) => reference.chordName,
  );
}

/**
 * Returns direct tonic-relative Roman symbols derived from each chord's
 * `degree` and `chordCollectionKey`.
 */
export function getChordProgressionDirectRomanSymbols(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionRomanSymbol[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return progression.chords.map((chord) =>
    getChordProgressionChordDirectRomanSymbol(chord)
  );
}

/**
 * Returns Roman symbols suitable for theory display, preferring optional
 * harmonic-function analysis labels when present.
 */
export function getChordProgressionRomanSymbols(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionAnalysisRomanSymbol[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  return progression.chords.map((chord) =>
    chord.analysis?.romanSymbol ?? getChordProgressionChordDirectRomanSymbol(
      chord,
    )
  );
}

/** Returns all built-in chord progression keys with the requested total bar count. */
export function getChordProgressionKeysForTotalBars(
  totalBars: number,
): ChordProgressionKey[] {
  return chordProgressionBarGroups.find((group) =>
    group.totalBars === totalBars
  )
    ?.progressionKeys.slice() ?? [];
}

/** Returns all built-in chord progression keys in the requested musical category. */
export function getChordProgressionKeysForCategory(
  category: ChordProgressionCategoryKey,
): ChordProgressionKey[] {
  return chordProgressionCategoryGroups.find((group) =>
    group.category === category
  )
    ?.progressionKeys.slice() ?? [];
}

/** Returns each distinct chord name in a progression, preserving first-seen order. */
export function getChordProgressionUniqueChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  return Array.from(
    new Set(getChordProgressionChordNames(rootNote, progressionOrKey)),
  );
}

/**
 * Returns one chord reference for each authored chord entry in
 * `progression.chords`.
 *
 * This is the "chord changes" view: a chord lasting 2 bars is returned once,
 * because it is one chord entry/change, while repeated entries are preserved.
 */
export function getChordProgressionChordChangeReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  return resolveChordProgression(rootNote, progressionOrKey).events.map(
    ({ reference }) => reference,
  );
}

/**
 * Returns each distinct chord reference once, preserving first-seen order from
 * the chord-change list.
 */
export function getChordProgressionUniqueChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  const uniqueReferences: ChordProgressionChordReference[] = [];
  const seen = new Set<string>();

  for (
    const reference of getChordProgressionChordChangeReferences(
      rootNote,
      progressionOrKey,
    )
  ) {
    const key =
      `${reference.rootNote}:${reference.chordCollectionKey}:${reference.chordName}`;
    if (seen.has(key)) continue;
    seen.add(key);
    uniqueReferences.push(reference);
  }

  return uniqueReferences;
}

/**
 * Returns duration-aware chord references grouped by bar.
 *
 * Each outer array item is one bar. A 2-bar chord appears in two bar entries,
 * and a split bar can contain multiple chord references in order.
 */
export function getChordProgressionChordReferencesByBar(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[][] {
  const resolved = resolveChordProgression(rootNote, progressionOrKey);
  return resolved.bars.map((bar) =>
    bar.eventIndexes.map((eventIndex) => resolved.events[eventIndex]!.reference)
  );
}

/**
 * Returns duration-aware chord references in song/practice order.
 *
 * This flattens `getChordProgressionChordReferencesByBar`, so a 2-bar chord
 * appears twice and split bars preserve their left-to-right order.
 */
export function getChordProgressionSongChordReferences(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionChordReference[] {
  return getChordProgressionChordReferencesByBar(
    rootNote,
    progressionOrKey,
  ).flat();
}

/** Returns the sum of authored chord durations in bars for a progression. */
export function getChordProgressionTotalDurationInBars(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): number {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return 0;

  return progression.chords.reduce(
    (total, chord) => total + chord.durationInBars,
    0,
  );
}
