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

import type { NoteInteger } from "../types/note-labels.d.ts";
import type {
  MelodicMinorModeKey,
  NoteSequenceTheme,
} from "../types/note-sequences.d.ts";
import { generateMelodicMinorLabelsOverrideChords } from "../utils/chord-label-generators.ts";

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

const melodicMinorIntegers: NoteInteger[] = [0, 2, 3, 5, 7, 9, 11];
const dorianFlat2Integers: NoteInteger[] = [0, 1, 3, 5, 7, 9, 10];
const lydianAugmentedIntegers: NoteInteger[] = [0, 2, 4, 6, 8, 9, 11];
const lydianDominantIntegers: NoteInteger[] = [0, 2, 4, 6, 7, 9, 10];
const mixolydianFlat6Integers: NoteInteger[] = [0, 2, 4, 5, 7, 8, 10];
const aeolianFlat5Integers: NoteInteger[] = [0, 2, 3, 5, 6, 8, 10];
const alteredIntegers: NoteInteger[] = [0, 1, 3, 4, 6, 8, 10];

export const melodicMinorModes: Record<MelodicMinorModeKey, NoteSequenceTheme> =
  {
    melodicMinor: {
      primaryName: "Melodic Minor",
      names: [
        "Melodic Minor",
        "Jazz Minor",
        "Ascending Melodic Minor Scale",
        "Jazz Minor Scale",
        "Minor Ionian",
        "Ionian ♭3",
        "Ionian Flat Third",
        "Major Scale with Minor Third",
        "Dorian Major 7",
      ],
      intervals: ["1", "2", "♭3", "4", "5", "6", "7", "8"],
      integers: melodicMinorIntegers,
      type: ["melodic minor mode", "minor", "mode", "scale", "heptatonic"],
      characteristics: [
        "minor tonality",
        "minor scale start, major scale finish",
        "jazz and classical music",
        "classical: raised 6th and 7th degrees when ascending",
        "classical: natural minor / aeolian mode when descending",
        "jazz: raised 6th and 7th degrees in both directions",
        "classical and jazz harmony",
        "a staple of jazz improvisation",
        "first mode of melodic minor",
      ],
      pattern: ["whole", "half", "whole", "whole", "whole", "whole", "half"],
      patternShort: ["W", "H", "W", "W", "W", "W", "H"],
      exampleNotes: ["A", "B", "C", "D", "E", "F♯", "G♯", "A"],
      labelsOverride: generateMelodicMinorLabelsOverrideChords(
        melodicMinorIntegers,
        0,
      ),
    },
    dorianFlat2: {
      primaryName: "Dorian ♭2",
      names: [
        "Dorian ♭2",
        "Dorian Flat Second",
        "Phrygian ♮6",
        "Phrygian Natural Sixth",
        "Phrygian Raised Sixth",
      ],
      intervals: ["1", "♭2", "♭3", "4", "5", "6", "♭7", "8"],
      integers: dorianFlat2Integers,
      type: ["melodic minor mode", "minor", "mode", "scale", "heptatonic"],
      characteristics: [
        "exotic",
        "mysterious",
        "used in jazz improvisation",
        "dark but hopeful",
        "exotic and mysterious sound",
        "second mode of melodic minor",
      ],
      pattern: ["half", "whole", "whole", "whole", "whole", "half", "whole"],
      patternShort: ["H", "W", "W", "W", "W", "H", "W"],
      exampleNotes: ["A", "B♭", "C", "D", "E", "F♯", "G", "A"],
      labelsOverride: generateMelodicMinorLabelsOverrideChords(
        dorianFlat2Integers,
        1,
      ),
    },
    lydianAugmented: {
      primaryName: "Lydian Augmented",
      names: ["Lydian Augmented", "Lydian ♯5", "Lydian Sharp Fifth"],
      intervals: ["1", "2", "3", "♯4", "♯5", "6", "7", "8"],
      integers: lydianAugmentedIntegers,
      type: [
        "melodic minor mode",
        "augmented",
        "mode",
        "scale",
        "heptatonic",
      ],
      characteristics: [
        "dreamy",
        "unsettling",
        "ethereal",
        "sci-fi",
        "can be used over major chords",
        "used over major 7th sharp 5 chords",
        "third mode of melodic minor",
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
        ...generateMelodicMinorLabelsOverrideChords(lydianAugmentedIntegers, 2),
      },
    },
    lydianDominant: {
      primaryName: "Lydian Dominant",
      names: [
        "Lydian Dominant",
        "Acoustic Scale",
        "Overtone Scale",
        "Lydian ♭7",
        "Lydian Flat Seventh",
        "Mixolydian ♯4",
        "Mixolydian Sharp Fourth",
        "Mixolydian Augmented Fourth",
      ],
      intervals: ["1", "2", "3", "♯4", "5", "6", "♭7", "8"],
      integers: lydianDominantIntegers,
      type: ["melodic minor mode", "dominant", "mode", "scale", "heptatonic"],
      characteristics: [
        "bright",
        "dominant tonality",
        "quirky",
        "bluesy",
        "jazzy",
        "a very common scale in jazz for non-resolving dominant chords",
        "fourth mode of melodic minor",
      ],
      pattern: ["whole", "whole", "whole", "half", "whole", "half", "whole"],
      patternShort: ["W", "W", "W", "H", "W", "H", "W"],
      exampleNotes: ["A", "B", "C♯", "D♯", "E", "F♯", "G", "A"],
      labelsOverride: {
        quality: new Map([[6, "A4"]]),
        relative: new Map([[6, "♯4"]]),
        extension: new Map([[6, "♯11"]]),
        ...generateMelodicMinorLabelsOverrideChords(lydianDominantIntegers, 3),
      },
    },
    mixolydianFlat6: {
      primaryName: "Mixolydian ♭6",
      names: [
        "Mixolydian ♭6",
        "Mixolydian Flat Sixth",
        "Aeolian Dominant",
        "Aeolian ♯3",
        "Aeolian Sharp Third",
        "Descending Melodic Major",
        "Hindu Scale",
      ],
      intervals: ["1", "2", "3", "4", "5", "♭6", "♭7", "8"],
      integers: mixolydianFlat6Integers,
      type: ["melodic minor mode", "dominant", "mode", "scale", "heptatonic"],
      characteristics: [
        "bluesy",
        "dark",
        "tense",
        "often used over dominant chords resolving to a minor chord",
        "fifth mode of melodic minor",
      ],
      pattern: ["whole", "whole", "half", "whole", "half", "whole", "whole"],
      patternShort: ["W", "W", "H", "W", "H", "W", "W"],
      exampleNotes: ["A", "B", "C♯", "D", "E", "F", "G", "A"],
      labelsOverride: generateMelodicMinorLabelsOverrideChords(
        mixolydianFlat6Integers,
        4,
      ),
    },
    aeolianFlat5: {
      primaryName: "Aeolian ♭5",
      names: [
        "Aeolian ♭5",
        "Aeolian Flat Fifth",
        "Locrian ♮2",
        "Locrian Natural Second",
        "Locrian Raised Second",
        "Half-Diminished Scale",
      ],
      intervals: ["1", "2", "♭3", "4", "♭5", "♭6", "♭7", "8"],
      integers: aeolianFlat5Integers,
      type: ["melodic minor mode", "minor", "mode", "scale", "heptatonic"],
      characteristics: [
        "dark",
        "tense",
        "jazz and fusion genres",
        "half-diminished",
        "used over half-diminished chords",
        "sixth mode of melodic minor",
      ],
      pattern: ["whole", "half", "whole", "half", "whole", "whole", "whole"],
      patternShort: ["W", "H", "W", "H", "W", "W", "W"],
      exampleNotes: ["A", "B", "C", "D", "E♭", "F", "G", "A"],
      labelsOverride: generateMelodicMinorLabelsOverrideChords(
        aeolianFlat5Integers,
        5,
      ),
    },
    altered: {
      primaryName: "Altered Scale",
      names: [
        "Altered Scale",
        "Super Locrian Scale",
        "Altered Dominant Scale",
        "Locrian ♭4",
        "Locrian Flat Fourth",
      ],
      intervals: ["1", "♭2", "♭3", "♭4", "♭5", "♭7", "8"],
      integers: alteredIntegers,
      type: ["melodic minor mode", "dominant", "mode", "scale", "heptatonic"],
      characteristics: [
        "tense",
        "dissonant",
        "jazzy",
        "maximum tension over a dominant chord",
        "contains many altered extensions (♭9, ♯9, ♭5, ♯5)",
        "seventh mode of melodic minor",
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
        ...generateMelodicMinorLabelsOverrideChords(alteredIntegers, 6),
      },
    },
  } as const;
