# Music Theory Data

A comprehensive collection of music theory data structures and utilities for
working with modes, scales, arpeggios, and chords.

## Features

- **Note Sequences**: Diatonic modes, major variants, and dominant variants
- **Note Labels**: Enharmonic notes and label themes
- **Type Safety**: Full TypeScript support with detailed type definitions
- **Zero Dependencies**: Pure TypeScript/JavaScript implementation
- **Tree-Shakeable**: Import only what you need

## Installation

```ts
import { noteSequenceThemes } from "jsr:@musodojo/music-theory-data";
```

## Usage Examples

### General Usage:

```ts
import * as music_theory_data from "jsr:@musodojo/music-theory-data";

// const majorScale: music_theory_data.PitchInteger[]
const majorScale = music_theory_data.diatonicModes.ionian.sequence;
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
console.log(ionianMode.sequence); // [0, 2, 4, 5, 7, 9, 11]
console.log(ionianMode.characteristics); // ["bright", "happy", "stable", ...]
```

### Using Note Labels

```ts
import { getNoteSequenceLabels } from "jsr:@musodojo/music-theory-data";

// Get the triad chord labels for ionian mode
const labels = getNoteSequenceLabels("ionian", "triad");
// Returns: ["M", "", "m", "", "m", "M", "", "M", "", "m", "", "o"]
```

### Note Sequences

- `diatonicModes`: The seven traditional church modes
- `majorVariants`: Major chord/arpeggio variations
- `dominantVariants`: Dominant chord/arpeggio variations
- `melodicMinorModes`: The seven modes of the melodic minor scale

### Note Labels

- `noteLabelThemes`: Different labeling systems (sharp, flat, triads, roman
  numerals, etc.)
- `enharmonicNotes`: Alternative note name spellings

### Utilities

- `getNoteSequenceLabels`: Get labels for a given sequence and theme
- `pitchStepToPitchInteger`: Convert note to pitch integer (0-11)
- `pitchStepToMidiNoteNumber`: Convert note to MIDI number
- `noteNameToPitchInteger`: Convert note names to pitch class integers (0-11)
- `searchNoteSequenceThemes`: Search sequences by names and characteristics

## License

This project is licensed under The Unlicense - see the [UNLICENSE](UNLICENSE)
file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
