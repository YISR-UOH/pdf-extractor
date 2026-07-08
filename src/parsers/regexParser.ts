import type { ParserContext, PageParser } from "../types/pdf";

export class RegexParser implements PageParser {
  public readonly name = "regex";
  private readonly patterns: Array<{ search: RegExp; label: string }>;

  // Estado interno para el procesamiento línea por línea
  private guardandoPiePagina = false;
  private lineasPiePagina: string[] = [];

  public constructor(patterns?: Array<{ search: RegExp; label: string }>) {
    this.patterns = patterns ?? [{ search: /(?<=Nº\s)\s*\d+/i, label: "numero de orden" }];
  }

  public parseLine(line: string, _context: ParserContext): string {
    const matches: string[] = [];
    const lineaLimpia = line.trim();

    // 1. Procesar patrones estándar de una sola línea (ej: Número de orden)
    for (const rule of this.patterns) {
      const match = line.match(rule.search);
      if (match) {
        matches.push(match[0].trim());
      }
    }

    // 2. Lógica de control para el bloque "Pie de Página"

    // CASO A: Detectamos el freno. Detenemos la captura inmediatamente.
    if (/PERSONA QUE RECIBE/i.test(lineaLimpia)) {
      this.guardandoPiePagina = false;

      // Si acumulamos líneas, las unimos y las agregamos a los resultados de esta tanda
      if (this.lineasPiePagina.length > 0) {
        matches.push(this.lineasPiePagina.join("\n"));
        this.lineasPiePagina = []; // Limpiamos el buffer para la siguiente página
      }
    } else if (/CEDIBLE/i.test(lineaLimpia)) {
      this.guardandoPiePagina = false;

      // Si acumulamos líneas, las unimos y las agregamos a los resultados de esta tanda
      if (this.lineasPiePagina.length > 0) {
        matches.push(this.lineasPiePagina.join("\n"));
        this.lineasPiePagina = []; // Limpiamos el buffer para la siguiente página
      }
    }
    // CASO B: Estamos en el medio del bloque. Guardamos la línea actual.
    else if (this.guardandoPiePagina) {
      if (lineaLimpia.length > 0) {
        this.lineasPiePagina.push(lineaLimpia);
      }
    }
    // CASO C: Detectamos el inicio. Activamos la bandera para empezar a guardar EN LA PRÓXIMA LÍNEA.
    else if (/www\.sii\.cl/i.test(lineaLimpia)) {
      this.guardandoPiePagina = true;
    }

    // si
    // 3. Retornar lo consolidado en esta línea (si aplica)
    return matches.filter((value) => value.length > 0).join("\n");
  }
}
