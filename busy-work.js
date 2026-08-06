(() => {
  const activities = window.FOOTSTOOL_BUSY_ACTIVITIES || [];
  const grid = document.querySelector('#busy-activity-grid');
  const progress = document.querySelector('#busy-progress');

  const readState = (id) => {
    try {
      return JSON.parse(localStorage.getItem(`year8-footstool-busy:v2:${id}`) || '{}');
    } catch {
      return {};
    }
  };

  const completed = activities.filter((activity) => readState(activity.id).complete).length;
  progress.textContent = `${completed} of ${activities.length} activities have saved completion evidence on this device.`;

  grid.innerHTML = activities.map((activity, index) => {
    const state = readState(activity.id);
    const status = state.complete ? 'Complete on this device' : state.updatedAt ? 'Work saved' : 'Not started';
    const statusClass = state.complete ? 'is-complete' : state.updatedAt ? 'is-saved' : '';
    return `
      <article class="busy-card">
        <div class="busy-card-topline">
          <span>Activity ${String(index + 1).padStart(2, '0')}</span>
          <span class="busy-status ${statusClass}">${status}</span>
        </div>
        <p class="busy-mechanic">${activity.mechanic}</p>
        <h3>${activity.title}</h3>
        <p>${activity.summary}</p>
        <p class="busy-topic"><strong>Learning link:</strong> ${activity.topic}</p>
        <a class="button" href="busy/activity-${String(index + 1).padStart(2, '0')}.html">Open activity</a>
      </article>`;
  }).join('');

  document.querySelector('#print-busy-summary').addEventListener('click', () => window.print());
})();
