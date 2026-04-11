import { CONFIG } from "../utils/config.js";

export async function searchMovies(query) {
  const res = await fetch(
    `https://www.omdbapi.com/?apikey=${CONFIG.OMDB_API_KEY}&s=${query}`
  );
  const data = await res.json();
  return data.Search || [];
}