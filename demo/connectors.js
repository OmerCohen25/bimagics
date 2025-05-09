// FILE: demo/connectors.js
// BI Magics  •  Data view   v3.2   (09-May-2025)
// – Your Data  + Public Data  • modal fixed to <body>  • “Open Chat” button

/* ─────  sources lists  ───── */
const USER_SOURCES = [
  { id:'sheets', img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', name:'Google Sheets' },
  { id:'bq',     img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',           name:'BigQuery' },
  { id:'excel',  img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png', name:'Upload Excel', upload:true },
  { id:'gi',     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s', name:'Green Invoice' },
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

/* inject a tiny extra style (only once) */
function injectOnce(){
  if(document.getElementById('data-view-style')) return;
  const st = document.createElement('style');
  st.id = 'data-view-style';
  st.textContent = `.view#data{align-items:stretch}.data-container{max-width:900px;margin:0 auto;width:100%}`;
  document.head.appendChild(st);
}

/* build single connector card */
function cardTemplate(o, kind, delay, connectHandler, modalHandler){
  const el = document.createElement('div');
  el.className = `connector ${kind}`;  // usr | pub
  el.dataset.aos = 'fade-up';
  el.dataset.aosDelay = delay;

  el.innerHTML = `
    <img src="${o.img}" alt="${o.name} logo">
    <div class="connector-name">${o.name}</div>
    ${
      o.upload
        ? `<label class="upload-label">Upload<input type="file" accept=".xlsx,.csv"></label>`
        : `<button class="connect-btn">Connect</button>`
    }`;

  /* upload flow */
  if(o.upload){
    el.querySelector('input[type=file]').onchange = e=>{
      const f = e.target.files?.[0];
      if(!f) return;
      el.querySelector('.upload-label').textContent =
        `Uploaded: ${f.name.slice(0,15)}${f.name.length>15?'…':''}`;
      connectHandler(el);
    };
  }else{ /* OAuth → modal */
    el.querySelector('.connect-btn').onclick = ()=>modalHandler(o.name, ()=>connectHandler(el));
  }
  return el;
}

/*  PUBLIC  – render function – used by index.html */
export function renderConnectView(){
  injectOnce();

  /* === markup === */
  const view = document.createElement('section');
  view.className = 'view'; view.id = 'data';
  view.innerHTML = `
    <div class="data-container">
      <h2 class="view-title" data-aos="fade-up">📊 Data Sources</h2>
      <p  class="description" data-aos="fade-up" data-aos-delay="40">
        Connect your private data or enrich it with public datasets – then jump straight to Chat BI.
      </p>

      <h3 class="section-title" data-aos="fade-up" data-aos-delay="60">🔐 Your Data</h3>
      <div class="grid connectors-grid" id="usrGrid"></div>

      <h3 class="section-title" data-aos="fade-up" data-aos-delay="120">🌐 Public Data</h3>
      <div class="grid connectors-grid" id="pubGrid"></div>

      <a id="openChatBtn" class="start-chat-btn" title="Connect a source to unlock">Open Chat</a>
    </div>

    <!-- modal is created dynamically below -->
  `;

  /* grids refs */
  const usrGrid = view.querySelector('#usrGrid');
  const pubGrid = view.querySelector('#pubGrid');
  const chatBtn = view.querySelector('#openChatBtn');

  /* === modal (appended to <body>, not inside carousel) === */
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
     <div class="modal-content">
       <h2 id="modal-title">Authorize</h2>
       <p>This demo wants to access your account. Approve to continue.</p>
       <button id="modal-approve" class="connect-btn">Approve Access</button>
     </div>`;
  document.body.appendChild(modal);            // ←  critical fix
  const mTitle   = modal.querySelector('#modal-title');
  const mApprove = modal.querySelector('#modal-approve');
  const closeModal = ()=>modal.classList.remove('open');
  modal.addEventListener('click',e=>{if(e.target===modal) closeModal();});

  /* helper – toggle chat button */
  const enableChat = ()=>{
    if(chatBtn.classList.contains('active')) return;
    chatBtn.classList.add('active');
    chatBtn.onclick = ()=>window.demoNavButtons?.[1]?.click();   // switch to Chat tab
  };

  /* mark as connected */
  const markConnected = card=>{
    if(card.classList.contains('connected')) return;
    card.classList.add('connected');
    const btn = card.querySelector('.connect-btn, .upload-label');
    if(btn) btn.textContent = 'Connected ✨';
    enableChat();
  };

  /* modal launcher */
  const openModal = (svc, afterOK)=>{
    mTitle.textContent = `Authorize ${svc}`;
    mApprove.onclick = ()=>{ closeModal(); afterOK(); };
    modal.classList.add('open');
  };

  /* === build cards === */
  USER_SOURCES  .forEach((o,i)=>usrGrid.appendChild(cardTemplate(o,'usr', i*40, markConnected, openModal)));
  PUBLIC_SOURCES.forEach((o,i)=>pubGrid.appendChild(cardTemplate(o,'pub', i*40, markConnected, openModal)));

  return view;
}
