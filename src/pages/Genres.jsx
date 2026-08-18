import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { getMoviesByGenre } from "../services/movieApi";
import { Link, useParams } from "react-router-dom";
import { genres } from "../data/genres";

function Genres() {
  const { id } = useParams();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchGenreMovies() {
      try {
        setLoading(true);
        setError("");

        const data = await getMoviesByGenre(id);

        setMovies(data);
      } catch (error) {
        setError("Failed to load genre movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchGenreMovies();
  }, [id]);

  if (loading) {
    return <p className="status-message">Loading movies...</p>;
  }

  if (error) {
    return <p className="status-message error">{error}</p>;
  }

  return (
    <main className="genre-page">
      <h1>{genres[id] || "Genre"} Movies</h1>

      {movies.length === 0 ? (
        <p className="status-message">No movies found.</p>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </main>
  );
}

export default Genres;
