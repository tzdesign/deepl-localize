import { Command } from "commander";
import { TranslationOptions } from "../translate/translationOptions";
import outputDir from "../translate/outputDir";
import retrieveBase from "../translate/retrieveBase";
import { localizeFileSchema, validateBase } from "../translate/validateBase";
import fs, { write } from "fs";
import "colors";
import { readMeta, writeMeta } from "../translate/meta";
import outputFilename from "../translate/outputFilename";

export type StaleOptions = Omit<TranslationOptions, "informalLocales"> & {
  dryRun: boolean;
};

export default async function stale(this: Command) {
  const options = this.opts<StaleOptions>();
  console.log(`Your settings:`);
  console.log(`\tBase: ${options.base}`);
  console.log(`\tOutput: ${outputDir(options.base ?? "", options.output)}`);
  console.log(`\tLocales: ${options.locales.join(", ")}`);
  console.log("");

  if (options.base === undefined) throw new Error("No base path given.");

  if (options.locales.length === 0)
    throw new Error("No locales as targets given.");

  const base = retrieveBase(options.base);
  if (base === undefined) throw new Error("No valid base file given.");
  const baseData = validateBase(base);
  const baseKeys = Object.keys(baseData.translations);

  for (const targetLocaleString of options.locales) {
    try {
      const filename = outputFilename(targetLocaleString, {
        base: options.base,
        output: options.output,
      });
      let currentTranslations = localizeFileSchema.parse(
        JSON.parse(fs.readFileSync(filename).toString())
      );

      const staleTranslations = Object.entries(
        currentTranslations.translations
      ).filter(([key]) => baseKeys.includes(key) === false);

      if (staleTranslations.length === 0) {
        continue;
      }

      if (options.dryRun) {
        console.log(
          `${
            "Dry run:".red
          } Stale translations for ${targetLocaleString}:\n${staleTranslations
            .map(([key, value]) => `\t${key} (${value})`)
            .join("\n")}\n`
        );
      } else {
        for (const [key] of staleTranslations) {
          delete currentTranslations.translations[key];
        }
        fs.writeFileSync(
          filename,
          JSON.stringify(currentTranslations, null, 2)
        );
        console.log(
          `Deleted stale translations for ${targetLocaleString}:\n${staleTranslations
            .map(([key, value]) => `\t${key} (${value})`.red)
            .join("\n")}\n`
        );
      }
    } catch (error) {
      console.error(
        `Could not find target locale file for ${targetLocaleString}.`.red
      );
    }
  }

  // Clean up meta

  let meta = readMeta(outputDir(options.base ?? "", options.output));

  for (const [locale, translations] of Object.entries(meta)) {
    for (const [key] of Object.entries(translations)) {
      if (baseKeys.includes(key) === false) {
        delete meta[locale][key];
      }
    }
  }
  writeMeta(meta, outputDir(options.base ?? "", options.output));
}
