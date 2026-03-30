@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-serif: "Playfair Display", serif;
  
  --color-primary: #0F172A; /* Deep Navy */
  --color-primary-light: #1E293B;
  --color-accent: #B68D40; /* Refined Gold */
  --color-accent-light: #D4AF37;
  --color-background: #F8FAFC; /* Light Gray */
  --color-paper: #FFFFFF; /* Pure White */
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-background);
  color: #1A1A1A;
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}

::selection {
  background-color: var(--color-accent);
  color: var(--color-primary);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-primary);
}

::-webkit-scrollbar-thumb {
  background: var(--color-accent);
  border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-accent-light);
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  letter-spacing: -0.01em;
  color: var(--color-primary);
}

.glass-card {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(182, 141, 64, 0.1);
  box-shadow: 0 20px 50px rgba(0,0,0,0.05);
}

.text-balance {
  text-wrap: balance;
}

/* Advanced Background Grain */
.bg-grain {
  position: relative;
}

.bg-grain::before {
  content: "";
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  opacity: 0.02;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  z-index: 50;
}

/* Perspective for 3D effects */
.perspective-1000 {
  perspective: 1000px;
}

.transform-gpu {
  transform-style: preserve-3d;
}
