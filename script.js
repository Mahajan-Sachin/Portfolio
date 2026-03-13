/* ============================================
   SACHIN MAHAJAN PORTFOLIO — script.js
   ============================================ */

// ======== LIGHTBOX ========
const lbGroups = {
  'job':   ['images/projects/Skill_base_engine.png', 'images/projects/Skill_base_llm_2.png'],
  'phish': ['images/projects/Phishing.png',          'images/projects/Phishing2.png'],
};
let lbImages = [];
let lbIndex  = 0;

function openLightbox(src, alt, group) {
  if (group && lbGroups[group]) {
    lbImages = lbGroups[group];
    lbIndex  = lbImages.findIndex(s => src.endsWith(s.split('/').pop()));
    if (lbIndex < 0) lbIndex = 0;
  } else {
    lbImages = [src];
    lbIndex  = 0;
  }
  renderLbImage();
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function renderLbImage() {
  const img  = document.getElementById('lb-img');
  const prev = document.getElementById('lb-prev');
  const next = document.getElementById('lb-next');
  const hint = document.getElementById('lb-hint');
  img.src = lbImages[lbIndex];

  const multi = lbImages.length > 1;
  prev.style.display = multi ? 'flex' : 'none';
  next.style.display = multi ? 'flex' : 'none';
  if (hint) hint.textContent = multi
    ? `Image ${lbIndex + 1} of ${lbImages.length} · Click image or press ESC to close`
    : 'Click image or press ESC to close';
}

function lbNavigate(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  renderLbImage();
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Keyboard: arrows & ESC
document.addEventListener('keydown', (e) => {
  const lb = document.getElementById('lightbox');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowRight') lbNavigate(1);
  if (e.key === 'ArrowLeft')  lbNavigate(-1);
});

// ======== RESUME MODAL ========
function openResumeModal() {
  document.getElementById('resume-modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  document.getElementById('resume-modal').classList.remove('open');
  document.body.style.overflow = '';
}

// Close resume modal with ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeResumeModal();
});




// ======== SLIDER STATE ========
const sliderState = {};

function slide(id, dir) {
  const track = document.getElementById(id);
  if (!track) return;
  const slides = track.querySelectorAll('.slide');
  if (!sliderState[id]) sliderState[id] = 0;
  sliderState[id] = (sliderState[id] + dir + slides.length) % slides.length;
  updateSlider(id, slides.length);
}

function goSlide(id, index) {
  const track = document.getElementById(id);
  if (!track) return;
  const slides = track.querySelectorAll('.slide');
  sliderState[id] = index;
  updateSlider(id, slides.length);
}

function updateSlider(id, total) {
  const track = document.getElementById(id);
  if (!track) return;
  track.style.transform = `translateX(-${sliderState[id] * 100}%)`;
  const dotsContainer = document.getElementById('dots-' + id);
  if (dotsContainer) {
    dotsContainer.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === sliderState[id]);
    });
  }
}

// Auto-advance sliders
function autoSliders() {
  ['sl-job', 'sl-phish'].forEach(id => {
    setInterval(() => {
      const track = document.getElementById(id);
      if (!track) return;
      const slides = track.querySelectorAll('.slide');
      slide(id, 1);
    }, 3500);
  });
}

// ======== NAVBAR ========
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveNav();
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Active nav on scroll
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + current));
}

// ======== TYPING EFFECT ========
const phrases = [
  'run portfolio.py',
  'Hello, World!',
  'import AI_skills',
  'train_model()',
  'deploy(production)',
];
let phraseIdx = 0, charIdx = 0, deleting = false;
const termEl = document.getElementById('termText');

function type() {
  if (!termEl) return;
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    termEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) { deleting = true; setTimeout(type, 1800); return; }
  } else {
    termEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) { deleting = false; phraseIdx = (phraseIdx + 1) % phrases.length; }
  }
  setTimeout(type, deleting ? 45 : 80);
}

// ======== SCROLL REVEAL ========
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserver.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);

// ======== PARTICLES ========
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  for (let i = 0; i < 55; i++) {
    const p = document.createElement('div');
    p.style.cssText = `
      position: absolute;
      width: ${Math.random() * 2.5 + 1}px;
      height: ${Math.random() * 2.5 + 1}px;
      border-radius: 50%;
      background: rgba(0, 212, 255, ${Math.random() * 0.45 + 0.1});
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: floatP ${Math.random() * 14 + 8}s ease-in-out infinite;
      animation-delay: -${Math.random() * 10}s;
    `;
    container.appendChild(p);
  }
  // Inject float keyframe if not present
  if (!document.getElementById('particle-anim')) {
    const style = document.createElement('style');
    style.id = 'particle-anim';
    style.textContent = `
      @keyframes floatP {
        0%, 100% { transform: translateY(0) translateX(0); opacity: 0.6; }
        25% { transform: translateY(-22px) translateX(10px); opacity: 1; }
        50% { transform: translateY(-10px) translateX(-8px); opacity: 0.7; }
        75% { transform: translateY(-30px) translateX(5px); opacity: 0.9; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ======== SKILL CARD TOOLTIP ========
function initTooltips() {
  document.querySelectorAll('.sk-card').forEach(card => {
    const label = card.querySelector('span')?.textContent;
    if (!label) return;
    card.setAttribute('title', label);
  });
}

// ======== SKILL CARDS STAGGER ANIMATION ========
function initSkillCardAnimations() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const cards = skillsSection.querySelectorAll('.sk-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          cards.forEach((card, i) => {
            card.style.transitionDelay = `${i * 60}ms`;
            card.classList.add('sk-visible');
          });

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  observer.observe(skillsSection);
}

// ======== INIT ========
document.addEventListener('DOMContentLoaded', () => {
  // Reveal
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  // Typing
  setTimeout(type, 600);
  // Particles
  createParticles();
  // Sliders
  autoSliders();
  // Stagger
  initSkillCardAnimations();
  // Nav initial state
  updateActiveNav();
  // Tooltip
  initTooltips();
  // Initial navbar check (in case page loads mid-scroll)
  if (window.scrollY > 50) navbar.classList.add('scrolled');
  // Chatbot
  initChatbot();
});

// ======== CHATBOT ========
const botResponses = [
  {
    keys: ['hello','hi','hey','hii','helo','sup','greet','namaste','hola'],
    reply: `Hey there! 👋 I'm Sachin's AI assistant. Ask me anything about him — skills, projects, education or how to reach him!`
  },
  {
    keys: ['who','sachin','about','introduce','tell me','yourself','background'],
    reply: `Sachin Mahajan is an AI/ML Engineer & CS Student passionate about building production-ready ML and LLM applications. 🧠 He specialises in RAG systems, backend deployment and data analytics. Currently open to exciting opportunities!`
  },
  {
    keys: ['skill','tech','technolog','know','language','framework','tool','stack','expert','proficien'],
    reply: `Sachin's tech stack includes:\n🐍 <b>AI/ML</b>: Python, TensorFlow, PyTorch, Keras, Scikit-learn, JAX\n🔗 <b>LLMs</b>: LangChain, RAG, Groq, ChromaDB\n🌐 <b>Backend</b>: Django, Flask, REST APIs\n🗄️ <b>Data</b>: Pandas, NumPy, SQL, Power BI\n🛠️ <b>DevOps</b>: Docker, Git, GitHub Actions, Linux`
  },
  {
    keys: ['project','built','work','app','application','portfolio','made'],
    reply: `Sachin has built 4 solid projects:\n🤖 <b>AI Companion</b> — RAG-based conversational AI with emotion detection\n💼 <b>Job Recommendation Engine</b> — DSA-driven + LLM recommender (live on Render!)\n🎣 <b>Phishing URL Detector</b> — XGBoost model + Streamlit app (Docker deployed)\n📊 <b>Shopping Behavior Analysis</b> — Power BI dashboard on 3900+ transactions`
  },
  {
    keys: ['ai companion','companion','rag','conversational','memory'],
    reply: `AI Companion is a context-aware chatbot using a RAG pipeline that retrieves the top 3 semantically relevant memories per query. 🧠 Built with Django, LangChain, ChromaDB & Groq. Features emotion detection and hybrid short/long-term memory!`
  },
  {
    keys: ['job','recommendation','skill matcher','skill-matcher','render','flask'],
    reply: `The Job Recommendation Engine matches user skills against 10+ job roles using a DSA-driven scoring algorithm + Groq LLM. 💼 Live at skill-matcher-t1az.onrender.com — built with Flask, MySQL & GitHub Actions CI/CD!`
  },
  {
    keys: ['phishing','url','detect','xgboost','cybersecurity','streamlit'],
    reply: `The Phishing URL Detector uses XGBoost trained on 11,000+ URLs with 58 features to classify phishing links. 🎣 Deployed via Streamlit + Docker with GitHub Actions CI validating every push!`
  },
  {
    keys: ['shopping','power bi','customer','behavior','pandas','analytics','sql'],
    reply: `Shopping Behavior Analysis explores 3,900+ retail transactions in Python & SQL, with a Power BI dashboard featuring KPI cards and slicers. 📊 Key insight: non-subscribed customers drive 60% of revenue!`
  },
  {
    keys: ['education','college','university','degree','gpa','marks','study','school','btech','b.tech'],
    reply: `Sachin is pursuing a <b>B.Tech in Computer Science</b>. His coursework covers AI, Data Structures, DBMS, OOP, Linear Algebra & Probability. 🎓`
  },
  {
    keys: ['contact','email','phone','reach','connect','message','linkedin','number'],
    reply: `You can reach Sachin at:\n📧 <b>Email</b>: sachinmahajan903@gmail.com\n📞 <b>Phone</b>: +91-8168959421\n💼 <b>LinkedIn</b>: linkedin.com/in/sachin-mahajan-cse\n🐙 <b>GitHub</b>: github.com/Mahajan-Sachin`
  },
  {
    keys: ['github','repo','repository','code','open source'],
    reply: `Sachin's GitHub is <b>github.com/Mahajan-Sachin</b> 🐙 — check out AI Companion, Skill-Matcher, Phishing detector, and Customer Behavior Analysis repos!`
  },
  {
    keys: ['linkedin','profile','professional','network'],
    reply: `Connect with Sachin on LinkedIn: <b>linkedin.com/in/sachin-mahajan-cse</b> 💼 He's actively looking for AI/ML and SDE opportunities!`
  },
  {
    keys: ['resume','cv','download','experience'],
    reply: `You can view Sachin's resume right here on the portfolio! Click the 📜 <b>Resume</b> button at the top — you can read it online or download it as a PDF.`
  },
  {
    keys: ['certificate','certif','course','udemy','coursera','learn'],
    reply: `Sachin holds certifications in ML, deep learning, and cloud — hover over the certificates section flip cards to see details! 🏆`
  },
  {
    keys: ['achiev','award','leetcode','compet','rank','dsa','algorithm','data struct'],
    reply: `Sachin has solved <b>300+ LeetCode problems</b> 💡, demonstrating strong DSA skills in Python — arrays, trees, graphs, DP and more!`
  },
  {
    keys: ['hire','job','opportunit','openings','position','intern','recruit','available'],
    reply: `Yes, Sachin is <b>actively looking for opportunities</b> in AI/ML Engineering, Data Science, Backend Dev & SDE roles! 🚀 Drop an email at sachinmahajan903@gmail.com or reach out on LinkedIn.`
  },
  {
    keys: ['langchain','lcel','chain','llm','large language'],
    reply: `Sachin uses <b>LangChain (LCEL)</b> extensively for building RAG pipelines, chaining LLM calls, and managing vector stores like ChromaDB. 🔗 It's at the core of his AI Companion project!`
  },
  {
    keys: ['groq','llama','llama3','inference','fast'],
    reply: `Sachin uses <b>Groq API with LLaMA-3.1-8B</b> for ultra-fast LLM inference in his projects — it's one of the fastest inference solutions available! ⚡`
  },
  {
    keys: ['thank','thanks','thankyou','appreciate','great','awesome','nice','cool','good','fantastic','perfect'],
    reply: `You're welcome! 😊 Feel free to ask anything else about Sachin — or scroll through the portfolio to see his work in action!`
  },
  {
    keys: ['bye','goodbye','see you','later','cya'],
    reply: `Goodbye! 👋 Don't forget to check out Sachin's projects and drop a message if you'd like to connect!`
  },
  {
    keys: ['how are you','how r u','how do you','feeling','doing'],
    reply: `I'm just a bot, but I'm doing great! 🤖 More importantly — want to know about Sachin's amazing AI projects?`
  },
];

const fallbackReplies = [
  `Hmm, I'm not sure about that! Try asking about Sachin's <b>skills</b>, <b>projects</b>, <b>education</b> or <b>contact details</b>. 😊`,
  `I didn't quite catch that. Try the quick chips below — they're a great way to explore! 🔍`,
  `Great question, but it's outside what I know. Ask me about Sachin's projects or tech stack!`
];

let chatOpen = false;
let fallbackIdx = 0;

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWindow');
  const btn = document.getElementById('chatToggle');
  win.classList.toggle('open', chatOpen);
  btn.querySelector('i').className = chatOpen ? 'fas fa-times' : 'fas fa-robot';
}

function initChatbot() {
  setTimeout(() => appendBotMsg(`Hi! 👋 I'm Sachin's AI assistant. Tap a button below to learn about Sachin's skills, projects, and more!`), 400);
}

function getBotReply(input) {
  const text = input.toLowerCase();
  for (const r of botResponses) {
    if (r.keys.some(k => new RegExp(`\\b${k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}\\b`,'i').test(text) || text === k)) return r.reply;
  }
  return fallbackReplies[fallbackIdx++ % fallbackReplies.length];
}

function appendBotMsg(html) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.innerHTML = `
    <div class="msg-mini-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-bubble">${html.replace(/\n/g, '<br/>')}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function appendUserMsg(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.innerHTML = `<div class="msg-bubble">${text}</div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function showTyping() {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'chat-msg bot typing-indicator';
  div.innerHTML = `
    <div class="msg-mini-avatar"><i class="fas fa-robot"></i></div>
    <div class="msg-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
  return div;
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  appendUserMsg(text);
  const typing = showTyping();
  const delay = 600 + Math.random() * 600;
  setTimeout(() => {
    typing.remove();
    appendBotMsg(getBotReply(text));
  }, delay);
}

function sendChip(text) {
  if (!chatOpen) { chatOpen = true; document.getElementById('chatWindow').classList.add('open'); document.getElementById('chatToggle').querySelector('i').className = 'fas fa-times'; }
  appendUserMsg(text);
  const typing = showTyping();
  setTimeout(() => { typing.remove(); appendBotMsg(getBotReply(text)); }, 700);
}

