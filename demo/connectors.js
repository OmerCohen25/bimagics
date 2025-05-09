// FILE: demo/connectors.js
// BI Magics • Data view ⇢ Public Marketplace + User Data
// v2 – mobile‑friendly & “Open Chat” button (navigates to Chat pane)

/*────────────────────────  SOURCE ARRAYS  ───────────────────────*/
const PUBLIC_SOURCES = [
  { id:'yahoo',   img:'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png', name:'Yahoo Finance' },
  { id:'govil',   img:'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg', name:'DataGov Israel' },
  { id:'worldbk', img:'https://cdn-icons-png.flaticon.com/512/1674/1674291.png', name:'World Bank' },
  { id:'weather', img:'https://cdn-icons-png.flaticon.com/512/869/869869.png', name:'Weather Data' },
  { id:'un',      img:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png', name:'UN Statistics' }
];

const USER_SOURCES = [
  { id:'sheets', img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', name:'Google Sheets' },
  { id:'bq',     img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',          name:'BigQuery'      },
  { id:'excel',  img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png', name:'Upload Excel', upload:true },
  { id:'gi',     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s',   name:'Green Invoice' },
  { id:'jira',   img:'https://cdn.worldvectorlogo.com/logos/jira-1.svg',                           name:'Jira'          },
  { id:'sf',     img:'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',                     name:'Salesforce'    }
];

/*────────────────────────  ONE‑TIME STYLES  ─────────────────────*/
function injectStyles(){
  if(document.getElementById('connectors-style')) return;
  const css = /*css*/`
    .connectors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:18px;margin-top:20px;justify-items:center}

    .section-title{font-size:1.3rem;font-weight:700;margin:14px 0 6px}

    .connector{border-radius:16px;padding:18px 10px;text-align:center;width:100%;max-width:170px;transition:.25s;cursor:pointer;position:relative}
    .connector img{width:46px;height:46px;object-fit:contain;margin-bottom:10px}
    .connector-name{font-size:.9rem;font-weight:600;margin-bottom:8px}
    .connect-btn,.upload-label{font-size:.74rem;padding:6px 12px;border:none;border-radius:11px;font-weight:600}
    input[type=file]{display:none}

    /* public theme */
    .pub{background:#1b152a;box-shadow:0 0 10px rgba(214,170,255,.15)}
    .pub:hover{transform:translateY(-4px);background:#2d2043}
    .pub .connect-btn,.pub .upload-label{background:#d6aaff;color:#000}
    .pub .connect-btn:hover,.pub .upload-label:hover{background:#e6caff}

    /* user theme */
    .usr{background:#1a1c22;box-shadow:0 2px 6px rgba(0,0,0,.4)}
    .usr:hover{transform:translateY(-4px);background:#252831}
    .usr .connect-btn,.usr .upload-label{background:#74f2ce;color:#000}
    .usr .connect-btn:hover,.usr .upload-label:hover{background:#5ae6bb}

    /* connected */
    .connector.connected{animation:sparkle 1s ease forwards}
    .connector.connected .connect-btn,.connector.connected .upload-label{background:#33ff99;color:#000}
    .pub.connected{background:#391d5c!important;box-shadow:0 0 20px #d6aaff88}
    .usr.connected{background:#134d38!important;box-shadow:0 0 15px #33ff99aa}
    @keyframes sparkle{0%{box-shadow:0 0 6px currentColor}50%{box-shadow:0 0 30px currentColor,0 0 60px currentColor99}100%{box-shadow:0 0 18px currentColoraa}}

    /* modal */
    .modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:999}
    .modal.open{display:flex}
    .modal-content{background:#1f1f1f;border-radius:12px;padding:28px;text-align:center;max-width:360px;box-shadow:0 0 10px rgba(0,0,0,.7)}
    .modal-content h2{color:#74f2ce;margin-bottom:18px}
    .modal-content p{color:#ccc;margin-bottom:18px;font-size:.95rem}
    .modal-content button{background:#74f2ce;color:#000;border:none;border-radius:10px;padding:10px 22px;font-weight:600;cursor:pointer}

    /* chat btn */
    .start-chat-btn{margin:36px auto 0;display:flex;align-items:center;gap:10px;background:#555;border:none;color:#fff;font-size:1rem;font-weight:600;padding:14px 24px;border-radius:28px;opacity:.6;cursor:not-allowed;transition:.2s}
    .start-chat-btn img{width:20px;height:20px}
    .start-chat-btn.active{background:#00cfe6;cursor:pointer;box-shadow:0 0 20px #00cfe688;opacity:1}
    .start-chat-btn.active:hover{background:#00b8cc;box-shadow:0 0 24px #00cfe6aa}
  `;
  document.head.appendChild(Object.assign(document.createElement('style'),{id:'connectors-style',textContent:css}));
}

/*────────────────────────  MAIN RENDER  ─────────────────────*/
export function renderConnectView(){
  injectStyles();

  const section = document.createElement('section');
  section.className = 'view'; section.id = 'data';

  section.innerHTML = `
    <h2 class="view-title" data-aos="fade-up">📊 Data Sources</h2>
    <p class="description" data-aos="fade-up" data-aos-delay="40">
      Connect public datasets or your own business data – all in one place.
    </p>

    <h3 class="section-title" data-aos="fade-up" data-aos-delay="80">🌐 Public Data</h3>
    <div class="connectors-grid" id="pubGrid"  data-aos-delay="120"></div>

    <h3 class="section-title" data-aos="fade-up" data-aos-delay="150">🔐 Your Data</h3>
    <div class="connectors-grid" id="usrGrid"  data-aos-delay="190"></div>

    <button id="goChatBtn" class="start-chat-btn" title="Connect a source first">
      <img src="https://cdn-icons-png.flaticon.com/512/709/709496.png" alt="Chat icon">
      Open&nbsp;Chat
    </button>

    <div class="modal" id="authModal">
      <div class="modal-content">
        <h2 id="modal-title">Authorize</h2>
        <p>This demo wants to access your account. Approve access to continue.</p>
        <button id="modal-approve">Approve Access</button>
      </div>
    </div>`;

  /* refs */
  const pubGrid = section.querySelector('#pubGrid');
  const usrGrid = section.querySelector('#usrGrid');
  const authModal  = section.querySelector('#authModal');
  const modalTitle = section.querySelector('#modal-title');
  const approveBtn = section.querySelector('#modal-approve');
  const goChatBtn  = section.querySelector('#goChatBtn');

  /* helpers */
  const closeModal = ()=> authModal.classList.remove('open');
  const enableChat = ()=>{
    if(goChatBtn.classList.contains('active')) return;
    goChatBtn.classList.add('active');
    goChatBtn.onclick = (e)=>{
      e.preventDefault();
      if(window.demoNavButtons && window.demoNavButtons[1]) window.demoNavButtons[1].click();
    };
  };
  const markConnected = (card)=>{
    card.classList.add('connected');
    const c = card.querySelector('.connect-btn, .upload-label');
    if(c) c.textContent = 'Connected ✨';
    enableChat();
  };

  /* build cards */
  const makeCard = (src, theme, idx)=>{
    const card = document.createElement('div');
    card.className = `connector ${theme}`;
    card.dataset.aos = 'fade-up';
    card.dataset.aosDelay = idx*50;

    card.innerHTML = `
      <img src="${src.img}" alt="${src.name}">
      <div class="connector-name">${src.name}</div>
      ${src.upload ? `<label class="upload-label">Upload<input type="file" accept=".xlsx,.csv"></label>`
                   : `<button class="connect-btn">Connect</button>`}`;

    if(src.upload){
      card.querySelector('input').addEventListener('change',e=>{
        if(e.target.files[0]){
          const lbl = card.querySelector('.upload-label');
          lbl.textContent = `Uploaded: ${e.target.files[0].name.slice(0,15)}${e.target.files[0].name.length>15?'…':''}`;
          markConnected(card);
        }
      });
    } else {
      card.querySelector('.connect-btn').onclick = ()=>{
        modalTitle.textContent = `Authorize ${src.name}`;
        approveBtn.onclick = ()=>{ closeModal(); markConnected(card);} ;
        authModal.classList.add('open');
      };
    }
    return card;
  };

  PUBLIC_SOURCES.forEach((s,i)=>pubGrid.appendChild(makeCard(s,'pub',i)));
  USER_SOURCES  .forEach((s,i)=>usrGrid.appendChild(makeCard(s,'usr',i)));

  /* modal backdrop click */
  authModal.addEventListener('click',e=>{if(e.target===authModal) closeModal();});

  return section;
}
