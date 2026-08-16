function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img
        src={movie.poster}
        alt={movie.title}
        className="movie-poster"
      />

      <div className="movie-info">
        <h3>{movie.title}</h3>

        <div className="movie-meta">
          <span>⭐ {movie.rating}</span>
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>
      </div>
    </article>
  );
}

export default MovieCard;