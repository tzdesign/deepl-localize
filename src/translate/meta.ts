import { z } from "zod";
import fs from "fs";
export function readMeta(path: string) {
  const metaSchema = z.record(z.record(z.string()));
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path);
    if (!fs.existsSync(`${path}/.meta`)) fs.mkdirSync(`${path}/.meta`);
    if (!fs.existsSync(`${path}/.meta/translations.json`))
      fs.writeFileSync(
        `${path}/.meta/translations.json`,
        JSON.stringify(metaSchema.parse({}))
      );
    const meta = fs.readFileSync(`${path}/.meta/translations.json`).toString();
    return metaSchema.parse(JSON.parse(meta));
  } catch (error) {
    console.error(`Your meta file is not in the correct format.`);
    return metaSchema.parse({});
  }
}

export function writeMeta(meta: ReturnType<typeof readMeta>, path: string) {
  try {
    fs.writeFileSync(
      `${path}/.meta/translations.json`,
      JSON.stringify(meta, null, 2)
    );
  } catch (error) {
    throw new Error("Could not write meta file.");
  }
}
