import { build, emptyDir } from "@deno/dnt";

await emptyDir("./npm");

const denoJson = JSON.parse(Deno.readTextFileSync("./deno.json"));

await build({
  typeCheck: false,
  entryPoints: ["./src/mod.ts"],
  outDir: "./npm",
  shims: {
    // see JS docs for overview and more options
    deno: true,
  },
  package: {
    // package.json properties
    name: denoJson.name,
    version: denoJson.version,
    description:
      "The musician-friendly TypeScript library for scales, modes, chords, and arpeggios.",
    license: "CC0-1.0",
    repository: {
      type: "git",
      url: "git+https://github.com/conor-dowdall/music-theory-data.git",
    },
    bugs: {
      url: "https://github.com/conor-dowdall/music-theory-data/issues",
    },
    author: "Conor Dowdall",
    keywords: [
      "music",
      "theory",
      "enharmonic",
      "scale",
      "mode",
      "chord",
      "arpeggio",
    ],
  },
  postBuild() {
    // steps to run after building and before running the tests
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
