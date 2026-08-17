import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movieApi";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovieDetails() {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);

        setMovie(data);
      } catch (error) {
        setError("Failed to load movie details.");
      } finally {
        setLoading(false);
      }
    }

    fetchMovieDetails();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading movie...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  if (!movie) {
    return <p className="status-message">Movie not found.</p>;
  }

  return (
    <main className="movie-details">

      <div className="details-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>

      <div className="details-content">

        <p className="details-label">
          {movie.release_date?.slice(0, 4)}
        </p>

        <h1>{movie.title}</h1>

        <div className="details-meta">
          <span>⭐ {movie.vote_average.toFixed(1)}</span>

          <span>
            {movie.runtime ? `${movie.runtime} min` : "Runtime unavailable"}
          </span>
        </div>

        <div className="genres">
          {movie.genres?.map((genre) => (
            <span key={genre.id}>
              {genre.name}
            </span>
          ))}
        </div>

        <p className="overview">
          {movie.overview}
        </p>

      </div>

    </main>
  );
}

export default MovieDetails;