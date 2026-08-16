import MovieCard from "../components/MovieCard";
import movies from "../data/movies";

function Home() {
  return (
    <main className="home">
      <section className="hero">
        <p className="subtitle">WELCOME TO CINESCOPE</p>

        <h2>Discover your next favorite movie.</h2>

        <p className="description">
          Explore movies, discover hidden gems, and build your personal
          watchlist.
        </p>

        <button>Explore Movies</button>
      </section>

      <section className="movies-section">
        <div className="section-heading">
          <h2>Popular Movies</h2>
          <p>Movies everyone is talking about.</p>
        </div>

        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;