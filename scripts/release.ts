import { parseArgs } from "@std/cli/parse-args";
import * as semver from "@std/semver";

const args = parseArgs(Deno.args);
const version = args._[0]?.toString();
const message = args._[1]?.toString();

if (!version) {
  console.error("%cError: No version specified.", "color: red");
  console.log("Usage: deno run -A scripts/release.ts <version> [message]");
  Deno.exit(1);
}

try {
  semver.parse(version);
} catch {
  console.error(`%cError: Invalid version format: ${version}`, "color: red");
  Deno.exit(1);
}

// Run quality checks
console.log("Running lint and type checks...");
const lintCmd = new Deno.Command("deno", {
  args: ["lint"],
  stdout: "inherit",
  stderr: "inherit",
});
const lintResult = await lintCmd.output();
if (lintResult.code !== 0) {
  console.error("%cError: specific lint issues found.", "color: red");
  Deno.exit(lintResult.code);
}

const checkCmd = new Deno.Command("deno", {
  args: ["check", "src/mod.ts"],
  stdout: "inherit",
  stderr: "inherit",
});
const checkResult = await checkCmd.output();
if (checkResult.code !== 0) {
  console.error("%cError: type check issues found.", "color: red");
  Deno.exit(checkResult.code);
}

// Check git status (capture output)
const statusCmd = new Deno.Command("git", { args: ["status", "--porcelain"] });
const { stdout } = await statusCmd.output();
if (stdout.length > 0) {
  console.error("%cError: Git working directory is not clean.", "color: red");
  console.log("Please commit or stash changes before releasing.");
  Deno.exit(1);
}

// Update deno.json
const denoJsonPath = "./deno.json";
const denoJsonText = await Deno.readTextFile(denoJsonPath);
const denoJson = JSON.parse(denoJsonText);
const oldVersion = denoJson.version;

if (version === oldVersion) {
  console.error(
    `%cError: Version ${version} is already set in deno.json.`,
    "color: red",
  );
  Deno.exit(1);
}

denoJson.version = version;
await Deno.writeTextFile(
  denoJsonPath,
  JSON.stringify(denoJson, null, 2) + "\n",
);
console.log(`Updated deno.json from ${oldVersion} to ${version}`);

const tagName = `v${version}`;
const tagMessage = `Version ${version}\n\n${
  message || `Release of version ${version}.`
}`;

// Helper to run commands
async function run(cmd: string, args: string[]) {
  const command = new Deno.Command(cmd, {
    args,
    stdout: "inherit",
    stderr: "inherit",
  });
  const { code } = await command.output();
  if (code !== 0) {
    console.error(
      `%cError: Command failed: ${cmd} ${args.join(" ")}`,
      "color: red",
    );
    Deno.exit(code);
  }
}

console.log("Creating commit and tag...");
await run("git", ["add", "deno.json"]);
await run("git", ["commit", "-m", `chore: release ${tagName}`]);
await run("git", ["tag", "-a", tagName, "-m", tagMessage]);

console.log("Pushing to origin...");
await run("git", ["push", "origin", "HEAD"]);
await run("git", ["push", "origin", tagName]);

console.log(`%cSuccess! Released ${tagName}`, "color: green");
