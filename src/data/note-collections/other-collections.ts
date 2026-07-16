import type {
  DyadCollection,
  NonModalScaleCollection,
  NoteCollection,
  NoteOnlyCollection,
} from "../../types/note-collections.ts";

const root: NoteOnlyCollection = {
  category: "note",
  mostSimilarScale: "ionian",
  primaryName: "Root",
  names: ["Root", "Root Note", "Unison"],
  intervals: ["1"],
  integers: [0],
  type: ["single note", "root note", "unison"],
  characteristics: ["tonal center", "fundamental"],
  pattern: [],
  patternShort: [],
};

const rootAndFifth: DyadCollection = {
  category: "dyad",
  mostSimilarScale: "ionian",
  primaryName: "Root and Fifth",
  names: ["Root and Fifth", "5", "Power Chord"],
  intervals: ["1", "5"],
  integers: [0, 7],
  type: ["dyad", "power chord"],
  characteristics: ["consonant", "rock", "blues", "metal"],
  pattern: ["perfect fifth"],
  patternShort: ["P5"],
};

const rootAndFourth: DyadCollection = {
  category: "dyad",
  mostSimilarScale: "ionian",
  primaryName: "Root and Fourth",
  names: ["Root and Fourth", "4", "Perfect Fourth"],
  intervals: ["1", "4"],
  integers: [0, 5],
  type: ["dyad", "perfect fourth"],
  characteristics: ["open", "suspended"],
  pattern: ["perfect fourth"],
  patternShort: ["P4"],
};

const rootAndTritone: DyadCollection = {
  category: "dyad",
  mostSimilarScale: "locrian",
  primaryName: "Root and Tritone",
  names: ["Root and Tritone", "Tritone", "♭5", "Root and Flat Fifth"],
  intervals: ["1", "♭5"],
  integers: [0, 6],
  type: ["dyad", "tritone"],
  characteristics: ["tense", "unstable", "dissonant"],
  pattern: ["tritone"],
  patternShort: ["TT"],
};

const bluesPentatonic: NonModalScaleCollection = {
  category: "scale",
  mostSimilarScale: "aeolian",
  primaryName: "Blues Pentatonic",
  names: ["Blues Pentatonic"],
  intervals: ["1", "♭3", "4", "♭5", "5", "♭7", "8"],
  integers: [0, 3, 5, 6, 7, 10],
  type: ["blues", "pentatonic", "scale", "gapped scale"],
  characteristics: ["bluesy", "rock"],
  pattern: ["minor third", "whole", "half", "half", "minor third", "whole"],
  patternShort: ["m3", "W", "H", "H", "m3", "W"],
};

const chromatic: NonModalScaleCollection = {
  category: "scale",
  mostSimilarScale: "ionian",
  primaryName: "Chromatic",
  names: ["Chromatic", "Twelve-Tone Scale"],
  intervals: [
    "1",
    "♭2",
    "2",
    "♭3",
    "3",
    "4",
    "♭5",
    "5",
    "♭6",
    "6",
    "♭7",
    "7",
    "8",
  ],
  integers: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  type: ["chromatic", "scale", "non-diatonic", "dodecaphonic"],
  characteristics: [
    "atonal",
    "dissonant",
    "no tonal center",
    "contains all 12 pitches",
    "used for passing tones and creating tension",
  ],
  pattern: [
    "half",
    "half",
    "half",
    "half",
    "half",
    "half",
    "half",
    "half",
    "half",
    "half",
    "half",
  ],
  patternShort: ["H", "H", "H", "H", "H", "H", "H", "H", "H", "H", "H"],
} as const;

const wholeTone: NonModalScaleCollection = {
  category: "scale",
  mostSimilarScale: "ionian",
  primaryName: "Whole Tone Scale",
  names: ["Whole Tone Scale"],
  intervals: ["1", "2", "3", "♯4", "♯5", "♯6", "8"],
  integers: [0, 2, 4, 6, 8, 10],
  type: ["whole tone", "scale", "symmetrical", "hexatonic"],
  characteristics: [
    "six pitches in an octave",
    "no tonal center",
    "no leading tone and because all tones are the same distance apart",
    "used in impressionistic music",
    "creates a dreamy or ethereal sound",
    "often used in film scores",
    "associated with composers like Debussy and Ravel",
  ],
  pattern: ["whole", "whole", "whole", "whole", "whole", "whole"],
  patternShort: ["W", "W", "W", "W", "W", "W"],
} as const;

const _otherNoteCollections = {
  root,
  rootAndFifth,
  rootAndFourth,
  rootAndTritone,
  bluesPentatonic,
  chromatic,
  wholeTone,
} as const;

/** A key for a miscellaneous built-in note, dyad, chord, or scale collection. */
export type OtherNoteCollectionKey =
  | "root"
  | "rootAndFifth"
  | "rootAndFourth"
  | "rootAndTritone"
  | "bluesPentatonic"
  | "chromatic"
  | "wholeTone";

/** Miscellaneous built-in note collections keyed by collection id. */
export const otherNoteCollections: Record<
  OtherNoteCollectionKey,
  NoteCollection
> = _otherNoteCollections;
