"use strict";new PerfectScrollbar(".catalog",{wheelSpeed:.5,wheelPropagation:!0}),function(){var n=document.querySelectorAll(".games__item"),t=document.querySelector(".filter-game"),l=document.querySelector(".filter-bots"),e=document.querySelector(".filter-price"),o=document.querySelector(".filter-bots__drop"),s=document.querySelectorAll(".filter-bots__cell"),c=document.querySelector(".filter-resize"),a=document.querySelector(".catalog"),r=document.querySelector(".all-sale");n.forEach(function(e){e.addEventListener("click",function(e){!function(e){for(var t=e.target;!t.classList.contains("games__item");)t=t.parentNode;t.classList.contains("active")||(n.forEach(function(e){e.classList.contains("active")&&(e.classList.remove("active"),t.classList.add("active"))}),t.classList.contains("cs-go")?r.classList.add("hidden"):r.classList.remove("hidden"))}(e)})}),t.addEventListener("click",function(e){t.classList.toggle("active")}),l.addEventListener("click",function(e){e.target.matches(".filter-bots, .filter-bots__text")&&l.classList.toggle("active")}),document.addEventListener("click",function(e){var t=e.target;l.classList.contains("active")&&(t.matches(".filter-bots, .filter-bots *")||l.classList.remove("active"))}),e.addEventListener("click",function(e){for(var t=e.target;!t.classList.contains("filter-price");)t=t.parentNode;t.classList.contains("up")?(t.classList.remove("up"),t.classList.add("down")):(t.classList.remove("down"),t.classList.add("up"))}),o.addEventListener("click",function(e){var t=e.target;if(t.classList.contains("filter-bots__all"))e.preventDefault(),s.forEach(function(e){e.classList.remove("active")});else if(t.matches(".filter-bots__cell, .filter-bots__cell *")){for(;!t.classList.contains("filter-bots__cell");)t=t.parentNode;t.classList.toggle("active")}}),c.addEventListener("click",function(e){for(var t=e.target;!t.classList.contains("filter-resize");)t=t.parentNode;t.classList.contains("big")?(t.classList.remove("big"),a.classList.remove("big"),t.classList.add("small"),a.classList.add("small")):(t.classList.remove("small"),t.classList.add("big"),a.classList.remove("small"),a.classList.add("big"))})}(),function(){var n=document.querySelector(".lang__current"),l=document.querySelector(".lang__list"),o=document.querySelectorAll(".lang__option");n.addEventListener("click",function(e){l.classList.remove("close")}),o.forEach(function(e){e.addEventListener("click",function(e){var t=e.target;t.classList.contains("current")||(o.forEach(function(e){e.classList.remove("current")}),t.classList.add("current"),n.textContent=t.textContent),l.classList.add("close")})}),document.addEventListener("click",function(e){var t=e.target;l.classList.contains("close")||t.matches(".lang, .lang *")||l.classList.add("close")})}(),function(){var e=document.querySelector(".filter-reload"),t=document.querySelector(".loader");e.addEventListener("click",function(e){t.classList.remove("hidden"),setTimeout(function(){t.classList.add("hidden")},2500)})}(),document.querySelectorAll(".main-nav__link").forEach(function(e){e.addEventListener("click",function(e){for(var t=e.target;!t.classList.contains("main-nav__link");)t=t.parentNode;e.preventDefault(),document.querySelector(t.getAttribute("href")).scrollIntoView({behavior:"smooth",block:"start"})})}),function(){var i=document.querySelector("#inpun-min-id"),u=document.querySelector("#inpun-max-id"),d=document.querySelector(".slider__btn-min"),f=document.querySelector(".slider__btn-max"),t=document.querySelectorAll(".slider__step"),v=document.querySelector(".slider__line"),o=Math.ceil(d.offsetWidth/2),p=t[0].offsetWidth;function n(e){return!isNaN(parseFloat(e))&&isFinite(e)}var s,c,m=(s=t,(c=[]).push(0),s.forEach(function(e,t){var n=t,l=++n*e.offsetWidth-o;t===s.length-1&&(l=n*e.offsetWidth-d.offsetWidth),c.push(l)}),c),e=0,a=m.length-1;function g(){var n=d.style.left,l=f.style.left;n=y(n),l=y(l),n===e&&l===e&&(d.style.zIndex=4,f.style.zIndex=5),n===a&&l===a&&(f.style.zIndex=4,d.style.zIndex=5),t.forEach(function(e,t){e.style.zIndex=0,(t<n||l<=t)&&(e.style.zIndex=3)})}function y(n){return m.forEach(function(e,t){e!=parseInt(n)||(n=t)}),n}function l(l){var o=void 0,s=void 0,c=void 0;function t(e){var n=e-c-o.left;l.classList.contains("slider__btn-max")?n<parseInt(d.style.left)&&(n=parseInt(d.style.left)):n<0&&(n=0);var t=v.offsetWidth-l.offsetWidth;l.classList.contains("slider__btn-min")?n>parseInt(f.style.left)&&(n=parseInt(f.style.left)):t<n&&(n=t),m.forEach(function(e,t){n<=m[1]-p/2&&(l.style.left="0px"),e-p/2<n&&n<=m[t+1]-p/2&&(l.style.left=e+"px"),n>m[m.length-1]-p/2&&(l.style.left=m[m.length-1]+"px")}),g(),i.value=y(d.style.left),u.value=y(f.style.left)}function a(e){t(e.clientX)}function r(){document.removeEventListener("mousemove",a),document.removeEventListener("mouseup",r)}l.onmousedown=function(e){if(e.target.closest(".slider__btn"))return t=e.clientX,n=e.clientY,s=l.getBoundingClientRect(),c=t-s.left,n-s.top,o=v.getBoundingClientRect(),document.addEventListener("mousemove",a),document.addEventListener("mouseup",r),!1;var t,n}}d.style.left=m[i.value]+"px",f.style.left=m[u.value]+"px",g(),d.ondragstart=function(){return!1},f.ondragstart=function(){return!1},l(d),l(f),i.addEventListener("input",function(e){i.value>m.length-1&&(i.value=u.value),i.value>u.value&&1<=u.value.length&&n(i.value)&&(i.value=u.value),1<=i.value.length&&!n(i.value)&&(i.value=m[0]),m.forEach(function(e,t){i.value==t&&(d.style.left=e+"px"),i.value.length<1&&(d.style.left=m[0]+"px")}),t.forEach(function(e,t){e.style.zIndex=0,(t<i.value&&1<=i.value.length||t>=u.value&&1<=u.value.length)&&(e.style.zIndex=3)})}),u.addEventListener("input",function(e){u.value>m.length-1&&(u.value=m.length-1),u.value<i.value&&1<=u.value.length&&(u.value=i.value),1<=u.value.length&&!n(u.value)&&(u.value=m.length-1),m.forEach(function(e,t){u.value==t&&(f.style.left=e+"px"),u.value.length<1&&(f.style.left=m[m.length-1]+"px")}),t.forEach(function(e,t){e.style.zIndex=0,(t<i.value&&1<=i.value.length||t>=u.value&&1<=u.value.length)&&(e.style.zIndex=3)})}),i.addEventListener("blur",function(e){e.target.value.length<1&&(e.target.value=0)}),u.addEventListener("blur",function(e){e.target.value.length<1&&(e.target.value=m.length-1)})}(),function(){function c(){var e,t,n,l,o,s=document.querySelectorAll(".statistics__value");e=s[0],t=e.getBoundingClientRect(),n=document.documentElement.clientHeight,l=0<t.top&&t.top<n,o=t.bottom<n&&0<t.bottom,(l||o)&&(s.forEach(function(e){var t=1,n=parseInt(e.textContent),l=Math.round(n/500),o=setInterval(function(){t<=n?e.textContent=t+" $":(e.textContent=n+" $",clearInterval(o)),t+=l},1)}),window.removeEventListener("scroll",c))}window.addEventListener("scroll",c),c()}(),function(){var n=this,l=document.querySelector(".catalog"),o=document.querySelector(".pop-up"),s=document.querySelector(".filters"),c=void 0,a=void 0,r=void 0,i=void 0;function u(e){var t=e.getBoundingClientRect();return{top:t.top+pageYOffset,left:t.left+pageXOffset}}var d={bs:"Battle-Scarred",ww:"Well-Worn",ft:"Field-Tested",mw:"Minimal Wear",fn:"Factory New"};var f=null;l.addEventListener("mouseover",function(e){if(!f){var t=e.target;if(!t.matches(".pop-up, .pop-up *")&&t.closest(".product")){for(;t!=n&&!t.classList.contains("product");)t=t.parentNode;t!=n&&(c=u(f=t),a=u(l),r=c.top+t.offsetHeight,i=a.top+l.offsetHeight,o.style.top=i<r?"100%":c.top-a.top+t.offsetHeight+s.offsetHeight+"px",o.style.left=c.left-a.left+t.offsetWidth/2+"px",function(e,t){t.querySelector(".pop-up__model-quality").textContent=d[e.querySelector(".product__quality").textContent],e.classList.contains("block")?t.querySelector(".pop-up__block").style.display="block":t.querySelector(".pop-up__block").style.display="none",e.querySelector(".product__time")?(t.querySelector(".pop-up__time").style.display="block",t.querySelector(".pop-up__time").textContent=e.querySelector(".product__time").textContent.replace(/:/g," : ")):t.querySelector(".pop-up__time").style.display="none",e.querySelector(".product__stattrack")?t.querySelector(".pop-up__stattrack").style.display="flex":t.querySelector(".pop-up__stattrack").style.display="none",t.querySelectorAll(".pop-up__sticker").forEach(function(e){e.remove()});var n=document.createDocumentFragment();e.querySelectorAll(".product__sticker").forEach(function(e){var t=e.cloneNode(!0);t.classList.remove("product__sticker"),t.classList.add("pop-up__sticker"),n.appendChild(t)}),t.querySelector(".pop-up__stickers").appendChild(n)}(t,o),o.classList.remove("hidden"))}}}),l.addEventListener("mouseout",function(e){if(f){var t=e.relatedTarget;if(t)for(;t;){if(t==f)return;t=t.parentNode}f.classList.remove("inspect"),o.classList.add("hidden"),f=null}}),l.addEventListener("contextmenu",function(e){if(e.preventDefault(),e.target.matches(".product, .product *")){for(var t=e.target;!t.classList.contains("product");)t=t.parentNode;t.classList.toggle("inspect")}}),l.addEventListener("ps-scroll-y",function(e){o.classList.add("hidden")})}();