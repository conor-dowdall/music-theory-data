/** A fixed 12-element tuple of strings representing each note in the chromatic scale. */
export type NoteLabelGroup = readonly [
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
  string,
];

/** The data interface governing an entire collection array of 12 note labels. */
export interface NoteLabelCollection {
  readonly name: string;
  readonly shortName: string;
  readonly isRelative: boolean;
  readonly labels: NoteLabelGroup;
}

const _noteLabelCollections = {
  flat: {
    name: "Flat Notes",
    shortName: "Flat",
    isRelative: false,
    labels: ["C", "D♭", "D", "E♭", "E", "F", "G♭", "G", "A♭", "A", "B♭", "B"],
  },

  sharp: {
    name: "Sharp Notes",
    shortName: "Sharp",
    isRelative: false,
    labels: ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"],
  },

  fixedDoFlat: {
    name: "Solfege Fixed Do Flat Notes",
    shortName: "Fixed Do Flat",
    isRelative: false,
    labels: [
      "do",
      "re♭",
      "re",
      "mi♭",
      "mi",
      "fa",
      "sol♭",
      "sol",
      "la♭",
      "la",
      "si♭",
      "si",
    ],
  },

  fixedDoSharp: {
    name: "Solfege Fixed Do Sharp Notes",
    shortName: "Fixed Do Sharp",
    isRelative: false,
    labels: [
      "do",
      "do♯",
      "re",
      "re♯",
      "mi",
      "fa",
      "fa♯",
      "sol",
      "sol♯",
      "la",
      "la♯",
      "si",
    ],
  },

  movableDo: {
    name: "Solfege Movable Do Notes",
    shortName: "Movable Do",
    isRelative: true,
    labels: [
      "do",
      "ra",
      "re",
      "me",
      "mi",
      "fa",
      "fi",
      "sol",
      "le",
      "la",
      "te",
      "ti",
    ],
  },

  movableLa: {
    name: "Solfege Movable La Notes",
    shortName: "Movable La",
    isRelative: true,
    labels: [
      "la",
      "te",
      "ti",
      "do",
      "di",
      "re",
      "re",
      "mi",
      "fa",
      "fi",
      "sol",
      "si",
    ],
  },
} as const;

/** A union string of valid keys to lookup different note label collections. */
export type NoteLabelCollectionKey = keyof typeof _noteLabelCollections;

/** A dictionary holding arrays mapping integer semitones into note/solfege names for varied contexts. */
export const noteLabelCollections: Record<
  NoteLabelCollectionKey,
  NoteLabelCollection
> = _noteLabelCollections;
