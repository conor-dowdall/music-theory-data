import type { PitchInteger } from "./pitch-integer.d.ts";

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
  /** e.g. "C", "D♭, ... */
  flat: NoteLabelTheme;
  /** e.g. "C", "C♯, ... */
  sharp: NoteLabelTheme;
  /** e.g. "1" for perfect unison, "♭2" for flat second. */
  relative: NoteLabelTheme;
  /** e.g. "P1" for perfect unison, "m2" for minor second. */
  quality: NoteLabelTheme;
  /** e.g. "1" for perfect unison, "♭9" for flat second / flat ninth. */
  extension: NoteLabelTheme;
  /** e.g. "do", "re♭", ... */
  fixedDoFlat: NoteLabelTheme;
  /** e.g. "do", "do♯", ... */
  fixedDoSharp: NoteLabelTheme;
  /** e.g. "do", "ra", ...*/
  movableDo: NoteLabelTheme;
  /** e.g. "la", "te", ... */
  movableLa: NoteLabelTheme;
  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "M", "m", "o", "+", ...
   */
  triad: NoteLabelTheme;
  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "I", "ii", "V", ...
   * */
  romanTriad: NoteLabelTheme;
  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "M7", "m7", "7", ...
   */
  seventh: NoteLabelTheme;
  /**
   * Can be overwritten in a specific NoteSequenceTheme using labelsOverride.
   * e.g. "IM7", "iim7", "V7", ...
   */
  romanSeventh: NoteLabelTheme;
}

/**
 * Defines a type that represents the names of the available note label themes.
 */
export type NoteLabelThemeName = keyof NoteLabelThemes;

/**
 * Defines a type that represents a Map of PitchInteger to string.
 * This is used for overriding labels in a specific NoteSequenceTheme.
 */
export type LabelsOverrideMap = Map<PitchInteger, string>;

/**
 * Defines a type that represents the labels override for each note label theme.
 * This allows for partial overrides of the labels in a specific NoteSequenceTheme.
 */
export type LabelsOverride = Partial<
  Record<NoteLabelThemeName, LabelsOverrideMap>
>;
