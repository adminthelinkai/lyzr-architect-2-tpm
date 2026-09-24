/** Pure domain transitions. No network calls, secret handling, or model inference. */
export const SCHEMA = 1;
export const frameworks = ['Lyzr Studio', 'LangGraph', 'CrewAI', 'Custom contract'];
export const sampleImport = {
  name: 'Sitewise · imported', framework: 'LangGraph',
  files: ['package.json', 'src/app.tsx', 'agents/graph.py', 'requirements.txt'],
  dependencies: ['react', 'langgraph'], requiredEnv: ['MODEL_API_KEY'],
};
export const cases = [
  {id:'NCR-1042', title:'Weld inspection outside tolerance', area:'Pipe rack · Zone B', severity:'High', owner:'Quality lead', confidence:0.91, description:'Visual inspection found a weld discontinuity on spool SP-218. Hold the affected work and request qualified inspection; do not infer acceptance.'},
  {id:'NCR-1043', title:'Material certificate missing', area:'Receiving · Lot 042', severity:'Medium', owner:'Materials team', confidence:0.67, description:'Mill test certificate is missing for a delivered batch. Verify the approved material specification before release.'},
  {id:'NCR-1044', title:'Drawing revision mismatch', area:'Assembly · Bay 4', severity:'Medium', owner:'Engineering', confidence:0.84, description:'Work package references revision C; the sample document register lists revision D. Request engineering review.'},
];
const clone = value => structuredClone(value);
export function createProject(name='Sitewise · Quality triage', imported=false) {
  return {
    id: crypto.randomUUID(), name, outcome:'Triage site quality exceptions, find the relevant procedure, and route a draft action to the right engineer.',
    audience:'Site quality and project teams', owner:'Quality lead', threshold:80, sla:24, notifications:false,
    framework: imported ? 'LangGraph' : 'Lyzr Studio', model:'Balanced · sample model',
    instructions:'Classify the exception. Cite the supplied procedure. If evidence is missing or confidence is below the review threshold, ask a qualified engineer. Never approve work autonomously.',
    tools:['knowledge.search','review.create'], knowledge:['QMS-07 · Nonconformance procedure'],
    connections:{knowledge:'missing',teams:'missing',model:imported?'missing':'sample'},
    stage:imported?'built':'plan', revision:1, builtRevision:imported?1:0, approved:false,
    importInfo:imported?clone(sampleImport):null, studio:false, pending:null, undo:null,
    history:[{title:imported?'Sample repository imported':'Outcome captured',detail:'Local sample project created.',revision:1}],
    messages:[{role:'assistant',text: imported ? 'I found a React interface and a LangGraph agent entrypoint. MODEL_API_KEY is missing. Review the architecture, then use the sample model connection to continue.' : 'Let’s make quality exceptions easier to act on. First confirm who reviews uncertain findings. I’ll keep the plan, agent behavior, and preview together.'}],
    github:{connected:false,repo:'sample-org/sitewise',branch:'architect/quality-review',syncedRevision:0,conflict:false,automatic:true},
    tests:[], releases:[], activeRelease:null, releaseStatus:'idle', releaseError:'',
    members:[], records:clone(cases).map(c=>({...c,status:'Needs review'})), runs:0,budget:25,
  };
}
export function initialState(){return {schema:SCHEMA,session:null,mode:'guided',active:null,projects:[]};}
export function restoreState(raw){
  if(!raw) return initialState();
  try {const s=JSON.parse(raw); if(s.schema!==SCHEMA||!Array.isArray(s.projects)) return initialState();
    // Rehydrate interrupted operations into recoverable states.
    for(const p of s.projects){if(p.stage==='building')p.stage='cancelled';if(p.releaseStatus==='deploying'){p.releaseStatus='failed';p.releaseError='The session ended during release. Retry to continue.';}}
    if(s.projects.some(p=>!p.id||!p.connections||!p.github||!Array.isArray(p.records)||!Array.isArray(p.messages)||!Array.isArray(p.history)))return initialState();
    if(s.active&&!s.projects.some(p=>p.id===s.active))s.active=null;
    return s;
  }catch{return initialState();}
}
export function inspectImport(raw){
  let m; try{m=JSON.parse(raw);}catch{throw new Error('This is not valid JSON. Load the sample manifest or fix the syntax. Your input is preserved.');}
  if(!m||typeof m.name!=='string'||!m.name.trim()||m.name.length>100)throw new Error('Provide a project name of 1–100 characters.');
  if(!frameworks.includes(m.framework))throw new Error('Choose Lyzr Studio, LangGraph, CrewAI, or Custom contract. Runtime adapters are design proposals.');
  if(!Array.isArray(m.files)||!m.files.length||m.files.some(f=>typeof f!=='string'||f.includes('..')||f.startsWith('/')))throw new Error('Provide safe, relative file paths in a non-empty files array.');
  if(!Array.isArray(m.dependencies)||m.dependencies.some(x=>typeof x!=='string'))throw new Error('Provide a dependencies array containing names.');
  if(!Array.isArray(m.requiredEnv)||m.requiredEnv.some(x=>typeof x!=='string'||!/^[A-Z][A-Z0-9_]*$/.test(x)))throw new Error('Provide requiredEnv as uppercase variable names, never credential values.');
  return {name:m.name.trim(),framework:m.framework,files:m.files,dependencies:m.dependencies,requiredEnv:m.requiredEnv};
}
function capture(p){return clone({name:p.name,outcome:p.outcome,audience:p.audience,owner:p.owner,threshold:p.threshold,sla:p.sla,notifications:p.notifications,framework:p.framework,model:p.model,instructions:p.instructions,tools:p.tools,knowledge:p.knowledge,studio:p.studio});}
function record(p,title,detail){p.history.unshift({title,detail,revision:p.revision});}
function revise(p,title,detail){p.revision++;p.tests=[];record(p,title,detail);if(p.github.connected&&p.github.automatic&&!p.github.conflict)p.github.syncedRevision=p.revision;}
export function proposeChange(p,text){
  const t=text.toLowerCase(); let patch={}, title='';
  if(/teams|notif|alert/.test(t)){patch={notifications:!/(remove|disable|turn off)/.test(t)};title=patch.notifications?'Notify the quality team':'Remove team notifications';}
  else if(/confidence|threshold/.test(t)){const n=t.match(/\b(\d{1,3})\b/);if(!n||+n[1]<50||+n[1]>99)throw new Error('Use a review threshold from 50 to 99. For example: set confidence threshold to 90.');patch={threshold:+n[1]};title=`Review findings below ${patch.threshold}% confidence`;}
  else if(/sla|hour|response/.test(t)){const n=t.match(/\b(\d{1,3})\b/);if(!n||+n[1]<1||+n[1]>168)throw new Error('Use a response window from 1 to 168 hours.');patch={sla:+n[1]};title=`Respond within ${patch.sla} hours`;}
  else if(/rename|title/.test(t)){const name=text.replace(/^.*?(?:rename(?: the app)?(?: to)?|title(?: to)?)\s*/i,'').trim();if(!name||name.length>80)throw new Error('Enter a new title of 1–80 characters.');patch={name};title=`Rename the app to ${name}`;}
  else throw new Error('This prototype supports team alerts, confidence thresholds, response hours, and renaming. Try a suggested change below; free-form generation is deferred.');
  return {title,text,patch,baseRevision:p.revision,before:capture(p),impact:[
    {layer:'Interface',detail:patch.notifications!==undefined?'Show notification status beside each exception.':patch.threshold?`Update review badges for findings below ${patch.threshold}%.`:patch.sla?`Show a ${patch.sla}-hour response window.`:`Update the app header to “${patch.name}”.`},
    {layer:'Agents',detail:patch.notifications!==undefined?'Update the handoff agent’s allowed tool list.':patch.threshold?'Change the human-review routing rule.':patch.sla?'Update the handoff response deadline.':'Keep classification and routing unchanged.'},
    {layer:'Connections',detail:patch.notifications?'Require Teams permission before release.':'No new connection required.'},
  ]};
}
export function fileMap(p){return {
  'app.config.json':JSON.stringify({name:p.name,outcome:p.outcome,owner:p.owner,reviewBelow:p.threshold,responseHours:p.sla,notifications:p.notifications},null,2),
  'agents/triage.contract.json':JSON.stringify({schemaVersion:1,framework:p.framework,model:p.model,instructions:p.instructions,input:{id:'string',description:'string',evidence:'string[]'},output:{severity:'High | Medium | Low',confidence:'number',citations:'string[]',requiresHuman:'boolean'},tools:p.tools},null,2),
  'tools/contracts.json':JSON.stringify({ 'knowledge.search':{input:{query:'string'},output:{citations:'string[]'},permission:'read:quality-documents'},'review.create':{input:{exceptionId:'string',owner:'string',deadlineHours:'number'},output:{reviewId:'string'},permission:'create:draft-review'},...(p.notifications?{'teams.notify':{input:{reviewId:'string'},output:{queued:'boolean'},permission:'send:quality-channel',humanApproval:true}}:{})},null,2),
  'README.md':`# ${p.name}\n\n${p.outcome}\n\nFramework: ${p.framework}\nThis is an illustrative contract, not an executable framework adapter.\nSample data only; all external calls are simulated.`,
};}
export function readiness(p){return [
  {key:'build',label:'App preview is built',ok:p.builtRevision>0,target:'build'},
  {key:'knowledge',label:'Quality procedure connected',ok:p.connections.knowledge==='connected',target:'data'},
  {key:'model',label:'Model configuration available',ok:p.connections.model!=='missing',target:'data'},
  {key:'teams',label:p.notifications?'Teams permission granted':'No notification permission needed',ok:!p.notifications||p.connections.teams==='connected',target:'data'},
  {key:'test',label:'Current revision passed the sample suite',ok:p.tests.some(t=>t.suite&&t.passed&&t.revision===p.revision),target:'test'},
  {key:'github',label:p.github.connected?'GitHub changes synchronized':'Source export available; GitHub optional',ok:!p.github.connected||(!p.github.conflict&&p.github.syncedRevision===p.revision),target:'github'},
];}
export function runCase(p,kind='normal'){
  const error = p.connections.knowledge!=='connected'?'Knowledge connection is missing.':p.connections.model==='missing'?'MODEL_API_KEY is missing. Use the sample connection.':kind==='timeout'?'The sample provider timed out. Retry the normal scenario.':p.notifications&&p.connections.teams!=='connected'?'Teams denied send permission. Reconnect with the quality channel scope.':null;
  return {passed:!error,kind,revision:p.revision,error,route:kind==='uncertain'||67<p.threshold?'Human review':'Draft action',citation:!error?'QMS-07 §4.2 (sample)':'None',trace:error?['Input received',error]:['Input validated','Sample procedure retrieved','Confidence 0.67 compared with review threshold','Draft routed to '+p.owner]};
}
export function transition(project,action){
  const p=clone(project);const d=action.data||{};
  switch(action.type){
    case 'PLAN':
      if(!d.outcome?.trim()||!d.owner?.trim())throw new Error('Describe the outcome and assign a review owner.');
      if(!Number.isFinite(+d.threshold)||+d.threshold<50||+d.threshold>99)throw new Error('Review threshold must be between 50 and 99.');
      Object.assign(p,{outcome:d.outcome.trim(),audience:d.audience||p.audience,owner:d.owner.trim(),threshold:+d.threshold,approved:true});revise(p,'Plan approved','Outcome, owner, and review rule confirmed.');break;
    case 'BUILD_START':if(!p.approved&&!p.importInfo)throw new Error('Approve the plan before building.');p.stage='building';record(p,'Build started','Preparing agents, contracts, and the sample interface.');break;
    case 'BUILD_CANCEL':p.stage='cancelled';record(p,'Build cancelled','Your plan and inputs are preserved.');break;
    case 'BUILD_DONE':if(p.stage!=='building')throw new Error('No build is in progress.');p.stage='built';p.builtRevision=p.revision;record(p,'Preview ready','Interactive sample application is available.');break;
    case 'PROPOSE':p.pending=proposeChange(p,d.text);p.messages.push({role:'user',text:d.text});break;
    case 'DISCARD':p.pending=null;break;
    case 'APPLY':
      if(!p.pending)throw new Error('No change is waiting for review.');
      if(p.pending.baseRevision!==p.revision)throw new Error('The project changed after this proposal. Discard and propose it again.');
      p.undo=capture(p);Object.assign(p,p.pending.patch);
      p.tools=p.notifications?[...new Set([...p.tools,'teams.notify'])]:p.tools.filter(t=>t!=='teams.notify');
      revise(p,p.pending.title,'Applied across app configuration, agents, and connection requirements.');p.messages.push({role:'assistant',text:`Applied: ${p.pending.title}. Tests need to be rerun. You can undo this change.`});p.pending=null;if(p.builtRevision)p.builtRevision=p.revision;break;
    case 'UNDO':if(!p.undo)throw new Error('No applied change to undo.');Object.assign(p,p.undo);p.undo=null;p.pending=null;revise(p,'Change undone','Restored the prior app and agent configuration.');if(p.builtRevision)p.builtRevision=p.revision;break;
    case 'CONNECTION':
      if(!['knowledge','teams','model'].includes(d.key))throw new Error('Unknown connection.');
      p.connections[d.key]=d.status;revise(p,`${d.key} connection ${d.status}`,'Sample connection state updated; no credentials were transmitted.');break;
    case 'AGENT':
      if(!d.instructions?.trim()||!frameworks.includes(d.framework))throw new Error('Supply agent instructions and a supported configuration format.');
      p.instructions=d.instructions.trim();p.framework=d.framework;p.model=d.model||p.model;revise(p,'Agent configuration saved','Contract metadata changed; runtime compatibility is not implied.');break;
    case 'STUDIO':p.studio=true;revise(p,'Studio agent reused','Sample Quality handoff agent attached by reference.');break;
    case 'KNOWLEDGE':if(!d.name?.trim())throw new Error('Provide a source name.');p.knowledge.push(d.name.trim());revise(p,'Knowledge source added','Local source metadata only.');break;
    case 'TEST':{const r=runCase(p,d.kind);r.suite=d.kind==='suite';p.tests.unshift(r);p.runs++;record(p,r.passed?'Sample test passed':'Sample test failed',r.error||'Deterministic contract and routing checks completed.');break;}
    case 'GITHUB_CONNECT':p.github.connected=true;p.github.syncedRevision=0;record(p,'GitHub sample connected','Review repository and branch before syncing.');break;
    case 'GITHUB_CONFIG':
      if(!/^[\w.-]+\/[\w.-]+$/.test(d.repo)||!d.branch?.trim()||/[\s~^:?*\[\\]/.test(d.branch)||d.branch.includes('..'))throw new Error('Provide owner/repository and a valid branch name.');
      Object.assign(p.github,{repo:d.repo,branch:d.branch,automatic:d.automatic});p.github.syncedRevision=0;break;
    case 'GITHUB_CONFLICT':p.github.conflict=true;record(p,'Sync conflict detected','Sample remote response window differs from local configuration.');break;
    case 'GITHUB_RESOLVE':if(!p.github.conflict)throw new Error('No conflict to resolve.');if(d.choice==='remote'){p.sla=48;revise(p,'Remote change accepted','Response window is now 48 hours.');}p.github.conflict=false;p.github.syncedRevision=0;record(p,'Conflict resolved',d.choice==='remote'?'Remote version selected.':'Local version kept.');break;
    case 'GITHUB_SYNC':if(!p.github.connected||p.github.conflict)throw new Error('Connect GitHub and resolve conflicts before syncing.');p.github.syncedRevision=p.revision;record(p,'Sample changes synced',`${p.github.repo} · ${p.github.branch} · revision ${p.revision}`);break;
    case 'DEPLOY_START':if(readiness(p).some(c=>!c.ok))throw new Error('Resolve the release checks before deploying.');p.releaseStatus='deploying';p.releaseRevision=p.revision;p.releaseError='';break;
    case 'DEPLOY_FAIL':p.releaseStatus='failed';p.releaseError='Sample health check timed out. No release was activated. Retry with the healthy scenario.';record(p,'Release failed',p.releaseError);break;
    case 'DEPLOY_DONE':if(p.releaseStatus!=='deploying')throw new Error('Start a release first.');if(p.releaseRevision!==p.revision||readiness(p).some(c=>!c.ok)){p.releaseStatus='failed';p.releaseError='The project changed during release. Review and test the current revision, then retry.';record(p,'Release interrupted',p.releaseError);break;}{const release={id:crypto.randomUUID(),version:p.releases.length+1,revision:p.revision,snapshot:capture(p),time:new Date().toISOString()};p.releases.unshift(release);p.activeRelease=release.id;p.releaseStatus='success';record(p,`Demo release v${release.version} ready`,'Simulation completed. This sample app was not published to a separate service.');}break;
    case 'ROLLBACK':{const r=p.releases.find(r=>r.id===d.id);if(!r)throw new Error('Release not found.');Object.assign(p,clone(r.snapshot));p.activeRelease=r.id;p.pending=null;p.undo=null;revise(p,`Rolled back to v${r.version}`,'Restored the release configuration. Connection credentials are not rolled back.');p.builtRevision=p.revision;p.releaseStatus='success';break;}
    case 'REVIEW':{const r=p.records.find(r=>r.id===d.id);if(!r)throw new Error('Exception not found.');r.status='Assigned to '+p.owner;record(p,'Human review assigned',r.id+' remains subject to qualified approval.');break;}
    case 'MEMBER':if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))throw new Error('Enter a valid email address.');if(p.members.some(m=>m.email===d.email))throw new Error('This person is already in the local access list.');p.members.push({email:d.email,role:d.role||'Reviewer'});record(p,'Local collaborator added','No invitation was sent.');break;
    case 'SETTINGS':if(!d.name?.trim()||!(+d.budget>0))throw new Error('Enter a project name and a positive budget.');p.name=d.name.trim();p.budget=+d.budget;revise(p,'Project settings saved','Local name and illustrative budget updated.');break;
    default:throw new Error(`Unknown action: ${action.type}`);
  }return p;
}
