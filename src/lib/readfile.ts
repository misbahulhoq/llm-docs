import fs from "node:fs";
import path from "node:path";

export const readFile = (libraryName: string, version: string) => {
  return fs.readFileSync(
    path.join("src", "content", libraryName, version, "full.md"),
    "utf8",
  );
};
