import type { ScaleCollection } from "../../types/note-collections.d.ts";

const harmonicMinor: ScaleCollection = {
  category: "scale",
  rotation: 0,
  primaryName: "Harmonic Minor",
  names: [
    "Harmonic Minor",
    "Aeolian ♮7",
    "Aeolian Natural Seventh",
    "Aeolian Raised Seventh",
  ],
  intervals: ["1", "2", "♭3", "4", "5", "♭6", "7", "8"],
  integers: [0, 2, 3, 5, 7, 8, 11],
  type: ["harmonic minor mode", "minor", "scale", "mode", "heptatonic"],
  characteristics: [
    "dark",
    "tense",
    "exotic",
    "classical",
    "neo-classical",
    "middle-eastern",
    "first mode of harmonic minor",
  ],
  pattern: [
    "whole",
    "half",
    "whole",
    "whole",
    "half",
    "augmented second",
    "half",
  ],
  patternShort: ["W", "H", "W", "W", "H", "A2", "H"],
} as const;

const locrianNatural6: ScaleCollection = {
  category: "scale",
  rotation: 1,
  primaryName: "Locrian ♮6",
  names: ["Locrian ♮6", "Locrian Natural Sixth", "Locrian Raised Sixth"],
  intervals: ["1", "♭2", "♭3", "4", "♭5", "6", "♭7", "8"],
  integers: [0, 1, 3, 5, 6, 9, 10],
  type: ["harmonic minor mode", "diminished", "scale", "mode", "heptatonic"],
  characteristics: [
    "dark",
    "unstable",
    "jazzy",
    "exotic",
    "second mode of harmonic minor",
  ],
  pattern: [
    "half",
    "whole",
    "whole",
    "half",
    "augmented second",
    "half",
    "whole",
  ],
  patternShort: ["H", "W", "W", "H", "A2", "H", "W"],
} as const;

const ionianSharp5: ScaleCollection = {
  category: "scale",
  rotation: 2,
  primaryName: "Ionian ♯5",
  names: [
    "Ionian ♯5",
    "Ionian Sharp Fifth",
    "Augmented Major",
    "Ionian Augmented",
  ],
  intervals: ["1", "2", "3", "4", "♯5", "6", "7", "8"],
  integers: [0, 2, 4, 5, 8, 9, 11],
  type: [
    "harmonic minor mode",
    "major",
    "augmented",
    "scale",
    "mode",
    "heptatonic",
  ],
  characteristics: [
    "bright",
    "dreamy",
    "unsettling",
    "magical",
    "third mode of harmonic minor",
  ],
  pattern: [
    "whole",
    "whole",
    "half",
    "augmented second",
    "half",
    "whole",
    "half",
  ],
  patternShort: ["W", "W", "H", "A2", "H", "W", "H"],
} as const;

const dorianSharp4: ScaleCollection = {
  category: "scale",
  rotation: 3,
  primaryName: "Dorian ♯4",
  names: [
    "Dorian ♯4",
    "Dorian Sharp Fourth",
    "Dorian ♯11",
    "Dorian Sharp Eleventh",
    "Ukrainian Dorian",
    "Romanian Minor",
  ],
  intervals: ["1", "2", "♭3", "♯4", "5", "6", "♭7", "8"],
  integers: [0, 2, 3, 6, 7, 9, 10],
  type: ["harmonic minor mode", "minor", "scale", "heptatonic"],
  characteristics: ["exotic minor", "eastern european folk", "gypsy"],
  pattern: [
    "whole",
    "half",
    "augmented second",
    "half",
    "whole",
    "half",
    "whole",
  ],
  patternShort: ["W", "H", "A2", "H", "W", "H", "W"],
} as const;

const phrygianDominant: ScaleCollection = {
  category: "scale",
  rotation: 4,
  primaryName: "Phrygian Dominant",
  names: [
    "Phrygian Dominant",
    "Phrygian ♮3",
    "Phrygian Natural Third",
    "Phrygian Raised Third",
    "Spanish Gypsy Scale",
    "Freygish Scale",
    "Phrygian Major",
    "Harmonic Dominant",
  ],
  intervals: ["1", "♭2", "3", "4", "5", "♭6", "♭7", "8"],
  integers: [0, 1, 4, 5, 7, 8, 10],
  type: ["harmonic minor mode", "dominant", "scale", "heptatonic"],
  characteristics: [
    "very exotic",
    "spanish",
    "flamenco",
    "klezmer",
    "arabic",
    "middle-eastern",
    "tense",
  ],
  pattern: [
    "half",
    "augmented second",
    "half",
    "whole",
    "half",
    "whole",
    "whole",
  ],
  patternShort: ["H", "A2", "H", "W", "H", "W", "W"],
} as const;

const lydianSharp2: ScaleCollection = {
  category: "scale",
  rotation: 5,
  primaryName: "Lydian ♯2",
  names: [
    "Lydian ♯2",
    "Lydian Sharp Second",
    "Lydian ♯9",
    "Lydian Sharp Ninth",
  ],
  intervals: ["1", "♯2", "3", "♯4", "5", "6", "7", "8"],
  integers: [0, 3, 4, 6, 7, 9, 11],
  type: ["harmonic minor mode", "major", "scale", "heptatonic"],
  characteristics: ["very bright", "unusual", "double augmented", "exotic"],
  pattern: [
    "augmented second",
    "half",
    "whole",
    "half",
    "whole",
    "whole",
    "half",
  ],
  patternShort: ["A2", "H", "W", "H", "W", "W", "H"],
} as const;

const superLocrianDoubleFlat7: ScaleCollection = {
  category: "scale",
  rotation: 6,
  primaryName: "Super Locrian 𝄫7",
  names: [
    "Super Locrian 𝄫7",
    "Super Locrian Diminished 7",
    "Altered Diminished",
    "Altered 𝄫7",
  ],
  intervals: ["1", "♭2", "♭3", "♭4", "♭5", "♭6", "𝄫7", "8"],
  integers: [0, 1, 3, 4, 6, 8, 9],
  type: ["harmonic minor mode", "diminished", "scale", "heptatonic"],
  characteristics: [
    "extremely tense",
    "highly dissonant",
    "altered",
    "theoretical",
  ],
  pattern: [
    "half",
    "whole",
    "half",
    "whole",
    "whole",
    "half",
    "augmented second",
  ],
  patternShort: ["H", "W", "H", "W", "W", "H", "A2"],
} as const;

export const _harmonicMinorModes = {
  harmonicMinor,
  locrianNatural6,
  ionianSharp5,
  dorianSharp4,
  phrygianDominant,
  lydianSharp2,
  superLocrianDoubleFlat7,
} as const;

export type HarmonicMinorModeKey = keyof typeof _harmonicMinorModes;

export const harmonicMinorModes: Record<HarmonicMinorModeKey, ScaleCollection> =
  _harmonicMinorModes;
