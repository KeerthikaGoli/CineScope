import { useContext } from "react";
import { WatchlistContext } from "../context/WatchlistContext";
import MovieCard from "../components/MovieCard";

function Watchlist() {
  const { watchlist } = useContext(WatchlistContext);

  return (
    <main className="watchlist-page">
      <h1 style={{ marginBottom: "30px" }}>My Watchlist</h1>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="movie-grid">
          {watchlist.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export default Watchlist;