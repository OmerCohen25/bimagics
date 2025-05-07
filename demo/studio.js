// demo/studio.js

export function renderStudioView() {
  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'studio';

  section.innerHTML = `
    <h2 class="view-title" data-aos="fade-up">🛠️ BI Studio (Sneak Peek)</h2>
    <article class="bi-card" data-aos="fade-up" data-aos-delay="100">
      <div class="card-content">
        <h3 class="card-title">Drag-&-Drop Dashboard Builder</h3>
        <p class="card-description">The BI Studio will empower you to visually construct and customize dashboards with ease. Connect data, choose visualizations, and gain insights faster than ever.</p>
        <div class="studio-placeholder">
          <i class="fa-solid fa-gear fa-3x fa-spin" style="color: var(--accent);"></i>
        </div>
         <p class="card-description" style="text-align:center; margin-top: 20px;">Visual Builder + Code Mode – <strong>Coming Soon…</strong></p>
      </div>
      <div class="card-actions">
        <div class="action-buttons-group">
             </div>
        <span class="views-count"><i class="fa-regular fa-eye"></i> Work in Progress</span>
      </div>
    </article>
  `;
  return section;
}
