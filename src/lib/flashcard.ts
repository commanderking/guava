import fs from "fs";
import path from "path";
import Papa, { ParseResult } from "papaparse";
import { Card } from "src/features/flashcard/types";
const flashcardDirectory = path.join(process.cwd(), "src/data/flashcard/");

export function getAllFlashcardIds() {
  const fileNames = fs.readdirSync(flashcardDirectory);

  return fileNames
    .filter((filename) => filename.endsWith(".csv"))
    .map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.csv$/, ""),
        },
      };
    });
}

export const getFlashcardCsv = (id: string) => {
  const fullPath = path.join(flashcardDirectory, `${id}.csv`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const csv: ParseResult<Card> = Papa.parse(fileContents, { header: true });

  return csv;
};
