import { CONFIG } from "../utils/config.js";

export async function getNews() {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&pageSize=5&apiKey=${CONFIG.NEWS_API_KEY}`
  );

  const data = await res.json();
  return data.articles || [];
}