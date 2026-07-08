import type { ExtractionReport, PageParser } from "../types/pdf";
import { extractPdfByPage } from "./pdfTextExtractor";

export async function extractFilesWithParser(
  files: File[],
  parser: PageParser,
): Promise<ExtractionReport> {
  const report: ExtractionReport = {
    documents: [],
    failures: [],
  };

  for (const file of files) {
    try {
      const pages = await extractPdfByPage(file);
      report.documents.push({
        fileName: file.name,
        pageCount: pages.length,
        pages: pages.map((page) => ({
          ...page,
          parsedLines: page.rawLines
            .map((line, lineIndex) =>
              parser.parseLine(line, {
                fileName: file.name,
                pageNumber: page.pageNumber,
                lineNumber: lineIndex + 1,
              }),
            )
            .filter((line) => line.length > 0),
          parsedText: page.rawLines
            .map((line, lineIndex) =>
              parser.parseLine(line, {
                fileName: file.name,
                pageNumber: page.pageNumber,
                lineNumber: lineIndex + 1,
              }),
            )
            .filter((line) => line.length > 0)
            .join("\n"),
        })),
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "No se pudo procesar el PDF";
      report.failures.push({ fileName: file.name, reason });
    }
  }

  return report;
}
