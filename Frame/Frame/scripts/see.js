import { TOP_TV, TOP_MOV } from "./api.js";
import { createTemplateInfo, createTemplateFooter } from "./render.js";
import { fetchDetails } from "./fetch.js";

const btnPeliculas = document.querySelector("#btn-pelis");
const btnSeries = document.querySelector("#btn-series");
const resultado = document.querySelector("#resultado");
//Agreguem event listener per afegir peli a llista
const btnAdd = document.querySelector(".btn-afegir");
console.log(btnAdd);
async function getRandomMedia(category) {
  const url = category === "movie" ? TOP_MOV : TOP_TV;
  const response = await fetch(url);
  const data = await response.json();
  const mediaList = data.results;
  //Calcula número aleatori, serveix per obtenir l'element dins de la llista
  const randomIndex = Math.floor(Math.random() * mediaList.length);
  const randomMedia = mediaList[randomIndex];
  const media = await fetchDetails(category, randomMedia.id);
  createTemplateInfo(media);
  resultado.textContent = "";
}


createTemplateFooter();

btnPeliculas.addEventListener("click", () => {
  getRandomMedia("movie");
});

btnSeries.addEventListener("click", () => {
  getRandomMedia("tv");
});

btnAdd.addEventListener("click", () => {
  console.log("okkk");
});
