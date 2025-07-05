import * as music_theory_data from "../src/mod.ts";

Deno.test("get data - debug", () => {
  // const majorScale: music_theory_data.PitchInteger[]
  const majorScale = music_theory_data.diatonicModes.ionian.sequence;
  console.log("Major Scale Note Sequence", majorScale);

  // const melodicMinorTheme: music_theory_data.NoteSequenceTheme
  const melodicMinorTheme =
    music_theory_data.allNoteSequenceThemes.melodicMinor;
  console.log("Melodic Minor Note Sequence Theme", melodicMinorTheme);
});
