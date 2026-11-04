const site = {
  herName: "Rhian",
  myName: "Pj",
  startDate: "2026-06-13T00:00:00",
  headline: "days being yours.",
  subline: "A little corner of the internet, built just for you.",
  music: "lifetimne.mp3", // optional: put an mp3 in this folder and type its name, e.g. "song.mp3"

  timeline: [
    {
      date: "2012",
      title: "The year we met",
      text: "We were just lil kids at that time who only knows about playing. Now look at us, 14 years have passed since that encounter, despite not being in somewhat in contact, destiny still find a way to bring us together."
    },
    {
      date: "May 2026",
      title: "Our first date",
      text: "That date, although simple, its the most memorable date we have. You and me under the watchful eyes of the stars, laughing and making fun of each other. It's also our first kiss that made me look at you with surprise. We may not have captured that moments, but it is imprinted like a movie in our memories."
    },
    {
      date: "July 2026",
      title: "Something Small That Matter",
      text: "We borrowed your Mom's pickup and we have a small trip with Gwyn and Romie, creating our lil group called 'esponte'. Although we are so tired at that time, we created memories that made a mark on our minds."
    },
    {
      date: "Today",
      title: "Still here",
      text: "And still choosing you, Affiee ko."
    }
  ],

  reasons: [
    "The way you share every detail in your day",
    "You notice every small things on me",
    "You make ordinary boring day into something interesting",
    "The way your eyes look so innocent when you are telling a story",
    "You dont complain no matter how weird I get",
    "You understand me no matter how bad I am to you",
    "You always made me feel loved",
    "You always supported me",
    "You treated me food",
    "There are many other reasons, but my main reason for staying is because I love you."
  ],

  photos: [
    { src: "6086650274496844613.jpg", caption: "Our First Beach Together" },
    { src: "6280734001152595085.jpg", caption: "Picture Mo sa Idol mo" },
    { src: "6280734001152595054.jpg", caption: "Us being Silly" },
    { src: "WIN_20260926_19_31_45_Pro.jpg", caption: "Just us Loving each Other" }
  ],

  letter: [
    "Happy 5th Monthsary Affiee!! I just wanna tell you na mahal na mahal kita at hindi magbabago and sorry ito lang nakayanan kong mabigay sayo ngayon pero babawi ako in the future.",
    "5 months na tayo nak, limang buwan narin kitang tinittis. Joke lang syempre, aawayin mo nanaman ako eh. Thank you Affiee for always being there and supporting me, kahit minsan mahirap akong intindihin, nanjan kaparin sa tabi ko. I may not make you feel it affiee pero walang araw na hindi kita minahal ng sobra. Mwaaa <3",
    "1 Corinthians 13:4-7: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud... It always protects, always trusts, always hopes, always perseveres.'"
  ]
};

/* ---------- Rendering (you can leave this alone) ---------- */
const $ = (id) => document.getElementById(id);
const start = new Date(site.startDate);
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

document.title = "For " + site.herName;
$("gateTitle").textContent = "For " + site.herName;
$("toLine").textContent = "For " + site.herName;
$("headline").textContent = site.headline;
$("subline").textContent = site.subline;
$("sign").textContent = "Yours, " + site.myName;

/* Opening screen */
document.body.classList.add("locked");
$("open").addEventListener("click", () => {
  $("gate").classList.add("gone");
  document.body.classList.remove("locked");
  if (site.music) {
    const a = $("music");
    a.src = site.music;
    a.play().catch(() => {});
  }
});

/* Counter, months, next monthsary */
function tick() {
  const now = new Date();
  const s = Math.floor(Math.max(0, now - start) / 1000);
  $("days").textContent = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  $("clock").textContent = `plus ${h} hours, ${m} minutes, ${s % 60} seconds`;
}
function monthsLine() {
  const now = new Date(), day = start.getDate();
  let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  if (now.getDate() < day) months--;
  let next = new Date(now.getFullYear(), now.getMonth(), day);
  if (next <= now) next = new Date(now.getFullYear(), now.getMonth() + 1, day);
  const left = Math.ceil((next - now) / 86400000);
  const when = left === 1 ? "tomorrow" : `in ${left} days`;
  $("months").textContent = `That's ${Math.max(months, 0)} months, and our next monthsary is ${when}.`;
}
tick(); monthsLine();
setInterval(tick, 1000);

/* Timeline */
$("timeline").innerHTML = site.timeline
  .map((e) => `<article><time>${e.date}</time><h3>${e.title}</h3><p>${e.text}</p></article>`)
  .join("");

/* Floating hearts */
function hearts(x, y) {
  if (reduceMotion) return;
  for (let i = 0; i < 7; i++) {
    const el = document.createElement("span");
    el.className = "heart";
    el.textContent = "♥";
    el.style.left = x + "px";
    el.style.top = y + "px";
    el.style.setProperty("--dx", (Math.random() * 120 - 60) + "px");
    el.style.fontSize = 16 + Math.random() * 16 + "px";
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

/* Reasons */
let order = [], idx = -1;
function shuffle() {
  order = site.reasons.map((_, i) => i).sort(() => Math.random() - 0.5);
  idx = -1;
}
function nextReason() {
  if (idx + 1 >= order.length) shuffle();
  idx++;
  const box = $("reason");
  box.textContent = site.reasons[order[idx]];
  box.classList.remove("swap");
  void box.offsetWidth;
  box.classList.add("swap");
  $("reasonCount").textContent = `${idx + 1} of ${site.reasons.length}`;
}
shuffle(); nextReason();
$("next").addEventListener("click", (e) => {
  nextReason();
  const r = e.currentTarget.getBoundingClientRect();
  hearts(r.left + r.width / 2, r.top);
});

/* Photos (tap to enlarge) */
const lb = $("lb");
site.photos.forEach((p) => {
  const fig = document.createElement("figure");
  fig.tabIndex = 0;
  const cap = document.createElement("figcaption");
  cap.textContent = p.caption;
  const holder = document.createElement(p.src ? "img" : "div");
  if (p.src) {
    holder.src = p.src;
    holder.alt = p.caption;
    holder.loading = "lazy";
    holder.onerror = () => {
      const ph = document.createElement("div");
      ph.className = "ph";
      ph.textContent = "Photo not found: " + p.src;
      holder.replaceWith(ph);
    };
  } else {
    holder.className = "ph";
    holder.textContent = p.caption;
  }
  fig.append(holder, cap);
  const show = () => {
    if (!p.src) return;
    $("lbImg").src = p.src;
    $("lbImg").alt = p.caption;
    $("lbCap").textContent = p.caption;
    lb.classList.add("show");
  };
  fig.addEventListener("click", show);
  fig.addEventListener("keydown", (e) => { if (e.key === "Enter") show(); });
  $("photos").appendChild(fig);
});
lb.addEventListener("click", () => lb.classList.remove("show"));
document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.classList.remove("show"); });

/* Letter */
$("letter").innerHTML = site.letter.map((t) => `<p>${t}</p>`).join("");
