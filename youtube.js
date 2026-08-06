(() => {
  const manifest = window.FOOTSTOOL_YOUTUBE_MANIFEST;
  const library = document.querySelector('#video-library');

  const escapeHtml = (value) => String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

  if (!manifest || !Array.isArray(manifest.clips)) {
    library.innerHTML = '<p class="activity-source-note">The validated video manifest could not be loaded. Use the course navigation to return home.</p>';
    return;
  }

  const groups = manifest.clips.reduce((result, clip) => {
    result[clip.group] = result[clip.group] || [];
    result[clip.group].push(clip);
    return result;
  }, {});

  const posterMarkup = (clip) => `
    <div class="video-poster">
      <img src="${clip.thumbnail}" alt="YouTube thumbnail for ${escapeHtml(clip.title)}" loading="lazy">
      <button class="video-play" type="button" data-play-video="${clip.id}" aria-label="Play ${escapeHtml(clip.title)}">
        <span>▶ Play video</span>
      </button>
    </div>`;

  library.innerHTML = Object.entries(groups).map(([group, clips]) => `
    <section class="video-topic-group" aria-labelledby="group-${escapeHtml(group).replaceAll(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}">
      <h2 id="group-${escapeHtml(group).replaceAll(/[^a-zA-Z0-9]+/g, '-').toLowerCase()}">${escapeHtml(group)}</h2>
      <p>${group.includes('Manufactured') ? 'Use this clip beside the manufactured-wood structure investigation.' : 'Use these clips beside the third-angle and isometric drawing sections.'}</p>
      <div class="video-grid">
        ${clips.map((clip) => `
          <article class="video-card" data-video-card="${clip.id}">
            <div data-video-stage="${clip.id}">${posterMarkup(clip)}</div>
            <div class="video-card-body">
              <p class="video-meta">${escapeHtml(clip.adjacentSection)}</p>
              <h3>${escapeHtml(clip.title)}</h3>
              <p><strong>${escapeHtml(clip.channel)}</strong></p>
              <p class="video-purpose">${escapeHtml(clip.purpose)}</p>
              <p class="video-watch-for"><strong>Watch for:</strong> ${escapeHtml(clip.watchFor)}</p>
              <a class="video-fallback" href="${clip.fallback}" target="_blank" rel="noopener">Open in YouTube ↗</a>
            </div>
          </article>`).join('')}
      </div>
    </section>`).join('');

  const playVideo = (id) => {
    const clip = manifest.clips.find((item) => item.id === id);
    const stage = document.querySelector(`[data-video-stage="${CSS.escape(id)}"]`);
    if (!clip || !stage) return;
    stage.innerHTML = `
      <div class="video-player">
        <button class="video-stop" type="button" data-stop-video="${clip.id}">Stop video</button>
        <iframe
          title="${escapeHtml(clip.title)}"
          src="${clip.embed}?autoplay=1&rel=0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen></iframe>
      </div>`;
    stage.querySelector('iframe').focus();
  };

  const stopVideo = (id) => {
    const clip = manifest.clips.find((item) => item.id === id);
    const stage = document.querySelector(`[data-video-stage="${CSS.escape(id)}"]`);
    if (!clip || !stage) return;
    stage.innerHTML = posterMarkup(clip);
    stage.querySelector('[data-play-video]').focus();
  };

  library.addEventListener('click', (event) => {
    const play = event.target.closest('[data-play-video]');
    const stop = event.target.closest('[data-stop-video]');
    if (play) playVideo(play.dataset.playVideo);
    if (stop) stopVideo(stop.dataset.stopVideo);
  });

  library.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const play = event.target.closest('[data-play-video]');
    const stop = event.target.closest('[data-stop-video]');
    if (!play && !stop) return;
    event.preventDefault();
    if (play) playVideo(play.dataset.playVideo);
    if (stop) stopVideo(stop.dataset.stopVideo);
  });
})();
