export const categories = {math:{label:'Toán học',color:'#345ac3',bg:'#edf2ff',symbol:'∑'},code:{label:'Lập trình',color:'#7650a3',bg:'#f4edfc',symbol:'⌘'},physical:{label:'Thể chất',color:'#257350',bg:'#eaf6ee',symbol:'↗'},other:{label:'Khác',color:'#985518',bg:'#fff3e3',symbol:'◇'}};
export const statuses={planned:'Sắp học',done:'Hoàn thành',missed:'Đã bỏ lỡ'};
export const uid=()=>globalThis.crypto.randomUUID();
export function dateKey(d=new Date()){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
export function addDays(key,n){const d=new Date(key+'T12:00:00');d.setDate(d.getDate()+n);return dateKey(d);}
export function monday(key){const d=new Date(key+'T12:00:00');return addDays(key,-((d.getDay()+6)%7));}
export function validDate(s){return typeof s==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(new Date(s+'T12:00:00').getTime())&&dateKey(new Date(s+'T12:00:00'))===s;}
export function safeURL(value){try{const u=new URL(value);return ['http:','https:'].includes(u.protocol)?u.href:null;}catch{return null;}}
export function overlaps(a,b){return a.date===b.date&&a.start<b.end&&b.start<a.end;}
export function score(a){return Math.round((a.understanding+a.practice+a.confidence)/15*100);}
export function level(n){return n>=80?'Nắm vững':n>=60?'Đang tiến bộ':'Cần ôn tập';}
export function emptyData(){return {version:1,subjects:[],events:[],notes:[],assessments:[]};}
export function validate(data){
 const fail=m=>{throw new Error(m);};
 if(!data||data.version!==1)fail('Phiên bản dữ liệu không được hỗ trợ.');
 for(const k of ['subjects','events','notes','assessments'])if(!Array.isArray(data[k])||data[k].length>10000)fail('Danh sách dữ liệu không hợp lệ: '+k);
 const text=(v,max=10000)=>typeof v==='string'&&v.length<=max;
 const ids=new Set();
 for(const k of ['subjects','events','notes','assessments'])for(const x of data[k]){if(!x||!text(x.id,100)||!x.id||ids.has(x.id))fail('ID trống hoặc trùng lặp.');ids.add(x.id);}
 const subjects=new Set(data.subjects.map(s=>s.id));
 for(const s of data.subjects)if(!text(s.name,100)||!s.name.trim()||!Object.hasOwn(categories,s.category)||!text(s.teacher,200)||!text(s.goal,3000))fail('Môn học không hợp lệ.');
 for(const k of ['events','notes','assessments'])for(const x of data[k])if(!subjects.has(x.subjectId))fail('Dữ liệu tham chiếu môn học không tồn tại.');
 for(const e of data.events)if(!text(e.title,200)||!e.title.trim()||!validDate(e.date)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.start)||!/^([01]\d|2[0-3]):[0-5]\d$/.test(e.end)||e.end<=e.start||!text(e.location,200)||!text(e.detail)||!Object.hasOwn(statuses,e.status))fail('Buổi học không hợp lệ (kiểm tra ngày và giờ).');
 for(const n of data.notes){if(!text(n.title,200)||!n.title.trim()||!text(n.body)||!validDate(n.date)||!Array.isArray(n.links)||n.links.length>50)fail('Ghi chú không hợp lệ.');for(const l of n.links)if(!text(l.label,200)||!l.label.trim()||!text(l.url,2048)||!safeURL(l.url))fail('Liên kết chỉ chấp nhận http hoặc https.');}
 for(const a of data.assessments)if(!validDate(a.date)||![a.understanding,a.practice,a.confidence].every(v=>Number.isInteger(v)&&v>=1&&v<=5)||!text(a.reflection)||!text(a.nextStep,3000))fail('Đánh giá phải từ 1 đến 5.');
 return data;
}
export function removeSubject(data,id){for(const key of ['events','notes','assessments'])data[key]=data[key].filter(x=>x.subjectId!==id);data.subjects=data.subjects.filter(x=>x.id!==id);return data;}
export function demoData(){
 const d=emptyData(),week=monday(dateKey());
 d.subjects=[{id:'math',name:'Giải tích 1A',category:'math',teacher:'',goal:'Hiểu định nghĩa, tự trình bày được chứng minh.'},{id:'code',name:'Lập trình C++',category:'code',teacher:'',goal:'Nắm vững hàm, mảng và tư duy giải quyết vấn đề.'},{id:'pe',name:'Giáo dục thể chất',category:'physical',teacher:'',goal:'Duy trì vận động và cải thiện sức bền.'}];
 d.events=[['e1','math',0,'08:00','09:30','Giới hạn và tính liên tục','Phòng A203'],['e2','code',1,'09:00','11:00','Hàm và mảng một chiều','Phòng máy B102'],['e3','math',2,'14:00','15:30','Bài tập chứng minh','Tự học'],['e4','pe',3,'16:00','17:00','Chạy bền & giãn cơ','Sân thể thao'],['e5','code',4,'08:00','10:00','Thực hành C++','Phòng máy B102']].map(([id,subjectId,day,start,end,title,location])=>({id,subjectId,date:addDays(week,day),start,end,title,location,detail:'Dữ liệu minh họa — bạn có thể sửa hoặc xóa buổi học này.',status:'planned'}));
 d.notes=[{id:'n1',subjectId:'math',title:'Chứng minh từ định nghĩa',body:'1. Viết đúng giả thiết và kết luận.\n2. Mở định nghĩa liên quan.\n3. Chọn đối tượng tùy ý và lập luận từng bước.\n4. Kiểm tra điều kiện và kết luận.',date:dateKey(),links:[]}];
 d.assessments=[{id:'a1',subjectId:'math',date:dateKey(),understanding:3,practice:3,confidence:2,reflection:'Đã hiểu khái niệm, cần luyện cách trình bày.',nextStep:'Tự giải 3 bài chứng minh không nhìn lời giải.'}];return d;
}
