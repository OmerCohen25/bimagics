// demo/connectors.js

const connectorsData = [
  {img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png',name:'Google Sheets',id:'sheets'},
  {img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',name:'BigQuery',id:'bq'},
  {img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png',name:'Upload Excel',id:'excel',upload:true},
  {img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s',name:'Green Invoice',id:'gi'},
  {img:'https://cdn.worldvectorlogo.com/logos/jira-1.svg',name:'Jira',id:'jira'},
  {img:'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',name:'Salesforce',id:'sf'}
];

export function renderConnectView() {
  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'connect';

  let connectorsHTML = '';
  connectorsData.forEach(c => {
    connectorsHTML += `
      <div class="connector" data-id="${c.id}" data-aos="fade-up" data-aos-delay="${connectorsData.indexOf(c) * 50}">
        <img src="${c.img}" alt="${c.name} logo">
        <div class="connector-name">${c.name}</div>
        ${
          c.upload ?
          `<label class="upload-label">Upload File<input type="file" accept=".xlsx,.csv"></label>` :
          `<button class="connect-btn">Connect</button>`
        }
      </div>
    `;
  });

  section.innerHTML = `
    <h2 class="view-title" data-aos="fade-up">🔌 Connect Your Data</h2>
    <div class="grid connectors-grid" data-aos-delay="100">
      ${connectorsHTML}
    </div>
    <a id="connectorsStartChatBtn" class="start-chatbi-link" href="https://wa.me/972559405006?text=Hi%20BI%20Magics!%20I've%20connected%20my%20data." target="_blank">
      <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp"> Start ChatBI Now
    </a>

    <div class="modal" id="authModal">
      <div class="modal-content">
        <h2 id="modal-title">Authorize Access</h2>
        <p id="modal-text">This demo wants to access your account data. Approve access to continue.</p>
        <button class="connect-btn" id="modal-approve">Approve Access</button>
        <button class="connect-btn" id="modal-cancel" style="background: #555; margin-left:10px;">Cancel</button>
      </div>
    </div>
  `;

  const authModalElement = section.querySelector('#authModal');
  const modalApproveBtn = section.querySelector('#modal-approve');
  const modalCancelBtn = section.querySelector('#modal-cancel');
  const modalTitle = section.querySelector('#modal-title');
  const startChatBtn = section.querySelector('#connectorsStartChatBtn');

  function checkConnectedStatus() {
    const anyConnected = section.querySelectorAll('.connector.connected').length > 0;
    if (anyConnected) {
      startChatBtn.classList.add('active');
      startChatBtn.style.pointerEvents = 'auto';
      startChatBtn.style.opacity = '1';
    } else {
      startChatBtn.classList.remove('active');
      startChatBtn.style.pointerEvents = 'none';
      startChatBtn.style.opacity = '.6';
    }
  }

  section.querySelectorAll('.connector').forEach(card => {
    const fileInput = card.querySelector('input[type=file]');
    if (fileInput) {
      fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          card.classList.add('connected');
          const label = card.querySelector('.upload-label');
          if(label) label.textContent = `Uploaded: ${e.target.files[0].name.substring(0,15)}${e.target.files[0].name.length > 15 ? '...' : ''}`;
          checkConnectedStatus();
          // alert(`Uploaded: ${e.target.files[0].name}`); // Optional: replace with a less intrusive notification
        }
      });
    } else {
      const connectButton = card.querySelector('.connect-btn');
      connectButton.addEventListener('click', () => {
        modalTitle.textContent = `Authorize ${card.querySelector('.connector-name').textContent}`;
        authModalElement.style.display = 'flex';
        
        modalApproveBtn.onclick = () => { // Re-assign onclick every time to capture the correct card
          authModalElement.style.display = 'none';
          card.classList.add('connected');
          connectButton.textContent = 'Connected ✨';
          connectButton.disabled = true;
          checkConnectedStatus();
        };
      });
    }
  });
  
  modalCancelBtn.addEventListener('click', () => {
    authModalElement.style.display = 'none';
  });

  authModalElement.addEventListener('click', (e) => { // Close modal if backdrop is clicked
    if (e.target === authModalElement) {
      authModalElement.style.display = 'none';
    }
  });
  
  checkConnectedStatus(); // Initial check

  return section;
}
