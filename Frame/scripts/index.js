import { fetchContent } from "./fetch.js";
import { createTemplateCard } from "./render.js";
import { POP_MOVIE, POP_TV} from "./api.js"

async function main() {
  const dataMovies = await fetchContent(POP_MOVIE);
  const dataTv = await fetchContent(POP_TV);

  dataMovies.results.forEach((pelicula) => {
    console.log(dataMovies)
    createTemplateCard(pelicula);
  });

  dataTv.results.forEach((serie)=>{
    createTemplateCard(serie);
  })
}

main();

