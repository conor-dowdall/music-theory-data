import {
  chordProgressionBarGroups,
  chordProgressionCategoryGroups,
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import { getChordCollectionChordSuffix } from "../data/chords/mod.ts";
import type {
  ChordProgression,
  ChordProgressionAnalysisRomanSymbol,
  ChordProgressionCategoryKey,
  ChordProgressionChord,
  ChordProgressionRomanAccidental,
  ChordProgressionRomanSymbol,
} from "../types/chord-progressions.d.ts";
import type { RootNote } from "../data/labels/note-labels.ts";
import type { ChordCollectionKey } from "../data/note-collections/mod.ts";
import {
  getNoteNamesForRootAndIntervals,
  normalizeRootNoteString,
} from "./note-names.ts";
import { getRomanNumeralForScaleIndexAndChordCollectionKey } from "./chords.ts";

/** A resolved chord in a progression, including its root and note-collection key. */
export interface ChordProgressionChordReference {
  readonly rootNote: RootNote;
  readonly chordName: string;
  readonly noteCollectionKey: ChordCollectionKey;
}

interface ResolvedChordProgressionChordReference {
  readonly chord: ChordProgressionChord;
  readonly reference: ChordProgressionChordReference;
}

const BAR_DURATION_EPSILON = 0.000000001;
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
  chordRootNote: RootNote,
): ChordProgressionChordReference {
  return {
    rootNote: chordRootNote,
    chordName: chordRootNote +
      getChordCollectionChordSuffix(chord.chordCollectionKey),
    noteCollectionKey: chord.chordCollectionKey,
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
  ).map((noteName) => normalizeRootNoteString(noteName));

  return progression.chords.flatMap((chord, index) => {
    const chordRootNote = chordRootNotes[index];
    if (!chordRootNote) return [];

    return [{
      chord,
      reference: createChordProgressionChordReference(chord, chordRootNote),
    }];
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

/** Returns the spelled chord names for a progression in the requested root. */
export function getChordProgressionChordNames(
  rootNote: RootNote,
  progressionOrKey: ChordProgression | ChordProgressionKey,
): string[] {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) return [];

  const noteNames = getNoteNamesForRootAndIntervals(
    rootNote,
    progression.chords.map((chord) => chord.degree),
  );

  return progression.chords.map((chord, index) =>
    noteNames[index] + getChordCollectionChordSuffix(chord.chordCollectionKey)
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

/**
 * Returns Roman symbols suitable for display, preferring optional
 * harmonic-function analysis labels when present.
 */
export function getChordProgressionDisplayRomanSymbols(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionAnalysisRomanSymbol[] {
  return getChordProgressionRomanSymbols(progressionOrKey);
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
  return getResolvedChordProgressionChordReferences(
    rootNote,
    progressionOrKey,
  ).map(({ reference }) => reference);
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
      `${reference.rootNote}:${reference.noteCollectionKey}:${reference.chordName}`;
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
  const bars: ChordProgressionChordReference[][] = [];
  let currentBar: ChordProgressionChordReference[] = [];
  let remainingBarDuration = 1;

  const pushCurrentBar = () => {
    if (currentBar.length > 0) {
      bars.push(currentBar);
    }

    currentBar = [];
    remainingBarDuration = 1;
  };

  for (
    const { chord, reference } of getResolvedChordProgressionChordReferences(
      rootNote,
      progressionOrKey,
    )
  ) {
    let remainingChordDuration = chord.durationInBars;

    if (
      !Number.isFinite(remainingChordDuration) ||
      remainingChordDuration <= BAR_DURATION_EPSILON
    ) {
      continue;
    }

    while (remainingChordDuration > BAR_DURATION_EPSILON) {
      currentBar.push(reference);

      const filledDuration = Math.min(
        remainingChordDuration,
        remainingBarDuration,
      );

      remainingChordDuration -= filledDuration;
      remainingBarDuration -= filledDuration;

      if (remainingBarDuration <= BAR_DURATION_EPSILON) {
        pushCurrentBar();
      }
    }
  }

  pushCurrentBar();

  return bars;
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
