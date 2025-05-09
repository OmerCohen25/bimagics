// FILE: demo/connectors.js
// BI Magics – Data view (Your Data ➜ Public Data)  v3

/*────────────────  SOURCE LISTS  ────────────────*/
const USER_SOURCES = [
  { id:'sheets', img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', name:'Google Sheets' },
  { id:'bq',     img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',          name:'BigQuery' },
  { id:'excel',  img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png', name:'Upload Excel', upload:true },
  { id:'gi',     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s',  name:'Green Invoice' },
  { id:'jira',   img:'https://cdn.worldvectorlogo.com/logos/jira-1.svg',                           name:'Jira' },
  { id:'sf',     img:'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',                     name:'Salesforce' }
];

const PUBLIC_SOURCES = [
  { id:'yahoo',   img:'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png', name:'Yahoo Finance' },
  { id:'govil',   img:'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',   name:'DataGov Israel' },
  { id:'worldbk', img:'https://cdn-icons-png.flaticon.com/512/1674/1674291.png',          name:'World Bank' },
  { id:'weather', img:'https://cdn-icons-png.flaticon.com/512/869/869869.png',            name:'Weather Data' },
  { id:'un',      img:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',          name:'UN Statistics' }
];

/*────────────────  STYLE (אחיד)  ────────────────*/
function injectStyles() {
  if (document.getElementById('data-style')) return;
  const s = document.createElement('style');
  s.id = 'data-style';
  s.textContent = `
  .view#data { align-items: stretch; }                 /* שלא יהיה בטור אחד */
  .data-container { width:100%; max-width:900px; margin:0 auto; }
  `;
  document.head.appendChild(s);
}

/*────────────────  BUILD VIEW  ────────────────*/
export function renderConnectView() {
  injectStyles();

  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'data';

  section.innerHTML = `
    <div class="data-container">
      <h2 class="view-title" data-aos="fade-up">📊 Data Sources</h2>
      <p class="description" data-aos="fade-up" data-aos-delay="40">
        Connect your business data or enrich it with public datasets – then jump straight to Chat BI.
      </p>

      <h3 class="section-title" data-aos="fade-up" data-aos-delay="60">🔐 Your Data</h3>
      <div class="grid connectors-grid" id="userGrid"></div>

      <h3 class="section-title" data-aos="fade-up" data-aos-delay="120">🌐 Public Data</h3>
      <div class="grid connectors-grid" id="publicGrid"></div>

      <a id="openChatBtn" class="start-chat-btn">
        Open Chat
      </a>
    </div>

    <div class="modal" id="authModal">
      <div class="modal-content">
        <h2 id="modal-title">Authorize</h2>
        <p>This demo wants to access your account. Approve to continue.</p>
        <button id="modal-approve" class="connect-btn">Approve Access</button>
      </div>
    </div>
  `;

  /* ---------- REFS ---------- */
  const userGrid   = section.querySelector('#userGrid');
  const publicGrid = section.querySelector('#publicGrid');
  const openChat   = section.querySelector('#openChatBtn');
  const modal      = section.querySelector('#authModal');
  const modalTitle = section.querySelector('#modal-title');
  const modalOK    = section.querySelector('#modal-approve');

  /* ---------- HELPERS ---------- */
  const closeModal = () => modal.classList.remove('open');
  const enableChat = () => {
    if (!openChat.classList.contains('active')) {
      openChat.classList.add('active');
      openChat.onclick = () => window.demoNavButtons?.[1]?.click();
    }
  };
  function markConnected(card) {
    card.classList.add('connected');
    const ctrl = card.querySelector('.connect-btn, .upload-label');
    if (ctrl) ctrl.textContent = 'Connected ✨';
    enableChat();
  }

  /* ---------- FACTORY ---------- */
  function makeCard(obj, type, idx) {
    const card = document.createElement('div');
    card.className = `connector ${type}`;      /* type = 'usr' | 'pub'  */
    card.dataset.aos = 'fade-up';
    card.dataset.aosDelay = idx * 40;

    card.innerHTML = `
      <img src="${obj.img}" alt="${obj.name} logo">
      <div class="connector-name">${obj.name}</div>
      ${
        obj.upload
          ? `<label class="upload-label">Upload <input type="file" accept=".xlsx,.csv"></label>`
          : `<button class="connect-btn">Connect</button>`
      }`;

    /* interactions */
    if (obj.upload) {
      const fileInput = card.querySelector('input[type=file]');
      fileInput.onchange = (e) => {
        if (e.target.files[0]) {
          const lbl = card.querySelector('.upload-label');
          lbl.textContent = `Uploaded: ${e.target.files[0].name.slice(0,15)}${e.target.files[0].name.length>15?'…':''}`;
          markConnected(card);
        }
      };
    } else {
      const btn = card.querySelector('.connect-btn');
      btn.onclick = () => {
        modalTitle.textContent = `Authorize ${obj.name}`;
        modalOK.onclick = () => { closeModal(); markConnected(card); };
        modal.classList.add('open');
      };
    }
    return card;
  }

  /* ---------- RENDER ORDER: user ➜ public ---------- */
  USER_SOURCES  .forEach((o,i) => userGrid  .appendChild(makeCard(o,'usr', i)));
  PUBLIC_SOURCES.forEach((o,i) => publicGrid.appendChild(makeCard(o,'pub', i)));

  /* close modal on backdrop click */
  modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

  return section;
}
