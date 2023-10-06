import { Command } from "commander";

export type TranslationOptions = {
  apiKey?: string;
  output?: string;
  locales: string[];
  base?: string;
  informalLocales: string[];
};

export function appendTranslationOption(command: Command) {
  return command
    .option("-b, --base  <value>", "The base file path.")
    .option(
      "-o, --output <value>",
      "The output folder path. If none is given, the base folder is used."
    )
    .option(
      "-l, --locales  [value...]",
      "Locales to translate to. For example de-DE,fr-FR. If none is given, no translation will happen.",
      []
    );
}
