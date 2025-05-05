// demo/connectors.js
/* 🔌 Connectors view – כולל אינטראקציית OAuth דמה */
const html = `
<section class="view" id="connect">
  <h2 style="text-align:center;margin-bottom:20px;font-size:18px" data-aos="fade-up">🔌 Connect Your Data</h2>

  <div class="grid connectors-grid" data-aos="fade-up" data-aos-delay="60">
    <!-- cards -->
    ${[
      {img:'https://www.gstatic.com/images/branding/product/1x/sheets_2020q4_48dp.png',name:'Google Sheets',id:'sheets'},
      {img:'https://cdn.worldvectorlogo.com/logos/google-bigquery-logo-1.svg',name:'BigQuery',id:'bq'},
      {img:'https://cdn2.iconfinder.com/data/icons/metro-ui-icon-set/512/Excel_15.png',name:'Upload Excel',id:'excel',upload:true},
      {img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThj54tYHggJ09dqzwl_SGM97sUZKJrGY9kaA&s',name:'Green Invoice',id:'gi'},
      {img:'https://cdn.worldvectorlogo.com/logos/jira-1.svg',name:'Jira',id:'jira'},
      {img:'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg',name:'Salesforce',id:'sf'}
    ].map(c=>`
      <div class="connector" data-id="${c.id}">
        <img src="${c.img}" alt="">
        <div class="connector-name">${c.name}</div>
        ${
          c.upload ?
          `<label class="connect-btn">Upload<input type="file" accept=".xlsx"></label>` :
          `<button class="connect-btn">Connect</button>`
        }
      </div>
    `).join('')}
  </div>

  <a id="startChatBtn" class="connect-btn" style="margin:40px auto 0;display:block;pointer-events:none;opacity:.4">Start ChatBI Now</a>

  <!-- fake auth modal -->
  <div class="modal" id="authModal">
    <div>
      <h2 id="modal-title" style="color:var(--accent);margin-bottom:16px">Authorize</h2>
      <p style="margin-bottom:22px;color:#ddd">This demo wants to access your account. Approve access to continue.</p>
      <button class="connect-btn" id="modal-approve">Approve Access</button>
    </div>
  </div>
</section>`;
document.getElementById('views').insertAdjacentHTML('beforeend', html);

/* behaviour */
const authModal=document.getElementById('authModal');
const approve=document.getElementById('modal-approve');
const title=document.getElementById('modal-title');
const startBtn=document.getElementById('startChatBtn');

const checkConnected=()=>{
  const any=document.querySelectorAll('.connector.connected').length>0;
  if(any){startBtn.style.pointerEvents='auto';startBtn.style.opacity='1';startBtn.href='https://wa.me/972559405006?text=Hi%20BI%20Magics!';
           startBtn.target='_blank';}
};

document.querySelectorAll('.connector').forEach(card=>{
  if(card.querySelector('input[type=file]')){
    card.querySelector('input').addEventListener('change',e=>{
      if(e.target.files[0]){
        card.classList.add('connected');checkConnected();
        alert(`Uploaded: ${e.target.files[0].name}`);
      }
    });
  }else{
    card.querySelector('.connect-btn').addEventListener('click',()=>{
      title.textContent=`Authorize ${card.dataset.id}`;
      authModal.style.display='flex';
      approve.onclick=()=>{
        authModal.style.display='none';
        card.classList.add('connected');
        card.querySelector('.connect-btn').textContent='Connected ✨';
        checkConnected();
      };
    });
  }
});
authModal.addEventListener('click',e=>{if(e.target===authModal)authModal.style.display='none';});
