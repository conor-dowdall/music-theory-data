import * as music_theory_data from "jsr:@musodojo/music-theory-data";

Deno.test("get data - debug", () => {
  // const majorScale: music_theory_data.PitchInteger[]
  const majorScale = music_theory_data.diatonicModes.ionian.sequence;
  console.log("Major Scale Note Sequence", majorScale);

  // const melodicMinorTheme: music_theory_data.NoteSequenceTheme
  const melodicMinorTheme =
    music_theory_data.flatNoteSequenceThemes.melodicMinor;
  console.log("Melodic Minor Note Sequence Theme", melodicMinorTheme);
});
