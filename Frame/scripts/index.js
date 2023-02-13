import { fetchContent } from "./fetch.js";
import {
  createTemplateCard,
  createTemplateHeader,
  createTemplateFooter,
} from "./render.js";
import { POP_MOVIE, POP_TV, SEARCH_MOVIE } from "./api.js";

async function main() {
  try {
    const dataMovies = await fetchContent(POP_MOVIE);
    const dataTv = await fetchContent(POP_TV);
    createTemplateHeader();
    createTemplateFooter();
    createTemplateCard(dataMovies);
  } catch (error) {
    console.error(error);
  }

  // document.querySelector("form").addEventListener("submit", (event) => {
  //   event.preventDefault();
  //   const movieName = document.querySelector("input").value;
  //   searchMovies(movieName).then((movies) => {
  //     window.location.href = "list.html";
  //     localStorage.setItem("movies", JSON.stringify(movies));
  //   });
  // });

  // async function searchMovies(movieName) {
  //   const url = `${SEARCH_MOVIE}&query=${movieName}`;
  //   const movies = await fetchContent(url);
  //   return movies.results;
  // }

  // document.addEventListener("DOMContentLoaded", () => {
  //   const movies = JSON.parse(localStorage.getItem("movies"));
  //   console.log(movies)
  //   displayMovies(movies);
  // });
}

main();

