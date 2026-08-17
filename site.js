const COURSE_KEY='footstool-y8:v2';

if (!document.querySelector('.course-family-nav') && !document.querySelector('script[data-footstool-navigation]')) {
  const navigation = document.createElement('script');
  navigation.src = new URL('footstool-navigation.js?v=20260818', document.currentScript.src).href;
  navigation.dataset.footstoolNavigation = '';
  document.head.append(navigation);
}

const modules=[
  ['01','Weeks 1–2','Workshop readiness','Conduct · hazards and controls · asking for help'],
  ['02','Weeks 3–4','Tools and accurate references','Tool purpose · measuring and marking · safe decisions'],
  ['03','Weeks 5–6','Timber properties','Hardwood and softwood · grain, knots and density · workability'],
  ['04','Weeks 7–8','Engineered wood','Engineered-wood idea · product structures · responsible comparison'],
  ['05','Weeks 9–10','Read the original plan','Views · dimensions, symbols and scale · cross-checking'],
  ['06','Weeks 11–12','Graphical communication','Third-angle · line relationships · isometric communication'],
  ['07','Weeks 13–14','Personal emblem design','Research · three concepts · selection and refinement'],
  ['08','Weeks 15–16','Progress and quality evidence','Observation · quality evidence · action and next step'],
  ['09','Weeks 17–18','Function and testing','Function vocabulary · evidence-based testing · improvement'],
  ['10','Weeks 19–20','Aesthetics and final evaluation','Aesthetic vocabulary · appearance analysis · final reflection']
];

function moduleProgress(number){
  let complete=0;
  for(let section=1;section<=3;section++){
    const id=`m${number}-s${String(section).padStart(2,'0')}`;
    const saved=JSON.parse(localStorage.getItem(`${COURSE_KEY}:section:${id}`)||'{}');
    const checked=Object.values(saved.questions||{}).filter(item=>item?.checked).length;
    if(checked===10&&(saved.written||'').trim().length>=20)complete++;
  }
  return complete;
}

function renderModuleMap(){
  const map=document.querySelector('#module-map');
  if(!map)return;
  map.innerHTML=modules.map(([number,weeks,title,topics])=>{
    const progress=moduleProgress(number);
    const pill=progress?`<span class="progress-pill">${progress}/3 sections complete</span>`:'';
    return `<a class="module-tile" href="modules/module-${number}.html">${pill}<span class="module-number">${number}</span><span><small>${weeks}</small><h3>${title}</h3><p>${topics}</p></span><span class="module-arrow" aria-hidden="true">→</span></a>`;
  }).join('');
}

function setupNavigation(){
  const button=document.querySelector('.nav-toggle');
  const links=document.querySelector('#nav-links');
  if(!button||!links)return;
  button.addEventListener('click',()=>{const open=links.classList.toggle('open');button.setAttribute('aria-expanded',String(open));});
  links.addEventListener('click',event=>{if(event.target.matches('a')){links.classList.remove('open');button.setAttribute('aria-expanded','false');}});
}

setupNavigation();
renderModuleMap();
