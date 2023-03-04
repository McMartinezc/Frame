import { createTemplateLlista } from "./render.js";
import { SEARCH_MOVIE, SEARCH_TV } from "./api.js";
import { fetchContent } from "./fetch.js";

//Funció que pinta el color depenent de la valoració de la pelicula
export function getColorScore(vote) {
  let color;
  if (vote >= 8) {
    color = "green";
  } else if (vote >= 5) {
    color = "orange";
  } else {
    color = "red";
  }
  return color;
}

export function setList(movieData) {
  // Obtenemos la lista de favoritos del local storage
  let favorites = localStorage.getItem("favorites");
  favorites = favorites ? JSON.parse(favorites) : [];

  //Comprovem que no existeix ja a favorits
  const existFavorite = favorites.find((item) => item.id === movieData.id);
  if (existFavorite) {
    return;
  }
  // Agregamos la información de la película a la lista de favoritos
  favorites.push(movieData);

  // Guardamos la lista actualizada en el local storage
  localStorage.setItem("favorites", JSON.stringify(favorites));

  // Actualizamos la UI de la lista de favoritos
  listFavorits();
}

//Mostra la llista de favorits
export function listFavorits() {
  // Obtenemos la lista de favoritos del local storage
  let favorites = localStorage.getItem("favorites");
  favorites = favorites ? JSON.parse(favorites) : [];

  // Actualitzem la llista
  const favoritesList = document.querySelector("#container");
  favoritesList.innerHTML = "";
  createTemplateLlista(favorites);
}

//Busca a la API el terme introduit i ajunta el resultat en una array
export async function searchContent(searchTerm) {
  const urlMovie = SEARCH_MOVIE + searchTerm;
  const urlTV = SEARCH_TV + searchTerm;
  const [movies, tv] = await Promise.all([
    fetchContent(urlMovie),
    fetchContent(urlTV),
  ]);
  const results = [...movies, ...tv];
  results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  return results;
}

//Funció que gestiona la cerca
export async function handleSearch(event) {
  event.preventDefault();
  const search = document.getElementById("search");
  const searchTerm = search.value.trim();
  if (!searchTerm) return;
  const results = await searchContent(searchTerm);
  getResults(results);
}

//Funció mostra resultat de la cerca en forma de llista
export function getResults(results) {
  const searchResults = document.getElementById("container");
  if (results.length === 0) {
    const noResults = document.createElement("p");
    noResults.textContent = "No hi ha resultats";
    return searchResults.appendChild(noResults);
  }
  searchResults.textContent = "";
  createTemplateLlista(results);
}
