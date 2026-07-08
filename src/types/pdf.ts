export interface ExtractedPage {
  pageNumber: number;
  rawLines: string[];
  rawText: string;
  parsedLines: string[];
  parsedText: string;
}

export interface ExtractedDocument {
  fileName: string;
  pageCount: number;
  pages: ExtractedPage[];
}

export interface ExtractionFailure {
  fileName: string;
  reason: string;
}

export interface ExtractionReport {
  documents: ExtractedDocument[];
  failures: ExtractionFailure[];
}

export interface ParserContext {
  fileName: string;
  pageNumber: number;
  lineNumber: number;
}

export interface PageParser {
  name: string;
  parseLine(line: string, context: ParserContext): string;
}
