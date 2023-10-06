import fs from "fs";
export default function retrieveBase(base?: string) {
  try {
    return fs.readFileSync(base ?? "").toString();
  } catch (e) {
    return undefined;
  }
}
