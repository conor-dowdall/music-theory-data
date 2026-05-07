# Muso Dojo | Music Theory Data

A type-safe TypeScript/JavaScript library of music theory data and helpers for
music apps, education tools, practice tools, and creative coding projects.

It includes typed datasets for notes, intervals, scales, modes, chord pitch
collections, chord progressions, string instrument tunings, note colors, MIDI
helpers, and naming utilities.

## What's Included

- **Note collections:** notes, dyads, scales, modes, arpeggios, and chord pitch
  collections, grouped into families such as diatonic modes, pentatonic
  variants, major/minor/dominant variants, harmonic minor modes, melodic minor
  modes, diminished variants, and augmented variants.
- **Chord progressions:** 4-bar foundational loops, 8-bar loops, and 12-bar
  blues progressions with roman symbols, scale degrees, qualities, and bar
  durations.
- **Labels and theory primitives:** note names, root notes, intervals, chromatic
  indexes, roman numerals, chord qualities, and conversion helpers.
- **Application helpers:** note-name generation, interval transforms, chord
  progression resolution, chord spelling, MIDI helpers, note colors, contrast
  helpers, and string instrument tunings.
- **TypeScript-first API:** exported data, utility functions, and types are
  designed to work well with autocomplete and compile-time checking.

For exhaustive data, types, and function signatures, use the
[JSR API documentation](https://jsr.io/@musodojo/music-theory-data/doc). The
`tests/` directory also contains practical examples of supported behavior.

## Package Registries

- [JSR package](https://jsr.io/@musodojo/music-theory-data)
- [npm package](https://www.npmjs.com/package/@musodojo/music-theory-data)

## Installation

### Deno / JSR

```bash
deno add jsr:@musodojo/music-theory-data
```

```ts
import * as musicTheoryData from "jsr:@musodojo/music-theory-data";
```

### Node.js / npm

```bash
npm install @musodojo/music-theory-data
```

```ts
import * as musicTheoryData from "@musodojo/music-theory-data";
```

## Usage

### Get Note Names

```ts
import * as musicTheoryData from "jsr:@musodojo/music-theory-data";

const aHarmonicMinor = musicTheoryData.getNoteNamesForRootAndNoteCollectionKey(
  "A",
  "harmonicMinor",
);

console.log(aHarmonicMinor);
// ["A", "B", "C", "D", "E", "F", "G♯", "A"]

const fMajor = musicTheoryData.getNoteNamesForRootAndNoteCollectionKey(
  "F",
  "ionian",
);

console.log(fMajor);
// ["F", "G", "A", "B♭", "C", "D", "E", "F"]
```

### Inspect A Note Collection

```ts
import {
  groupedNoteCollections,
  noteCollections,
} from "jsr:@musodojo/music-theory-data";

const ionian = noteCollections.ionian;

console.log(ionian.primaryName);
// "Major"

console.log(ionian.intervals);
// ["1", "2", "3", "4", "5", "6", "7", "8"]

console.log(Object.keys(groupedNoteCollections));
// ["diatonicModes", "pentatonicVariants", ...]
```

Each collection includes structured fields such as names, intervals, integer
notation, type tags, and musical characteristics. See the generated docs or
source files for complete schemas.

### Resolve Chord Progressions

```ts
import {
  chordProgressions,
  getChordProgressionChordNames,
  getChordProgressionRomanSymbols,
  getChordProgressionTotalDurationInBars,
} from "jsr:@musodojo/music-theory-data";

const oneSixFourFive = chordProgressions.oneSixFourFive;

console.log(oneSixFourFive.chords.map((chord) => chord.romanSymbol));
// ["I", "vi", "IV", "V"]

console.log(getChordProgressionRomanSymbols("oneSixFourFive"));
// ["I", "vi", "IV", "V"]

console.log(getChordProgressionChordNames("C", "oneSixFourFive"));
// ["CM", "Am", "FM", "GM"]

console.log(getChordProgressionTotalDurationInBars("twelveBarBlues"));
// 12
```

### Use Note Colors And Chromatic Indexes

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

Note color collections use 12 chromatic slots. Absolute mode treats index `0` as
C; relative mode treats index `0` as the chosen musical root.

## API Documentation

For the full list of available data, types, and utility functions, see the
**[auto-generated API documentation on JSR](https://jsr.io/@musodojo/music-theory-data/doc)**.

## Community & Support

- Ask questions or share ideas in
  [GitHub Discussions](https://github.com/conor-dowdall/music-theory-data/discussions).
- Report bugs or data issues in
  [GitHub Issues](https://github.com/conor-dowdall/music-theory-data/issues).
