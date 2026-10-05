import {categories} from '../core/model.js';
export const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const button=(text,action,cls='',extra='')=>`<button type="button" class="${cls}" data-action="${action}" ${extra}>${text}</button>`;
export function badge(s){const c=categories[s.category];return `<span class="badge" style="--color:${c.color};--tint:${c.bg}">${esc(c.label)}</span>`;}
export const empty=(text,action,label)=>`<div class="empty"><div class="empty-symbol">◇</div><p>${text}</p>${action?button(label,action,'primary'):''}</div>`;
export const field=(label,name,value='',type='text',attrs='')=>`<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" ${attrs}></label>`;
export const area=(label,name,value='',max=10000)=>`<label>${label}<textarea name="${name}" rows="4" maxlength="${max}">${esc(value)}</textarea></label>`;
export function select(label,name,options,value){return `<label>${label}<select name="${name}">${Object.entries(options).map(([k,v])=>`<option value="${esc(k)}" ${value===k?'selected':''}>${esc(v)}</option>`).join('')}</select></label>`;}
export function subjectOptions(data){return Object.fromEntries(data.subjects.map(s=>[s.id,s.name]));}
export function modal(title,body,submit='Lưu thay đổi'){return `<form id="edit-form"><header class="modal-head"><h2 id="dialog-title">${title}</h2>${button('×','close','icon','aria-label="Đóng"')}</header><div class="form-body">${body}<p class="form-error" role="alert" id="form-error"></p></div><footer class="modal-foot">${button('Hủy','close')}<button class="primary" type="submit">${submit}</button></footer></form>`;}
