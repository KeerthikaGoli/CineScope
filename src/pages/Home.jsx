import { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

import {
  getPopularMovies,
  searchMovies,
} from "../services/movieApi";

function Home() {
  const [movies, setMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const data = await getPopularMovies();

        setMovies(data);
      } catch (error) {
        setError("Something went wrong while loading movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  async function handleSearch(event) {
    event.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    try {
      setLoading(true);
      setError("");
      setIsSearching(true);

      const data = await searchMovies(query);

      setMovies(data);
    } catch (error) {
      setError("Something went wrong while searching.");
    } finally {
      setLoading(false);
    }
  }

  async function handleClearSearch() {
    setSearchQuery("");
    setIsSearching(false);
    setError("");

    try {
      setLoading(true);

      const data = await getPopularMovies();

      setMovies(data);
    } catch (error) {
      setError("Something went wrong while loading movies.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="home">

      <section className="hero">

        <p className="subtitle">
          WELCOME TO CINESCOPE
        </p>

        <h2>
          Discover your next favorite movie.
        </h2>

        <p className="description">
          Explore movies, discover hidden gems,
          and build your personal watchlist.
        </p>

        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          onSubmit={handleSearch}
        />

      </section>


      <section className="movies-section">

        <div className="section-heading">

          <div>
            <h2>
              {isSearching
                ? `Search results for "${searchQuery}"`
                : "Popular Movies"}
            </h2>

            <p>
              {isSearching
                ? "Movies matching your search."
                : "Movies everyone is talking about."}
            </p>
          </div>

          {isSearching && (
            <button
              className="clear-button"
              onClick={handleClearSearch}
            >
              Back to Popular
            </button>
          )}

        </div>


        {loading && (
          <p className="status-message">
            Loading movies...
          </p>
        )}


        {error && (
          <p className="status-message error">
            {error}
          </p>
        )}


        {!loading && !error && movies.length === 0 && (
          <p className="status-message">
            No movies found.
          </p>
        )}


        {!loading && !error && movies.length > 0 && (
          <div className="movie-grid">

            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  );
}

export default Home;