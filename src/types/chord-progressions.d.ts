import type { Interval } from "../data/labels/note-labels.ts";
import type { NoteCollectionKey } from "../data/note-collections/mod.ts";
import type { ChordQuality } from "./chords.d.ts";

export type ChordProgressionIdiom =
  | "common-practice"
  | "blues"
  | "jazz"
  | "pop-rock";

export type ChordProgressionTonalContext =
  | "major"
  | "minor"
  | "dominant-blues"
  | "mixed";

export interface ChordProgressionDegreeShape {
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
   * Optional override for the canonical chord/arpeggio collection derived from
   * the quality.
   */
  readonly noteCollectionKey?: NoteCollectionKey;
  /**
   * Optional plain-language harmonic role for UI and reference text.
   */
  readonly harmonicFunction?: string;
}

export interface ChordProgressionHarmonySpan
  extends ChordProgressionDegreeShape {
  /**
   * Duration expressed in bars, independent of tempo.
   * This is the core authored timing unit for concrete progressions.
   */
  readonly bars: number;
  /**
   * Optional author note for the span, such as "turnaround".
   */
  readonly cue?: string;
}

export interface ChordProgressionFormSection {
  readonly id: string;
  readonly label: string;
  readonly bars: number;
}

export interface ChordProgressionForm {
  readonly id: string;
  readonly primaryName: string;
  readonly aliases: readonly string[];
  readonly summary: string;
  readonly sections: readonly ChordProgressionFormSection[];
}

export interface ChordProgression {
  readonly id: string;
  readonly formId?: string;
  /**
   * Best human-facing label for the progression.
   */
  readonly primaryName: string;
  /**
   * Conventional alternate names and compact shorthand such as "I I IV V".
   */
  readonly aliases: readonly string[];
  readonly summary?: string;
  readonly idioms?: readonly ChordProgressionIdiom[];
  readonly tonalContext?: ChordProgressionTonalContext;
  readonly spans: readonly ChordProgressionHarmonySpan[];
}

export interface ChordProgressionSet {
  readonly id: string;
  readonly displayName: string;
  readonly description: string;
  readonly progressionIds: readonly string[];
}

export interface ChordProgressionTimelineSpan
  extends ChordProgressionHarmonySpan {
  readonly startBar: number;
  readonly endBar: number;
  readonly sectionId?: string;
  readonly sectionLabel?: string;
}
