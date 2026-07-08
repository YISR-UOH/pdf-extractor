const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/pdfjs-vendor-bSpZQg3j.js","assets/rolldown-runtime-aKtaBQYM.js","assets/xlsx-vendor-C02ouC-j.js"])))=>i.map(i=>d[i]);
import{i as e}from"./rolldown-runtime-aKtaBQYM.js";import{n as t}from"./pdfjs-vendor-bSpZQg3j.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=class{name=`noop`;parseLine(e,t){return e}},r=class{name=`regex`;patterns;guardandoPiePagina=!1;lineasPiePagina=[];constructor(e){this.patterns=e??[{search:/(?<=Nº\s)\s*\d+/i,label:`numero de orden`}]}parseLine(e,t){let n=[],r=e.trim();for(let t of this.patterns){let r=e.match(t.search);r&&n.push(r[0].trim())}return/PERSONA QUE RECIBE/i.test(r)||/CEDIBLE/i.test(r)?(this.guardandoPiePagina=!1,this.lineasPiePagina.length>0&&(n.push(this.lineasPiePagina.join(`
`)),this.lineasPiePagina=[])):this.guardandoPiePagina?r.length>0&&this.lineasPiePagina.push(r):/www\.sii\.cl/i.test(r)&&(this.guardandoPiePagina=!0),n.filter(e=>e.length>0).join(`
`)}};function i(e){return typeof e==`object`&&e&&`str`in e?e.str:``}function a(e){return typeof e==`object`&&!!e&&`hasEOL`in e&&!!e.hasEOL}async function o(e){let{GlobalWorkerOptions:n,getDocument:r}=await t(async()=>{let{GlobalWorkerOptions:e,getDocument:t}=await import(`./pdfjs-vendor-bSpZQg3j.js`).then(e=>e.t);return{GlobalWorkerOptions:e,getDocument:t}},__vite__mapDeps([0,1])),o=`/pdf-extractor/`;n.workerSrc=`${o.endsWith(`/`)?o:`/pdf-extractor//`}pdf.worker.mjs`;let s=await r({data:new Uint8Array(await e.arrayBuffer())}).promise,c=[];for(let e=1;e<=s.numPages;e+=1){let t=await(await s.getPage(e)).getTextContent(),n=[],r=``;for(let e of t.items){let t=i(e);if(t.length>0&&(r+=t),a(e)){let e=r.trim();e.length>0&&n.push(e),r=``}else t.length>0&&(r+=` `)}let o=r.trim();o.length>0&&n.push(o);let l=n.join(`
`);c.push({pageNumber:e,rawLines:n,rawText:l,parsedLines:n,parsedText:l})}return c}async function s(e,t){let n={documents:[],failures:[]};for(let r of e)try{let e=await o(r);n.documents.push({fileName:r.name,pageCount:e.length,pages:e.map(e=>({...e,parsedLines:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0),parsedText:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0).join(`
`)}))})}catch(e){let t=e instanceof Error?e.message:`No se pudo procesar el PDF`;n.failures.push({fileName:r.name,reason:t})}return n}function c(e){let t=e.filter((e,t,n)=>t===n.findIndex(t=>t.N_orden===e.N_orden));return t.length>0?t:[]}function l(e){return e.innerHTML=`
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
  `,{fileInput:f(`fileInput`),extractButton:f(`extractButton`),parserSelect:f(`parserSelect`),status:f(`status`),results:f(`results`)}}function u(e,t,n=`info`){e.className=`status status-${n}`,e.textContent=t}function d(n,r){if(r.documents.length===0&&r.failures.length===0){n.className=`results-empty`,n.textContent=`No se encontraron resultados.`;return}let i=c(r.documents.flatMap(e=>e.pages.map(e=>({N_orden:e.parsedLines[0]||``,Pie_pagina:e.parsedLines[1]||``})))),a=`
    <table class="results-table">
      <thead>
        <tr>
          <th>Número de orden</th>
          <th>Pie de página</th>
        </tr>
      </thead>
      <tbody>
        ${i.map(e=>`
        <tr>
          <td>${p(e.N_orden)}</td>
          <td>${p(e.Pie_pagina)}</td>
        </tr>
      `).join(``)}
      </tbody>
    </table>
  `,o=[{sheet:`Resultados`,columns:[{label:`N_orden`,value:`N_orden`},{label:`Pie_pagina`,value:`Pie_pagina`}],content:i}],s={fileName:`resultados`,extraLength:3,writeOptions:{}},l=`
    <button id="downloadButton" type="button" class="cta">Descargar Excel (Total: ${i.length} )</button>
  `;setTimeout(()=>{let n=document.getElementById(`downloadButton`);n&&n.addEventListener(`click`,async()=>{try{n.textContent=`Generando Excel...`,n.disabled=!0;let{default:r}=await t(async()=>{let{default:t}=await import(`./xlsx-vendor-C02ouC-j.js`).then(t=>e(t.t(),1));return{default:t}},__vite__mapDeps([2,1]));r(o,s)}catch(e){console.error(`Error al exportar a Excel:`,e)}finally{n.textContent=`Descargar Excel`,n.disabled=!1}})},0);let u=r.failures.map(e=>`
        <article class="error-card">
          <strong>${p(e.fileName)}</strong>
          <p>${p(e.reason)}</p>
        </article>
      `).join(``);n.className=`results`,n.innerHTML=`
    ${u?`<section class="errors">${u}</section>`:``}
    <div class="table-container">
      ${a}
    </div>
    ${l}
  `}function f(e){let t=document.getElementById(e);if(!t)throw Error(`No se encontro el elemento requerido: ${e}`);return t}function p(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};return e.replace(/[&<>"']/g,e=>t[e])}var m=document.getElementById(`app`);if(!m)throw Error(`No se encontro #app`);var h=l(m),g={regex:new r,noop:new n};h.extractButton.addEventListener(`click`,async()=>{let e=Array.from(h.fileInput.files??[]);if(e.length===0){u(h.status,`Selecciona al menos un archivo PDF.`,`error`);return}let t=g[h.parserSelect.value]??g.regex;u(h.status,`Procesando ${e.length} archivo(s) con parser ${t.name}...`,`info`),h.extractButton.disabled=!0;try{let n=await s(e,t);if(d(h.results,n),n.failures.length>0){u(h.status,`Finalizado con ${n.failures.length} error(es). Revisa el detalle abajo.`,`error`);return}u(h.status,`Listo. Se extrajeron ${n.documents.length} documento(s).`,`ok`)}catch(e){let t=e instanceof Error?e.message:`Error desconocido`;u(h.status,`No se pudo completar la extraccion: ${t}`,`error`)}finally{h.extractButton.disabled=!1}});