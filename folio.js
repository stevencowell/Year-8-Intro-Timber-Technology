(() => {
  'use strict';

  const STORAGE_KEY = 'footstool-y8:v1:folio';
  const LEGACY_KEY = 'year8-footstool-folio-v1';
  const SCHEMA = 'footstool-y8-folio-backup-v1';
  const MIN_RESPONSE_LENGTH = 20;

  const cards = [
    {
      id: '01', module: 1, weeks: '1–2', title: 'Starting point',
      action: 'Record what you already know and set one achievable learning goal.',
      starter: 'At the start I already know … My goal is …',
      visual: { type: 'kwl' },
      caption: 'A starting point helps you notice how your understanding changes.'
    },
    {
      id: '02', module: 1, weeks: '1–2', title: 'Workshop readiness',
      action: 'Explain two actions you will take to keep your workshop area safe.',
      starter: 'I will … because … If I am unsure, I will …',
      visual: { type: 'image', src: 'assets/reference/hierarchy-of-controls.jpg', alt: 'Hierarchy of controls diagram ordered from elimination to personal protective equipment.', href: 'assets/reference/hierarchy-of-controls.jpg', link: 'Open source visual larger' },
      caption: 'Controls reduce risk in different ways. Current workshop procedures and teacher directions still control practical work.'
    },
    {
      id: '03', module: 2, weeks: '3–4', title: 'Tool communication',
      action: 'Name one teacher-approved tool and explain its broad purpose.',
      starter: 'The tool is called … Its broad purpose is … Before using it, I need …',
      visual: { type: 'image', src: 'assets/reference/combination-square.jpg', alt: 'A combination square with a metal rule and adjustable square head.', href: 'assets/reference/combination-square.jpg', link: 'Open tool visual larger' },
      caption: 'Use the approved tool name and a broad purpose. Do not invent an operating procedure.'
    },
    {
      id: '04', module: 3, weeks: '5–6', title: 'Timber language',
      action: 'Describe a timber sample using grain, density and knot vocabulary.',
      starter: 'The grain appears … The sample feels … for its size. I can see …',
      visual: { type: 'image', src: 'assets/reference/radiata-pine-mdf-comparison.png', alt: 'Visual comparison of a solid radiata pine sample with visible grain and knot beside a uniform MDF sample.', href: 'assets/reference/radiata-pine-mdf-comparison.png', link: 'Open material visual larger' },
      caption: 'Look for visible grain and surface character. The comparison does not assign a material to a project component.'
    },
    {
      id: '05', module: 4, weeks: '7–8', title: 'Board investigation',
      action: 'Compare one manufactured wood product with solid timber using evidence.',
      starter: 'The manufactured product uses … Solid timber differs because … This structure suits …',
      visual: { type: 'wood-forms' },
      caption: 'Manufactured products may use veneers, strands, fibres or particles arranged and bonded in controlled ways.'
    },
    {
      id: '06', module: 5, weeks: '9–10', title: 'Plan reading',
      action: 'Explain how written dimensions and related views help you read the original plan.',
      starter: 'The written dimensions tell me … The related views help me … If a detail is unclear, I will …',
      visual: { type: 'image', src: 'assets/plan-page-1.png', alt: 'Preview of page one of the original Wagga High School Foot Stool working drawing.', href: 'assets/resources/Footstool.pdf', link: 'Open original plan larger (PDF, 2 pages)' },
      caption: 'Use the unchanged original PDF. Read written dimensions; do not measure the screen preview.'
    },
    {
      id: '07', module: 6, weeks: '11–12', title: 'Drawing communication',
      action: 'Compare what third-angle and isometric drawings communicate.',
      starter: 'Third-angle drawing communicates … Isometric drawing communicates … Both are useful because …',
      visual: { type: 'image', src: 'assets/plan-page-2.png', alt: 'Preview of page two of the original Wagga High School Foot Stool working drawing, showing related views.', href: 'assets/resources/Footstool.pdf', link: 'Open original plan larger (PDF, 2 pages)' },
      caption: 'Related views communicate different faces and features. Use the original plan for project-specific detail.'
    },
    {
      id: '08', module: 7, weeks: '13–14', title: 'Emblem concepts',
      action: 'Describe three distinct emblem ideas you developed before choosing one.',
      starter: 'Idea 1 explores … Idea 2 explores … Idea 3 explores …',
      visual: { type: 'image', src: 'assets/emblem-development-example.png', alt: 'Course worksheet excerpt showing explore, experiment and arrange stages for developing three emblem ideas.', href: 'assets/emblem-development-example.png', link: 'Open emblem worksheet larger' },
      caption: 'Explore, experiment and arrange ideas before selecting a concept. Any later process remains teacher-controlled.'
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
      caption: 'Record what you observed and checked. The original plan, current procedures and teacher directions control practical work.',
      date: true
    },
    {
      id: '11', module: 9, weeks: '17–18', title: 'Function review',
      action: 'Evaluate one functional quality using an observation or approved test as evidence.',
      starter: 'The product is … because I observed … A realistic improvement would be …',
      visual: { type: 'function' },
      caption: 'Useful evaluation links a functional criterion to evidence and a realistic improvement.'
    },
    {
      id: '12', module: 10, weeks: '19–20', title: 'Aesthetic review',
      action: 'Evaluate two visual qualities and identify one improvement.',
      starter: 'The appearance shows … and … This is evident because … I would improve …',
      visual: { type: 'aesthetic' },
      caption: 'Use precise visual vocabulary such as balance, contrast, emphasis, form, pattern or texture.'
    }
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
    version: 1,
    student: { name: '', className: '' },
    cards: Object.fromEntries(cards.map(card => [card.id, { response: '', ready: false, date: '' }])),
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
    next.updatedAt = typeof source.updatedAt === 'string' ? source.updatedAt : '';
    return next;
  };

  const stored = safeParse(localStorage.getItem(STORAGE_KEY));
  const legacy = safeParse(localStorage.getItem(LEGACY_KEY));
  let state = normaliseState(stored || legacy);
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
    if (visual.type === 'image') {
      return `<figure class="card-visual card-image"><img src="${visual.src}" alt="${escapeHtml(visual.alt)}"><figcaption>${escapeHtml(card.caption)} <a href="${visual.href}" target="_blank" rel="noopener">${escapeHtml(visual.link)}</a></figcaption></figure>`;
    }
    const diagrams = {
      kwl: '<div class="visual-diagram kwl-diagram" role="img" aria-label="A path from what I know, through what I want to learn, to what I learned"><span>Know</span><b aria-hidden="true">→</b><span>Want to learn</span><b aria-hidden="true">→</b><span>Learned</span></div>',
      'wood-forms': '<div class="visual-diagram wood-forms" role="img" aria-label="Four labelled forms used in manufactured wood products"><span>Veneers</span><span>Strands</span><span>Fibres</span><span>Particles</span></div>',
      choice: '<div class="visual-diagram choice-diagram" role="img" aria-label="Three concept boxes narrowing to one justified selection"><div><span>Idea 1</span><span>Idea 2</span><span>Idea 3</span></div><b aria-hidden="true">↓ compare ↓</b><strong>Selected idea + reason</strong></div>',
      quality: '<div class="visual-diagram quality-diagram" role="img" aria-label="A repeating evidence cycle: observe, act, next step"><span>Observe</span><b aria-hidden="true">→</b><span>Act</span><b aria-hidden="true">→</b><span>Next step</span></div>',
      function: '<div class="visual-diagram word-diagram function-diagram" role="img" aria-label="Functional evaluation vocabulary: durable, reliable, stable, ergonomic, efficient and economical"><span>Durable</span><span>Reliable</span><span>Stable</span><span>Ergonomic</span><span>Efficient</span><span>Economical</span></div>',
      aesthetic: '<div class="visual-diagram word-diagram aesthetic-diagram" role="img" aria-label="Aesthetic evaluation vocabulary: balance, contrast, emphasis, form, pattern and texture"><span>Balance</span><span>Contrast</span><span>Emphasis</span><span>Form</span><span>Pattern</span><span>Texture</span></div>'
    };
    return `<figure class="card-visual card-diagram">${diagrams[visual.type]}<figcaption>${escapeHtml(card.caption)}</figcaption></figure>`;
  };

  const renderCard = card => {
    const dateField = card.date ? `<label class="date-field" for="card-${card.id}-date">Date of this observation<input id="card-${card.id}-date" type="date" data-card-date="${card.id}"></label>` : '';
    return `<article class="folio-card" id="card-${card.id}" data-card="${card.id}">
      <div class="print-card-heading"><span>Year 8 Intro Timber Technology · Footstool evidence folio</span><span class="print-student"></span></div>
      <header class="card-heading">
        <div class="card-number" aria-hidden="true">${card.id}</div>
        <div><p class="card-module">Module ${card.module} · Weeks ${card.weeks}</p><h3>${escapeHtml(card.title)}</h3></div>
        <span class="card-status" data-card-status="${card.id}">In progress</span>
      </header>
      ${renderVisual(card)}
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
    </article>`;
  };

  const isMeaningful = item => item.response.trim().length >= MIN_RESPONSE_LENGTH;
  const isReady = item => item.ready && isMeaningful(item);

  const save = () => {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
    if (!window.confirm('Reset all twelve folio cards and student details on this device? Module work and other course activity will not be changed.')) return;
    state = blankState();
    localStorage.removeItem(STORAGE_KEY);
    hydrateForm();
    document.getElementById('save-state').textContent = 'Folio reset on this device.';
    document.getElementById('backup-status').textContent = 'Only this folio was reset.';
  };

  document.getElementById('folio-cards').innerHTML = cards.map(renderCard).join('');
  hydrateForm();

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
  document.getElementById('folio-cards').addEventListener('input', event => {
    const id = event.target.dataset.cardResponse || event.target.dataset.cardDate;
    if (!id) return;
    if (event.target.dataset.cardResponse) state.cards[id].response = event.target.value;
    if (event.target.dataset.cardDate) state.cards[id].date = event.target.value;
    updateProgress();
    queueSave();
  });
  document.getElementById('folio-cards').addEventListener('change', event => {
    const id = event.target.dataset.cardReady;
    if (!id) return;
    state.cards[id].ready = event.target.checked;
    updateProgress();
    queueSave();
  });
  document.getElementById('download-backup').addEventListener('click', downloadBackup);
  document.getElementById('restore-backup').addEventListener('change', restoreBackup);
  document.getElementById('reset-folio').addEventListener('click', resetFolio);
  document.getElementById('print-folio').addEventListener('click', () => {
    save();
    const missing = cards.length - cards.filter(card => isReady(state.cards[card.id])).length;
    if (missing && !window.confirm(`${missing} evidence card${missing === 1 ? ' is' : 's are'} not ready. The printout will identify incomplete cards. Print anyway?`)) return;
    window.print();
  });
  window.addEventListener('beforeprint', updateProgress);
})();
