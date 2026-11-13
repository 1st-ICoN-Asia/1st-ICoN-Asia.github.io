/* Site-specific behaviour. CityU shared scripts are loaded from the CDN. */
'use strict';
(() => {
 const file=window.location.pathname.split('/').pop()||'index.htm';
 const current=file==='index.html'?'index.htm':file;
 document.querySelectorAll('.forum-navigation a').forEach(link=>{if(link.getAttribute('href')===current)link.setAttribute('aria-current','page');});
 const button=document.querySelector('.forum-menu-toggle'),nav=document.querySelector('.forum-navigation');
 if(button&&nav){button.addEventListener('click',()=>{const expanded=button.getAttribute('aria-expanded')==='true';button.setAttribute('aria-expanded',String(!expanded));nav.classList.toggle('is-open',!expanded);});nav.addEventListener('keydown',event=>{if(event.key==='Escape'){button.setAttribute('aria-expanded','false');nav.classList.remove('is-open');button.focus();}});document.body.classList.add('forum-menu-ready');}
})();
