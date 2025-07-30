/**
 * @module note-colors
 * A collection of predefined {@link NoteColorTheme} objects, keyed by a unique name.
 * @see NoteColorTheme
 */

import type { NoteColorTheme } from "../types/note-colors.d.ts";

export const noteColorThemes: Record<string, NoteColorTheme> = {
  musoDojo: {
    name: "Muso Dojo",
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
  boomwhackers: {
    name: "Boomwhackers",
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
  rootIsRed: {
    name: "Root is Red",
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
  rootAndFifth: {
    name: "Root and Fifth",
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
};
