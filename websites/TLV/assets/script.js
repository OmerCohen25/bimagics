const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

// --- UTILITIES ---
function updateYear() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
}

function getStoredTheme() {
  return localStorage.getItem('theme');
}

function setStoredTheme(theme) {
  localStorage.setItem('theme', theme);
}

// --- CONTROLLERS ---
function initTheme() {
  const storedTheme = getStoredTheme();
  const preferredTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  const currentTheme = storedTheme || preferredTheme;

  if (currentTheme === 'light') {
    document.documentElement.classList.add('light');
  }

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="toggle-theme"]')) {
      document.documentElement.classList.toggle('light');
      const newTheme = document.documentElement.classList.contains('light') ? 'light' : 'dark';
      setStoredTheme(newTheme);
    }
  });
}

function initPricingToggle() {
  const toggle = $('#pricing-toggle');
  if (!toggle) return;

  const prices = $$('.price');
  const syncPrices = () => {
    prices.forEach(p => {
      const newPrice = toggle.checked ? p.dataset.yearly : p.dataset.monthly;
      if (newPrice) p.textContent = newPrice;
    });
  };

  toggle.addEventListener('change', syncPrices);
  syncPrices();
}

function initI18n() {
  const dict = {
    en: {
        "nav.about": "About", "nav.pricing": "Pricing", "nav.contact": "Contact",
        "hero.title": "Grow Your Work at SproutSpace",
        "hero.sub": "Tel Aviv's premier eco-friendly co-working space. Find your focus in an urban oasis.",
        "hero.ctaPrimary": "See Plans", "hero.ctaSecondary": "Book a Tour",
        "feat.sustainable.title": "Sustainable Space", "feat.sustainable.body": "Work surrounded by natural materials, abundant plants, and a low carbon footprint.",
        "feat.community.title": "Vibrant Community", "feat.community.body": "Connect with fellow innovators and creators at our regular networking events and workshops.",
        "feat.amenities.title": "Modern Amenities", "feat.amenities.body": "Blazing-fast fiber internet, ergonomic furniture, and premium coffee to fuel your day.",
        "pricing.title": "Simple, Flexible Pricing", "pricing.pageSub": "Choose the plan that's right for you. No hidden fees, ever.", "pricing.monthly": "Monthly", "pricing.yearly": "Yearly (Save 15%)",
        "pricing.choose": "Choose Plan", "pricing.contactUs": "Contact Us",
        "pricing.flex.title": "Flex Desk", "pricing.flex.p1": "Access to any open seat", "pricing.flex.p2": "High-speed WiFi", "pricing.flex.p3": "Coffee & Tea",
        "pricing.resident.title": "Resident Desk", "pricing.resident.p1": "Your own dedicated desk", "pricing.resident.p2": "24/7 Access", "pricing.resident.p3": "Meeting room credits", "pricing.resident.p4": "Mail handling",
        "pricing.studio.title": "Private Studio", "pricing.studio.p1": "For teams of 2-6", "pricing.studio.p2": "Fully furnished & private", "pricing.studio.p3": "All-inclusive amenities", "pricing.studio.p4": "Company logo display",
        "testimonials.title": "What Our Members Say", "testimonials.t1.body": "\"SproutSpace is a breath of fresh air. The natural light and quiet atmosphere have boosted my productivity tenfold.\"", "testimonials.t1.cite": "- Dana L, Freelance Developer",
        "testimonials.t2.body": "\"The best co-working community in Tel Aviv. I've met amazing people and collaborators here.\"", "testimonials.t2.cite": "- Yoni K, Startup Founder",
        "about.title": "Our Mission: Work in Harmony with Nature", "about.sub": "We believe that the best work happens in an environment that's healthy for both people and the planet.",
        "about.p1": "SproutSpace was founded on a simple idea: to create a workspace in Tel Aviv that feels less like an office and more like an oasis. We meticulously designed every corner to be calming, inspiring, and sustainable. From our reclaimed wood desks and non-toxic paints to the hundreds of air-purifying plants, our space is built to help you think clearly and create amazing things.",
        "about.p2": "But we're more than just a pretty space. We are a community of forward-thinkers, entrepreneurs, and creatives who value collaboration and wellness. Join us and discover a better way to work.",
        "contact.title": "Get in Touch", "contact.sub": "We'd love to hear from you. Book a tour or send us a question.",
        "contact.formTitle": "Send a Message", "contact.form.name": "Name", "contact.form.email": "Email", "contact.form.message": "Message", "contact.form.submit": "Send",
        "contact.infoTitle": "Visit Us",
        "faq.title": "Frequently Asked Questions", "faq.q1": "Can I try the space for a day?", "faq.a1": "Absolutely! Our Flex Desk (Day Pass) is the perfect way to experience SproutSpace. You can book one directly from our contact page.", "faq.q2": "What are the opening hours?", "faq.a2": "Our community manager is on-site from 9:00 to 18:00, Sunday to Thursday. Resident Desk and Private Studio members have 24/7 access.", "faq.q3": "Is there parking available?", "faq.a3": "While we don't have dedicated parking, there are several paid parking lots nearby. We highly encourage using public transport or bicycles!",
        "footer.rights": "All rights reserved."
    },
    he: {
        "nav.about": "אודות", "nav.pricing": "מחירים", "nav.contact": "צור קשר",
        "hero.title": "הצמיחו את העבודה שלכם ב-SproutSpace",
        "hero.sub": "מתחם העבודה האקו-פרנדלי המוביל בתל אביב. מצאו את הפוקוס שלכם בנווה מדבר אורבני.",
        "hero.ctaPrimary": "צפו במחירים", "hero.ctaSecondary": "הזמינו סיור",
        "feat.sustainable.title": "מרחב בר-קיימא", "feat.sustainable.body": "עבדו בסביבה המוקפת בחומרים טבעיים, צמחייה עשירה וטביעת רגל פחמנית נמוכה.",
        "feat.community.title": "קהילה תוססת", "feat.community.body": "התחברו עם יזמים, יוצרים ומפתחים באירועי הנטוורקינג והסדנאות שלנו.",
        "feat.amenities.title": "שירותים מודרניים", "feat.amenities.body": "אינטרנט סיבים אופטיים מהיר, ריהוט ארגונומי וקפה פרימיום כדי לתדלק את היום שלכם.",
        "pricing.title": "תמחור פשוט וגמיש", "pricing.pageSub": "בחרו את התוכנית המתאימה לכם. בלי עמלות נסתרות, אף פעם.", "pricing.monthly": "חודשי", "pricing.yearly": "שנתי (חסכו 15%)",
        "pricing.choose": "בחר תוכנית", "pricing.contactUs": "צרו קשר",
        "pricing.flex.title": "עמדה גמישה", "pricing.flex.p1": "גישה לכל עמדה פנויה", "pricing.flex.p2": "WiFi מהיר", "pricing.flex.p3": "קפה ותה",
        "pricing.resident.title": "עמדה קבועה", "pricing.resident.p1": "שולחן אישי משלכם", "pricing.resident.p2": "כניסה 24/7", "pricing.resident.p3": "זיכויים לחדרי ישיבות", "pricing.resident.p4": "שירותי דואר",
        "pricing.studio.title": "משרד פרטי", "pricing.studio.p1": "לצוותים של 2-6", "pricing.studio.p2": "מרוהט ופרטי לחלוטין", "pricing.studio.p3": "כל השירותים כלולים", "pricing.studio.p4": "הצגת לוגו החברה",
        "testimonials.title": "מה החברים שלנו אומרים", "testimonials.t1.body": "\"SproutSpace הוא משב רוח מרענן. האור הטבעי והאווירה השקטה הגבירו את הפרודוקטיביות שלי פי עשרה.\"", "testimonials.t1.cite": "- דנה ל, מפתחת פרילנסרית",
        "testimonials.t2.body": "\"קהילת העבודה הטובה ביותר בתל אביב. פגשתי כאן אנשים מדהימים ושותפים לדרך.\"", "testimonials.t2.cite": "- יוני כ, מייסד סטארטאפ",
        "about.title": "המשימה שלנו: לעבוד בהרמוניה עם הטבע", "about.sub": "אנו מאמינים שהעבודה הטובה ביותר מתרחשת בסביבה בריאה לאנשים ולכדור הארץ.",
        "about.p1": "SproutSpace נוסד על רעיון פשוט: ליצור סביבת עבודה בתל אביב שמרגישה פחות כמו משרד ויותר כמו נווה מדבר. עיצבנו בקפידה כל פינה כדי שתהיה מרגיעה, מעוררת השראה ובת-קיימא. משולחנות העץ הממוחזרים ועד מאות הצמחים מטהרי האוויר, המרחב שלנו בנוי לעזור לכם לחשוב בבהירות וליצור דברים מדהימים.",
        "about.p2": "אבל אנחנו יותר מסתם מקום יפה. אנחנו קהילה של אנשי חזון, יזמים ויוצרים שמעריכים שיתוף פעולה ורווחה אישית. הצטרפו אלינו וגלו דרך טובה יותר לעבוד.",
        "contact.title": "צרו קשר", "contact.sub": "נשמח לשמוע מכם. הזמינו סיור או שלחו לנו שאלה.",
        "contact.formTitle": "שלחו הודעה", "contact.form.name": "שם", "contact.form.email": "אימייל", "contact.form.message": "הודעה", "contact.form.submit": "שלח",
        "contact.infoTitle": "בקרו אותנו",
        "faq.title": "שאלות נפוצות", "faq.q1": "אפשר לנסות את המקום ליום אחד?", "faq.a1": "בהחלט! ה-Flex Desk (כרטיס יומי) שלנו הוא הדרך המושלמת לחוות את SproutSpace. ניתן להזמין ישירות מעמוד צור קשר.", "faq.q2": "מהן שעות הפעילות?", "faq.a2": "מנהל הקהילה שלנו נמצא במקום בין 9:00 ל-18:00, בימים ראשון עד חמישי. חברי עמדה קבועה ומשרד פרטי נהנים מגישה 24/7.", "faq.q3": "האם יש חניה זמינה?", "faq.a3": "אמנם אין לנו חניה ייעודית, אך ישנם מספר חניונים בתשלום בקרבת מקום. אנו ממליצים בחום להשתמש בתחבורה ציבורית או באופניים!",
        "footer.rights": "כל הזכויות שמורות."
    }
  };

  let currentLang = document.documentElement.lang || 'en';

  const translatePage = () => {
    document.documentElement.setAttribute('lang', currentLang);
    document.documentElement.setAttribute('dir', currentLang === 'he' ? 'rtl' : 'ltr');
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translation = dict[currentLang]?.[key];
      if (translation) el.textContent = translation;
    });
  };

  document.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="toggle-lang"]')) {
      currentLang = (currentLang === 'en') ? 'he' : 'en';
      translatePage();
    }
  });

  translatePage(); // Initial translation on page load
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  updateYear();
  initTheme();
  initPricingToggle();
  initI18n();
});
