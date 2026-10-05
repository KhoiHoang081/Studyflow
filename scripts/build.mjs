import {mkdir,rm,cp,writeFile} from 'node:fs/promises';
await rm('dist',{recursive:true,force:true});await mkdir('dist',{recursive:true});
for(const file of ['index.html','src','assets'])await cp(file,`dist/${file}`,{recursive:true});
await writeFile('dist/.nojekyll','');console.log('Built static website in dist/');
