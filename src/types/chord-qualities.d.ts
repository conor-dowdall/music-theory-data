/**
 * @module
 *
 * This module defines the standard qualities for chords (triads and sevenths)
 * used throughout the music theory data. Using these types ensures consistency
 * in how chord qualities are represented.
 */

/**
 * Represents the quality of a triad.
 * - `M`: Major
 * - `m`: Minor
 * - `°`: Diminished
 * - `+`: Augmented
 */
export type TriadQuality = "M" | "m" | "°" | "+";

/**
 * Represents the quality of a seventh chord.
 * - `M7`: Major Seventh
 * - `m7`: Minor Seventh
 * - `7`: Dominant Seventh
 * - `ø7`: Half-Diminished Seventh
 * - `m7♭5`: Minor Seventh with Flat Fifth
 * - `°7`: Diminished Seventh
 * - `m(M7)`: Minor-Major Seventh
 * - `+M7`: Augmented Major Seventh
 * - `M7♯5`: Major Seventh with Sharp Fifth
 */
export type SeventhQuality =
  | "M7"
  | "m7"
  | "7"
  | "ø7"
  | "m7♭5"
  | "°7"
  | "m(M7)"
  | "+M7"
  | "M7♯5";

/**
 * Represents a Roman numeral for a diatonic scale degree.
 */
export type RomanNumeral =
  | "I"
  | "II"
  | "III"
  | "IV"
  | "V"
  | "VI"
  | "VII"
  | "i"
  | "ii"
  | "iii"
  | "iv"
  | "v"
  | "vi"
  | "vii";

/**
 * Represents a Roman numeral for a triad, combining the numeral with its quality.
 * Examples: "I", "ii", "V", "vii°", "III+".
 */
export type RomanTriad = `${RomanNumeral}` | `${RomanNumeral}${TriadQuality}`;

/**
 * Represents a Roman numeral for a seventh chord.
 * Examples: "IM7", "iim7", "V7", "vii°7".
 */
export type RomanSeventh =
  | `${RomanNumeral}`
  | `${RomanNumeral}${SeventhQuality}`;
