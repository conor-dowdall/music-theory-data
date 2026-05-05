import type { Interval } from "../data/labels/note-labels.ts";
import type { ChordQuality } from "./chords.d.ts";

export interface ChordProgressionChord {
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
  readonly primaryName: string;
  readonly aliases: readonly string[];
  readonly summary?: string;
  readonly chords: readonly ChordProgressionChord[];
}

export interface ChordProgressionTimelineChord extends ChordProgressionChord {
  readonly startBar: number;
  readonly endBar: number;
}
