/** Represents the string value of a musical note name (e.g., "C", "D♭", "E♮", "F♯",). */
export type NoteName = string;

/** Represents an array of enharmonically equivalent NoteNames. */
export type NoteNameGroup = NoteName[];

/**
 * Represents an array of 12 NoteNameGroups, where each group contains
 * enharmonic equivalents for a specific pitch class.
 */
export type EnharmonicNotes = [
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup,
  NoteNameGroup
];

/**
 * Defines the structure for a theme of musical note labels. Each theme
 * provides a set of 12 labels for the 12 pitch classes, and indicates
 * whether the labels are relative to a root, or fixed to a pitch class.
 */
export interface NoteLabelTheme {
  name: string;
  shortName: string;
  isRelative: boolean;
  labels: [
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName,
    NoteName
  ];
}

/**
 * Defines an object containing various named themes for musical note labels.
 * The keys of this object are the theme names, and the values are NoteLabelTheme objects.
 */
export interface NoteLabelThemes {
  flat: NoteLabelTheme;
  sharp: NoteLabelTheme;
  relative: NoteLabelTheme;
  quality: NoteLabelTheme;
  extension: NoteLabelTheme;
  fixedDoFlat: NoteLabelTheme;
  fixedDoSharp: NoteLabelTheme;
  movableDo: NoteLabelTheme;
  movableLa: NoteLabelTheme;
}
