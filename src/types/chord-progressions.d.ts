import type { Interval } from "../data/labels/note-labels.ts";
import type { ChordQuality } from "./chords.d.ts";

export type ChordProgressionTemplateCategory =
  | "basic"
  | "pop"
  | "blues"
  | "jazz";

export type ChordProgressionTemplateType = "formula" | "loop" | "form";

export interface ChordProgressionTemplateStep {
  /**
   * The chord root interval relative to the progression tonic.
   * e.g., "1", "4", "5", "♭7".
   */
  readonly interval: Interval;
  /**
   * The chord suffix or quality for this step.
   * e.g., "M", "m", "7", "M7", "ø7".
   */
  readonly quality: ChordQuality;
}

export interface ChordProgressionTemplateSection {
  /**
   * A form label for the section. Simple progressions usually use "Main".
   */
  readonly name: string;
  readonly chords: readonly ChordProgressionTemplateStep[];
}

export interface ChordProgressionTemplate {
  readonly templateType: ChordProgressionTemplateType;
  readonly category: ChordProgressionTemplateCategory;
  readonly primaryName: string;
  readonly names: readonly string[];
  readonly type: readonly string[];
  readonly characteristics: readonly string[];
  readonly sections: readonly ChordProgressionTemplateSection[];
}
