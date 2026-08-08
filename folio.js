(() => {
  'use strict';

  const STORAGE_KEY = 'footstool-y8:v1:folio';
  const LEGACY_KEY = 'year8-footstool-folio-v1';
  const SCHEMA = 'footstool-y8-folio-backup-v1';
  const MODULE_STUDENT_KEY = 'footstool-y8:v2:student';
  const MIN_RESPONSE_LENGTH = 20;
  const activityManifest = window.FootstoolSourceActivities?.manifest || [];
  const sourcePhoto = (file, name, alt) => ({
    src: `assets/source-library/${file}`,
    href: `assets/source-library/${file}`,
    name,
    alt,
    link: `Open ${name.toLowerCase()} larger`
  });

  const cards = [
    {
      id: '01', module: 1, weeks: '1–2', title: 'Starting point',
      action: 'Record what you already know and set one achievable learning goal.',
      starter: 'At the start I already know … My goal is …',
      visual: { type: 'kwl' },
      caption: 'A starting point helps you notice how your understanding changes.',
      sourceVisuals: [
        sourcePhoto('timber-lengths.jpeg', 'Timber lengths', 'A stack of timber lengths showing variation in colour and end grain.')
      ],
      sourceCaption: 'Use the timber photograph only as a prompt for what you already know or want to learn. It does not identify the Footstool stock.'
    },
    {
      id: '02', module: 1, weeks: '1–2', title: 'Workshop readiness',
      action: 'Explain two actions you will take to keep your workshop area safe.',
      starter: 'I will … because … If I am unsure, I will …',
      sourceVisuals: [
        sourcePhoto('hierarchy-of-controls.jpg', 'Hierarchy of controls', 'The five-level hierarchy of controls labelled elimination, substitution, engineering controls, administrative controls and PPE.'),
        sourcePhoto('safety-glasses.jpg', 'Safety glasses', 'Clear safety glasses with green and black arms against a white background.'),
        sourcePhoto('ear-muffs.jpeg', 'Earmuffs', 'Green and black earmuffs photographed against a white background.')
      ],
      sourceCaption: 'Use these visuals to recognise broad controls and PPE examples. Your teacher confirms the requirements for each workshop activity.'
    },
    {
      id: '03', module: 2, weeks: '3–4', title: 'Tool communication',
      action: 'Name one teacher-approved tool and explain its broad purpose.',
      starter: 'The tool is called … Its broad purpose is … Before using it, I need …',
      sourceVisuals: [
        sourcePhoto('battery-drill.jpeg', 'Battery drill', 'A blue battery drill shown from the side against a white background.'),
        sourcePhoto('bevel-edge-chisels.jpeg', 'Bevel-edge chisels', 'Two bevel-edge chisels with black and yellow handles.'),
        sourcePhoto('coping-saw.jpg', 'Coping saw', 'A coping saw with its narrow blade and metal frame visible.'),
        sourcePhoto('tenon-saw.jpg', 'Tenon saw', 'A tenon saw with a backed blade and blue and yellow handle.')
      ],
      sourceCaption: 'Choose one teacher-approved tool to name and describe broadly. These photographs do not provide operating instructions or approve a tool for a particular Footstool process.'
    },
    {
      id: '04', module: 3, weeks: '5–6', title: 'Timber language',
      action: 'Describe a timber sample using grain, density and knot vocabulary.',
      starter: 'The grain appears … The sample feels … for its size. I can see …',
      sourceVisuals: [
        sourcePhoto('timber-board.jpeg', 'Timber board', 'A single timber board showing visible grain and a knot.'),
        sourcePhoto('hand-plane.jpeg', 'Hand plane', 'A metal hand plane with wooden handles against a white background.')
      ],
      sourceCaption: 'Describe only visible timber evidence. The board does not identify the Footstool stock, and the plane provides general timber-working context only.'
    },
    {
      id: '05', module: 4, weeks: '7–8', title: 'Board investigation',
      action: 'Compare one manufactured wood product with solid timber using evidence.',
      starter: 'The manufactured product uses … Solid timber differs because … This structure suits …',
      sourceVisuals: [
        sourcePhoto('flat-pack-cupboard.jpeg', 'Flat-pack cupboard', 'An exploded view of flat-pack cupboard panels and components.')
      ],
      sourceCaption: 'This flat-pack product provides manufactured-board context, but the photograph alone does not prove the internal material structure.'
    },
    {
      id: '06', module: 5, weeks: '9–10', title: 'Plan reading',
      action: 'Explain how written dimensions and related views help you read the original plan.',
      starter: 'The written dimensions tell me … The related views help me … If a detail is unclear, I will …',
      visual: { type: 'image', src: 'assets/plan-page-1.png', alt: 'Preview of page one of the original Wagga High School Foot Stool working drawing.', href: 'assets/resources/Footstool.pdf', link: 'Open original plan larger (PDF, 2 pages)' },
      caption: 'Use the unchanged original PDF. Read written dimensions; do not measure the screen preview.',
      sourceVisuals: [
        sourcePhoto('steel-rule.jpeg', 'Steel rules', 'Two steel rules photographed against a white background.'),
        sourcePhoto('tape-measure.jpeg', 'Tape measure', 'A yellow tape measure with a short length of tape extended.')
      ],
      sourceCaption: 'These are familiar measuring references, not permission to measure the screen. Written dimensions on the unchanged original plan control.'
    },
    {
      id: '07', module: 6, weeks: '11–12', title: 'Drawing communication',
      action: 'Compare what third-angle and isometric drawings communicate.',
      starter: 'Third-angle drawing communicates … Isometric drawing communicates … Both are useful because …',
      visual: { type: 'image', src: 'assets/plan-page-2.png', alt: 'Preview of page two of the original Wagga High School Foot Stool working drawing, showing related views.', href: 'assets/resources/Footstool.pdf', link: 'Open original plan larger (PDF, 2 pages)' },
      caption: 'Related views communicate different faces and features. Use the original plan for project-specific detail.',
      sourceVisuals: [
        sourcePhoto('combination-square.jpg', 'Combination square', 'A combination square with its metal rule and black and green head visible.'),
        sourcePhoto('sliding-bevel.jpg', 'Sliding bevel', 'A sliding bevel held across a narrow timber strip.')
      ],
      sourceCaption: 'These reference tools support accurate drawing vocabulary. They do not replace the views, notes or written dimensions in the original plan.'
    },
    {
      id: '08', module: 7, weeks: '13–14', title: 'Emblem concepts',
      action: 'Describe three distinct emblem ideas you developed before choosing one.',
      starter: 'Idea 1 explores … Idea 2 explores … Idea 3 explores …',
      visual: { type: 'emblem' },
      caption: 'Begin with three personal themes, combine them into distinct concepts and keep later processes teacher controlled.'
    },
    {
      id: '09', module: 7, weeks: '13–14', title: 'Design choice',
      action: 'Justify your selected emblem using clear design criteria.',
      starter: 'I selected idea … because its balance, recognition or clarity … I would refine …',
      visual: { type: 'choice' },
      caption: 'A reasoned choice compares alternatives and links the decision to observable design qualities.'
    },
    {
      id: '10', module: 8, weeks: '15–16', title: 'Quality log',
      action: 'Record one observed quality point, the action you took and your next step.',
      starter: 'I observed … I responded by … My next step is …',
      visual: { type: 'quality' },
      caption: 'A clear photograph identifies its subject; your quality log must still state what you observed and checked.',
      sourceVisuals: [
        sourcePhoto('f-clamps.jpeg', 'F-clamps', 'Three F-clamps photographed against a white background.'),
        sourcePhoto('g-clamp.jpg', 'G-clamp', 'A blue G-clamp photographed against a white background.'),
        sourcePhoto('woodwork-vice.jpg', 'Woodwork vice', 'A red woodwork vice photographed against a white background.')
      ],
      sourceCaption: 'These clearly identifiable holding tools model useful photographic subjects. Record your own observation and action; the photographs do not prescribe a Footstool method.',
      date: true
    },
    {
      id: '11', module: 9, weeks: '17–18', title: 'Function review',
      action: 'Evaluate one functional quality using an observation or approved test as evidence.',
      starter: 'The product is … because I observed … A realistic improvement would be …',
      visual: { type: 'function' },
      caption: 'Useful evaluation links a functional criterion to evidence and a realistic improvement.',
      sourceVisuals: [
        sourcePhoto('spirit-level.jpg', 'Spirit level', 'A yellow spirit level with three bubble vials against a white background.')
      ],
      sourceCaption: 'This is one checking-tool example only. Describe an observation or test approved by your teacher; do not infer a required Footstool test from the photograph.'
    },
    {
      id: '12', module: 10, weeks: '19–20', title: 'Aesthetic review',
      action: 'Evaluate two visual qualities and identify one improvement.',
      starter: 'The appearance shows … and … This is evident because … I would improve …',
      visual: { type: 'aesthetic' },
      caption: 'Use precise visual vocabulary when evaluating appearance. The teacher confirms any approved project finish.',
      sourceVisuals: [
        sourcePhoto('paint-tins.jpeg', 'Coating tins', 'Several generic coating tins grouped against a dark background.')
      ],
      sourceCaption: 'The tins provide broad coating context only; they do not identify or approve a Footstool finish. Evaluate the appearance of your own work.'
    }
  ];

  const cardGroups = [
    { number: '1', title: 'Start safely and communicate', description: 'Set a starting point, show workshop readiness and use accurate tool language.', cards: ['01', '02', '03'] },
    { number: '2', title: 'Understand materials and drawings', description: 'Record material observations and read the original plan without guessing.', cards: ['04', '05', '06', '07'] },
    { number: '3', title: 'Develop and record decisions', description: 'Keep emblem concepts, a justified choice and one practical quality observation.', cards: ['08', '09', '10'] },
    { number: '4', title: 'Evaluate the finished work', description: 'Use evidence to review function and appearance.', cards: ['11', '12'] }
  ];

  const moduleLabels = [
    'Workshop conduct and readiness',
    'Tool recognition and purpose',
    'Timber properties',
    'Manufactured wood',
    'Reading the original plan',
    'Drawing communication',
    'Emblem development',
    'Practical progress evidence',
    'Function evaluation',
    'Aesthetic evaluation and reflection'
  ];

  const blankState = () => ({
    schema: SCHEMA,
    version: 2,
    student: { name: '', className: '' },
    cards: Object.fromEntries(cards.map(card => [card.id, { response: '', ready: false, date: '' }])),
    activities: Object.fromEntries(activityManifest.map(activity => [activity.id, { values: {}, photoData: '', photoName: '', ready: false, updatedAt: '' }])),
    updatedAt: ''
  });

  const safeParse = value => {
    try { return JSON.parse(value); } catch { return null; }
  };

  const normaliseState = source => {
    const next = blankState();
    if (!source || typeof source !== 'object') return next;
    const student = source.student && typeof source.student === 'object' ? source.student : {};
    next.student.name = String(student.name ?? source.name ?? '').slice(0, 80);
    next.student.className = String(student.className ?? student.class ?? source.class ?? '').slice(0, 40);
    cards.forEach(card => {
      const incoming = source.cards && source.cards[card.id];
      if (!incoming || typeof incoming !== 'object') return;
      next.cards[card.id] = {
        response: String(incoming.response ?? '').slice(0, 4000),
        ready: Boolean(incoming.ready),
        date: /^\d{4}-\d{2}-\d{2}$/.test(String(incoming.date ?? '')) ? String(incoming.date) : ''
      };
    });
    activityManifest.forEach(activity => {
      const incoming = source.activities && source.activities[activity.id];
      if (!incoming || typeof incoming !== 'object') return;
      const labels = activity.labels || {};
      const values = {};
      Object.keys(labels).forEach(key => {
        const value = incoming.values && incoming.values[key];
        if (value === undefined || value === null) return;
        values[key] = String(value).slice(0, 12000);
      });
      const photoData = typeof incoming.photoData === 'string' && /^data:image\/(?:jpeg|png|webp);base64,/i.test(incoming.photoData) && incoming.photoData.length <= 3500000 ? incoming.photoData : '';
      next.activities[activity.id] = {
        values,
        photoData,
        photoName: String(incoming.photoName || '').slice(0, 120),
        ready: Boolean(incoming.ready) && activity.required.every(key => String(values[key] || '').trim()),
        updatedAt: typeof incoming.updatedAt === 'string' ? incoming.updatedAt : ''
      };
    });
    next.updatedAt = typeof source.updatedAt === 'string' ? source.updatedAt : '';
    return next;
  };

  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  const legacy = safeParse(localStorage.getItem(LEGACY_KEY));
  let state = normaliseState(stored || legacy);
  const moduleStudent = safeParse(localStorage.getItem(MODULE_STUDENT_KEY));
  if (!state.student.name && !state.student.className && moduleStudent) {
    state.student.name = String(moduleStudent.name || '').slice(0, 80);
    state.student.className = String(moduleStudent.className || '').slice(0, 40);
  }
  let saveTimer;

  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navToggle.getAttribute('aria-expanded') !== 'true';
      navToggle.setAttribute('aria-expanded', String(open));
      navLinks.classList.toggle('open', open);
    });
    navLinks.addEventListener('click', event => {
      if (!event.target.closest('a')) return;
      navToggle.setAttribute('aria-expanded', 'false');
      navLinks.classList.remove('open');
    });
  }

  const escapeHtml = value => String(value).replace(/[&<>'"]/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  })[character]);

  const renderVisual = card => {
    const visual = card.visual;
    if (!visual) return '';
    if (visual.type === 'image') {
      return `<figure class="card-visual card-image"><img src="${visual.src}" alt="${escapeHtml(visual.alt)}"><figcaption>${escapeHtml(card.caption)} <a href="${visual.href}" target="_blank" rel="noopener">${escapeHtml(visual.link)}</a></figcaption></figure>`;
    }
    const diagrams = {
      kwl: '<div class="visual-diagram kwl-diagram" role="img" aria-label="A path from what I know, through what I want to learn, to what I learned"><span>Know</span><b aria-hidden="true">→</b><span>Want to learn</span><b aria-hidden="true">→</b><span>Learned</span></div>',
      'wood-forms': '<div class="visual-diagram wood-forms" role="img" aria-label="Four labelled forms used in manufactured wood products"><span>Veneers</span><span>Strands</span><span>Fibres</span><span>Particles</span></div>',
      emblem: '<div class="visual-diagram emblem-diagram" role="img" aria-label="Three personal themes combining into three distinct emblem concepts"><div><span>Theme 1</span><span>Theme 2</span><span>Theme 3</span></div><b aria-hidden="true">combine and vary</b><strong>Three distinct concepts</strong></div>',
      choice: '<div class="visual-diagram choice-diagram" role="img" aria-label="Three concept boxes narrowing to one justified selection"><div><span>Idea 1</span><span>Idea 2</span><span>Idea 3</span></div><b aria-hidden="true">↓ compare ↓</b><strong>Selected idea + reason</strong></div>',
      quality: '<div class="visual-diagram quality-diagram" role="img" aria-label="A repeating evidence cycle: observe, act, next step"><span>Observe</span><b aria-hidden="true">→</b><span>Act</span><b aria-hidden="true">→</b><span>Next step</span></div>',
      function: '<div class="visual-diagram word-diagram function-diagram" role="img" aria-label="Functional evaluation vocabulary: durable, reliable, stable, ergonomic, efficient and economical"><span>Durable</span><span>Reliable</span><span>Stable</span><span>Ergonomic</span><span>Efficient</span><span>Economical</span></div>',
      aesthetic: '<div class="visual-diagram word-diagram aesthetic-diagram" role="img" aria-label="Aesthetic evaluation vocabulary: balance, contrast, emphasis, form, pattern and texture"><span>Balance</span><span>Contrast</span><span>Emphasis</span><span>Form</span><span>Pattern</span><span>Texture</span></div>'
    };
    return `<figure class="card-visual card-diagram">${diagrams[visual.type]}<figcaption>${escapeHtml(card.caption)}</figcaption></figure>`;
  };

  const renderSourceVisuals = card => {
    const visuals = card.sourceVisuals || [];
    if (!visuals.length) return '';
    const tiles = visuals.map(visual => `<a class="source-visual-tile" href="${visual.href}" target="_blank" rel="noopener" aria-label="${escapeHtml(visual.link)}">
      <img src="${visual.src}" alt="${escapeHtml(visual.alt)}" decoding="async">
      <span>${escapeHtml(visual.name)} <b>Open larger</b></span>
    </a>`).join('');
    return `<section class="source-visuals" aria-label="Source visuals for ${escapeHtml(card.title)}">
      <p class="source-visual-heading">Source visual cues</p>
      <div class="source-visual-grid" data-count="${visuals.length}">${tiles}</div>
      <p class="source-visual-note">${escapeHtml(card.sourceCaption)}</p>
    </section>`;
  };

  const renderCard = card => {
    const dateField = card.date ? `<label class="date-field" for="card-${card.id}-date">Date of this observation<input id="card-${card.id}-date" type="date" data-card-date="${card.id}"></label>` : '';
    return `<details class="folio-card" id="card-${card.id}" data-card="${card.id}" open>
      <summary class="card-heading">
        <div class="card-number" aria-hidden="true">${card.id}</div>
        <div><p class="card-module">Module ${card.module} · Weeks ${card.weeks}</p><h3>${escapeHtml(card.title)}</h3></div>
        <span class="card-status" data-card-status="${card.id}">In progress</span>
      </summary>
      <div class="folio-card-body">
         <div class="print-card-heading"><span>Year 8 Intro Timber Technology · Footstool evidence folio</span><span class="print-student"></span></div>
         ${renderVisual(card)}
         ${renderSourceVisuals(card)}
         <div class="card-task">
          <p class="action-label">Your one action</p>
          <p class="card-action">${escapeHtml(card.action)}</p>
          ${dateField}
          <label for="card-${card.id}-response">Your evidence
            <textarea id="card-${card.id}-response" data-card-response="${card.id}" maxlength="4000" rows="7" placeholder="${escapeHtml(card.starter)}"></textarea>
          </label>
          <div class="response-meta"><span data-character-count="${card.id}">0 characters</span><span>Write at least ${MIN_RESPONSE_LENGTH} characters before marking ready.</span></div>
          <label class="ready-check" for="card-${card.id}-ready"><input id="card-${card.id}-ready" type="checkbox" data-card-ready="${card.id}"> I have checked this evidence and it is ready for my folio.</label>
          <p class="card-guidance" data-card-guidance="${card.id}">Write a meaningful response to continue.</p>
        </div>
      </div>
    </details>`;
  };

  const renderCardGroup = group => `<section class="folio-card-group" aria-labelledby="folio-group-${group.number}">
    <header class="folio-card-group-heading">
      <span class="folio-card-group-number" aria-hidden="true">${group.number}</span>
      <div><h3 id="folio-group-${group.number}">${escapeHtml(group.title)}</h3><p>${escapeHtml(group.description)}</p></div>
    </header>
    <div class="folio-card-group-grid">${group.cards.map(id => renderCard(cards.find(card => card.id === id))).join('')}</div>
  </section>`;

  const isMeaningful = item => item.response.trim().length >= MIN_RESPONSE_LENGTH;
  const isReady = item => item.ready && isMeaningful(item);

  const save = () => {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    localStorage.setItem(MODULE_STUDENT_KEY, JSON.stringify({ name: state.student.name, className: state.student.className, updatedAt: state.updatedAt }));
    const formatted = new Intl.DateTimeFormat('en-AU', { hour: 'numeric', minute: '2-digit', second: '2-digit' }).format(new Date(state.updatedAt));
    document.getElementById('save-state').textContent = `Saved on this device at ${formatted}.`;
  };

  const queueSave = () => {
    window.clearTimeout(saveTimer);
    document.getElementById('save-state').textContent = 'Saving on this device…';
    saveTimer = window.setTimeout(save, 250);
  };

  const updateCard = card => {
    const item = state.cards[card.id];
    const response = document.querySelector(`[data-card-response="${card.id}"]`);
    const ready = document.querySelector(`[data-card-ready="${card.id}"]`);
    const date = document.querySelector(`[data-card-date="${card.id}"]`);
    const meaningful = isMeaningful(item);
    const complete = isReady(item);
    ready.disabled = !meaningful;
    if (!meaningful && item.ready) {
      item.ready = false;
      ready.checked = false;
    }
    document.querySelector(`[data-character-count="${card.id}"]`).textContent = `${item.response.length} character${item.response.length === 1 ? '' : 's'}`;
    const status = document.querySelector(`[data-card-status="${card.id}"]`);
    status.textContent = complete ? 'Ready' : meaningful ? 'Needs checking' : 'In progress';
    status.dataset.state = complete ? 'ready' : meaningful ? 'check' : 'progress';
    const guidance = document.querySelector(`[data-card-guidance="${card.id}"]`);
    guidance.textContent = complete ? 'Evidence ready. You can still improve it before export.' : meaningful ? 'Read your response, then mark it ready.' : 'Write a meaningful response to continue.';
    response.setAttribute('aria-invalid', meaningful || item.response.length === 0 ? 'false' : 'true');
    if (date) date.value = item.date;
  };

  const updateProgress = () => {
    cards.forEach(updateCard);
    const readyCards = cards.filter(card => isReady(state.cards[card.id]));
    const count = readyCards.length;
    document.getElementById('ready-count').textContent = count;
    document.getElementById('progress-fill').style.width = `${(count / cards.length) * 100}%`;
    const track = document.querySelector('.progress-track');
    track.setAttribute('aria-valuenow', String(count));
    const next = cards.find(card => !isReady(state.cards[card.id]));
    document.getElementById('next-step').textContent = next ? `Next: Card ${next.id} · ${next.title}.` : 'All twelve cards are ready for backup or print.';
    const continueCard = document.getElementById('continue-card');
    if (continueCard) {
      continueCard.href = next ? `#card-${next.id}` : '#folio-tools';
      continueCard.textContent = next ? `Continue Card ${next.id}` : 'Export completed folio';
    }

    const modules = moduleLabels.map((label, index) => {
      const number = index + 1;
      const related = cards.filter(card => card.module === number);
      const complete = related.filter(card => isReady(state.cards[card.id])).length;
      const cardLinks = related.map(card => `<a href="#card-${card.id}">Card ${card.id}</a>`).join(' · ');
      return `<article class="module-progress-item" data-state="${complete === related.length ? 'ready' : complete > 0 ? 'started' : 'waiting'}">
        <span class="module-progress-number">${String(number).padStart(2, '0')}</span>
        <div><h3>${escapeHtml(label)}</h3><p>${cardLinks}</p></div>
        <strong>${complete}/${related.length} ready</strong>
      </article>`;
    }).join('');
    document.getElementById('module-progress').innerHTML = modules;
    document.querySelectorAll('.print-student').forEach(element => {
      const details = [state.student.name || 'Name not entered', state.student.className ? `Class ${state.student.className}` : 'Class not entered'];
      element.textContent = details.join(' · ');
    });
    renderActivityProgress();
  };

  const renderActivityProgress = () => {
    const host = document.getElementById('folio-activity-summary');
    if (!host) return;
    host.innerHTML = activityManifest.map(activity => {
      const item = state.activities[activity.id] || { ready: false, values: {} };
      const completed = Object.values(item.values || {}).filter(value => String(value).trim()).length;
      const route = `modules/module-${String(activity.module).padStart(2, '0')}.html#source-activity-${activity.id}`;
      return `<a class="folio-activity-card" data-state="${item.ready ? 'ready' : 'progress'}" href="${route}"><span>${String(activity.module).padStart(2, '0')}</span><div><h3>${escapeHtml(activity.title)}</h3><p>PowerPoint slide${String(activity.slides).includes('–') || String(activity.slides).includes('and') ? 's' : ''} ${escapeHtml(activity.slides)} · ${completed}/${activity.required.length} responses saved</p></div><strong>${item.ready ? 'Ready' : 'Continue'}</strong></a>`;
    }).join('');
    const ready = activityManifest.filter(activity => state.activities[activity.id]?.ready).length;
    document.getElementById('activity-completion-note').textContent = `${ready}/${activityManifest.length} project activities marked ready. Activity readiness is learning evidence, not a mark.`;
    const activityReadyCount = document.getElementById('activity-ready-count');
    if (activityReadyCount) activityReadyCount.textContent = String(ready);
  };

  const hydrateForm = () => {
    document.getElementById('student-name').value = state.student.name;
    document.getElementById('student-class').value = state.student.className;
    cards.forEach(card => {
      const item = state.cards[card.id];
      document.querySelector(`[data-card-response="${card.id}"]`).value = item.response;
      document.querySelector(`[data-card-ready="${card.id}"]`).checked = item.ready;
      const date = document.querySelector(`[data-card-date="${card.id}"]`);
      if (date) date.value = item.date;
    });
    updateProgress();
    if (state.updatedAt) {
      const formatted = new Intl.DateTimeFormat('en-AU', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(state.updatedAt));
      document.getElementById('save-state').textContent = `Restored from this device · last saved ${formatted}.`;
    }
  };

  const downloadBackup = () => {
    save();
    const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    const safeName = (state.student.name || 'student').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'student';
    const date = new Date().toISOString().slice(0, 10);
    link.href = URL.createObjectURL(blob);
    link.download = `footstool-evidence-${safeName}-${date}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
    document.getElementById('backup-status').textContent = 'Backup downloaded. Keep the JSON file somewhere you can find it.';
  };

  const restoreBackup = async event => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    try {
      const incoming = safeParse(await file.text());
      if (!incoming || incoming.schema !== SCHEMA || !incoming.cards) throw new Error('invalid');
      if (!window.confirm('Replace this device\'s current folio with the selected backup? Module work will not be changed.')) return;
      state = normaliseState(incoming);
      save();
      hydrateForm();
      document.getElementById('backup-status').textContent = `Backup restored from ${file.name}.`;
    } catch {
      document.getElementById('backup-status').textContent = 'That file is not a valid Footstool folio backup. Nothing was changed.';
    } finally {
      event.target.value = '';
    }
  };

  const resetFolio = () => {
    if (!window.confirm('Reset all twelve folio cards, project activities and student details on this device? Module theory work and Busy Work will not be changed.')) return;
    state = blankState();
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(MODULE_STUDENT_KEY);
    hydrateForm();
    document.getElementById('save-state').textContent = 'Folio reset on this device.';
    document.getElementById('backup-status').textContent = 'The folio cards and project activities were reset. Module theory work was retained.';
  };

  const collectModuleWrittenEvidence = async () => {
    const jobs = [];
    for (let module = 1; module <= 10; module += 1) {
      for (let section = 1; section <= 3; section += 1) {
        const id = `m${String(module).padStart(2, '0')}-s${String(section).padStart(2, '0')}`;
        const local = safeParse(localStorage.getItem(`footstool-y8:v2:section:${id}`)) || {};
        if (!String(local.written || '').trim()) continue;
        jobs.push(fetch(`assets/data/${id}.json`).then(response => response.ok ? response.json() : null).catch(() => null).then(data => ({
          id,
          module,
          title: data?.title || `Module ${module} · Section ${section}`,
          prompt: data?.written?.prompt || 'Written evidence',
          response: String(local.written)
        })));
      }
    }
    return Promise.all(jobs);
  };

  const exportSafeName = () => (state.student.name || 'student').trim().replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase() || 'student';
  const exportValue = (key, value) => key.startsWith('rating-') ? `${value}/10 self-rating (not a mark)` : value;

  const downloadSubmission = async () => {
    const status = document.getElementById('submission-status');
    status.textContent = 'Preparing one self-contained submission file…';
    save();
    try {
      const moduleEvidence = await collectModuleWrittenEvidence();
      const exportedAt = new Intl.DateTimeFormat('en-AU', { dateStyle: 'long', timeStyle: 'short' }).format(new Date());
      const cardHtml = cards.map(card => {
        const item = state.cards[card.id];
        return `<article class="evidence"><header><span>Card ${card.id} · Module ${card.module}</span><strong>${escapeHtml(card.title)}</strong></header><p class="prompt">${escapeHtml(card.action)}</p><div class="response">${escapeHtml(item.response || 'No response saved.')}</div><p class="status">${item.ready && isMeaningful(item) ? 'Marked ready' : 'Not marked ready'}${item.date ? ` · ${escapeHtml(item.date)}` : ''}</p></article>`;
      }).join('');
      const activityHtml = activityManifest.map(activity => {
        const item = state.activities[activity.id] || { values: {}, photoData: '', ready: false };
        const rows = window.FootstoolSourceActivities.getExportRows(activity.id, item);
        const rowsHtml = rows.length ? rows.map(row => {
          const key = Object.keys(activity.labels || {}).find(candidate => activity.labels[candidate] === row.label) || '';
          return `<div class="answer-row"><dt>${escapeHtml(row.label)}</dt><dd>${escapeHtml(exportValue(key, row.value))}</dd></div>`;
        }).join('') : '<p class="empty">No activity responses saved.</p>';
        const photo = item.photoData ? `<figure><img src="${item.photoData}" alt="Student evidence image for ${escapeHtml(activity.title)}"><figcaption>${escapeHtml(item.photoName || 'Student evidence image')}</figcaption></figure>` : '';
        return `<article class="activity"><header><span>Module ${activity.module} · PowerPoint slide${String(activity.slides).includes('–') || String(activity.slides).includes('and') ? 's' : ''} ${escapeHtml(activity.slides)}</span><strong>${escapeHtml(activity.title)}</strong></header><dl>${rowsHtml}</dl>${photo}<p class="status">${item.ready ? 'Marked ready' : 'Not marked ready'}</p></article>`;
      }).join('');
      const moduleHtml = moduleEvidence.length ? moduleEvidence.map(item => `<article class="module-response"><h3>Module ${item.module} · ${escapeHtml(item.title)}</h3><p class="prompt">${escapeHtml(item.prompt)}</p><div class="response">${escapeHtml(item.response)}</div></article>`).join('') : '<p class="empty">No module written-evidence responses were found on this laptop.</p>';
      const html = `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Footstool submission · ${escapeHtml(state.student.name || 'Student')}</title><style>
        :root{color-scheme:light;--ink:#183236;--teal:#087565;--navy:#173a47;--line:#cbd8d3;--paper:#f6f3ec;--gold:#d9a23e}*{box-sizing:border-box}body{margin:0;background:var(--paper);color:var(--ink);font:16px/1.55 Segoe UI,Arial,sans-serif}header.cover{padding:48px max(24px,calc((100% - 980px)/2));background:linear-gradient(135deg,var(--navy),var(--teal));color:#fff}header.cover h1{max-width:14ch;margin:8px 0;font-size:clamp(40px,7vw,76px);line-height:.96}header.cover p{max-width:70ch}.meta{display:flex;gap:12px;flex-wrap:wrap;margin-top:20px}.meta span{border:1px solid rgba(255,255,255,.35);border-radius:999px;padding:7px 12px}.notice{max-width:980px;margin:24px auto 0;padding:16px 20px;border-left:6px solid var(--gold);background:#fff3d7}.section{max-width:980px;margin:40px auto;padding:0 20px}.section>h2{margin:0 0 8px;font-size:34px;line-height:1}.section>.intro{color:#52666a}.evidence,.activity,.module-response{break-inside:avoid;margin:16px 0;border:1px solid var(--line);border-radius:16px;background:#fff;overflow:hidden}.evidence header,.activity header{display:grid;gap:3px;padding:14px 18px;background:var(--navy);color:#fff}.evidence header span,.activity header span{font-size:12px;font-weight:800;letter-spacing:.08em;text-transform:uppercase}.evidence header strong,.activity header strong{font-size:21px}.prompt{margin:0;padding:14px 18px;background:#e5f2ed;font-weight:750}.response{min-height:54px;padding:16px 18px;white-space:pre-wrap}.status{margin:0;padding:9px 18px;border-top:1px solid var(--line);color:#52666a;font-size:13px;font-weight:800}.activity dl{margin:0}.answer-row{display:grid;grid-template-columns:minmax(190px,.42fr) minmax(0,1fr);border-bottom:1px solid var(--line)}.answer-row dt,.answer-row dd{margin:0;padding:11px 14px}.answer-row dt{background:#eef5f2;font-weight:750}.answer-row dd{white-space:pre-wrap}.activity figure{margin:18px}.activity figure img{display:block;max-width:100%;max-height:720px;margin:auto;border-radius:12px}.activity figcaption{text-align:center;color:#52666a}.module-response{padding:18px}.module-response h3{margin:0 0 10px}.module-response .prompt{margin:0 -18px}.empty{padding:16px 18px;color:#52666a}.footer{max-width:980px;margin:50px auto 0;padding:24px 20px 50px;border-top:1px solid var(--line);color:#52666a}@media(max-width:620px){.answer-row{grid-template-columns:1fr}.answer-row dt{padding-bottom:4px}.answer-row dd{padding-top:4px}}@media print{body{background:#fff}.cover{print-color-adjust:exact;-webkit-print-color-adjust:exact}.section{margin-top:24px}.evidence,.activity,.module-response{box-shadow:none}.activity{break-before:page}}
      </style></head><body><header class="cover"><p>YEAR 8 INTRO TIMBER TECHNOLOGY · FOOTSTOOL</p><h1>Student evidence submission</h1><p>One self-contained export from the device-local Footstool folio.</p><div class="meta"><span>${escapeHtml(state.student.name || 'Name not entered')}</span><span>${escapeHtml(state.student.className ? `Class ${state.student.className}` : 'Class not entered')}</span><span>Exported ${escapeHtml(exportedAt)}</span></div></header><aside class="notice"><strong>Submission boundary:</strong> this file was intentionally downloaded from browser-local work. It is not proof of cloud submission, a mark or an assessment result. Upload it only to the Google Classroom task identified by the teacher.</aside><main><section class="section"><h2>Twelve-card evidence folio</h2><p class="intro">Progressive evidence retained from the existing Footstool folio.</p>${cardHtml}</section><section class="section"><h2>Project activities</h2><p class="intro">Web activities mapped from the master 25-slide Footstool PowerPoint.</p>${activityHtml}</section><section class="section"><h2>Module written evidence</h2><p class="intro">Completed written responses found in the ten learning modules on this laptop.</p>${moduleHtml}</section></main><footer class="footer">Year 8 Intro Timber Technology · Footstool · Exported ${escapeHtml(exportedAt)}</footer></body></html>`;
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const link = document.createElement('a');
      const date = new Date().toISOString().slice(0, 10);
      link.href = URL.createObjectURL(blob);
      link.download = `footstool-submission-${exportSafeName()}-${date}.html`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(() => URL.revokeObjectURL(link.href), 1000);
      status.textContent = `Downloaded ${link.download}. Attach that single file to the Google Classroom task your teacher identifies.`;
    } catch (error) {
      status.textContent = `The submission file could not be created: ${error.message}. Your saved folio was not changed.`;
    }
  };

  const folioCards = document.getElementById('folio-cards');
  folioCards.innerHTML = cardGroups.map(renderCardGroup).join('');
  hydrateForm();

  const openCardFromHash = () => {
    const target = /^#card-\d{2}$/.test(window.location.hash) ? document.querySelector(window.location.hash) : null;
    if (!target) return;
    target.open = true;
  };

  let printMode = false;
  let printOpenCards = [];
  document.querySelectorAll('.folio-card').forEach(card => { card.open = true; });
  openCardFromHash();
  window.addEventListener('hashchange', openCardFromHash);

  document.getElementById('student-name').addEventListener('input', event => {
    state.student.name = event.target.value;
    updateProgress();
    queueSave();
  });
  document.getElementById('student-class').addEventListener('input', event => {
    state.student.className = event.target.value;
    updateProgress();
    queueSave();
  });
  folioCards.addEventListener('input', event => {
    const id = event.target.dataset.cardResponse || event.target.dataset.cardDate;
    if (!id) return;
    if (event.target.dataset.cardResponse) state.cards[id].response = event.target.value;
    if (event.target.dataset.cardDate) state.cards[id].date = event.target.value;
    updateProgress();
    queueSave();
  });
  folioCards.addEventListener('change', event => {
    const id = event.target.dataset.cardReady;
    if (!id) return;
    state.cards[id].ready = event.target.checked;
    updateProgress();
    queueSave();
  });
  document.getElementById('download-backup').addEventListener('click', downloadBackup);
  document.getElementById('restore-backup').addEventListener('change', restoreBackup);
  document.getElementById('reset-folio').addEventListener('click', resetFolio);
  document.getElementById('download-submission').addEventListener('click', downloadSubmission);
  const printFolio = () => {
    save();
    const missing = cards.length - cards.filter(card => isReady(state.cards[card.id])).length;
    if (missing && !window.confirm(`${missing} evidence card${missing === 1 ? ' is' : 's are'} not ready. The printout will identify incomplete cards. Print anyway?`)) return;
    window.print();
  };
  document.querySelectorAll('[data-print-folio], #print-folio').forEach(button => button.addEventListener('click', printFolio));
  window.addEventListener('beforeprint', () => {
    printMode = true;
    printOpenCards = [...document.querySelectorAll('.folio-card[open]')];
    document.querySelectorAll('.folio-card').forEach(card => { card.open = true; });
    updateProgress();
  });
  window.addEventListener('afterprint', () => {
    document.querySelectorAll('.folio-card').forEach(card => { card.open = printOpenCards.includes(card); });
    printMode = false;
  });
})();
