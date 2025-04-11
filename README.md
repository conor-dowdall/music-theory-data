# Music Theory Data

A comprehensive collection of music theory data structures and utilities for working with modes, scales, arpeggios, and chords.

## Features

- **Note Sequences**: Diatonic modes, major variants, and dominant variants
- **Note Labels**: Enharmonic notes and label themes
- **Type Safety**: Full TypeScript support with detailed type definitions
- **Zero Dependencies**: Pure TypeScript/JavaScript implementation
- **Tree-Shakeable**: Import only what you need

## Installation

```typescript
import { noteSequenceThemes } from "jsr:@musodojo/music-theory-data";
```

## Usage Examples

### Working with Note Sequences

```typescript
import { diatonicModes } from "jsr:@musodojo/music-theory-data/note-sequences";

// Get information about the Ionian mode
const ionianMode = diatonicModes.ionian;
console.log(ionianMode.sequence); // [0, 2, 4, 5, 7, 9, 11]
console.log(ionianMode.characteristics); // ["bright", "happy", "stable", ...]
```

### Using Note Labels

```typescript
import { getSequenceNoteLabels } from "jsr:@musodojo/music-theory-data/utils";

// Get chord labels for a mode
const labels = getSequenceNoteLabels("ionian", "triad");
// Returns: [
//     "M",
//     "",
//     "m",
//     "",
//     "m",
//     "M",
//     "",
//     "M",
//     "",
//     "m",
//     "",
//     "o",
//   ]
```

### Type Support

```typescript
import type { NoteSequenceTheme } from "jsr:@musodojo/music-theory-data/types";

// Define a custom theme
const customTheme: NoteSequenceTheme = {
  primaryName: "Custom Scale",
  names: ["Custom Scale", "My Scale"],
  sequence: [0, 2, 4, 5, 7, 9, 11],
  // ...other required properties
};
```

## API Reference

### Note Sequences

- `diatonicModes`: The seven traditional church modes
- `majorVariants`: Major chord/arpeggio variations
- `dominantVariants`: Dominant chord/arpeggio variations

### Note Labels

- `noteLabelThemes`: Different labeling systems (sharp, flat, triads, roman numerals, etc.)
- `enharmonicNotes`: Alternative note name spellings

### Utilities

- `getSequenceNoteLabels`: Get labels for a given sequence and theme
- `getIntegerNotation`: Convert note names to pitch class integers

## Development

```bash
# Install dependencies
deno cache mod.ts

# Run tests
deno test

# Check types
deno check mod.ts
```

## License

This project is licensed under The Unlicense - see the [UNLICENSE](UNLICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
