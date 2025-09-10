export type Color = string | null;

export type ColorGroup = readonly [
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

const _colorCollections = {
  musoDojo: {
    name: "Muso Dojo Colors",
    description: "A custom set of colors, designed by Muso Dojo.",
    relative: false,
    colors: [
      "#ED2929",
      "#9F000F",
      "#78C7C7",
      "#00008B",
      "#FF9933",
      "#EBEB19",
      "#286704",
      "#99CC33",
      "#660099",
      "#CC00FF",
      "#BF6A1F",
      "#FF9EE6",
    ],
  },
  musoDojoRoot: {
    name: "Muso Dojo Root",
    description:
      "Use the red color from Muso Dojo's colors on just the root note.",
    relative: true,
    colors: [
      "#ED2929",
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
    ],
  },
  musoDojoRootAndFifth: {
    name: "Muso Dojo Root and Fifth",
    description:
      "Use the red-and-green colors from Muso Dojo's colors on the root-and-fifth notes.",
    relative: true,
    colors: [
      "#ED2929",
      null,
      null,
      null,
      null,
      null,
      null,
      "#99CC33",
      null,
      null,
      null,
      null,
    ],
  },
  boomwhackers: {
    name: "Boomwhackers",
    description: "The colors used by Boomwhackers.",
    relative: false,
    colors: [
      "#E21C48",
      "#F26622",
      "#F99D1C",
      "#FFCC33",
      "#FFF32B",
      "#BCD85F",
      "#62BC47",
      "#009C95",
      "#0071BB",
      "#5E50A1",
      "#8D5BA6",
      "#CF3E96",
    ],
  },
} as const;

export type ColorCollectionKey = keyof typeof _colorCollections;

export const colorCollections: Record<ColorCollectionKey, ColorCollection> =
  _colorCollections;
