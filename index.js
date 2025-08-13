import{a as A,S as w,i as s}from"./assets/vendor-w8Z1wSTr.js";(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&n(l)}).observe(document,{childList:!0,subtree:!0});function r(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(t){if(t.ep)return;t.ep=!0;const o=r(t);fetch(t.href,o)}})();const S="51566476-370d8ae35b5995096aee585ea",E="https://pixabay.com/api/",q={image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15};async function f(e,i){const{data:r}=await A.get(E,{params:{key:S,q:e,page:i,...q}});return r}const p=document.querySelector(".gallery"),m=document.querySelector(".load-more"),c=document.querySelector(".loader"),P=new w(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});function h(e){if(!Array.isArray(e)||e.length===0)return;const i=e.map(({largeImageURL:r,webformatURL:n,tags:t,likes:o,views:l,comments:L,downloads:v})=>`
      <li class="photo-card">
        <a href="${r}">
          <img src="${n}" alt="${$(t)}" loading="lazy" />
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
      </li>`).join("");p.insertAdjacentHTML("beforeend",i),P.refresh()}function M(){p.innerHTML=""}function g(){c.classList.remove("is-hidden"),c.setAttribute("aria-hidden","false")}function y(){c.classList.add("is-hidden"),c.setAttribute("aria-hidden","true")}function R(){m.classList.remove("is-hidden")}function b(){m.classList.add("is-hidden")}function $(e=""){return String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;")}window.global=window;const B=15,O=document.querySelector(".form"),_=document.querySelector(".gallery"),x=document.querySelector(".load-more");document.querySelector(".loader");let d="",a=1,u=0;O.addEventListener("submit",D);x.addEventListener("click",C);async function D(e){e.preventDefault();const i=e.target.query.value.trim();if(!i){s.warning({title:"Увага",message:"Введіть пошуковий запит",position:"topRight"});return}d=i,a=1,M(),b(),g();try{const{hits:r,totalHits:n}=await f(d,a);if(r.length===0){s.info({title:"Нічого не знайдено",message:"Спробуйте інший запит",position:"topRight"});return}h(r),u=Math.ceil(n/B),a<u?R():s.info({message:"Ми вибачаємося, але ви досягли кінця результатів пошуку.",position:"topRight"})}catch{s.error({title:"Помилка",message:"Не вдалося отримати дані з Pixabay",position:"topRight"})}finally{y(),e.target.reset()}}async function C(){a+=1,g();try{const{hits:e}=await f(d,a);h(e),H(),a>=u&&(b(),s.info({message:"Ми вибачаємося, але ви досягли кінця результатів пошуку.",position:"topRight"}))}catch{s.error({title:"Помилка",message:"Не вдалося завантажити більше результатів",position:"topRight"})}finally{y()}}function H(){const e=_.firstElementChild;if(!e)return;const{height:i}=e.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
