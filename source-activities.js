(() => {
  'use strict';

  const STORAGE_KEY = 'footstool-y8:v1:folio';
  const SCHEMA = 'footstool-y8-folio-backup-v1';
  const VIDEO_ID = '-dcUw9FYMI4';

  const vocabularyTerms = ['Wood grain', 'Wood knot', 'Coniferous', 'Ergonomic', 'Durability', 'Efficient', 'Isometric', 'Aesthetics'];
  const safetyStatements = [
    ['safety-running', 'Running or fooling around in the workshop is safe.', 'unsafe'],
    ['safety-offcuts', 'Putting timber off-cuts and scraps in the nominated scrap box or bin is safe.', 'safe'],
    ['safety-zone', 'Standing inside a machine safety zone when you are not the operator is safe.', 'unsafe'],
    ['safety-permission', 'Obtaining teacher permission before using a machine is safe.', 'safe'],
    ['safety-footwear', 'Wearing open footwear such as thongs in the workshop is safe.', 'unsafe'],
    ['safety-ppe', 'Wearing the eye protection directed by the teacher for the activity is safe.', 'safe'],
    ['safety-running-machine', 'Walking away and leaving a machine running is safe.', 'unsafe'],
    ['safety-return', 'Returning tools to their approved storage place after use is safe.', 'safe'],
    ['safety-damaged', 'Continuing to use a blunt, damaged or badly adjusted tool is safe.', 'unsafe'],
    ['safety-uncertain', 'Stopping and asking when an instruction or condition is unclear is safe.', 'safe']
  ];
  const toolCards = [
    { key: 'square', src: 'assets/source-library/combination-square.jpg', alt: 'Combination square with an adjustable head and metal rule.', answer: 'combination-square', purpose: 'square-reference' },
    { key: 'tenon', src: 'assets/source-library/tenon-saw.jpg', alt: 'Tenon saw with a straight backed blade and closed handle.', answer: 'tenon-saw', purpose: 'cutting' },
    { key: 'drill', src: 'assets/source-library/battery-drill.jpeg', alt: 'Blue cordless battery drill viewed from the side.', answer: 'battery-drill', purpose: 'holes' },
    { key: 'chisel', src: 'assets/source-library/bevel-edge-chisels.jpeg', alt: 'Pair of bevel-edge chisels with black and yellow handles.', answer: 'bevel-edge-chisel', purpose: 'material-removal' },
    { key: 'vice', src: 'assets/source-library/woodwork-vice.jpg', alt: 'Red woodwork vice photographed against a white background.', answer: 'woodwork-vice', purpose: 'holding' }
  ];
  const toolNames = [
    ['','Choose the approved name'],['combination-square','Combination square'],['tenon-saw','Tenon saw'],['battery-drill','Battery drill'],['bevel-edge-chisel','Bevel-edge chisel'],['woodwork-vice','Woodwork vice']
  ];
  const toolPurposes = [
    ['','Choose the broad purpose'],['square-reference','Provides a square measuring or marking reference'],['cutting','Cuts wood with a backed saw'],['holes','Produces holes using approved drilling equipment'],['material-removal','Removes small amounts of material under teacher direction'],['holding','Holds work securely when teacher approved']
  ];
  const scrambles = [
    ['ELSIHC','Sharp tool used with a mallet','chisel'],['ECVI','Similar to a clamp','vice'],['EOTNN ASW','Used for cutting wood','tenon saw'],
    ['RSENDA','Shaping and smoothing wood','sander'],['EPLAN','Removing fine shavings of wood','plane'],['LIDRL','Makes holes','drill'],
    ['CSERW','A metal fastener with a thread','screw'],['MEHAMR','Used to embed nails','hammer'],['LNAI','Attached with a hammer','nail'],
    ['TLEALM','Used with a chisel','mallet'],['RAQSEU','Creates a 90-degree reference','square'],['LIPECN','Used for marking','pencil']
  ];
  const timberMatches = [
    ['timber-hardwood','Hardwood','Timber from a flowering tree.'],
    ['timber-softwood','Softwood','Timber from a cone-bearing tree.'],
    ['timber-knot','Knot','A grain irregularity where a branch or offshoot existed.'],
    ['timber-straight','Straight-grained','Timber whose visible grain generally follows a consistent direction.'],
    ['timber-dense','Dense','Timber that is relatively heavy for its size because its material is closely packed.'],
    ['timber-workable','Workability','How readily a material can be shaped or processed for an approved task.']
  ];
  const timberOptions = [['','Choose the matching term'], ...timberMatches.map(([,term]) => [term.toLowerCase().replace(/[^a-z]+/g,'-'), term])];
  const manufacturedQuestions = [
    'Define manufactured wood products. What other name is commonly used for these products?',
    'What types or forms of wood are used in manufactured wood products?',
    'Which two wood properties are considered important when developing new manufactured wood products?',
    'Explain how plywood is made.',
    'What property makes plywood and oriented strand board suitable for structural wood panelling?',
    'How is laminated veneer lumber made?',
    'What makes laminated veneer lumber useful compared with many solid wood products? Give examples of uses.',
    'How is cross-laminated timber made? Give examples of uses.',
    'Which manufactured wood product can substitute for load-bearing timber across wide spans in multi-storey buildings?',
    'How is wood-plastic composite made? Give examples of uses.',
    'How can using and substituting with wood products help address climate change?',
    'Which manufactured wood product was used as the main structural material in the Forté building shown in the video?'
  ];
  const functionTerms = ['Durability','Reliable','Stability','Ergonomic','Efficient','Economical'];
  const aestheticTerms = ['Aesthetically pleasing','Symmetrical','Contrast','Hierarchy','Emphasis','Organic','Geometric'];
  const designClues = [
    ['design-reliable','Something that works consistently','reliable'],['design-dangerous','Opposite to safe','dangerous'],['design-efficient','Opposite to wasteful','efficient'],
    ['design-pattern','A repeated image or arrangement','pattern'],['design-contrast','A strong difference, such as black and white','contrast'],['design-symmetrical','A mirrored or evenly balanced image','symmetrical'],
    ['design-stable','Opposite to wobbly','stable'],['design-emphasis','Makes something more noticeable or helps it stand out','emphasis'],['design-durable','Lasts a long time','durable'],
    ['design-ergonomic','Comfortable and suitable for the hand or body','ergonomic'],['design-function','How something works','function'],['design-aesthetics','How something looks','aesthetics']
  ];
  const ratingTerms = ['Efficiency','Stability','Ergonomic','Safe','Durable','Reliable','Texture','Pattern','Symmetry','Contrast','Layout','Style'];

  const activities = [
    { id:'kwl', module:1, slides:'3', tone:'blue', title:'Know · Wonder · Learned', subtitle:'Set a starting point now, then return later to show what changed.', required:['kwl-know','kwl-want','kwl-learned'] },
    { id:'vocabulary', module:1, slides:'4', tone:'violet', title:'Vocabulary confidence studio', subtitle:'Rate your current confidence and use each term in a useful example.', required:vocabularyTerms.flatMap((_,index)=>[`vocab-${index}-level`,`vocab-${index}-example`]) },
    { id:'safety-sort', module:1, slides:'5 and 8', tone:'coral', title:'Workshop readiness sort', subtitle:'Sort broad conduct statements, then check them against the theory and current teacher direction.', required:safetyStatements.map(([key])=>key), answers:Object.fromEntries(safetyStatements.map(([key,,answer])=>[key,answer])) },
    { id:'tool-lab', module:2, slides:'9–11', tone:'gold', title:'Tool recognition lab', subtitle:'Name approved tools, connect each to a broad purpose and solve the source word scrambles.', required:[...toolCards.flatMap(tool=>[`tool-${tool.key}-name`,`tool-${tool.key}-purpose`]),...scrambles.map((_,index)=>`scramble-${index}`)], answers:{...Object.fromEntries(toolCards.flatMap(tool=>[[`tool-${tool.key}-name`,tool.answer],[`tool-${tool.key}-purpose`,tool.purpose]])),...Object.fromEntries(scrambles.map(([, ,answer],index)=>[`scramble-${index}`,answer]))} },
    { id:'timber-properties', module:3, slides:'15', tone:'green', title:'Timber property matcher', subtitle:'Match the vocabulary supported by the course, then explain the project material choice without guessing.', required:[...timberMatches.map(([key])=>key),'timber-pine'], answers:Object.fromEntries(timberMatches.map(([key,term])=>[key,term.toLowerCase().replace(/[^a-z]+/g,'-')])) },
    { id:'manufactured-wood', module:4, slides:'16–18', tone:'green', title:'Manufactured wood video inquiry', subtitle:'Watch the source video and build a twelve-part investigation in your own words.', required:manufacturedQuestions.map((_,index)=>`wood-q${index+1}`) },
    { id:'isometric-evidence', module:6, slides:'20–21', tone:'blue', title:'Isometric communication studio', subtitle:'Use the three isometric directions, the course theory and the original plan—never screen measurements.', required:['iso-directions','iso-compare','iso-reflection'], photo:true },
    { id:'emblem-studio', module:7, slides:'12–14', tone:'violet', title:'Personal emblem design studio', subtitle:'Explore three themes, develop three distinct concepts and justify one teacher-approved direction.', required:[...Array.from({length:3},(_,i)=>`theme-${i+1}`),...Array.from({length:3},(_,i)=>`concept-${i+1}`),...Array.from({length:3},(_,i)=>`concept-${i+1}-pro`),...Array.from({length:3},(_,i)=>`concept-${i+1}-con`),'emblem-choice'], photo:true },
    { id:'function-words', module:9, slides:'22', tone:'green', title:'Function vocabulary lab', subtitle:'Use context clues to explain each term, then connect it to a synonym and an opposite.', required:functionTerms.flatMap((_,index)=>[`function-${index}-meaning`,`function-${index}-synonym`,`function-${index}-opposite`]) },
    { id:'aesthetic-words', module:10, slides:'23–24', tone:'violet', title:'Aesthetics and design clue wall', subtitle:'Build visual vocabulary, then solve the twelve design-term clues without a low-resolution crossword.', required:[...aestheticTerms.flatMap((_,index)=>[`aesthetic-${index}-meaning`,`aesthetic-${index}-example`]),...designClues.map(([key])=>key)], answers:Object.fromEntries(designClues.map(([key,,answer])=>[key,answer])) },
    { id:'final-evaluation', module:10, slides:'25', tone:'gold', title:'Final function and aesthetics review', subtitle:'Use self-ratings to prompt evidence-based reflection. These ratings are not marks.', required:[...ratingTerms.map((_,index)=>`rating-${index}`),'eval-function-well','eval-function-improve','eval-function-next','eval-aesthetic-well','eval-aesthetic-improve','eval-aesthetic-next'] }
  ];

  const escapeHtml = value => String(value ?? '').replace(/[&<>'"]/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[character]));
  const slug = value => String(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const optionHtml = options => options.map(([value,label])=>`<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
  const field = (key,label,control) => `<label>${escapeHtml(label)}${control.replace('FIELD_KEY',escapeHtml(key))}</label>`;

  const fieldLabels = activity => {
    if(activity.id==='kwl') return {'kwl-know':'What I already know','kwl-want':'What I want to learn','kwl-learned':'What I learned'};
    if(activity.id==='vocabulary') return Object.fromEntries(vocabularyTerms.flatMap((term,index)=>[[`vocab-${index}-level`,`${term} confidence`],[`vocab-${index}-example`,`${term} example`]]));
    if(activity.id==='safety-sort') return Object.fromEntries(safetyStatements.map(([key,statement])=>[key,statement]));
    if(activity.id==='tool-lab') return {...Object.fromEntries(toolCards.flatMap(tool=>[[`tool-${tool.key}-name`,`${tool.alt} — selected name`],[`tool-${tool.key}-purpose`,`${tool.alt} — selected broad purpose`]])),...Object.fromEntries(scrambles.map(([letters,clue],index)=>[`scramble-${index}`,`${letters}: ${clue}`]))};
    if(activity.id==='timber-properties') return {...Object.fromEntries(timberMatches.map(([key,term,,])=>[key,`${term} match`])),'timber-pine':'Why pine can suit this learning project'};
    if(activity.id==='manufactured-wood') return Object.fromEntries(manufacturedQuestions.map((question,index)=>[`wood-q${index+1}`,`Q${index+1}. ${question}`]));
    if(activity.id==='isometric-evidence') return {'iso-directions':'How the three isometric directions work','iso-compare':'What isometric and related views communicate','iso-reflection':'What I checked in my drawing'};
    if(activity.id==='emblem-studio') return {...Object.fromEntries(Array.from({length:3},(_,i)=>[`theme-${i+1}`,`Personal theme ${i+1}`])),...Object.fromEntries(Array.from({length:3},(_,i)=>[`concept-${i+1}`,`Concept ${i+1} description`])),...Object.fromEntries(Array.from({length:3},(_,i)=>[`concept-${i+1}-pro`,`Concept ${i+1} strength`])),...Object.fromEntries(Array.from({length:3},(_,i)=>[`concept-${i+1}-con`,`Concept ${i+1} limitation`])),'emblem-choice':'Selected concept and justification'};
    if(activity.id==='function-words') return Object.fromEntries(functionTerms.flatMap((term,index)=>[[`function-${index}-meaning`,`${term}: meaning`],[`function-${index}-synonym`,`${term}: synonym`],[`function-${index}-opposite`,`${term}: opposite`]]));
    if(activity.id==='aesthetic-words') return {...Object.fromEntries(aestheticTerms.flatMap((term,index)=>[[`aesthetic-${index}-meaning`,`${term}: meaning`],[`aesthetic-${index}-example`,`${term}: example`]])),...Object.fromEntries(designClues.map(([key,clue])=>[key,clue]))};
    if(activity.id==='final-evaluation') return {...Object.fromEntries(ratingTerms.map((term,index)=>[`rating-${index}`,`${term} self-rating out of 10`])),'eval-function-well':'Function: what went well','eval-function-improve':'Function: what could improve','eval-function-next':'Function: what I would do differently','eval-aesthetic-well':'Aesthetics: what went well','eval-aesthetic-improve':'Aesthetics: what could improve','eval-aesthetic-next':'Aesthetics: what I would do differently'};
    return {};
  };

  const renderKwl = () => `<div class="activity-grid three">
    <section class="activity-panel colour kwl-step"><span class="kwl-letter" aria-hidden="true">K</span>${field('kwl-know','What do I already know?','<textarea data-activity-field="FIELD_KEY" placeholder="What do you remember from earlier learning or life experience?"></textarea>')}</section>
    <section class="activity-panel colour kwl-step"><span class="kwl-letter" aria-hidden="true">W</span>${field('kwl-want','What do I want to learn?','<textarea data-activity-field="FIELD_KEY" placeholder="Which skill or idea do you want to understand better?"></textarea>')}</section>
    <section class="activity-panel colour kwl-step"><span class="kwl-letter" aria-hidden="true">L</span>${field('kwl-learned','What have I learned?','<textarea data-activity-field="FIELD_KEY" placeholder="Return later: what can you now explain or do better?"></textarea>')}</section>
  </div>`;

  const renderVocabulary = () => `<p class="activity-note">Confidence is a starting point, not a score. Revisit this activity as your language becomes more precise.</p><div class="vocab-grid">${vocabularyTerms.map((term,index)=>`<article class="vocab-card"><strong>${escapeHtml(term)}</strong><label>My confidence<select data-activity-field="vocab-${index}-level"><option value="">Choose one</option><option value="new">I do not know it yet</option><option value="recognise">I recognise it</option><option value="explain">I can explain it</option></select></label><label>My example<input type="text" data-activity-field="vocab-${index}-example" placeholder="Use the word in a clear sentence"></label></article>`).join('')}</div>`;

  const renderSafety = () => `<p class="activity-note"><strong>Boundary:</strong> this checks broad workshop conduct only. Current school SOPs and your teacher control every practical activity.</p><div class="safety-grid">${safetyStatements.map(([key,statement])=>`<article class="safety-card"><p>${escapeHtml(statement)}</p><label><span class="visually-hidden">Choose safe or unsafe</span><select data-activity-field="${key}"><option value="">Choose</option><option value="safe">Safe</option><option value="unsafe">Unsafe</option></select></label></article>`).join('')}</div>${renderCheckButton('safety-sort','Check my sort')}`;

  const renderTools = prefix => `<p class="activity-note">Use the approved name and broad purpose only. A correct name does not give permission or teach an operating procedure.</p><div class="tool-gallery">${toolCards.map(tool=>`<article class="tool-card"><img src="${prefix}${tool.src}" alt="${escapeHtml(tool.alt)}"><div><label>Approved name<select data-activity-field="tool-${tool.key}-name">${optionHtml(toolNames)}</select></label><label>Broad purpose<select data-activity-field="tool-${tool.key}-purpose">${optionHtml(toolPurposes)}</select></label></div></article>`).join('')}</div><section class="activity-panel colour" style="margin-top:1rem"><h4>Unscramble the source tool words</h4><div class="scramble-grid">${scrambles.map(([letters,clue],index)=>`<article class="scramble-card"><code>${escapeHtml(letters)}</code><small>${escapeHtml(clue)}</small><input type="text" data-activity-field="scramble-${index}" aria-label="Answer for ${escapeHtml(letters)}"></article>`).join('')}</div></section>${renderCheckButton('tool-lab','Check names, purposes and words')}`;

  const renderTimber = () => `<p class="activity-note">The current course identifies pine for this learning project. Describe its relevant properties without assuming every piece behaves identically.</p><div class="match-list">${timberMatches.map(([key,term,definition])=>`<article class="match-row"><strong>${escapeHtml(term)}</strong><div><p>${escapeHtml(definition)}</p><select data-activity-field="${key}" aria-label="Match for ${escapeHtml(term)}">${optionHtml(timberOptions)}</select></div></article>`).join('')}</div><section class="activity-panel colour" style="margin-top:1rem">${field('timber-pine','Why can pine be a suitable choice for this learning project?','<textarea data-activity-field="FIELD_KEY" placeholder="Use relevant properties and acknowledge that teacher-provided requirements control actual selection."></textarea>')}</section>${renderCheckButton('timber-properties','Check the property matches')}`;

  const renderManufacturedWood = () => `<div class="video-studio"><div class="video-frame"><iframe src="https://www.youtube-nocookie.com/embed/${VIDEO_ID}" title="Manufactured Wood Products source video" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div><div class="video-copy"><strong>Source video: Manufactured Wood Products</strong><p>Watch for wood forms, product structures, uses and environmental claims. <a href="https://www.youtube.com/watch?v=${VIDEO_ID}" target="_blank" rel="noopener">Open in YouTube</a>.</p></div></div><p class="activity-note">These prompts are learning evidence from the source deck. They carry no website mark, weighting or automatic submission.</p><div class="question-chapters">${[0,4,8].map((start,chapter)=>`<section class="question-chapter"><h4>${['Start with the material','Compare structures and uses','Connect products and consequences'][chapter]}</h4>${manufacturedQuestions.slice(start,start+4).map((question,index)=>field(`wood-q${start+index+1}`,`Q${start+index+1}. ${question}`,'<textarea data-activity-field="FIELD_KEY"></textarea>')).join('')}</section>`).join('')}</div>`;

  const renderPhoto = (id,label) => `<div class="photo-evidence"><p><strong>${escapeHtml(label)}</strong></p><p>Optional: add a clear photo of teacher-approved paper evidence. The image is resized and saved on this device with the folio.</p><label for="photo-${id}">Choose an image</label><input id="photo-${id}" type="file" accept="image/*" data-activity-photo><img class="photo-preview" data-photo-preview alt="Student evidence preview"><p class="photo-status" data-photo-status>No image added.</p></div>`;

  const renderIsometric = prefix => `<div class="isometric-visual"><svg viewBox="0 0 360 270" role="img" aria-labelledby="iso-title iso-desc"><title id="iso-title">Three principal isometric directions</title><desc id="iso-desc">A vertical line and two receding directions meet at one point. The receding directions are approximately thirty degrees to the horizontal.</desc><defs><linearGradient id="iso-fill" x1="0" x2="1"><stop stop-color="#d8e8fb"/><stop offset="1" stop-color="#bde8dc"/></linearGradient></defs><path d="M180 35 305 105 180 175 55 105Z M55 105v92l125 70 125-70v-92 M180 175v92" fill="url(#iso-fill)" fill-opacity=".62" stroke="#173a47" stroke-width="4"/><path d="M180 175V35M180 175 55 105M180 175 305 105" stroke="#d28626" stroke-width="5"/><text x="190" y="70" class="axis-label">vertical</text><text x="58" y="126" class="axis-label">receding direction</text><text x="224" y="126" class="axis-label">receding direction</text></svg><div><h4>Read form, then confirm detail</h4><p>An isometric drawing communicates several faces in one view. Keep the three directions consistent, then use the related views and written dimensions in the original plan.</p><a class="button secondary" href="${prefix}assets/resources/Footstool.pdf" target="_blank" rel="noopener">Open the authoritative plan</a></div></div><div class="process-strip"><span>1 · Establish directions</span><span>2 · Build the main form</span><span>3 · Cross-check the plan</span></div><div class="activity-grid">${field('iso-directions','Explain how the three principal directions organise an isometric drawing.','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field('iso-compare','What can an isometric view communicate that separate related views communicate differently?','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field('iso-reflection','What did you check before treating your drawing as useful evidence?','<textarea data-activity-field="FIELD_KEY"></textarea>')}</div>${renderPhoto('isometric-evidence','Add drawing evidence')}`;

  const renderEmblem = () => `<p class="activity-note">Any laser cutting or engraving remains optional and requires teacher approval. This activity develops design evidence; it supplies no process settings.</p><div class="emblem-themes">${[1,2,3].map(number=>`<section class="theme-tile">${field(`theme-${number}`,`Personal theme ${number}`,'<textarea data-activity-field="FIELD_KEY" placeholder="Initials, place, hobby, animal, significant number or another approved theme. Explain why it matters."></textarea>')}</section>`).join('')}</div><div class="concept-grid">${[1,2,3].map(number=>`<section class="concept-card"><h4>Concept ${number}</h4>${field(`concept-${number}`,'Describe the arrangement and meaning','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field(`concept-${number}-pro`,'Strength','<input type="text" data-activity-field="FIELD_KEY" placeholder="Use a clear design criterion">')}${field(`concept-${number}-con`,'Limitation','<input type="text" data-activity-field="FIELD_KEY" placeholder="Name a specific limitation">')}</section>`).join('')}</div><section class="activity-panel colour" style="margin-top:1rem">${field('emblem-choice','Which concept will you refine, and why?','<textarea data-activity-field="FIELD_KEY" placeholder="Justify the choice using clarity, recognition, balance, contrast, suitability or personal meaning."></textarea>')}</section>${renderPhoto('emblem-studio','Add final drawing evidence')}`;

  const renderFunctionWords = () => `<p class="activity-note">Use your own words. A definition or synonym should help another student understand the performance quality.</p><div class="word-table">${functionTerms.map((term,index)=>`<article class="word-row"><strong>${escapeHtml(term)}</strong>${field(`function-${index}-meaning`,'Meaning','<input type="text" data-activity-field="FIELD_KEY">')}${field(`function-${index}-synonym`,'Similar word','<input type="text" data-activity-field="FIELD_KEY">')}${field(`function-${index}-opposite`,'Opposite','<input type="text" data-activity-field="FIELD_KEY">')}</article>`).join('')}</div>`;

  const renderAestheticWords = () => `<p class="activity-note">Build precise visual language first, then solve the clue wall drawn from the source crossword.</p><div class="word-table">${aestheticTerms.map((term,index)=>`<article class="word-row"><strong>${escapeHtml(term)}</strong>${field(`aesthetic-${index}-meaning`,'Meaning in my words','<input type="text" data-activity-field="FIELD_KEY">')}${field(`aesthetic-${index}-example`,'Footstool or design example','<input type="text" data-activity-field="FIELD_KEY">')}<span aria-hidden="true"></span></article>`).join('')}</div><section class="activity-panel colour" style="margin-top:1rem"><h4>Twelve design clues</h4><div class="clue-wall">${designClues.map(([key,clue])=>`<article class="clue-card"><small>${escapeHtml(clue)}</small><input type="text" data-activity-field="${key}" aria-label="${escapeHtml(clue)}"></article>`).join('')}</div></section>${renderCheckButton('aesthetic-words','Check the clue wall')}`;

  const renderEvaluation = () => `<p class="activity-note"><strong>Self-rating only:</strong> move each slider to prompt reflection. These numbers are not marks, grades or a formal assessment result.</p><div class="rating-grid">${ratingTerms.map((term,index)=>`<article class="rating-item"><label>${escapeHtml(term)}<output class="rating-value" data-rating-output="rating-${index}">Not rated</output><input type="range" min="1" max="10" value="5" data-activity-field="rating-${index}" aria-label="${escapeHtml(term)} self-rating from 1 to 10"></label></article>`).join('')}</div><div class="activity-grid" style="margin-top:1rem"><section class="activity-panel colour"><h4>Function</h4>${field('eval-function-well','What went well?','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field('eval-function-improve','What could be improved?','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field('eval-function-next','What would you do differently next time?','<textarea data-activity-field="FIELD_KEY"></textarea>')}</section><section class="activity-panel colour"><h4>Aesthetics</h4>${field('eval-aesthetic-well','What went well?','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field('eval-aesthetic-improve','What could be improved?','<textarea data-activity-field="FIELD_KEY"></textarea>')}${field('eval-aesthetic-next','What would you do differently next time?','<textarea data-activity-field="FIELD_KEY"></textarea>')}</section></div>`;

  function renderCheckButton(kind,label){return `<div class="activity-check-row"><button class="activity-check" type="button" data-check-kind="${kind}">${escapeHtml(label)}</button><span class="activity-feedback" data-check-feedback role="status" aria-live="polite"></span></div>`}

  const renderBody = (activity,prefix) => ({
    kwl:renderKwl,
    vocabulary:renderVocabulary,
    'safety-sort':renderSafety,
    'tool-lab':()=>renderTools(prefix),
    'timber-properties':renderTimber,
    'manufactured-wood':renderManufacturedWood,
    'isometric-evidence':()=>renderIsometric(prefix),
    'emblem-studio':renderEmblem,
    'function-words':renderFunctionWords,
    'aesthetic-words':renderAestheticWords,
    'final-evaluation':renderEvaluation
  })[activity.id]();

  const renderActivity = (activity,prefix) => `<article class="source-activity" id="source-activity-${activity.id}" data-activity-id="${activity.id}" data-tone="${activity.tone}"><header class="activity-stage"><div class="activity-stage-copy"><p class="activity-kicker">PROJECT ACTIVITY · MODULE ${activity.module}</p><h3>${escapeHtml(activity.title)}</h3><p>${escapeHtml(activity.subtitle)}</p></div><aside class="activity-source-badge"><strong>PowerPoint source</strong><span>Slide${activity.slides.includes('–')||activity.slides.includes('and')||activity.slides.includes('and')?'s':''} ${escapeHtml(activity.slides)} · rebuilt for the web</span></aside></header><div class="activity-body">${renderBody(activity,prefix)}<footer class="activity-footer"><label class="activity-ready"><input type="checkbox" data-activity-ready><span>I have completed and checked this activity for my folio.</span></label><p class="activity-save-state" data-activity-save-state>Ready to save on this device.</p></footer></div></article>`;

  const safeParse = value => { try { return JSON.parse(value); } catch { return null; } };
  const readState = () => {
    const source = safeParse(localStorage.getItem(STORAGE_KEY));
    const state = source && typeof source==='object' ? source : {schema:SCHEMA,version:2,student:{name:'',className:''},cards:{},activities:{},updatedAt:''};
    state.schema = SCHEMA;
    state.version = Math.max(Number(state.version)||1,2);
    state.activities = state.activities && typeof state.activities==='object' ? state.activities : {};
    return state;
  };
  const getActivityState = (state,id) => {
    const source = state.activities[id] && typeof state.activities[id]==='object' ? state.activities[id] : {};
    state.activities[id] = {values:source.values&&typeof source.values==='object'?source.values:{},photoData:typeof source.photoData==='string'?source.photoData:'',photoName:typeof source.photoName==='string'?source.photoName:'',ready:Boolean(source.ready),updatedAt:typeof source.updatedAt==='string'?source.updatedAt:''};
    return state.activities[id];
  };
  const normaliseAnswer = value => String(value??'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

  function attachActivity(root,activity){
    let state=readState();
    let item=getActivityState(state,activity.id);
    let saveTimer;
    const status=root.querySelector('[data-activity-save-state]');
    const ready=root.querySelector('[data-activity-ready]');

    root.querySelectorAll('[data-activity-field]').forEach(control=>{
      const key=control.dataset.activityField;
      const saved=item.values[key];
      if(control.type==='range'){
        if(saved!=='undefined'&&saved!==undefined&&saved!==''){
          control.value=saved;
          const output=root.querySelector(`[data-rating-output="${key}"]`);
          if(output)output.textContent=`${saved}/10`;
        }
      }else if(saved!==undefined){control.value=saved}
      const eventName=control.tagName==='SELECT'?'change':'input';
      control.addEventListener(eventName,()=>{
        item.values[key]=control.value;
        control.removeAttribute('aria-invalid');
        if(control.type==='range'){
          const output=root.querySelector(`[data-rating-output="${key}"]`);
          if(output)output.textContent=`${control.value}/10`;
        }
        queueSave();
        updateReady();
      });
    });

    const preview=root.querySelector('[data-photo-preview]');
    const photoStatus=root.querySelector('[data-photo-status]');
    if(preview&&item.photoData){preview.src=item.photoData;photoStatus.textContent=`Restored ${item.photoName||'saved image'} from this device.`}
    root.querySelector('[data-activity-photo]')?.addEventListener('change',async event=>{
      const file=event.target.files&&event.target.files[0];
      if(!file)return;
      photoStatus.textContent='Preparing the image for device-local saving…';
      try{
        const photo=await resizeImage(file,1600,.82);
        item.photoData=photo;
        item.photoName=file.name.slice(0,120);
        preview.src=photo;
        saveNow();
        photoStatus.textContent=`Saved ${file.name} with this folio on this device.`;
      }catch{
        photoStatus.textContent='This image could not be prepared. Try a JPG, PNG or another browser-supported image.';
      }finally{event.target.value=''}
    });

    root.querySelector('[data-check-kind]')?.addEventListener('click',()=>checkActivity(root,activity,item));
    ready.addEventListener('change',()=>{item.ready=ready.checked;saveNow();updateReady()});

    function requiredComplete(){return activity.required.every(key=>String(item.values[key]??'').trim().length>0)}
    function updateReady(){
      const complete=requiredComplete();
      if(!complete&&item.ready)item.ready=false;
      ready.disabled=!complete;
      ready.checked=item.ready;
      const remaining=activity.required.filter(key=>!String(item.values[key]??'').trim()).length;
      status.textContent=item.ready?'Saved and marked ready for the folio.':complete?'Saved. Check your work, then mark it ready.':`Saved on this device · ${remaining} response${remaining===1?'':'s'} still needed.`;
    }
    function queueSave(){window.clearTimeout(saveTimer);status.textContent='Saving on this device…';saveTimer=window.setTimeout(saveNow,250)}
    function saveNow(){
      item.updatedAt=new Date().toISOString();
      state.updatedAt=item.updatedAt;
      state.activities[activity.id]=item;
      try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state))}
      catch{status.textContent='The browser could not save more evidence. Download a folio backup before adding another image.';return}
      updateReady();
    }
    updateReady();
  }

  function checkActivity(root,activity,item){
    const answers=activity.answers||{};
    let checked=0,correct=0;
    Object.entries(answers).forEach(([key,answer])=>{
      const control=root.querySelector(`[data-activity-field="${key}"]`);
      if(!control)return;
      const value=item.values[key]??control.value;
      if(!String(value).trim()){control.setAttribute('aria-invalid','true');return}
      checked++;
      const match=normaliseAnswer(value)===normaliseAnswer(answer);
      if(match){correct++;control.removeAttribute('aria-invalid')}else control.setAttribute('aria-invalid','true');
    });
    const feedback=root.querySelector('[data-check-feedback]');
    if(!checked)feedback.textContent='Complete the activity first, then check it.';
    else if(correct===Object.keys(answers).length)feedback.textContent='All checked responses match the source activity.';
    else feedback.textContent=`${correct} of ${Object.keys(answers).length} checked responses match. Review the relevant module theory and try again.`;
  }

  function resizeImage(file,maxSize,quality){
    return new Promise((resolve,reject)=>{
      const reader=new FileReader();
      reader.onerror=reject;
      reader.onload=()=>{
        const image=new Image();
        image.onerror=reject;
        image.onload=()=>{
          const scale=Math.min(1,maxSize/Math.max(image.width,image.height));
          const canvas=document.createElement('canvas');
          canvas.width=Math.max(1,Math.round(image.width*scale));
          canvas.height=Math.max(1,Math.round(image.height*scale));
          canvas.getContext('2d').drawImage(image,0,0,canvas.width,canvas.height);
          resolve(canvas.toDataURL('image/jpeg',quality));
        };
        image.src=reader.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function renderModule(moduleNumber){
    // Module 1 is the guided-course opening: keep the theory, evidence and
    // progress sequence clear rather than inserting separate project activities.
    if(Number(moduleNumber)>=1)return;
    const moduleActivities=activities.filter(activity=>activity.module===moduleNumber);
    if(!moduleActivities.length)return;
    const prefix=document.body.dataset.module?'../':'';
    const host=document.createElement('section');
    host.className='source-activity-pathway';
    host.id='project-activities';
    host.innerHTML=`<header class="pathway-heading"><p class="eyebrow">PROJECT ACTIVITIES</p><h2>Complete the matching work here.</h2><p>These laptop-ready activities come from the master Footstool PowerPoint. They save into the same device-local folio, so you can return to them without searching through all 25 slides. <a href="${prefix}assets/resources/Year-8-Footstool-Project.pptx">Download the master PowerPoint</a>.</p></header>${moduleActivities.map(activity=>renderActivity(activity,prefix)).join('')}`;
    document.getElementById('module-sections').insertAdjacentElement('afterend',host);
    const links=document.createElement('div');
    links.className='module-activity-links';
    links.innerHTML=`<strong>Project activities</strong>${moduleActivities.map(activity=>`<a href="#source-activity-${activity.id}">${escapeHtml(activity.title)}</a>`).join('')}`;
    document.getElementById('section-jumps')?.insertAdjacentElement('afterend',links);
    moduleActivities.forEach(activity=>attachActivity(host.querySelector(`[data-activity-id="${activity.id}"]`),activity));
  }

  function getExportRows(activityId,item){
    const activity=activities.find(entry=>entry.id===activityId);
    if(!activity)return [];
    const labels=fieldLabels(activity);
    return Object.entries(item?.values||{}).filter(([,value])=>String(value??'').trim()).map(([key,value])=>({label:labels[key]||key,value:String(value)}));
  }

  window.FootstoolSourceActivities={
    manifest:activities.map(activity=>({...activity,labels:fieldLabels(activity)})),
    getForModule:moduleNumber=>activities.filter(activity=>activity.module===moduleNumber),
    renderModule,
    getExportRows,
    storageKey:STORAGE_KEY,
    schema:SCHEMA
  };
})();
