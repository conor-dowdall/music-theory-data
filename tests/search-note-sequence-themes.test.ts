import { searchNoteSequenceThemes } from "../src/utils/search-note-sequence-themes.ts";

Deno.test("search note sequences - debug", () => {
  const query: string | undefined = "dominant";
  const type: string | undefined = "major";
  const intervals: string | undefined = undefined;

  console.group(
    `\nSearch results for: query: ${query}, type: ${type}, intervals: ${intervals}`,
  );

  const results = searchNoteSequenceThemes({ query, type, intervals });
  results.forEach((result) => {
    // console.log(`\n• ${JSON.stringify(result)}`);
    console.log(`\n• ${result.primaryName}`);
    // console.log(`  Names: ${result.names.join(", ")}`);
    // console.log(`  Type: ${result.type.join(", ")}`);
  });

  console.groupEnd();
  console.log(`\nTotal results: ${results.length}\n`);
});
