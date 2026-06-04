import fs from "node:fs";
import path from "node:path";

export const readme = fs.readFileSync(
  path.join("src", "content", "nextjs", "16.2.6", "full.md"),
  "utf8",
);
