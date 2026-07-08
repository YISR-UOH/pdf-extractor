import type { TextItem } from "pdfjs-dist/types/src/display/api";
import workerUrl from "pdfjs-dist/build/pdf.worker.mjs?url";
import type { ExtractedPage } from "../types/pdf";

function itemToText(item: unknown): string {
  if (typeof item === "object" && item !== null && "str" in item) {
    return (item as TextItem).str;
  }

  return "";
}

function itemEndsLine(item: unknown): boolean {
  return (
    typeof item === "object" &&
    item !== null &&
    "hasEOL" in item &&
    Boolean((item as TextItem & { hasEOL?: boolean }).hasEOL)
  );
}

export async function extractPdfByPage(file: File): Promise<ExtractedPage[]> {
  // 1. Importamos dinámicamente pdfjs-dist justo cuando se ejecuta la función
  const { GlobalWorkerOptions, getDocument } = await import("pdfjs-dist");

  // 2. Asignamos el worker (solo la primera vez que se ejecute será necesario, pero no rompe hacerlo siempre)
  GlobalWorkerOptions.workerSrc = workerUrl;

  const bytes = new Uint8Array(await file.arrayBuffer());
  const loadingTask = getDocument({ data: bytes });
  const pdf = await loadingTask.promise;

  const pages: ExtractedPage[] = [];

  for (let index = 1; index <= pdf.numPages; index += 1) {
    const page = await pdf.getPage(index);
    const textContent = await page.getTextContent();
    const rawLines: string[] = [];
    let currentLine = "";

    for (const item of textContent.items) {
      const piece = itemToText(item);

      if (piece.length > 0) {
        currentLine += piece;
      }

      if (itemEndsLine(item)) {
        const normalizedLine = currentLine.trim();

        if (normalizedLine.length > 0) {
          rawLines.push(normalizedLine);
        }

        currentLine = "";
      } else if (piece.length > 0) {
        currentLine += " ";
      }
    }

    const trailingLine = currentLine.trim();

    if (trailingLine.length > 0) {
      rawLines.push(trailingLine);
    }

    const rawText = rawLines.join("\n");

    pages.push({
      pageNumber: index,
      rawLines,
      rawText,
      parsedLines: rawLines,
      parsedText: rawText,
    });
  }

  return pages;
}
