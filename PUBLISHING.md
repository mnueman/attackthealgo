# Publishing Guide — mnueman.dev

Everything you need to write and publish an article. Print this if you want, or keep the tab open.

---

## Writing a new post (the 60-second version)

1. Open the project in VS Code
2. In `src/content/posts/`, make a new file: `slug-of-your-post.md`
3. Paste this template at the top:
   ```
   ---
   title: "Your title here"
   date: 2026-04-26
   tags: ["ai", "detection-eng"]
   excerpt: "One sentence shown on the home page."
   readTime: 8
   pinned: false
   draft: true
   ---

   Write your article here. Use Markdown.
   ```
4. Write. Save.
5. Run `npm run dev` to preview at http://localhost:4321 — your post appears live as you type.
6. When ready, change `draft: true` to `draft: false`.
7. Run `./publish.sh "post: your title"` — your site rebuilds and deploys in ~30 seconds.

That's it.

---

## Markdown crash-course (everything you'll actually use)

```markdown
# Heading 1 (don't use this — title comes from frontmatter)
## Heading 2
### Heading 3

A normal paragraph. **Bold** and *italic* and `inline code`.

> A blockquote — for callouts, pull-quotes, "I asked a CISO about this" moments.

- bullet list
- another bullet
  - indented sub-bullet

1. numbered list
2. second item

[Link text](https://example.com)

![Alt text describing the image](./images/screenshot.png)

---  ← horizontal rule (three dashes on their own line)
```

### Code blocks (with syntax highlighting)

Wrap code in triple backticks and tag the language:

````markdown
```python
def detect_anomaly(events):
    return [e for e in events if e.score > THRESHOLD]
```
````

Supported languages include: `python`, `javascript`, `typescript`, `bash`, `json`, `yaml`, `sql`, `go`, `rust`, `c`, `powershell`, `ruby`, `html`, `css`, `diff` — basically anything popular.

To highlight specific lines:

````markdown
```python {2,5-7}
import requests
def fetch(url):  ← line 2 highlighted
    r = requests.get(url)
    r.raise_for_status()
    if r.status_code == 200:  ← lines 5-7 highlighted
        return r.json()
    return None
```
````

---

## Images

1. Drop the file into `src/content/posts/images/` next to your post.
2. Reference it in your article: `![alt text](./images/screenshot.png)`
3. Save. It just works — Astro automatically optimizes (compresses, resizes, generates webp).

For the social card preview that shows when you paste your URL in LinkedIn, set a `cover` field in frontmatter:

```
---
title: "..."
cover: "./images/cover.png"
---
```

If you don't set `cover`, a default OG image with your blog logo is used.

---

## Videos

Three options, easiest first:

### 1. YouTube embed (free, simple)
```markdown
::youtube{id="dQw4w9WgXcQ"}
```

### 2. Self-hosted MP4 (for short clips, < 50MB)
Drop into `src/content/posts/videos/`, then:
```markdown
<video src="./videos/demo.mp4" controls muted></video>
```

### 3. Cloudflare Stream (for longer videos, $5/mo)
Upload via Cloudflare dashboard, paste the embed code they give you.

---

## Frontmatter reference (the `---` block at the top)

| Field | Required | Example | Notes |
|---|---|---|---|
| `title` | yes | `"AI Security: Securing the Everyday Model"` | Wrap in quotes |
| `date` | yes | `2026-04-26` | YYYY-MM-DD |
| `tags` | yes | `["ai", "detection-eng"]` | Lowercase, hyphens. See list below. |
| `excerpt` | yes | `"One-sentence summary."` | Shown on home + tag pages |
| `readTime` | yes | `8` | Estimated minutes |
| `pinned` | no | `true` | If true, this post becomes the Featured article on home |
| `draft` | no | `true` | If true, post doesn't appear publicly |
| `cover` | no | `"./images/cover.png"` | Custom social card image |
| `series` | no | `"AI Security"` | Groups posts in a series — shown above the title |

### Available tags

These match the tag pills on the home page. Add/remove in `src/data/tags.ts`:
- `ai` — AI/ML security
- `cloud` — AWS / GCP / Azure
- `detection-eng` — building detections, SIEM rules
- `ir` — incident response
- `threat-hunting` — proactive hunting
- `red-team` — offensive
- `tools` — tooling, scripts, automation
- `career` — career notes, mentoring

---

## The `./publish.sh` shortcut

After your first deploy, this is your daily workflow:

```bash
./publish.sh "post: AI security article"
```

It does three things:
1. `git add .`
2. `git commit -m "post: AI security article"`
3. `git push`

Cloudflare Pages picks up the push and rebuilds your site automatically. ~30 seconds later, the new post is live at `mnueman.dev/posts/your-slug`.

If you don't pass a message, it'll prompt you for one.

---

## Drafts & scheduled posts

- **Drafts:** `draft: true` in frontmatter — the post is built locally (you can preview it) but not deployed.
- **Scheduled:** set `date:` to a future date. Astro builds it but it won't be linked from the index until that date passes. (Requires a daily auto-rebuild, which Cloudflare Pages can do via cron — see `DEPLOYMENT.md`.)

---

## Common mistakes (so you don't have to make them)

- **Forgot to remove `draft: true`** — post never appears live. Run `npm run dev` first to preview, then flip the flag.
- **Date is in the future** — same effect; post is hidden until that date.
- **Tag isn't in `src/data/tags.ts`** — the build won't fail, but the tag page won't list your post. Add the tag there first.
- **Image path wrong** — use `./images/foo.png` (the leading `./` matters). VS Code autocompletes paths if you start typing `]( `.
- **Forgot to push** — `./publish.sh` does this for you. If you `git commit` manually, run `git push` after.

---

## When in doubt

The site rebuilds every push. If you break something, you'll get a build-fail email from Cloudflare and the live site stays on the last good version. Hard to brick.

If you want a real human review before going live, push to a branch instead of main:
```bash
git checkout -b draft/article-name
git push origin draft/article-name
```
Cloudflare gives you a preview URL like `draft-article-name.mnueman.pages.dev` you can share for feedback. Merge to `main` when ready.
