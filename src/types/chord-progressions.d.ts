import type { Interval } from "../data/labels/note-labels.ts";
import type { ChordQuality } from "./chords.d.ts";

export interface ChordProgressionChange {
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
   */
  readonly bars: number;
}

export interface ChordProgression {
  readonly id: string;
  readonly primaryName: string;
  readonly aliases: readonly string[];
  readonly summary?: string;
  readonly changes: readonly ChordProgressionChange[];
}

export interface ChordProgressionSet {
  readonly id: string;
  readonly displayName: string;
  readonly description: string;
  readonly progressionIds: readonly string[];
}

export interface ChordProgressionTimelineChange extends ChordProgressionChange {
  readonly startBar: number;
  readonly endBar: number;
}
