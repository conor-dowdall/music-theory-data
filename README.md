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
- **Chord progressions:** foundational loops, blues changes, and jazz-standard
  forms with musical categories, scale degrees, chord collection keys, bar
  durations, derived roman symbols, and optional analysis labels.
- **Labels and theory primitives:** note names, root notes, intervals, chromatic
  indexes, roman numerals, chord qualities, and conversion helpers.
- **Application helpers:** note-name generation, rooted note-collection labels,
  interval transforms, chord progression resolution, chord spelling, a
  UI-friendly conversion registry, MIDI helpers, note colors, contrast helpers,
  and string instrument tunings.
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

### Use The Conversion Registry

```ts
import {
  conversions,
  getAvailableRootAndNoteCollectionConversions,
} from "jsr:@musodojo/music-theory-data";

const options = {
  fillChromatic: true,
  rotateToRootInteger0: true,
} as const;

const noteNames = conversions.rootAndNoteCollection.noteNames.get(
  "C",
  "ionian",
  options,
);

console.log(noteNames);
// ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]

const availableForMajorChord = getAvailableRootAndNoteCollectionConversions(
  "C",
  "major",
);

console.log(availableForMajorChord.map((entry) => entry.id));
// ["note-names", "intervals", "extensions", "compound-intervals"]

console.log(availableForMajorChord.map((entry) => entry.outputPreview));
// ["C, D♭, D...", "1, ♭2, 2...", "1, ♭9, 9...", "1, ♭9, 9, ♭10..."]
```

The conversion registry is useful when an app needs selectable display layers
for the same root and note collection. Each entry includes UI metadata such as
`name`, `shortName`, `description`, `outputPreview`, `sampleOutput`,
`outputShape`, and whether empty chromatic slots can appear. `outputPreview` is
intended for compact UI subtitles, while `sampleOutput` is a fuller
representative output string. Authored harmony conversions are exposed for modal
collections such as `ionian`, but are filtered out for collections that do not
define modal harmony, such as the `major` triad.

### Format A Rooted Note Collection Label

```ts
import { getRootedNoteCollectionIdentity } from "jsr:@musodojo/music-theory-data";

const cMajorChord = getRootedNoteCollectionIdentity({
  rootNote: "C",
  noteCollectionKey: "major",
});

console.log(cMajorChord.label);
// "CM"

const bFlatMajorScale = getRootedNoteCollectionIdentity({
  rootNote: "Bb",
  noteCollectionKey: "ionian",
});

console.log(bFlatMajorScale.label);
// "B♭ Major"
```

Use this helper when an app needs a compact display identity for a root plus a
note collection. Chords use chord-symbol suffixes without a space, while notes,
dyads, scales, and unknown collection keys use spaced display names.

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
  chordProgressionCategoryGroups,
  chordProgressions,
  getChordProgressionChordNames,
  getChordProgressionKeysForCategory,
  getChordProgressionRomanSymbols,
  getChordProgressionTotalDurationInBars,
} from "jsr:@musodojo/music-theory-data";

const oneSixFourFive = chordProgressions.oneSixFourFive;

console.log(
  oneSixFourFive.chords.map((chord) => [
    chord.degree,
    chord.chordCollectionKey,
  ]),
);
// [["1", "major"], ["6", "minor"], ["4", "major"], ["5", "major"]]

console.log(getChordProgressionRomanSymbols("oneSixFourFive"));
// ["I", "vi", "IV", "V"]

console.log(chordProgressionCategoryGroups.map((group) => group.name));
// ["Common Loops & Sequences", "Cadences", "Blues Forms", "Jazz Cadences & Standards"]

console.log(getChordProgressionKeysForCategory("jazz"));
// ["majorTwoFiveOne", "minorTwoFiveOne", "backdoorTwoFiveOne", ...]

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
