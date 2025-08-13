export type PitchColor = string | null;

export type PitchColorGroup = [
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
  PitchColor,
];

export interface PitchColorCollection {
  name: string;
  relative: boolean;
  colors: PitchColorGroup;
}
