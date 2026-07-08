# PDF Data Extractor (Número de Orden & Pie de Página)

Una aplicación web moderna y ultra ligera diseñada para automatizar la extracción de datos específicos desde múltiples documentos PDF, consolidando la información directamente en un reporte descargable en formato Excel (`.xlsx`).

---

## Características

- **Carga Múltiple:** Sube uno o varios archivos PDF de manera simultánea.
- **Procesamiento Eficiente:** Extracción automatizada del **Número de Orden** y **Pie de Página** mediante expresiones regulares (`Regex`).
- **Vista Previa en Tiempo Real:** Visualiza los datos extraídos en una tabla interactiva y limpia antes de exportar.
- **Descarga Asíncrona:** Exporta el conjunto de datos consolidado a Excel con un solo clic.
- **Rendimiento Optimizado:** Arquitectura modular con *Code Splitting* dinámico para asegurar tiempos de carga inicial instantáneos.

---

## Tecnologías Utilizadas

La aplicación aprovecha las herramientas de desarrollo más rápidas y modernas del ecosistema actual:

* **React + TypeScript:** Interfaz reactiva con tipado estricto para un mantenimiento robusto.
* **Vite+ (Vite Plus):** *Unified Toolchain* impulsado por **Rolldown** para un empaquetado y compilación ultra veloces.
* **PDF.js (pdfjs-dist):** Motor de renderizado y lectura de documentos PDF cargado de forma dinámica bajo demanda.
* **JSON-as-XLSX:** Utilidad ligera de conversión para la generación y descarga directa de hojas de cálculo desde el cliente.

---

## Arquitectura de Optimización

Para cumplir con altos estándares de rendimiento y evitar bloqueos en el navegador debido al peso de las dependencias (`pdfjs-dist` y `json-as-xlsx`), el proyecto implementa:

1.  **Carga Diferida (*Lazy Loading*):** Las librerías pesadas se importan dinámicamente mediante `await import()` solo cuando el usuario ejecuta las acciones de procesar un PDF o descargar el Excel.
2.  **Aislamiento de Tipos:** Los tipos de TypeScript se importan exclusivamente mediante `import type`, garantizando que desaparezcan por completo en la fase de compilación sin sumar bytes al código final.

---

## Instalación y Desarrollo

Sigue estos pasos para ejecutar el proyecto de forma local utilizando el ecosistema de **Vite+**:

1. Clona el repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/pdf-extractor.git](https://github.com/tu-usuario/pdf-extractor.git)
   cd pdf-extractor
