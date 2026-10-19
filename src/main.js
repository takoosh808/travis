import { projects } from './projects.js';
const grid=document.querySelector('#projects');
const escapeHTML=value=>value.replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
projects.forEach((p,i)=>{
 const card=document.createElement('article');card.className='project';card.dataset.category=p.filter;
 card.innerHTML=`<div class="card-heading"><span class="meta">${escapeHTML(p.category)}</span><span class="project-number">${String(i+1).padStart(2,'0')}</span></div><h3><button class="project-title" data-project="${p.id}">${escapeHTML(p.title)}</button></h3><p>${escapeHTML(p.description)}</p><div class="tags">${p.tags.map(t=>`<span>${escapeHTML(t)}</span>`).join('')}</div><div class="card-footer"><span class="project-stage">${escapeHTML(p.status)}</span><button class="detail-link" data-project="${p.id}" aria-label="View ${escapeHTML(p.title)} details">View project <span aria-hidden="true">→</span></button></div>`;
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
