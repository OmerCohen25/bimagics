// demo/chat.js

const chatMessages = [
    {type: 'bot', text: "Ask me about your data 👋 I can help you with insights!"},
    {type: 'user', text: "Show Q1 revenue"},
    {type: 'bot', text: "Q1 2025 revenue is <strong>$3.4 M</strong>, up 18% YoY. Impressive growth!"},
    {type: 'user', text: "Who was the top customer last month?"},
    {type: 'bot', text: "Last month, ‘<strong>Globex Corp.</strong>’ was the top customer with $310K in revenue."},
    {type: 'user', text: "What's the current sign-up trend like?"},
    {type: 'bot', text: "The sign-up trend is showing steady growth, averaging around <strong>~280 new sign-ups per day</strong> over the last 30 days."}
];

export function renderChatView() {
  const section = document.createElement('section');
  section.className = 'view';
  section.id = 'chat';

  let messagesHTML = '';
  chatMessages.forEach((msg, index) => {
    messagesHTML += `<div class="${msg.type} msg" data-aos="fade-up" data-aos-delay="${index * 100}">${msg.text}</div>`;
  });

  section.innerHTML = `
    <h2 class="view-title" data-aos="fade-up">💬 ChatBI Demo</h2>
    <div class="chat-box" data-aos-delay="100">
      ${messagesHTML}
    </div>
  `;
  return section;
}
