const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/xlsx-vendor-sviKLuDG.js","assets/rolldown-runtime-BHe-jwch.js"])))=>i.map(i=>d[i]);
import{r as e}from"./rolldown-runtime-BHe-jwch.js";import{n as t,r as n,t as r}from"./pdfjs-vendor-Cfhst-ei.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var i=class{name=`noop`;parseLine(e,t){return e}},a=class{name=`regex`;patterns;guardandoPiePagina=!1;lineasPiePagina=[];constructor(e){this.patterns=e??[{search:/(?<=Nº\s)\s*\d+/i,label:`numero de orden`}]}parseLine(e,t){let n=[],r=e.trim();for(let t of this.patterns){let r=e.match(t.search);r&&n.push(r[0].trim())}return/PERSONA QUE RECIBE/i.test(r)||/CEDIBLE/i.test(r)?(this.guardandoPiePagina=!1,this.lineasPiePagina.length>0&&(n.push(this.lineasPiePagina.join(`
`)),this.lineasPiePagina=[])):this.guardandoPiePagina?r.length>0&&this.lineasPiePagina.push(r):/www\.sii\.cl/i.test(r)&&(this.guardandoPiePagina=!0),n.filter(e=>e.length>0).join(`
`)}};r.workerSrc=new URL(`pdfjs-dist/build/pdf.worker.min.js`,``+import.meta.url).toString();function o(e){return typeof e==`object`&&e&&`str`in e?e.str:``}function s(e){return typeof e==`object`&&!!e&&`hasEOL`in e&&!!e.hasEOL}async function c(e){let n=await t({data:new Uint8Array(await e.arrayBuffer())}).promise,r=[];for(let e=1;e<=n.numPages;e+=1){let t=await(await n.getPage(e)).getTextContent(),i=[],a=``;for(let e of t.items){let t=o(e);if(t.length>0&&(a+=t),s(e)){let e=a.trim();e.length>0&&i.push(e),a=``}else t.length>0&&(a+=` `)}let c=a.trim();c.length>0&&i.push(c);let l=i.join(`
`);r.push({pageNumber:e,rawLines:i,rawText:l,parsedLines:i,parsedText:l})}return r}async function l(e,t){let n={documents:[],failures:[]};for(let r of e)try{let e=await c(r);n.documents.push({fileName:r.name,pageCount:e.length,pages:e.map(e=>({...e,parsedLines:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0),parsedText:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0).join(`
`)}))})}catch(e){let t=e instanceof Error?e.message:`No se pudo procesar el PDF`;n.failures.push({fileName:r.name,reason:t})}return n}function u(e){let t=e.filter((e,t,n)=>t===n.findIndex(t=>t.N_orden===e.N_orden));return t.length>0?t:[]}function d(e){return e.innerHTML=`
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
  `,{fileInput:m(`fileInput`),extractButton:m(`extractButton`),parserSelect:m(`parserSelect`),status:m(`status`),results:m(`results`)}}function f(e,t,n=`info`){e.className=`status status-${n}`,e.textContent=t}function p(t,r){if(r.documents.length===0&&r.failures.length===0){t.className=`results-empty`,t.textContent=`No se encontraron resultados.`;return}let i=u(r.documents.flatMap(e=>e.pages.map(e=>({N_orden:e.parsedLines[0]||``,Pie_pagina:e.parsedLines[1]||``})))),a=`
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
          <td>${h(e.N_orden)}</td>
          <td>${h(e.Pie_pagina)}</td>
        </tr>
      `).join(``)}
      </tbody>
    </table>
  `,o=[{sheet:`Resultados`,columns:[{label:`N_orden`,value:`N_orden`},{label:`Pie_pagina`,value:`Pie_pagina`}],content:i}],s={fileName:`resultados`,extraLength:3,writeOptions:{}},c=`
    <button id="downloadButton" type="button" class="cta">Descargar Excel (Total: ${i.length} )</button>
  `;setTimeout(()=>{let t=document.getElementById(`downloadButton`);t&&t.addEventListener(`click`,async()=>{try{t.textContent=`Generando Excel...`,t.disabled=!0;let{default:r}=await n(async()=>{let{default:t}=await import(`./xlsx-vendor-sviKLuDG.js`).then(t=>e(t.t(),1));return{default:t}},__vite__mapDeps([0,1]));r(o,s)}catch(e){console.error(`Error al exportar a Excel:`,e)}finally{t.textContent=`Descargar Excel`,t.disabled=!1}})},0);let l=r.failures.map(e=>`
        <article class="error-card">
          <strong>${h(e.fileName)}</strong>
          <p>${h(e.reason)}</p>
        </article>
      `).join(``);t.className=`results`,t.innerHTML=`
    ${l?`<section class="errors">${l}</section>`:``}
    <div class="table-container">
      ${a}
    </div>
    ${c}
  `}function m(e){let t=document.getElementById(e);if(!t)throw Error(`No se encontro el elemento requerido: ${e}`);return t}function h(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};return e.replace(/[&<>"']/g,e=>t[e])}var g=document.getElementById(`app`);if(!g)throw Error(`No se encontro #app`);var _=d(g),v={regex:new a,noop:new i};_.extractButton.addEventListener(`click`,async()=>{let e=Array.from(_.fileInput.files??[]);if(e.length===0){f(_.status,`Selecciona al menos un archivo PDF.`,`error`);return}let t=v[_.parserSelect.value]??v.regex;f(_.status,`Procesando ${e.length} archivo(s) con parser ${t.name}...`,`info`),_.extractButton.disabled=!0;try{let n=await l(e,t);if(p(_.results,n),n.failures.length>0){f(_.status,`Finalizado con ${n.failures.length} error(es). Revisa el detalle abajo.`,`error`);return}f(_.status,`Listo. Se extrajeron ${n.documents.length} documento(s).`,`ok`)}catch(e){let t=e instanceof Error?e.message:`Error desconocido`;f(_.status,`No se pudo completar la extraccion: ${t}`,`error`)}finally{_.extractButton.disabled=!1}});