import { z } from "zod";

export function validateBase(string: string) {
  try {
    return localizeFileSchema.parse(JSON.parse(string));
  } catch (e) {
    throw new Error("The given file is not a valid $localize file.");
  }
}

export const localizeTranslationSchema = z.union([
  z.string(),
  z.record(z.string()),
]);

export const localizeFileSchema = z.object({
  locale: z.string(),
  translations: z.record(localizeTranslationSchema),
});

export type LocalizeFile = z.infer<typeof localizeFileSchema>;
