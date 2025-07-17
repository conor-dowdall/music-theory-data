/**
 * @module
 *
 * This file contains the definitions for the seven diatonic modes, also known
 * as the church modes or Greek modes. These scales are fundamental to Western
 * music theory and are derived from the major scale.
 *
 * Each mode has a unique intervallic structure and a distinct emotional quality.
 * The modes are presented in their traditional order:
 * 1. Ionian (the major scale)
 * 2. Dorian
 * 3. Phrygian
 * 4. Lydian
 * 5. Mixolydian
 * 6. Aeolian (the natural minor scale)
 * 7. Locrian
 *
 * The `intervals` array for each mode includes the octave ("8"), which is
 * characteristic for scales and modes.
 */

import { generateDiatonicChordLabels } from "../utils/chord-label-generators.ts";
import type {
  DiatonicModeKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";
import type { NoteInteger } from "../types/note-labels.d.ts";

/**
 * A comprehensive record of the seven diatonic modes. Each mode is defined
 * as a `NoteSequenceTheme`, providing its names, intervals, type classifications,
 * and other musical properties.
 *
 * The keys of this record are `DiatonicModeKey`s, allowing for type-safe
 * access to each mode.
 *
 * @example
 * ```ts
 * import { diatonicModes } from "@musodojo/music-theory-data/note-sequences";
 *
 * const dorian = diatonicModes.dorian;
 * console.log(dorian.primaryName); // "Dorian"
 * console.log(dorian.intervals);   // ["1", "2", "♭3", "4", "5", "6", "♭7", "8"]
 * ```
 *
 * @see {@link NoteSequenceTheme} for the structure of each mode definition.
 * @see {@link DiatonicModeKey} for the available mode keys.
 */

const ionianIntegers: NoteInteger[] = [0, 2, 4, 5, 7, 9, 11];
const dorianIntegers: NoteInteger[] = [0, 2, 3, 5, 7, 9, 10];
const phrygianIntegers: NoteInteger[] = [0, 1, 3, 5, 7, 8, 10];
const lydianIntegers: NoteInteger[] = [0, 2, 4, 6, 7, 9, 11];
const mixolydianIntegers: NoteInteger[] = [0, 2, 4, 5, 7, 9, 10];
const aeolianIntegers: NoteInteger[] = [0, 2, 3, 5, 7, 8, 10];
const locrianIntegers: NoteInteger[] = [0, 1, 3, 5, 6, 8, 10];

export const diatonicModes: Record<DiatonicModeKey, NoteSequenceTheme> = {
  ionian: {
    primaryName: "Major",
    names: ["Major", "Ionian", "Major Scale", "Ionian Mode", "Diatonic Major"],
    intervals: ["1", "2", "3", "4", "5", "6", "7", "8"],
    integers: ionianIntegers,
    type: [
      "major",
      "ionian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "first diatonic mode",
      "do mode",
    ],
    characteristics: [
      "bright",
      "happy",
      "stable",
      "uplifting",
      "consonant",
      "western",
      "foundational",
      "simple",
      "pop music",
      "major tonality",
      "commonly used western scale",
    ],
    pattern: ["whole", "whole", "half", "whole", "whole", "whole", "half"],
    patternShort: ["W", "W", "H", "W", "W", "W", "H"],
    exampleNotes: ["C", "D", "E", "F", "G", "A", "B", "C"],
    labelsOverride: generateDiatonicChordLabels(ionianIntegers, 0),
  },
  dorian: {
    primaryName: "Dorian",
    names: [
      "Dorian",
      "Minor ♮6",
      "Dorian Mode",
    ],
    intervals: ["1", "2", "♭3", "4", "5", "6", "♭7", "8"],
    integers: dorianIntegers,
    type: [
      "minor",
      "dorian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "second diatonic mode",
      "re mode",
    ],
    characteristics: [
      "soulful",
      "funky",
      "jazzy",
      "hopeful",
      "celtic",
      "folk",
      "minor tonality",
      "versatile",
      "used in folk, jazz, and rock",
      "medieval",
      "minor feel with a hopeful twist",
    ],
    pattern: ["whole", "half", "whole", "whole", "whole", "half", "whole"],
    patternShort: ["W", "H", "W", "W", "W", "H", "W"],
    exampleNotes: ["D", "E", "F", "G", "A", "B", "C", "D"],
    labelsOverride: generateDiatonicChordLabels(dorianIntegers, 1),
  },
  phrygian: {
    primaryName: "Phrygian",
    names: [
      "Phrygian",
      "Minor ♭2",
      "Phrygian Mode",
    ],
    intervals: ["1", "♭2", "♭3", "4", "5", "♭6", "♭7", "8"],
    integers: phrygianIntegers,
    type: [
      "minor",
      "phrygian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "third diatonic mode",
      "mi mode",
    ],
    characteristics: [
      "exotic",
      "spanish",
      "flamenco",
      "tense",
      "dark",
      "dramatic",
      "minor tonality",
      "darker emotional tones",
      "often used in metal and flamenco",
    ],
    pattern: ["half", "whole", "whole", "whole", "half", "whole", "whole"],
    patternShort: ["H", "W", "W", "W", "H", "W", "W"],
    exampleNotes: ["E", "F", "G", "A", "B", "C", "D", "E"],
    labelsOverride: generateDiatonicChordLabels(phrygianIntegers, 2),
  },
  lydian: {
    primaryName: "Lydian",
    names: ["Lydian", "Major ♯4", "Lydian Mode"],
    intervals: ["1", "2", "3", "♯4", "5", "6", "7", "8"],
    integers: lydianIntegers,
    type: [
      "major",
      "lydian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "fourth diatonic mode",
      "fa mode",
    ],
    characteristics: [
      "dreamy",
      "floating",
      "ethereal",
      "cinematic",
      "bright",
      "bright major tonality",
      "used in film scores and jazz",
    ],
    pattern: ["whole", "whole", "whole", "half", "whole", "whole", "half"],
    patternShort: ["W", "W", "W", "H", "W", "W", "H"],
    exampleNotes: ["F", "G", "A", "B", "C", "D", "E", "F"],
    labelsOverride: {
      quality: new Map([[6, "A4"]]),
      relative: new Map([[6, "♯4"]]),
      extension: new Map([[6, "♯11"]]),
      ...generateDiatonicChordLabels(lydianIntegers, 3),
    },
  },
  mixolydian: {
    primaryName: "Mixolydian",
    names: [
      "Mixolydian",
      "Major ♭7",
      "Dominant Scale",
      "Mixolydian Mode",
    ],
    intervals: ["1", "2", "3", "4", "5", "6", "♭7", "8"],
    integers: mixolydianIntegers,
    type: [
      "major",
      "dominant",
      "mixolydian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "fifth diatonic mode",
      "sol mode",
    ],
    characteristics: [
      "bluesy",
      "dominant",
      "funky",
      "rock",
      "energetic",
      "major tonality",
      "strong blues and rock feel",
    ],
    pattern: ["whole", "whole", "half", "whole", "whole", "half", "whole"],
    patternShort: ["W", "W", "H", "W", "W", "H", "W"],
    exampleNotes: ["G", "A", "B", "C", "D", "E", "F", "G"],
    labelsOverride: generateDiatonicChordLabels(mixolydianIntegers, 4),
  },
  aeolian: {
    primaryName: "Minor",
    names: [
      "Minor",
      "Aeolian",
      "Natural Minor Scale",
      "Aeolian Mode",
      "Descending Melodic Minor Scale",
    ],
    intervals: ["1", "2", "♭3", "4", "5", "♭6", "♭7", "8"],
    integers: aeolianIntegers,
    type: [
      "minor",
      "aeolian",
      "natural",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "sixth diatonic mode",
      "la mode",
    ],
    characteristics: [
      "melancholic",
      "sad",
      "somber",
      "introspective",
      "dark",
      "minor tonality",
      "the relative minor of the major scale",
    ],
    pattern: ["whole", "half", "whole", "whole", "half", "whole", "whole"],
    patternShort: ["W", "H", "W", "W", "H", "W", "W"],
    exampleNotes: ["A", "B", "C", "D", "E", "F", "G", "A"],
    labelsOverride: generateDiatonicChordLabels(aeolianIntegers, 5),
  },
  locrian: {
    primaryName: "Locrian",
    names: [
      "Locrian",
      "Minor ♭2 ♭5",
      "Locrian Mode",
    ],
    intervals: ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7", "8"],
    integers: locrianIntegers,
    type: [
      "diminished",
      "locrian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "heptatonic",
      "seventh diatonic mode",
      "ti mode",
    ],
    characteristics: [
      "unsettling",
      "tense",
      "dark",
      "unstable",
      "dissonant",
      "highly dissonant",
      "rarely used as a tonal center",
    ],
    pattern: ["half", "whole", "whole", "half", "whole", "whole", "whole"],
    patternShort: ["H", "W", "W", "H", "W", "W", "W"],
    exampleNotes: ["B", "C", "D", "E", "F", "G", "A", "B"],
    labelsOverride: generateDiatonicChordLabels(locrianIntegers, 6),
  },
} as const;
