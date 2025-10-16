# Muso Dojo | Music Theory Data

**The musician-friendly TypeScript library for modes, scales, chords, and
more.**

> **Note:** This library is currently under review for accuracy. Please verify
> data before use in a critical application.

## Discord

**[Join the Muso Dojo Community on Discord!](https://discord.gg/7nrnVmmH)**

## Verified Note Collections

- ✅ Diatonic Modes
- ✅ Pentatonic Variants
- ✅ Major Variants
- ✅ Minor Variants
- 🛠️ Dominant Variants
- ✅ Harmonic Minor Modes
- ✅ Melodic Minor Modes
- 🛠️ Diminished Variants
- 🛠️ Augmented Variants
- 🛠️ Other Note Collections

## Features

- **Rich Data Structures:** Access detailed information for scales, modes,
  chords, and more, including intervals, integer notations, and common names.
- **Practical Utility Functions:** Helpers for common tasks like generating note
  names from a root note and a collection key.
- **Fully Typed:** Written in TypeScript with comprehensive type definitions for
  a great developer experience.
- **Deno First, NPM Ready:** A modern Deno module that is also published to npm
  for use in Node.js projects.

## Installation

### Deno / JSR

Import directly from JSR in your Deno project:

```ts
import * as music_theory_data from "@musodojo/music-theory-data";
```

or

```ts
import * as music_theory_data from "jsr:@musodojo/music-theory-data";
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
const notes1 = music_theory_data.getNoteNamesFromRootAndCollectionKey(
  "A",
  "harmonicMinor",
);
console.log(notes1);
// ["A", "B", "C", "D", "E", "F", "G♯", "A"]

// Automatically knows whether to use flats or sharps
const notes2 = music_theory_data.getNoteNamesFromRootAndCollectionKey(
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

// Log the array of all available Note Collection Keys
console.log(Object.keys(music_theory_data.noteCollections));
// ["ionian", "dorian", "phrygian", ...]

// Log the array of all available Grouped Note Collections Keys
console.log(Object.keys(music_theory_data.groupedNoteCollections));
// ["diatonicModes", "pentatonicVariants", ...]
```

## API Documentation

For a full list of all available data, types, and utility functions, please see
the
**[auto-generated API documentation on JSR](https://jsr.io/@musodojo/music-theory-data/doc)**.
