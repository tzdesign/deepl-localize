import outputDir from "./outputDir";
import { TranslationOptions } from "./translationOptions";

export default function outputFilename(
  targetLocaleString: string,
  options: Pick<TranslationOptions, "base" | "output">
): string {
  if (options.base === undefined) throw new Error("No base path given.");
  const dir = outputDir(options.base, options.output);
  const prefix = options.base.includes("message") ? "message-" : "";
  return `${dir}/${prefix}${targetLocaleString}.json`;
}
