import { build, emptyDir } from "@deno/dnt";

const npmOutputDirectory = "./npm";
const publicTypeDeclarations = {
  chords: ["ChordQuality"],
  "chord-progressions": [
    "ChordProgression",
    "ChordProgressionChord",
    "ChordProgressionDegree",
  ],
  midi: ["MidiNoteNumber"],
  "note-collections": ["NoteCollection"],
  "string-instruments": ["StringInstrumentTuning"],
} as const;
const publicUtilityDeclarations = {
  "chord-progressions": [
    "ChordProgressionChordReference",
    "practicalRootNote",
    "pitchClass",
  ],
  "note-names": ["resolvePracticalRootNote"],
} as const;

function assertPublicTypesEmitted(moduleFormat: "esm" | "script") {
  const entryDeclarationPath =
    `${npmOutputDirectory}/${moduleFormat}/src/mod.d.ts`;
  const typeIndexDeclarationPath =
    `${npmOutputDirectory}/${moduleFormat}/src/types/mod.d.ts`;
  const entryDeclaration = Deno.readTextFileSync(entryDeclarationPath);
  const typeIndexDeclaration = Deno.readTextFileSync(typeIndexDeclarationPath);

  if (!entryDeclaration.includes("types/mod")) {
    throw new Error(
      `${entryDeclarationPath} does not publicly export the type index`,
    );
  }

  if (!entryDeclaration.includes("utils/mod")) {
    throw new Error(
      `${entryDeclarationPath} does not publicly export the utility index`,
    );
  }

  for (
    const [moduleName, typeNames] of Object.entries(publicTypeDeclarations)
  ) {
    if (!typeIndexDeclaration.includes(moduleName)) {
      throw new Error(
        `${typeIndexDeclarationPath} does not export ${moduleName}`,
      );
    }

    const typeDeclarationPath =
      `${npmOutputDirectory}/${moduleFormat}/src/types/${moduleName}.d.ts`;
    const typeDeclaration = Deno.readTextFileSync(typeDeclarationPath);

    for (const typeName of typeNames) {
      if (!typeDeclaration.includes(` ${typeName}`)) {
        throw new Error(`${typeDeclarationPath} does not emit ${typeName}`);
      }
    }
  }

  const utilityIndexDeclarationPath =
    `${npmOutputDirectory}/${moduleFormat}/src/utils/mod.d.ts`;
  const utilityIndexDeclaration = Deno.readTextFileSync(
    utilityIndexDeclarationPath,
  );

  for (
    const [moduleName, declarationNames] of Object.entries(
      publicUtilityDeclarations,
    )
  ) {
    if (!utilityIndexDeclaration.includes(moduleName)) {
      throw new Error(
        `${utilityIndexDeclarationPath} does not export ${moduleName}`,
      );
    }

    const utilityDeclarationPath =
      `${npmOutputDirectory}/${moduleFormat}/src/utils/${moduleName}.d.ts`;
    const utilityDeclaration = Deno.readTextFileSync(utilityDeclarationPath);

    for (const declarationName of declarationNames) {
      if (!utilityDeclaration.includes(declarationName)) {
        throw new Error(
          `${utilityDeclarationPath} does not emit ${declarationName}`,
        );
      }
    }
  }
}

await emptyDir(npmOutputDirectory);

const denoJson = JSON.parse(Deno.readTextFileSync("./deno.json"));

await build({
  typeCheck: "both",
  compilerOptions: {
    lib: ["ESNext"],
  },
  entryPoints: ["./src/mod.ts"],
  outDir: npmOutputDirectory,
  shims: {
    deno: true,
  },
  package: {
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
    assertPublicTypesEmitted("esm");
    assertPublicTypesEmitted("script");
    Deno.copyFileSync("LICENSE", "npm/LICENSE");
    Deno.copyFileSync("README.md", "npm/README.md");
  },
});
