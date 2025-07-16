import { searchNoteSequenceThemes } from "../src/utils/search-note-sequence-themes.ts";

// Deno.test("search note sequences - debug", () => {
//   const query: string = "minor";
//   console.log("Query: ", query);
//   const results = searchNoteSequenceThemes(query);
//   results.forEach((result) => {
//     console.log(result.primaryName);
//   });
//   console.log(`\nTotal results: ${results.length}\n`);
// });

Deno.test("search note sequences - debug", () => {
  const query: string = "minor";
  console.group(`\nSearch results for: "${query}"`);

  const results = searchNoteSequenceThemes({ query });
  results.forEach((result) => {
    console.log(`\n• ${JSON.stringify(result)}`);
    // console.log(`\n• ${result.primaryName}`);
    // console.log(`  Names: ${result.names.join(", ")}`);
    // console.log(`  Type: ${result.type.join(", ")}`);
  });

  console.groupEnd();
  console.log(`\nTotal results: ${results.length}\n`);
});
