import type { ExtractionReport } from "../types/pdf";
import { generateCSV } from "../services/csvGenerator";
import type { IJsonSheet, ISettings } from "json-as-xlsx";

export interface AppElements {
  fileInput: HTMLInputElement;
  extractButton: HTMLButtonElement;
  parserSelect: HTMLInputElement; // Cambiado a HTMLInputElement ya que ahora es un input hidden
  status: HTMLElement;
  results: HTMLElement;
}

export function renderApp(container: HTMLElement): AppElements {
  container.innerHTML = `
    <main class="layout">
      <section class="panel panel-controls">
        <h1>Extraer Numero de Orden y Pie de página</h1>
        <p class="subtitle">Subir uno o varios PDFs.</p>

        <div class="field">
          <label for="fileInput">Archivos PDF</label>
          <input id="fileInput" type="file" accept="application/pdf" multiple />
        </div>

        <input id="parserSelect" type="hidden" value="regex" />

        <button id="extractButton" type="button" class="cta">Extraer contenido</button>
        <p id="status" class="status">Selecciona archivos para comenzar.</p>
      </section>

      <section class="panel panel-results">
        <h2>Resultados</h2>
        <div id="results" class="results-empty">Aun no hay resultados.</div>
      </section>
    </main>
  `;

  const fileInput = queryById<HTMLInputElement>("fileInput");
  const extractButton = queryById<HTMLButtonElement>("extractButton");
  const parserSelect = queryById<HTMLInputElement>("parserSelect"); // Ajustado el genérico a HTMLInputElement
  const status = queryById<HTMLElement>("status");
  const results = queryById<HTMLElement>("results");

  return {
    fileInput,
    extractButton,
    parserSelect,
    status,
    results,
  };
}

export function setStatus(
  target: HTMLElement,
  message: string,
  tone: "info" | "ok" | "error" = "info",
): void {
  target.className = `status status-${tone}`;
  target.textContent = message;
}

export function renderResults(target: HTMLElement, report: ExtractionReport): void {
  if (report.documents.length === 0 && report.failures.length === 0) {
    target.className = "results-empty";
    target.textContent = "No se encontraron resultados.";
    return;
  }

  const csvContent = generateCSV(
    report.documents.flatMap((doc) =>
      doc.pages.map((page) => ({
        N_orden: page.parsedLines[0] || "",
        Pie_pagina: page.parsedLines[1] || "",
      })),
    ),
  );

  const docsMarkup = csvContent
    .map(
      (fila) => `
        <tr>
          <td>${escapeHtml(fila.N_orden)}</td>
          <td>${escapeHtml(fila.Pie_pagina)}</td>
        </tr>
      `,
    )
    .join("");

  const tableMarkup = `
    <table class="results-table">
      <thead>
        <tr>
          <th>Número de orden</th>
          <th>Pie de página</th>
        </tr>
      </thead>
      <tbody>
        ${docsMarkup}
      </tbody>
    </table>
  `;

  const data: IJsonSheet[] = [
    {
      sheet: "Resultados",
      columns: [
        { label: "N_orden", value: "N_orden" },
        { label: "Pie_pagina", value: "Pie_pagina" },
      ],
      content: csvContent,
    },
  ];

  const settings: ISettings = {
    fileName: "resultados",
    extraLength: 3,
    writeOptions: {},
  };

  const downloadButtonMarkup = `
    <button id="downloadButton" type="button" class="cta">Descargar Excel (Total: ${csvContent.length} )</button>
  `;

  setTimeout(() => {
    const downloadButton = document.getElementById("downloadButton") as HTMLButtonElement | null;
    if (downloadButton) {
      downloadButton.addEventListener("click", async () => {
        try {
          downloadButton.textContent = "Generando Excel...";
          downloadButton.disabled = true;

          const { default: xlsx } = await import("json-as-xlsx");
          xlsx(data, settings);
        } catch (error) {
          console.error("Error al exportar a Excel:", error);
        } finally {
          downloadButton.textContent = "Descargar Excel";
          downloadButton.disabled = false;
        }
      });
    }
  }, 0);

  const failuresMarkup = report.failures
    .map(
      (failure) => `
        <article class="error-card">
          <strong>${escapeHtml(failure.fileName)}</strong>
          <p>${escapeHtml(failure.reason)}</p>
        </article>
      `,
    )
    .join("");

  target.className = "results";
  target.innerHTML = `
    ${failuresMarkup ? `<section class="errors">${failuresMarkup}</section>` : ""}
    <div class="table-container">
      ${tableMarkup}
    </div>
    ${downloadButtonMarkup}
  `;
}

function queryById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);

  if (!element) {
    throw new Error(`No se encontro el elemento requerido: ${id}`);
  }

  return element as T;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };

  return text.replace(/[&<>"']/g, (char) => map[char]);
}
