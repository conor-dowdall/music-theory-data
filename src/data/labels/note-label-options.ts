// TODO: delete or finish this prototype object containing the available note labelling options
export const noteLabelOptions = {
  noteNames: {
    name: "Note Names",
    description:
      "Generates musically correct note names for a sequence in a given key.",
    type: "function",
    functionName: "getNotes",
    options: {
      orderBy: {
        description: "The order of the returned notes.",
        values: ["intervals", "pitch"],
        defaultValue: "intervals",
      },
    },
  },
  intervals: {
    name: "Intervals",
    description: "The raw musical intervals that define the sequence.",
    type: "property",
    propertyName: "intervals",
  },
  transformedIntervals: {
    name: "Transformed Intervals",
    description:
      "Spreads or compresses intervals to/from their extended forms (e.g., 2nd to 9th).",
    type: "function",
    functionName: "transformIntervals",
    options: {
      transformation: {
        description: "The transformation to apply.",
        values: ["spread", "compress"],
      },
    },
  },
  solfegeMovable: {
    name: "Movable 'Do' Solfege",
    description: "Relative solfege syllables starting from 'Do' on the tonic.",
    type: "labelTheme",
    themeName: "movableDo",
  },
} as const;
