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

export type ChordProgressionPedagogyLevel =
  | "beginner"
  | "early-intermediate"
  | "intermediate";

export type ChordProgressionUsage =
  | "practice"
  | "reference"
  | "songwriting"
  | "ear-training";

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
   * This is the core authored timing unit for concrete realizations.
   */
  readonly bars: number;
  /**
   * Optional author note for the span, such as "turnaround".
   */
  readonly cue?: string;
}

export interface ChordProgressionSection {
  readonly id: string;
  readonly label: string;
  readonly spans: readonly ChordProgressionHarmonySpan[];
}

export interface ChordProgressionFamily {
  readonly id: string;
  /**
   * Best human-facing label for the family.
   */
  readonly primaryName: string;
  /**
   * Conventional alternate names and compact shorthand such as "I IV V".
   */
  readonly aliases: readonly string[];
  readonly summary: string;
  /**
   * Canonical abstract harmonic identity, without concrete durations.
   */
  readonly formula: readonly ChordProgressionDegreeShape[];
  readonly tags: readonly string[];
  readonly idioms: readonly ChordProgressionIdiom[];
  readonly tonalContext: ChordProgressionTonalContext;
  readonly pedagogyLevel: ChordProgressionPedagogyLevel;
  readonly usages: readonly ChordProgressionUsage[];
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
  readonly tags: readonly string[];
  readonly sections: readonly ChordProgressionFormSection[];
}

export interface ChordProgressionRealization {
  readonly id: string;
  readonly familyId: string;
  readonly formId?: string;
  /**
   * Best human-facing label for the playable realization.
   */
  readonly primaryName: string;
  /**
   * Conventional alternate names and compact shorthand such as "I I IV V".
   */
  readonly aliases: readonly string[];
  readonly summary: string;
  readonly tags: readonly string[];
  readonly idioms: readonly ChordProgressionIdiom[];
  readonly tonalContext: ChordProgressionTonalContext;
  readonly pedagogyLevel: ChordProgressionPedagogyLevel;
  readonly usages: readonly ChordProgressionUsage[];
  readonly sections: readonly ChordProgressionSection[];
}

export interface ChordProgressionCuratedCollection {
  readonly id: string;
  readonly displayName: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly realizationIds: readonly string[];
}

export interface ChordProgressionTimelineSpan
  extends ChordProgressionHarmonySpan {
  readonly sectionId: string;
  readonly sectionLabel: string;
  readonly startBar: number;
  readonly endBar: number;
}
