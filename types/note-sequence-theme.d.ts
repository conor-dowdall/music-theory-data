import type { PitchInteger } from "./pitch-integer.d.ts";

/**
 * Represents a musical-sequence theme, such as a chord, scale, or mode.
 */
export interface NoteSequenceTheme {
  /**
   * The primary, human-readable name of the theme
   * (e.g., "Major").
   */
  primaryName: string;
  /**
   * An array of names for the theme
   * (e.g., ["Ionian", "Major"]).
   */
  names: string[];
  /**
   * An array of numerical semitone intervals from the root
   * (e.g., [0, 2, 4, 5, 7, 9, 11]).
   */
  sequence: PitchInteger[];
  /**
   * An array of general types this theme belongs to
   * (e.g., ["major", "mode", "scale"]).
   */
  type: string[];
  /**
   * An array of descriptive characteristics of the theme
   *  (e.g., ["bright", "happy"]).
   */
  characteristics: string[];
  /**
   * An array describing the intervallic pattern
   * (e.g., ["whole" "half", ...]).
   */
  pattern: string[];
  /**
   * A short version of the intervallic pattern
   * (e.g., ["W", "H", ...]).
   */
  patternShort: string[];
  /**
   * An array of degree names
   * (e.g., ["1", "2", "3", ...]).
   */
  degrees: string[];
  /**
   * Example notes for the theme
   * (e.g., ["C", "D", "E"]).
   */
  exampleNotes: string[];
  /**
   * Optional overrides for labels associated with different harmonic elements.
   */
  labelsOverride?: {
    /**
     * Optional mapping of pitch integers (representing degrees of the sequence)
     * to custom labels for chord quality
     * (e.g., "M3" for major third, "m3" for minor third).
     */
    quality?: Map<PitchInteger, string>;
    /**
     * Optional mapping of pitch integers to custom labels
     * for the relative interval from the root
     * (e.g., "1" for perfect unison, "♭2" for minor second).
     */
    relative?: Map<PitchInteger, string>;
    /**
     * Optional mapping of pitch integers to custom labels for chord extensions
     * (e.g., "7", "9", "13").
     */
    extension?: Map<PitchInteger, string>;
    /**
     * Optional mapping of pitch integers to custom labels
     * for the triad chord built on that degree
     * (e.g., "M", "m", "o", "+").
     */
    triad?: Map<PitchInteger, string>;
    /**
     * Optional mapping of pitch integers to custom labels
     * for the Roman numeral representation of the triad built on that degree
     * (e.g., "I", "ii", "V").
     */
    romanTriad?: Map<PitchInteger, string>;
    /**
     * Optional mapping of pitch integers to custom labels
     * for the seventh chord built on that degree
     * (e.g., "M7", "m7", "7").
     */
    seventh?: Map<PitchInteger, string>;
    /**
     * Optional mapping of pitch integers to custom labels
     * for the Roman numeral representation of the seventh chord
     * built on that degree
     * (e.g., "IM7", "iim7", "V7").
     */
    romanSeventh?: Map<PitchInteger, string>;
  };
}
