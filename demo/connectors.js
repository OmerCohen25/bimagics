// FILE: demo/connectors.js
// BI Magics • Data connectors view  – Public marketplace  +  User sources

/*──────────────────────  DATA ARRAYS  ──────────────────────*/
const publicSources = [
  { id:'yahoo', img:'https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png',   name:'Yahoo Finance'   },
  { id:'govil', img:'https://upload.wikimedia.org/wikipedia/commons/d/d4/Flag_of_Israel.svg',    name:'DataGov Israel' },
  { id:'worldbank', img:'https://cdn-icons-png.flaticon.com/512/1674/1674291.png',       name:'World Bank'      },
  { id:'weather', img:'https://cdn-icons-png.flaticon.com/512/869/869869.png',           name:'Weather Data'    },
  { id:'un',     img:'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',          name:'UN Statistics'   }
];

const userSources = [
  { id:'sheets', img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', name:'Google Sheets' },
  { id:'bq',     img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',          name:'BigQuery'      },
  { id:'excel',  img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png', name:'Upload Excel', upload:true },
  { id:'gi',     img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s', name:'Green Invoice' },
  { id:'jira',   img:'https://cdn.worldvectorlogo.com/logos/jira-1.svg',                           name:'Jira'          },
  { id:'sf',     img:'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',                     name:'Salesforce'    }
];

/*──────────────────────  ONE-TIME STYLES  ──────────────────────*/
function injectStyles () {
  if (document.getElementById('connect-style')) return;
  const css = /*css*/`
    /* —— grids —— */
    .connectors-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
                     gap:20px;justify-items:center;margin-top:20px}
    .section-title{font-size:1.35rem;font-weight:700;margin:12px 0 6px}
    /* —— card base —— */
    .connector{border-radius:16px;padding:20px 10px;text-align:center;width:100%;max-width:180px;
               transition:.25s;cursor:pointer;position:relative}
    .connector img{width:48px;height:48px;object-fit:contain;margin-bottom:10px}
    .connector-name{font-size:.95rem;font-weight:600;margin-bottom:8px}
    .connect-btn,.upload-label{font-size:.75rem;padding:6px 12px;border:none;border-radius:12px;font-weight:600}
    input[type=file]{display:none}
    /* —— PUBLIC (purple) —— */
    .public.connector{background:#1b152a;box-shadow:0 0 10px rgba(214,170,255,.15)}
    .public.connector:hover{transform:translateY(-4px);background:#2d2043}
    .public .connect-btn,.public .upload-label{background:#d6aaff;color:#000}
    .public .connect-btn:hover,.public .upload-label:hover{background:#e6caff}
    .public.connected{background:#391d5c!important;box-shadow:0 0 20px #d6aaff88}
    .public.connected .connect-btn,.public.connected .upload-label{background:#b972ff}
    /* —— USER (green) —— */
    .user.connector{background:#1a1c22;box-shadow:0 2px 6px rgba(0,0,0,.4)}
    .user.connector:hover{transform:translateY(-4px);background:#252831}
    .user .connect-btn,.user .upload-label{background:#74f2ce;color:#000}
    .user .connect-btn:hover,.user .upload-label:hover{background:#5ae6bb}
    .user.connected{background:#134d38!important;box-shadow:0 0 15px #33ff99aa}
    .user.connected .connect-btn,.user.connected .upload-label{background:#33ff99}
    /* —— shared sparkle —— */
    @keyframes sparkle{0%{box-shadow:0 0 6px currentColor}
      50%{box-shadow:0 0 28px currentColor,0 0 56px currentColor99}
      100%{box-shadow:0 0 20px currentColoraa}}
    .connector.connected{animation:sparkle 1s ease forwards}
    /* —— modal —— */
    .modal{position:fixed;inset:0;background:rgba(0,0,0,.6);display:none;align-items:center;justify-content:center;z-index:999}
    .modal.open{display:flex}
    .modal-content{background:#1f1f1f;border-radius:12px;padding:30px;text-align:center;max-width:360px;
                   box-shadow:0 0 10px rgba(0,0,0,.7)}
    .modal-content h2{margin-bottom:20px;color:#74f2ce}
    .modal-content p{margin-bottom:20px;color:#ccc}
    .modal-content button{background:#74f2ce;color:#000;border:none;border-radius:10px;padding:10px 20px;font-weight:600;cursor:pointer}
    /* —— start chat btn —— */
    .start-chat-btn{margin:40px auto 0;display:flex;align-items:center;gap:10px;background:#555;border:none;
      color:#fff;font-size:1rem;font-weight:600;padding:14px 24px;border-radius:30px;opacity:.6;
      cursor:not-allowed;text-decoration:none;transition:.2s ease}
    .start-chat-btn img{width:20px;height:20px}
    .start-chat-btn.active{background:#25d366;cursor:pointer;box-shadow:0 0 20px #25d36688;opacity:1}
    .start-chat-btn.active:hover{background:#1ebc57;box-shadow:0 0 25px #25d366cc}
  `;
  const style = Object.assign(document.createElement('style'), { id:'connect-style', textContent: css });
  document.head.appendChild(style);
}

/*──────────────────────  VIEW BUILDER  ──────────────────────*/
export function renderConnectView () {
  injectStyles();

  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'data';                                   // לשונית data בקרוסלה
  section.innerHTML = `
    <h2 class="view-title" data-aos="fade-up">📊 Data Sources</h2>
    <p class="description" data-aos="fade-up" data-aos-delay="40">
      Connect public datasets or your own business data – all in one place.
    </p>

    <h3 class="section-title" data-aos="fade-up" data-aos-delay="80">🌐 Public Data</h3>
    <div class="connectors-grid" id="publicGrid"  data-aos-delay="120"></div>

    <h3 class="section-title" data-aos="fade-up" data-aos-delay="160">🔐 Your Data</h3>
    <div class="connectors-grid" id="userGrid"    data-aos-delay="200"></div>

    <a id="startChatBtn" class="start-chat-btn" title="Connect at least one source to unlock">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
      Start ChatBI&nbsp;Now
    </a>

    <div class="modal" id="authModal">
      <div class="modal-content">
        <h2 id="modal-title">Authorize</h2>
        <p>This demo wants to access your account. Approve access to continue.</p>
        <button id="modal-approve">Approve Access</button>
      </div>
    </div>
  `;

  /* refs */
  const publicGrid   = section.querySelector('#publicGrid');
  const userGrid     = section.querySelector('#userGrid');
  const authModal    = section.querySelector('#authModal');
  const modalTitle   = section.querySelector('#modal-title');
  const approveBtn   = section.querySelector('#modal-approve');
  const startChatBtn = section.querySelector('#startChatBtn');

  /* helpers */
  const closeModal = () => authModal.classList.remove('open');
  const setConnected = (card) => {
    card.classList.add('connected');
    const ctrl = card.querySelector('.connect-btn, .upload-label');
    if (ctrl) ctrl.textContent = 'Connected ✨';
    checkAnyConnected();
  };
  function checkAnyConnected(){
    if (section.querySelectorAll('.connector.connected').length){
      startChatBtn.classList.add('active');
      startChatBtn.href   = 'https://wa.me/972559405006?text=איך%20אתה%20יכול%20לעזור%20לי%20עם%20הנתונים%20שלי%3F';
      startChatBtn.target = '_blank';
    }
  }

  /* factory */
  function buildCard (obj, isPublic, idx){
    const card = document.createElement('div');
    card.className = `connector ${isPublic ? 'public' : 'user'}`;
    card.dataset.aos = 'fade-up';
    card.dataset.aosDelay = idx*50;

    card.innerHTML = `
      <img src="${obj.img}" alt="${obj.name} logo">
      <div class="connector-name">${obj.name}</div>
      ${
        obj.upload
         ? `<label class="upload-label">Upload<input type="file" accept=".xlsx,.csv"></label>`
         : `<button class="connect-btn">Connect</button>`
      }`;

    /* interactions */
    if (obj.upload){
      const fileInput = card.querySelector('input[type=file]');
      fileInput.addEventListener('change', e=>{
        if (e.target.files[0]){
          const lbl = card.querySelector('.upload-label');
          lbl.textContent = `Uploaded: ${e.target.files[0].name.slice(0,15)}${e.target.files[0].name.length>15?'…':''}`;
          setConnected(card);
        }
      });
    } else {
      const btn = card.querySelector('.connect-btn');
      btn.addEventListener('click', ()=>{
        modalTitle.textContent = `Authorize ${obj.name}`;
        approveBtn.onclick = ()=>{ closeModal(); setConnected(card); };
        authModal.classList.add('open');
      });
    }
    return card;
  }

  /* render both grids */
  publicSources .forEach((obj,i)=> publicGrid.appendChild(buildCard(obj,true ,i)));
  userSources   .forEach((obj,i)=> userGrid  .appendChild(buildCard(obj,false,i)));

  /* backdrop click */
  authModal.addEventListener('click', e=>{ if (e.target===authModal) closeModal(); });

  return section;
}
