import "./style.css";
import { NoopParser } from "./parsers/noopParser";
import { RegexParser } from "./parsers/regexParser";
import { extractFilesWithParser } from "./services/extractionPipeline";
import type { PageParser } from "./types/pdf";
import { renderApp, renderResults, setStatus } from "./ui/appView";

const app = document.getElementById("app");

if (!app) {
  throw new Error("No se encontro #app");
}

const ui = renderApp(app);

const parserRegistry: Record<string, PageParser> = {
  regex: new RegexParser(),
  noop: new NoopParser(),
};

ui.extractButton.addEventListener("click", async () => {
  const files = Array.from(ui.fileInput.files ?? []);

  if (files.length === 0) {
    setStatus(ui.status, "Selecciona al menos un archivo PDF.", "error");
    return;
  }

  const selectedParser = parserRegistry[ui.parserSelect.value] ?? parserRegistry.regex;
  setStatus(
    ui.status,
    `Procesando ${files.length} archivo(s) con parser ${selectedParser.name}...`,
    "info",
  );
  ui.extractButton.disabled = true;

  try {
    const report = await extractFilesWithParser(files, selectedParser);
    renderResults(ui.results, report);

    if (report.failures.length > 0) {
      setStatus(
        ui.status,
        `Finalizado con ${report.failures.length} error(es). Revisa el detalle abajo.`,
        "error",
      );
      return;
    }

    setStatus(ui.status, `Listo. Se extrajeron ${report.documents.length} documento(s).`, "ok");
  } catch (error) {
    const message = error instanceof Error ? error.message : "Error desconocido";
    setStatus(ui.status, `No se pudo completar la extraccion: ${message}`, "error");
  } finally {
    ui.extractButton.disabled = false;
  }
});
