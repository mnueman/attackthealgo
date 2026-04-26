# mnueman.dev — personal blog

A static blog built with [Astro](https://astro.build). Write posts in Markdown, push to GitHub, the site rebuilds automatically.

> **Looking for the publishing workflow? See [`PUBLISHING.md`](./PUBLISHING.md).**

---

## What's in here

```
.
├── PUBLISHING.md         ← read this first — how to write & ship a post
├── DEPLOYMENT.md         ← one-time setup: GitHub + Cloudflare Pages + domain
├── publish.sh            ← one-command publish script (./publish.sh "msg")
├── astro.config.mjs      ← site config (URL, integrations)
├── package.json          ← npm dependencies
├── tsconfig.json
├── .gitignore
├── public/               ← favicon, robots.txt, static assets
│   └── favicon.svg
└── src/
    ├── content/
    │   ├── config.ts     ← post schema (title, date, tags, etc.)
    │   └── posts/        ← YOUR ARTICLES LIVE HERE (.md files)
    │       ├── ai-security-everyday-model.md
    │       └── images/   ← drop article images here
    ├── data/
    │   ├── bio.ts        ← your bio + currently/role/links
    │   ├── certs.ts      ← certifications (CISSP, OSCP, etc.)
    │   └── experience.ts ← work history
    ├── styles/
    │   └── global.css    ← all the design system styles
    ├── components/
    │   ├── Header.astro
    │   ├── Footer.astro
    │   ├── TerminalHero.astro
    │   ├── Featured.astro
    │   ├── PostCard.astro
    │   └── TableOfContents.astro
    ├── layouts/
    │   ├── Base.astro    ← <html><head> shell, OG tags, fonts
    │   └── Article.astro ← article page wrapper w/ TOC
    └── pages/
        ├── index.astro       ← / — home
        ├── about.astro       ← /about
        ├── tags/index.astro  ← /tags — all topics
        ├── tags/[tag].astro  ← /tags/cloud — posts for one tag
        ├── posts/[...slug].astro ← /posts/ai-security-everyday-model
        ├── 404.astro
        └── rss.xml.js        ← /rss.xml — RSS feed
```

## First-time setup (one-time, ~15 minutes)

1. Install Node.js 20+ from https://nodejs.org if you don't have it.
2. Open this folder in VS Code, then in the terminal (Ctrl+`) run:
   ```bash
   npm install
   ```
3. Start the local dev server:
   ```bash
   npm run dev
   ```
4. Open http://localhost:4321 in your browser. You should see your site.

## Publishing & deployment

- **Day-to-day writing** → [`PUBLISHING.md`](./PUBLISHING.md)
- **One-time hosting setup** → [`DEPLOYMENT.md`](./DEPLOYMENT.md)

## Commands cheatsheet

| Command | What it does |
|---|---|
| `npm run dev` | Start local dev server (http://localhost:4321) |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `./publish.sh "post: AI security"` | Commit, push, deploy (after first-time setup) |
