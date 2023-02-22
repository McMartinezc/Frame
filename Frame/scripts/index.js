import { fetchContent } from "./fetch.js";
import {
  createTemplateHeader,
  createTemplateFooter,
  createTemplateCard,
  createTemplateFitxa,
} from "./render.js";

import { POP_MOVIE, POP_TV, SEARCH_MOVIE } from "./api.js";

async function main() {
  try {
    const dataMovies = await fetchContent(POP_MOVIE);
    const dataTv = await fetchContent(POP_TV);
    createTemplateHeader();
    createTemplateFooter();
    createTemplateCard(dataMovies, "movie");
    createTemplateCard(dataTv, "tv");
    addCardClick();
  } catch (error) {
    console.error(error);
  }

  //Función busqueda
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = document.getElementById("search").value;
      if (query) {
        try {
          const searchResults = await fetchContent(SEARCH_MOVIE(query));
          createTemplateCard(searchResults);
          addCardClick();
        } catch (error) {
          console.error(error);
        }
      }
    });
  });

  //Función clicar card
  function addCardClick() {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      card.addEventListener("click", async () => {
        const id = card.id;
        const mediaType = card.getAttribute("data-media-type");
        const details = await fetchContent(
          `https://api.themoviedb.org/3/${mediaType}/${id}?api_key=${API_KEY}&language=es`
        );
        showFitxa(details);
      });
    });
  }
  //Una vez clicada deberia abrirla en fitxa html
  function showFitxa(details) {
    const fitxaTemplate = createTemplateFitxa(details);
    const fitxaSection = document.querySelector(".fitxa");
    fitxaSection.innerHTML = "";
    fitxaSection.appendChild(fitxaTemplate);
  }
}

main();
