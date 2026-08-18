import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : "https://via.placeholder.com/342x513?text=No+Poster";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="movie-card"
    >
      <img
        src={posterUrl}
        alt={movie.title}
        className="movie-poster"
        loading="lazy"
      />

      <div className="movie-info">

        <h3>
          {movie.title}
        </h3>

        <div className="movie-meta">

          <span>
            ⭐ {movie.vote_average?.toFixed(1)}
          </span>

          <span>
            {movie.release_date?.slice(0, 4)}
          </span>

        </div>

      </div>
    </Link>
  );
}

export default MovieCard;