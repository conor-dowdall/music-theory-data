/**
 * @module
 *
 * This file contains definitions for miscellaneous sequences that do not fit into
 * the other categories, such as the Chromatic scale.
 */

import type {
  NoteSequenceTheme,
  OtherSequenceKey,
} from "../types/note-sequences.d.ts";

/**
 * A record containing miscellaneous musical sequences.
 *
 * @see {@link NoteSequenceTheme} for the structure of each sequence definition.
 * @see {@link OtherSequenceKey} for the available sequence keys.
 */
export const otherSequences: Record<OtherSequenceKey, NoteSequenceTheme> = {
  chromatic: {
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
    exampleNotes: [
      "C",
      "C♯",
      "D",
      "D♯",
      "E",
      "F",
      "F♯",
      "G",
      "G♯",
      "A",
      "A♯",
      "B",
      "C",
    ],
  },
  wholeTone: {
    primaryName: "Whole Tone Scale",
    names: [
      "Whole Tone Scale",
    ],
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
    pattern: ["whole", "whole", "whole", "whole", "whole"],
    patternShort: ["W", "W", "W", "W", "W"],
    exampleNotes: ["C", "D", "E", "F♯", "G♯", "A♯", "C"],
  },
} as const;
