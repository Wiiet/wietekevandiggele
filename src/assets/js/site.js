/* Wiet — kleine beetjes JavaScript. De site werkt ook zonder. */

// Mobiel menu
(() => {
  const toggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  if (!toggle || !nav) return;
  const label = toggle.querySelector("[data-nav-label]");
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    if (label) label.textContent = open ? "Sluit" : "Menu";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  window.matchMedia("(min-width: 861px)").addEventListener("change", (e) => { if (e.matches) setOpen(false); });
})();

// Lijntje onder de header zodra je scrolt
(() => {
  const header = document.querySelector("[data-header]");
  if (!header) return;
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// E-mailadres kopiëren (handig als je geen mailprogramma gebruikt)
document.querySelectorAll("[data-copy]").forEach((btn) => {
  btn.hidden = !navigator.clipboard;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      const old = btn.textContent;
      btn.textContent = "Gekopieerd!";
      setTimeout(() => { btn.textContent = old; }, 2000);
    } catch (e) { /* niets aan de hand: het adres staat er gewoon */ }
  });
});

// Live Instagram-feed (JSON-feed, bijvoorbeeld van Behold.so).
// Geen widget van Meta: geen trackers, dus geen cookiebanner nodig.
(() => {
  const box = document.querySelector("[data-insta][data-feed-url]");
  if (!box) return;
  const grid = box.querySelector("[data-feed]");
  const note = box.querySelector("[data-feed-note]");

  const normalise = (json) => {
    const list = Array.isArray(json) ? json : json.posts || json.data || [];
    return list.map((p) => ({
      url: p.permalink || p.url,
      img: (p.sizes && (p.sizes.medium || p.sizes.large || {}).mediaUrl) || p.thumbnailUrl || p.thumbnail_url || p.mediaUrl || p.media_url,
      caption: (p.prunedCaption || p.caption || "").trim(),
      video: p.isReel || /VIDEO|REEL/i.test(p.mediaType || p.media_type || ""),
    })).filter((p) => p.url && p.img);
  };

  fetch(box.dataset.feedUrl, { credentials: "omit" })
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((json) => {
      const posts = normalise(json).slice(0, 6);
      if (posts.length < 3) return;
      grid.classList.remove("feed-fallback");
      grid.replaceChildren(...posts.map((p) => {
        const a = document.createElement("a");
        a.className = "feed-item";
        a.href = p.url;
        a.rel = "noopener";
        const img = document.createElement("img");
        img.src = p.img;
        img.alt = p.caption ? p.caption.slice(0, 120) : "Post van Wiet op Instagram";
        img.loading = "lazy";
        img.decoding = "async";
        a.append(img);
        if (p.video) {
          const t = document.createElement("span");
          t.className = "feed-type";
          t.textContent = "Reel";
          a.append(t);
        }
        if (p.caption) {
          const c = document.createElement("span");
          c.className = "feed-cap";
          c.textContent = p.caption;
          a.append(c);
        }
        return a;
      }));
      if (note) note.textContent = "Vers van Instagram. Klik door voor de hele video.";
    })
    .catch(() => { /* feed onbereikbaar: het 'Volg mij'-blok blijft gewoon staan */ });
})();
