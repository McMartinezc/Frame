import { createTemplateLlista } from "./render.js";
import { SEARCH_MOVIE, SEARCH_TV } from "./api.js";
import { fetchContent } from "./fetch.js";

//Funció que pinta el color depenent de la valoració de la pelicula
export function getColorScore(vote) {
  let color;
  if (vote >= 8) {
    color="rgb(00,240,00)";
  } else if (vote >= 5) {
    color="#ffa73b";
  } else {
    color="rgb(255,26,26)";
  }
  return color;
}

export function setList(movieData) {
  // Obtenim la llista de favorits del local storage
  let favorites = localStorage.getItem("favorites");
  favorites = favorites ? JSON.parse(favorites) : [];

  //Comprovem que no existeix ja a favorits
  const existFavorite = favorites.find((item) => item.id === movieData.id);
  if (existFavorite) {
    return;
  }
  // Afegim la informació de la peli a la llista
  favorites.push(movieData);

  // Guardem la llista actualitzada en el local storage
  localStorage.setItem("favorites", JSON.stringify(favorites));

}

//Mostra la llista de favorits
export function listFavorits() {
  // Obtenim la llista de favorits del local storage
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
