import type { PageParser, ParserContext } from "../types/pdf";

export class NoopParser implements PageParser {
  public readonly name = "noop";

  public parseLine(line: string, _context: ParserContext): string {
    return line;
  }
}
