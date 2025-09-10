import type { Interval, NoteInteger } from "../data/labels/note-labels.ts";

export interface NoteCollection {
  readonly primaryName: string;
  readonly names: readonly string[];
  readonly intervals: readonly Interval[];
  readonly integers: readonly NoteInteger[];
  readonly rotation?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  readonly type: readonly string[];
  readonly characteristics: readonly string[];
  readonly pattern: readonly string[];
  readonly patternShort: readonly string[];
}
