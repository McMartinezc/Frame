import { SEARCH_MOVIE, SEARCH_TV } from "./api.js";
import { fetchContent } from "./fetch.js";
import { createTemplateFooter, createTemplateLlista } from "./render.js";

// Seleccionar los elementos del DOM que vamos a necesitar
const form = document.getElementById("form");
const search = document.getElementById("search");
const searchResults = document.getElementById("search-results");

// Escuchar el evento submit del formulario
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  // Obtener el valor de la búsqueda
  const searchTerm = search.value.trim();
  // Si el valor de la búsqueda está vacío, no hacer nada
  if (!searchTerm) return;
  // Construir la URL de la búsqueda de películas
  const urlMovie = SEARCH_MOVIE + searchTerm;
  // Construir la URL de la búsqueda de series
  const urlTV = SEARCH_TV + searchTerm;
  // Hacer las dos búsquedas simultáneamente
  const [movies, tv] = await Promise.all([
    fetchContent(urlMovie),
    fetchContent(urlTV),
  ]);

  // Unir los resultados de las dos búsquedas
  const results = [...movies, ...tv];
  // Ordenar los resultados por fecha de lanzamiento 
  results.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  // Limpiar los resultados anteriores
  searchResults.textContent = "";
  // Si no se encontró nada, mostrar un mensaje
  if (results.length === 0) {
    searchResults.textContent = "No se encontraron resultados";
    return;
  }
  createTemplateLlista(results);
});

createTemplateFooter();
