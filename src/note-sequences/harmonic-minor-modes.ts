/**
 * @module
 *
 * This file contains the definitions for the seven modes of the Harmonic Minor scale.
 * This scale is characterized by a raised seventh degree, which creates a distinctive
 * augmented second interval and a strong pull to the tonic. These modes are
 * prominent in classical, neoclassical metal, jazz, and various styles of
 * Eastern European and Middle Eastern music.
 *
 * As these are scales, the `intervals` array for each mode includes the
 * octave ("8").
 */

import { generateHarmonicMinorChordLabels } from "../utils/chord-label-generators.ts";
import type {
  HarmonicMinorModeKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";
import type { NoteInteger } from "../types/note-labels.d.ts";

/**
 * A record containing the seven modes of the Harmonic Minor scale.
 * Each mode is a `NoteSequenceTheme` with detailed musical properties.
 *
 * The keys of this record are `HarmonicMinorModeKey`s, providing type-safe
 * access to each mode definition.
 *
 * @example
 * ```ts
 * import { harmonicMinorModes } from "@musodojo/music-theory-data/note-sequences";
 *
 * const phrygianDominant = harmonicMinorModes.phrygianDominant;
 * console.log(phrygianDominant.primaryName); // "Phrygian Dominant"
 * console.log(phrygianDominant.intervals);   // ["1", "♭2", "3", "4", "5", "♭6", "♭7", "8"]
 * ```
 *
 * @see {@link NoteSequenceTheme} for the structure of each mode definition.
 * @see {@link HarmonicMinorModeKey} for the available mode keys.
 */

const harmonicMinorIntegers: NoteInteger[] = [0, 2, 3, 5, 7, 8, 11];
const locrianNatural6Integers: NoteInteger[] = [0, 1, 3, 5, 6, 9, 10];
const ionianSharp5Integers: NoteInteger[] = [0, 2, 4, 5, 8, 9, 11];
const dorianSharp4Integers: NoteInteger[] = [0, 2, 3, 6, 7, 9, 10];
const phrygianDominantIntegers: NoteInteger[] = [0, 1, 4, 5, 7, 8, 10];
const lydianSharp2Integers: NoteInteger[] = [0, 3, 4, 6, 7, 9, 11];
const superLocrianDoubleFlat7Integers: NoteInteger[] = [0, 1, 3, 4, 6, 8, 9];

export const harmonicMinorModes: Record<
  HarmonicMinorModeKey,
  NoteSequenceTheme
> = {
  harmonicMinor: {
    primaryName: "Harmonic Minor",
    names: [
      "Harmonic Minor",
      "Aeolian ♮7",
      "Aeolian Natural Seventh",
      "Aeolian Raised Seventh",
    ],
    intervals: ["1", "2", "♭3", "4", "5", "♭6", "7", "8"],
    integers: harmonicMinorIntegers,
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
    exampleNotes: ["A", "B", "C", "D", "E", "F", "G♯", "A"],
    labelsOverride: generateHarmonicMinorChordLabels(harmonicMinorIntegers, 0),
  },
  locrianNatural6: {
    primaryName: "Locrian ♮6",
    names: ["Locrian ♮6", "Locrian Natural Sixth", "Locrian Raised Sixth"],
    intervals: ["1", "♭2", "♭3", "4", "♭5", "6", "♭7", "8"],
    integers: locrianNatural6Integers,
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
    exampleNotes: ["A", "B♭", "C", "D", "E♭", "F♯", "G", "A"],
    labelsOverride: generateHarmonicMinorChordLabels(
      locrianNatural6Integers,
      1,
    ),
  },
  ionianSharp5: {
    primaryName: "Ionian ♯5",
    names: [
      "Ionian ♯5",
      "Ionian Sharp Fifth",
      "Augmented Major",
      "Ionian Augmented",
    ],
    intervals: ["1", "2", "3", "4", "♯5", "6", "7", "8"],
    integers: ionianSharp5Integers,
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
      "whole",
    ],
    patternShort: ["W", "W", "H", "A2", "H", "W", "W"],
    exampleNotes: ["A", "B", "C♯", "D", "E♯", "F♯", "G♯", "A"],
    labelsOverride: {
      quality: new Map([[8, "A5"]]),
      relative: new Map([[8, "♯5"]]),
      extension: new Map([[8, "♯5"]]),
      ...generateHarmonicMinorChordLabels(ionianSharp5Integers, 2),
    },
  },
  dorianSharp4: {
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
    integers: dorianSharp4Integers,
    type: ["harmonic minor mode", "minor", "scale", "heptatonic"],
    characteristics: ["exotic minor", "eastern european folk", "gypsy"],
    pattern: [
      "whole",
      "half",
      "augmented second",
      "half",
      "whole",
      "whole",
      "half",
    ],
    patternShort: ["W", "H", "A2", "H", "W", "W", "H"],
    exampleNotes: ["A", "B", "C", "D♯", "E", "F♯", "G", "A"],
    labelsOverride: {
      quality: new Map([[6, "A4"]]),
      relative: new Map([[6, "♯4"]]),
      extension: new Map([[6, "♯11"]]),
      ...generateHarmonicMinorChordLabels(dorianSharp4Integers, 3),
    },
  },
  phrygianDominant: {
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
    integers: phrygianDominantIntegers,
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
    exampleNotes: ["A", "B♭", "C♯", "D", "E", "F", "G", "A"],
    labelsOverride: generateHarmonicMinorChordLabels(
      phrygianDominantIntegers,
      4,
    ),
  },
  lydianSharp2: {
    primaryName: "Lydian ♯2",
    names: [
      "Lydian ♯2",
      "Lydian Sharp Second",
      "Lydian ♯9",
      "Lydian Sharp Ninth",
    ],
    intervals: ["1", "♯2", "3", "♯4", "5", "6", "7", "8"],
    integers: lydianSharp2Integers,
    type: ["harmonic minor mode", "major", "scale", "heptatonic"],
    characteristics: ["very bright", "unusual", "double augmented", "exotic"],
    pattern: [
      "augmented second",
      "half",
      "whole",
      "half",
      "whole",
      "whole",
      "whole",
    ],
    patternShort: ["A2", "H", "W", "H", "W", "W", "W"],
    exampleNotes: ["A", "B♯", "C♯", "D♯", "E", "F♯", "G♯", "A"],
    labelsOverride: {
      quality: new Map([[3, "A2"], [6, "A4"]]),
      relative: new Map([[3, "♯2"], [6, "♯4"]]),
      extension: new Map([[3, "♯9"], [6, "♯11"]]),
      ...generateHarmonicMinorChordLabels(lydianSharp2Integers, 5),
    },
  },
  superLocrianDoubleFlat7: {
    primaryName: "Super Locrian 𝄫7",
    names: [
      "Super Locrian 𝄫7",
      "Super Locrian Diminished 7",
      "Altered Diminished",
      "Altered 𝄫7",
    ],
    intervals: ["1", "♭2", "♭3", "♭4", "♭5", "♭6", "𝄫7", "8"],
    integers: superLocrianDoubleFlat7Integers,
    type: ["harmonic minor mode", "diminished", "scale", "heptatonic"],
    characteristics: [
      "extremely tense",
      "highly dissonant",
      "altered",
      "theoretical",
    ],
    pattern: ["half", "whole", "half", "whole", "whole", "half", "whole"],
    patternShort: ["H", "W", "H", "W", "W", "H", "W"],
    exampleNotes: ["A", "B♭", "C", "D♭", "E♭", "F", "G♭", "A"],
    labelsOverride: {
      quality: new Map([[4, "d4"], [9, "d7"]]),
      relative: new Map([[4, "♭4"], [9, "𝄫7"]]),
      extension: new Map([[4, "♭11"], [9, "𝄫7"]]),
      ...generateHarmonicMinorChordLabels(superLocrianDoubleFlat7Integers, 6),
    },
  },
} as const;
