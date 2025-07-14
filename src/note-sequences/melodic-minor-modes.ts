/**
 * @module
 *
 * This file defines the seven modes of the Melodic Minor scale. These modes are a
 * cornerstone of modern jazz and fusion harmony, offering a rich palette of sounds
 * for improvisation and composition. Each mode is derived by starting the
 * Melodic Minor scale on a different degree.
 *
 * As these are scales, the `intervals` array for each mode includes the
 * octave ("8").
 */

import type {
  MelodicMinorModeKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";

/**
 * A record containing the seven modes of the Melodic Minor scale.
 * Each mode is a `NoteSequenceTheme` with detailed musical properties.
 *
 * The keys of this record are `MelodicMinorModeKey`s, providing type-safe
 * access to each mode definition.
 *
 * @example
 * ```ts
 * import { melodicMinorModes } from "@musodojo/music-theory-data/note-sequences";
 *
 * const lydianAugmented = melodicMinorModes.lydianAugmented;
 * console.log(lydianAugmented.primaryName); // "Lydian Augmented"
 * console.log(lydianAugmented.intervals);   // ["1", "2", "3", "♯4", "♯5", "6", "7", "8"]
 * ```
 *
 * @see {@link NoteSequenceTheme} for the structure of each mode definition.
 * @see {@link MelodicMinorModeKey} for the available mode keys.
 */
export const melodicMinorModes: Record<MelodicMinorModeKey, NoteSequenceTheme> =
  {
    melodicMinor: {
      primaryName: "Melodic Minor",
      names: [
        "Melodic Minor",
        "Jazz Minor",
        "Ascending Melodic Minor Scale",
        "Jazz Minor Scale",
      ],
      intervals: ["1", "2", "♭3", "4", "5", "6", "7", "8"],
      integers: [0, 2, 3, 5, 7, 9, 11],
      type: ["melodic minor mode", "minor", "mode", "scale", "heptatonic"],
      characteristics: [
        "minor tonality",
        "bright",
        "jazzy",
        "classical and jazz harmony",
        "a staple of jazz improvisation",
      ],
      pattern: ["whole", "half", "whole", "whole", "whole", "whole", "half"],
      patternShort: ["W", "H", "W", "W", "W", "W", "H"],
      exampleNotes: ["A", "B", "C", "D", "E", "F♯", "G♯", "A"],
    },
    dorianFlat2: {
      primaryName: "Dorian ♭2",
      names: ["Dorian ♭2", "Phrygian Natural 6", "Phrygian ♮6"],
      intervals: ["1", "♭2", "♭3", "4", "5", "6", "♭7", "8"],
      integers: [0, 1, 3, 5, 7, 9, 10],
      type: ["melodic minor mode", "minor", "mode", "scale", "heptatonic"],
      characteristics: [
        "exotic",
        "mysterious",
        "jazzy",
        "dark but hopeful",
        "exotic and mysterious sound",
      ],
      pattern: ["half", "whole", "whole", "whole", "whole", "half", "whole"],
      patternShort: ["H", "W", "W", "W", "W", "H", "W"],
      exampleNotes: ["A", "B♭", "C", "D", "E", "F♯", "G", "A"],
    },
    lydianAugmented: {
      primaryName: "Lydian Augmented",
      names: ["Lydian Augmented", "Lydian ♯5"],
      intervals: ["1", "2", "3", "♯4", "♯5", "6", "7", "8"],
      integers: [0, 2, 4, 6, 8, 9, 11],
      type: [
        "melodic minor mode",
        "augmented",
        "mode",
        "scale",
        "heptatonic",
        "synthetic scale",
      ],
      characteristics: [
        "dreamy",
        "unsettling",
        "ethereal",
        "sci-fi",
        "used over major 7th sharp 5 chords",
      ],
      pattern: ["whole", "whole", "whole", "whole", "half", "whole", "half"],
      patternShort: ["W", "W", "W", "W", "H", "W", "H"],
      exampleNotes: ["A", "B", "C♯", "D♯", "E♯", "F♯", "G♯", "A"],
      labelsOverride: {
        quality: new Map([
          [6, "A4"],
          [8, "A5"],
        ]),
        relative: new Map([
          [6, "♯4"],
          [8, "♯5"],
        ]),
        extension: new Map([
          [6, "♯11"],
          [8, "♯5"],
        ]),
      },
    },
    lydianDominant: {
      primaryName: "Lydian Dominant",
      names: [
        "Lydian Dominant",
        "Acoustic Scale",
        "Overtone Scale",
        "Mixolydian ♯4",
      ],
      intervals: ["1", "2", "3", "♯4", "5", "6", "♭7", "8"],
      integers: [0, 2, 4, 6, 7, 9, 10],
      type: ["melodic minor mode", "dominant", "mode", "scale", "heptatonic"],
      characteristics: [
        "bright",
        "quirky",
        "bluesy",
        "jazzy",
        "a very common scale in jazz for non-resolving dominant chords",
      ],
      pattern: ["whole", "whole", "whole", "half", "whole", "half", "whole"],
      patternShort: ["W", "W", "W", "H", "W", "H", "W"],
      exampleNotes: ["A", "B", "C♯", "D♯", "E", "F♯", "G", "A"],
      labelsOverride: {
        quality: new Map([[6, "A4"]]),
        relative: new Map([[6, "♯4"]]),
        extension: new Map([[6, "♯11"]]),
      },
    },
    mixolydianFlat6: {
      primaryName: "Mixolydian ♭6",
      names: ["Mixolydian ♭6", "Aeolian Dominant"],
      intervals: ["1", "2", "3", "4", "5", "♭6", "♭7", "8"],
      integers: [0, 2, 4, 5, 7, 8, 10],
      type: ["melodic minor mode", "dominant", "mode", "scale", "heptatonic"],
      characteristics: [
        "bluesy",
        "dark",
        "tense",
        "often used over dominant chords resolving to a minor chord",
      ],
      pattern: ["whole", "whole", "half", "whole", "half", "whole", "whole"],
      patternShort: ["W", "W", "H", "W", "H", "W", "W"],
      exampleNotes: ["A", "B", "C♯", "D", "E", "F", "G", "A"],
    },
    aeolianFlat5: {
      primaryName: "Aeolian ♭5",
      names: ["Aeolian ♭5", "Locrian Natural 2", "Locrian ♮2"],
      intervals: ["1", "2", "♭3", "4", "♭5", "♭6", "♭7", "8"],
      integers: [0, 2, 3, 5, 6, 8, 10],
      type: ["melodic minor mode", "minor", "mode", "scale", "heptatonic"],
      characteristics: [
        "dark",
        "tense",
        "half-diminished",
        "used over half-diminished chords",
      ],
      pattern: ["whole", "half", "whole", "half", "whole", "whole", "whole"],
      patternShort: ["W", "H", "W", "H", "W", "W", "W"],
      exampleNotes: ["A", "B", "C", "D", "E♭", "F", "G", "A"],
    },
    altered: {
      primaryName: "Altered Scale",
      names: ["Altered Scale", "Super Locrian", "Altered Dominant Scale"],
      intervals: ["1", "♭2", "♭3", "♭4", "♭5", "♭7", "8"],
      integers: [0, 1, 3, 4, 6, 8, 10],
      type: ["melodic minor mode", "dominant", "mode", "scale", "heptatonic"],
      characteristics: [
        "tense",
        "dissonant",
        "jazzy",
        "maximum tension over a dominant chord",
        "contains many altered extensions (b9, #9, b5, #5)",
      ],
      pattern: ["half", "whole", "half", "whole", "whole", "whole", "whole"],
      patternShort: ["H", "W", "H", "W", "W", "W", "W"],
      exampleNotes: ["A", "B♭", "C", "D♭", "E♭", "F", "G"],
      labelsOverride: {
        quality: new Map([[4, "d4"]]),
        relative: new Map([[4, "♭4"]]),
        extension: new Map([
          [3, "♯9"],
          [6, "♯11"],
        ]),
      },
    },
  } as const;
