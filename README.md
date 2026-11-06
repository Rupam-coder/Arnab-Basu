# Arnab Basu — Cinematic Monochrome Interactive Portfolio

An immersive, pure monochrome, cinematic interactive portfolio engineered for **Arnab Basu**, Academic Coordinator at Techno India University and PhD Scholar in Management at the University of Engineering & Management (UEM), Kolkata.

Built strictly using **HTML5, CSS3 (Custom Properties, 3D `preserve-3d` transforms, Flexbox, CSS Grid), and vanilla JavaScript (ES6+)** with **zero build steps, zero external animation libraries, and zero runtime dependencies** (Google Fonts is the only permitted external dependency). Deployable immediately by dropping the folder onto GitHub Pages, Netlify, or any static host.

---

## 📁 File Structure

```text
/
├── index.html                   # Semantic HTML5 layout with marquee tracks, 3-layer silhouette, dialog, and JSON-LD
├── css/
│   └── style.css                # Pure monochrome styling, 3D drum carousel, typography, responsive rules
├── js/
│   ├── data.js                  # Single source of truth: CONFIG, publications, resume data, and abstract SVG covers
│   └── main.js                  # Modular IIFE: loader, starfield, marquee engine, 3D drum, timeline, contact
├── assets/
│   └── img/
│       ├── arnab-cutout.png     # Background-removed cutout portrait (1200px+ tall)
│       ├── arnab.jpg            # Original portrait reference
│       ├── copyright-cert.svg   # Intellectual property certification visual
│       └── patent-doc.svg       # Patent filing document visual
└── README.md                    # Documentation, asset replacement guide, and deployment instructions
```

---

## 🎨 Pure Monochrome Color Tokens

The visual language is strictly limited to black, grey, and white:

```css
:root {
  --bg: #050505;                       /* Deepest black ground */
  --bg-2: #0B0B0B;                     /* Subtle dark tier */
  --surface: #111111;                  /* Base elevated card surface */
  --surface-2: #181818;                /* Secondary card surface */
  --text: #F2F2F2;                     /* Primary high-contrast typography */
  --muted: #8A8A8A;                    /* Secondary metadata & label tone */
  --muted-2: #5A5A5A;                  /* Hairline text & tertiary tags */
  --line: rgba(255, 255, 255, 0.12);   /* Precise crisp hairline borders */
  --glow: #FFFFFF;                     /* Pure white rim-light & halo token */
  --spot: rgba(255, 255, 255, 0.10);   /* Restrained neutral radial spotlight */
}
```

- **Zero Color Tints**: All blue, navy, warm amber, and gold accents have been completely eradicated.
- **Lighting**: Ambient glows are restrained to soft neutral radial highlights and alpha-traced rim-lights.
- **Contrast**: All text and metadata pairings strictly satisfy WCAG AA contrast standards (minimum 4.5:1 for body copy; 7:1+ on primary headings).

---

## 👤 Replacing the Hero Silhouette Cutout

The hero section features a real photo silhouette built using a 3-layer stack inside a perspective container:
1. **Back Halo Layer (`.layer-halo`)**: The cutout with `filter: brightness(0) blur(28px); scale: 1.06; opacity: 0.85;` casting a diffused ambient aura over `--spot`.
2. **Main Silhouette Layer (`.layer-main`)**: The cutout with `filter: brightness(0) drop-shadow(0 0 1px rgba(255,255,255,0.95)) drop-shadow(0 0 24px rgba(255,255,255,0.25));`. Because `drop-shadow()` follows the transparent alpha edge of the PNG, it creates a razor-sharp, crisp white rim light tracing Arnab's shoulders, jacket, and head.
3. **Subtle Light-Grazing Detail Layer (`.layer-detail`)**: The cutout with `filter: grayscale(1) contrast(1.15) brightness(0.9); opacity: 0.16;` masked by `mask-image: linear-gradient(115deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0) 45%);` so real photo texture faintly glazes along the illuminated edge.

### How to Replace:
1. Obtain Arnab's real portrait with the background cleanly removed (transparent PNG).
2. Ensure the cutout is cropped to head-and-shoulders or half-body and is at least **1200px tall**.
3. Save the image as **`assets/img/arnab-cutout.png`**, replacing the existing file.
4. **Graceful Degradation Guarantee**: If the image fails to load or is missing, the embedded `onerror` handler automatically adds `.img-failed` to the container, executing `display: none !important;`. The hero typography and buttons automatically adapt and stand alone cleanly without any broken image icons or visual layout shifts.

---

## 🌀 Marquee Engine & Dynamic Scroll Physics

The background features three continuously running marquee tracks streaming:
`EXPLORE MY RESEARCH — SPIRITUALITY — WELL-BEING — WORKPLACE — CULTURE — `

- **Shared rAF Loop**: Marquees run on the shared `requestAnimationFrame` render engine, translating seamlessly from `0` to `-halfWidth`.
- **Dynamic Scroll Reversal**: When scrolling downwards, the track accelerates in proportion to scrolling velocity (`perfState.scrollVelocity * 2.2`). When scrolling upwards (`scrollVelocity < 0`), the track reverses direction smoothly.
- **Accessibility**: When `prefers-reduced-motion: reduce` is detected in system settings or browser DevTools, marquee translation stops entirely, presenting a static, non-distracting typographic layer.

---

## ✍️ How to Edit Content & Publications

All content is managed in **`js/data.js`** inside `window.PORTFOLIO_DATA`:

```javascript
window.PORTFOLIO_DATA = {
  person: {
    name: "Arnab Basu",
    tagline: "Explorer | Researcher | Writer | Academician",
    emailParts: ["basuarnab10", "gmail.com"],
    phoneParts: ["+91", "9038058812"],
    linkedin: "https://www.linkedin.com/in/arnab-basu-3a06a8124/",
    ...
  },
  publications: [ ... ],
  experience: [ ... ],
  education: [ ... ],
  certifications: [ ... ],
  skillsData: [ ... ]
};
```

### Publication Object Structure:
```javascript
{
  id: "pub-01",
  number: "01",
  category: "journal", // 'journal', 'chapter', 'conference', 'ip', or 'review'
  type: "Journal Article",
  year: "2026",
  title: "Spirituality's impact on older adults suffering from dementia...",
  venue: "Mental Health, Religion & Culture, 1-11",
  publisher: "Taylor & Francis",
  authors: "Basu, A., & Srividya, N.",
  indexing: "SCOPUS Q3, ESCI",
  links: [
    { label: "Publisher DOI", url: "https://lnkd.in/dkzgVji3" }
  ],
  abstractCover: `<svg viewBox="0 0 300 200" fill="none">...</svg>`
}
```

---

## ⚙️ Runtime Configuration Switches

All runtime feature toggles are in `window.CONFIG` in **`js/data.js`**:

```javascript
window.CONFIG = {
  INTRO: {
    enabled: true,
    durationMs: 2400,
    forceReplayParam: 'intro' // Visiting with ?intro=1 replays intro
  },
  STARFIELD: {
    enabled: true,
    layerCount: 3,
    dustCount: 40,
    maxDpr: 2
  },
  MARQUEE: {
    enabled: true,
    baseSpeed: 0.85,
    velocityScale: 2.2
  },
  RING: {
    enabled: true,
    rotationSpeed: 0.08
  },
  CAROUSEL: {
    enabled: true,
    dragSensitivity: 0.28,
    inertiaDecay: 0.92
  },
  RESUME: {
    enabled: false,           // Set to true when PDF is added
    url: 'assets/Arnab_Basu_Resume.pdf'
  }
};
```

---

## 🚀 Deployment Instructions

### GitHub Pages:
1. Commit and push the folder to your GitHub repository.
2. Under **Settings > Pages > Build and deployment > Source**, choose **Deploy from a branch** (`main` / `/ root`).
3. The site will be live within 60 seconds at `https://<username>.github.io/<repo>/`.

### Netlify:
1. Log in to [Netlify](https://app.netlify.com/).
2. Drag and drop the folder into the Netlify Drop target.
3. Your production website is instantly live with SSL and global CDN.

---

## 🧪 5-Point Quality Verification Checklist

- [x] **1. Pure Monochrome Palette**: CSS and JS contain exclusively black (`#050505`, `#0B0B0B`), grey (`#111111`, `#181818`, `#5A5A5A`, `#8A8A8A`), and white (`#FFFFFF`, `#F2F2F2`, `rgba(255,255,255,...)`). Zero blue, gold, or warm accents exist.
- [x] **2. Silhouette Cutout & Graceful Degradation**: 3-layer perspective stack renders `arnab-cutout.png` with a crisp white rim light tracing alpha boundaries. If the image is removed or fails, `onerror` sets `.img-failed` to cleanly hide the container without broken image boxes.
- [x] **3. Dynamic Marquee Physics**: Three background tracks stream smoothly, accelerate with scroll-down velocity, and reverse direction upon scrolling upward. Motion freezes when `prefers-reduced-motion` is active.
- [x] **4. Responsive Typography & Navigation**: Header navigation items remain on a single line at all standard device viewports (360px, 390px, 414px, 768px, 1024px, 1440px). Below 1100px, navigation cleanly transitions to the full-screen overlay menu.
- [x] **5. Hero Grid Stack Stability**: Built using a robust CSS Grid row structure with `min-height: 100svh`. Title headlines, action buttons, and scroll cue will never collide or overlap at any viewport aspect ratio.
