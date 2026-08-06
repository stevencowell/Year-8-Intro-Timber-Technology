(() => {
  const activityId = document.body.dataset.activity;
  const activities = window.FOOTSTOOL_BUSY_ACTIVITIES || [];
  const activity = activities.find((item) => item.id === activityId);
  const app = document.querySelector('#activity-app');
  const storageKey = `year8-footstool-busy:v2:${activityId}`;
  const studentKey = 'year8-footstool-busy:v2:student';

  const readJson = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch {
      return {};
    }
  };

  const state = readJson(storageKey);
  state.answers = state.answers || {};
  const student = readJson(studentKey);

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  const save = () => {
    state.updatedAt = new Date().toISOString();
    localStorage.setItem(storageKey, JSON.stringify(state));
    localStorage.setItem(studentKey, JSON.stringify(student));
    const saved = document.querySelector('#save-status');
    if (saved) saved.textContent = `Saved on this device at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`;
  };

  const setComplete = (complete) => {
    state.complete = Boolean(complete);
    save();
    const badge = document.querySelector('#completion-badge');
    if (badge) {
      badge.textContent = state.complete ? 'Complete on this device' : 'In progress';
      badge.classList.toggle('is-complete', state.complete);
    }
  };

  const setFeedback = (message, kind = 'info') => {
    const feedback = document.querySelector('#activity-feedback');
    if (!feedback) return;
    feedback.textContent = message;
    feedback.dataset.kind = kind;
    feedback.focus();
  };

  const selectOptions = (options, selected = '') => `
    <option value="">Choose…</option>
    ${options.map((option) => `<option value="${escapeHtml(option)}"${selected === option ? ' selected' : ''}>${escapeHtml(option)}</option>`).join('')}`;

  const bindSavedInput = (selector, target = state.answers) => {
    document.querySelectorAll(selector).forEach((element) => {
      const key = element.dataset.key;
      if (target[key] !== undefined) element.value = target[key];
      element.addEventListener('input', () => {
        target[key] = element.value;
        save();
      });
      element.addEventListener('change', () => {
        target[key] = element.value;
        save();
      });
    });
  };

  const commonStart = () => {
    const index = activities.findIndex((item) => item.id === activityId);
    const previous = index > 0 ? `activity-${String(index).padStart(2, '0')}.html` : '../busy-work.html';
    const next = index < activities.length - 1 ? `activity-${String(index + 2).padStart(2, '0')}.html` : '../busy-work.html';
    document.title = `${activity.title} | Footstool Busy Work`;
    app.innerHTML = `
      <section class="activity-hero">
        <div>
          <p class="eyebrow">ACTIVITY ${activity.id} · ${escapeHtml(activity.mechanic).toUpperCase()}</p>
          <h1>${escapeHtml(activity.title)}</h1>
          <p class="lede">${escapeHtml(activity.summary)}</p>
          <p class="busy-topic"><strong>Learning link:</strong> ${escapeHtml(activity.topic)}</p>
        </div>
        <div class="activity-status-panel">
          <span id="completion-badge" class="busy-status ${state.complete ? 'is-complete' : ''}">${state.complete ? 'Complete on this device' : 'In progress'}</span>
          <p id="save-status">${state.updatedAt ? 'Saved work restored from this device.' : 'No saved work yet.'}</p>
        </div>
      </section>

      <section class="student-details" aria-labelledby="student-details-heading">
        <div>
          <p class="eyebrow">STUDENT DETAILS</p>
          <h2 id="student-details-heading">Name your evidence</h2>
        </div>
        <label>Student name<input id="student-name" autocomplete="name" value="${escapeHtml(student.name || '')}"></label>
        <label>Class<input id="student-class" value="${escapeHtml(student.className || '')}"></label>
      </section>

      <section class="activity-work" aria-labelledby="activity-work-heading">
        <div class="activity-source-note"><strong>Source boundary:</strong> ${escapeHtml(activity.sourceNote)}</div>
        <div id="activity-work-content"></div>
        <p id="activity-feedback" class="activity-feedback" data-kind="info" tabindex="-1" aria-live="polite">Complete the activity, then use its check or save control.</p>
      </section>

      <section class="activity-actions" aria-label="Activity actions">
        <a class="button secondary" href="${previous}">← Previous</a>
        <a class="button secondary" href="../busy-work.html">All Busy Work</a>
        <button class="button" id="print-activity" type="button">Print / Save PDF</button>
        <a class="button secondary" href="${next}">Next →</a>
      </section>`;

    document.querySelector('#student-name').addEventListener('input', (event) => {
      student.name = event.target.value;
      save();
    });
    document.querySelector('#student-class').addEventListener('input', (event) => {
      student.className = event.target.value;
      save();
    });
    document.querySelector('#print-activity').addEventListener('click', () => window.print());
  };

  const renderBranch = () => {
    const content = document.querySelector('#activity-work-content');
    const branch = state.answers.branch || { step: 0, resolved: [] };
    state.answers.branch = branch;
    const routeFinished = branch.step >= activity.scenarios.length;
    const completedSteps = branch.resolved.map((step, index) => `<li>Decision ${index + 1}: safe route reached</li>`).join('');

    content.innerHTML = `
      <div class="route-progress" aria-label="Route progress"><span style="width:${Math.min(100, (branch.step / activity.scenarios.length) * 100)}%"></span></div>
      <p><strong>Safe route progress:</strong> ${branch.step} of ${activity.scenarios.length} decisions resolved.</p>
      ${completedSteps ? `<ol class="resolved-route">${completedSteps}</ol>` : ''}
      ${routeFinished ? `
        <div class="evidence-panel">
          <h2 id="activity-work-heading">Route complete: explain the safety principle</h2>
          <label for="branch-reflection">Why is stopping and asking better than guessing or rushing?</label>
          <textarea id="branch-reflection" data-key="reflection" rows="5">${escapeHtml(state.answers.reflection || '')}</textarea>
          <button class="button" id="save-branch-evidence" type="button">Save completion evidence</button>
        </div>` : `
        <div class="decision-panel">
          <p class="eyebrow">DECISION ${branch.step + 1}</p>
          <h2 id="activity-work-heading">${escapeHtml(activity.scenarios[branch.step].prompt)}</h2>
          <div class="decision-options">
            ${activity.scenarios[branch.step].options.map((option, index) => `<button type="button" data-branch-choice="${index}">${escapeHtml(option)}</button>`).join('')}
          </div>
        </div>`}`;

    if (routeFinished) {
      document.querySelector('#branch-reflection').addEventListener('input', (event) => {
        state.answers.reflection = event.target.value;
        save();
      });
      document.querySelector('#save-branch-evidence').addEventListener('click', () => {
        if ((state.answers.reflection || '').trim().length < 20) {
          setComplete(false);
          setFeedback('Add a specific explanation before marking the evidence complete.', 'needs-work');
          return;
        }
        setComplete(true);
        setFeedback('Safe route completed. Your explanation is saved as evidence; it has not been automatically judged as a written answer.', 'success');
      });
      return;
    }

    document.querySelectorAll('[data-branch-choice]').forEach((button) => {
      button.addEventListener('click', () => {
        const scenario = activity.scenarios[branch.step];
        const choice = Number(button.dataset.branchChoice);
        if (choice !== scenario.answer) {
          const hintIndex = choice < scenario.answer ? choice : choice - 1;
          setComplete(false);
          setFeedback(scenario.hints[hintIndex] || 'That route is not safe. Re-read the precise safety section and try again.', 'needs-work');
          return;
        }
        branch.resolved[branch.step] = { choice, correct: true };
        branch.step += 1;
        save();
        renderBranch();
        setFeedback(scenario.correct, 'success');
      });
    });
  };

  const renderImageMatch = () => {
    const content = document.querySelector('#activity-work-content');
    const answers = state.answers;
    content.innerHTML = `
      <h2 id="activity-work-heading">Identify first, then match each purpose</h2>
      <div class="image-identification">
        <figure>
          <img src="${activity.image}" alt="${escapeHtml(activity.imageAlt)}">
          <figcaption>Verified source-library photograph. Recognition only; practical use requires teacher instruction.</figcaption>
        </figure>
        <fieldset>
          <legend>${escapeHtml(activity.identify.prompt)}</legend>
          ${activity.identify.options.map((option, index) => `<label class="choice-row"><input type="radio" name="identify" value="${index}"${Number(answers.identify) === index ? ' checked' : ''}> <span>${escapeHtml(option)}</span></label>`).join('')}
        </fieldset>
      </div>
      <div class="match-table" role="group" aria-label="Tool purpose matching">
        ${activity.matches.map((item, index) => `
          <label><span>${escapeHtml(item.tool)}</span>
            <select data-key="match-${index}">${selectOptions(activity.purposeOptions, answers[`match-${index}`])}</select>
          </label>`).join('')}
      </div>
      <button class="button" id="check-image-match" type="button">Check identification and matches</button>`;

    document.querySelectorAll('input[name="identify"]').forEach((input) => input.addEventListener('change', () => {
      answers.identify = input.value;
      save();
    }));
    bindSavedInput('select[data-key]');
    document.querySelector('#check-image-match').addEventListener('click', () => {
      const identifyCorrect = Number(answers.identify) === activity.identify.answer;
      const matchesCorrect = activity.matches.every((item, index) => answers[`match-${index}`] === item.answer);
      setComplete(identifyCorrect && matchesCorrect);
      setFeedback(
        identifyCorrect && matchesCorrect
          ? 'All recognition and purpose matches are accurate.'
          : 'Some items need revision. Revisit “Tool recognition and purpose”; no practical-operation permission is implied.',
        identifyCorrect && matchesCorrect ? 'success' : 'needs-work'
      );
    });
  };

  const renderSelectRows = ({ heading, rows, labelKey, options, keyPrefix, checkId, success, needsWork }) => {
    const content = document.querySelector('#activity-work-content');
    content.innerHTML = `
      <h2 id="activity-work-heading">${escapeHtml(heading)}</h2>
      <div class="classification-list">
        ${rows.map((item, index) => `
          <label>
            <span>${escapeHtml(item[labelKey])}</span>
            <select data-key="${keyPrefix}-${index}">${selectOptions(options, state.answers[`${keyPrefix}-${index}`])}</select>
          </label>`).join('')}
      </div>
      <button class="button" id="${checkId}" type="button">Check all responses</button>`;
    bindSavedInput('select[data-key]');
    document.querySelector(`#${checkId}`).addEventListener('click', () => {
      const correct = rows.every((item, index) => state.answers[`${keyPrefix}-${index}`] === item.answer);
      setComplete(correct);
      setFeedback(correct ? success : needsWork, correct ? 'success' : 'needs-work');
    });
  };

  const renderPlanReader = () => {
    const content = document.querySelector('#activity-work-content');
    content.innerHTML = `
      <h2 id="activity-work-heading">Read the original drawing, not a guessed substitute</h2>
      <div class="plan-reader-layout">
        <figure>
          <a href="${activity.pdf}" target="_blank" rel="noopener" aria-label="Open the original two-page Footstool plan in a new tab">
            <img src="${activity.image}" alt="Preview of page 1 of the Footstool working drawing. Use the original PDF for written dimensions.">
          </a>
          <figcaption>Page 1 preview. Do not measure the screen image or use it as an independent dimensional source.</figcaption>
          <a class="button secondary" href="${activity.pdf}" target="_blank" rel="noopener">Open original plan (PDF, 2 pages)</a>
        </figure>
        <div>
          <div class="classification-list">
            ${activity.statements.map((item, index) => `
              <label><span>${escapeHtml(item.label)}</span>
                <select data-key="view-${index}">${selectOptions(['View from above', 'View from the front', 'View from the right side'], state.answers[`view-${index}`])}</select>
              </label>`).join('')}
            <label><span>Which information controls exact size?</span>
              <select data-key="dimension-authority">${selectOptions(['A ruler measurement taken from the screen preview', 'Written dimensions on the original PDF', 'A remembered number from another page'], state.answers['dimension-authority'])}</select>
            </label>
          </div>
          <label for="plan-note">Evidence note: explain why measuring a screen preview is unreliable.</label>
          <textarea id="plan-note" data-key="plan-note" rows="5">${escapeHtml(state.answers['plan-note'] || '')}</textarea>
          <button class="button" id="check-plan-reader" type="button">Check plan-reading evidence</button>
        </div>
      </div>`;
    bindSavedInput('select[data-key], textarea[data-key]');
    document.querySelector('#check-plan-reader').addEventListener('click', () => {
      const matches = activity.statements.every((item, index) => state.answers[`view-${index}`] === item.answer);
      const authority = state.answers['dimension-authority'] === 'Written dimensions on the original PDF';
      const noteReady = (state.answers['plan-note'] || '').trim().length >= 20;
      setComplete(matches && authority && noteReady);
      if (!matches || !authority) {
        setFeedback('A plan match or source-authority choice needs revision. Re-read “Drawing views and labels” and “Cross-checking the original plan”.', 'needs-work');
      } else if (!noteReady) {
        setFeedback('The closed plan-reading items are accurate. Add a specific evidence note before completion.', 'needs-work');
      } else {
        setFeedback('The plan-reading matches are accurate. Your written note is saved as evidence and is not automatically marked correct.', 'success');
      }
    });
  };

  const renderDecisionMatrix = () => {
    const content = document.querySelector('#activity-work-content');
    const conceptNames = ['Concept 1', 'Concept 2', 'Concept 3'];
    content.innerHTML = `
      <h2 id="activity-work-heading">Compare three distinct concepts</h2>
      <p>Use a 1–5 judgement for each criterion. The totals organise your evidence; they do not make the design decision for you.</p>
      <div class="decision-matrix-wrap">
        <table class="decision-matrix">
          <thead><tr><th scope="col">Criterion</th>${conceptNames.map((name, index) => `<th scope="col"><label>${name}<input data-key="concept-name-${index}" value="${escapeHtml(state.answers[`concept-name-${index}`] || '')}" placeholder="Short concept name"></label></th>`).join('')}</tr></thead>
          <tbody>
            ${activity.criteria.map((criterion, criterionIndex) => `<tr><th scope="row">${escapeHtml(criterion)}</th>${conceptNames.map((_, conceptIndex) => `<td><label class="sr-only" for="score-${criterionIndex}-${conceptIndex}">${criterion}, Concept ${conceptIndex + 1}</label><select id="score-${criterionIndex}-${conceptIndex}" data-score data-key="score-${criterionIndex}-${conceptIndex}">${selectOptions(['1', '2', '3', '4', '5'], state.answers[`score-${criterionIndex}-${conceptIndex}`])}</select></td>`).join('')}</tr>`).join('')}
          </tbody>
          <tfoot><tr><th scope="row">Evidence total</th>${conceptNames.map((_, index) => `<td><output id="total-${index}">0</output></td>`).join('')}</tr></tfoot>
        </table>
      </div>
      <div class="evidence-panel">
        <label>Concept selected<select data-key="selected-concept">${selectOptions(conceptNames, state.answers['selected-concept'])}</select></label>
        <label>Reasoned choice and one refinement<textarea data-key="decision-reason" rows="5">${escapeHtml(state.answers['decision-reason'] || '')}</textarea></label>
        <button class="button" id="save-decision-matrix" type="button">Save decision evidence</button>
      </div>`;

    const updateTotals = () => {
      conceptNames.forEach((_, conceptIndex) => {
        const total = activity.criteria.reduce((sum, __, criterionIndex) => sum + Number(state.answers[`score-${criterionIndex}-${conceptIndex}`] || 0), 0);
        document.querySelector(`#total-${conceptIndex}`).textContent = total;
      });
    };
    bindSavedInput('[data-key]');
    document.querySelectorAll('[data-score]').forEach((select) => select.addEventListener('change', updateTotals));
    updateTotals();
    document.querySelector('#save-decision-matrix').addEventListener('click', () => {
      const namesReady = conceptNames.every((_, index) => (state.answers[`concept-name-${index}`] || '').trim());
      const scoresReady = activity.criteria.every((_, criterionIndex) => conceptNames.every((__, conceptIndex) => state.answers[`score-${criterionIndex}-${conceptIndex}`]));
      const choiceReady = state.answers['selected-concept'];
      const reasonReady = (state.answers['decision-reason'] || '').trim().length >= 20;
      const ready = namesReady && scoresReady && choiceReady && reasonReady;
      setComplete(ready);
      setFeedback(
        ready
          ? 'Decision evidence saved. The totals support comparison; your design choice and written reasoning are not automatically marked correct.'
          : 'Complete three concept names, every rating, a selected concept and a specific reason before saving completion evidence.',
        ready ? 'success' : 'needs-work'
      );
    });
  };

  const renderEvidenceLog = () => {
    const content = document.querySelector('#activity-work-content');
    content.innerHTML = `
      <h2 id="activity-work-heading">Record evidence from real practical work</h2>
      <p>Only record a row after the work or observation has actually happened. Do not invent a making step.</p>
      <div class="evidence-log-wrap">
        <table class="evidence-log">
          <thead><tr><th>Date</th><th>Observation</th><th>Action actually taken</th><th>Teacher-directed next step</th></tr></thead>
          <tbody>${Array.from({ length: activity.rows }, (_, index) => `<tr>
            <td><label class="sr-only" for="log-date-${index}">Row ${index + 1} date</label><input id="log-date-${index}" type="date" data-key="log-${index}-date"></td>
            <td><label class="sr-only" for="log-observation-${index}">Row ${index + 1} observation</label><textarea id="log-observation-${index}" data-key="log-${index}-observation" rows="3"></textarea></td>
            <td><label class="sr-only" for="log-action-${index}">Row ${index + 1} action</label><textarea id="log-action-${index}" data-key="log-${index}-action" rows="3"></textarea></td>
            <td><label class="sr-only" for="log-next-${index}">Row ${index + 1} next step</label><textarea id="log-next-${index}" data-key="log-${index}-next" rows="3"></textarea></td>
          </tr>`).join('')}</tbody>
        </table>
      </div>
      <button class="button" id="save-evidence-log" type="button">Save evidence-log completion</button>`;
    bindSavedInput('[data-key]');
    document.querySelector('#save-evidence-log').addEventListener('click', () => {
      const completeRows = Array.from({ length: activity.rows }, (_, index) => ['date', 'observation', 'action', 'next'].every((field) => (state.answers[`log-${index}-${field}`] || '').trim())).filter(Boolean).length;
      const ready = completeRows >= 1;
      setComplete(ready);
      setFeedback(
        ready
          ? `${completeRows} complete evidence row${completeRows === 1 ? '' : 's'} saved. This records completion only; the observations are not automatically marked correct.`
          : 'Complete at least one full row from real practical work before marking the log complete.',
        ready ? 'success' : 'needs-work'
      );
    });
  };

  const renderEvidenceClaims = () => {
    const content = document.querySelector('#activity-work-content');
    content.innerHTML = `
      <h2 id="activity-work-heading">Sort the claims, then build one of your own</h2>
      <div class="classification-list">
        ${activity.claims.map((claim, index) => `<label><span>${escapeHtml(claim.text)}</span><select data-key="claim-${index}">${selectOptions(activity.categories, state.answers[`claim-${index}`])}</select></label>`).join('')}
      </div>
      <div class="evidence-builder">
        <label>Function criterion<textarea data-key="function-criterion" rows="2">${escapeHtml(state.answers['function-criterion'] || '')}</textarea></label>
        <label>Observation or test evidence<textarea data-key="function-evidence" rows="3">${escapeHtml(state.answers['function-evidence'] || '')}</textarea></label>
        <label>Realistic improvement<textarea data-key="function-improvement" rows="3">${escapeHtml(state.answers['function-improvement'] || '')}</textarea></label>
      </div>
      <button class="button" id="check-evidence-claims" type="button">Check claims and save evidence</button>`;
    bindSavedInput('[data-key]');
    document.querySelector('#check-evidence-claims').addEventListener('click', () => {
      const claimsCorrect = activity.claims.every((claim, index) => state.answers[`claim-${index}`] === claim.answer);
      const writtenReady = ['function-criterion', 'function-evidence', 'function-improvement'].every((key) => (state.answers[key] || '').trim().length >= 10);
      setComplete(claimsCorrect && writtenReady);
      if (!claimsCorrect) {
        setFeedback('At least one claim is misclassified. Revisit “Testing with evidence” and look for a criterion plus an observable result.', 'needs-work');
      } else if (!writtenReady) {
        setFeedback('The claim sort is accurate. Add a specific criterion, observed evidence and improvement before completion.', 'needs-work');
      } else {
        setFeedback('The claim sort is accurate. Your own evaluation evidence is saved and is not automatically marked correct.', 'success');
      }
    });
  };

  const buildCrosswordGrid = () => {
    const cells = new Map();
    activity.entries.forEach((entry) => {
      [...entry.answer].forEach((letter, index) => {
        const row = entry.row + (entry.direction === 'down' ? index : 0);
        const col = entry.col + (entry.direction === 'across' ? index : 0);
        const key = `${row}-${col}`;
        const existing = cells.get(key);
        if (existing && existing.letter !== letter) throw new Error(`Crossword conflict at ${key}`);
        cells.set(key, { letter, row, col, number: index === 0 ? entry.number : existing?.number });
      });
    });
    const maxRow = Math.max(...[...cells.values()].map((cell) => cell.row));
    const maxCol = Math.max(...[...cells.values()].map((cell) => cell.col));
    const correctEntries = new Set(state.answers.correctEntries || []);
    let html = `<div class="crossword-grid" style="--rows:${maxRow + 1};--cols:${maxCol + 1}" role="img" aria-label="Crossword grid. Correct answers appear at their intersecting positions.">`;
    for (let row = 0; row <= maxRow; row += 1) {
      for (let col = 0; col <= maxCol; col += 1) {
        const cell = cells.get(`${row}-${col}`);
        if (!cell) {
          html += '<span class="crossword-cell is-block" aria-hidden="true"></span>';
          continue;
        }
        const revealed = activity.entries.some((entry) => correctEntries.has(entry.number) && [...entry.answer].some((_, index) => (entry.row + (entry.direction === 'down' ? index : 0)) === row && (entry.col + (entry.direction === 'across' ? index : 0)) === col));
        html += `<span class="crossword-cell">${cell.number ? `<small>${cell.number}</small>` : ''}${revealed ? cell.letter : ''}</span>`;
      }
    }
    return `${html}</div>`;
  };

  const renderCrossword = () => {
    const content = document.querySelector('#activity-work-content');
    content.innerHTML = `
      <h2 id="activity-work-heading">Use the clues and intersections</h2>
      <div class="crossword-layout">
        ${buildCrosswordGrid()}
        <div class="crossword-clues">
          ${activity.entries.map((entry) => `<label><span><strong>${entry.number} ${entry.direction}.</strong> ${escapeHtml(entry.clue)}</span><input data-key="crossword-${entry.number}" autocomplete="off" value="${escapeHtml(state.answers[`crossword-${entry.number}`] || '')}"></label>`).join('')}
        </div>
      </div>
      <label>Use one solved term in an aesthetic evaluation sentence.<textarea data-key="crossword-sentence" rows="4">${escapeHtml(state.answers['crossword-sentence'] || '')}</textarea></label>
      <button class="button" id="check-crossword" type="button">Check crossword</button>`;
    bindSavedInput('[data-key]');
    document.querySelector('#check-crossword').addEventListener('click', () => {
      const correctEntries = activity.entries.filter((entry) => (state.answers[`crossword-${entry.number}`] || '').trim().toUpperCase() === entry.answer).map((entry) => entry.number);
      state.answers.correctEntries = correctEntries;
      const puzzleComplete = correctEntries.length === activity.entries.length;
      const sentenceReady = (state.answers['crossword-sentence'] || '').trim().length >= 15;
      setComplete(puzzleComplete && sentenceReady);
      save();
      renderCrossword();
      setFeedback(
        puzzleComplete && sentenceReady
          ? 'All intersecting terms are correct. Your evaluation sentence is saved as evidence and is not automatically marked correct.'
          : puzzleComplete
            ? 'The crossword is correct. Add a specific evaluation sentence to complete the evidence.'
            : `${correctEntries.length} of ${activity.entries.length} entries are correct. Correct words now appear in the intersections; revisit the aesthetics vocabulary for the remaining clues.`,
        puzzleComplete && sentenceReady ? 'success' : 'needs-work'
      );
    });
  };

  if (!activity) {
    app.innerHTML = '<section class="activity-work"><h1>Activity not found</h1><p><a href="../busy-work.html">Return to Busy Work</a></p></section>';
    return;
  }

  commonStart();

  switch (activity.type) {
    case 'branch':
      renderBranch();
      break;
    case 'imageMatch':
      renderImageMatch();
      break;
    case 'sort':
      renderSelectRows({
        heading: 'Classify every source description',
        rows: activity.items,
        labelKey: 'text',
        options: activity.categories,
        keyPrefix: 'sort',
        checkId: 'check-sort',
        success: 'Every description is classified accurately.',
        needsWork: 'At least one classification needs revision. Revisit the precise timber-property section and try again.'
      });
      break;
    case 'match':
      renderSelectRows({
        heading: 'Match product name to internal structure',
        rows: activity.items,
        labelKey: 'term',
        options: activity.options,
        keyPrefix: 'match',
        checkId: 'check-match',
        success: 'Every product-to-structure match is accurate.',
        needsWork: 'At least one structure match needs revision. Revisit “Product structures” and try again.'
      });
      break;
    case 'planReader':
      renderPlanReader();
      break;
    case 'viewMatrix':
      renderSelectRows({
        heading: 'Choose the view that provides the required information',
        rows: activity.rows,
        labelKey: 'need',
        options: activity.options,
        keyPrefix: 'view-matrix',
        checkId: 'check-view-matrix',
        success: 'Every communication need is matched accurately.',
        needsWork: 'At least one view relationship needs revision. Revisit “Third-angle projection” and “Isometric communication”.'
      });
      break;
    case 'decisionMatrix':
      renderDecisionMatrix();
      break;
    case 'evidenceLog':
      renderEvidenceLog();
      break;
    case 'evidenceClaims':
      renderEvidenceClaims();
      break;
    case 'crossword':
      renderCrossword();
      break;
    default:
      document.querySelector('#activity-work-content').textContent = 'This activity is not available.';
  }
})();
