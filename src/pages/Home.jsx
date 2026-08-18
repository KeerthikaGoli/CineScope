import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";

import {
  getPopularMovies,
  getTrendingMovies,
  getTopRatedMovies,
  searchMovies,
} from "../services/movieApi";


function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const featuredMovie = popularMovies[0];

  const genres = [
    {
      id: 28,
      name: "Action",
    },
    {
      id: 35,
      name: "Comedy",
    },
    {
      id: 18,
      name: "Drama",
    },
    {
      id: 27,
      name: "Horror",
    },
    {
      id: 878,
      name: "Sci-Fi",
    },
    {
      id: 10749,
      name: "Romance",
    },
    {
      id: 53,
      name: "Thriller",
    },
    {
      id: 16,
      name: "Animation",
    },
  ];

  useEffect(() => {

    async function fetchHomeMovies() {

      try {

        setLoading(true);
        setError("");

        const [
          popular,
          trending,
          topRated,
        ] = await Promise.all([
          getPopularMovies(),
          getTrendingMovies(),
          getTopRatedMovies(),
        ]);

        setPopularMovies(popular);
        setTrendingMovies(trending);
        setTopRatedMovies(topRated);

      } catch (error) {

        console.error(error);

        setError(
          "Something went wrong while loading movies."
        );

      } finally {

        setLoading(false);

      }

    }

    fetchHomeMovies();

  }, []);

  // SEARCH INPUT

  function handleSearchChange(event) {

    setSearchQuery(event.target.value);

  }
  // SEARCH MOVIES

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

      setSearchResults(data.results || []);

    } catch (error) {

      console.error(error);

      setError(
        "Something went wrong while searching."
      );

      setSearchResults([]);

    } finally {

      setLoading(false);

    }

  }
  // CLEAR SEARCH

  function handleClearSearch() {

    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    setError("");

  }
  // SCROLL TO POPULAR

  function scrollToPopular() {

    document
      .querySelector(".popular-section")
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }
  // RENDER

  return (

    <main className="home">


      {/* =================================================
          FEATURED MOVIE HERO
      ================================================= */}

      {!isSearching &&
        !loading &&
        featuredMovie && (

          <section
            className="hero"

            style={{
              backgroundImage: `
                linear-gradient(
                  to right,
                  rgba(0, 0, 0, 0.82) 0%,
                  rgba(0, 0, 0, 0.62) 32%,
                  rgba(0, 0, 0, 0.28) 62%,
                  rgba(0, 0, 0, 0.05) 100%
                ),
                linear-gradient(
                  to top,
                  rgba(0, 0, 0, 0.65) 0%,
                  transparent 45%
                ),
                url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})
              `, 
            }}
          >

            <div className="hero-content">

              <p className="hero-subtitle">
                FEATURED MOVIE
              </p>

              <h1>
                {featuredMovie.title}
              </h1>

              <div className="hero-meta">

                <span>
                  ⭐{" "}
                  {featuredMovie.vote_average?.toFixed(1)}
                </span>

                <span>
                  {featuredMovie.release_date?.slice(0, 4)}
                </span>

              </div>

              <p className="hero-description">
                {featuredMovie.overview}
              </p>

              <div className="hero-actions">

                <Link
                  to={`/movie/${featuredMovie.id}`}
                  className="hero-button primary"
                >
                  View Details
                </Link>

                <button
                  className="hero-button secondary"
                  onClick={scrollToPopular}
                >
                  Explore Movies
                </button>

              </div>

            </div>

          </section>

        )}


      {/* DISCOVER / SEARCH*/}

      {!isSearching && (

        <section className="discover-section">

          <div className="discover-heading">

            <h2>
              Find your next movie
            </h2>

            <p>
              Search through thousands of movies
              and discover something new.
            </p>

          </div>

          <SearchBar
            value={searchQuery}
            onChange={handleSearchChange}
            onSubmit={handleSearch}
          />

        </section>

      )}


      {/* SEARCH RESULTS*/}

      {isSearching && (

        <section className="movies-section search-section">

          <div className="section-heading">

            <div>

              <h2>
                Search results for "{searchQuery}"
              </h2>

              <p>
                Movies matching your search.
              </p>

            </div>

            <button
              className="clear-button"
              onClick={handleClearSearch}
            >
              Back to Home
            </button>

          </div>


          {/* SEARCH LOADING */}

          {loading && (

            <p className="status-message">
              Searching...
            </p>

          )}


          {/* SEARCH ERROR */}

          {!loading && error && (

            <p className="status-message error">
              {error}
            </p>

          )}


          {/* NO SEARCH RESULTS */}

          {!loading &&
            !error &&
            searchResults.length === 0 && (

              <p className="status-message">
                No movies found.
              </p>

            )}


          {/* SEARCH RESULTS GRID */}

          {!loading &&
            !error &&
            searchResults.length > 0 && (

              <div className="movie-grid">

                {searchResults
                  .slice(0, 18)
                  .map((movie) => (

                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />

                  ))}

              </div>

            )}

        </section>

      )}


      {/* HOME ERROR */}

      {!isSearching && error && (

        <p className="status-message error">
          {error}
        </p>

      )}


      {/* =================================================
          POPULAR MOVIES
      ================================================= */}

      {!isSearching && (

        <section
          className="movies-section popular-section"
        >

          <div className="section-heading">

            <div>

              <h2>
                 Popular Movies
              </h2>

              <p>
                Movies everyone is talking about.
              </p>

            </div>

            <span className="scroll-hint">
              Scroll →
            </span>

          </div>


          {!loading &&
            !error &&
            popularMovies.length > 0 && (

              <div className="movie-scroll-wrapper">

                <div className="movie-scroll">

                  {popularMovies.map((movie) => (

                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />

                  ))}

                </div>

              </div>

            )}

        </section>

      )}


      {/*TRENDING MOVIES */}

      {!isSearching && (

        <section className="movies-section">

          <div className="section-heading">

            <div>

              <h2>
                 Trending Movies
              </h2>

              <p>
                Movies people are watching this week.
              </p>

            </div>

            <span className="scroll-hint">
              Scroll →
            </span>

          </div>


          {!loading &&
            !error &&
            trendingMovies.length > 0 && (

              <div className="movie-scroll-wrapper">

                <div className="movie-scroll">

                  {trendingMovies.map((movie) => (

                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />

                  ))}

                </div>

              </div>

            )}

        </section>

      )}


      {/* TOP RATED MOVIES*/}

      {!isSearching && (

        <section className="movies-section">

          <div className="section-heading">

            <div>

              <h2>
                Top Rated Movies
              </h2>

              <p>
                Some of the highest-rated movies.
              </p>

            </div>

            <span className="scroll-hint">
              Scroll →
            </span>

          </div>


          {!loading &&
            !error &&
            topRatedMovies.length > 0 && (

              <div className="movie-scroll-wrapper">

                <div className="movie-scroll">

                  {topRatedMovies.map((movie) => (

                    <MovieCard
                      key={movie.id}
                      movie={movie}
                    />

                  ))}

                </div>

              </div>

            )}

        </section>

      )}


      {/*GENRES */}

      {!isSearching && (

        <section className="genres-section">

          <div className="section-heading">

            <div>

              <h2>
                Browse by Genre
              </h2>

              <p>
                Find movies based on what you
                feel like watching.
              </p>

            </div>

            <span className="scroll-hint">
              Scroll →
            </span>

          </div>


          <div className="genre-scroll-wrapper">

            <div className="home-genres">

              {genres.map((genre) => (

                <Link
                  key={genre.id}
                  to={`/genre/${genre.id}`}
                  className="home-genre-card"
                >
                  {genre.name}
                </Link>

              ))}

            </div>

          </div>

        </section>

      )}

    </main>

  );

}


export default Home;