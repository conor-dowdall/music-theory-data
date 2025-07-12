import { diatonicModes } from "../src/note-sequences/diatonic-modes.ts";
import { generateMidiNoteSequence } from "../src/utils/sequence-generators.ts";
import { midiNoteSequenceToIntervals } from "../src/utils/note-conversions.ts";

Deno.test("generateMidiNoteSequence - debug", () => {
  const exercise1 = generateMidiNoteSequence(
    60,
    diatonicModes["ionian"].intervals,
    120,
    0,
    diatonicModes["ionian"].intervals.length * 2,
    "ascending-descending",
    true,
  );
  console.log(
    JSON.stringify(midiNoteSequenceToIntervals(exercise1, "relative")),
  );
  console.log(JSON.stringify(exercise1));

  const exercise2 = generateMidiNoteSequence(
    60,
    diatonicModes["ionian"].intervals,
    120,
    0,
    diatonicModes["ionian"].intervals.length * 2 - 1,
    "ascending-descending",
    false,
  );
  console.log(
    JSON.stringify(midiNoteSequenceToIntervals(exercise2, "relative")),
  );
  console.log(JSON.stringify(exercise2));
});
