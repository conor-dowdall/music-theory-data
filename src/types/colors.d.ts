export type Color = string | null;

export type ColorGroup = [
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
  Color,
];

export interface ColorCollection {
  name: string;
  description: string;
  relative: boolean;
  colors: ColorGroup;
}

export type ColorCollectionKey =
  | "musoDojo"
  | "musoDojoRoot"
  | "musoDojoRootAndFifth"
  | "boomwhackers";
