import { diatonicModes } from "../src/note-sequences/diatonic-modes.ts";
import { dominantVariants } from "../src/note-sequences/dominant-variants.ts";
import { generateMidiNoteSequence } from "../src/utils/sequence-generators.ts";
import { midiNoteSequenceToIntervals } from "../src/utils/note-conversions.ts";

Deno.test("generateMidiNoteSequence - debug", () => {
  let exercise = generateMidiNoteSequence({
    rootNoteMidi: 60,
    intervals: diatonicModes.ionian.intervals,
    direction: "ascending-descending",
    numOctaves: 2,
    numNotes: 4,
  });
  console.log(
    JSON.stringify(midiNoteSequenceToIntervals(exercise, "relative")),
  );
  console.log(JSON.stringify(exercise));

  exercise = generateMidiNoteSequence({
    rootNoteMidi: 60,
    intervals: diatonicModes.ionian.intervals,
    direction: "ascending",
    includeOctaveIntervals: true,
    numOctaves: 0,
  });
  console.log(
    JSON.stringify(midiNoteSequenceToIntervals(exercise, "relative")),
  );
  console.log(JSON.stringify(exercise));

  exercise = generateMidiNoteSequence({
    rootNoteMidi: 60,
    intervals: dominantVariants.dominant7.intervals,
    direction: "ascending",
    numOctaves: 2,
  });
  console.log(
    JSON.stringify(midiNoteSequenceToIntervals(exercise, "relative")),
  );
  console.log(JSON.stringify(exercise));

  exercise = generateMidiNoteSequence({
    rootNoteMidi: 60,
    intervals: dominantVariants.dominant7.intervals,
    direction: "ascending-descending",
    numOctaves: 1,
  });
  console.log(
    JSON.stringify(midiNoteSequenceToIntervals(exercise, "relative")),
  );
  console.log(JSON.stringify(exercise));
});
