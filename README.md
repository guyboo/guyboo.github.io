[style.css](https://github.com/user-attachments/files/26669332/style.css)
/* ============================================================
   GUYBOO — Guy Bou Samra
   Brand palette: Jet Black (#0a0a0a), Cream (#f5f0e8), 
   Accent Cyan (#00c8d4), Accent Purple (#b06eff)
   Fonts: Clash Display (headings) + Satoshi (body)
   ============================================================ */

/* ── DESIGN TOKENS ── */
:root,
[data-theme="light"] {
  /* Surfaces */
  --color-bg: #f5f0e8;
  --color-surface: #faf8f3;
  --color-surface-2: #ffffff;
  --color-surface-offset: #ede8de;
  --color-divider: #ddd8ce;
  --color-border: #ccc7bd;

  /* Text */
  --color-text: #0a0a0a;
  --color-text-muted: #5a5650;
  --color-text-faint: #aaa59e;
  --color-text-inverse: #f5f0e8;

  /* Brand Accents */
  --color-primary: #0a0a0a;
  --color-primary-hover: #2a2520;
  --color-accent-cyan: #00adb5;
  --color-accent-purple: #9b59d0;
  --color-accent-cyan-vivid: #00c8d4;
  --color-accent-purple-vivid: #b06eff;

  /* Semantic */
  --color-jet: #0a0a0a;
  --color-cream: #f5f0e8;
  --color-dark-surface: #141210;

  /* Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1.25rem;
  --radius-full: 9999px;

  /* Transitions */
  --transition: 180ms cubic-bezier(0.16, 1, 0.3, 1);

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(10,10,10,0.06);
  --shadow-md: 0 4px 16px rgba(10,10,10,0.08);
  --shadow-lg: 0 12px 40px rgba(10,10,10,0.12);

  /* Type Scale */
  --text-xs: clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem);
  --text-sm: clamp(0.875rem, 0.8rem + 0.35vw, 1rem);
  --text-base: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --text-lg: clamp(1.125rem, 1rem + 0.75vw, 1.5rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.25vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.2rem + 2.5vw, 3.5rem);
  --text-3xl: clamp(2.5rem, 1rem + 4vw, 5rem);
  --text-hero: clamp(3.5rem, 1rem + 7vw, 9rem);

  /* Spacing */
  --space-1: 0.25rem;
  --space-2: 0.5rem;
  --space-3: 0.75rem;
  --space-4: 1rem;
  --space-5: 1.25rem;
  --space-6: 1.5rem;
  --space-8: 2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;
  --space-32: 8rem;

  /* Content widths */
  --content-narrow: 640px;
  --content-default: 960px;
  --content-wide: 1200px;

  /* Fonts */
  --font-display: 'Clash Display', 'Arial Black', sans-serif;
  --font-body: 'Satoshi', 'Inter', sans-serif;
}

[data-theme="dark"] {
  --color-bg: #111009;
  --color-surface: #181612;
  --color-surface-2: #1e1c17;
  --color-surface-offset: #141210;
  --color-divider: #282520;
  --color-border: #353028;
  --color-text: #e8e3d8;
  --color-text-muted: #807b72;
  --color-text-faint: #4a4740;
  --color-text-inverse: #0a0a0a;
  --color-primary: #e8e3d8;
  --color-primary-hover: #c8c3b8;
  --color-accent-cyan: #00c8d4;
  --color-accent-purple: #b06eff;
  --color-dark-surface: #0a0907;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.4);
  --shadow-lg: 0 12px 40px rgba(0,0,0,0.5);
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    --color-bg: #111009;
    --color-surface: #181612;
    --color-surface-2: #1e1c17;
    --color-surface-offset: #141210;
    --color-divider: #282520;
    --color-border: #353028;
    --color-text: #e8e3d8;
    --color-text-muted: #807b72;
    --color-text-faint: #4a4740;
    --color-text-inverse: #0a0a0a;
    --color-primary: #e8e3d8;
    --color-primary-hover: #c8c3b8;
    --color-accent-cyan: #00c8d4;
    --color-accent-purple: #b06eff;
  }
}

/* ── BASE ── */
*,*::before,*::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  scroll-behavior: smooth;
  scroll-padding-top: var(--space-16);
}

body {
  min-height: 100dvh;
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-text);
  background-color: var(--color-bg);
  line-height: 1.65;
  transition: background-color 0.3s ease, color 0.3s ease;
}

img, picture, video, canvas, svg { display: block; max-width: 100%; height: auto; }
ul[role="list"], ol[role="list"] { list-style: none; }
input,button,textarea,select { font: inherit; color: inherit; }

h1,h2,h3,h4,h5,h6 {
  font-family: var(--font-display);
  text-wrap: balance;
  line-height: 1.08;
  letter-spacing: -0.02em;
}

p, li, figcaption { text-wrap: pretty; max-width: 72ch; }

::selection { background: rgba(0,200,212,0.2); color: var(--color-text); }

:focus-visible {
  outline: 2px solid var(--color-accent-cyan);
  outline-offset: 3px;
  border-radius: var(--radius-sm);
}

a { color: inherit; text-decoration: none; }

@media (prefers-reduced-motion: reduce) {
  *,*::before,*::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

button { cursor: pointer; background: none; border: none; }

/* ── CONTAINER ── */
.container {
  width: 100%;
  max-width: var(--content-wide);
  margin-inline: auto;
  padding-inline: clamp(var(--space-5), 5vw, var(--space-16));
}

/* ── BUTTONS ── */
.btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-6);
  font-family: var(--font-body);
  font-size: var(--text-sm);
  font-weight: 600;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: all var(--transition);
  white-space: nowrap;
  letter-spacing: 0.01em;
  text-decoration: none;
}
.btn-large { padding: var(--space-4) var(--space-8); font-size: var(--text-base); }

.btn-primary {
  background: var(--color-jet);
  color: var(--color-cream);
  border: 2px solid var(--color-jet);
}
.btn-primary:hover { background: #2a2520; border-color: #2a2520; transform: translateY(-1px); box-shadow: var(--shadow-md); }

.btn-ghost {
  background: rgba(245,240,232,0.12);
  color: #fff;
  border: 2px solid rgba(245,240,232,0.35);
}
.btn-ghost:hover { border-color: rgba(245,240,232,0.7); background: rgba(245,240,232,0.18); transform: translateY(-1px); }

.btn-outline-light {
  background: transparent;
  color: #fff;
  border: 2px solid rgba(255,255,255,0.5);
}
.btn-outline-light:hover { border-color: #fff; background: rgba(255,255,255,0.1); }

.btn-ghost-light {
  background: transparent;
  color: rgba(255,255,255,0.7);
  border: 2px solid transparent;
  padding-inline: var(--space-4);
}
.btn-ghost-light:hover { color: #fff; }

/* ── SECTION COMMON ── */
.section-eyebrow {
  font-family: var(--font-body);
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  margin-bottom: var(--space-3);
}
.section-eyebrow--light { color: rgba(255,255,255,0.55); }

.section-title {
  font-size: var(--text-2xl);
  margin-bottom: var(--space-10);
  color: var(--color-text);
}
.section-title--light { color: #fff; }

.label {
  display: inline-block;
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  background: var(--color-surface);
}

/* ── NAV ── */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: color-mix(in oklab, var(--color-bg) 90%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--color-divider);
  transition: box-shadow var(--transition), background var(--transition);
}
.header--scrolled { box-shadow: var(--shadow-sm); }

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-8);
  height: 64px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  color: var(--color-text);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 600;
  letter-spacing: -0.02em;
  flex-shrink: 0;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  list-style: none;
}
.nav-links a {
  font-size: var(--text-sm);
  font-weight: 500;
  color: var(--color-text-muted);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  transition: color var(--transition), background var(--transition);
}
.nav-links a:hover { color: var(--color-text); background: var(--color-surface-offset); }
.nav-cta {
  background: var(--color-jet) !important;
  color: var(--color-cream) !important;
  border-radius: var(--radius-full) !important;
  font-weight: 700 !important;
  padding: var(--space-2) var(--space-5) !important;
  font-size: var(--text-sm) !important;
}
.nav-cta:hover { background: #2a2520 !important; transform: translateY(-1px); }

.nav-actions { display: flex; align-items: center; gap: var(--space-2); }

.theme-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-full);
  color: var(--color-text-muted);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  transition: all var(--transition);
}
.theme-toggle:hover { color: var(--color-text); background: var(--color-surface-offset); }

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 36px;
  height: 36px;
  padding: 8px;
  border-radius: var(--radius-md);
  background: var(--color-surface);
  border: 1px solid var(--color-border);
}
.hamburger span {
  display: block;
  height: 2px;
  background: var(--color-text);
  border-radius: 2px;
  transition: all 0.25s;
}
.hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
.hamburger.open span:nth-child(2) { opacity: 0; }
.hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

.mobile-menu {
  display: none;
  background: var(--color-surface);
  border-top: 1px solid var(--color-divider);
  padding: var(--space-6);
}
.mobile-menu ul { display: flex; flex-direction: column; gap: var(--space-2); list-style: none; }
.mobile-link {
  display: block;
  font-size: var(--text-base);
  font-weight: 500;
  padding: var(--space-3);
  border-radius: var(--radius-md);
  color: var(--color-text);
  transition: background var(--transition);
}
.mobile-link:hover { background: var(--color-surface-offset); }
.mobile-cta {
  background: var(--color-jet);
  color: var(--color-cream) !important;
  font-weight: 700;
  text-align: center;
  border-radius: var(--radius-full);
  margin-top: var(--space-2);
}
.mobile-menu.open { display: block; }

/* ── HERO ── */
.hero {
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: var(--color-jet);
  color: var(--color-cream);
  overflow: hidden;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 60% 60% at 80% 50%, rgba(0,200,212,0.08) 0%, transparent 70%),
              radial-gradient(ellipse 50% 50% at 20% 80%, rgba(176,110,255,0.06) 0%, transparent 70%);
  pointer-events: none;
}

.hero-inner {
  padding-block: clamp(var(--space-16), 10vw, var(--space-32));
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-12);
  align-items: end;
  position: relative;
  z-index: 1;
}

.hero-labels {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}
.hero .label {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.15);
  color: rgba(255,255,255,0.65);
}

.hero-heading {
  grid-column: 1;
  align-self: start;
}

.hero-name {
  display: block;
  font-size: var(--text-hero);
  font-weight: 700;
  color: #fff;
  line-height: 0.95;
  letter-spacing: -0.03em;
}

.hero-sub {
  grid-column: 2;
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  align-self: end;
  padding-bottom: var(--space-4);
}

.hero-tagline {
  font-size: var(--text-lg);
  color: rgba(255,255,255,0.75);
  line-height: 1.55;
  max-width: 52ch;
}
.hero-tagline strong { color: #fff; }

.hero-actions { display: flex; flex-wrap: wrap; gap: var(--space-3); }

/* Ticker */
.hero-ticker {
  border-top: 1px solid rgba(255,255,255,0.1);
  overflow: hidden;
  padding-block: var(--space-4);
  position: relative;
  z-index: 1;
  mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
}
.ticker-track {
  display: flex;
  gap: var(--space-8);
  animation: ticker 28s linear infinite;
  white-space: nowrap;
  width: max-content;
}
.ticker-track span {
  font-size: var(--text-sm);
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}
.ticker-track .dot { color: var(--color-accent-cyan); }

@keyframes ticker {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

/* ── ABOUT ── */
.about {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: var(--color-bg);
}
.about-grid {
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: clamp(var(--space-10), 6vw, var(--space-24));
  align-items: start;
}
.about-headline {
  font-size: var(--text-2xl);
  line-height: 1.05;
  position: sticky;
  top: var(--space-20);
}
.about-pillars {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
  list-style: none;
}
.about-pillars li {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  gap: var(--space-4);
  align-items: start;
  padding-bottom: var(--space-8);
  border-bottom: 1px solid var(--color-divider);
}
.about-pillars li:last-child { border-bottom: none; }
.pillar-num {
  font-family: var(--font-display);
  font-size: var(--text-sm);
  font-weight: 700;
  color: var(--color-text-faint);
  padding-top: 0.2em;
}
.about-pillars strong {
  display: block;
  font-size: var(--text-lg);
  font-family: var(--font-display);
  font-weight: 600;
  margin-bottom: var(--space-2);
}
.about-pillars p { color: var(--color-text-muted); font-size: var(--text-base); }

/* ── SERVICES ── */
.services {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: var(--color-jet);
  color: var(--color-cream);
}
.services .section-eyebrow { color: rgba(245,240,232,0.4); }
.services .section-title { color: #fff; }

.section-header { margin-bottom: var(--space-12); }
.services-categories {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}
.service-cat {
  font-size: var(--text-xs);
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding: var(--space-1) var(--space-3);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: var(--radius-full);
  color: rgba(255,255,255,0.55);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.service-card {
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  transition: all var(--transition);
}
.service-card:hover {
  background: rgba(255,255,255,0.07);
  border-color: rgba(255,255,255,0.16);
  transform: translateY(-3px);
}
.service-card--featured {
  background: var(--color-accent-cyan);
  border-color: var(--color-accent-cyan);
  color: var(--color-jet);
}
.service-card--featured:hover { background: #00adb5; border-color: #00adb5; }

.service-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.08);
  border-radius: var(--radius-md);
  margin-bottom: var(--space-5);
}
.service-card--featured .service-icon { background: rgba(10,10,10,0.12); }
.service-card--featured .service-icon svg { stroke: var(--color-jet); }

.service-card h3 {
  font-size: var(--text-lg);
  font-weight: 700;
  margin-bottom: var(--space-3);
  color: #fff;
}
.service-card--featured h3 { color: var(--color-jet); }
.service-card p {
  font-size: var(--text-sm);
  color: rgba(245,240,232,0.6);
  line-height: 1.65;
}
.service-card--featured p { color: rgba(10,10,10,0.75); }

/* ── I WORK WITH ── */
.work-with {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: var(--color-bg);
}
.brands-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}
.brand-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8) var(--space-6);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: all var(--transition);
}
.brand-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
.brand-card--accent {
  background: var(--color-jet);
  border-color: var(--color-jet);
  color: var(--color-cream);
}
.brand-card--accent .brand-icon { color: var(--color-accent-cyan); }

.brand-icon {
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-muted);
}
.brand-card h3 {
  font-size: var(--text-base);
  font-weight: 500;
  line-height: 1.3;
}
.brand-card h3 strong {
  display: block;
  font-size: var(--text-lg);
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: 0.06em;
}
.brand-card p { font-size: var(--text-sm); color: var(--color-text-muted); }
.brand-card--accent p { color: rgba(245,240,232,0.65); }

/* ── MY EDGE ── */
.edge {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: #0f0e0c;
  color: var(--color-cream);
}
.edge-header { margin-bottom: var(--space-12); }
.edge-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}
.edge-item {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  transition: all var(--transition);
}
.edge-item:hover { background: rgba(255,255,255,0.055); border-color: rgba(255,255,255,0.12); }
.edge-item p { font-size: var(--text-base); color: rgba(245,240,232,0.65); line-height: 1.65; }

.edge-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 700;
  line-height: 1.3;
}
.edge-tag--cyan { background: var(--color-accent-cyan); color: var(--color-jet); }
.edge-tag--purple { background: var(--color-accent-purple); color: #fff; }
.edge-tag--dark { background: rgba(255,255,255,0.1); color: #fff; }

/* ── SUCCESS STORIES ── */
.stories {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: var(--color-bg);
}
.stories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
}
.story-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  transition: all var(--transition);
}
.story-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

.story-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.story-client {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-family: var(--font-display);
  font-size: var(--text-lg);
  font-weight: 700;
}
.story-type {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}
.story-challenge {
  font-size: var(--text-sm);
  color: var(--color-text-muted);
  line-height: 1.6;
  padding: var(--space-4);
  background: var(--color-surface-offset);
  border-radius: var(--radius-md);
  border-left: 3px solid var(--color-divider);
}
.story-results {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: auto;
}
.result-stat {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}
.result-stat strong {
  font-family: var(--font-display);
  font-size: var(--text-xl);
  font-weight: 700;
  color: var(--color-jet);
  line-height: 1;
}
[data-theme="dark"] .result-stat strong { color: var(--color-accent-cyan); }
.result-stat span {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  line-height: 1.4;
}

/* ── TESTIMONIALS ── */
.testimonials {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: var(--color-surface);
  border-top: 1px solid var(--color-divider);
  border-bottom: 1px solid var(--color-divider);
}
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
blockquote.testimonial {
  background: var(--color-bg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: var(--space-6);
  transition: all var(--transition);
}
blockquote.testimonial:hover { transform: translateY(-3px); box-shadow: var(--shadow-md); }
.testimonial--large {
  grid-column: span 2;
  background: var(--color-jet);
  border-color: transparent;
}
.testimonial p {
  font-size: var(--text-base);
  color: var(--color-text-muted);
  font-style: italic;
  line-height: 1.7;
}
.testimonial--large p { color: rgba(245,240,232,0.8); font-size: var(--text-lg); }

.testimonial footer {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex-wrap: wrap;
}
.testimonial cite {
  font-style: normal;
  font-weight: 700;
  font-size: var(--text-sm);
  color: var(--color-text);
}
.testimonial--large cite { color: #fff; }
.testimonial-company {
  font-size: var(--text-xs);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text-muted);
  padding: 2px var(--space-2);
  background: var(--color-surface-offset);
  border-radius: var(--radius-sm);
}
.testimonial--large .testimonial-company {
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.55);
}

/* ── CLIENTS ── */
.clients {
  padding-block: clamp(var(--space-10), 5vw, var(--space-20));
  background: var(--color-bg);
}
.clients .section-eyebrow { text-align: center; margin-bottom: var(--space-8); }
.clients-logos {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-4) var(--space-8);
  justify-content: center;
  align-items: center;
}
.client-name {
  font-family: var(--font-display);
  font-size: var(--text-base);
  font-weight: 700;
  color: var(--color-text-faint);
  letter-spacing: -0.01em;
  transition: color var(--transition);
}
.client-name:hover { color: var(--color-text-muted); }

/* ── ENGAGEMENT ── */
.engagement {
  padding-block: clamp(var(--space-16), 8vw, var(--space-32));
  background: var(--color-bg);
}
.engagement-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}
.engagement-card {
  border-radius: var(--radius-xl);
  padding: var(--space-10) var(--space-8);
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  transition: all var(--transition);
}
.engagement-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }

.engagement-card--dark {
  background: var(--color-jet);
  color: var(--color-cream);
}
.engagement-card--cyan {
  background: var(--color-accent-cyan);
  color: var(--color-jet);
}
.engagement-card--purple {
  background: var(--color-accent-purple);
  color: #fff;
}

.engagement-tag {
  display: inline-flex;
  align-self: flex-start;
  padding: var(--space-2) var(--space-5);
  border-radius: var(--radius-full);
  font-size: var(--text-sm);
  font-weight: 800;
  letter-spacing: 0.01em;
}
.engagement-tag--dark { background: rgba(255,255,255,0.1); color: #fff; }
.engagement-tag--cyan { background: rgba(0,0,0,0.12); color: var(--color-jet); }
.engagement-tag--purple { background: rgba(255,255,255,0.15); color: #fff; }

.engagement-desc {
  font-size: var(--text-base);
  line-height: 1.65;
  opacity: 0.85;
}
.engagement-fit {
  font-size: var(--text-sm);
  line-height: 1.6;
  opacity: 0.6;
  margin-top: auto;
  padding-top: var(--space-4);
  border-top: 1px solid rgba(255,255,255,0.1);
}
.engagement-card--cyan .engagement-fit { border-color: rgba(0,0,0,0.1); }

/* ── CONTACT ── */
.contact {
  padding-block: clamp(var(--space-20), 10vw, var(--space-32));
  background: var(--color-jet);
  color: var(--color-cream);
  position: relative;
  overflow: hidden;
}
.contact::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(ellipse 50% 80% at 50% 50%, rgba(0,200,212,0.07) 0%, transparent 70%);
  pointer-events: none;
}
.contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: clamp(var(--space-12), 6vw, var(--space-24));
  align-items: center;
  position: relative;
  z-index: 1;
}
.contact-heading {
  font-size: var(--text-2xl);
  color: #fff;
  margin-top: var(--space-3);
  margin-bottom: var(--space-3);
}
.contact-sub {
  font-size: var(--text-base);
  color: rgba(245,240,232,0.55);
}
.contact-actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  align-items: flex-start;
}

/* ── FOOTER ── */
.footer {
  background: #070605;
  padding-block: var(--space-8);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.footer-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
}
.footer-brand,
.footer-tagline {
  font-size: var(--text-xs);
  color: rgba(245,240,232,0.3);
}
.footer-links {
  display: flex;
  gap: var(--space-5);
}
.footer-links a {
  font-size: var(--text-xs);
  color: rgba(245,240,232,0.3);
  transition: color var(--transition);
}
.footer-links a:hover { color: rgba(245,240,232,0.8); }

/* ── SCROLL ANIMATIONS ── */
.fade-up {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.55s cubic-bezier(0.16, 1, 0.3, 1), transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up.visible { opacity: 1; transform: translateY(0); }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .services-grid { grid-template-columns: repeat(2, 1fr); }
  .brands-grid { grid-template-columns: repeat(2, 1fr); }
  .testimonials-grid { grid-template-columns: 1fr; }
  .testimonial--large { grid-column: span 1; }
  .engagement-grid { grid-template-columns: 1fr; }
  .contact-inner { grid-template-columns: 1fr; }
  .stories-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .hamburger { display: flex; }

  .hero-inner {
    grid-template-columns: 1fr;
    gap: var(--space-8);
  }
  .hero-heading, .hero-sub { grid-column: 1; }

  .about-grid { grid-template-columns: 1fr; }
  .about-headline { position: static; }

  .services-grid { grid-template-columns: 1fr; }
  .brands-grid { grid-template-columns: repeat(2, 1fr); }
  .edge-grid { grid-template-columns: 1fr; }
  .footer-inner { flex-direction: column; align-items: flex-start; }
}

@media (max-width: 480px) {
  .brands-grid { grid-template-columns: 1fr; }
  .story-results { grid-template-columns: 1fr; }
  .hero-actions { flex-direction: column; align-items: flex-start; }
  .contact-actions { width: 100%; }
  .contact-actions .btn { width: 100%; justify-content: center; }
}
