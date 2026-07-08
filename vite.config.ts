import { defineConfig } from "vite-plus";

export default defineConfig({
  base: "/pdf-extractor/",
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/pdfjs-dist")) {
            return "pdfjs-vendor";
          }
          if (id.includes("node_modules/json-as-xlsx")) {
            return "xlsx-vendor";
          }
        },
      },
    },
  },
});
