# Pacific Nomad Brewing

Static website for **https://pacificnomadbrewing.com**, hosted on Vercel from [`Marc-9/pacific-nomad-brewing`](https://github.com/Marc-9/pacific-nomad-brewing). Production publishes from `main`. Plain HTML, CSS, and JavaScript; no framework, package installation, or build step.

## Instructions for the agent

The brewer describes the change; you handle implementation, verification, and publishing. For a requested website update, carry it through **edit → local browser check → commit and push → deployment and live-site check**. Use the existing design and file structure. Ask for missing content only when it is needed to complete the request; make routine implementation decisions yourself.

## Where to make changes

| Change | Location |
| --- | --- |
| Brewery story | `index.html` → `#almanac` |
| Beers on tap, ABV, descriptions, tasting notes | `index.html` → `#tap`, `.beer` articles |
| Upcoming beers | `index.html` → `#cellar`, `.upcoming` articles |
| Gathering text, gallery images, captions | `index.html` → `#gathering` |
| Visiting details and contact links | `index.html` → `#visit`; check repeated details in navigation/footer too |
| Party announcement and calendar invitation | `party.js` → `PARTY` object at the top |
| Colors, type, layout, responsive styles | `styles.css`; shared colors in `:root` |
| Scroll reveals, parallax, footer year | `script.js` |
| Photos and favicon | `images/`, referenced from `index.html` |
| Hosting headers and asset caching | `vercel.json` |

### Details that matter

- **Beer cards:** reuse an existing complete `.beer` article. Update its number, season, name, stats, description, and notes. Give copied SVG IDs unique values and update their matching references, e.g. both `id="clip-07"` and `url(#clip-07)`. Keep the section heading and masthead season consistent with the requested update.
- **Contact details:** update the visible text and the destination (`sms:`, `mailto:`, Instagram URL). Search for repeated occurrences.
- **Photos:** compress oversized originals, use descriptive filenames, and update captions as needed. Paths and capitalization must match exactly.
- **Party:** update `PARTY.id` for each new event so previous dismissals do not hide it. Update both machine dates (`startISO`, `endISO`) and the separate display fields (`dayName`, `dateLong`, `dateShort`, `timeLabel`, `titleYear`). Check the lineup, activities, guests, and location. The announcement hides after `endISO`; dismissal is stored under `pnb-party-${PARTY.id}-seen` in localStorage. Dates without a timezone are currently interpreted in the visitor's local timezone, including the calendar export; verify against the intended Davis event time.
- **Caching:** `vercel.json` marks CSS, JavaScript, and images immutable for a year. When changing an asset, update its URL in the same commit: use a new image filename or bump a query version on the script/stylesheet reference, e.g. `<script src="party.js?v=holiday-2026-2" defer></script>`. Do this for corrections to an existing event too.

## Make and verify the update

1. Inspect `git status`, the current branch, and the diff before editing. Preserve unrelated work. On a clean `main`, run `git pull --ff-only origin main` before starting. If working on a branch, reconcile it with current production before publishing.
2. Make the requested changes, keeping the site's existing visual style and responsive behavior.
3. Serve the repository locally:

   ```sh
   python3 -m http.server 8000
   ```

   Open **http://localhost:8000** in an available browser. Reload after edits; the server does not auto-reload.
4. Check the actual rendered page at desktop and phone widths (for example 1440px and 390px). Scroll through the changed section and its neighbors. Check wrapping, overflow, image crops, and affected navigation/contact links. Inspect the browser console and network for JavaScript errors or missing assets. `?reveal=1` shows all scroll-reveal content for inspection, but also verify the normal URL.
5. For party changes, check the automatic opening with a fresh storage state, dismissal to the pinned invitation, reopening, and calendar download. Check the downloaded `.ics` dates/times. If changing expiry logic, verify before and after the end time with a browser clock override or temporary local fixture; keep fixtures out of the commit.
6. Run `git diff --check` and review `git diff`. If JavaScript changed and Node is available, run `node --check party.js` and/or `node --check script.js`. There is no configured test suite or build command. Browser verification is the main functional check; syntax checks alone do not establish that the page works.

## Publish and verify production

Once the requested change passes verification, commit only the relevant files and push to `main`. Use explicit paths rather than staging the entire working directory:

```sh
git add -- <changed-files>
git commit -m "Describe the website update"
git push origin main
git rev-parse HEAD
```

Run the push from `main`; if using a feature branch, merge the verified change into `main` first. If the remote has advanced, fetch and integrate it, resolve any conflicts, and repeat affected checks before pushing. Do not force-push. Routine updates use the existing Git integration; they do not need a separate Vercel project or manual CLI deployment.

1. Record the pushed commit SHA and inspect its **Vercel** check on GitHub. With authenticated GitHub CLI, `gh api repos/Marc-9/pacific-nomad-brewing/commits/<sha>/status` returns commit statuses; follow the Vercel details URL. Use GitHub's browser UI or connector if the CLI is unavailable. Wait for that commit's deployment result.
2. Open **https://pacificnomadbrewing.com/** and verify the requested behavior on production, including changed asset URLs. Check desktop and phone layout for visual changes. A successful Git push or Vercel check alone is not a live-site content check.
3. Report what changed, what you verified, the commit link, and the live URL. If deployment fails or live verification is unavailable, state exactly what remains unverified and the error. Do not describe an unverified deployment as complete.

For larger changes, a branch pushed to this repository can provide a Vercel preview before merging to `main`. Use it when helpful without making every small content edit depend on a separate review.

## Repair a bad update

Reproduce the issue, make a focused fix, verify it, and publish normally. If the last update must be undone, use `git revert <bad-commit>` and push the resulting commit, preserving later and unrelated work. Verify the repair on the live domain. For stale assets, check that their URL changed; asking visitors to clear their cache is not the fix.
