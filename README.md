# Music Theory Data

A comprehensive collection of music theory data structures and utilities for
working with modes, scales, arpeggios, and chords.

## Features

- **Type Safety**: Full TypeScript support with detailed type definitions
- **Zero Dependencies**: Pure TypeScript/JavaScript implementation

## Usage Examples

### General Usage:

```ts
import * as music_theory_data from "jsr:@musodojo/music-theory-data";

// const majorScale: music_theory_data.PitchInteger[]
const majorScale = music_theory_data.diatonicModes.ionian.integers;
console.log("Major Scale Note Sequence", majorScale);

// const melodicMinorTheme: music_theory_data.NoteSequenceTheme
const melodicMinorTheme = music_theory_data.allNoteSequenceThemes.melodicMinor;
console.log("Melodic Minor Note Sequence Theme", melodicMinorTheme);
```

### Working with Diatonic Note Sequences

```ts
import { diatonicModes } from "jsr:@musodojo/music-theory-data";

// Get information about the Ionian mode
const ionianMode = diatonicModes.ionian;
console.log(ionianMode.integers); // [0, 2, 4, 5, 7, 9, 11]
console.log(ionianMode.characteristics); // ["bright", "happy", "stable", ...]
```

### Using Note Labels

```ts
import { getNoteSequenceLabels } from "jsr:@musodojo/music-theory-data";

// Get the triad chord labels for ionian mode
const labels = getNoteSequenceLabels("ionian", "triad");
// Returns: ["M", "", "m", "", "m", "M", "", "M", "", "m", "", "o"]
```
