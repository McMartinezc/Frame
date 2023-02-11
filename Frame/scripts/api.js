/*Js amb api urls*/

//clau d'accés
export const API_KEY = "api_key=76ae581f1d594bc56d7dab63f40b4ed9";
//URL TMDB
export const API_BASE_URL = "https://api.themoviedb.org/3";
//URL movies
export const POP_MOVIE = API_BASE_URL + "/discover/movie?sort_by=popularity.desc&" + API_KEY;
//URL TV
export const POP_TV = API_BASE_URL + "/discover/tv?sort_by=popularity.desc&" + API_KEY;
//URL IMG
export const URL_IMG = "https://image.tmdb.org/t/p/w500/";
//URL search
export const SEARCH_MOVIE = API_BASE_URL + "/search/movie?" + API_KEY;
export const SEARCH_TV = API_BASE_URL + "/search/tv?" + API_KEY;