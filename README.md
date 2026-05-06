# Muso Dojo | Music Theory Data

**Empower your music applications with a comprehensive, type-safe, and
musician-friendly TypeScript/JavaScript library for notes, dyads, modes, scales,
chord pitch collections, chord progression templates, and more.**

## Community & Support

Have a question, a suggestion, or want to report a bug? Get in touch!

- **📢 Ask a Question or Share an Idea:** Use
  [GitHub Discussions](https://github.com/conor-dowdall/music-theory-data/discussions).
- **🐞 Report a Bug or Flaw in the Data:** Open a
  [GitHub Issue](https://github.com/conor-dowdall/music-theory-data/issues).

## Available Note Collections

- ✅ Diatonic Modes
- ✅ Pentatonic Variants
- ✅ Major Variants
- ✅ Minor Variants
- ✅ Dominant Variants
- ✅ Harmonic Minor Modes
- ✅ Melodic Minor Modes
- ✅ Diminished Variants
- ✅ Augmented Variants
- ✅ Other Note Collections, including notes and dyads

## Available Chord Progressions

- ✅ 4-bar foundational loops
- ✅ 8-bar loops
- ✅ 12-bar blues

## Features

- **Fully Typed:** Written in TypeScript with comprehensive type definitions for
  a great developer experience.
- **Deno First, NPM Ready:** A modern Deno module that is also published to npm
  for use in Node.js projects.

### Rich Data Structures

Access detailed information for notes, dyads, scales, modes, chord pitch
collections, chord progression templates, and more, including intervals, integer
notations, and common names.

```ts
// src/data/note-collections/diatonic-modes.ts
// @ts-ignore
const ionian: ModalScaleCollection = {
  category: "scale",
  rotation: 0,
  rotatedScale: "ionian",
  mostSimilarScale: "ionian",
  primaryName: "Major",
  names: ["Major", "Ionian", "Major Scale", "Ionian Mode", "Diatonic Major"],
  intervals: ["1", "2", "3", "4", "5", "6", "7", "8"],
  integers: [0, 2, 4, 5, 7, 9, 11],
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
} as const;
```

### Practical Utility Functions

Helpers for common tasks like generating note names from a root note and a set
of intervals. For the full implementation details, refer to the source file.

```ts
export function getNoteNamesFromRootAndIntervals(
  // @ts-ignore
  rootNote: RootNote,
  intervals: readonly Interval[],
  options: TransformIntervalsOptions = {},
): NoteName[] {
  // This is a simplified representation for documentation purposes.
  // The actual implementation is in src/utils/note-names.ts
  return [];
}
```

## Installation

### Deno / JSR

Install the package from the JSR registry:

```bash
deno add jsr:@musodojo/music-theory-data
```

Then import it into your project:

```ts
import * as music_theory_data from "@musodojo/music-theory-data";
```

### Node.js / npm

Install the package from the npm registry:

```bash
npm install @musodojo/music-theory-data
```

Then import it into your project:

```ts
import * as music_theory_data from "@musodojo/music-theory-data";
```

## Usage Examples

Note: the `tests/` directory contains many useful examples.

The code below shows how to access and print some of the data.

```ts
import * as music_theory_data from "jsr:@musodojo/music-theory-data";

// Get the notes of A Harmonic Minor
const notes1 = music_theory_data.getNoteNamesForRootAndNoteCollectionKey(
  "A",
  "harmonicMinor",
);
console.log(notes1);
// ["A", "B", "C", "D", "E", "F", "G♯", "A"]

// Automatically knows whether to use flats or sharps
const notes2 = music_theory_data.getNoteNamesForRootAndNoteCollectionKey(
  "F",
  "ionian",
);
console.log(notes2);
//  ["F", "G", "A", "B♭", "C", "D", "E", "F"];

// Get the full data structure for the Ionian mode (Major Scale)
const ionian = music_theory_data.noteCollections.ionian;

console.log(ionian.primaryName);
// "Major"

console.log(ionian.intervals);
// ["1", "2", "3", "4", "5", "6", "7", "8"]

// Log an array of all available Note Collection Keys
console.log(Object.keys(music_theory_data.noteCollections));
// ["ionian", "dorian", "phrygian", ...]

// Log an array of all available Grouped Note Collections Keys
console.log(Object.keys(music_theory_data.groupedNoteCollections));
// ["diatonicModes", "pentatonicVariants", ...]

// Get a chord progression
const oneSixFourFive = music_theory_data.chordProgressions.oneSixFourFive;

console.log(oneSixFourFive.chords.map((chord) => chord.romanSymbol));
// ["I", "vi", "IV", "V"]

console.log(oneSixFourFive.chords);
// [
//   { romanSymbol: "I", degree: "1", quality: "M", durationInBars: 1 },
//   { romanSymbol: "vi", degree: "6", quality: "m", durationInBars: 1 },
//   { romanSymbol: "IV", degree: "4", quality: "M", durationInBars: 1 },
//   { romanSymbol: "V", degree: "5", quality: "M", durationInBars: 1 },
// ]

console.log(
  music_theory_data.getChordProgressionRomanSymbols("oneSixFourFive"),
);
// ["I", "vi", "IV", "V"]

console.log(
  music_theory_data.getChordProgressionChordNames(
    "C",
    "oneSixFourFive",
  ),
);
// ["CM", "Am", "FM", "GM"]

console.log(
  music_theory_data.getChordProgressionUniqueChordNames(
    "C",
    "oneFourOneFiveSplitReturn",
  ),
);
// ["CM", "FM", "GM"]

// Chord-change references return one item each time the chord changes in
// progression.chords. Durations are not expanded here.
console.log(
  music_theory_data.getChordProgressionChordChangeReferences(
    "C",
    "oneOneFiveFive",
  ),
);
// [
//   { rootNote: "C", chordName: "CM", noteCollectionKey: "major" },
//   { rootNote: "G", chordName: "GM", noteCollectionKey: "major" },
// ]

// Unique chord references return each distinct chord once, preserving the
// first-seen order from the chord-change list.
console.log(
  music_theory_data.getChordProgressionUniqueChordReferences(
    "C",
    "oneFourOneFiveSplitReturn",
  ),
);
// [
//   { rootNote: "C", chordName: "CM", noteCollectionKey: "major" },
//   { rootNote: "F", chordName: "FM", noteCollectionKey: "major" },
//   { rootNote: "G", chordName: "GM", noteCollectionKey: "major" },
// ]

// Chord references by bar return the song/practice order grouped by bar. A
// 2-bar chord appears in two bars, and split bars contain multiple references.
console.log(
  music_theory_data.getChordProgressionChordReferencesByBar(
    "C",
    "oneOneFiveFive",
  ),
);
// [
//   [{ rootNote: "C", chordName: "CM", noteCollectionKey: "major" }],
//   [{ rootNote: "C", chordName: "CM", noteCollectionKey: "major" }],
//   [{ rootNote: "G", chordName: "GM", noteCollectionKey: "major" }],
//   [{ rootNote: "G", chordName: "GM", noteCollectionKey: "major" }],
// ]

console.log(
  music_theory_data.getChordProgressionChordReferencesByBar(
    "C",
    "oneFourOneFiveSplitReturn",
  )[6],
);
// [
//   { rootNote: "C", chordName: "CM", noteCollectionKey: "major" },
//   { rootNote: "G", chordName: "GM", noteCollectionKey: "major" },
// ]

// Song chord references flatten the bar-structured references into one ordered
// list for apps that want one diagram/card per chord occurrence.
console.log(
  music_theory_data.getChordProgressionSongChordReferences(
    "C",
    "oneOneFiveFive",
  ).map((reference) => reference.chordName),
);
// ["CM", "CM", "GM", "GM"]

// In Muso Dojo, "Each Chord Once" should import
// getChordProgressionUniqueChordReferences. "Full Song Order" should import
// getChordProgressionSongChordReferences, or flatten
// getChordProgressionChordReferencesByBar locally when bar grouping is needed.

console.log(
  music_theory_data.getChordProgressionTotalDurationInBars("twelveBarBlues"),
);
// 12

console.log(
  music_theory_data.getChordProgressionChordReferencesByBar(
    "C",
    "twelveBarBlues",
  ).length,
);
// 12

console.log(
  music_theory_data.getChordProgressionUniqueChordReferences(
    "C",
    "twelveBarBlues",
  ),
);
// [
//   { rootNote: "C", chordName: "C7", noteCollectionKey: "dominant7" },
//   { rootNote: "F", chordName: "F7", noteCollectionKey: "dominant7" },
//   { rootNote: "G", chordName: "G7", noteCollectionKey: "dominant7" },
// ]

console.log(music_theory_data.chordProgressionBarGroups);
// [
//   { totalBars: 4, progressionKeys: ["oneOneFiveFive", ...] },
//   { totalBars: 8, progressionKeys: ["oneFourOneFiveSplitReturn"] },
//   { totalBars: 12, progressionKeys: ["twelveBarBlues", "twelveBarBluesQuickChange"] },
// ]

console.log(music_theory_data.getChordProgressionKeysForTotalBars(12));
// ["twelveBarBlues", "twelveBarBluesQuickChange"]
```

## Note Colors And Chromatic Indexes

Note color collections use 12 chromatic slots. In absolute mode, each index is a
pitch class where index `0` is C and index `7` is G. In relative mode, each
index is measured from a musical root where index `0` is the root and index `7`
is the fifth.

`noteLabelCollections.noteNamesFlat` is the default label set for absolute note
colors, and `noteLabelCollections.intervalsFlat` is the default label set for
relative note colors. `ChromaticIndex` is the shared `0`-to-`11` pitch-class
shape used by chromatic tuples, note labels, root-note integers, and filled
chromatic interval helpers. `ChromaticMode` is the shared `"absolute"` or
`"relative"` mode used by note colors and label collections.

Chromatic indexes must be integers. Helpers such as `normalizeChromaticIndex`
wrap negative or large semitone values into the `0`-to-`11` range, but reject
fractional or non-finite values.

```ts
import {
  colorCollections,
  getNoteColorIndex,
  getNoteColorLabels,
} from "jsr:@musodojo/music-theory-data";

const absoluteIndex = getNoteColorIndex({
  midi: 67,
  mode: "absolute",
});
console.log(absoluteIndex);
// 7, the pitch class G

const relativeIndex = getNoteColorIndex({
  midi: 69,
  mode: "relative",
  rootPitchClass: 2,
});
console.log(relativeIndex);
// 7, A as the fifth above D

console.log(getNoteColorLabels(colorCollections.musoDojoRootAndFifth));
// ["1", "♭2", "2", "♭3", "3", "4", "♭5", "5", "♭6", "6", "♭7", "7"]
```

Color values may be hex strings or `null`. A `null` value means there is
intentionally no semantic color for that pitch or degree; consuming apps should
choose their own visual fallback through theme or UI settings.

Regular note collection interval arrays remain variable length because chords,
dyads, arpeggios, and scales have different natural sizes. Helpers that opt into
`fillChromatic: true` return a fixed 12-slot chromatic tuple.

## API Documentation

For a full list of all available data, types, and utility functions, please see
the
**[auto-generated API documentation on JSR](https://jsr.io/@musodojo/music-theory-data/doc)**.
