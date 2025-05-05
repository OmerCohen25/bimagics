// demo/feed.js
export const feedView = (() => {
  const section = document.createElement('section');
  section.className = 'view';  // mandatory class
  section.id = 'feed';
  section.innerHTML = `
    <article class="bi-card" data-aos="fade-up">
      <div class="card-content">
        <span class="kpi-big">$12.47&nbsp;M</span>
        <span class="kpi-small">Revenue · Last 12 M</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.2 K</span>
      </div>
    </article>

    <article class="bi-card" data-aos="fade-up" data-aos-delay="70">
      <div class="card-content">
        <h3 class="card-title">Revenue vs Target</h3>
        <div class="kpi-small">$1.48 M / $1.60 M</div>
        <div class="progress"><div style="width:92%"></div></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-star"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 860</span>
      </div>
    </article>

    <article class="bi-card" data-aos="fade-up" data-aos-delay="140">
      <div class="card-content">
        <h3 class="card-title">Sales by Region</h3>
        <div style="position:relative;height:200px;max-width:90%;margin:0 auto">
          <canvas id="regionPie"></canvas>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-share-square"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 2.1 K</span>
      </div>
    </article>

    <article class="bi-card" data-aos="fade-up" data-aos-delay="210">
      <div class="card-content">
        <h3 class="card-title">Daily Sign-ups</h3>
        <div style="position:relative;height:180px"><canvas id="trendLine"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-download"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.8 K</span>
      </div>
    </article>
  `;
  document.getElementById('views').appendChild(section);

  /* charts after DOM insert */
  const rnd = (m, n) => Math.floor(Math.random() * (n - m + 1)) + m;
  const common = {responsive:true,maintainAspectRatio:false,plugins:{legend
