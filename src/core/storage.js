import {emptyData,validate} from './model.js';
export const KEY='studyflow:data:v1';
export function load(){const raw=localStorage.getItem(KEY);return raw?validate(JSON.parse(raw)):emptyData();}
export function save(data){validate(data);localStorage.setItem(KEY,JSON.stringify(data));}
export function download(data){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=`studyflow-backup-${new Date().toISOString().slice(0,10)}.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
