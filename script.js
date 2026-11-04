const site = {
  herName: "Rhian",
  myName: "Pj",
 startDate: "2026-06-13T00:00:00",
  headline: "days being yours.",
  subline: "A little corner of the internet, built just for you.",

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
    "your smile makes everything better",
    "your laugh is my favorite sound",
    "your voice calms me down",
    "your hugs feel like home" ,
    "your presence makes me feel safe",
    "you listen to me like you really care",
    "you make me want to be better",
    "you care for me in the sweetest ways" ,
    "your love feels so genuine and true",
    "There are many other reasons, but my main reason for staying is because I love you."
  ],

photos: [
  { src: "6086650274496844613.jpg", caption: "Our First Beach Together" },
  { src: "6280734001152595085.jpg", caption: "Picture Mo sa Idol mo" },
  { src: "6280734001152595054.jpg", caption: "Us being Silly" },
  { src: "WIN_20260926_19_31_45_Pro.jpg", caption: "Just us Loving each Other" }
],

  letter: [
    "Happy 5th Monthsary Affiee!! I just wanna tell you na mahal na mahal kita at hindi magbabago yon and sorry if ito lang nakayanan kong mabigay sayo ngayon pero babawi ako in the future.",
    "5 months na tayo nak, limang buwan narin kitang tinitiis. Joke lang syempre, aawayin mo nanaman ako eh. Thank you Affiee for always being there and supporting me, kahit minsan mahirap akong intindihin, nanjan kaparin sa tabi ko. I may not make you feel it affiee pero walang araw na hindi kita minahal ng sobra. Mwaaa <3",
    "1 Corinthians 13:4-7: 'Love is patient, love is kind. It does not envy, it does not boast, it is not proud... It always protects, always trusts, always hopes, always perseveres.'"
  ]
};

const $ = (id) => document.getElementById(id);
const start = new Date(site.startDate);

document.title = "For " + site.herName;
$("toLine").textContent = "For " + site.herName;
$("headline").textContent = site.headline;
$("subline").textContent = site.subline;
$("sign").textContent = "Yours, " + site.myName;

function tick() {
  const s = Math.floor(Math.max(0, Date.now() - start.getTime()) / 1000);
  $("days").textContent = Math.floor(s / 86400);
  const h = Math.floor((s % 86400) / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  $("clock").textContent = `${h} hours, ${m} minutes, ${sec} seconds`;
}

tick();
setInterval(tick, 1000);

$("timeline").innerHTML = site.timeline
  .map((e) => `<article><time>${e.date}</time><h3>${e.title}</h3><p>${e.text}</p></article>`)
  .join("");

let order = [];
let idx = -1;

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

shuffle();
nextReason();
$("next").addEventListener("click", nextReason);

$("photos").innerHTML = site.photos
  .map(
    (p) => `
      <figure>
        ${p.src ? `<img src="${p.src}" alt="${p.caption}">` : `<div class="ph">${p.caption}</div>`}
        <figcaption>${p.caption}</figcaption>
      </figure>
    `
  )
  .join("");

$("letter").innerHTML = site.letter
  .map((t) => `<p>${t}</p>`)
  .join("");
