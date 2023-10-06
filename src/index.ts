#!/usr/bin/env node
import { Command } from "commander";
import figlet from "figlet";
import translate from "./translate";
import "colors";
import { appendTranslationOption } from "./translate/translationOptions";
import stale from "./stale";

const program = new Command();

console.log(
  figlet.textSync("Deepl $localize", { horizontalLayout: "full" }).rainbow
);

program.version("1.0.0").description("Translate $localize files");

appendTranslationOption(program.command("remove-stale"))
  .option(
    "-d,--dry-run",
    "Just show the stale translations. The script will not remove them.",
    false
  )
  .action(stale);

appendTranslationOption(program.command("translate"))
  .option(
    "-i, --informal-locales  [value...]",
    "Locales to translate less formal. For example de-DE will use du instead of sie.",
    []
  )
  .option(
    "-a,--api-key <value>",
    "The deepl api key. If none is given, the environment variable DEEPL_API_KEY is used."
  )
  .action(translate);

program.parse(process.argv);

process.on("uncaughtException", function (err: Error) {
  console.error("Error: ".red + err.message);
  if (process.env.DEBUG) {
    console.error(err);
  }
});
