import { POP_MOVIE, POP_TV  } from "./api.js";
import { fetchContent } from "./fetch.js";

const btnPeliculas = document.querySelector("#btnPeliculas");
const btnSeries = document.querySelector("#btnSeries");
const resultado = document.querySelector("#resultado");

async function getRandomMedia(mediaType) {
  let mediaList;
  if (mediaType === "movie") {
    mediaList = await fetchContent(POP_MOVIE);
  } else if (mediaType === "tv") {
    mediaList = await fetchContent(POP_TV);
  }
  const randomIndex = Math.floor(Math.random() * mediaList.length);
  const media = mediaList[randomIndex];
  resultado.textContent = media.title || media.name;
}

btnPeliculas.addEventListener("click", () => {
  getRandomMedia("movie");
});

btnSeries.addEventListener("click", () => {
  getRandomMedia("tv");
});