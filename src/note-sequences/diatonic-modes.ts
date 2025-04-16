/**
 * Diatonic modes are the seven traditional church modes, each starting on a different
 * degree of the major scale. These modes form the foundation of Western music theory
 * and are still widely used in modern music composition.
 *
 * Each mode has its own unique interval pattern and characteristic sound:
 * - Ionian (Major): The familiar major scale
 * - Dorian: Minor scale with raised 6th
 * - Phrygian: Minor scale with lowered 2nd
 * - Lydian: Major scale with raised 4th
 * - Mixolydian: Major scale with lowered 7th
 * - Aeolian (Natural Minor): The natural minor scale
 * - Locrian: Minor scale with lowered 2nd and 5th
 *
 * @module
 */

import type { NoteSequenceTheme } from "../types/note-sequences.d.ts";

/**
 * Type representing all available diatonic modes.
 * Provides type-safe access to mode properties and ensures
 * all modes follow the NoteSequenceTheme structure.
 *
 * @example
 * ```ts
 * import { diatonicModes, type DiatonicMode } from "@musodojo/music-theory-data/note-sequences";
 *
 * // Type-safe mode access
 * function getDiatonicMode(id: DiatonicMode) {
 *   return diatonicModes[id];
 * }
 *
 * const ionianMode = getDiatonicMode("ionian");    // Valid
 * // @ts-expect-error non-existent mode
 * const invalid = getDiatonicMode("non-existent"); // Type error
 * ```
 */
export type DiatonicMode =
  | "ionian"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian";

/**
 * Diatonic modes are seven musical modes derived from the major scale.
 * @see {@link DiatonicMode} for the type of each mode.
 * @see {@link NoteSequenceTheme} for the structure of each mode.
 */
export const diatonicModes: Record<DiatonicMode, NoteSequenceTheme> = {
  ionian: {
    primaryName: "Major",
    names: ["Major", "Ionian", "Major Scale", "Ionian Mode"],
    sequence: [0, 2, 4, 5, 7, 9, 11],
    type: [
      "major",
      "ionian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "first mode",
      "do mode",
    ],
    characteristics: [
      "bright",
      "happy",
      "stable",
      "uplifting",
      "consonant",
      "western",
      "commonly used western scale",
      "major tonality",
    ],
    pattern: ["whole", "whole", "half", "whole", "whole", "whole", "half"],
    patternShort: ["W", "W", "H", "W", "W", "W", "H"],
    degrees: ["1", "2", "3", "4", "5", "6", "7", "8"],
    exampleNotes: ["C", "D", "E", "F", "G", "A", "B", "C"],
    labelsOverride: {
      triad: new Map([
        [0, "M"],
        [2, "m"],
        [4, "m"],
        [5, "M"],
        [7, "M"],
        [9, "m"],
        [11, "o"],
      ]),
      romanTriad: new Map([
        [0, "I"],
        [2, "ii"],
        [4, "iii"],
        [5, "IV"],
        [7, "V"],
        [9, "vi"],
        [11, "viio"],
      ]),
      seventh: new Map([
        [0, "M7"],
        [2, "m7"],
        [4, "m7"],
        [5, "M7"],
        [7, "7"],
        [9, "m7"],
        [11, "ø7"],
      ]),
      romanSeventh: new Map([
        [0, "IM7"],
        [2, "iim7"],
        [4, "iiim7"],
        [5, "IVM7"],
        [7, "V7"],
        [9, "vim7"],
        [11, "viiø7"],
      ]),
    },
  },
  dorian: {
    primaryName: "Dorian",
    names: [
      "Dorian",
      "Minor ♮6",
      "Minor Raised Sixth",
      "Jazz Minor Variant",
      "Dorian Mode",
    ],
    sequence: [0, 2, 3, 5, 7, 9, 10],
    type: [
      "minor",
      "dorian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "second mode",
      "re mode",
    ],
    characteristics: [
      "soulful",
      "funky",
      "jazzy",
      "hopeful",
      "celtic",
      "folk",
      "medieval",
      "minor feel with a hopeful twist",
      "minor tonality",
    ],
    pattern: ["whole", "half", "whole", "whole", "whole", "half", "whole"],
    patternShort: ["W", "H", "W", "W", "W", "H", "W"],
    degrees: ["1", "2", "♭3", "4", "5", "6", "♭7", "8"],
    exampleNotes: ["D", "E", "F", "G", "A", "B", "C", "D"],
    labelsOverride: {
      triad: new Map([
        [0, "m"],
        [2, "m"],
        [3, "M"],
        [5, "M"],
        [7, "m"],
        [9, "o"],
        [10, "M"],
      ]),
      romanTriad: new Map([
        [0, "i"],
        [2, "ii"],
        [3, "III"],
        [5, "IV"],
        [7, "v"],
        [9, "vio"],
        [10, "VII"],
      ]),
      seventh: new Map([
        [0, "m7"],
        [2, "m7"],
        [3, "M7"],
        [5, "7"],
        [7, "m7"],
        [9, "ø7"],
        [10, "M7"],
      ]),
      romanSeventh: new Map([
        [0, "im7"],
        [2, "iim7"],
        [3, "IIIM7"],
        [5, "IV7"],
        [7, "vm7"],
        [9, "viø7"],
        [10, "VIIM7"],
      ]),
    },
  },
  phrygian: {
    primaryName: "Phrygian",
    names: [
      "Phrygian",
      "Minor ♭2",
      "Minor b2",
      "Minor Flat Second",
      "Spanish Gypsy Scale",
      "Phrygian Mode",
    ],
    sequence: [0, 1, 3, 5, 7, 8, 10],
    type: [
      "minor",
      "phrygian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "third mode",
      "mi mode",
    ],
    characteristics: [
      "exotic",
      "spanish",
      "middle eastern",
      "gypsy",
      "flamenco",
      "tense",
      "tension",
      "mysterious",
      "intense",
      "dark",
      "dramatic",
      "mysterious",
      "darker emotional tones",
      "minor tonality",
    ],
    pattern: ["half", "whole", "whole", "whole", "half", "whole", "whole"],
    patternShort: ["H", "W", "W", "W", "H", "W", "W"],
    degrees: ["1", "♭2", "♭3", "4", "5", "♭6", "♭7", "8"],
    exampleNotes: ["E", "F", "G", "A", "B", "C", "D", "E"],
    labelsOverride: {
      triad: new Map([
        [0, "m"],
        [1, "M"],
        [3, "M"],
        [5, "m"],
        [7, "o"],
        [8, "M"],
        [10, "m"],
      ]),
      romanTriad: new Map([
        [0, "i"],
        [1, "II"],
        [3, "III"],
        [5, "iv"],
        [7, "vo"],
        [8, "VI"],
        [10, "vii"],
      ]),
      seventh: new Map([
        [0, "m7"],
        [1, "M7"],
        [3, "7"],
        [5, "m7"],
        [7, "ø7"],
        [8, "M7"],
        [10, "m7"],
      ]),
      romanSeventh: new Map([
        [0, "im7"],
        [1, "IIM7"],
        [3, "III7"],
        [5, "ivm7"],
        [7, "vø7"],
        [8, "VIM7"],
        [10, "viim7"],
      ]),
    },
  },
  lydian: {
    primaryName: "Lydian",
    names: [
      "Lydian",
      "Major ♯4",
      "Major #4",
      "Major Sharp Fourth",
      "Bright Major",
      "Lydian Mode",
    ],
    sequence: [0, 2, 4, 6, 7, 9, 11],
    type: [
      "major",
      "lydian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "fourth mode",
      "fa mode",
    ],
    characteristics: [
      "dreamy",
      "floating",
      "ethereal",
      "cinematic",
      "expansive",
      "film scores",
      "soundscapes",
      "bright major tonality",
    ],
    pattern: ["whole", "whole", "whole", "half", "whole", "whole", "half"],
    patternShort: ["W", "W", "W", "H", "W", "W", "H"],
    degrees: ["1", "2", "3", "♯4", "5", "6", "7", "8"],
    exampleNotes: ["F", "G", "A", "B", "C", "D", "E", "F"],
    labelsOverride: {
      quality: new Map([[6, "A4"]]),
      relative: new Map([[6, "♯4"]]),
      extension: new Map([[6, "♯11"]]),
      triad: new Map([
        [0, "M"],
        [2, "M"],
        [4, "m"],
        [6, "o"],
        [7, "M"],
        [9, "m"],
        [11, "m"],
      ]),
      romanTriad: new Map([
        [0, "I"],
        [2, "II"],
        [4, "iii"],
        [6, "ivo"],
        [7, "V"],
        [9, "vi"],
        [11, "vii"],
      ]),
      seventh: new Map([
        [0, "M7"],
        [2, "7"],
        [4, "m7"],
        [6, "ø7"],
        [7, "M7"],
        [9, "m"],
        [11, "m7"],
      ]),
      romanSeventh: new Map([
        [0, "IM7"],
        [2, "II7"],
        [4, "iiim7"],
        [6, "ivø7"],
        [7, "VM7"],
        [9, "vim7"],
        [11, "viim7"],
      ]),
    },
  },
  mixolydian: {
    primaryName: "Mixolydian",
    names: [
      "Mixolydian",
      "Major ♭7",
      "Major b7",
      "Major Flat Seventh",
      "Dominant Scale",
      "Mixolydian Mode",
    ],
    sequence: [0, 2, 4, 5, 7, 9, 10],
    type: [
      "major",
      "dominant",
      "mixolydian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "fifth mode",
      "sol mode",
    ],
    characteristics: [
      "folk",
      "bluesy",
      "dominant",
      "funky",
      "rock",
      "energetic",
      "playful",
      "major feel",
      "twist of tension",
      "major tonality",
    ],
    pattern: ["whole", "whole", "half", "whole", "whole", "half", "whole"],
    patternShort: ["W", "W", "H", "W", "W", "H", "W"],
    degrees: ["1", "2", "3", "4", "5", "6", "♭7", "8"],
    exampleNotes: ["G", "A", "B", "C", "D", "E", "F", "G"],
    labelsOverride: {
      triad: new Map([
        [0, "M"],
        [2, "m"],
        [4, "o"],
        [5, "M"],
        [7, "m"],
        [9, "m"],
        [10, "M"],
      ]),
      romanTriad: new Map([
        [0, "I"],
        [2, "ii"],
        [4, "iiio"],
        [5, "IV"],
        [7, "v"],
        [9, "vi"],
        [10, "VII"],
      ]),
      seventh: new Map([
        [0, "7"],
        [2, "m7"],
        [4, "ø7"],
        [5, "M7"],
        [7, "m7"],
        [9, "m7"],
        [10, "M7"],
      ]),
      romanSeventh: new Map([
        [0, "IM7"],
        [2, "iim7"],
        [4, "iiiø7"],
        [5, "IVM7"],
        [7, "vm7"],
        [9, "vim7"],
        [10, "VIIM7"],
      ]),
    },
  },
  aeolian: {
    primaryName: "Minor",
    names: [
      "Minor",
      "Aeolian",
      "Natural Minor Scale",
      "Minor Scale",
      "Aeolian Mode",
      "Descending Melodic Minor Scale",
    ],
    sequence: [0, 2, 3, 5, 7, 8, 10],
    type: [
      "minor ",
      "aeolian",
      "natural",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "sixth mode",
      "la mode",
    ],
    characteristics: [
      "melancholic",
      "sad",
      "somber",
      "introspective",
      "reflective",
      "default minor",
      "commonly used minor scale",
      "minor tonality",
      "dark",
    ],
    pattern: ["whole", "half", "whole", "whole", "half", "whole", "whole"],
    patternShort: ["W", "H", "W", "W", "H", "W", "W"],
    degrees: ["1", "2", "♭3", "4", "5", "♭6", "♭7", "8"],
    exampleNotes: ["A", "B", "C", "D", "E", "F", "G", "A"],
    labelsOverride: {
      triad: new Map([
        [0, "m"],
        [2, "o"],
        [3, "M"],
        [5, "m"],
        [7, "m"],
        [8, "M"],
        [10, "M"],
      ]),
      romanTriad: new Map([
        [0, "i"],
        [2, "iio"],
        [3, "III"],
        [5, "iv"],
        [7, "v"],
        [8, "VI"],
        [10, "VII"],
      ]),
      seventh: new Map([
        [0, "m7"],
        [2, "ø7"],
        [3, "M7"],
        [5, "m7"],
        [7, "m7"],
        [8, "M7"],
        [10, "7"],
      ]),
      romanSeventh: new Map([
        [0, "im7"],
        [2, "iiø7"],
        [3, "IIIM7"],
        [5, "ivm7"],
        [7, "vm7"],
        [8, "VIM7"],
        [10, "VII7"],
      ]),
    },
  },
  locrian: {
    primaryName: "Locrian",
    names: [
      "Locrian",
      "Minor ♭2 ♭5",
      "Minor b2 b5",
      "Minor Flat Second Flat Fifth",
      "Half-Diminished Scale",
      "Locrian Mode",
    ],
    sequence: [0, 1, 3, 5, 6, 8, 10],
    type: [
      "diminished",
      "locrian",
      "mode",
      "scale",
      "church mode",
      "diatonic mode",
      "seventh mode",
      "ti mode",
    ],
    characteristics: [
      "unsettling",
      "tense",
      "dark",
      "unstable",
      "dissonant",
      "eerie",
      "rarely used standalone",
    ],
    pattern: ["half", "whole", "whole", "half", "whole", "whole", "whole"],
    patternShort: ["H", "W", "W", "H", "W", "W", "W"],
    degrees: ["1", "♭2", "♭3", "4", "♭5", "♭6", "♭7", "8"],
    exampleNotes: ["B", "C", "D", "E", "F", "G", "A", "B"],
    labelsOverride: {
      triad: new Map([
        [0, "o"],
        [1, "M"],
        [3, "m"],
        [5, "m"],
        [6, "M"],
        [8, "M"],
        [10, "m"],
      ]),
      romanTriad: new Map([
        [0, "io"],
        [1, "II"],
        [3, "iii"],
        [5, "iv"],
        [6, "V"],
        [8, "VI"],
        [10, "vii"],
      ]),
      seventh: new Map([
        [0, "ø7"],
        [1, "M7"],
        [3, "m7"],
        [5, "m7"],
        [6, "M7"],
        [8, "7"],
        [10, "m7"],
      ]),
      romanSeventh: new Map([
        [0, "iø7"],
        [1, "IIM7"],
        [3, "iiim7"],
        [5, "ivm7"],
        [6, "VM7"],
        [8, "VI7"],
        [10, "viim7"],
      ]),
    },
  },
} as const;
