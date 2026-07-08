var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),l=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")}),u=class{name=`noop`;parseLine(e,t){return e}},d=class{name=`regex`;patterns;guardandoPiePagina=!1;lineasPiePagina=[];constructor(e){this.patterns=e??[{search:/(?<=Nº\s)\s*\d+/i,label:`numero de orden`}]}parseLine(e,t){let n=[],r=e.trim();for(let t of this.patterns){let r=e.match(t.search);r&&n.push(r[0].trim())}return/PERSONA QUE RECIBE/i.test(r)||/CEDIBLE/i.test(r)?(this.guardandoPiePagina=!1,this.lineasPiePagina.length>0&&(n.push(this.lineasPiePagina.join(`
`)),this.lineasPiePagina=[])):this.guardandoPiePagina?r.length>0&&this.lineasPiePagina.push(r):/www\.sii\.cl/i.test(r)&&(this.guardandoPiePagina=!0),n.filter(e=>e.length>0).join(`
`)}},f=`/pdf-extractor/assets/pdf.worker.min-DEtVeC4l.mjs`,p=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),m=function(e){return`/pdf-extractor/`+e},h={},g=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../../../../vite/packages/vite/src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=m(t,n),t=s(t),t in h)return;h[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:p,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function _(e){return typeof e==`object`&&e&&`str`in e?e.str:``}function v(e){return typeof e==`object`&&!!e&&`hasEOL`in e&&!!e.hasEOL}async function y(e){let{GlobalWorkerOptions:t,getDocument:n}=await g(async()=>{let{GlobalWorkerOptions:e,getDocument:t}=await import(`./pdf-DysKURfQ.js`);return{GlobalWorkerOptions:e,getDocument:t}},[]);t.workerSrc=f;let r=await n({data:new Uint8Array(await e.arrayBuffer())}).promise,i=[];for(let e=1;e<=r.numPages;e+=1){let t=await(await r.getPage(e)).getTextContent(),n=[],a=``;for(let e of t.items){let t=_(e);if(t.length>0&&(a+=t),v(e)){let e=a.trim();e.length>0&&n.push(e),a=``}else t.length>0&&(a+=` `)}let o=a.trim();o.length>0&&n.push(o);let s=n.join(`
`);i.push({pageNumber:e,rawLines:n,rawText:s,parsedLines:n,parsedText:s})}return i}async function b(e,t){let n={documents:[],failures:[]};for(let r of e)try{let e=await y(r);n.documents.push({fileName:r.name,pageCount:e.length,pages:e.map(e=>({...e,parsedLines:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0),parsedText:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0).join(`
`)}))})}catch(e){let t=e instanceof Error?e.message:`No se pudo procesar el PDF`;n.failures.push({fileName:r.name,reason:t})}return n}function x(e){let t=e.filter((e,t,n)=>t===n.findIndex(t=>t.N_orden===e.N_orden));return t.length>0?t:[]}function S(e){return e.innerHTML=`
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
  `,{fileInput:T(`fileInput`),extractButton:T(`extractButton`),parserSelect:T(`parserSelect`),status:T(`status`),results:T(`results`)}}function C(e,t,n=`info`){e.className=`status status-${n}`,e.textContent=t}function w(e,t){if(t.documents.length===0&&t.failures.length===0){e.className=`results-empty`,e.textContent=`No se encontraron resultados.`;return}let n=x(t.documents.flatMap(e=>e.pages.map(e=>({N_orden:e.parsedLines[0]||``,Pie_pagina:e.parsedLines[1]||``})))),r=`
    <table class="results-table">
      <thead>
        <tr>
          <th>Número de orden</th>
          <th>Pie de página</th>
        </tr>
      </thead>
      <tbody>
        ${n.map(e=>`
        <tr>
          <td>${E(e.N_orden)}</td>
          <td>${E(e.Pie_pagina)}</td>
        </tr>
      `).join(``)}
      </tbody>
    </table>
  `,i=[{sheet:`Resultados`,columns:[{label:`N_orden`,value:`N_orden`},{label:`Pie_pagina`,value:`Pie_pagina`}],content:n}],a={fileName:`resultados`,extraLength:3,writeOptions:{}},o=`
    <button id="downloadButton" type="button" class="cta">Descargar Excel (Total: ${n.length} )</button>
  `;setTimeout(()=>{let e=document.getElementById(`downloadButton`);e&&e.addEventListener(`click`,async()=>{try{e.textContent=`Generando Excel...`,e.disabled=!0;let{default:t}=await g(async()=>{let{default:e}=await import(`./dist-BCqO773E.js`).then(e=>c(e.default,1));return{default:e}},[]);t(i,a)}catch(e){console.error(`Error al exportar a Excel:`,e)}finally{e.textContent=`Descargar Excel`,e.disabled=!1}})},0);let s=t.failures.map(e=>`
        <article class="error-card">
          <strong>${E(e.fileName)}</strong>
          <p>${E(e.reason)}</p>
        </article>
      `).join(``);e.className=`results`,e.innerHTML=`
    ${s?`<section class="errors">${s}</section>`:``}
    <div class="table-container">
      ${r}
    </div>
    ${o}
  `}function T(e){let t=document.getElementById(e);if(!t)throw Error(`No se encontro el elemento requerido: ${e}`);return t}function E(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};return e.replace(/[&<>"']/g,e=>t[e])}var D=document.getElementById(`app`);if(!D)throw Error(`No se encontro #app`);var O=S(D),k={regex:new d,noop:new u};O.extractButton.addEventListener(`click`,async()=>{let e=Array.from(O.fileInput.files??[]);if(e.length===0){C(O.status,`Selecciona al menos un archivo PDF.`,`error`);return}let t=k[O.parserSelect.value]??k.regex;C(O.status,`Procesando ${e.length} archivo(s) con parser ${t.name}...`,`info`),O.extractButton.disabled=!0;try{let n=await b(e,t);if(w(O.results,n),n.failures.length>0){C(O.status,`Finalizado con ${n.failures.length} error(es). Revisa el detalle abajo.`,`error`);return}C(O.status,`Listo. Se extrajeron ${n.documents.length} documento(s).`,`ok`)}catch(e){let t=e instanceof Error?e.message:`Error desconocido`;C(O.status,`No se pudo completar la extraccion: ${t}`,`error`)}finally{O.extractButton.disabled=!1}});export{o as n,l as r,g as t};