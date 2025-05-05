// demo/connectors.js
export const connectorsView = (() => {
  const section = document.createElement('section');
  section.className = 'view';
  section.innerHTML = `
    <h2 style="text-align:center;margin-bottom:20px;font-size:18px" data-aos="fade-up">🔌 Connectors</h2>
    <div class="grid" data-aos="fade-up" data-aos-delay="60">
      ${[
        {name:'BigQuery',state:'Connected ✅'},
        {name:'Google Sheets',state:'Connect in 1-click'},
        {name:'Snowflake',state:'Beta'},
        {name:'Salesforce',state:'Coming soon'},
        {name:'Databricks',state:'New!'},
        {name:'HubSpot',state:'Available'}
      ].map(c=>`
        <div class="bi-card"><div class="card-content">
          <h3 class="card-title">${c.name}</h3><p class="kpi-small">${c.state}</p>
        </div></div>
      `).join('')}
    </div>
  `;
  document.getElementById('views').appendChild(section);
  return section;
})();
