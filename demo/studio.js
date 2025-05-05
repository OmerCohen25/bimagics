// demo/studio.js
export const studioView = (() => {
  const section=document.createElement('section');
  section.className='view';
  section.innerHTML=`
    <h2 style="text-align:center;margin-bottom:20px;font-size:18px" data-aos="fade-up">🛠️ BI Studio (Sneak Peek)</h2>
    <article class="bi-card" data-aos="fade-up" data-aos-delay="60">
      <div class="card-content">
        <h3 class="card-title">Drag-&-Drop Dashboard Builder</h3>
        <p class="kpi-small">Visual + Code − coming soon…</p>
        <div style="height:160px;display:flex;align-items:center;justify-content:center;opacity:.25">
          <i class="fa-solid fa-gear fa-3x fa-spin"></i>
        </div>
      </div>
      <div class="card-actions">
        <span class="views-count"><i class="fa-regular fa-eye"></i> Work in progress</span>
      </div>
    </article>
  `;
  document.getElementById('views').appendChild(section);
  return section;
})();
