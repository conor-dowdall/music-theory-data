import {
  chordProgressionBarGroups,
  chordProgressionCategoryGroups,
  chordProgressionCategoryKeys,
  type ChordProgressionKey,
  chordProgressions,
} from "../data/chord-progressions/mod.ts";
import {
  chordCollectionKeys,
  getChordCollectionChordSuffix,
  lowerCaseRomanNumerals,
  upperCaseRomanNumerals,
} from "../data/chords/mod.ts";
import { noteLabelCollections } from "../data/labels/note-label-collections.ts";
import { noteNameToIntegerMap } from "../data/labels/note-labels.ts";
import type {
  ChordProgression,
  ChordProgressionAnalysisRomanSymbol,
  ChordProgressionCategoryKey,
  ChordProgressionChord,
  ChordProgressionChords,
  ChordProgressionDefinition,
  ChordProgressionRomanAccidental,
  ChordProgressionRomanSymbol,
  ChordProgressionSecondaryRomanSymbol,
  ChordRootDegree,
} from "../types/chord-progressions.ts";
import type { NoteName, RootNote } from "../data/labels/note-labels.ts";
import type { ChromaticIndex } from "../data/chromatic.ts";
import {
  type ChordCollectionKey,
  noteCollections,
} from "../data/note-collections/mod.ts";
import {
  getNoteNamesForRootAndIntervals,
  resolvePracticalRootNote,
} from "./note-names.ts";
import { getRomanNumeralForScaleIndexAndChordCollectionKey } from "./chords.ts";
import { normalizeAccidentalString } from "./accidentals.ts";

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

/** The portion of one authored event that overlaps one progression bar. */
export interface ChordProgressionBarSegment {
  /** Zero-based position in the authored `progression.chords` array. */
  readonly eventIndex: number;
  /** Zero-based bar containing this segment. */
  readonly barIndex: number;
  /** Segment start relative to the beginning of its bar. */
  readonly offsetInBar: number;
  /** Length of this bar-bounded segment. */
  readonly durationInBars: number;
  /** Whether the same authored event began in an earlier bar. */
  readonly continuesFromPreviousBar: boolean;
  /** Whether the same authored event continues beyond this bar. */
  readonly continuesIntoNextBar: boolean;
}

/** A bar-relative grouping of progression event segments. */
export interface ChordProgressionBar {
  /** Zero-based bar position in the resolved progression. */
  readonly barIndex: number;
  /** Absolute start of this bar in the progression. */
  readonly startInBars: number;
  /** One full bar, except when the progression ends with a partial bar. */
  readonly durationInBars: number;
  /** Bar-bounded portions of authored events, in progression order. */
  readonly segments: readonly ChordProgressionBarSegment[];
}

/** Root-independent timing derived from an authored chord progression. */
export interface ChordProgressionTiming {
  /** Events grouped by each bar they overlap. */
  readonly bars: readonly ChordProgressionBar[];
  /** Total duration represented by the normalized bar subdivision. */
  readonly totalDurationInBars: number;
  /** Smallest equal bar subdivision that represents every event duration. */
  readonly requiredBarDivision: number;
  /** Whether the progression ends exactly at a whole-bar boundary. */
  readonly endsOnBarBoundary: boolean;
}

/** A canonical, duration-aware realization of an authored chord progression. */
export interface ResolvedChordProgression extends ChordProgressionTiming {
  /** Ordered events preserving every authored chord relationship by index. */
  readonly events: readonly ResolvedChordProgressionEvent[];
}

/** A successful runtime parse or the diagnostics that prevented parsing. */
export type ParseResult<T, TIssue = ChordProgressionIssue> =
  | { readonly success: true; readonly value: T }
  | { readonly success: false; readonly issues: readonly TIssue[] };

/** A progression-level structural or event issue. */
export type ChordProgressionIssue =
  | {
    readonly code: "invalid-progression" | "empty-progression";
    readonly message: string;
  }
  | {
    readonly code:
      | "invalid-chord"
      | "invalid-degree"
      | "invalid-chord-collection-key"
      | "invalid-duration"
      | "invalid-analysis"
      | "unrepresentable-duration"
      | "timeline-too-large";
    readonly chordIndex: number;
    readonly message: string;
  };

/** A catalog-definition issue, including any nested progression issue. */
export type ChordProgressionDefinitionIssue =
  | ChordProgressionIssue
  | {
    readonly code: "invalid-definition" | "invalid-name" | "invalid-category";
    readonly message: string;
  };

interface ResolvedChordProgressionChordReference {
  readonly chord: ChordProgressionChord;
  readonly reference: ChordProgressionChordReference;
}

interface CompiledChordProgressionTiming {
  readonly eventStartsInBars: readonly number[];
  readonly timing: ChordProgressionTiming;
}

interface ChordProgressionDurationInput {
  readonly chordIndex: number;
  readonly durationInBars: unknown;
}

interface CompiledChordProgressionDurationTimeline {
  readonly eventDurationsInDivisions: readonly number[];
  readonly eventStartsInDivisions: readonly number[];
  readonly totalDurationInDivisions: number;
  readonly requiredBarDivision: number;
}

type ChordProgressionDurationTimelineResult =
  | {
    readonly success: true;
    readonly value: CompiledChordProgressionDurationTimeline;
  }
  | {
    readonly success: false;
    readonly issues: readonly ChordProgressionIssue[];
  };

const BAR_DURATION_EPSILON = 0.000000001;
const MAX_REQUIRED_BAR_DIVISION = 1_000_000;
const MAX_MATERIALIZED_BAR_COUNT = 100_000;
const DIATONIC_SCALE_DEGREES = 7;
const CHORD_ROOT_DEGREE_REGEX = /^(𝄫|♭|♮|♯|𝄪)?([1-7])$/u;
const NORMALIZABLE_CHORD_ROOT_DEGREE_REGEX = /^([#♯xX𝄪]+|[b♭𝄫]+|♮)?([1-7])$/u;
const CHORD_PROGRESSION_ROMAN_ACCIDENTALS = [
  "",
  "𝄫",
  "♭",
  "♮",
  "♯",
  "𝄪",
] as const;
const CHORD_PROGRESSION_DIRECT_ROMAN_SYMBOLS: ReadonlySet<string> = new Set(
  CHORD_PROGRESSION_ROMAN_ACCIDENTALS.flatMap((accidental) =>
    Array.from(
      { length: DIATONIC_SCALE_DEGREES },
      (_, scaleIndex) =>
        chordCollectionKeys.map((chordCollectionKey) => {
          const romanSymbol = getRomanNumeralForScaleIndexAndChordCollectionKey(
            scaleIndex,
            chordCollectionKey,
          );
          return romanSymbol === undefined
            ? []
            : [`${accidental}${romanSymbol}`];
        }).flat(),
    ).flat()
  ),
);
const CHORD_PROGRESSION_SECONDARY_TARGETS: ReadonlySet<string> = new Set(
  CHORD_PROGRESSION_ROMAN_ACCIDENTALS.flatMap((accidental) =>
    [...upperCaseRomanNumerals, ...lowerCaseRomanNumerals].map(
      (romanNumeral) => `${accidental}${romanNumeral}`,
    )
  ),
);
const CHORD_PROGRESSION_ISSUE_ORDER: Readonly<
  Partial<Record<ChordProgressionIssue["code"], number>>
> = {
  "invalid-chord": 0,
  "invalid-degree": 1,
  "invalid-chord-collection-key": 2,
  "invalid-duration": 3,
  "invalid-analysis": 4,
  "unrepresentable-duration": 5,
  "timeline-too-large": 6,
};

function requireChordRootDegrees(
  values: readonly string[],
): readonly ChordRootDegree[] {
  if (!values.every(isChordRootDegree)) {
    throw new Error("Chord-root degree labels must use altered degrees 1–7");
  }
  return values;
}

/** Twelve chromatic chord-root degrees spelled with flat alterations. */
export const flatChordRootDegrees: readonly ChordRootDegree[] =
  requireChordRootDegrees(noteLabelCollections.intervalsFlat.labels);

/** Twelve chromatic chord-root degrees spelled with sharp alterations. */
export const sharpChordRootDegrees: readonly ChordRootDegree[] =
  requireChordRootDegrees(noteLabelCollections.intervalsSharp.labels);

/** Returns whether a string is one of the built-in chord progression keys. */
export function isValidChordProgressionKey(
  key: string,
): key is ChordProgressionKey {
  return Object.prototype.hasOwnProperty.call(chordProgressions, key);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/** Returns whether a runtime value is a canonical altered degree from 1 through 7. */
export function isChordRootDegree(
  value: unknown,
): value is ChordRootDegree {
  return typeof value === "string" && CHORD_ROOT_DEGREE_REGEX.test(value);
}

/** Normalizes ASCII or Unicode accidentals in a chord root degree. */
export function normalizeChordRootDegree(
  value: unknown,
): ChordRootDegree | undefined {
  if (typeof value !== "string") return undefined;

  const match = value.match(NORMALIZABLE_CHORD_ROOT_DEGREE_REGEX);
  if (!match) return undefined;

  const [, rawAccidental = "", degree] = match;
  const accidental = rawAccidental === "♮"
    ? rawAccidental
    : normalizeAccidentalString(rawAccidental);
  if (accidental === undefined) return undefined;

  const normalizedDegree = `${accidental}${degree}`;
  return isChordRootDegree(normalizedDegree) ? normalizedDegree : undefined;
}

/** Returns whether a runtime value identifies a built-in chord collection. */
export function isChordCollectionKey(
  value: unknown,
): value is ChordCollectionKey {
  return typeof value === "string" &&
    Object.prototype.hasOwnProperty.call(noteCollections, value) &&
    noteCollections[value as keyof typeof noteCollections].category ===
      "chord";
}

/** Returns whether a runtime value is a supported direct progression Roman symbol. */
export function isChordProgressionRomanSymbol(
  value: unknown,
): value is ChordProgressionRomanSymbol {
  return typeof value === "string" &&
    CHORD_PROGRESSION_DIRECT_ROMAN_SYMBOLS.has(value);
}

/** Returns whether a runtime value is a validated secondary-function symbol. */
export function isChordProgressionSecondaryRomanSymbol(
  value: unknown,
): value is ChordProgressionSecondaryRomanSymbol {
  if (typeof value !== "string" || value.length === 0) return false;

  const separatorIndex = value.lastIndexOf("/");
  if (separatorIndex <= 0 || separatorIndex === value.length - 1) return false;

  return CHORD_PROGRESSION_DIRECT_ROMAN_SYMBOLS.has(
    value.slice(0, separatorIndex),
  ) && CHORD_PROGRESSION_SECONDARY_TARGETS.has(
    value.slice(separatorIndex + 1),
  );
}

/** Returns whether a runtime value is a supported progression analysis symbol. */
export function isChordProgressionAnalysisRomanSymbol(
  value: unknown,
): value is ChordProgressionAnalysisRomanSymbol {
  return isChordProgressionRomanSymbol(value) ||
    isChordProgressionSecondaryRomanSymbol(value);
}

/** Returns every structural and semantic issue found in a runtime value. */
export function validateChordProgression(
  value: unknown,
): readonly ChordProgressionIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "invalid-progression",
      message: "Chord progression must be an object",
    }];
  }

  const issues: ChordProgressionIssue[] = [];

  if (!Array.isArray(value.chords)) {
    issues.push({
      code: "invalid-progression",
      message: "Chord progression chords must be an array",
    });
    return issues;
  }

  if (value.chords.length === 0) {
    issues.push({
      code: "empty-progression",
      message: "Chord progression must contain at least one chord",
    });
  }

  const durationInputs: ChordProgressionDurationInput[] = [];

  value.chords.forEach((chord, chordIndex) => {
    if (!isRecord(chord)) {
      issues.push({
        code: "invalid-chord",
        chordIndex,
        message: `Chord progression chord ${chordIndex} must be an object`,
      });
      return;
    }

    if (!isChordRootDegree(chord.degree)) {
      issues.push({
        code: "invalid-degree",
        chordIndex,
        message: `Chord progression chord ${chordIndex} has an invalid degree`,
      });
    }

    if (!isChordCollectionKey(chord.chordCollectionKey)) {
      issues.push({
        code: "invalid-chord-collection-key",
        chordIndex,
        message:
          `Chord progression chord ${chordIndex} has an invalid chord collection key`,
      });
    }

    durationInputs.push({
      chordIndex,
      durationInBars: chord.durationInBars,
    });

    if (
      chord.analysis !== undefined &&
      (!isRecord(chord.analysis) ||
        !isChordProgressionAnalysisRomanSymbol(
          chord.analysis.romanSymbol,
        ))
    ) {
      issues.push({
        code: "invalid-analysis",
        chordIndex,
        message:
          `Chord progression chord ${chordIndex} has invalid Roman-symbol analysis`,
      });
    }
  });

  const durationTimelineResult = compileChordProgressionDurationTimeline(
    durationInputs,
  );
  if (!durationTimelineResult.success) {
    issues.push(...durationTimelineResult.issues);
  }

  return issues.sort((left, right) => {
    const leftIndex = "chordIndex" in left ? left.chordIndex : -1;
    const rightIndex = "chordIndex" in right ? right.chordIndex : -1;
    return leftIndex - rightIndex ||
      (CHORD_PROGRESSION_ISSUE_ORDER[left.code] ?? 0) -
        (CHORD_PROGRESSION_ISSUE_ORDER[right.code] ?? 0);
  });
}

/** Parses unknown persisted data into a fresh chord progression value. */
export function parseChordProgression(
  value: unknown,
): ParseResult<ChordProgression> {
  const issues = validateChordProgression(value);
  if (issues.length > 0) return { success: false, issues };

  const source = value as Record<string, unknown> & {
    chords: [unknown, ...unknown[]];
  };
  const parseChord = (rawChord: unknown): ChordProgressionChord => {
    const chord = rawChord as Record<string, unknown>;
    return {
      degree: chord.degree as ChordProgressionChord["degree"],
      chordCollectionKey: chord.chordCollectionKey as ChordCollectionKey,
      durationInBars: chord.durationInBars as number,
      ...(chord.analysis === undefined ? {} : {
        analysis: {
          romanSymbol: (chord.analysis as Record<string, unknown>)
            .romanSymbol as ChordProgressionAnalysisRomanSymbol,
        },
      }),
    };
  };
  const [firstChord, ...remainingChords] = source.chords;
  const chords: ChordProgressionChords = [
    parseChord(firstChord),
    ...remainingChords.map(parseChord),
  ];

  return {
    success: true,
    value: { chords },
  };
}

/** Returns every issue found in an unknown progression catalog definition. */
export function validateChordProgressionDefinition(
  value: unknown,
): readonly ChordProgressionDefinitionIssue[] {
  if (!isRecord(value)) {
    return [{
      code: "invalid-definition",
      message: "Chord progression definition must be an object",
    }];
  }

  const issues: ChordProgressionDefinitionIssue[] = [];
  if (typeof value.name !== "string" || value.name.trim().length === 0) {
    issues.push({
      code: "invalid-name",
      message: "Chord progression definition name must be a non-empty string",
    });
  }
  if (
    value.category !== undefined &&
    (typeof value.category !== "string" ||
      !chordProgressionCategoryKeys.includes(
        value.category as ChordProgressionCategoryKey,
      ))
  ) {
    issues.push({
      code: "invalid-category",
      message: "Chord progression definition category is not supported",
    });
  }

  issues.push(...validateChordProgression(value.progression));
  return issues;
}

/** Parses unknown persisted data into a fresh progression catalog definition. */
export function parseChordProgressionDefinition(
  value: unknown,
): ParseResult<ChordProgressionDefinition, ChordProgressionDefinitionIssue> {
  const issues = validateChordProgressionDefinition(value);
  if (issues.length > 0) return { success: false, issues };

  const source = value as Record<string, unknown>;
  const progressionResult = parseChordProgression(source.progression);
  if (!progressionResult.success) return progressionResult;

  return {
    success: true,
    value: {
      name: source.name as string,
      ...(source.category === undefined
        ? {}
        : { category: source.category as ChordProgressionCategoryKey }),
      progression: progressionResult.value,
    },
  };
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
  if (
    !Number.isSafeInteger(result) || result > MAX_REQUIRED_BAR_DIVISION
  ) {
    throw new Error("Chord progression requires an impractical bar division");
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

function compileChordProgressionDurationTimeline(
  inputs: readonly ChordProgressionDurationInput[],
): ChordProgressionDurationTimelineResult {
  const issues: ChordProgressionIssue[] = [];
  const denominators = new Map<number, number>();

  for (const { chordIndex, durationInBars } of inputs) {
    if (
      typeof durationInBars !== "number" ||
      !Number.isFinite(durationInBars) ||
      durationInBars <= BAR_DURATION_EPSILON
    ) {
      issues.push({
        code: "invalid-duration",
        chordIndex,
        message:
          `Chord progression chord ${chordIndex} must have a finite positive durationInBars`,
      });
      continue;
    }

    try {
      denominators.set(
        chordIndex,
        getSimpleFractionDenominator(durationInBars),
      );
    } catch {
      issues.push({
        code: "unrepresentable-duration",
        chordIndex,
        message:
          `Chord progression chord ${chordIndex} cannot be represented by the supported bar subdivision`,
      });
    }
  }

  let requiredBarDivision = 1;
  for (const { chordIndex } of inputs) {
    const denominator = denominators.get(chordIndex);
    if (denominator === undefined) continue;

    try {
      requiredBarDivision = leastCommonMultiple(
        requiredBarDivision,
        denominator,
      );
    } catch {
      denominators.delete(chordIndex);
      issues.push({
        code: "unrepresentable-duration",
        chordIndex,
        message:
          `Chord progression chord ${chordIndex} requires an impractical combined bar subdivision`,
      });
    }
  }

  const eventDurationsInDivisions: number[] = [];
  const eventStartsInDivisions: number[] = [];
  let totalDurationInDivisions = 0;
  let timelineTooLarge = false;

  for (const { chordIndex, durationInBars } of inputs) {
    if (
      denominators.get(chordIndex) === undefined ||
      typeof durationInBars !== "number"
    ) continue;

    const durationInDivisions = Math.round(
      durationInBars * requiredBarDivision,
    );
    const nextTotalDurationInDivisions = totalDurationInDivisions +
      durationInDivisions;
    if (
      !Number.isSafeInteger(durationInDivisions) ||
      durationInDivisions < 1 ||
      !Number.isSafeInteger(nextTotalDurationInDivisions) ||
      Math.abs(
          durationInBars - durationInDivisions / requiredBarDivision,
        ) > BAR_DURATION_EPSILON
    ) {
      issues.push({
        code: "unrepresentable-duration",
        chordIndex,
        message:
          `Chord progression chord ${chordIndex} exceeds safe normalized timing`,
      });
      continue;
    }

    eventStartsInDivisions.push(totalDurationInDivisions);
    eventDurationsInDivisions.push(durationInDivisions);
    totalDurationInDivisions = nextTotalDurationInDivisions;

    if (
      !timelineTooLarge &&
      Math.ceil(totalDurationInDivisions / requiredBarDivision) >
        MAX_MATERIALIZED_BAR_COUNT
    ) {
      timelineTooLarge = true;
      issues.push({
        code: "timeline-too-large",
        chordIndex,
        message:
          `Chord progression exceeds the ${MAX_MATERIALIZED_BAR_COUNT}-bar materialization limit at chord ${chordIndex}`,
      });
    }
  }

  if (issues.length > 0) return { success: false, issues };

  return {
    success: true,
    value: {
      eventDurationsInDivisions,
      eventStartsInDivisions,
      totalDurationInDivisions,
      requiredBarDivision,
    },
  };
}

function createChordProgressionBars(
  eventDurationsInDivisions: readonly number[],
  totalDurationInDivisions: number,
  requiredBarDivision: number,
): ChordProgressionBar[] {
  const barCount = Math.ceil(
    totalDurationInDivisions / requiredBarDivision,
  );
  const bars: Array<
    ChordProgressionBar & {
      readonly segments: ChordProgressionBarSegment[];
    }
  > = Array.from({ length: barCount }, (_, barIndex) => {
    const barStart = barIndex * requiredBarDivision;
    const barEnd = Math.min(
      barStart + requiredBarDivision,
      totalDurationInDivisions,
    );

    return {
      barIndex,
      startInBars: barIndex,
      durationInBars: (barEnd - barStart) / requiredBarDivision,
      segments: [],
    };
  });

  let eventStart = 0;
  eventDurationsInDivisions.forEach((eventDuration, eventIndex) => {
    const eventEnd = eventStart + eventDuration;
    const firstBarIndex = Math.floor(eventStart / requiredBarDivision);
    const finalBarIndex = Math.floor((eventEnd - 1) / requiredBarDivision);

    for (
      let barIndex = firstBarIndex;
      barIndex <= finalBarIndex;
      barIndex += 1
    ) {
      const bar = bars[barIndex];
      if (!bar) {
        throw new Error(`Missing chord progression bar ${barIndex}`);
      }
      const barStart = barIndex * requiredBarDivision;
      const barEnd = Math.min(
        barStart + requiredBarDivision,
        totalDurationInDivisions,
      );
      const segmentStart = Math.max(eventStart, barStart);
      const segmentEnd = Math.min(eventEnd, barEnd);
      bar.segments.push({
        eventIndex,
        barIndex,
        offsetInBar: (segmentStart - barStart) / requiredBarDivision,
        durationInBars: (segmentEnd - segmentStart) / requiredBarDivision,
        continuesFromPreviousBar: eventStart < barStart,
        continuesIntoNextBar: eventEnd > barEnd,
      });
    }

    eventStart = eventEnd;
  });

  return bars;
}

function compileChordProgressionTiming(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): CompiledChordProgressionTiming {
  const progression = resolveProgression(progressionOrKey);
  if (!progression) {
    return {
      eventStartsInBars: [],
      timing: {
        bars: [],
        totalDurationInBars: 0,
        requiredBarDivision: 1,
        endsOnBarBoundary: true,
      },
    };
  }

  const durationTimelineResult = compileChordProgressionDurationTimeline(
    progression.chords.map((chord, chordIndex) => ({
      chordIndex,
      durationInBars: chord.durationInBars,
    })),
  );
  if (!durationTimelineResult.success) {
    throw new Error(
      durationTimelineResult.issues[0]?.message ??
        "Invalid chord progression timing",
    );
  }
  const {
    eventDurationsInDivisions,
    eventStartsInDivisions,
    totalDurationInDivisions,
    requiredBarDivision,
  } = durationTimelineResult.value;
  const eventStartsInBars = eventStartsInDivisions.map((start) =>
    start / requiredBarDivision
  );

  return {
    eventStartsInBars,
    timing: {
      bars: createChordProgressionBars(
        eventDurationsInDivisions,
        totalDurationInDivisions,
        requiredBarDivision,
      ),
      totalDurationInBars: totalDurationInDivisions / requiredBarDivision,
      requiredBarDivision,
      endsOnBarBoundary: totalDurationInDivisions % requiredBarDivision === 0,
    },
  };
}

/**
 * Compiles root-independent bar timing for a progression. Bar segmentation is
 * calculated with integer subdivisions and retains authored event identity.
 */
export function getChordProgressionTiming(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): ChordProgressionTiming {
  return compileChordProgressionTiming(progressionOrKey).timing;
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
  const match = chord.degree.match(CHORD_ROOT_DEGREE_REGEX);
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
  const { eventStartsInBars, timing } = compileChordProgressionTiming(
    progressionOrKey,
  );

  const events = getResolvedChordProgressionChordReferences(
    rootNote,
    progressionOrKey,
  ).map(({ chord, reference }, eventIndex) => {
    const directRomanSymbol = getChordProgressionChordDirectRomanSymbol(chord);
    return {
      eventIndex,
      chord,
      reference,
      directRomanSymbol,
      romanSymbol: chord.analysis?.romanSymbol ?? directRomanSymbol,
      startInBars: eventStartsInBars[eventIndex]!,
      durationInBars: chord.durationInBars,
    } satisfies ResolvedChordProgressionEvent;
  });

  return {
    events,
    ...timing,
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
    bar.segments.map((segment) =>
      resolved.events[segment.eventIndex]!.reference
    )
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

/** Returns the normalized total duration in bars for a progression. */
export function getChordProgressionTotalDurationInBars(
  progressionOrKey: ChordProgression | ChordProgressionKey,
): number {
  return getChordProgressionTiming(progressionOrKey).totalDurationInBars;
}
