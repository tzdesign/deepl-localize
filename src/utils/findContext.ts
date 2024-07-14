const exec = require("child_process").exec;
const appRoot = require("app-root-path");

export default async function findContext(
  keyword: string
): Promise<string | undefined> {
  const appRootPath = appRoot.toString();
  keyword = keyword.replace(/\{\$.*\}/g, ".*");
  const command = `grep -B 20 -A 20 -r -E "(_|\\$localize)\\\`(${keyword})\\\`" ${appRootPath} --exclude-dir={node_modules,build,coverage,dist} --no-filename`;

  return new Promise((resolve, reject) => {
    try {
      const files = exec(command);
      let context: string = "";
      files.stdout.on("data", (data: string) => {
        const file = data;
        if (file) {
          context += file;
        }
      });
      files.stdout.on("error", (error: string) => {
        reject(error);
      });
      files.stdout.on("end", () => {
        resolve(context);
      });
    } catch (error) {
      console.error("some weird error was happening", error);
      resolve(undefined);
    }
  });
}
