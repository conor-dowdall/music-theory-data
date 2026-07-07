# Muso Dojo | Music Theory Data

Typed music-theory data and app helpers for TypeScript and JavaScript.

Use this package when you are building a music app and need reliable theory
building blocks: note names, intervals, scales, modes, chords, chord
progressions, string-instrument tunings, MIDI helpers, and UI-friendly labels.

This is not an audio engine, notation renderer, sequencer, or symbolic score
format. It is the theory-data layer you can build those experiences on top of.

## Is This Useful For My App?

This package is a good fit if you need to:

- turn a root and scale/chord key into notes, intervals, chord names, or roman
  numerals
- browse or search a catalog of scales, modes, chords, dyads, and single-note
  collections
- render compact labels such as `CM`, `F♯ø7`, or `B♭ Major`
- offer selectable 12-slot display layers for fretboards, keyboards, grids, or
  note-color interfaces
- resolve common chord progressions into roman symbols or concrete chord names
- work with typed note names, intervals, chromatic indexes, MIDI note labels,
  note colors, and string-instrument tunings

If you mostly need playback, engraving, MusicXML/MIDI-file parsing, or advanced
composition algorithms, this package is probably only one piece of your stack.

## Installation

```bash
deno add jsr:@musodojo/music-theory-data
```

```bash
npm install @musodojo/music-theory-data
```

```ts
import {
  rootAndNoteCollection,
  searchNoteCollections,
} from "@musodojo/music-theory-data";
```

## Core Idea

Most app workflows start with two values:

```ts
const rootNote = "C";
const noteCollectionKey = "ionian";
```

From those, the `rootAndNoteCollection` focus object gives you the common
derived values an app usually needs.

```ts
import { rootAndNoteCollection } from "@musodojo/music-theory-data";

const identity = rootAndNoteCollection.getIdentity({
  rootNote: "C",
  noteCollectionKey: "major",
});

console.log(identity.label);
// "CM"

console.log(rootAndNoteCollection.getNoteNames("F", "ionian"));
// ["F", "G", "A", "B♭", "C", "D", "E", "F"]

console.log(rootAndNoteCollection.getIntervals("C", "dominant9"));
// ["1", "3", "5", "♭7", "9"]

console.log(rootAndNoteCollection.getRomanTriads("C", "ionian"));
// ["I", "ii", "iii", "IV", "V", "vi", "vii°"]
```

Direct functions such as `getNoteNamesForRootAndNoteCollectionKey` are also
exported. The focus object is there so new developers have one obvious place to
start.

## What Is Included?

| Area                        | Useful exports                                                                             |
| --------------------------- | ------------------------------------------------------------------------------------------ |
| Root + collection workflows | `rootAndNoteCollection`, `getIdentityForRootAndNoteCollection`                             |
| Scale/chord catalog         | `noteCollections`, `groupedNoteCollections`, `searchNoteCollections`, `findNoteCollection` |
| UI conversion layers        | `conversions.rootAndNoteCollection`, `rootAndNoteCollection.conversions`                   |
| Chord progressions          | `chordProgressions`, `getChordProgressionRomanSymbols`, `getChordProgressionChordNames`    |
| Theory labels               | `noteNames`, `rootNotes`, `intervalToIntegerMap`, `chordQualities`                         |
| Parsing and normalization   | `normalizeNoteNameString`, `normalizeRootNoteString`, `normalizeIntervalString`            |
| MIDI and colors             | `formatMidiNote`, `getNoteColorIndex`, `colorCollections`                                  |
| String instruments          | `stringInstruments`, `stringInstrumentTunings`, tuning key groups                          |

For the full exported API, use the
[JSR API documentation](https://jsr.io/@musodojo/music-theory-data/doc). The
`tests/` directory is also a good source of practical examples.

## Browsing The Catalog

`noteCollections` is the central catalog of built-in note, dyad, scale, mode,
arpeggio, and chord pitch collections.

```ts
import {
  noteCollections,
  searchNoteCollections,
} from "@musodojo/music-theory-data";

console.log(noteCollections.ionian.primaryName);
// "Major"

console.log(noteCollections.ionian.intervals);
// ["1", "2", "3", "4", "5", "6", "7", "8"]

const dominantArpeggios = searchNoteCollections({
  query: "dominant",
  type: "arpeggio",
});

console.log(dominantArpeggios.map((collection) => collection.primaryName));
// ["7", "9", "11", "13", "aug7"]
```

Collections include structured metadata such as category, display names,
intervals, integer semitone values, type tags, characteristics, and interval
patterns.

## UI Display Layers

The conversion registry is designed for interfaces that let users choose how to
label the same 12 pitch-class slots: note names, intervals, extensions, chord
names, or roman numerals.

```ts
import { rootAndNoteCollection } from "@musodojo/music-theory-data";

const options = {
  fillChromatic: true,
  rotateToRootInteger0: true,
} as const;

const noteNames = rootAndNoteCollection.conversions.noteNames.get(
  "C",
  "ionian",
  options,
);

console.log(noteNames);
// ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]

console.log(Object.keys(rootAndNoteCollection.conversions));
// ["noteNames", "intervals", "extensions", "compoundIntervals", "triads", "seventhChords", "romanTriads", "romanSeventhChords"]
```

Each conversion entry includes metadata for app UI, including `name`,
`shortName`, `description`, `outputPreview`, `sampleOutput`, and availability.

## Chord Progressions

Progressions are stored as reusable theory data: scale degrees, chord collection
keys, durations, categories, and optional analysis labels.

```ts
import {
  getChordProgressionChordNames,
  getChordProgressionRomanSymbols,
} from "@musodojo/music-theory-data";

console.log(getChordProgressionRomanSymbols("oneSixFourFive"));
// ["I", "vi", "IV", "V"]

console.log(getChordProgressionChordNames("C", "oneSixFourFive"));
// ["CM", "Am", "FM", "GM"]

console.log(getChordProgressionRomanSymbols("autumnLeavesA"));
// ["iim7", "V7", "IM7", "IVM7", "iiø7/vi", "V7/vi", "vi"]
```

Use `getChordProgressionDirectRomanSymbols` when you want symbols derived only
from degree and chord quality. Use `getChordProgressionRomanSymbols` when you
want authored analysis labels, such as secondary-function symbols, where they
exist.

## Package Links

- [JSR package](https://jsr.io/@musodojo/music-theory-data)
- [npm package](https://www.npmjs.com/package/@musodojo/music-theory-data)
- [GitHub Discussions](https://github.com/conor-dowdall/music-theory-data/discussions)
- [GitHub Issues](https://github.com/conor-dowdall/music-theory-data/issues)
