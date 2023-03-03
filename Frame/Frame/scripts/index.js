import { fetchContent, fetchDetails } from "./fetch.js";
import {
  createTemplateCard,
  createTemplateFooter,
  createTemplateHeader,
  createTemplateModalInfo,
} from "./render.js";
import { POP_MOVIE, POP_TV } from "./api.js";

async function main() {
  try {
    const dataMovies = await fetchContent(POP_MOVIE);
    const dataTv = await fetchContent(POP_TV);
    createTemplateHeader();
    createTemplateFooter();
    createTemplateCard(dataMovies, "movie");
    createTemplateCard(dataTv, "tv");
    let movieId = "";

    const listCards = document.querySelector(".container");
    listCards.addEventListener("click", async (e) => {
      if (e.target.parentNode) {
        const article = e.target.parentNode;
        movieId = article.getAttribute("id");
        const mediaType = article.getAttribute("tipo");
        const response = await fetchDetails(mediaType, movieId);
        createTemplateModalInfo(response);
      }

      // Seleccionar los elementos del DOM que vamos a necesitar
      const form = document.getElementById("form");
      const search = document.getElementById("search");
      form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const searchTerm = search.value;
        const searchResults = await fetchContent(`https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${searchTerm}`);
        localStorage.setItem("searchResults", JSON.stringify(searchResults));
        window.location.href = "list.html";
      });
    }) 
  } catch (error) {
    console.error(error);
  }
}

main();
