import test from 'node:test';
import assert from 'node:assert/strict';
import {blueprints} from '../dist/blueprints.js';
import {createProject,createFromPrompt,transition,fileMap,restoreState} from '../dist/state.js';
const act=(p,type,data)=>transition(p,{type,data});
test('independent domains have their own agents, records, knowledge and layouts; unknown prompts start blank',()=>{
 const support=createFromPrompt('Build a customer support helpdesk');const sales=createFromPrompt('Qualify sales leads');const research=createFromPrompt('Research topics and write sourced briefs');const custom=createFromPrompt('Manage my astronomy observations');
 assert.equal(support.blueprintId,'support');assert.equal(sales.layout,'board');assert.equal(research.layout,'briefs');assert.equal(custom.blueprintId,'custom');assert.equal(custom.records.length,0);assert.equal(custom.outcome,'Manage my astronomy observations');
 for(const [id,b] of Object.entries(blueprints)){const p=createProject(undefined,false,id);assert.equal(p.agents[0].name,b.agents[0].name);assert.equal(p.knowledge[0],b.source);p.agents[0].name='changed';assert.notEqual(b.agents[0].name,'changed');}
 assert.notDeepEqual(support.records,sales.records);assert.notDeepEqual(research.agents,sales.agents);
});
test('app structure, custom agent contracts and record workflow persist in exported configuration',()=>{
 let p=createProject(undefined,false,'custom');p=act(p,'STRUCTURE',{layout:'board',headline:'Observation log',entity:'observation',plural:'observations',fields:['Object','Telescope'],stages:['Planned','Observed','Reviewed']});
 p=act(p,'AGENT_ADD',{name:'Evidence reviewer',role:'Check observation notes',instructions:'Flag missing source details.',input:'Observation',output:'Review note',tools:['review.create']});
 p=act(p,'RECORD_ADD',{title:'Jupiter transit',values:{Object:'Jupiter',Telescope:'100 mm'}});p=act(p,'RECORD_STAGE',{id:p.records[0].id,stage:'Observed'});
 assert.equal(p.records[0].stage,'Observed');assert.equal(p.records[0].values.Object,'Jupiter');assert.equal(JSON.parse(fileMap(p)['app.schema.json']).entity,'observation');assert.equal(JSON.parse(fileMap(p)['agents/workflow.contract.json']).agents.length,2);
 assert.throws(()=>act(p,'STRUCTURE',{...p,stages:['Same','Same']}),/stages/);assert.throws(()=>act(p,'RECORD_STAGE',{id:p.records[0].id,stage:'Invalid'}),/valid/);
 const added=p.agents[1].id;p=act(p,'AGENT_REMOVE',{id:added});assert.equal(p.agents.length,1);assert.throws(()=>act(p,'AGENT_REMOVE',{id:p.agents[0].id}),/at least one/);
});
test('layout and notification edits undo coupled preview and agent configuration',()=>{
 let p=createProject();p=act(p,'PROPOSE',{text:'Use a kanban board layout'});p=act(p,'APPLY');assert.equal(p.layout,'board');p=act(p,'UNDO');assert.equal(p.layout,'inbox');
 p=act(p,'PROPOSE',{text:'Add Teams alerts'});p=act(p,'APPLY');assert(p.agents.at(-1).tools.includes('teams.notify'));p=act(p,'UNDO');assert(!p.agents.at(-1).tools.includes('teams.notify'));
});
test('schema migration preserves existing industry projects without making them the platform default',()=>{
 const original=createProject('Existing site work',false,'quality');delete original.agents;delete original.blueprintId;
 const restored=restoreState(JSON.stringify({schema:1,active:original.id,projects:[original]}));assert.equal(restored.schema,2);assert.equal(restored.projects[0].name,'Existing site work');assert.equal(restored.projects[0].blueprintId,'quality');assert.equal(restored.projects[0].records[0].id,original.records[0].id);assert.equal(createProject().blueprintId,'support');
});
