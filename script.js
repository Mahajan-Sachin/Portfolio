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

  // Observe each sk-card individually — animation fires when each card enters view
  const cardObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sk-visible');
          cardObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillsSection.querySelectorAll('.sk-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 60}ms`;  // stagger via animation-delay
    cardObserver.observe(card);
  });

  // Animate soft-skill cards with slide-in
  const softObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
          softObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  skillsSection.querySelectorAll('.soft-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-18px)';
    card.style.transition = `opacity 0.4s ease ${i * 60}ms, transform 0.4s ease ${i * 60}ms`;
    softObserver.observe(card);
  });
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
  // GitHub live data
  loadGitHubData();
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
  const text = input.toLowerCase().trim();
  for (const r of botResponses) {
    if (r.keys.some(k => {
      const escaped = k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
      // Try exact word-boundary match first, then prefix/substring match for stems
      return new RegExp(`\\b${escaped}`,'i').test(text) || text === k;
    })) return r.reply;
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


// ======== GITHUB API INTEGRATION ========
async function loadGitHubData() {
  const GH_USER = 'Mahajan-Sachin';
  const API_BASE = 'https://api.github.com';

  // Animated count-up
  function countUp(el, target, duration = 900) {
    if (!el) return;
    if (target === 0) { el.textContent = '0'; return; }
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(progress * target);
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target;
    };
    requestAnimationFrame(step);
  }

  // Fetch all pages of repos (pagination-safe, up to 500 repos)
  async function fetchAllRepos() {
    let repos = [];
    let page = 1;
    while (page <= 5) {
      const res = await fetch(
        `${API_BASE}/users/${GH_USER}/repos?per_page=100&page=${page}&type=owner`,
        { headers: { 'Accept': 'application/vnd.github.v3+json' } }
      );
      if (!res.ok) break;
      const data = await res.json();
      repos = repos.concat(data);
      if (data.length < 100) break;
      page++;
    }
    return repos;
  }

  try {
    // Fetch user profile
    const userRes = await fetch(`${API_BASE}/users/${GH_USER}`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' }
    });
    if (!userRes.ok) throw new Error('GitHub user API failed');
    const user = await userRes.json();

    // Fetch all repos → exclude forks → sum stars
    const allRepos = await fetchAllRepos();
    const originalRepos = allRepos.filter(r => !r.fork);
    const totalStars = originalRepos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

    // Populate stat cards
    countUp(document.getElementById('ghRepos'),     user.public_repos);
    countUp(document.getElementById('ghStars'),     totalStars);
    countUp(document.getElementById('ghFollowers'), user.followers);
    countUp(document.getElementById('ghFollowing'), user.following);

    // Language colour map
    const langColors = {
      Python: '#3572A5', JavaScript: '#f1e05a', HTML: '#e34c26',
      CSS: '#563d7c', Java: '#b07219', 'Jupyter Notebook': '#DA5B0B',
      TypeScript: '#2b7489', C: '#555555', 'C++': '#f34b7d',
      Shell: '#89e051', SQL: '#e38c00'
    };

    // Top 6 original repos by stars → then by recency
    const topRepos = originalRepos
      .sort((a, b) =>
        b.stargazers_count - a.stargazers_count ||
        new Date(b.updated_at) - new Date(a.updated_at)
      )
      .slice(0, 6);

    const grid = document.getElementById('ghReposGrid');
    if (!grid) return;

    grid.innerHTML = topRepos.map(repo => {
      const lang  = repo.language || 'N/A';
      const color = langColors[lang] || '#00d4ff';
      const rawDesc = repo.description || 'No description provided.';
      const desc  = rawDesc.length > 72 ? rawDesc.slice(0, 72) + '…' : rawDesc;
      const updated = new Date(repo.updated_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' });
      return `
        <a class="gh-repo-card" href="${repo.html_url}" target="_blank" rel="noopener noreferrer">
          <div class="gh-repo-top">
            <span class="gh-repo-name"><i class="fas fa-book-open"></i> ${repo.name}</span>
          </div>
          <p class="gh-repo-desc">${desc}</p>
          <div class="gh-repo-meta">
            <span class="gh-repo-lang">
              <span class="lang-dot" style="background:${color}"></span>${lang}
            </span>
            <span class="gh-repo-stars"><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span class="gh-repo-forks"><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            <span class="gh-repo-updated">Updated ${updated}</span>
          </div>
        </a>`;
    }).join('');

  } catch (err) {
    // Graceful error — never guess, never fake numbers
    ['ghRepos','ghStars','ghFollowers','ghFollowing'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = '—';
    });
    const grid = document.getElementById('ghReposGrid');
    if (grid) grid.innerHTML = `
      <p class="gh-api-error">
        <i class="fas fa-exclamation-triangle"></i>
        Unable to load repos.
        <a href="https://github.com/Mahajan-Sachin" target="_blank">View on GitHub →</a>
      </p>`;
    console.warn('GitHub API error:', err);
  }
}

