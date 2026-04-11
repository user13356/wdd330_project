import { getRandomDog } from "./api/dog-api.js";
import { searchMovies } from "./api/movie-api.js";
import { getCrypto } from "./api/crypto-api.js";
import { getNews } from "./api/news-api.js";

/* -----------------------------
   DOG FEATURE
----------------------------- */
async function loadDog() {
  const container = document.getElementById("dog-container");
  if (!container) return;

  try {
    const dog = await getRandomDog();

    container.innerHTML = `
      <img
        src="${dog}"
        alt="Random dog"
        loading="lazy"
        style="border-radius:10px; max-width:100%;"
      >
    `;
  } catch (error) {
    container.innerHTML = "<p>Failed to load dog image.</p>";
  }
}

/* -----------------------------
   MOVIE FEATURE
----------------------------- */
async function loadMovies() {
  const input = document.getElementById("movie-input");
  const container = document.getElementById("movie-results");

  if (!input || !container) return;

  try {
    const movies = await searchMovies(input.value);

    container.innerHTML = movies.map(m => {
      const poster = m.Poster !== "N/A"
        ? m.Poster
        : "images/placeholder-300.webp";

      return `
        <div>
          <h3>${m.Title}</h3>
          <img
            src="${poster}"
            alt="${m.Title}"
            loading="lazy"
            style="max-width:150px;border-radius:8px;"
          >
          <p>${m.Year}</p>
        </div>
      `;
    }).join("");
  } catch (error) {
    container.innerHTML = "<p>Failed to load movies.</p>";
  }
}

/* -----------------------------
   CRYPTO FEATURE
----------------------------- */
async function loadCrypto() {
  const container = document.getElementById("crypto-container");
  if (!container) return;

  try {
    const crypto = await getCrypto();

    container.innerHTML = crypto.map(c => `
      <p><strong>${c.asset_id}</strong>: $${Number(c.price_usd).toFixed(2)}</p>
    `).join("");
  } catch (error) {
    container.innerHTML = "<p>Failed to load crypto data.</p>";
  }
}

/* -----------------------------
   NEWS FEATURE
----------------------------- */
async function loadNews() {
  const container = document.getElementById("news-container");
  if (!container) return;

  try {
    const news = await getNews();

    container.innerHTML = news.map(n => `
      <article style="margin-bottom:1rem;">
        <h3>${n.title}</h3>
        <p>${n.description || ""}</p>
        <a href="${n.url}" target="_blank" rel="noopener">Read more</a>
      </article>
    `).join("");
  } catch (error) {
    container.innerHTML = "<p>Failed to load news.</p>";
  }
}

/* -----------------------------
   EVENT LISTENERS
----------------------------- */
document.getElementById("load-dog")?.addEventListener("click", loadDog);
document.getElementById("search-movie")?.addEventListener("click", loadMovies);

/* -----------------------------
   AUTO INITIALIZE PER PAGE
----------------------------- */
loadCrypto();
loadNews();