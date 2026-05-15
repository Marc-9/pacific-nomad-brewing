# Pacific Nomad Brewing — website

A static site for pacificnomadbrewing.com. No build step, no framework — just HTML, CSS, and a small bit of JavaScript. Edit the files, push to Vercel, you're live.

## Files

- `index.html` — page content (edit beer names, descriptions, hours, contact here)
- `styles.css` — all visual design (colors, fonts, layout)
- `script.js` — small bits of motion (scroll reveals, parallax)
- `vercel.json` — deployment / caching config
- `images/` — drop real brewery photos here when you have them

## Preview locally

Just open `index.html` in your browser, or for hot reload:

```bash
cd pacific_nomad
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy to Vercel (first time)

1. Make a free Vercel account at https://vercel.com.
2. Install the CLI:
   ```bash
   npm install -g vercel
   ```
3. From this folder run:
   ```bash
   vercel
   ```
   Follow the prompts (link to your Vercel account, name the project `pacific-nomad-brewing`). Vercel detects the static site automatically.
4. To push the production version:
   ```bash
   vercel --prod
   ```

Or skip the CLI entirely: drag the folder onto https://vercel.com/new — Vercel deploys it.

## Connect the domain

In the Vercel dashboard:
1. Go to **Project → Settings → Domains**.
2. Add `pacificnomadbrewing.com` and `www.pacificnomadbrewing.com`.
3. Vercel shows the DNS records to set. Update them at your current registrar (or transfer the domain to Vercel — easier long-term).
4. SSL is automatic.

## Common edits

### Add or change a beer

Open `index.html`, find the `<!-- ON TAP -->` section. Each beer is one `<article class="beer">` block. Copy a whole block, paste, change the name / ABV / description / glass color.

The beer color lives in the SVG fill — search for hex codes like `#E89C3A` (grapefruit IPA's amber) and swap.

### Update hours / contact

Search for `916) 402-9885` in `index.html` and change.

### Replace gallery photos

In the `<!-- GATHERING -->` section, each `<figure class="polaroid">` has a `background-image` URL. Replace the Unsplash URLs with paths to real photos in `images/` — for example:

```html
<div class="polaroid__img" style="background-image:url('images/holiday-2025-pour.jpg')"></div>
```

Aim for landscape photos around 800×600. JPGs are fine.

### Change fonts or colors

Open `styles.css`. The top of the file has a `:root { ... }` block with all the design tokens — change a hex value there and the whole site updates.
