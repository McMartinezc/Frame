import { URL_IMG } from "./api.js";

export function createTemplateCard(card) {
  const template = document.getElementById("template-card");
  const clone = template.content.cloneNode(true);

  clone.querySelector(".poster").src = URL_IMG + card.poster_path;
  clone.querySelector(".card-title").textContent = card.title;
  clone.querySelector("p").textContent = card.release_date;
  clone.querySelector("span").textContent = card.vote_average;
  document.querySelector(".llista-novetats").appendChild(clone);
}
