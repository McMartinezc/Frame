import { URL_IMG } from "./api.js";


export async function createTemplateCard(cardData) {
  try {
    const response = await fetch('templates.html')

    if (response.ok) {
      const templates = document.createElement('template')
      templates.innerHTML = await response.text()
      const cardTemplate = templates.content.querySelector('#template-card').content

      // Crea una copia del template para cada tarjeta
      cardData.forEach(data => {
        const cardInstance = document.importNode(cardTemplate, true)
        // Actualiza los valores del template con la información de la tarjeta
        cardInstance.querySelector(".poster").src = URL_IMG + data.poster_path;
        cardInstance.querySelector(".poster").alt = data.title;
        cardInstance.querySelector(".card-title").textContent = data.title;
        cardInstance.querySelector("p").textContent = data.release_date;
        cardInstance.querySelector("span").textContent = data.vote_average;

        // Agrega la tarjeta al contenedor
        document.querySelector(".llista-novetats").appendChild(cardInstance)
      })
    }
  } catch (err) {
    console.log(err)
  }
}

//Template de fitxa de la card seleccionada
export async function createTemplateFitxa(fitxa) {
  const response = await fetch("templates.html");
  const template = document.getElementById("template-fitxa");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".trailer").src = URL_IMG + fitxa.poster_path;
  //Trailer???
  clone.querySelector(".fitxa-title").textContent = fitxa.title;
  clone.querySelector("fitxa-data").textContent = fitxa.release_date;
  clone.querySelector("fitxa-durada").textContent = fitxa.runtime;
  clone.querySelector("puntuacio green").textContent = fitxa.vot_average;
  clone.querySelector("fitxa-actors").textContent = fitxa.genres;
  clone.querySelector("fitxa-sinopsis").textContent = fitxa.overview;
  document.querySelector("fitxa").applenChild(clone);
}

//Funció mostra els resultats de la búsqueda
export function displayMovies(movies) {
  const template = document.querySelector("#template-llista");
  const list = document.querySelector(".llista");
  list.innerHTML = "";

  for (const movie of movies) {
    const clone = template.content.cloneNode(true);
    clone.querySelector(".poster").src = URL_IMG + card.poster_path;
    clone.querySelector(".title").textContent = movie.title;
    clone.querySelector(".puntuacio").textContent = movie.vote_average;
    clone.querySelector(".data").textContent = movie.release_date;
    clone.querySelector(
      ".durada"
    ).textContent = `Duració: ${movie.runtime} minuts`;
    clone.querySelector(".sinopsis").textContent = movie.overview;
  }
  list.appendChild(clone);
}
  //Template footer 
  export async function createTemplateFooter(){
    try{
      const response = await fetch("templates.html");
      if(response.ok){
        const templates = document.createElement('template')
        templates.innerHTML = await response.text()
        const footerTemplate = templates.content.querySelector('#template-footer').content
        document.querySelector('.footer').appendChild(footerTemplate)
      }
    }catch(error){
      console.log(error);
    }
  }
  //Template header
  export async function createTemplateHeader(){
    try {
      const response = await fetch("templates.html");
      if(response.ok){
        const templates = document.createElement('template')
        templates.innerHTML = await response.text()
        const headerTemplate = templates.content.querySelector('#template-header').content
        document.querySelector('.inici').appendChild(headerTemplate)
      }
    } catch (error) {
      console.log(error);
    }
  }
