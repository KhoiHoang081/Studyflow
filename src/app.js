import {categories,statuses,uid,dateKey,addDays,emptyData,demoData,validate,removeSubject,overlaps,safeURL} from './core/model.js';
import {load,save,download} from './core/storage.js';
import {esc,button,field,area,select,subjectOptions,modal} from './components/ui.js';
import {calendar} from './views/calendar.js';
import {subjects} from './views/subjects.js';
import {notebook} from './views/notebook.js';
import {settings} from './views/settings.js';
const app=document.querySelector('#app'),dialog=document.querySelector('#editor');
const routes={calendar:['▦','Lịch học'],subjects:['▤','Môn học'],notes:['▧','Ghi chú & tài liệu'],assessments:['◴','Tự đánh giá'],settings:['⚙','Dữ liệu & hướng dẫn']};
const ui={route:'calendar',date:dateKey(),mode:'week',filter:'',query:''};
let data,storageError='',editing=null,lastFocus=null;
try{data=load();}catch{data=emptyData();storageError='Không đọc được dữ liệu đã lưu. Để bảo vệ bản cũ, tính năng ghi đang bị khóa. Hãy xuất dữ liệu gốc bên dưới, rồi dùng phần Dữ liệu để nhập bản sao lưu hợp lệ hoặc xóa và bắt đầu lại.';}
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove('show'),4500);}
function commit(next,allowRecovery=false){if(storageError&&!allowRecovery)throw Error('Dữ liệu đang bị khóa để bảo vệ bản cũ. Vào Dữ liệu để khôi phục.');try{save(next);}catch(e){throw Error('Không lưu được: '+e.message+' Hãy kiểm tra dung lượng hoặc quyền lưu của trình duyệt.');}data=next;if(ui.filter&&!data.subjects.some(s=>s.id===ui.filter))ui.filter='';storageError='';render();}
function render(){
 app.innerHTML=`<aside class="sidebar"><a class="brand" href="#calendar"><img src="./assets/favicon.svg" alt="" width="36" height="36">StudyFlow<span>SPACE TO GROW</span></a><p class="nav-label">GÓC HỌC TẬP</p><nav>${Object.entries(routes).map(([key,[icon,label]])=>`<a href="#${key}" class="${ui.route===key?'active':''}" ${ui.route===key?'aria-current="page"':''}><span aria-hidden="true">${icon}</span>${label}</a>`).join('')}</nav><div class="sidebar-bottom"><div class="local-icon">K</div><div><b>Không gian cá nhân</b><small>Lưu trên thiết bị này</small></div></div></aside><div class="workspace"><header class="topbar"><span>Không gian học tập <b>/ ${routes[ui.route][1]}</b></span><time>${new Date().toLocaleDateString('vi-VN',{weekday:'long',day:'numeric',month:'numeric',year:'numeric'})}</time></header><main>${storageError?`<div class="error-banner" role="alert">${esc(storageError)} ${button('Tải dữ liệu gốc','raw-export')}</div>`:''}${ui.route==='calendar'?calendar(data,ui):ui.route==='subjects'?subjects(data):ui.route==='notes'?notebook(data,ui):ui.route==='assessments'?notebook(data,ui,true):settings()}</main></div>`;
}
function route(){const key=location.hash.slice(1);ui.route=Object.hasOwn(routes,key)?key:'calendar';render();}
window.addEventListener('hashchange',route);window.addEventListener('storage',e=>{if(e.key==='studyflow:data:v1'){try{data=load();storageError='';close();render();toast('Đã cập nhật thay đổi từ tab khác.');}catch{toast('Dữ liệu từ tab khác không hợp lệ. Hãy tải lại trang.');}}});
function close(){dialog.close();editing=null;lastFocus?.isConnected&&lastFocus.focus();}
function open(kind,id,defaultDate){
 if(kind!=='subject'&&!data.subjects.length){toast('Hãy tạo môn học trước.');open('subject');return;}
 const collection={subject:'subjects',event:'events',note:'notes',assessment:'assessments'}[kind],original=data[collection].find(x=>x.id===id),x=original??{};
 editing={kind,collection,id:original?.id};lastFocus=document.activeElement;
 let body='',title='';const s=select('Môn học','subjectId',subjectOptions(data),x.subjectId||ui.filter||data.subjects[0]?.id);
 if(kind==='subject'){title=original?'Sửa môn học':'Tạo môn học';body=field('Tên môn học *','name',x.name,'text','required maxlength="100"')+select('Nhóm môn học','category',Object.fromEntries(Object.entries(categories).map(([k,v])=>[k,v.label])),x.category||'math')+field('Giảng viên','teacher',x.teacher,'text','maxlength="200"')+area('Mục tiêu học tập','goal',x.goal,3000);}
 if(kind==='event'){title=original?'Chi tiết buổi học':'Thêm buổi học';body=s+field('Tên buổi học *','title',x.title,'text','required maxlength="200"')+field('Ngày học *','date',x.date||defaultDate||ui.date,'date','required')+`<div class="form-row">${field('Bắt đầu *','start',x.start||'08:00','time','required')}${field('Kết thúc *','end',x.end||'09:30','time','required')}</div>`+field('Địa điểm / lớp học','location',x.location,'text','maxlength="200"')+select('Trạng thái','status',statuses,x.status||'planned')+area('Nội dung chi tiết','detail',x.detail)+(!original?select('Lặp lại hàng tuần','repeat',{'1':'Không lặp','2':'Trong 2 tuần','4':'Trong 4 tuần','8':'Trong 8 tuần','16':'Trong 16 tuần'},'1')+'<p class="hint">Mỗi buổi lặp được lưu độc lập để dễ chỉnh sửa từng ngày.</p>':'');}
 if(kind==='note'){title=original?'Sửa ghi chú':'Tạo ghi chú';body=s+field('Tiêu đề *','title',x.title,'text','required maxlength="200"')+field('Ngày ghi chú *','date',x.date||dateKey(),'date','required')+area('Nội dung','body',x.body)+`<label>Liên kết tài liệu<textarea name="links" rows="4" placeholder="Giáo trình | https://...\nBài tập | https://...">${esc(x.links?.map(l=>l.label+' | '+l.url).join('\n')||'')}</textarea></label><p class="hint">Mỗi dòng: tên tài liệu | URL. Dán liên kết từ Drive, OneDrive, GitHub… Kiểm tra quyền chia sẻ ở dịch vụ lưu file.</p>`;}
 if(kind==='assessment'){title=original?'Sửa đánh giá':'Tự đánh giá môn học';const ratings={'1':'1 — Cần hỗ trợ nhiều','2':'2 — Còn khó khăn','3':'3 — Nắm được cơ bản','4':'4 — Khá vững','5':'5 — Rất vững'};body=s+field('Ngày đánh giá *','date',x.date||dateKey(),'date','required')+select('Mức độ hiểu bài','understanding',ratings,String(x.understanding||3))+select('Khả năng thực hành','practice',ratings,String(x.practice||3))+select('Sự tự tin','confidence',ratings,String(x.confidence||3))+area('Điều đã làm tốt / còn vướng','reflection',x.reflection)+area('Kế hoạch học tiếp','nextStep',x.nextStep,3000);}
 if(original)body+=`<div class="delete-row">${button('Xóa '+(kind==='subject'?'môn học':kind==='event'?'buổi học':kind==='note'?'ghi chú':'đánh giá'),'delete','danger')}</div>`;
 dialog.innerHTML=modal(title,body);if(!dialog.open)dialog.showModal();dialog.querySelector('input,select')?.focus();
}
function handleSubmit(e){e.preventDefault();const f=new FormData(e.target),get=k=>String(f.get(k)??'').trim(),{kind,collection,id}=editing;let x={id:id||uid()},next=structuredClone(data),records=[];
 try{
 if(kind==='subject')Object.assign(x,{name:get('name'),category:get('category'),teacher:get('teacher'),goal:get('goal')});
 if(kind==='event'){Object.assign(x,{subjectId:get('subjectId'),title:get('title'),date:get('date'),start:get('start'),end:get('end'),location:get('location'),detail:get('detail'),status:get('status')});const count=id?1:Number(get('repeat'));records=Array.from({length:count},(_,i)=>({...x,id:i?uid():x.id,date:addDays(x.date,i*7)}));}
 if(kind==='note'){const lines=get('links').split('\n').filter(l=>l.trim()),links=lines.map(line=>{const pos=line.indexOf('|'),label=pos>=0?line.slice(0,pos).trim():line.trim(),url=pos>=0?line.slice(pos+1).trim():line.trim();if(!safeURL(url))throw Error('Liên kết không hợp lệ. Dùng http:// hoặc https://.');return {label,url:safeURL(url)};});Object.assign(x,{subjectId:get('subjectId'),title:get('title'),date:get('date'),body:get('body'),links});}
 if(kind==='assessment')Object.assign(x,{subjectId:get('subjectId'),date:get('date'),understanding:Number(get('understanding')),practice:Number(get('practice')),confidence:Number(get('confidence')),reflection:get('reflection'),nextStep:get('nextStep')});
 if(!records.length)records=[x];next[collection]=[...next[collection].filter(v=>v.id!==id),...records];validate(next);
 if(kind==='event'&&records.some(a=>data.events.some(b=>b.id!==id&&overlaps(a,b)))&&!confirm('Có buổi học bị trùng giờ. Bạn vẫn muốn lưu?'))return;
 commit(next);close();toast('Đã lưu thành công.');
 }catch(err){dialog.querySelector('#form-error').textContent=err.message;}
}
dialog.addEventListener('submit',handleSubmit);dialog.addEventListener('cancel',e=>{e.preventDefault();close();});
document.addEventListener('click',e=>{const target=e.target.closest('[data-action]');if(!target)return;const a=target.dataset.action,id=target.dataset.id;try{
 if(a==='close'){close();return;}
 if(a.startsWith('new-')||a.startsWith('edit-')){open(a.replace(/^(new|edit)-/,''),id,target.dataset.date);return;}
 if(a==='delete'){const {kind,collection,id}=editing;if(!confirm(kind==='subject'?'Xóa môn học và TẤT CẢ lịch, ghi chú, đánh giá thuộc môn này?':'Xóa mục này?'))return;const next=structuredClone(data);if(kind==='subject')removeSubject(next,id);else next[collection]=next[collection].filter(x=>x.id!==id);commit(next);close();toast('Đã xóa.');return;}
 if(a==='week'||a==='month')ui.mode=a;
 if(a==='prev'||a==='next'){const sign=a==='prev'?-1:1;if(ui.mode==='week')ui.date=addDays(ui.date,sign*7);else{const d=new Date(ui.date.slice(0,7)+'-01T12:00');d.setMonth(d.getMonth()+sign);ui.date=dateKey(d);}}
 if(a==='today')ui.date=dateKey();
 if(a==='subject-notes'||a==='subject-assess'){ui.filter=id;location.hash=a==='subject-notes'?'notes':'assessments';return;}
 if(a==='export'){download(data);toast('Đã xuất bản sao lưu.');return;}
 if(a==='raw-export'){const raw=localStorage.getItem('studyflow:data:v1')??'';const url=URL.createObjectURL(new Blob([raw],{type:'text/plain'}));const link=document.createElement('a');link.href=url;link.download='studyflow-recovery.txt';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);return;}
 if(a==='import'){document.querySelector('#import-file').click();return;}
 if(a==='demo'){if((storageError||data.subjects.length)&&!confirm('Thay toàn bộ dữ liệu bằng dữ liệu minh họa? Hãy xuất bản sao lưu trước.'))return;commit(demoData(),true);toast('Đã nạp dữ liệu minh họa.');return;}
 if(a==='reset'){if(!confirm('Xóa toàn bộ lịch học, môn học, ghi chú và đánh giá trên trình duyệt này?'))return;commit(emptyData(),true);ui.filter='';render();toast('Đã xóa toàn bộ dữ liệu.');return;}
 render();
 }catch(err){toast(err.message);}});
document.addEventListener('change',async e=>{if(e.target.id==='subject-filter'){ui.filter=e.target.value;render();}if(e.target.id==='import-file'){const file=e.target.files[0];if(!file)return;try{if(file.size>5*1024*1024)throw Error('File vượt quá 5 MB.');const next=validate(JSON.parse(await file.text()));if(!confirm(`Nhập ${next.subjects.length} môn, ${next.events.length} buổi học và thay thế dữ liệu hiện có?`))return;commit(next,true);ui.filter='';render();toast('Khôi phục dữ liệu thành công.');}catch(err){toast('Không nhập được: '+err.message);}finally{e.target.value='';}}});
document.addEventListener('input',e=>{if(e.target.id==='search'){const pos=e.target.selectionStart;ui.query=e.target.value;render();const input=document.querySelector('#search');input.focus();input.setSelectionRange(pos,pos);}});
route();
