function e(e,t,r,n){Object.defineProperty(e,t,{get:r,set:n,enumerable:!0,configurable:!0})}var t="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r={},n={},l=t.parcelRequired76b;null==l&&((l=function(e){if(e in r)return r[e].exports;if(e in n){var t=n[e];delete n[e];var l={id:e,exports:{}};return r[e]=l,t.call(l.exports,l,l.exports),l.exports}var o=new Error("Cannot find module '"+e+"'");throw o.code="MODULE_NOT_FOUND",o}).register=function(e,t){n[e]=t},t.parcelRequired76b=l),l.register("kyEFX",(function(t,r){var n,l;e(t.exports,"register",(function(){return n}),(function(e){return n=e})),e(t.exports,"resolve",(function(){return l}),(function(e){return l=e}));var o={};n=function(e){for(var t=Object.keys(e),r=0;r<t.length;r++)o[t[r]]=e[t[r]]},l=function(e){var t=o[e];if(null==t)throw new Error("Could not resolve bundle with id "+e);return t}})),l("kyEFX").register(JSON.parse('{"9oqE3":"library.3b7c1246.js","fJ9hC":"empty-collection-min.be2b13eb.png","7mVsD":"index.2b5100b0.css","3yVDC":"index.1c673e10.js"}'));var o=l("ncrjo"),i=l("2zNys"),a=l("a12rj");function s(e){try{const t=localStorage.getItem(e);return null===t?void 0:JSON.parse(t)}catch(e){console.error("Get state error: ",e.message)}}var c=l("1O3u4");const d=document.querySelector('[data-id="watched-btn"]'),f=document.querySelector('[data-id="queue-btn"]');document.querySelector(".library-buttons__wrapper").addEventListener("click",(function(e){if(e.target.classList.contains("is-active"))return;return d.classList.toggle("is-active"),void f.classList.toggle("is-active")}));var u;u=new URL(l("kyEFX").resolve("fJ9hC"),import.meta.url).toString();const g=new URL(u);function p(){const e=`<li><img class="empty-collection-img" width="240" src=${g.pathname}></li><li><p class="empty-collection-text">Collection is empty. You need to add a movie.</p></li>`;c.galleryRef.innerHTML=e,c.galleryRef.classList.add("empty-gallery")}function y(){if(c.galleryRef.innerHTML="",localStorage.watch){if(localStorage.watch){const e=s("watch");if(0===e.length)return void p();c.galleryRef.classList.contains("empty-gallery")&&c.galleryRef.classList.remove("empty-gallery");const t=e.map((e=>(0,o.fetchMovie)(e)));Promise.all(t).then((e=>{const t=e.map((({poster_path:e,backdrop_path:t,original_title:r,title:n,genres:l,release_date:o,vote_average:s,id:c})=>{const d=l.map((e=>e.id));return(0,a.prepareGalleryInfo)(e,t,r,n,d,o,s,c,i.findGenres)})).join("");c.galleryRef.innerHTML=t}))}}else p()}y(),d.addEventListener("click",y);f.addEventListener("click",(function(){if(c.galleryRef.innerHTML="",localStorage.queue){if(localStorage.queue){const e=s("queue");if(0===e.length)return void p();c.galleryRef.classList.contains("empty-gallery")&&c.galleryRef.classList.remove("empty-gallery");const t=e.map((e=>(0,o.fetchMovie)(e)));Promise.all(t).then((e=>{const t=e.map((({poster_path:e,backdrop_path:t,original_title:r,title:n,genres:l,release_date:o,vote_average:s,id:c})=>{const d=l.map((e=>e.id));return(0,a.prepareGalleryInfo)(e,t,r,n,d,o,s,c,i.findGenres)})).join("");c.galleryRef.innerHTML=t}))}}else p()}));
//# sourceMappingURL=library.3b7c1246.js.map
