import type { DominantVariants } from "../../types/dominant-variants.d.ts";

export const dominantVariants: DominantVariants = {
  dominant7: {
    primaryName: "7",
    names: ["7", "Dominant 7th"],
    sequence: [0, 4, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: [
      "unstable",
      "bluesy",
      "flat seventh",
      "authentic cadence",
    ],
    pattern: ["major third", "minor third", "minor third"],
    patternShort: ["M3", "m3", "m3"],
    degrees: ["1", "3", "5", "♭7"],
    exampleNotes: ["C", "E", "G", "B♭"],
  },
  dominant9: {
    primaryName: "9",
    names: ["9", "Dominant 9th"],
    sequence: [0, 2, 4, 7, 10],
    type: ["dominant", "major", "chord", "arpeggio"],
    characteristics: ["unstable", "bluesy", "flat seventh"],
    pattern: ["major third", "minor third", "minor third", "major third"],
    patternShort: ["M3", "m3", "m3", "M3"],
    degrees: ["1", "3", "5", "♭7", "9"],
    exampleNotes: ["C", "E", "G", "B♭", "D"],
    labelsOverride: {
      quality: new Map([[2, "M9"]]),
      relative: new Map([[2, "9"]]),
    },
  },
};
