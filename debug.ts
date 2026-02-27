import { transformIntervals } from "./src/utils/intervals.ts";
import { noteCollections } from "./src/data/note-collections/mod.ts";

const intervals = noteCollections.dominant13.intervals;
const result = transformIntervals(intervals, {
  fillChromatic: true,
  mostSimilarScale: "mixolydian",
});
console.log(result);
