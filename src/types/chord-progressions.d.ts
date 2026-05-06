import type { Interval } from "../data/labels/note-labels.ts";
import type { ChordQuality } from "./chords.d.ts";

export interface ChordProgressionChord {
  /**
   * The authored Roman numeral analysis for this chord.
   * e.g. "I", "vi", "V7", "bVII", "V/V".
   */
  readonly romanSymbol: string;
  /**
   * The chord root interval relative to the tonic.
   * e.g. "1", "4", "5", "♭7".
   */
  readonly degree: Interval;
  /**
   * The chord quality or suffix.
   * e.g. "M", "m", "7", "M7", "ø7".
   */
  readonly quality: ChordQuality;
  /**
   * Duration expressed in bars, independent of tempo.
   * May be fractional when a bar contains more than one chord.
   */
  readonly durationInBars: number;
}

export interface ChordProgression {
  readonly commonName?: string;
  readonly chords: readonly ChordProgressionChord[];
}

export interface ChordProgressionBarGroup<TKey extends string = string> {
  readonly totalBars: number;
  readonly progressionKeys: readonly TKey[];
}
