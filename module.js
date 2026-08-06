const STORAGE='footstool-y8:v2';
const letter=['A','B','C','D'];
const titles=['','Workshop readiness','Tools and accurate references','Timber properties','Engineered wood','Read the original plan','Graphical communication','Personal emblem design','Progress and quality evidence','Function and testing','Aesthetics and final evaluation'];
const visuals={
  1:['../assets/reference/hierarchy-of-controls.jpg','Hierarchy of controls reference diagram. It supports general risk-control thinking and does not replace current school procedures.'],
  2:['../assets/reference/combination-square.jpg','Combination square from the approved teaching reference library, shown for broad recognition only.'],
  3:['../assets/reference/radiata-pine-mdf-comparison.png','Visual comparison of a pine-like grain surface and a uniform MDF-like surface. It does not specify Footstool stock.'],
  4:['../assets/reference/radiata-pine-mdf-comparison.png','Visual comparison supporting material-description language, not a project-material instruction.'],
  5:['../assets/plan-page-1.png','Page one preview of the unchanged Footstool plan. Open the original PDF larger for written information.'],
  6:['../assets/plan-page-2.png','Page two preview of the unchanged Footstool plan. Do not measure the screen image.'],
  7:['../assets/emblem-development-example.png','Source-deck emblem development sheet showing exploration and arrangement stages.'],
  8:['../assets/plan-page-1.png','Original plan preview retained as the authority while students record progress evidence.'],
  9:['../assets/plan-page-2.png','Original plan preview retained as the authority for teacher-directed functional checks.'],
 10:['../assets/emblem-development-example.png','Source-deck design worksheet supporting evidence-based visual reflection.']
};
const escapeHtml=value=>String(value??'').replace(/[&<>"]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
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
  const visual=index===0?visuals[Number(document.body.dataset.module)]:null;
  return `<article class="theory-section" id="${escapeHtml(data.sectionId)}" data-section-id="${escapeHtml(data.sectionId)}"><p class="section-label">THEORY SECTION ${index+1} · 10 CHECKS</p><h2>${escapeHtml(data.title)}</h2><div class="theory-copy">${data.theory.map(item=>`<article id="${escapeHtml(data.sectionId)}-${escapeHtml(item.heading).toLowerCase().replace(/[^a-z0-9]+/g,'-')}"><h3>${escapeHtml(item.heading)}</h3><p>${escapeHtml(item.body)}</p></article>`).join('')}</div>${visual?`<figure class="module-visual"><img src="${visual[0]}" alt="${escapeHtml(visual[1])}"><figcaption>${escapeHtml(visual[1])}</figcaption></figure>`:''}<details class="checks" ${state.open?'open':''}><summary>Open the 10 learning checks and written evidence</summary>${data.questions.map((q,i)=>renderQuestion(q,i,state)).join('')}<section class="written-card"><h3>Written evidence</h3><p>${escapeHtml(data.written.prompt)}</p><p class="starter"><strong>Sentence starter:</strong> ${escapeHtml(data.written.sentenceStarter)}</p><label class="field">Your response<textarea data-written>${escapeHtml(state.written||'')}</textarea></label><details class="example"><summary>Appropriate response example</summary><p>${escapeHtml(data.written.example)}</p></details></section></details></article>`;
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
  const name=document.querySelector('#student-name'),className=document.querySelector('#student-class');
  name.value=student.name||'';className.value=student.className||'';
  const save=()=>localStorage.setItem(`${STORAGE}:student`,JSON.stringify({name:name.value,className:className.value,updatedAt:new Date().toISOString()}));
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
  document.querySelector('#print-module').addEventListener('click',()=>window.print());
  const prev=document.querySelector('#previous-module'),next=document.querySelector('#next-module');
  if(number===1)prev.href='../index.html#modules';else prev.href=`module-${String(number-1).padStart(2,'0')}.html`;
  if(number===10){next.href='../folio.html';next.textContent='Open evidence folio →'}else next.href=`module-${String(number+1).padStart(2,'0')}.html`;
}

init().catch(error=>{document.querySelector('#module-sections').innerHTML=`<div class="error-card"><h2>This module could not load.</h2><p>${escapeHtml(error.message)}. Return to the course map or refresh the page.</p></div>`});
