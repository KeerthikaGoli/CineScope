import { useContext, useEffect, useState } from "react";
import {
  getMovieDetails,
  getSimilarMovies,
  getMovieCredits,
  getMovieVideos,
} from "../services/movieApi";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";
import { Link, useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  const { watchlist, addToWatchlist, removeFromWatchlist } =
    useContext(WatchlistContext);

  const [movie, setMovie] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        // Fetch all movie-related data at the same time
        const [movieData, similarData, creditsData, videosData] =
          await Promise.all([
            getMovieDetails(id),
            getSimilarMovies(id),
            getMovieCredits(id),
            getMovieVideos(id),
          ]);

        setMovie(movieData);
        setSimilarMovies(similarData);
        setCast(creditsData.cast);
        setVideos(videosData);
      } catch (error) {
        console.error(error);

        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  // Check if movie is already in watchlist
  const isInWatchlist = watchlist.some(
    (item) => item.id === movie?.id
  );

  // Loading state
  if (loading) {
    return (
      <p className="status-message">
        Loading movie...
      </p>
    );
  }

  // Error state
  if (error) {
    return (
      <p className="status-message error">
        {error}
      </p>
    );
  }

  // Movie not found
  if (!movie) {
    return (
      <p className="status-message">
        Movie not found.
      </p>
    );
  }

  function handleWatchlistClick() {
    if (isInWatchlist) {
      removeFromWatchlist(movie.id);
    } else {
      addToWatchlist(movie);
    }
  }

  // Find official YouTube trailer
  const trailer = videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer" &&
      video.official
  );

  return (
    <main className="movie-details-page">

      {/* =========================================
          MOVIE INFORMATION
      ========================================== */}

      <section className="movie-details">

        <div className="details-poster">

          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "https://via.placeholder.com/500x750?text=No+Poster"
            }
            alt={movie.title}
          />

        </div>


        <div className="details-content">

          <p className="details-label">
            {movie.release_date?.slice(0, 4)}
          </p>


          <h1>
            {movie.title}
          </h1>


          <div className="details-meta">

            <span>
              ⭐ {movie.vote_average?.toFixed(1)}
            </span>


            <span>
              {movie.runtime
                ? `${movie.runtime} min`
                : "Runtime unavailable"}
            </span>

          </div>


          {/* GENRES */}

          <div className="genres">

            {movie.genres?.map((genre) => (

              <Link
                key={genre.id}
                to={`/genre/${genre.id}`}
              >
                {genre.name}
              </Link>

            ))}

          </div>


          {/* OVERVIEW */}

          <p className="overview">
            {movie.overview || "No overview available."}
          </p>


          {/* WATCHLIST */}

          <button
            className="watchlist-button"
            onClick={handleWatchlistClick}
          >
            {isInWatchlist
              ? "❤️ Remove from Watchlist"
              : "🤍 Add to Watchlist"}
          </button>

        </div>

      </section>


      {/* =========================================
          TRAILER
      ========================================== */}

      {trailer && (

        <section className="trailer-section">

          <h2>
            Official Trailer
          </h2>


          <div className="trailer-container">

            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              allowFullScreen
              loading="lazy"
            />

          </div>

        </section>

      )}


      {/* =========================================
          CAST
      ========================================== */}

      {cast.length > 0 && (

        <section className="cast-section">

          <h2>
            Cast
          </h2>


          <div className="cast-grid">

            {cast
              .slice(0, 20)
              .map((actor) => (

                <div
                  className="cast-card"
                  key={actor.id}
                >

                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "https://via.placeholder.com/185x278?text=No+Image"
                    }
                    alt={actor.name}
                    loading="lazy"
                  />


                  <h3>
                    {actor.name}
                  </h3>


                  <p>
                    {actor.character}
                  </p>

                </div>

              ))}

          </div>

        </section>

      )}


      {/* =========================================
          SIMILAR MOVIES
      ========================================== */}

      {similarMovies.length > 0 && (

        <section className="similar-section">

          <h2>
            Similar Movies
          </h2>


          <div className="movie-grid">

            {similarMovies
              .slice(0, 18)
              .map((movie) => (

                <MovieCard
                  key={movie.id}
                  movie={movie}
                />

              ))}

          </div>

        </section>

      )}

    </main>
  );
}

export default MovieDetails;