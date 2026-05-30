// Pacific Nomad Brewing — Party Broadside
// Reusable announcement feature.
//
// To announce a new party, replace the PARTY object below.
// Behavior:
//   • On first visit before the party date: full broadside splash opens automatically.
//   • Once dismissed: a small pinned handbill sits in the bottom-right.
//   • Clicking the handbill re-opens the splash.
//   • After the party date passes, nothing renders.

(() => {

  const PARTY = {
    id:           'summer-2026',
    eyebrow:      'An Invitation — Vol. VII, Bulletin No. 1',
    title:        'Summer Party',
    titleYear:    '2026',
    occasion:     '10-Year Anniversary · Bon Voyage',

    // ISO datetimes in local time (no Z). Used for visibility logic + .ics
    startISO:     '2026-06-06T19:30:00',
    endISO:       '2026-06-06T21:30:00',

    // Pretty display
    dayName:      'Saturday',
    dateLong:     'June Sixth',
    dateShort:    'Jun 6',
    timeLabel:    '7:30 – 9:30 in the evening',

    lede:         "Join us as we welcome summer, celebrate ten years of brewing, and say bon voyage for a little while.",
    body:         "We'll be opening the first bottle we ever brewed — a Belgian Golden Ale, sleeping since the very beginning — and pouring it for whoever stays late enough.",

    pours: [
      { name: 'Pablo Bunyan',      style: 'Mexican Lager' },
      { name: 'Midnight Reserve',  style: 'Imperial Barrel-Aged Stout' },
      { name: 'Pomegranate Cider', style: 'méthode champenoise' },
      { name: 'Root Beer',         style: 'on tap, for the drivers' },
    ],

    happenings: [
      'Hot dogs on the grill',
      'Cornhole in the yard',
      'Bring a dish to share — no pressure',
      'Friends &amp; family welcome',
    ],

    guests:       'The Clara Skinner Quartet',
    guestsLine:   'with special musical guests',

    location:     'Pacific Nomad Brewing · Davis, California',
    locationShort:'the garage · Davis, CA',
  };

  // ── helpers ─────────────────────────────────────────────────
  const STORAGE_KEY = `pnb-party-${PARTY.id}-seen`;

  const partyDate = new Date(PARTY.startISO);
  const partyEnd  = new Date(PARTY.endISO);
  const now = new Date();

  // Hide the whole thing once the party is over.
  if (now > partyEnd) return;

  const hasSeen = () => {
    try { return localStorage.getItem(STORAGE_KEY) === '1'; }
    catch { return false; }
  };
  const markSeen = () => {
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch {}
  };

  // ── .ics download ───────────────────────────────────────────
  const toICSDate = (iso) => {
    // Treat the ISO as local time, convert to UTC for the .ics
    const d = new Date(iso);
    const pad = n => String(n).padStart(2, '0');
    return d.getUTCFullYear() +
           pad(d.getUTCMonth() + 1) +
           pad(d.getUTCDate()) + 'T' +
           pad(d.getUTCHours()) +
           pad(d.getUTCMinutes()) +
           pad(d.getUTCSeconds()) + 'Z';
  };
  const buildICS = () => {
    const stamp = toICSDate(new Date().toISOString());
    const desc = `${PARTY.lede}\\n\\n${PARTY.body}\\n\\nMusical guests: ${PARTY.guests}.`
                  .replace(/&amp;/g, '&');
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Pacific Nomad Brewing//Party//EN',
      'BEGIN:VEVENT',
      `UID:${PARTY.id}@pacificnomadbrewing.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART:${toICSDate(PARTY.startISO)}`,
      `DTEND:${toICSDate(PARTY.endISO)}`,
      `SUMMARY:Pacific Nomad — ${PARTY.title} ${PARTY.titleYear}`,
      `DESCRIPTION:${desc}`,
      `LOCATION:${PARTY.location}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');
    return 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
  };

  // ── template ─────────────────────────────────────────────────
  const html = String.raw;

  const ornamentSVG = html`
    <svg class="party-orn" viewBox="0 0 80 24" aria-hidden="true">
      <path d="M 0 12 L 28 12" stroke="currentColor" stroke-width="0.6" fill="none"/>
      <path d="M 52 12 L 80 12" stroke="currentColor" stroke-width="0.6" fill="none"/>
      <g transform="translate(40 12)">
        <circle r="2" fill="currentColor"/>
        <circle cx="-8" r="0.9" fill="currentColor"/>
        <circle cx="8" r="0.9" fill="currentColor"/>
      </g>
    </svg>`;

  // small hop cone for the tab
  const hopSVG = html`
    <svg viewBox="0 0 40 48" aria-hidden="true">
      <path d="M 20 4 L 20 12" stroke="currentColor" stroke-width="1.1" fill="none"/>
      <path d="M 20 8 Q 12 4 8 10 Q 14 12 20 10 Z" fill="currentColor" opacity=".85"/>
      <path d="M 20 8 Q 28 4 32 10 Q 26 12 20 10 Z" fill="currentColor" opacity=".85"/>
      <g fill="currentColor">
        <path d="M 8 18 Q 20 12 32 18 Q 20 22 8 18 Z" opacity=".95"/>
        <path d="M 6 26 Q 20 18 34 26 Q 20 32 6 26 Z" opacity=".82"/>
        <path d="M 7 34 Q 20 26 33 34 Q 20 40 7 34 Z" opacity=".66"/>
        <path d="M 10 42 Q 20 36 30 42 Q 20 46 10 42 Z" opacity=".5"/>
      </g>
    </svg>`;

  const splashHTML = html`
    <div class="party-backdrop" data-party-close="1"></div>

    <aside class="party-splash"
           role="dialog"
           aria-modal="true"
           aria-labelledby="party-splash-title">

      <button class="party-splash__x"
              type="button"
              aria-label="Dismiss invitation"
              data-party-close="1">
        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M 4 4 L 16 16 M 16 4 L 4 16" stroke="currentColor" stroke-width="1.4" fill="none"/></svg>
      </button>

      <div class="party-splash__paper">

        <span class="party-splash__corner party-splash__corner--tl"></span>
        <span class="party-splash__corner party-splash__corner--tr"></span>
        <span class="party-splash__corner party-splash__corner--bl"></span>
        <span class="party-splash__corner party-splash__corner--br"></span>

        <header class="party-splash__masthead">
          <span>By the proprietors of</span>
          <span class="party-splash__mast-mid">— Pacific Nomad Brewing —</span>
          <span>Davis · California</span>
        </header>

        <p class="party-splash__eyebrow">${PARTY.eyebrow}</p>

        <h2 id="party-splash-title" class="party-splash__title">
          <span class="party-splash__title-year">${PARTY.titleYear}</span>
          <span class="party-splash__title-main">${PARTY.title}</span>
        </h2>

        <p class="party-splash__occasion">${PARTY.occasion}</p>

        ${ornamentSVG}

        <div class="party-splash__when">
          <span class="party-splash__when-day">${PARTY.dayName}</span>
          <span class="party-splash__when-date">${PARTY.dateLong}</span>
          <span class="party-splash__when-time">${PARTY.timeLabel}</span>
        </div>

        ${ornamentSVG}

        <p class="party-splash__lede">
          <span class="party-splash__dropcap">${PARTY.lede.charAt(0)}</span>${PARTY.lede.slice(1)}
        </p>

        <p class="party-splash__body">${PARTY.body}</p>

        <div class="party-splash__cols">
          <section class="party-splash__col">
            <h3 class="party-splash__col-h">— Pouring —</h3>
            <ul class="party-splash__list">
              ${PARTY.pours.map(p => html`
                <li>
                  <span class="party-splash__list-name">${p.name}</span>
                  <span class="party-splash__list-style">${p.style}</span>
                </li>`).join('')}
            </ul>
          </section>
          <section class="party-splash__col">
            <h3 class="party-splash__col-h">— Happenings —</h3>
            <ul class="party-splash__list party-splash__list--bullet">
              ${PARTY.happenings.map(h => html`<li>${h}</li>`).join('')}
            </ul>
          </section>
        </div>

        <div class="party-splash__ribbon">
          <span class="party-splash__ribbon-pre">♪ &nbsp;${PARTY.guestsLine}&nbsp; ♪</span>
          <span class="party-splash__ribbon-name">${PARTY.guests}</span>
        </div>

        <div class="party-splash__actions">
          <a class="party-splash__cta"
             href="${buildICS()}"
             download="pacific-nomad-${PARTY.id}.ics"
             data-party-close="1">
            <span>Add to calendar</span>
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </a>
          <button class="party-splash__dismiss"
                  type="button"
                  data-party-close="1">
            Close
          </button>
        </div>

        <p class="party-splash__location">${PARTY.location}</p>
      </div>
    </aside>
  `;

  const tabHTML = html`
    <button class="party-tab" type="button" aria-label="Re-open invitation">
      <span class="party-tab__tape" aria-hidden="true"></span>
      <span class="party-tab__icon" aria-hidden="true">${hopSVG}</span>
      <span class="party-tab__body">
        <span class="party-tab__eyebrow">${PARTY.titleYear} · You're invited</span>
        <span class="party-tab__title">${PARTY.title}</span>
        <span class="party-tab__date">${PARTY.dateShort} · ${PARTY.dayName}</span>
      </span>
    </button>
  `;

  // ── mount ────────────────────────────────────────────────────
  const root = document.createElement('div');
  root.className = 'party-root';
  document.body.appendChild(root);

  let isOpen = false;

  const openSplash = () => {
    if (isOpen) return;
    root.innerHTML = splashHTML;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => root.classList.add('is-open'));
    isOpen = true;

    root.querySelectorAll('[data-party-close]').forEach(el => {
      el.addEventListener('click', () => closeSplash());
    });

    // Click anywhere outside the paper closes the splash
    const splashEl = root.querySelector('.party-splash');
    if (splashEl) {
      splashEl.addEventListener('click', (e) => {
        if (!e.target.closest('.party-splash__paper')) closeSplash();
      });
    }

    document.addEventListener('keydown', escHandler);
  };

  const closeSplash = () => {
    if (!isOpen) return;
    markSeen();
    root.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', escHandler);
    setTimeout(() => {
      root.innerHTML = tabHTML;
      requestAnimationFrame(() => root.classList.add('is-tab'));
      const tab = root.querySelector('.party-tab');
      if (tab) tab.addEventListener('click', () => {
        root.classList.remove('is-tab');
        isOpen = false;
        openSplash();
      });
      isOpen = false;
    }, 380);
  };

  const escHandler = (e) => { if (e.key === 'Escape') closeSplash(); };

  // ── initial state ───────────────────────────────────────────
  if (hasSeen()) {
    root.innerHTML = tabHTML;
    requestAnimationFrame(() => root.classList.add('is-tab'));
    const tab = root.querySelector('.party-tab');
    if (tab) tab.addEventListener('click', () => {
      root.classList.remove('is-tab');
      openSplash();
    });
  } else {
    // tiny delay so the splash arrives a beat after the page settles
    setTimeout(openSplash, 650);
  }
})();
