// FILE: demo/connectors.js
// BI Magics  •  Data view  (🔐 Your Data → 🌐 Public Data) v3.1
// • גריד רספונסיבי  • אינטראקציה Connected ✨  • כפתור Open Chat

/* ─────  רשימות המקורות  ───── */
const USER_SOURCES = [
  { id:'sheets', img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', name:'Google Sheets' },
  { id:'bq',     img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',           name:'BigQuery' },
  { id:'excel',  img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png',  name:'Upload Excel', upload:true },
  { id:'gi',     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s',  name:'Green Invoice' },
  { id:'jira',   img:'https://cdn.worldvectorlogo.com/logos/jira-1.svg',                            name:'Jira' },
  { id:'sf',     img:'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',                      name:'Salesforce' }
];

const PUBLIC_SOURCES = [
  { id:'yahoo',   img:'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png',           name:'Yahoo Finance' },
  { id:'govil',   img:'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',     name:'DataGov Israel' },
  { id:'worldbk', img:'https://cdn-icons-png.flaticon.com/512/1674/1674291.png',                    name:'World Bank' },
  { id:'weather', img:'https://cdn-icons-png.flaticon.com/512/869/869869.png',                      name:'Weather Data' },
  { id:'un',      img:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',                    name:'UN Statistics' }
];

/* ─────  תוסף סגנון נקודתי (אחד)  ───── */
function injectDataViewStyles(){
  if(document.getElementById('data-view-style')) return;
  const s = document.createElement('style');
  s.id = 'data-view-style';
  s.textContent = `
    .view#data{align-items:stretch}
    .data-container{width:100%;max-width:900px;margin:0 auto}
  `;
  document.head.appendChild(s);
}

/* ─────  יצירת כרטיס מקור  ───── */
function makeCard(obj, type, idx, markConnected, openModal){
  const card = document.createElement('div');
  card.className = `connector ${type}`;       /* usr | pub */
  card.dataset.aos = 'fade-up';
  card.dataset.aosDelay = idx*40;

  card.innerHTML = `
    <img src="${obj.img}" alt="${obj.name} logo">
    <div class="connector-name">${obj.name}</div>
    ${
      obj.upload
        ? `<label class="upload-label">Upload
             <input type="file" accept=".xlsx,.csv">
           </label>`
        : `<button class="connect-btn">Connect</button>`
    }
  `;

  /* Upload */
  if(obj.upload){
    card.querySelector('input[type=file]').onchange = e=>{
      if(e.target.files[0]){
        card.querySelector('.upload-label').textContent =
          `Uploaded: ${e.target.files[0].name.slice(0,15)}${e.target.files[0].name.length>15?'…':''}`;
        markConnected(card);
      }
    };
  }else{ /* OAuth modal → Connected */
    card.querySelector('.connect-btn').onclick = ()=>openModal(obj.name, ()=>markConnected(card));
  }
  return card;
}

/* ─────  יצירת ה-View  ───── */
export function renderConnectView(){
  injectDataViewStyles();

  const view = document.createElement('section');
  view.className = 'view';
  view.id = 'data';

  view.innerHTML = `
    <div class="data-container">
      <h2 class="view-title" data-aos="fade-up">📊 Data Sources</h2>
      <p  class="description" data-aos="fade-up" data-aos-delay="40">
        Connect your business data or enrich it with public datasets – then jump straight to Chat BI.
      </p>

      <h3 class="section-title" data-aos="fade-up" data-aos-delay="60">🔐 Your Data</h3>
      <div class="grid connectors-grid" id="usrGrid"></div>

      <h3 class="section-title" data-aos="fade-up" data-aos-delay="120">🌐 Public Data</h3>
      <div class="grid connectors-grid" id="pubGrid"></div>

      <a id="openChatBtn" class="start-chat-btn" title="Connect a source to unlock">Open Chat</a>
    </div>

    <div class="modal" id="authModal">
      <div class="modal-content">
        <h2 id="modal-title">Authorize</h2>
        <p>This demo wants to access your account. Approve to continue.</p>
        <button id="modal-approve" class="connect-btn">Approve Access</button>
      </div>
    </div>
  `;

  /* ----- refs ----- */
  const usrGrid  = view.querySelector('#usrGrid');
  const pubGrid  = view.querySelector('#pubGrid');
  const chatBtn  = view.querySelector('#openChatBtn');
  const modal    = view.querySelector('#authModal');
  const mTitle   = view.querySelector('#modal-title');
  const mOK      = view.querySelector('#modal-approve');

  /* ----- helpers ----- */
  const closeModal = ()=>modal.classList.remove('open');
  const enableChat = ()=>{
    if(!chatBtn.classList.contains('active')){
      chatBtn.classList.add('active');
      chatBtn.onclick = ()=>window.demoNavButtons?.[1]?.click();
    }
  };
  const markConnected = card=>{
    if(card.classList.contains('connected')) return;
    card.classList.add('connected');
    const c = card.querySelector('.connect-btn, .upload-label');
    if(c) c.textContent = 'Connected ✨';
    enableChat();
  };
  const openModal = (service, onApprove)=>{
    mTitle.textContent = `Authorize ${service}`;
    mOK.onclick = ()=>{ closeModal(); onApprove(); };
    modal.classList.add('open');
  };

  /* ----- build grids ----- */
  USER_SOURCES  .forEach((o,i)=>usrGrid.appendChild (makeCard(o,'usr', i, markConnected, openModal)));
  PUBLIC_SOURCES.forEach((o,i)=>pubGrid.appendChild(makeCard(o,'pub', i, markConnected, openModal)));

  /* modal backdrop click */
  modal.onclick = e=>{ if(e.target === modal) closeModal(); };

  return view;
}
