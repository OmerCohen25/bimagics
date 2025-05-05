// demo/chat.js
export const chatView = (() => {
  const section = document.createElement('section');
  section.className = 'view';
  section.innerHTML = `
    <h2 style="text-align:center;margin-bottom:20px;font-size:18px" data-aos="fade-up">💬 ChatBI Demo</h2>
    <div class="chat-box" data-aos="fade-up" data-aos-delay="60">
      <div class="bot msg">Ask me about your data 👋</div>
      <div class="user msg">Show Q1 revenue</div>
      <div class="bot msg">Q1 2025 revenue is <strong>$3.4 M</strong>, up 18% YoY.</div>
      <div class="user msg">Who was the top customer last month?</div>
      <div class="bot msg">‘Globex Corp.’ with $310 K in revenue.</div>
      <div class="user msg">What's the sign-up trend?</div>
      <div class="bot msg">Steady growth: ~280 sign-ups/day last 30 days.</div>
    </div>
  `;
  document.getElementById('views').appendChild(section);
  return section;
})();
