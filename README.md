# AI Tech — Company Landing Page

React + Vite + Tailwind CSS + Framer Motion. Clean, minimal light theme with smooth scrolling (Lenis), brand colours from the AI Tech logo.

## 1. Update your details (one file)

Open `src/config.js` and replace:

- `email` (not shown on the site, only the form fallback recipient), `location`
- `social` links (LinkedIn, Instagram, X)
- `web3formsKey` → get a free key at https://web3forms.com (enter your email, the key arrives in your inbox). Contact form messages then come straight to your email. Without a key, the form opens the visitor's email app.

## 2. Run locally

```bash
npm install
npm run dev        # http://localhost:5173
```

## 3. Deploy (any static host)

The site is a plain static build (`npm run build` → `dist/`) with relative asset paths and no server or router, so it works on any host. Requires Node 20.19+ (see `.nvmrc`).

| Host | How |
|---|---|
| **Vercel** | Import the repo. Settings come from `vercel.json`. |
| **Netlify** | Import the repo. Settings come from `netlify.toml`. |
| **GitHub Pages** | Repo → Settings → Pages → Source: *GitHub Actions*. `.github/workflows/deploy.yml` deploys on every push to `main`. |
| **Cloudflare Pages / others** | Build command `npm run build`, output directory `dist`. |
| **Drag & drop** | Run `npm run build`, then drop the `dist` folder on https://app.netlify.com/drop. |

Custom domain: add it in your host's Domains settings, then add the DNS records it shows at your registrar.

Before going live, also set an absolute `og:image` URL in `index.html` (e.g. `https://yourdomain.com/logo.png`) so link previews work.

## Where things are

| File | What it contains |
|---|---|
| `src/config.js` | Location, socials, form key |
| `src/components/Header.jsx` | Navbar (collapses to logo + hamburger on scroll) |
| `src/components/Hero.jsx` | Hero slider (3 slides, text + visuals + backgrounds) |
| `src/components/Sections.jsx` | Highlights, About, Solutions, How We Work, Why AI Tech |
| `src/components/Contact.jsx` | Contact form, CTA, footer |
| `src/components/ui.jsx` | Shared pieces (Reveal, PlainHeading, Aurora, icons) |
| `src/index.css` | Brand colours and shared styles |
| `public/` | Logo, favicons, robots.txt |
