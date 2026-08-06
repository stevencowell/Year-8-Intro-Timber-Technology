const storageKey = 'year8-footstool-course-v2';
const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
const persist = () => localStorage.setItem(storageKey, JSON.stringify(saved));

const videos = [
  {id:'-dcUw9FYMI4', title:'Manufactured Wood Products', channel:'fwpafwpa', purpose:'Watch before comparing manufactured wood products.'},
  {id:'e-j_zs4pHX8', title:'Orthographic projection - third angle', channel:'Educraft Engineering and Drawing', purpose:'Use this alongside the plan-reading and drawing section.'},
  {id:'1LDqUgOWVK4', title:'Easy steps to creating an isometric drawing', channel:'Technical Drawing', purpose:'Use this before completing your isometric drawing evidence.'}
];
const activities = [
  ['Safety decision path','Choose a safe response, then explain your choice.'],['Tool-function match','Match workshop tool names with their broad purpose.'],['Pine property case file','Sort property clues, then justify a material choice.'],['Manufactured board process map','Arrange board-making ideas and check a claim against evidence.'],['Scale measurement lab','Use the original drawing and flag details that need clarification.'],['Third-angle drawing check','Organise views and find projection errors.'],['Isometric drawing challenge','Use an isometric grid to communicate a simple form.'],['Emblem design decision','Compare three design concepts and justify your selection.'],['Production quality log','Record an issue, action and next step.'],['Function and aesthetics evaluation','Evaluate the Footstool with precise project vocabulary.']
];
const sectionVisuals = {
  'working-safely-in-the-workshop': {src:'assets/reference/hierarchy-of-controls.jpg', alt:'Hierarchy of controls graphic used to discuss ways risks can be reduced.', caption:'Use this visual to discuss how controls can reduce risk. Your teacher’s current workshop instructions apply.'},
  'timber-words-and-properties': {src:'assets/reference/radiata-pine-mdf-comparison.png', alt:'Visual comparison of solid radiata pine grain and a uniform MDF surface.', caption:'Compare visible grain and surface character. This image does not identify the Footstool material.'},
  'developing-a-personal-emblem': {src:'assets/emblem-development-example.png', alt:'Course presentation example showing a simple emblem development workflow.', caption:'Use the course design workflow to develop original concepts; do not copy another person’s design.'}
};

function escapeHtml(value){ return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function sectionId(title){ return title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); }
function renderQuestion(q){
  const key=`q-${q.id}`, selected=saved[key], letters=['A','B','C','D'];
  const answers=q.choices.map((choice,index)=>{ const letter=letters[index]; let cls='choice'; if(selected){ if(letter===q.answer) cls+=' correct'; else if(letter===selected) cls+=' incorrect'; } return `<button class="${cls}" data-question="${q.id}" data-answer="${letter}"><strong>${letter}.</strong> ${escapeHtml(choice)}</button>`; }).join('');
  const feedback=selected?`<p class="feedback">${escapeHtml(selected===q.answer?q.feedback:`Not quite. ${q.feedback}`)}</p>`:'';
  return `<div class="quiz"><p><strong>${q.id}</strong> — ${escapeHtml(q.question)}</p>${answers}${feedback}</div>`;
}
function renderSection(section){
  const {number,title,questions,prompts,theory=[]}=section, id=sectionId(title);
  const theoryHtml=theory.length ? `<div class="theory">${theory.map(item=>`<h4>${escapeHtml(item.heading)}</h4><p>${escapeHtml(item.body)}</p>`).join('')}</div>` : `<p class="module-intro">Read the related course material with your teacher, then use this section to show what you understand.</p>`;
  const visual=sectionVisuals[id];
  const visualHtml=visual?`<figure class="module-visual"><img src="${visual.src}" alt="${escapeHtml(visual.alt)}"><figcaption>${escapeHtml(visual.caption)}</figcaption></figure>`:'';
  const promptHtml=prompts.map((p,i)=>{ const key=`r-${id}-${i}`; return `<div class="quiz"><label for="${key}"><strong>Evidence prompt ${i+1}:</strong> ${escapeHtml(p.prompt)}</label><textarea class="response" id="${key}" data-response="${key}" placeholder="Write your response here…">${escapeHtml(saved[key]||'')}</textarea><details class="example"><summary>Appropriate response example</summary><p>${escapeHtml(p.example)}</p></details></div>`; }).join('');
  return `<article class="module-card" id="${id}"><p class="eyebrow">SECTION ${number}</p><h3>${escapeHtml(title)}</h3>${theoryHtml}${visualHtml}<details><summary><strong>Open section learning checks (${questions.length} questions)</strong></summary>${questions.map(renderQuestion).join('')}${promptHtml}</details></article>`;
}
function attachHandlers(){
  document.querySelectorAll('[data-question]').forEach(button=>button.addEventListener('click',()=>{ saved[`q-${button.dataset.question}`]=button.dataset.answer; persist(); loadCourse(); }));
  document.querySelectorAll('[data-response]').forEach(area=>area.addEventListener('input',()=>{ saved[area.dataset.response]=area.value; persist(); }));
}
async function loadCourse(){
  const [response,theoryResponse]=await Promise.all([fetch('assets/course-data.json'),fetch('assets/theory.json')]);
  const data=await response.json(), theory=await theoryResponse.json();
  data.sections.forEach(section=>{ section.theory=theory[sectionId(section.title)]||[]; });
  document.querySelector('#module-list').innerHTML=data.sections.map(renderSection).join(''); attachHandlers();
}
function renderResources(){
  document.querySelector('#video-list').innerHTML=videos.map(v=>`<article class="video-card"><iframe title="${escapeHtml(v.title)}" src="https://www.youtube-nocookie.com/embed/${v.id}" loading="lazy" allowfullscreen></iframe><h3>${escapeHtml(v.title)}</h3><p>${escapeHtml(v.channel)}</p><p>${escapeHtml(v.purpose)}</p><a href="https://www.youtube.com/watch?v=${v.id}" target="_blank" rel="noopener">Open in YouTube</a></article>`).join('');
}
document.querySelector('#print-folio').addEventListener('click',()=>window.print());
renderResources(); loadCourse().catch(()=>{ document.querySelector('#module-list').innerHTML='<p>Learning content could not be loaded. Please refresh the page.</p>'; });
