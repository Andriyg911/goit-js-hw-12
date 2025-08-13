import{a as A,S,i as s}from"./assets/vendor-9md0t_4N.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const E="51566476-370d8ae35b5995096aee585ea",q="https://pixabay.com/api/",w={image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function f(t,r){const{data:i}=await A.get(q,{params:{key:E,q:t,page:r,...w}});return i}const p=document.querySelector(".gallery"),m=document.querySelector(".load-more"),c=document.querySelector(".loader"),P=new S(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function h(t){if(!Array.isArray(t)||t.length===0)return;const r=t.map(({largeImageURL:i,webformatURL:n,tags:e,likes:o,views:l,comments:L,downloads:v})=>`
      <li class="photo-card">
        <a href="${i}">
          <img src="${n}" alt="${$(e)}" loading="lazy" />
        </a>
        <div class="info">
          <div class="info-item">
            <b>Likes</b>
            <span>${o??0}</span>
          </div>
          <div class="info-item">
            <b>Views</b>
            <span>${l??0}</span>
          </div>
          <div class="info-item">
            <b>Comments</b>
            <span>${L??0}</span>
          </div>
          <div class="info-item">
            <b>Downloads</b>
            <span>${v??0}</span>
          </div>
        </div>
      </li>`).join("");p.insertAdjacentHTML("beforeend",r),P.refresh()}function M(){p.innerHTML=""}function y(){c.classList.remove("is-hidden"),c.setAttribute("aria-hidden","false")}function g(){c.classList.add("is-hidden"),c.setAttribute("aria-hidden","true")}function R(){m.classList.remove("is-hidden")}function b(){m.classList.add("is-hidden")}function $(t=""){return String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}const B=15,O=document.querySelector(".form"),_=document.querySelector(".gallery"),x=document.querySelector(".load-more");document.querySelector(".loader");let d="",a=1,u=0;O.addEventListener("submit",D);x.addEventListener("click",C);async function D(t){t.preventDefault();const r=t.target.query.value.trim();if(!r){s.warning({title:"Увага",message:"Введіть пошуковий запит",position:"topRight"});return}d=r,a=1,M(),b(),y();try{const{hits:i,totalHits:n}=await f(d,a);if(i.length===0){s.info({title:"Нічого не знайдено",message:"Спробуйте інший запит",position:"topRight"});return}h(i),u=Math.ceil(n/B),a<u?R():s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})}catch{s.error({title:"Помилка",message:"Не вдалося отримати дані з Pixabay",position:"topRight"})}finally{g()}}async function C(){a+=1,y();try{const{hits:t}=await f(d,a);h(t),H(),a>=u&&(b(),s.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}catch{s.error({title:"Помилка",message:"Не вдалося завантажити більше результатів",position:"topRight"})}finally{g()}}function H(){const t=_.firstElementChild;if(!t)return;const{height:r}=t.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
