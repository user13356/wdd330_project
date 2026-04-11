import { CONFIG } from "../utils/config.js";

export async function getRandomDog() {
  const res = await fetch("https://api.thedogapi.com/v1/images/search", {
    headers: { "x-api-key": CONFIG.DOG_API_KEY }
  });
  const data = await res.json();
  return data[0].url;
}