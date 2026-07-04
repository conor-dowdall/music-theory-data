import type {
  CompoundInterval,
  Interval,
  NoteLetter,
  NoteName,
  SimpleInterval,
} from "./note-labels.ts";
import { compoundToSimpleIntervalMap } from "./note-labels.ts";

export type FixedDoSeventhSyllable = "si" | "ti";

export type FixedDoAccidentalPolicy =
  | "omitAccidentals"
  | "symbolAccidentals";

export interface FixedDoSyllableOptions {
  readonly seventhSyllable?: FixedDoSeventhSyllable;
  readonly accidentalPolicy?: FixedDoAccidentalPolicy;
}

export type FixedDoBaseSyllable =
  | "do"
  | "re"
  | "mi"
  | "fa"
  | "sol"
  | "la"
  | FixedDoSeventhSyllable;

export type MovableDoSyllable =
  | "do"
  | "di"
  | "ra"
  | "re"
  | "ri"
  | "me"
  | "ma"
  | "mi"
  | "fa"
  | "fi"
  | "se"
  | "sol"
  | "si"
  | "le"
  | "lo"
  | "la"
  | "li"
  | "te"
  | "ta"
  | "ti";

export interface MovableDoSyllableEntry {
  readonly syllable: MovableDoSyllable;
  readonly aliases?: readonly MovableDoSyllable[];
  readonly note?: string;
}

export type MovableDoSystem = "doBased" | "laBasedMinor";

export interface SolfegeSystemMetadata {
  readonly name: string;
  readonly shortName: string;
  readonly description: string;
}

export type SolfegeSystemKey = "fixedDo" | MovableDoSystem;

export const solfegeSystemMetadata: Readonly<
  Record<SolfegeSystemKey, SolfegeSystemMetadata>
> = {
  fixedDo: {
    name: "Fixed Do",
    shortName: "Fixed Do",
    description:
      "Names notes by letter with do for C, re for D, mi for E, fa for F, sol for G, la for A, and si or ti for B.",
  },
  doBased: {
    name: "Movable Do",
    shortName: "Movable Do",
    description:
      "Names intervals relative to the tonic, with do as the tonic in both major and minor contexts.",
  },
  laBasedMinor: {
    name: "Movable La-Based Minor",
    shortName: "Movable La",
    description:
      "Names intervals relative to a minor tonic treated as la, a convention common in some choral and teaching contexts.",
  },
};

export const defaultFixedDoSyllableOptions: Required<FixedDoSyllableOptions> = {
  seventhSyllable: "si",
  accidentalPolicy: "omitAccidentals",
};

export const fixedDoNoteLetterToSyllableMaps: Readonly<
  Record<FixedDoSeventhSyllable, ReadonlyMap<NoteLetter, FixedDoBaseSyllable>>
> = {
  si: new Map<NoteLetter, FixedDoBaseSyllable>([
    ["C", "do"],
    ["D", "re"],
    ["E", "mi"],
    ["F", "fa"],
    ["G", "sol"],
    ["A", "la"],
    ["B", "si"],
  ]),
  ti: new Map<NoteLetter, FixedDoBaseSyllable>([
    ["C", "do"],
    ["D", "re"],
    ["E", "mi"],
    ["F", "fa"],
    ["G", "sol"],
    ["A", "la"],
    ["B", "ti"],
  ]),
};

const SIMPLE_INTERVAL_NUMBER_REGEX = /\d+$/;

function getNoteLetterFromNoteName(noteName: NoteName): NoteLetter {
  return noteName.charAt(0) as NoteLetter;
}

function getAccidentalSymbolsFromNoteName(noteName: NoteName): string {
  return noteName.slice(1);
}

function getFixedDoOptions(
  options: FixedDoSyllableOptions,
): Required<FixedDoSyllableOptions> {
  return {
    ...defaultFixedDoSyllableOptions,
    ...options,
  };
}

function isSimpleIntervalValue(interval: Interval): interval is SimpleInterval {
  const match = interval.match(SIMPLE_INTERVAL_NUMBER_REGEX);
  return match !== null && Number(match[0]) <= 8;
}

function getSimpleIntervalForMovableDo(
  interval: Interval,
): SimpleInterval | undefined {
  const compoundAsSimple = compoundToSimpleIntervalMap.get(
    interval as CompoundInterval,
  );

  if (compoundAsSimple !== undefined) {
    return compoundAsSimple;
  }

  return isSimpleIntervalValue(interval) ? interval : undefined;
}

export function getFixedDoSyllableForNoteName(
  noteName: NoteName,
  options: FixedDoSyllableOptions = {},
): string {
  const { seventhSyllable, accidentalPolicy } = getFixedDoOptions(options);
  const noteLetter = getNoteLetterFromNoteName(noteName);
  const baseSyllable = fixedDoNoteLetterToSyllableMaps[seventhSyllable].get(
    noteLetter,
  );

  if (baseSyllable === undefined) {
    return "";
  }

  if (accidentalPolicy === "omitAccidentals") {
    return baseSyllable;
  }

  return baseSyllable + getAccidentalSymbolsFromNoteName(noteName);
}

export function getFixedDoSyllablesForNoteNames(
  noteNames: readonly NoteName[],
  options: FixedDoSyllableOptions = {},
): string[] {
  return noteNames.map((noteName) =>
    getFixedDoSyllableForNoteName(noteName, options)
  );
}

export const movableDoIntervalToSyllableMap: ReadonlyMap<
  SimpleInterval,
  MovableDoSyllableEntry
> = new Map<SimpleInterval, MovableDoSyllableEntry>([
  ["♭1", { syllable: "ti", note: "Contextual lowered tonic." }],
  ["♮1", { syllable: "do" }],
  ["1", { syllable: "do" }],
  ["♯1", { syllable: "di" }],
  ["♭2", { syllable: "ra" }],
  ["♮2", { syllable: "re" }],
  ["2", { syllable: "re" }],
  ["♯2", { syllable: "ri" }],
  ["♭3", { syllable: "me", aliases: ["ma"] }],
  ["♮3", { syllable: "mi" }],
  ["3", { syllable: "mi" }],
  ["♭4", { syllable: "mi", note: "Contextual lowered fourth." }],
  ["♮4", { syllable: "fa" }],
  ["4", { syllable: "fa" }],
  ["♯4", { syllable: "fi" }],
  ["♭5", { syllable: "se" }],
  ["♮5", { syllable: "sol" }],
  ["5", { syllable: "sol" }],
  ["♯5", { syllable: "si" }],
  ["♭6", { syllable: "le", aliases: ["lo"] }],
  ["♮6", { syllable: "la" }],
  ["6", { syllable: "la" }],
  ["♯6", { syllable: "li" }],
  [
    "𝄫7",
    {
      syllable: "la",
      note:
        "Common do-based minor handling for a diminished seventh above the tonic.",
    },
  ],
  ["♭7", { syllable: "te", aliases: ["ta"] }],
  ["♮7", { syllable: "ti" }],
  ["7", { syllable: "ti" }],
  ["♭8", { syllable: "ti", note: "Contextual lowered octave." }],
  ["♮8", { syllable: "do" }],
  ["8", { syllable: "do" }],
  ["♯8", { syllable: "di", note: "Contextual raised octave." }],
]);

export const movableLaBasedMinorIntervalToSyllableMap: ReadonlyMap<
  SimpleInterval,
  MovableDoSyllableEntry
> = new Map<SimpleInterval, MovableDoSyllableEntry>([
  ["♭1", { syllable: "le", aliases: ["lo"] }],
  ["♮1", { syllable: "la" }],
  ["1", { syllable: "la" }],
  ["♯1", { syllable: "li" }],
  ["♭2", { syllable: "te", aliases: ["ta"] }],
  ["♮2", { syllable: "ti" }],
  ["2", { syllable: "ti" }],
  ["♭3", { syllable: "do" }],
  ["♮3", { syllable: "di" }],
  ["3", { syllable: "di" }],
  ["♭4", { syllable: "ra" }],
  ["♮4", { syllable: "re" }],
  ["4", { syllable: "re" }],
  ["♯4", { syllable: "ri" }],
  ["♭5", { syllable: "me", aliases: ["ma"] }],
  ["♮5", { syllable: "mi" }],
  ["5", { syllable: "mi" }],
  ["♭6", { syllable: "fa" }],
  ["♮6", { syllable: "fi" }],
  ["6", { syllable: "fi" }],
  ["𝄫7", { syllable: "se" }],
  ["♭7", { syllable: "sol" }],
  ["♮7", { syllable: "si" }],
  ["7", { syllable: "si" }],
  ["♮8", { syllable: "la" }],
  ["8", { syllable: "la" }],
]);

export const movableDoIntervalSyllableMaps: Readonly<
  Record<MovableDoSystem, ReadonlyMap<SimpleInterval, MovableDoSyllableEntry>>
> = {
  doBased: movableDoIntervalToSyllableMap,
  laBasedMinor: movableLaBasedMinorIntervalToSyllableMap,
};

export function getMovableDoSyllableEntryForInterval(
  interval: Interval,
  system: MovableDoSystem = "doBased",
): MovableDoSyllableEntry | undefined {
  const simpleInterval = getSimpleIntervalForMovableDo(interval);

  if (simpleInterval === undefined) {
    return undefined;
  }

  return movableDoIntervalSyllableMaps[system].get(simpleInterval);
}

export function getMovableDoSyllableForInterval(
  interval: Interval,
  system: MovableDoSystem = "doBased",
): MovableDoSyllable | undefined {
  return getMovableDoSyllableEntryForInterval(interval, system)?.syllable;
}

export function getMovableDoSyllablesForIntervals(
  intervals: readonly Interval[],
  system: MovableDoSystem = "doBased",
): (MovableDoSyllable | undefined)[] {
  return intervals.map((interval) =>
    getMovableDoSyllableForInterval(interval, system)
  );
}
