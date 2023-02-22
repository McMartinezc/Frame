/*Js amb api urls*/

//clau d'accés
export const API_KEY = "api_key=76ae581f1d594bc56d7dab63f40b4ed9";
//URL TMDB
export const API_BASE = "https://api.themoviedb.org/3";
//URL movies
export const POP_MOVIE = `${API_BASE}/movie/popular?${API_KEY}&language=es`;
//URL TV
export const POP_TV = `${API_BASE}/tv/popular?${API_KEY}&language=es`;
//URL IMG
export const URL_IMG = "https://image.tmdb.org/t/p/w500/";
//URL search
export const SEARCH_MOVIE = `${API_BASE}/search/movie?${API_KEY}&language=es&query=`;
export const SEARCH_TV = `${API_BASE}/search/tv?${API_KEY}`;