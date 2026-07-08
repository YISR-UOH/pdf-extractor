var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,a)=>(a=n==null?{}:e(i(n)),s(r||!n||!n.__esModule?t(a,`default`,{value:n,enumerable:!0}):a,n)),l=(e=>typeof require<`u`?require:typeof Proxy<`u`?new Proxy(e,{get:(e,t)=>(typeof require<`u`?require:e)[t]}):e)(function(e){if(typeof require<`u`)return require.apply(this,arguments);throw Error('Calling `require` for "'+e+"\" in an environment that doesn't expose the `require` function. See https://rolldown.rs/in-depth/bundling-cjs#require-external-modules for more details.")});function u(e){"@babel/helpers - typeof";return u=typeof Symbol==`function`&&typeof Symbol.iterator==`symbol`?function(e){return typeof e}:function(e){return e&&typeof Symbol==`function`&&e.constructor===Symbol&&e!==Symbol.prototype?`symbol`:typeof e},u(e)}function d(e,t){if(u(e)!=`object`||!e)return e;var n=e[Symbol.toPrimitive];if(n!==void 0){var r=n.call(e,t||`default`);if(u(r)!=`object`)return r;throw TypeError(`@@toPrimitive must return a primitive value.`)}return(t===`string`?String:Number)(e)}function f(e){var t=d(e,`string`);return u(t)==`symbol`?t:t+``}function p(e,t,n){return(t=f(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var m=class{constructor(){p(this,`name`,`noop`)}parseLine(e,t){return e}},h=class{constructor(e){p(this,`name`,`regex`),p(this,`patterns`,void 0),p(this,`guardandoPiePagina`,!1),p(this,`lineasPiePagina`,[]),this.patterns=e??[{search:RegExp(`(?<=Nº\\s)\\s*\\d+`,`i`),label:`numero de orden`}]}parseLine(e,t){let n=[],r=e.trim();for(let t of this.patterns){let r=e.match(t.search);r&&n.push(r[0].trim())}return/PERSONA QUE RECIBE/i.test(r)||/CEDIBLE/i.test(r)?(this.guardandoPiePagina=!1,this.lineasPiePagina.length>0&&(n.push(this.lineasPiePagina.join(`
`)),this.lineasPiePagina=[])):this.guardandoPiePagina?r.length>0&&this.lineasPiePagina.push(r):/www\.sii\.cl/i.test(r)&&(this.guardandoPiePagina=!0),n.filter(e=>e.length>0).join(`
`)}},g=`/pdf-extractor/assets/pdf.worker.min-DEtVeC4l.mjs`,_=(function(){let e=typeof document<`u`&&document.createElement(`link`).relList;return e&&e.supports&&e.supports(`modulepreload`)?`modulepreload`:`preload`})(),v=function(e){return`/pdf-extractor/`+e},y={},b=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?import.meta.resolve(e):new URL(e,new URL(`../../../../../../vite/packages/vite/src/node/plugins/importAnalysisBuild.ts`,import.meta.url)).href}r=o(t.map(t=>{if(t=v(t,n),t=s(t),t in y)return;y[t]=!0;let r=t.endsWith(`.css`);for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}let i=document.createElement(`link`);if(i.rel=r?`stylesheet`:_,r||(i.as=`script`),i.crossOrigin=``,i.href=t,a&&i.setAttribute(`nonce`,a),document.head.appendChild(i),r)return new Promise((e,n)=>{i.addEventListener(`load`,e),i.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})};function x(e){return typeof e==`object`&&e&&`str`in e?e.str:``}function S(e){return typeof e==`object`&&!!e&&`hasEOL`in e&&!!e.hasEOL}async function C(e){let{GlobalWorkerOptions:t,getDocument:n}=await b(async()=>{let{GlobalWorkerOptions:e,getDocument:t}=await import(`./pdf-BybNMGmp.js`);return{GlobalWorkerOptions:e,getDocument:t}},[]);t.workerSrc=g;let r=await n({data:new Uint8Array(await e.arrayBuffer())}).promise,i=[];for(let e=1;e<=r.numPages;e+=1){let t=await(await r.getPage(e)).getTextContent(),n=[],a=``;for(let e of t.items){let t=x(e);if(t.length>0&&(a+=t),S(e)){let e=a.trim();e.length>0&&n.push(e),a=``}else t.length>0&&(a+=` `)}let o=a.trim();o.length>0&&n.push(o);let s=n.join(`
`);i.push({pageNumber:e,rawLines:n,rawText:s,parsedLines:n,parsedText:s})}return i}async function w(e,t){let n={documents:[],failures:[]};for(let r of e)try{let e=await C(r);n.documents.push({fileName:r.name,pageCount:e.length,pages:e.map(e=>({...e,parsedLines:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0),parsedText:e.rawLines.map((n,i)=>t.parseLine(n,{fileName:r.name,pageNumber:e.pageNumber,lineNumber:i+1})).filter(e=>e.length>0).join(`
`)}))})}catch(e){let t=e instanceof Error?e.message:`No se pudo procesar el PDF`;n.failures.push({fileName:r.name,reason:t})}return n}function T(e){let t=e.filter((e,t,n)=>t===n.findIndex(t=>t.N_orden===e.N_orden));return t.length>0?t:[]}function E(e){return e.innerHTML=`
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
  `,{fileInput:k(`fileInput`),extractButton:k(`extractButton`),parserSelect:k(`parserSelect`),status:k(`status`),results:k(`results`)}}function D(e,t,n=`info`){e.className=`status status-${n}`,e.textContent=t}function O(e,t){if(t.documents.length===0&&t.failures.length===0){e.className=`results-empty`,e.textContent=`No se encontraron resultados.`;return}let n=T(t.documents.flatMap(e=>e.pages.map(e=>({N_orden:e.parsedLines[0]||``,Pie_pagina:e.parsedLines[1]||``})))),r=`
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
          <td>${A(e.N_orden)}</td>
          <td>${A(e.Pie_pagina)}</td>
        </tr>
      `).join(``)}
      </tbody>
    </table>
  `,i=[{sheet:`Resultados`,columns:[{label:`N_orden`,value:`N_orden`},{label:`Pie_pagina`,value:`Pie_pagina`}],content:n}],a={fileName:`resultados`,extraLength:3,writeOptions:{}},o=`
    <button id="downloadButton" type="button" class="cta">Descargar Excel (Total: ${n.length} )</button>
  `;setTimeout(()=>{let e=document.getElementById(`downloadButton`);e&&e.addEventListener(`click`,async()=>{try{e.textContent=`Generando Excel...`,e.disabled=!0;let{default:t}=await b(async()=>{let{default:e}=await import(`./dist-CyOLrV2s.js`).then(e=>c(e.default,1));return{default:e}},[]);t(i,a)}catch(e){console.error(`Error al exportar a Excel:`,e)}finally{e.textContent=`Descargar Excel`,e.disabled=!1}})},0),t.failures.length!==0&&console.warn(`Algunos archivos no pudieron ser procesados:`,t.failures);let s=t.failures.map(e=>`
        <article class="error-card">
          <strong>${A(e.fileName)}</strong>
          <p>${A(e.reason)}</p>
        </article>
      `).join(``);e.className=`results`,e.innerHTML=`
    ${s?`<section class="errors">${s}</section>`:``}
    <div class="table-container">
      ${r}
    </div>
    ${o}
  `}function k(e){let t=document.getElementById(e);if(!t)throw Error(`No se encontro el elemento requerido: ${e}`);return t}function A(e){let t={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#039;`};return e.replace(/[&<>"']/g,e=>t[e])}var j=document.getElementById(`app`);if(!j)throw Error(`No se encontro #app`);var M=E(j),N={regex:new h,noop:new m};M.extractButton.addEventListener(`click`,async()=>{let e=Array.from(M.fileInput.files??[]);if(e.length===0){D(M.status,`Selecciona al menos un archivo PDF.`,`error`);return}let t=N[M.parserSelect.value]??N.regex;D(M.status,`Procesando ${e.length} archivo(s) con parser ${t.name}...`,`info`),M.extractButton.disabled=!0;try{let n=await w(e,t);if(O(M.results,n),n.failures.length>0){D(M.status,`Finalizado con ${n.failures.length} error(es). Revisa el detalle abajo.`,`error`);return}D(M.status,`Listo. Se extrajeron ${n.documents.length} documento(s).`,`ok`)}catch(e){let t=e instanceof Error?e.message:`Error desconocido`;D(M.status,`No se pudo completar la extraccion: ${t}`,`error`)}finally{M.extractButton.disabled=!1}});export{l as i,p as n,o as r,b as t};