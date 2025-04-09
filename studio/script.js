let currentMode = 'view';
let chatHistory = [];

let dashboardCode = {
  widgets: [
    { type: 'text', content: 'Welcome to BI Magics Agent!' }
  ]
};

function setMode(mode) {
  currentMode = mode;
  document.getElementById('dashboardView').style.display = mode === 'view' ? 'block' : 'none';
  document.getElementById('dashboardCode').style.display = mode === 'code' ? 'block' : 'none';
  if (mode === 'code') {
    document.getElementById('codeEditor').value = JSON.stringify(dashboardCode, null, 2);
  } else {
    try {
      dashboardCode = JSON.parse(document.getElementById('codeEditor').value);
      renderDashboard();
    } catch (e) {
      alert('Invalid JSON');
    }
  }
}

function renderDashboard() {
  const container = document.getElementById('dashboardView');
  container.innerHTML = '';
  dashboardCode.widgets.forEach(w => {
    const box = document.createElement('div');
    box.className = 'widget';
    if (w.type === 'text') {
      box.innerText = w.content;
    }
    if (w.type === 'kpi') {
      box.innerHTML = `<h2>${w.title}</h2><p>${w.value}</p>`;
    }
    container.appendChild(box);
  });
}

document.getElementById('chatForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = document.getElementById('chatInput');
  const msg = input.value.trim();
  if (!msg) return;
  input.value = '';
  addChatMessage('user', msg);
  chatHistory.push({ role: 'user', content: msg });

  const res = await fetch('./api/agent', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code: dashboardCode, history: chatHistory })
  });
  const data = await res.json();
  dashboardCode = data.updatedCode;
  document.getElementById('codeEditor').value = JSON.stringify(dashboardCode, null, 2);
  if (currentMode === 'view') renderDashboard();
  addChatMessage('agent', '✅ Updated dashboard.');
});

function addChatMessage(sender, text) {
  const box = document.getElementById('chatBox');
  const msg = document.createElement('div');
  msg.className = sender === 'user' ? 'text-right' : 'text-left';
  msg.innerHTML = `<b>${sender === 'user' ? 'You' : 'Agent'}:</b> ${text}`;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}

async function deploy() {
  await fetch('./deploy.js');
  alert('🚀 Deployed! Check your GitHub Pages.');
}