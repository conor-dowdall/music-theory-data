import type {
  ChordCollection,
  NonModalScaleCollection,
  NoteCollection,
} from "../../types/note-collections.d.ts";

const rootAndFifth: ChordCollection = {
  category: "chord",
  mostSimilarScale: "ionian",
  primaryName: "Root and Fifth",
  names: ["Root and Fifth", "Power Chord"],
  intervals: ["1", "5"],
  integers: [0, 7],
  type: ["chord", "power chord"],
  characteristics: ["rock", "blues", "metal"],
  pattern: ["perfect fifth"],
  patternShort: ["P5"],
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

export const _otherNoteCollections = {
  rootAndFifth,
  bluesPentatonic,
  chromatic,
  wholeTone,
} as const;

export type OtherNoteCollectionKey = keyof typeof _otherNoteCollections;

export const otherNoteCollections: Record<
  OtherNoteCollectionKey,
  NoteCollection
> = _otherNoteCollections;
