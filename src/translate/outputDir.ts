export default function outputDir(base: string, output?: string): string {
  const dir = output ?? base?.split("/").slice(0, -1).join("/");
  if (dir === undefined)
    throw new Error("No output directory given or resolved.");
  return dir;
}
