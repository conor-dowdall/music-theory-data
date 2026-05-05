import type {
  ChordProgressionHarmonySpan,
  ChordProgressionRealization,
  ChordProgressionSection,
} from "../../types/chord-progressions.d.ts";

function span(
  degree: ChordProgressionHarmonySpan["degree"],
  quality: ChordProgressionHarmonySpan["quality"],
  bars: number,
  harmonicFunction?: string,
  cue?: string,
): ChordProgressionHarmonySpan {
  return {
    degree,
    quality,
    bars,
    harmonicFunction,
    cue,
  };
}

function section(
  id: string,
  label: string,
  spans: readonly ChordProgressionHarmonySpan[],
): ChordProgressionSection {
  return { id, label, spans };
}

const tonicDominantLoopBasic: ChordProgressionRealization = {
  id: "tonicDominantLoopBasic",
  familyId: "oneFiveMajor",
  formId: "fourBarLoop",
  primaryName: "I-V starter loop",
  aliases: ["I I V V", "1 1 5 5", "Tonic-dominant loop"],
  summary:
    "A four-bar loop with two bars of tonic followed by two bars of dominant.",
  tags: ["beginner", "loop", "four bar", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference"],
  sections: [
    section("main", "Main", [
      span("1", "M", 2, "tonic"),
      span("5", "M", 2, "dominant"),
    ]),
  ],
};

const tonicDominantLoopWithV7: ChordProgressionRealization = {
  id: "tonicDominantLoopWithV7",
  familyId: "oneFiveMajor",
  formId: "fourBarLoop",
  primaryName: "I-V loop with V7 turnaround",
  aliases: ["I I V V7", "Tonic-dominant loop with V7"],
  summary:
    "A variant of the tonic-dominant loop that sharpens the last bar with a dominant seventh.",
  tags: ["beginner", "loop", "four bar", "major key", "dominant seventh"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("1", "M", 2, "tonic"),
      span("5", "M", 1, "dominant"),
      span("5", "7", 1, "dominant", "resolution setup"),
    ]),
  ],
};

const oneFourLiftLoopBasic: ChordProgressionRealization = {
  id: "oneFourLiftLoopBasic",
  familyId: "oneFourMajor",
  formId: "fourBarLoop",
  primaryName: "I-IV lift loop",
  aliases: ["I I IV IV", "1 1 4 4"],
  summary:
    "A four-bar loop that gives the tonic room before lifting to the subdominant for the back half.",
  tags: ["beginner", "loop", "four bar", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("1", "M", 2, "tonic"),
      span("4", "M", 2, "subdominant"),
    ]),
  ],
};

const oneFourFiveStarterLoop: ChordProgressionRealization = {
  id: "oneFourFiveStarterLoop",
  familyId: "oneFourFiveMajor",
  formId: "fourBarLoop",
  primaryName: "I-IV-V starter loop",
  aliases: ["I I IV V", "1 1 4 5"],
  summary:
    "A practical four-bar I-IV-V loop that gives beginners time on the tonic before moving through IV to V.",
  tags: ["beginner", "loop", "four bar", "major key", "three chord"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training", "songwriting"],
  sections: [
    section("main", "Main", [
      span("1", "M", 2, "tonic"),
      span("4", "M", 1, "subdominant"),
      span("5", "M", 1, "dominant"),
    ]),
  ],
};

const oneFourOneFiveLoopBasic: ChordProgressionRealization = {
  id: "oneFourOneFiveLoopBasic",
  familyId: "oneFourOneFiveLoop",
  formId: "fourBarLoop",
  primaryName: "I-IV-I-V loop",
  aliases: ["1 4 1 5", "Home-away-home loop"],
  summary:
    "A balanced four-bar loop that briefly returns home before ending on the dominant.",
  tags: ["beginner", "loop", "four bar", "major key"],
  idioms: ["common-practice", "pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "songwriting"],
  sections: [
    section("main", "Main", [
      span("1", "M", 1, "tonic"),
      span("4", "M", 1, "subdominant"),
      span("1", "M", 1, "tonic"),
      span("5", "M", 1, "dominant"),
    ]),
  ],
};

const dooWopLoopBasic: ChordProgressionRealization = {
  id: "dooWopLoopBasic",
  familyId: "dooWop",
  formId: "fourBarLoop",
  primaryName: "Doo-wop loop",
  aliases: ["I vi IV V", "50s progression", "1 6 4 5"],
  summary:
    "A classic pop songwriting loop with one bar per chord and a memorable nostalgic contour.",
  tags: ["beginner", "loop", "four bar", "major key", "classic pop"],
  idioms: ["pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "songwriting"],
  sections: [
    section("main", "Main", [
      span("1", "M", 1, "tonic"),
      span("6", "m", 1, "relative minor"),
      span("4", "M", 1, "subdominant"),
      span("5", "M", 1, "dominant"),
    ]),
  ],
};

const axisLoopBasic: ChordProgressionRealization = {
  id: "axisLoopBasic",
  familyId: "axisProgression",
  formId: "fourBarLoop",
  primaryName: "Axis loop",
  aliases: ["I V vi IV", "Axis progression", "Pop-punk progression", "1 5 6 4"],
  summary: "A widely used modern four-chord loop with one bar per harmony.",
  tags: ["beginner", "loop", "four bar", "major key", "modern pop"],
  idioms: ["pop-rock"],
  tonalContext: "major",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "songwriting"],
  sections: [
    section("main", "Main", [
      span("1", "M", 1, "tonic"),
      span("5", "M", 1, "dominant"),
      span("6", "m", 1, "relative minor"),
      span("4", "M", 1, "subdominant"),
    ]),
  ],
};

const majorTwoFiveOneBasic: ChordProgressionRealization = {
  id: "majorTwoFiveOneBasic",
  familyId: "majorTwoFiveOne",
  formId: "fourBarLoop",
  primaryName: "Major ii-V-I loop",
  aliases: ["ii V I", "iim7 V7 IM7", "2 5 1"],
  summary:
    "A four-bar cadence loop with a two-bar tonic resolution, making the turnaround feel complete in practice.",
  tags: ["cadence", "four bar", "major key", "seventh chords"],
  idioms: ["jazz"],
  tonalContext: "major",
  pedagogyLevel: "early-intermediate",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
      span("1", "M7", 2, "tonic"),
    ]),
  ],
};

const minorTwoFiveOneBasic: ChordProgressionRealization = {
  id: "minorTwoFiveOneBasic",
  familyId: "minorTwoFiveOne",
  formId: "fourBarLoop",
  primaryName: "Minor ii-V-i loop",
  aliases: ["iiø V i", "iiø7 V7 i", "2 5 1 minor"],
  summary:
    "A four-bar minor-key cadence loop with a longer tonic arrival that makes repeated practice less abrupt.",
  tags: ["cadence", "four bar", "minor key", "seventh chords"],
  idioms: ["jazz"],
  tonalContext: "minor",
  pedagogyLevel: "early-intermediate",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("2", "ø7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
      span("1", "m", 2, "tonic"),
    ]),
  ],
};

const twelveBarBluesBasic: ChordProgressionRealization = {
  id: "twelveBarBluesBasic",
  familyId: "twelveBarBlues",
  formId: "twelveBarBlues",
  primaryName: "Basic 12-bar blues",
  aliases: ["12 Bar Blues Basic", "Twelve Bar Blues"],
  summary:
    "A basic 12-bar blues with the conventional tonic hold in the opening phrase.",
  tags: ["blues", "beginner", "dominant seventh"],
  idioms: ["blues", "pop-rock"],
  tonalContext: "dominant-blues",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("1", "7", 4, "tonic"),
      span("4", "7", 2, "subdominant"),
      span("1", "7", 2, "tonic"),
      span("5", "7", 1, "dominant"),
      span("4", "7", 1, "subdominant"),
      span("1", "7", 1, "tonic"),
      span("5", "7", 1, "turnaround"),
    ]),
  ],
};

const twelveBarBluesQuickChange: ChordProgressionRealization = {
  id: "twelveBarBluesQuickChange",
  familyId: "twelveBarBlues",
  formId: "twelveBarBlues",
  primaryName: "Quick-change 12-bar blues",
  aliases: ["12 Bar Blues Quick Change", "Quick change blues"],
  summary:
    "A common blues variant that moves to IV in the second bar before returning to I.",
  tags: ["blues", "beginner", "quick change", "dominant seventh"],
  idioms: ["blues", "pop-rock"],
  tonalContext: "dominant-blues",
  pedagogyLevel: "beginner",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("1", "7", 1, "tonic"),
      span("4", "7", 1, "subdominant"),
      span("1", "7", 2, "tonic"),
      span("4", "7", 2, "subdominant"),
      span("1", "7", 2, "tonic"),
      span("5", "7", 1, "dominant"),
      span("4", "7", 1, "subdominant"),
      span("1", "7", 1, "tonic"),
      span("5", "7", 1, "turnaround"),
    ]),
  ],
};

const rhythmChangesBasicAaba: ChordProgressionRealization = {
  id: "rhythmChangesBasicAaba",
  familyId: "rhythmChanges",
  formId: "aaba32",
  primaryName: "Basic rhythm changes",
  aliases: ["Rhythm Changes Basic", "Rhythm changes", "AABA rhythm changes"],
  summary:
    "A basic 32-bar rhythm changes realization with full A sections and a dominant bridge.",
  tags: ["jazz", "aaba", "standard"],
  idioms: ["jazz"],
  tonalContext: "major",
  pedagogyLevel: "intermediate",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("a1", "A1", [
      span("1", "M7", 1, "tonic"),
      span("6", "m7", 1, "prolongation"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
      span("3", "m7", 1, "passing"),
      span("6", "7", 1, "secondary dominant"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
    ]),
    section("a2", "A2", [
      span("1", "M7", 1, "tonic"),
      span("6", "m7", 1, "prolongation"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
      span("3", "m7", 1, "passing"),
      span("6", "7", 1, "secondary dominant"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
    ]),
    section("b", "B", [
      span("3", "7", 2, "secondary dominant"),
      span("6", "7", 2, "secondary dominant"),
      span("2", "7", 2, "secondary dominant"),
      span("5", "7", 2, "dominant"),
    ]),
    section("a3", "A3", [
      span("1", "M7", 1, "tonic"),
      span("6", "m7", 1, "prolongation"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
      span("3", "m7", 1, "passing"),
      span("6", "7", 1, "secondary dominant"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
    ]),
  ],
};

const jazzBluesBasic: ChordProgressionRealization = {
  id: "jazzBluesBasic",
  familyId: "jazzBlues",
  formId: "twelveBarBlues",
  primaryName: "Basic jazz blues",
  aliases: ["Jazz Blues", "Jazz Blues Basic"],
  summary:
    "A 12-bar jazz blues that keeps the form recognizable while adding classic passing and turnaround motion.",
  tags: ["jazz", "blues", "turnaround"],
  idioms: ["jazz", "blues"],
  tonalContext: "mixed",
  pedagogyLevel: "early-intermediate",
  usages: ["practice", "reference", "ear-training"],
  sections: [
    section("main", "Main", [
      span("1", "7", 1, "tonic"),
      span("4", "7", 1, "subdominant"),
      span("1", "7", 2, "tonic"),
      span("4", "7", 1, "subdominant"),
      span("♯4", "°7", 1, "passing"),
      span("1", "7", 1, "tonic"),
      span("6", "7", 1, "secondary dominant"),
      span("2", "m7", 1, "predominant"),
      span("5", "7", 1, "dominant"),
      span("1", "7", 1, "tonic"),
      span("5", "7", 1, "turnaround"),
    ]),
  ],
};

export const chordProgressionRealizations = {
  tonicDominantLoopBasic,
  tonicDominantLoopWithV7,
  oneFourLiftLoopBasic,
  oneFourFiveStarterLoop,
  oneFourOneFiveLoopBasic,
  dooWopLoopBasic,
  axisLoopBasic,
  majorTwoFiveOneBasic,
  minorTwoFiveOneBasic,
  twelveBarBluesBasic,
  twelveBarBluesQuickChange,
  rhythmChangesBasicAaba,
  jazzBluesBasic,
} as const;
