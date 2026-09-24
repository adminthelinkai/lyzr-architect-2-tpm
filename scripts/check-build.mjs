import {readFile,stat} from 'node:fs/promises';
import assert from 'node:assert/strict';
for(const path of ['dist/index.html','dist/app.js','dist/state.js','dist/styles.css','dist/favicon.svg'])assert((await stat(path)).size>0,path);
const html=await readFile('dist/index.html','utf8');for(const match of html.matchAll(/(?:src|href)="\.\/([^"#]+)"/g))await stat('dist/'+match[1]);
const manifest=JSON.parse(await readFile('.openai/hosting.json','utf8'));assert.equal(manifest.static.directory,'dist');
console.log('Static release validated: source modules and assets exist; no bundler or runtime dependencies required.');
