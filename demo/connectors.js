// FILE: demo/connectors.js
// BI Magics – Connectors view (enhanced to match standalone demo UX)

const connectorsData = [
  { img: 'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png', name: 'Google Sheets', id: 'sheets' },
  { img: 'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',        name: 'BigQuery',       id: 'bq'     },
  { img: 'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png', name: 'Upload Excel', id: 'excel',  upload: true },
  { img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s', name: 'Green Invoice', id: 'gi' },
  { img: 'https://cdn.worldvectorlogo.com/logos/jira-1.svg',  name: 'Jira',       id: 'jira' },
  { img: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg', name: 'Salesforce', id: 'sf' }
];

/**
 * Inject one-time style block for the connectors view.
 * (Safe to call multiple times – will append only once.)
 */
function injectStyles() {
  if (document.getElementById('connectors-style')) return;
  const style = document.createElement('style');
  style.id = 'connectors-style';
  style.textContent = `
    /* ——— Connectors Grid ——— */
    .connectors-grid{
      display:grid;
      grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
      gap:20px;justify-items:center
    }
    .connector{
      background:#1a1c22;border-radius:16px;padding:20px 10px;text-align:center;
      width:100%;max-width:180px;box-shadow:0 2px 6px rgba(0,0,0,.4);
      transition:transform .2s ease,background-color .3s ease;position:relative;cursor:pointer
    }
    .connector:hover{transform:translateY(-4px);background-color:#252831}
    .connector img{width:48px;height:48px;object-fit:contain;margin-bottom:10px}
    .connector-name{font-size:.95rem;font-weight:600;margin-bottom:8px}
    .connect-btn,.upload-label{
      font-size:.75rem;padding:6px 12px;border:none;border-radius:12px;background:#74f2ce;
      color:#000;cursor:pointer;transition:background .2s ease;font-weight:600
    }
    .connect-btn:hover,.upload-label:hover{background:#5ae6bb}
    input[type=file]{display:none}
    /* Connected State */
    .connector.connected{background-color:#134d38!important;box-shadow:0 0 15px #33ff99aa;animation:sparkle 1s ease forwards}
    .connector.connected .connect-btn,
    .connector.connected .upload-label{background:#33ff99;color:#000}
    @keyframes sparkle{
      0%{box-shadow:0 0 5px #33ff99}
      50%{box-shadow:0 0 20px #33ff99,0 0 40px #33ff9999}
      100%{box-shadow:0 0 15px #33ff99aa}
    }
    /* Modal */
    .modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);
      display:none;align-items:center;justify-content:center;z-index:999}
    .modal.open{display:flex}
    .modal-content{background:#1f1f1f;border-radius:12px;padding:30px;text-align:center;
      max-width:360px;box-shadow:0 0 10px rgba(0,0,0,.7)}
    .modal-content h2{color:#74f2ce;margin-bottom:20px}
    .modal-content p{color:#ccc;margin-bottom:20px}
    .modal-content button{background:#74f2ce;color:#000;border:none;border-radius:10px;
      padding:10px 20px;font-weight:600;cursor:pointer}
    /* Start Chat Button */
    .start-chat-btn{
      margin:40px auto 0;display:flex;align-items:center;gap:10px;background:#555;border:none;
      color:#fff;font-size:1rem;font-weight:600;padding:14px 24px;border-radius:30px;
      cursor:not-allowed;text-decoration:none;width:fit-content;transition:all .2s ease;
      opacity:.6
    }
    .start-chat-btn.active{background:#25d366;cursor:pointer;box-shadow:0 0 20px #25d36688;opacity:1}
    .start-chat-btn.active:hover{background:#1ebc57;box-shadow:0 0 25px #25d366cc}
    .start-chat-btn img{width:20px;height:20px}
  `;
  document.head.appendChild(style);
}

/**
 * Renders the connectors section.
 * @returns {HTMLElement} the section element
 */
export function renderConnectView() {
  injectStyles();

  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'connect';
  section.innerHTML = `
    <h2 class="view-title" data-aos="fade-up">🔌 Connect Your Data</h2>
    <p class="description" data-aos="fade-up" data-aos-delay="50">
      Choose your data source and start analyzing in seconds.
    </p>
    <div class="grid connectors-grid" data-aos-delay="100"></div>
    <a id="startChatBtn" class="start-chat-btn" title="Connect a source to unlock">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp">
      Start ChatBI&nbsp;Now
    </a>
    <div class="modal" id="authModal">
      <div class="modal-content">
        <h2 id="modal-title">Authorize Access</h2>
        <p id="modal-text">This demo wants to access your account data. Approve access to continue.</p>
        <button id="modal-approve">Approve Access</button>
      </div>
    </div>
  `;

  const grid          = section.querySelector('.connectors-grid');
  const authModal     = section.querySelector('#authModal');
  const modalTitle    = section.querySelector('#modal-title');
  const approveBtn    = section.querySelector('#modal-approve');
  const startChatBtn  = section.querySelector('#startChatBtn');

  /* ---------- Helpers ---------- */
  const closeModal = () => authModal.classList.remove('open');

  function checkConnectedStatus() {
    const anyConnected = grid.querySelectorAll('.connector.connected').length > 0;
    if (anyConnected) {
      startChatBtn.classList.add('active');
      startChatBtn.href   = 'https://wa.me/972559405006?text=איך%20אתה%20יכול%20לעזור%20לי%20עם%20הנתונים%20שלי%3F';
      startChatBtn.target = '_blank';
      startChatBtn.style.cursor = 'pointer';
    }
  }

  function simulateConnect(card) {
    card.classList.add('connected');
    const btn = card.querySelector('.connect-btn, .upload-label');
    if (btn) btn.textContent = 'Connected ✨';
    checkConnectedStatus();
  }

  /* ---------- Build connector cards ---------- */
  connectorsData.forEach((c, i) => {
    const card = document.createElement('div');
    card.className = 'connector';
    card.dataset.id = c.id;
    card.dataset.aos = 'fade-up';
    card.dataset.aosDelay = i * 50;

    card.innerHTML = `
      <img src="${c.img}" alt="${c.name} logo">
      <div class="connector-name">${c.name}</div>
      ${
        c.upload
          ? `<label class="upload-label">Upload
               <input type="file" accept=".xlsx,.csv">
             </label>`
          : `<button class="connect-btn">Connect</button>`
      }
    `;
    grid.appendChild(card);

    /* --- interactions --- */
    if (c.upload) {
      const fileInput = card.querySelector('input[type=file]');
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          const lbl = card.querySelector('.upload-label');
          lbl.textContent = `Uploaded: ${e.target.files[0].name.substring(0,15)}${e.target.files[0].name.length>15?'…':''}`;
          simulateConnect(card);
        }
      });
    } else {
      const connectBtn = card.querySelector('.connect-btn');
      connectBtn.addEventListener('click', () => {
        modalTitle.textContent = `Authorize ${c.name}`;
        approveBtn.onclick = () => {
          closeModal();
          simulateConnect(card);
        };
        authModal.classList.add('open');
      });
    }
  });

  /* ---------- modal backdrop click ---------- */
  authModal.addEventListener('click', (e) => {
    if (e.target === authModal) closeModal();
  });

  return section;
}