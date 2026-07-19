import { build, emptyDir } from "@deno/dnt";

const npmOutputDirectory = "./npm";
const publicTypeDeclarations = {
  chords: [
    "HeptatonicChordCollectionTuple",
    "LowerCaseChordCollectionRomanSuffix",
    "NoteCollectionHarmony",
    "SeventhChordCollectionKey",
    "SeventhChordSuffix",
    "TriadChordCollectionKey",
    "TriadChordSuffix",
    "UpperCaseChordCollectionRomanSuffix",
  ],
  "chord-progressions": [
    "ChordProgression",
    "ChordProgressionChord",
    "ChordProgressionChords",
    "ChordProgressionDefinition",
    "ChordProgressionRomanSymbol",
    "ChordProgressionSecondaryRomanSymbol",
    "ChordRootDegree",
    "ScaleDegreeNumber",
  ],
  midi: ["MidiNoteNumber"],
  "note-collections": [
    "ChordCollectionClassification",
    "ChordCollectionFamily",
    "ChordCollectionStructure",
    "NoteCollection",
  ],
  "string-instruments": ["StringInstrumentTuning"],
} as const;
const publicDataDeclarations = {
  chords: [
    "chordCollectionClassifications",
    "chordCollectionFamilies",
    "chordCollectionKeys",
    "chordCollectionStructures",
    "getChordCollectionClassification",
    "getChordCollectionKeysByClassification",
    "noteCollectionHarmonyByParentKey",
    "seventhChordCollectionKeys",
    "supportedHarmonyParentKeys",
    "triadChordCollectionKeys",
  ],
  "chord-progressions": [
    "chordProgressionDefinitions",
    "chordProgressions",
  ],
} as const;

function hasNamedExport(declaration: string, name: string): boolean {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
  const directDeclaration = new RegExp(
    `\\bexport\\s+(?:declare\\s+)?(?:class|const|enum|function|interface|let|type|var)\\s+${escapedName}\\b`,
    "u",
  );
  const namedReExport = new RegExp(
    `\\bexport\\s+(?:type\\s+)?\\{[^}]*\\b${escapedName}\\b[^}]*\\}`,
    "su",
  );
  return directDeclaration.test(declaration) || namedReExport.test(declaration);
}

const publicUtilityDeclarations = {
  chords: [
    "getSeventhChordCollectionKeysForNoteCollectionKey",
    "getSeventhChordNamesForRootAndNoteCollectionKey",
    "getSeventhChordSuffixesForNoteCollectionKey",
    "getTriadChordCollectionKeysForNoteCollectionKey",
    "getTriadChordNamesForRootAndNoteCollectionKey",
    "getTriadChordSuffixesForNoteCollectionKey",
  ],
  "chord-progressions": [
    "ChordProgressionBar",
    "ChordProgressionBarSegment",
    "ChordProgressionChordReference",
    "ChordProgressionDefinitionIssue",
    "ChordProgressionIssue",
    "ChordProgressionTiming",
    "ParseResult",
    "ResolvedChordProgression",
    "ResolvedChordProgressionEvent",
    "flatChordRootDegrees",
    "getChordProgressionTiming",
    "isChordCollectionKey",
    "isChordProgressionAnalysisRomanSymbol",
    "isChordProgressionRomanSymbol",
    "isChordProgressionSecondaryRomanSymbol",
    "isChordRootDegree",
    "normalizeChordRootDegree",
    "parseChordProgression",
    "parseChordProgressionDefinition",
    "resolveChordProgression",
    "sharpChordRootDegrees",
    "validateChordProgression",
    "validateChordProgressionDefinition",
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
      if (!hasNamedExport(typeDeclaration, typeName)) {
        throw new Error(`${typeDeclarationPath} does not emit ${typeName}`);
      }
    }
  }

  for (
    const [moduleName, declarationNames] of Object.entries(
      publicDataDeclarations,
    )
  ) {
    const dataDeclarationPath =
      `${npmOutputDirectory}/${moduleFormat}/src/data/${moduleName}/mod.d.ts`;
    const dataDeclaration = Deno.readTextFileSync(dataDeclarationPath);

    for (const declarationName of declarationNames) {
      if (!hasNamedExport(dataDeclaration, declarationName)) {
        throw new Error(
          `${dataDeclarationPath} does not emit ${declarationName}`,
        );
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
      if (!hasNamedExport(utilityDeclaration, declarationName)) {
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
