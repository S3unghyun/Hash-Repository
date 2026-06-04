@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
@import "tailwindcss";

@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  
  /* Brand Theme Colors */
  --color-brand-surface: #f7f9fb;
  --color-brand-surface-dim: #d8dadc;
  --color-brand-surface-bright: #f7f9fb;
  --color-brand-surface-lowest: #ffffff;
  --color-brand-surface-low: #f2f4f6;
  --color-brand-surface-container: #eceef0;
  --color-brand-surface-high: #e6e8ea;
  --color-brand-surface-highest: #e0e3e5;
  
  --color-brand-on-surface: #191c1e;
  --color-brand-on-surface-variant: #3d4a3d;
  --color-brand-outline: #6d7b6c;
  --color-brand-outline-variant: #bccbb9;
  
  --color-brand-primary: #006e2f;
  --color-brand-primary-container: #22c55e;
  --color-brand-on-primary-container: #004b1e;
  
  --color-brand-secondary: #505f76;
  --color-brand-on-secondary-container: #54647a;
}

@layer utilities {
  .safe-bottom {
    padding-bottom: env(safe-area-inset-bottom);
  }
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-brand-surface);
  color: var(--color-brand-on-surface);
}
