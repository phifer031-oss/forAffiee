/* =========================================================
   EDIT THIS BLOCK: your cute messages live here.
   (Needs script.js to load first, which index.html already does.)
   ========================================================= */
const EXTRAS = {
  // Shown when she taps the big day number 5 times
  secret: {
    title: "You found my secret ♥",
    text: "I love you more than I can fit in one little website. Mwaaa! Rewrite this with your own words, Pj."
  },

  // "Open when..." envelopes. Add or remove as you like.
  // unlock: "monthsary"  -> opens on every monthsary (the 13th)
  // unlock: "2026-12-25T00:00:00" -> opens on that date
  openWhen: [
    {
      title: "Open when you miss me",
      text: "Close your eyes and take a deep breath. Kahit malayo ako, ikaw parin ang iniisip ko. Text me, baka iniisip din kita ngayon."
    },
    {
      title: "Open when you're sad",
      text: "Hindi mo kailangang maging okay palagi. I'm proud of you and I'm here. Kain ka muna ng something sweet, libre ko next time."
    },
    {
      title: "Open when you can't sleep",
      text: "Matulog ka na, Affiee ko. Bukas, nandito parin ako. Goodnight and sweet dreams, mwaaa."
    },
    {
      title: "Open when you need a laugh",
      text: "Remember when we borrowed your Mom's pickup, tired na tired pero tawa parin tayo nang tawa? Ganun ko gustong ginugugol ang mga araw ko, kasama ka."
    },
    {
      title: "Open on our monthsary",
      unlock: "monthsary",
      text: "Happy monthsary, Affiee! Another month, and I'd still choose you every single time."
    }
  ]
};

/* ---------- Features (you can leave this alone) ---------- */
(function () {
  const now = () => new Date();

  /* Message popup */
  const note = $("note");
  function showNote(title, text) {
    $("noteTitle").textContent = title;
    $("noteText").textContent = text;
    note.classList.add("show");
  }
  note.addEventListener("click", () => note.classList.remove("show"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") note.classList.remove("show"); });

  /* Open-when envelopes */
  function monthsaryDate() {
    const n = now(), day = start.getDate();
    const today = new Date(n.getFullYear(), n.getMonth(), n.getDate());
    let d = new Date(n.getFullYear(), n.getMonth(), day);
    if (d < today) d = new Date(n.getFullYear(), n.getMonth() + 1, day);
    return d;
  }
  EXTRAS.openWhen.forEach((it) => {
    const date = it.unlock === "monthsary" ? monthsaryDate() : it.unlock ? new Date(it.unlock) : null;
    const locked = () => date && now() < date;
    const b = document.createElement("button");
    b.className = "env" + (locked() ? " locked" : "");
    b.textContent = it.title;
    b.addEventListener("click", (e) => {
      if (locked()) {
        const when = date.toLocaleDateString(undefined, { month: "long", day: "numeric" });
        showNote("Not yet!", `This one opens on ${when}. Good things come to those who wait ♥`);
      } else {
        showNote(it.title, it.text);
        hearts(e.clientX, e.clientY);
      }
    });
    $("envs").appendChild(b);
  });

  /* Tap anywhere for hearts */
  document.addEventListener("click", (e) => {
    if (e.target.closest("button, figure, .lb, .note, .gate")) return;
    hearts(e.clientX, e.clientY);
  });

  /* Boop the number; 5 taps reveals the secret */
  let taps = 0, timer;
  $("days").addEventListener("click", () => {
    const el = $("days");
    el.classList.remove("boop");
    void el.offsetWidth;
    el.classList.add("boop");
    taps++;
    clearTimeout(timer);
    timer = setTimeout(() => (taps = 0), 2000);
    if (taps >= 5) {
      taps = 0;
      const r = el.getBoundingClientRect();
      hearts(r.left + r.width / 2, r.top + r.height / 2);
      showNote(EXTRAS.secret.title, EXTRAS.secret.text);
    }
  });

  /* Music button */
  const a = $("music"), mb = $("mute");
  if (site.music) {
    const sync = () => {
      mb.classList.toggle("off", a.paused);
      mb.setAttribute("aria-pressed", String(!a.paused));
    };
    a.addEventListener("play", sync);
    a.addEventListener("pause", sync);
    $("open").addEventListener("click", () => { mb.hidden = false; sync(); });
    mb.addEventListener("click", () => { a.paused ? a.play().catch(() => {}) : a.pause(); });
  }
})();
