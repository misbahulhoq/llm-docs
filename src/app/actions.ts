// app/actions.ts
"use server";

import fs from "node:fs/promises";
import path from "node:path";

/**
 * Reads a specific percentage of a file from the beginning.
 * @param library The library folder name
 * @param version The version folder name
 * @param percentage A number between 1 and 100
 */
export async function getLibraryContent(
  library: string,
  version: string,
  percentage?: number,
) {
  // 1. Sanitize and clamp the percentage input between 1 and 100
  const safePercentage = Math.min(Math.max(percentage || 5, 1), 100);

  const filePath = path.join(
    process.cwd(),
    "src",
    "content",
    library,
    version,
    "full.md",
  );
  let fileHandle;

  try {
    // 2. Open the file
    fileHandle = await fs.open(filePath, "r");

    // 3. Get total size in bytes
    const stat = await fileHandle.stat();
    const totalBytes = stat.size;

    // 4. Calculate target bytes based on the custom percentage
    const targetBytes = Math.floor(totalBytes * (safePercentage / 100));

    if (targetBytes === 0) {
      return ""; // File is empty or percentage results in less than 1 byte
    }

    // 5. Allocate memory matching only the target byte chunk
    const buffer = Buffer.alloc(targetBytes);

    // 6. Read from position 0 up to targetBytes
    await fileHandle.read(buffer, 0, targetBytes, 0);

    // 7. Convert to string and safely trim off any partial broken character at the edge
    const rawText = buffer.toString("utf8");
    return rawText.replace(/\s+\S*$/, "");
  } catch (error) {
    console.error(`Error reading ${safePercentage}% of file:`, error);
    throw new Error("Could not read fractional file snippet.");
  } finally {
    // 8. Always close the handle
    if (fileHandle) {
      await fileHandle.close();
    }
  }
}
