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
  chordProgression,
  noteCollection,
  rootAndNoteCollection,
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

Other focused entry points cover the two next most common workflows:

```ts
import { chordProgression, noteCollection } from "@musodojo/music-theory-data";

console.log(noteCollection.getIntervals("major"));
// ["1", "3", "5"]

console.log(chordProgression.getChordNames("C", "oneSixFourFive"));
// ["CM", "Am", "FM", "GM"]
```

| Starting point                  | Use                     | Example                            |
| ------------------------------- | ----------------------- | ---------------------------------- |
| Root + note collection key      | `rootAndNoteCollection` | `getNoteNames("F", "ionian")`      |
| Note collection key/search      | `noteCollection`        | `find({ query: "minor triad" })`   |
| Chord progression key or object | `chordProgression`      | `getRomanSymbols("autumnLeavesA")` |

## What Is Included?

| Area                        | Useful exports                                                                  |
| --------------------------- | ------------------------------------------------------------------------------- |
| Root + collection workflows | `rootAndNoteCollection`, `getIdentityForRootAndNoteCollection`                  |
| Scale/chord catalog         | `noteCollection`, `noteCollections`, `groupedNoteCollections`                   |
| UI display layers           | `rootAndNoteCollection.displayLayers`                                           |
| Chord progressions          | `chordProgression`, `chordProgressions`, `getChordProgressionRomanSymbols`      |
| Theory labels               | `noteNames`, `rootNotes`, `intervalToIntegerMap`, chord classification          |
| Parsing and normalization   | `normalizeNoteNameString`, `normalizeRootNoteString`, `normalizeIntervalString` |
| MIDI and colors             | `isMidiNoteNumber`, `getNoteColorIndex`, `colorCollections`                     |
| String instruments          | `stringInstruments`, `stringInstrumentTunings`, tuning key guards               |
| Meter-neutral rhythm        | `beatSubdivisions`, `getBeatSubdivisionStep`                                    |

For the full exported API, use the
[JSR API documentation](https://jsr.io/@musodojo/music-theory-data/doc). The
`tests/` directory is also a good source of practical examples.

## Browsing The Catalog

`noteCollections` is the central catalog of built-in note, dyad, scale, mode,
arpeggio, and chord pitch collections.

```ts
import {
  noteCollection,
  noteCollections,
  searchNoteCollections,
} from "@musodojo/music-theory-data";

console.log(noteCollections.ionian.primaryName);
// "Major"

console.log(noteCollection.find({ query: "minor triad" })?.primaryName);
// "m"

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

Catalogs that need stable iteration expose ordered key arrays such as
`colorCollectionKeys`, `noteCollectionGroupKeys`, `stringInstrumentKeys`, and
`stringInstrumentTuningKeys`. Matching runtime guards safely validate unknown
persisted values without accepting inherited JavaScript property names.

### Addressing Collection Tones

Use a tone sequence when an app needs authored interval identity, compound
semitone distance, and normalized pitch class together:

```ts
const sequence = noteCollection.getToneSequence("dominant9");
console.log(sequence.tones.at(-1));
// { collectionIndex: 4, semitones: 14, pitchClass: 2, interval: "9", ... }

console.log(noteCollection.getToneAtPosition("major", -1));
// The fifth one cycle below: { collectionIndex: 2, cycle: -1, resolvedSemitones: -5, ... }
```

Positions are signed cyclic addresses over authored tones. They are not
guaranteed to form an ascending pitch sequence: an authored extension can
overlap the following cycle. `createNoteCollectionToneSequence()` provides the
same derivation for custom `NoteCollection` values.

Chord collections additionally expose stable musical classification, separate
from application-specific labels such as “Common” or “More”:

```ts
import {
  getChordCollectionClassification,
  getChordCollectionKeysByClassification,
} from "@musodojo/music-theory-data";

console.log(getChordCollectionClassification("augmented7"));
// { family: "augmented", structure: "seventh" }

console.log(getChordCollectionKeysByClassification({
  family: "dominant",
  structure: "extended",
}));
// ["dominant9", "dominant11", "dominant13"]
```

The supported modal harmony systems are compiled from the interval data for
Ionian, harmonic minor, and melodic minor. Canonical APIs return chord
collection keys; suffix and rooted-name APIs render those identities through the
chord catalog:

```ts
import {
  noteCollection,
  rootAndNoteCollection,
} from "@musodojo/music-theory-data";

console.log(noteCollection.getTriadChordCollectionKeys("ionian"));
// ["major", "minor", "minor", "major", "major", "minor", "diminishedTriad"]

console.log(noteCollection.getTriadChordSuffixes("ionian"));
// ["M", "m", "m", "M", "M", "m", "°"]

console.log(rootAndNoteCollection.getTriadChordNames("C", "ionian"));
// ["CM", "Dm", "Em", "FM", "GM", "Am", "B°"]
```

## UI Display Layers

`rootAndNoteCollection.displayLayers` is designed for interfaces that let users
choose how to label the same 12 pitch-class slots: note names, intervals,
extensions, chord names, or roman numerals.

```ts
import { rootAndNoteCollection } from "@musodojo/music-theory-data";

const options = {
  fillChromatic: true,
  rotateToRootInteger0: true,
} as const;

const noteNames = rootAndNoteCollection.displayLayers.noteNames.get(
  "C",
  "ionian",
  options,
);

console.log(noteNames);
// ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"]

console.log(Object.keys(rootAndNoteCollection.displayLayers));
// ["noteNames", "intervals", "extensions", "compoundIntervals", "triads", "seventhChords", "romanTriads", "romanSeventhChords"]
```

Each entry includes metadata for app UI, including `name`, `shortName`,
`description`, `outputPreview`, `sampleOutput`, and availability.

## Chord Progressions

Progression structures contain only a non-empty sequence of relative chord
events. Catalog names and categories are stored separately in progression
definitions.

```ts
import {
  chordProgression,
  chordProgressionDefinitions,
  getChordProgressionChordNames,
  getChordProgressionRomanSymbols,
} from "@musodojo/music-theory-data";

console.log(chordProgression.getRomanSymbols("oneSixFourFive"));
// ["I", "vi", "IV", "V"]

console.log(chordProgressionDefinitions.oneSixFourFive);
// { name: "I–vi–IV–V", category: "commonLoops", progression: { chords: [...] } }

const resolved = chordProgression.resolve("C", "oneSixFourFive");
console.log(resolved.events[1]);
// {
//   eventIndex: 1,
//   chord: { degree: "6", chordCollectionKey: "minor", durationInBars: 1 },
//   reference: { rootNote: "A", practicalRootNote: "A", ... },
//   directRomanSymbol: "vi",
//   romanSymbol: "vi",
//   startInBars: 1,
//   durationInBars: 1,
// }

const timing = chordProgression.getTiming("oneFourOneFiveSplitReturn");
console.log(timing.bars[6].segments);
// Two half-bar segments linked to authored events 6 and 7.

const parsed = chordProgression.parse(persistedValue);
if (!parsed.success) console.log(parsed.issues);

const parsedDefinition = chordProgression.parseDefinition(savedCatalogEntry);
if (!parsedDefinition.success) console.log(parsedDefinition.issues);

console.log(chordProgression.normalizeRootDegree("b3"));
// "♭3"

console.log(getChordProgressionChordNames("C", "oneSixFourFive"));
// ["CM", "Am", "FM", "GM"]

console.log(getChordProgressionRomanSymbols("autumnLeavesA"));
// ["ivm7", "♭VII7", "♭IIIM7", "♭VIM7", "iiø7", "V7", "i"]
```

Use `getChordProgressionDirectRomanSymbols` when you want symbols derived only
from degree and chord quality. Use `getChordProgressionRomanSymbols` when you
want authored analysis labels, such as secondary-function symbols, where they
exist.

Use `chordProgression.resolve()` when an app needs chord references, Roman
symbols, authored events, and bar timing together. Its `events` are the
canonical ordered timeline; each bar contains positioned segments linked back to
those events by `eventIndex`. Use `chordProgression.getTiming()` when rooted
chord data is not needed. `requiredBarDivision` reports the smallest equal
subdivision needed by the authored durations. The model remains independent of
tempo, beats, notation, and playback.

Equal beat subdivisions are similarly meter-neutral. For example,
`getBeatSubdivisionStep("3-per-beat")` returns the exact ratio
`{ numerator: 1, denominator: 3 }`; the package does not decide whether those
steps are triplets, compound-meter pulses, swing, or UI density choices.

Persisted progression data can be checked with `chordProgression.parse()` or
`validateChordProgression()`. Diagnostics identify invalid chord events by
`chordIndex`. Incomplete final bars remain valid; `chordProgression.getTiming()`
reports them through `endsOnBarBoundary` so each application can apply its own
policy. Timelines above 100,000 bars are rejected because the resolved model
materializes its bar segments. Use `chordProgression.parseDefinition()` when
persisted data includes a catalog name, optional category, and nested
progression structure.

## Package Links

- [JSR package](https://jsr.io/@musodojo/music-theory-data)
- [npm package](https://www.npmjs.com/package/@musodojo/music-theory-data)
- [GitHub Discussions](https://github.com/conor-dowdall/music-theory-data/discussions)
- [GitHub Issues](https://github.com/conor-dowdall/music-theory-data/issues)
