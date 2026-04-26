# Deployment Guide — One-time hosting setup

You'll do this once. After that, publishing is just `./publish.sh "msg"`.

**Total cost:** $10–12/year for the domain. Hosting is free.

**Total time:** ~30 minutes if it's your first time.

---

## Step 1 — Install the basics on your laptop

You said you have VS Code already. You also need:

### Node.js 20+
```bash
# macOS (using Homebrew)
brew install node

# Or download installer from https://nodejs.org
```

Verify: `node --version` should print `v20.x.x` or higher.

### Git
```bash
# macOS — likely already installed. Check with:
git --version

# If not:
brew install git
```

### A GitHub account
Sign up at https://github.com if you don't have one. Free.

---

## Step 2 — Get the code running locally

```bash
# Unzip this folder somewhere — e.g. ~/Code/mnueman-blog
cd ~/Code/mnueman-blog
npm install                # ~1 minute, downloads dependencies
npm run dev                # starts local server
```

Open http://localhost:4321 — you should see the blog with the sample article. Press Ctrl+C to stop the server.

---

## Step 3 — Push the code to GitHub

```bash
# Initialize git
git init
git add .
git commit -m "initial commit"
```

Now, on GitHub.com:
1. Click **+** → **New repository**
2. Name it `mnueman-blog` (or `mnueman.dev` — anything)
3. Keep it **public** (showing your blog source is part of the credibility signal)
4. Don't initialize with a README — we already have one
5. Click **Create repository**
6. Copy the commands GitHub shows you under "push an existing repository":

```bash
git remote add origin https://github.com/YOUR-USERNAME/mnueman-blog.git
git branch -M main
git push -u origin main
```

Refresh your repo page — your code is on GitHub.

---

## Step 4 — Buy a domain

Recommended: **Cloudflare Registrar** — they sell at cost, no markup, free WHOIS privacy.

1. Sign up at https://dash.cloudflare.com (free)
2. Top-right → **Add a site** → **Register a new domain**
3. Search `mnueman.dev` (or `.com`, `.io`, `.security` — your call)
4. ~$10/year for `.dev` or `.com`. Buy it.

If you'd rather use Namecheap or another registrar, that works too — you'll just need to point the nameservers at Cloudflare later. Cloudflare-direct is simpler.

---

## Step 5 — Deploy with Cloudflare Pages

Still in Cloudflare dashboard:

1. Left sidebar → **Workers & Pages**
2. **Create application** → **Pages** → **Connect to Git**
3. Authorize Cloudflare to read your GitHub
4. Select your `mnueman-blog` repo
5. Configure build:
   - **Framework preset:** `Astro`
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - Leave everything else default
6. Click **Save and Deploy**

~2 minutes later, your site is live at `mnueman-blog.pages.dev`. Click the URL — that's your blog.

---

## Step 6 — Connect your domain

1. In your Pages project, go to **Custom domains** → **Set up a custom domain**
2. Enter `mnueman.dev` (and also add `www.mnueman.dev` after for the redirect)
3. Cloudflare auto-configures DNS since you bought the domain through them. Click confirm.
4. Wait 1–2 minutes. SSL provisions automatically.

Test: open https://mnueman.dev — your blog, on your domain, with HTTPS. Done.

---

## Step 7 — Set up the publish script

Make `publish.sh` executable (one-time):

```bash
chmod +x publish.sh
```

From now on, your daily workflow is:

```bash
# write a post in src/content/posts/
./publish.sh "post: title of article"
# wait ~30 seconds → live on mnueman.dev
```

---

## Step 8 (optional) — Analytics

In Cloudflare dashboard → your domain → **Analytics & Logs** → **Web Analytics** → **Enable**.

Free, no cookie banner needed (Cloudflare doesn't use cookies for it), GDPR-clean. You'll see page views, top posts, referrers.

---

## Troubleshooting

**Build fails on Cloudflare Pages**
- Check the build log in the dashboard. 99% of the time it's a typo in frontmatter or a broken Markdown link.
- The previous version stays live until the new build succeeds. Hard to actually break the live site.

**Local dev server says "port 4321 in use"**
- Another instance is running. `pkill -f astro` will kill it.

**Domain not resolving**
- DNS can take up to 5 minutes globally. If it's been longer, double-check the Custom Domain config in Pages.

**`./publish.sh` says permission denied**
- You forgot Step 7's `chmod +x publish.sh`. Run it.

---

## Updating the design later

If you want to change the design (colors, fonts, layout), edit `src/styles/global.css` or the `.astro` files in `src/components/`. Push, and the change is live in 30s.

If you want me to help with bigger changes — new pages, new components, redesign — just open a fresh chat and reference this project. I have all the context.
