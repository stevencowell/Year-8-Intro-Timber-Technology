import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root=process.cwd();
const failures=[];
const assert=(condition,message)=>{if(!condition)failures.push(message)};
const read=file=>fs.readFileSync(path.join(root,file),'utf8');

const required=['index.html','plans.html','folio.html','busy-work.html','youtube.html','teacher-resources.html','styles.css','site.js','module.js','assets/resources/Footstool.pdf'];
for(const file of required)assert(fs.existsSync(path.join(root,file)),`Missing ${file}`);
for(let module=1;module<=10;module++)assert(fs.existsSync(path.join(root,'modules',`module-${String(module).padStart(2,'0')}.html`)),`Missing module route ${module}`);

let sections=0,questions=0;
const questionTexts=new Map();
for(let module=1;module<=10;module++)for(let section=1;section<=3;section++){
  const moduleNo=String(module).padStart(2,'0'),sectionNo=String(section).padStart(2,'0');
  const id=`m${moduleNo}-s${sectionNo}`,file=path.join(root,'assets','data',`${id}.json`);
  assert(fs.existsSync(file),`Missing data ${id}`);if(!fs.existsSync(file))continue;
  let data;try{data=JSON.parse(fs.readFileSync(file,'utf8'))}catch(error){failures.push(`Invalid JSON ${id}: ${error.message}`);continue}
  sections++;
  assert(data.sectionId===id,`${id}: wrong sectionId`);
  assert(Array.isArray(data.theory)&&data.theory.length===3,`${id}: requires exactly 3 theory parts`);
  assert(Array.isArray(data.questions)&&data.questions.length===10,`${id}: requires exactly 10 questions`);
  const theoryWords=(data.theory||[]).flatMap(item=>String(item.body||'').trim().split(/\s+/)).filter(Boolean).length;
  assert(theoryWords>=220&&theoryWords<=300,`${id}: theory depth is ${theoryWords} words; expected 220-300`);
  const headings=new Set((data.theory||[]).map(item=>item.heading));
  const answerPattern=(data.questions||[]).map(question=>question.answer).join('');
  assert(answerPattern==='ABCDBCDACD',`${id}: unbalanced answer positions ${answerPattern}`);
  for(const [index,q] of (data.questions||[]).entries()){
    questions++;
    const expected=`${id.replaceAll('-','').toUpperCase()}Q${String(index+1).padStart(2,'0')}`;
    assert(q.id===expected,`${id}: expected question ${expected}`);
    assert(Array.isArray(q.choices)&&q.choices.length===4,`${q.id}: requires 4 choices`);
    assert(['A','B','C','D'].includes(q.answer),`${q.id}: answer must be A-D`);
    assert(headings.has(q.theoryAnchor),`${q.id}: theoryAnchor must match a heading`);
    assert(q.retryFeedback&&!/correct answer|answer is/i.test(q.retryFeedback),`${q.id}: retry feedback leaks answer or is missing`);
    assert(!/source (file|document|slide)|file name|slide number|programme label|outcome code|teacher administration/i.test(q.question),`${q.id}: admin/source trivia detected`);
    const normalised=String(q.question).toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    assert(!questionTexts.has(normalised),`${q.id}: duplicates ${questionTexts.get(normalised)}`);
    questionTexts.set(normalised,q.id);
  }
  assert(data.written?.prompt&&data.written?.sentenceStarter&&data.written?.example,`${id}: written evidence scaffold incomplete`);
}
assert(sections===30,`Expected 30 named sections; found ${sections}`);
assert(questions===300,`Expected 300 questions; found ${questions}`);

const textFiles=fs.readdirSync(root,{recursive:true}).filter(file=>typeof file==='string'&&/\.(?:html|js|json|css|md)$/.test(file));
for(const file of textFiles){const text=read(file);assert(!/â€|Â·|â†|ï¿½|�/.test(text),`${file}: mojibake detected`)}
const htmlFiles=textFiles.filter(file=>file.endsWith('.html'));
for(const file of htmlFiles){const text=read(file);assert(!/â€|Â·|â†|ï¿½/.test(text),`${file}: mojibake detected`);assert(/Main Menu/.test(text),`${file}: Main Menu return path missing`);assert(/rel="icon"/.test(text),`${file}: explicit favicon missing`)}

const activityText=read('busy/activity-data.js');
const mechanics=[...activityText.matchAll(/mechanic:\s*'([^']+)'/g)].map(match=>match[1]);
const activityIds=[...activityText.matchAll(/\n\s+id:\s*'(\d{2})'/g)].map(match=>match[1]);
assert(activityIds.length===10&&new Set(activityIds).size===10,'Busy Work requires 10 distinct activity records');
assert(mechanics.length===10&&new Set(mechanics).size===10,'Busy Work mechanics must be distinct and meaningful');
const youtubeText=read('assets/youtube-manifest.js');
assert((youtubeText.match(/youtube-nocookie\.com\/embed\//g)||[]).length===3,'YouTube manifest requires 3 privacy-enhanced embeds');
assert((youtubeText.match(/oembedStatus:\s*200/g)||[]).length===3,'YouTube manifest validation metadata is incomplete');

const index=read('index.html');
for(const marker of ['Learn it. Check it. Show it.','TEN PAIRED-WEEK MODULES','Busy Work','YouTube','Evidence folio','Teacher Resources'])assert(index.includes(marker),`Landing marker missing: ${marker}`);
const planHash=crypto.createHash('sha256').update(fs.readFileSync(path.join(root,'assets','resources','Footstool.pdf'))).digest('hex').toUpperCase();
assert(planHash==='2E7D2F0C74415810CBC45DABAB767F01A664ED076195773E6BADBB4838EF6FA1',`Authoritative plan hash mismatch: ${planHash}`);

const sourceVisualDir=path.join(root,'assets','source-library');
const sourceVisualFiles=fs.existsSync(sourceVisualDir)?fs.readdirSync(sourceVisualDir).filter(file=>/\.(?:jpe?g|png|webp)$/i.test(file)):[];
assert(sourceVisualFiles.length===20,`Expected exactly 20 approved source-library visuals; found ${sourceVisualFiles.length}`);
const visualUsage=read('module.js')+read('folio.js');
for(const file of sourceVisualFiles)assert(visualUsage.includes(`assets/source-library/${file}`),`Approved source visual is not used: ${file}`);

const moduleScript=read('module.js');
const writtenAnchorEntries=[...moduleScript.matchAll(/'(m\d{2}-s\d{2})':'([^']+)'/g)].filter(([,id])=>/^m\d{2}-s\d{2}$/.test(id));
assert(writtenAnchorEntries.length===30,`Expected 30 written-response theory links; found ${writtenAnchorEntries.length}`);
for(const [id,heading] of writtenAnchorEntries.map(match=>[match[1],match[2]])){
  const data=JSON.parse(read(`assets/data/${id}.json`));
  assert(data.theory.some(item=>item.heading===heading),`${id}: written-response help target does not match a theory heading: ${heading}`);
}
assert(moduleScript.includes('class="theory-help-link"'), 'Written-response theory-help control is missing');

if(failures.length){console.error(`FAIL (${failures.length})`);for(const failure of failures)console.error(`- ${failure}`);process.exit(1)}
console.log(`PASS: 10 modules, ${sections} named sections, ${questions} questions, 20 approved source visuals, plan hash verified, routes and landing markers present.`);
