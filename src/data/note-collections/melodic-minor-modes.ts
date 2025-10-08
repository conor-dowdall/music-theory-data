import type { NoteCollection } from "../../types/note-collections.d.ts";

const melodicMinor: NoteCollection = {
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
  integers: [0, 2, 3, 5, 7, 9, 11],
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
} as const;

const dorianFlat2: NoteCollection = {
  primaryName: "Dorian ♭2",
  names: [
    "Dorian ♭2",
    "Dorian Flat Second",
    "Phrygian ♮6",
    "Phrygian Natural Sixth",
    "Phrygian Raised Sixth",
  ],
  intervals: ["1", "♭2", "♭3", "4", "5", "6", "♭7", "8"],
  integers: [0, 1, 3, 5, 7, 9, 10],
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
} as const;

const lydianAugmented: NoteCollection = {
  primaryName: "Lydian Augmented",
  names: ["Lydian Augmented", "Lydian ♯5", "Lydian Sharp Fifth"],
  intervals: ["1", "2", "3", "♯4", "♯5", "6", "7", "8"],
  integers: [0, 2, 4, 6, 8, 9, 11],
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
} as const;

const lydianDominant: NoteCollection = {
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
  integers: [0, 2, 4, 6, 7, 9, 10],
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
} as const;

const mixolydianFlat6: NoteCollection = {
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
  integers: [0, 2, 4, 5, 7, 8, 10],
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
} as const;

const aeolianFlat5: NoteCollection = {
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
  integers: [0, 2, 3, 5, 6, 8, 10],
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
} as const;

const altered: NoteCollection = {
  primaryName: "Altered Scale",
  names: [
    "Altered Scale",
    "Super Locrian Scale",
    "Altered Dominant Scale",
    "Locrian ♭4",
    "Locrian Flat Fourth",
  ],
  intervals: ["1", "♭2", "♭3", "♭4", "♭5", "♭7", "8"],
  integers: [0, 1, 3, 4, 6, 8, 10],
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
} as const;

export const _melodicMinorModes = {
  melodicMinor,
  dorianFlat2,
  lydianAugmented,
  lydianDominant,
  mixolydianFlat6,
  aeolianFlat5,
  altered,
} as const;

export type MelodicMinorModeKey = keyof typeof _melodicMinorModes;

export const melodicMinorModes: Record<MelodicMinorModeKey, NoteCollection> =
  _melodicMinorModes;
