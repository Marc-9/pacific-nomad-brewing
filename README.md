# Pacific Nomad Brewing — website

The website for [pacificnomadbrewing.com](https://pacificnomadbrewing.com/). This is a simple site made from HTML, CSS, JavaScript, and photos. There is no build step or software to install for everyday updates.

**The everyday workflow: edit a file on GitHub → save the change to `main` → Vercel publishes it.** You can do this entirely in your browser.

- [Open the repository](https://github.com/Marc-9/pacific-nomad-brewing)
- [Edit the page content](https://github.com/Marc-9/pacific-nomad-brewing/edit/main/index.html)
- [Edit the party announcement](https://github.com/Marc-9/pacific-nomad-brewing/edit/main/party.js)
- [Visit the website](https://pacificnomadbrewing.com/)

## One-time setup: give the brewer access

1. The brewer creates his own [GitHub account](https://github.com/signup) and verifies his email.
2. The repository owner opens **Settings → Collaborators → Add people** in this repository, then invites that GitHub username.
3. The brewer accepts the invitation while signed into his own account. Collaborator access lets him edit and push changes to this repository. He does not need to fork it or share anyone else's login.
4. The Vercel project owner checks the **existing** `pacific-nomad-brewing` project:
   - Under **Settings → Git**, the connected repository should be `Marc-9/pacific-nomad-brewing`.
   - Under **Settings → Environments → Production → Branch Tracking**, confirm the production branch is `main`.
   - Confirm automatic Git deployments are enabled.
5. From the brewer's account, make a small text update using the steps below. Confirm that its Vercel check succeeds and the updated text appears on the live website. This checks the whole publishing workflow before relying on it.

### Does he need a Vercel account too?

For the current **public** repository, Vercel documents free collaboration for public repos. Once the Git integration above is configured, his pushes to the production branch should deploy to the existing project in the current owner's Vercel account. Hosting, billing, and the domain stay with that account; everyday content edits only need GitHub access.

If the repository becomes private, recheck Vercel's contributor rules before relying on this setup: private-repository collaboration can require Vercel team membership and a GitHub login connection, and Hobby does not support private-repository collaboration. If a deployment reports an author/access error, use the [Vercel collaboration troubleshooting guide](https://vercel.com/docs/deployments/troubleshoot-project-collaboration).

References: [GitHub collaborator permissions](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/repository-access-and-collaboration/permission-levels-for-a-personal-account-repository) · [Vercel Git deployments and production branches](https://vercel.com/docs/git).

## Update the website in your browser

1. Sign into GitHub and [open this repository](https://github.com/Marc-9/pacific-nomad-brewing). Check that the branch selector says **main**.
2. Open the file you want to change, usually `index.html`, and click the **pencil / Edit this file** button.
3. Use the editor's search to find existing words, such as a beer name or `By appointment only`. Change the words while keeping the surrounding HTML tags. See the examples below.
4. Click **Commit changes…**. A commit is a saved version of the file. Give it a short description, such as `Update beers for November`.
5. Choose **Commit directly to the main branch** and confirm. **This publishes the update once Vercel finishes deploying.** If branch rules prevent this, use the preview workflow below.
6. Open the new commit from the repository's commit history and check its **Vercel** status. Wait for success, then open the live website and check your change on a phone and a computer.

GitHub's file preview is not a rendered preview of the website. For layout changes, multiple files, or a new announcement, use a preview branch first.

### Preview before publishing

1. When saving your edit, choose **Create a new branch for this commit and start a pull request**. Name it something like `november-beers`.
2. Open the pull request with `main` as the destination. A pull request is a proposed update that you can inspect before publishing.
3. Wait for Vercel's preview link in the checks or bot comment. Open it and check the page, links, photos, and phone layout.
4. If more edits are needed, select that same branch in the repository and commit the additional edits there. Vercel updates the preview.
5. When ready, click **Merge pull request** and confirm. Merging into `main` triggers the production deployment. Check the live website afterward.

With collaborator permissions, you can create and merge your own pull requests unless repository rules require another person's review. If GitHub proposes creating a fork, first check that you accepted the collaborator invitation and are signed into the right account.

## Which file should I edit?

| What you want to change | File | Search for |
| --- | --- | --- |
| Brewery story and introduction | `index.html` | `ALMANAC / ABOUT` |
| Current beers, ABV, descriptions, season | `index.html` | `ON TAP` |
| Upcoming beers | `index.html` | `CELLAR / COMING SOON` |
| Gathering text, photos, captions | `index.html` | `GATHERING / EVENTS` |
| Visiting hours, phone, email, Instagram | `index.html` | `VISIT` |
| Party announcement, dates, lineup | `party.js` | `const PARTY =` |
| Photos and site icon | `images/` | Upload a new file, then update its reference |
| Colors, fonts, spacing, layout | `styles.css` | `:root` for colors |

`script.js` handles scroll effects and the footer year. `vercel.json` controls hosting and caching. Routine content updates usually only need `index.html` or the settings at the top of `party.js`.

## Common updates

### Change a beer or add a new one

In `index.html`, search for the beer's name. For example:

```html
<h3 class="beer__name">Grapefruit <span>IPA</span></h3>
```

Change the name, ABV inside its `<dd>…</dd>`, style, description inside `<p class="beer__desc">…</p>`, tasting notes, and season as needed. Keep the `<span>` and other tags intact. Search for `Spring · 2026` to update the On Tap section's season heading, and check the season in the top masthead too.

To add a beer, copy one complete block from `<article class="beer">` through its matching `</article>` inside `tap__grid`. Update the displayed number and all text. Each copied glass illustration needs a unique SVG clip ID: for example, change both `id="clip-01"` and `url(#clip-01)` to `clip-07` in the new block. Remove a sold-out beer by deleting its complete article block. The `beer beer--coming` article is the placeholder for a future pour.

Use `&amp;` for an ampersand in HTML text, for example `Brownies &amp; Milk`. Leave SVG drawings alone unless you want to change the glass illustration.

### Change visiting details

In `index.html`, search for `VISIT`. When changing a contact detail, update both the visible text and its link:

```html
<a href="sms:+19164029885">(916) 402-9885</a>
<a href="mailto:pacificnomadbrewing@gmail.com">pacificnomadbrewing@gmail.com</a>
```

Search the entire file for the old value so you catch repeated links, including Instagram in the footer. If opening arrangements change, also check `By appointment`, the top description, and the visiting instructions.

### Change gathering photos

1. Give each new photo a simple, unique filename, such as `holiday-2026-band.jpg`. Match capitalization and extension exactly.
2. In GitHub, open `images/`, choose **Add file → Upload files**, upload the photo, and commit it. For a preview, commit to the same preview branch as your page edits.
3. In `index.html`, search for `GATHERING / EVENTS` and update the appropriate image path and caption:

   ```html
   <div class="polaroid__img" style="background-image:url('images/holiday-2026-band.jpg')"></div>
   <figcaption>The band came through</figcaption>
   ```

JPG, PNG, or WebP photos work. Crop and compress large originals before uploading; around 1200 pixels wide is a useful starting point. Use a **new filename** when replacing a photo: the current hosting config gives images a long browser cache lifetime.

### Announce the next party

Open `party.js` and edit only the `PARTY` object near the top. Use a preview branch for this update.

- Give `id` a **new value for each event**, such as `holiday-2026`. This lets previous visitors see the new announcement even if they dismissed the last one.
- Update `title`, `titleYear`, `eyebrow`, `occasion`, `lede`, `body`, the beer list in `pours`, activities in `happenings`, guests, and location.
- Set `startISO` and `endISO` to the actual start and end, in `YYYY-MM-DDTHH:MM:SS` format. These control expiry and the downloadable calendar invitation. The current code interprets these in the visitor's local timezone; check the calendar on a device in the event's timezone.
- Separately update `dayName`, `dateLong`, `dateShort`, and `timeLabel`. The displayed date and time are written by hand; they do not update automatically from the ISO values.
- Keep quotes, commas, brackets, and braces intact. Text containing an apostrophe is easiest to put inside double quotes, like the existing `body` value.

The current announcement expires after its June 6, 2026 end time, so it will be hidden until you configure a future event. A new event opens on the first visit, becomes a small pinned invitation after dismissal, and disappears after `endISO` passes. Check all three behaviors when changing it.

Because `party.js` is also cached for a long time, when updating an announcement, change its script reference at the bottom of `index.html` to a new version, for example:

```html
<script src="party.js?v=holiday-2026" defer></script>
```

Commit both files to the same preview branch, check the announcement, then merge them together. Use a fresh version value for later corrections too. The same approach applies when changing `styles.css` or `script.js`.

## If an update goes wrong

- **No change on the website:** confirm the change reached `main`, check its Vercel status, and refresh the live site. A preview branch does not update the public domain until merged.
- **Old photo, announcement, or styling:** use a new image filename or a new `?v=…` value on the changed CSS/JavaScript reference as described above. A private browser window can help diagnose a stale browser cache.
- **Vercel check fails:** open its details for the error. An author/access error needs the Vercel account owner to check the Git connection and contributor permissions.
- **A text edit breaks the page:** open the affected file's **History**, find the version before your edit, and view that file at that version. Copy the old contents. Return to the file on **main**, click Edit, paste those contents, and commit with a message such as `Restore page before beer update`. This creates a new saved version and deploys the repair. Restore only the affected file, and check for any later edits you need to preserve.
- **A merged pull request needs undoing:** use **Revert** on the merged pull request if GitHub offers it, then merge the resulting revert pull request.

## Optional: edit on your computer

For larger changes, clone the repository with GitHub Desktop or Git, edit the files in a text editor, and preview locally. With Python 3 installed, from the repository folder run:

```bash
python3 -m http.server 8000
```

Open [localhost:8000](http://localhost:8000). Reload after saving edits; this server does not provide automatic reload. Stop it with **Ctrl+C**. You can also open `index.html` directly in a browser for a quick look.

Save your work as a commit and push it to GitHub. A local save or commit alone does not publish anything; the change must be pushed to the connected repository. Use a branch and pull request for a preview, or push to `main` to publish. There is no need to install the Vercel CLI for the normal GitHub workflow.

## Hosting and domain maintenance

Use the existing Vercel project for ongoing updates. If reconnecting it, select this repository, choose the **Other** framework preset with the repository root as the root directory, and leave build/install commands unset for this static site. Check any output directory override points to the directory containing `index.html`.

The domain is managed under **Project → Settings → Domains** in Vercel. The project owner can add `pacificnomadbrewing.com` and `www.pacificnomadbrewing.com` there and follow the DNS records Vercel supplies at the domain registrar. Everyday content updates do not require changing DNS or creating a new project.
