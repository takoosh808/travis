import { projects } from './projects.js';
const grid=document.querySelector('#projects');
const escapeHTML=value=>value.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
projects.forEach((p,i)=>{
 const card=document.createElement('article');card.className='project';card.dataset.category=p.filter;
 card.innerHTML=`<button class="art ${p.id}" data-project="${p.id}" aria-label="Explore ${escapeHTML(p.title)}"><div class="art-top"><span>${escapeHTML(p.category)}</span><span>↗</span></div><div class="art-grid"></div><div class="symbol" aria-hidden="true">${p.symbol}</div><div class="headline">${escapeHTML(p.headline).replace('\n','<br>')}</div><span class="caption">${escapeHTML(p.status)}</span></button><div class="meta">${String(i+1).padStart(2,'0')} / ${escapeHTML(p.category)}</div><button class="project-title" data-project="${p.id}">${escapeHTML(p.title)} <span>↗</span></button><p>${escapeHTML(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div>`;
 grid.append(card);
});
const dialog=document.querySelector('dialog');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
 const p=projects.find(p=>p.id===button.dataset.project);
 for(const field of ['title','category','status','description','exploration'])document.querySelector(`#detail-${field}`).textContent=p[field];
 document.querySelector('#detail-tags').replaceChildren(...p.tags.map(tag=>{const el=document.createElement('span');el.textContent=tag;return el;}));dialog.showModal();
}));
document.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{
 document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.toggle('active',b===button);b.setAttribute('aria-pressed',String(b===button));});
 document.querySelectorAll('.project').forEach(p=>p.hidden=button.dataset.filter!=='all'&&p.dataset.category!==button.dataset.filter);
}));
