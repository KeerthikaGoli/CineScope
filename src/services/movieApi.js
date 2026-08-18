const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

async function fetchFromTMDB(endpoint) {
  const response = await fetch(
    `${BASE_URL}${endpoint}${endpoint.includes("?") ? "&" : "?"}api_key=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("TMDB request failed");
  }

  return response.json();
}


export async function getPopularMovies() {
  const data = await fetchFromTMDB("/movie/popular");

  return data.results;
}


export async function getTrendingMovies() {
  const data = await fetchFromTMDB("/trending/movie/week");

  return data.results;
}

export async function getTopRatedMovies() {
  const data = await fetchFromTMDB("/movie/top_rated");

  return data.results;
}

export async function searchMovies(query, page = 1) {
  const data = await fetchFromTMDB(
    `/search/movie?query=${encodeURIComponent(query)}&page=${page}`
  );

  return data;
}

export async function getMovieDetails(id) {
  return fetchFromTMDB(`/movie/${id}`);
}

export async function getSimilarMovies(id) {
  const data = await fetchFromTMDB(`/movie/${id}/similar`);

  return data.results;
}
export async function getMovieCredits(id) {
  return fetchFromTMDB(`/movie/${id}/credits`);
}

export async function getMoviesByGenre(genreId, page = 1) {
  const data = await fetchFromTMDB(
    `/discover/movie?with_genres=${genreId}&page=${page}`
  );

  return data.results;
}

export async function getMovieVideos(id) {
  const data = await fetchFromTMDB(
    `/movie/${id}/videos`
  );

  return data.results;
}