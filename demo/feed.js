// 📁 demo/feed.js  –  FULL Magic Feed (24 כרטיסים + גרפים + אינטראקציות)

export const feedView = (() => {
  /* 1.  HTML  */
  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'feed';

  section.innerHTML = `
  <main class="feed">

    <!-- 01 KPI --------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up">
      <div class="card-content">
        <span class="kpi-big">$ 12,473,920</span>
        <span class="kpi-small">Total Revenue · Last 12 M</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.9 K</span>
      </div>
    </article>

    <!-- 02 Score-card --------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="40">
      <div class="card-content">
        <h3 class="card-title">Monthly Revenue vs Target</h3>
        <div class="kpi-small">$1.48 M / $1.60 M</div>
        <div class="progress"><div style="width:92%"></div></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-star"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 870</span>
      </div>
    </article>

    <!-- 03 Score-card --------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="80">
      <div class="card-content">
        <h3 class="card-title">Active Users vs Competitor</h3>
        <div class="kpi-small">157 K vs 142 K</div>
        <div class="progress"><div style="width:110%"></div></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-share-square"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.4 K</span>
      </div>
    </article>

    <!-- 04 Line --------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="120" data-chart="revenueLine">
      <div class="card-content">
        <h3 class="card-title">Revenue Trend</h3>
        <div style="position:relative;height:220px"><canvas id="revenueLine"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn code"><i class="fa-solid fa-code"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 2.3 K</span>
      </div>
      <pre class="code-block">// SELECT month, revenue FROM finance.revenue_12m …</pre>
    </article>

    <!-- 05 Pie ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="160" data-chart="regionPie">
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

    <!-- 06 Bar ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="200" data-chart="productBar">
      <div class="card-content">
        <h3 class="card-title">Top Products</h3>
        <div style="position:relative;height:220px"><canvas id="productBar"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-download"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 980</span>
      </div>
    </article>

    <!-- 07 Table -------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="240">
      <div class="card-content">
        <h3 class="card-title">Top Customers</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Customer</th><th>Country</th><th>Spend ($)</th></tr></thead>
            <tbody>
              <tr><td>Acme Corp</td><td>USA</td><td>1,200,000</td></tr>
              <tr><td>Globex</td><td>Canada</td><td>985,500</td></tr>
              <tr><td>Initech</td><td>UK</td><td>873,000</td></tr>
              <tr><td>Umbrella</td><td>Germany</td><td>712,400</td></tr>
              <tr><td>Stark Industries</td><td>USA</td><td>598,900</td></tr>
              <tr><td>Wayne Enterprises</td><td>Israel</td><td>547,100</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-ellipsis"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 650</span>
      </div>
    </article>

    <!-- 08 KPI ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="280">
      <div class="card-content">
        <span class="kpi-big">157,332</span>
        <span class="kpi-small">Monthly Active Users</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.1 K</span>
      </div>
    </article>

    <!-- 09 Doughnut ----------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="320" data-chart="deviceDoughnut">
      <div class="card-content">
        <h3 class="card-title">Device Distribution</h3>
        <div style="position:relative;height:200px;max-width:90%;margin:0 auto">
          <canvas id="deviceDoughnut"></canvas>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-share-square"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 740</span>
      </div>
    </article>

    <!-- 10 Bar ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="360" data-chart="trafficBar">
      <div class="card-content">
        <h3 class="card-title">Traffic Sources</h3>
        <div style="position:relative;height:220px"><canvas id="trafficBar"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-download"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 920</span>
      </div>
    </article>

    <!-- 11 KPI ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="400">
      <div class="card-content">
        <span class="kpi-big">3.8 %</span>
        <span class="kpi-small">Monthly Churn</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 530</span>
      </div>
    </article>

    <!-- 12 Table -------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="440">
      <div class="card-content">
        <h3 class="card-title">Data Quality Alerts</h3>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Timestamp</th><th>Source</th><th>Anomaly</th></tr></thead>
            <tbody>
              <tr><td>2025-05-03 04:12</td><td>bq.orders</td><td>Spike in refunds</td></tr>
              <tr><td>2025-05-02 14:55</td><td>sf.opportunities</td><td>Missing owner_id</td></tr>
              <tr><td>2025-05-01 21:30</td><td>sheet.marketing</td><td>Negative amount</td></tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-circle-exclamation"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 410</span>
      </div>
    </article>

    <!-- 13 Radar -------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="480" data-chart="kpiRadar">
      <div class="card-content">
        <h3 class="card-title">KPIs vs Target</h3>
        <div style="position:relative;height:240px"><canvas id="kpiRadar"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-magnifying-glass-chart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.0 K</span>
      </div>
    </article>

    <!-- 14 KPI ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="520">
      <div class="card-content">
        <span class="kpi-big">72</span>
        <span class="kpi-small">Net Promoter Score</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 780</span>
      </div>
    </article>

    <!-- 15 Line Forecast ----------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="560" data-chart="forecastLine">
      <div class="card-content">
        <h3 class="card-title">Revenue Forecast</h3>
        <div style="position:relative;height:220px"><canvas id="forecastLine"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-chart-line"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 1.2 K</span>
      </div>
    </article>

    <!-- 16 Pie Marketing ------------------------------------------------ -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="600" data-chart="marketingPie">
      <div class="card-content">
        <h3 class="card-title">Marketing Spend</h3>
        <div style="position:relative;height:200px;max-width:90%;margin:0 auto">
          <canvas id="marketingPie"></canvas>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-share-square"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 690</span>
      </div>
    </article>

    <!-- 17 KPI ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="640">
      <div class="card-content">
        <span class="kpi-big">$ 1,628</span>
        <span class="kpi-small">Customer LTV</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 540</span>
      </div>
    </article>

    <!-- 18 Line Sign-ups ------------------------------------------------ -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="680" data-chart="signupsLine">
      <div class="card-content">
        <h3 class="card-title">Daily Sign-ups</h3>
        <div style="position:relative;height:200px"><canvas id="signupsLine"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-download"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 820</span>
      </div>
    </article>

    <!-- 19 Bar Expense -------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="720" data-chart="expenseBar">
      <div class="card-content">
        <h3 class="card-title">Expenses vs Budget</h3>
        <div style="position:relative;height:220px"><canvas id="expenseBar"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-dollar-sign"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 630</span>
      </div>
    </article>

    <!-- 20 Pie Tickets -------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="760" data-chart="ticketsPie">
      <div class="card-content">
        <h3 class="card-title">Ticket Categories</h3>
        <div style="position:relative;height:200px;max-width:90%;margin:0 auto">
          <canvas id="ticketsPie"></canvas>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-share-square"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 550</span>
      </div>
    </article>

    <!-- 21 Radar Team --------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="800" data-chart="teamRadar">
      <div class="card-content">
        <h3 class="card-title">Team Performance</h3>
        <div style="position:relative;height:240px"><canvas id="teamRadar"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-magnifying-glass-chart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 920</span>
      </div>
    </article>

    <!-- 22 Doughnut Plans ---------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="840" data-chart="planDoughnut">
      <div class="card-content">
        <h3 class="card-title">Subscription Mix</h3>
        <div style="position:relative;height:200px;max-width:90%;margin:0 auto">
          <canvas id="planDoughnut"></canvas>
        </div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-regular fa-share-square"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 480</span>
      </div>
    </article>

    <!-- 23 KPI ---------------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="880">
      <div class="card-content">
        <span class="kpi-big">1.32 s</span>
        <span class="kpi-small">Avg Page Load</span>
      </div>
      <div class="card-actions">
        <button class="icon-btn like"><i class="fa-regular fa-heart"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 390</span>
      </div>
    </article>

    <!-- 24 Bar Bugs ----------------------------------------------------- -->
    <article class="bi-card" data-aos="fade-up" data-aos-delay="920" data-chart="bugsBar">
      <div class="card-content">
        <h3 class="card-title">Bug Severity</h3>
        <div style="position:relative;height:220px"><canvas id="bugsBar"></canvas></div>
      </div>
      <div class="card-actions">
        <button class="icon-btn"><i class="fa-solid fa-bug"></i></button>
        <span class="views-count"><i class="fa-regular fa-eye"></i> 310</span>
      </div>
    </article>

  </main>
  `;

  document.getElementById('views').appendChild(section);

  /* 2.  CHARTS  ------------------------------------------------------ */
  const rnd  = (m,n)=>Math.floor(Math.random()*(n-m+1))+m;
  const ctx  = id=>document.getElementById(id)?.getContext('2d');
  const mons = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];

  const loader = {
    revenueLine :()=> new Chart(ctx('revenueLine'),{type:'line',
      data:{labels:mons,datasets:[{data:mons.map(()=>rnd(800,1700)),tension:.35,fill:true,
         borderColor:'var(--accent)',backgroundColor:'rgba(110,238,158,.08)',pointRadius:0}]},
      options:{plugins:{legend:{display:false}},scales:{y:{grid:{color:'#2c2c38'}}}}}),
    regionPie   :()=> new Chart(ctx('regionPie'),{type:'pie',
      data:{labels:['N-America','EMEA','APAC','LATAM'],datasets:[{data:[38,26,22,14]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    productBar  :()=> new Chart(ctx('productBar'),{type:'bar',
      data:{labels:['Gizmo X','Widget Pro','Bolt Mini','Nano S','Giga Pack'],
            datasets:[{data:Array.from({length:5},()=>rnd(600,1200))}]},
      options:{plugins:{legend:{display:false}},indexAxis:'y'}}),
    deviceDoughnut:()=> new Chart(ctx('deviceDoughnut'),{type:'doughnut',
      data:{labels:['Mobile','Desktop','Tablet'],datasets:[{data:[62,29,9]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    trafficBar  :()=> new Chart(ctx('trafficBar'),{type:'bar',
      data:{labels:['Organic','Paid','Referral','Social','Email'],
        datasets:[{data:Array.from({length:5},()=>rnd(150,400))}]},
      options:{plugins:{legend:{display:false}}}}),
    kpiRadar    :()=> new Chart(ctx('kpiRadar'),{type:'radar',
      data:{labels:['Revenue','Users','Conversion','Retention','NPS'],
        datasets:[{label:'Actual',data:[88,75,64,71,72],fill:true},
                  {label:'Target',data:[100,80,70,75,80],borderDash:[6,3]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    forecastLine:()=> new Chart(ctx('forecastLine'),{type:'line',
      data:{labels:['May','Jun','Jul','Aug','Sep','Oct'],
        datasets:[{data:[1.24,1.32,1.38,1.45,1.51,1.58].map(v=>v*1e6),
                  borderDash:[4,4],tension:.35}]},
      options:{plugins:{legend:{display:false}}}}),
    marketingPie:()=> new Chart(ctx('marketingPie'),{type:'pie',
      data:{labels:['Search','Social','Influencer','Email','Display'],
        datasets:[{data:[34,27,18,13,8]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    signupsLine :()=> new Chart(ctx('signupsLine'),{type:'line',
      data:{labels:Array.from({length:30},(_,i)=>i+1),
        datasets:[{data:Array.from({length:30},()=>rnd(120,430)),fill:true,tension:.3,
          borderColor:'var(--accent)',backgroundColor:'rgba(110,238,158,.08)',pointRadius:0}]},
      options:{plugins:{legend:{display:false}}}}),
    expenseBar  :()=> new Chart(ctx('expenseBar'),{type:'bar',
      data:{labels:['R&D','Marketing','Sales','Ops','HR'],
        datasets:[{label:'Budget',data:[200,180,150,120,80]},
                  {label:'Actual',data:[210,195,137,128,95]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    ticketsPie  :()=> new Chart(ctx('ticketsPie'),{type:'pie',
      data:{labels:['Bug','Feature','Question','Incident'],datasets:[{data:[48,24,18,10]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    teamRadar   :()=> new Chart(ctx('teamRadar'),{type:'radar',
      data:{labels:['Delivery','Quality','Velocity','Collab','Innovation'],
        datasets:[{label:'Team A',data:[80,85,72,88,70],fill:true},
                  {label:'Team B',data:[68,78,75,70,66]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    planDoughnut:()=> new Chart(ctx('planDoughnut'),{type:'doughnut',
      data:{labels:['Pro','Growth','Enterprise'],datasets:[{data:[56,31,13]}]},
      options:{plugins:{legend:{position:'bottom'}}}}),
    bugsBar     :()=> new Chart(ctx('bugsBar'),{type:'bar',
      data:{labels:['Critical','High','Medium','Low'],datasets:[{data:[12,28,46,38]}]},
      options:{plugins:{legend:{display:false}},indexAxis:'y'}})
  };

  /* 3.  Lazy-load charts when card in view --------------------------- */
  const io = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const card=entry.target;
      if(card.dataset.loaded) return;
      card.dataset.loaded='1';
      const id = card.dataset.chart;
      if(id && loader[id]) loader[id]();
    });
  },{rootMargin:'0px 0px 200px 0px',threshold:.15});
  section.querySelectorAll('.bi-card[data-chart]').forEach(c=>io.observe(c));

  /* 4.  Like + Code toggle ------------------------------------------- */
  section.addEventListener('click',e=>{
    const like=e.target.closest('.icon-btn.like');
    if(like){
      like.classList.toggle('liked');
      const icon=like.querySelector('i');
      icon.classList.toggle('fa-solid');
      icon.classList.toggle('fa-regular');
    }
    const codeBtn=e.target.closest('.icon-btn.code');
    if(codeBtn){
      const blk=codeBtn.closest('.bi-card').querySelector('.code-block');
      if(blk) blk.style.display=blk.style.display==='block'?'none':'block';
    }
  });

  /* 5.  Swipe to save/remove ----------------------------------------- */
  let swipe,startX; 
  section.addEventListener('pointerdown',e=>{
    swipe=e.target.closest('.bi-card'); if(!swipe) return;
    startX=e.clientX; swipe.style.transition='none';
  },true);
  section.addEventListener('pointermove',e=>{
    if(!swipe) return;
    const dx=e.clientX-startX;
    swipe.style.transform=`translateX(${dx}px) rotate(${dx/40}deg)`;
  },true);
  section.addEventListener('pointerup',e=>{
    if(!swipe) return;
    const dx=e.clientX-startX; const thr=80;
    swipe.style.transition='transform .3s';
    if(dx>thr){ // save
      swipe.style.transform='translateX(100vw)';
      setTimeout(()=>{swipe.style.transform='none';swipe.parentElement.prepend(swipe);},300);
    }else if(dx<-thr){ // delete
      swipe.style.transform='translateX(-100vw)';
      setTimeout(()=>swipe.remove(),300);
    }else swipe.style.transform='none';
    swipe=null;
  },true);

  /* 6.  Refresh AOS so new nodes animate ----------------------------- */
  if(window.AOS && AOS.refreshHard) setTimeout(()=>AOS.refreshHard(),50);

  return section;
})();
