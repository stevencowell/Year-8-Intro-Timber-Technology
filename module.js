const STORAGE='footstool-y8:v2';
const letter=['A','B','C','D'];
const titles=['','Workshop readiness','Tools and accurate references','Timber properties','Engineered wood','Read the original plan','Graphical communication','Personal emblem design','Progress and quality evidence','Function and testing','Aesthetics and final evaluation'];
const sectionVisuals={
  'm01-s02':[
    ['../assets/source-library/hierarchy-of-controls.jpg','Hierarchy of controls diagram ordered from elimination to personal protective equipment.','The hierarchy orders broad control types from strongest to weakest. Current school procedures still control practical activity.'],
    ['../assets/source-library/safety-glasses.jpg','Clear safety glasses with green and black arms.','Safety glasses are a recognisable PPE example. The teacher confirms the PPE required for each activity.']
  ],
  'm02-s01':[
    ['../assets/source-library/combination-square.jpg','Combination square with an adjustable head and metal rule.','Combination square shown for accurate tool-name recognition and broad reference only.'],
    ['../assets/source-library/coping-saw.jpg','Coping saw with a narrow blade held in a metal frame.','Coping saw shown for accurate tool-name recognition; practical use remains teacher-directed.'],
    ['../assets/source-library/tenon-saw.jpg','Tenon saw with a straight backed blade and closed handle.','Tenon saw shown for accurate tool-name recognition; practical use remains teacher-directed.'],
    ['../assets/source-library/bevel-edge-chisels.jpeg','Pair of bevel-edge chisels with black and yellow handles.','Bevel-edge chisels shown for accurate tool-name recognition; practical use remains teacher-directed.'],
    ['../assets/source-library/battery-drill.jpeg','Blue cordless battery drill viewed from the side.','Battery drill shown for accurate tool-name recognition; approval and current procedures control practical use.']
  ],
  'm02-s02':[
    ['../assets/source-library/tape-measure.jpeg','Yellow retractable tape measure with its tape extended.','Tape measure shown as a familiar measuring reference; use written task information before accepting a value.'],
    ['../assets/source-library/sliding-bevel.jpg','Sliding bevel held against a timber strip.','Sliding bevel shown as a reference tool. Confirm its task-specific use with the teacher.']
  ],
  'm03-s01':[
    ['../assets/source-library/timber-lengths.jpeg','Stacked lengths of timber showing varied end grain.','Timber lengths can vary in visible grain and colour. This image does not identify the Footstool stock.']
  ],
  'm03-s03':[
    ['../assets/source-library/hand-plane.jpeg','Metal hand plane with wooden front and rear handles.','Hand plane shown as a familiar timber-working reference. It does not prescribe a Footstool process.']
  ],
  'm08-s01':[
    ['../assets/source-library/f-clamps.jpeg','Two F-clamps photographed against a white background.','A clear reference photograph identifies the item in view; useful evidence must also state what was actually observed.']
  ],
  'm08-s02':[
    ['../assets/source-library/woodwork-vice.jpg','Red woodwork vice photographed against a white background.','A contextual photograph can support a quality record, but written evidence must explain the observed feature.']
  ],
  'm09-s02':[
    ['../assets/source-library/spirit-level.jpg','Yellow spirit level with two visible bubble vials.','Spirit level shown as an example of a checking tool. Only teacher-approved checks apply to the project.']
  ],
  'm04-s02':[
    ['../assets/reference/radiata-pine-mdf-comparison.png','Visual comparison of a solid timber surface with visible grain and a uniform MDF-like surface.','Compare only the visible surface evidence; this visual does not assign a material to a Footstool component.']
  ],
  'm05-s01':[
    ['../assets/plan-page-1.png','Page one preview of the authoritative Wagga High School Foot Stool plan.','Use the unchanged original plan and its written information. Do not measure the screen image.']
  ],
  'm06-s01':[
    ['../assets/plan-page-2.png','Page two preview of the authoritative Wagga High School Foot Stool plan.','Related plan views communicate different faces and features. Open the original plan for full-resolution detail.']
  ],
  'm07-s02':[
    ['../assets/emblem-development-example.png','Source worksheet showing explore, experiment and arrange stages for emblem development.','The source worksheet supports comparison of distinct ideas before a concept is selected.']
  ],
  'm10-s01':[
    ['../assets/source-library/paint-tins.jpeg','Group of coating tins photographed against a dark background.','Coating containers provide appearance and finish context only; the teacher confirms any approved project finish.']
  ]
};
const writtenTheoryAnchors={
  'm01-s01':'Report problems and pack away','m01-s02':'Use the hierarchy of controls','m01-s03':'Ask precisely and wait',
  'm02-s01':'Connect name and broad purpose','m02-s02':'Separate measuring and marking','m02-s03':'Check approval and condition',
  'm03-s01':'Choose using relevant properties','m03-s02':'Describe density carefully','m03-s03':'Build a supported description',
  'm04-s01':'Compare three examples','m04-s02':'Plywood uses veneer layers','m04-s03':'Start with the intended use',
  'm05-s01':'Connect views with written information','m05-s02':'Understand scale proportionally','m05-s03':'Cross-check and clarify',
  'm06-s01':'Compare position and alignment','m06-s02':'Align features across views','m06-s03':'Read form without estimating size',
  'm07-s01':'Turn meaning into simple shapes','m07-s02':'Annotate arrangement and meaning','m07-s03':'Justify and refine one concept',
  'm08-s01':'Write objective observations','m08-s02':'Connect evidence to requirements','m08-s03':'Explain the reason and action',
  'm09-s01':'Describe performance qualities','m09-s02':'Record evidence and limits','m09-s03':'Predict and seek confirmation',
  'm10-s01':'Explain form, layout and style','m10-s02':'Explain the effect on the viewer','m10-s03':'Evaluate function and aesthetics'
};
const escapeHtml=value=>String(value??'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
const theoryHeadingId=(sectionId,heading)=>`${sectionId}-${heading.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`;
const renderSectionVisuals=sectionId=>{
  const visuals=sectionVisuals[sectionId]||[];
  if(!visuals.length)return '';
  return `<aside class="magazine-visuals visual-count-${visuals.length}" aria-label="Visual references for this theory section">${visuals.map(([src,alt,caption])=>`<figure class="magazine-visual"><div class="magazine-image"><img src="${src}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async"></div><figcaption>${escapeHtml(caption)} <a href="${src}" target="_blank" rel="noopener">Open larger</a></figcaption></figure>`).join('')}</aside>`;
};
const sectionKey=id=>`${STORAGE}:section:${id}`;
const getState=id=>{try{return JSON.parse(localStorage.getItem(sectionKey(id))||'{}')}catch{return {}}};

function saveState(id,state){
  state.updatedAt=new Date().toISOString();
  localStorage.setItem(sectionKey(id),JSON.stringify(state));
  updateStatus();
}

function renderQuestion(question,index,state){
  const qState=state.questions?.[question.id]||{};
  const selected=qState.selected||'';
  const feedback=qState.checked?(qState.correct?question.correctFeedback:question.retryFeedback):'';
  return `<fieldset class="question" data-question-id="${escapeHtml(question.id)}"><legend>${index+1}. ${escapeHtml(question.question)}</legend>${question.choices.map((choice,i)=>`<label class="choice-label"><input type="radio" name="${escapeHtml(question.id)}" value="${letter[i]}" ${selected===letter[i]?'checked':''}> <span><strong>${letter[i]}.</strong> ${escapeHtml(choice)}</span></label>`).join('')}<div class="question-actions"><button class="check-button" type="button">Check response</button><span class="feedback ${qState.correct?'correct':'retry'}" aria-live="polite">${escapeHtml(feedback)}</span></div></fieldset>`;
}

function renderSection(data,index){
  const state=getState(data.sectionId);
  const writtenAnchor=writtenTheoryAnchors[data.sectionId];
  const writtenTheoryId=theoryHeadingId(data.sectionId,writtenAnchor);
  return `<article class="theory-section" id="${escapeHtml(data.sectionId)}" data-section-id="${escapeHtml(data.sectionId)}"><p class="section-label">THEORY SECTION ${index+1} · 10 CHECKS</p><h2>${escapeHtml(data.title)}</h2><div class="theory-copy">${renderSectionVisuals(data.sectionId)}${data.theory.map(item=>`<article id="${escapeHtml(theoryHeadingId(data.sectionId,item.heading))}" tabindex="-1"><h3>${escapeHtml(item.heading)}</h3><p>${escapeHtml(item.body)}</p></article>`).join('')}</div><details class="checks" ${state.open?'open':''}><summary>Open the 10 learning checks and written evidence</summary>${data.questions.map((q,i)=>renderQuestion(q,i,state)).join('')}<section class="written-card"><h3>Written evidence</h3><p>${escapeHtml(data.written.prompt)}</p><p class="starter"><strong>Sentence starter:</strong> ${escapeHtml(data.written.sentenceStarter)}</p><div class="theory-help"><strong>Need help finding the evidence?</strong><a class="theory-help-link" href="#${escapeHtml(writtenTheoryId)}" data-theory-help="${escapeHtml(writtenTheoryId)}">I’m struggling — take me to “${escapeHtml(writtenAnchor)}”</a></div><label class="field">Your response<textarea data-written>${escapeHtml(state.written||'')}</textarea></label><details class="example"><summary>Appropriate response example</summary><p>${escapeHtml(data.written.example)}</p></details></section></details></article>`;
}

function attachSection(data){
  const root=document.querySelector(`[data-section-id="${data.sectionId}"]`);
  const state=getState(data.sectionId);state.questions=state.questions||{};
  root.querySelector('.checks').addEventListener('toggle',event=>{state.open=event.target.open;saveState(data.sectionId,state)});
  root.querySelectorAll('.question').forEach((questionEl,index)=>{
    const question=data.questions[index];
    questionEl.addEventListener('change',event=>{if(!event.target.matches('input[type=radio]'))return;state.questions[question.id]={selected:event.target.value,checked:false,correct:false};questionEl.querySelector('.feedback').textContent='';saveState(data.sectionId,state)});
    questionEl.querySelector('.check-button').addEventListener('click',()=>{
      const selected=questionEl.querySelector('input:checked')?.value;
      const feedback=questionEl.querySelector('.feedback');
      if(!selected){feedback.className='feedback retry';feedback.textContent=`Choose a response, then check the theory heading: ${question.theoryAnchor}.`;return}
      const correct=selected===question.answer;
      state.questions[question.id]={selected,checked:true,correct};
      feedback.className=`feedback ${correct?'correct':'retry'}`;
      feedback.textContent=correct?question.correctFeedback:question.retryFeedback;
      saveState(data.sectionId,state);
    });
  });
  root.querySelector('.theory-help-link').addEventListener('click',event=>{
    const target=document.getElementById(event.currentTarget.dataset.theoryHelp);
    if(!target)return;
    event.preventDefault();
    target.scrollIntoView({behavior:'smooth',block:'center'});
    target.focus({preventScroll:true});
    target.classList.add('theory-target');
    window.setTimeout(()=>target.classList.remove('theory-target'),2400);
    history.replaceState(null,'',`#${target.id}`);
  });
  const written=root.querySelector('[data-written]');
  let timer;written.addEventListener('input',()=>{clearTimeout(timer);timer=setTimeout(()=>{state.written=written.value;saveState(data.sectionId,state)},250)});
}

function updateStatus(){
  const status=document.querySelector('#save-status');if(!status)return;
  const moduleNo=document.body.dataset.module;
  let complete=0,latest='';
  for(let s=1;s<=3;s++){
    const state=getState(`m${moduleNo}-s${String(s).padStart(2,'0')}`);
    const checked=Object.values(state.questions||{}).filter(q=>q.checked).length;
    if(checked===10&&(state.written||'').trim().length>=20)complete++;
    if(state.updatedAt&&state.updatedAt>latest)latest=state.updatedAt;
  }
  status.textContent=`Saved on this device · ${complete}/3 sections complete${latest?` · ${new Date(latest).toLocaleTimeString('en-AU',{hour:'numeric',minute:'2-digit'})}`:''}`;
}

function setupStudent(){
  let student={};try{student=JSON.parse(localStorage.getItem(`${STORAGE}:student`)||'{}')}catch{}
  if(!student.name&&!student.className){
    try{
      const folio=JSON.parse(localStorage.getItem('footstool-y8:v1:folio')||'{}');
      if(folio.student)student={name:folio.student.name||'',className:folio.student.className||''};
    }catch{}
  }
  const name=document.querySelector('#student-name'),className=document.querySelector('#student-class');
  name.value=student.name||'';className.value=student.className||'';
  const save=()=>{
    const updatedAt=new Date().toISOString();
    localStorage.setItem(`${STORAGE}:student`,JSON.stringify({name:name.value,className:className.value,updatedAt}));
    try{
      const folio=JSON.parse(localStorage.getItem('footstool-y8:v1:folio')||'{}');
      folio.schema=folio.schema||'footstool-y8-folio-backup-v1';
      folio.version=Math.max(Number(folio.version)||1,2);
      folio.student={name:name.value,className:className.value};
      folio.cards=folio.cards||{};folio.activities=folio.activities||{};folio.updatedAt=updatedAt;
      localStorage.setItem('footstool-y8:v1:folio',JSON.stringify(folio));
    }catch{}
  };
  name.addEventListener('input',save);className.addEventListener('input',save);
}

let printOpenStates=[];
window.addEventListener('beforeprint',()=>{
  const checks=[...document.querySelectorAll('details.checks')];
  printOpenStates=checks.map(details=>details.open);
  checks.forEach(details=>{details.open=true});
});
window.addEventListener('afterprint',()=>{
  document.querySelectorAll('details.checks').forEach((details,index)=>{details.open=Boolean(printOpenStates[index])});
});

async function init(){
  const number=Number(document.body.dataset.module),moduleNo=String(number).padStart(2,'0');
  document.title=`Module ${number}: ${titles[number]} | Footstool`;
  document.querySelector('#module-title').textContent=titles[number];
  document.querySelector('#module-kicker').textContent=`MODULE ${moduleNo} · WEEKS ${number*2-1}–${number*2}`;
  const data=await Promise.all([1,2,3].map(section=>fetch(`../assets/data/m${moduleNo}-s${String(section).padStart(2,'0')}.json`).then(response=>{if(!response.ok)throw new Error(`Section ${section} unavailable`);return response.json()})));
  document.querySelector('#section-jumps').innerHTML=data.map((section,index)=>`<a href="#${section.sectionId}">${index+1}. ${escapeHtml(section.title)}</a>`).join('');
  document.querySelector('#module-sections').innerHTML=data.map(renderSection).join('');
  data.forEach(attachSection);setupStudent();updateStatus();
  window.FootstoolSourceActivities?.renderModule(number);
  document.querySelector('#print-module').addEventListener('click',()=>window.print());
  const prev=document.querySelector('#previous-module'),next=document.querySelector('#next-module');
  if(number===1)prev.href='../index.html#modules';else prev.href=`module-${String(number-1).padStart(2,'0')}.html`;
  if(number===10){next.href='../folio.html';next.textContent='Open evidence folio →'}else next.href=`module-${String(number+1).padStart(2,'0')}.html`;
}

init().catch(error=>{document.querySelector('#module-sections').innerHTML=`<div class="error-card"><h2>This module could not load.</h2><p>${escapeHtml(error.message)}. Return to the course map or refresh the page.</p></div>`});
