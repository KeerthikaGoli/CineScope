import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/movieApi";
import MovieCardSkeleton from "../components/MovieCardSkeleton";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get("query");
  const page = Number(searchParams.get("page")) || 1;

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  //const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [retry, setRetry] = useState(0);

  useEffect(() => {
    async function fetchSearchResults() {
      if (!query) {
        setMovies([]);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data = await searchMovies(query, page);

        setMovies(data.results);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError("Failed to search movies.");
      } finally {
        setLoading(false);
      }
    }

    fetchSearchResults();
  }, [query, page, retry]);

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (page <= 4) {
      pages.push(1, 2, 3, 4, 5, "...", totalPages);
    } else if (page >= totalPages - 3) {
      pages.push(
        1,
        "...",
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      );
    } else {
      pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
    }

    return pages;
  };

  return (
    <main className="search-page">
      <SearchBar />

      <div className="search-results-header">
        {query && <h1>Search results for "{query}"</h1>}

        {loading && <p className="status-message">Searching...</p>}

        {error && <p className="status-message error">{error}</p>}

        {!loading && !error && query && movies.length === 0 && (
          <p className="status-message">No movies found.</p>
        )}
      </div>

      <div className="movie-grid">
        {loading ? (
          Array.from({ length: 18 }).map((_, index) => (
            <MovieCardSkeleton key={index} />
          ))
        ) : error ? (
          <ErrorState
            message="We couldn't load the movies. Please try again."
            onRetry={() => setRetry(retry + 1)}
          />
        ) : movies.length === 0 && query ? (
          <EmptyState
            title="No movies found"
            message={`We couldn't find any movies matching "${query}".`}
          />
        ) : (
          movies
            .slice(0, 18)
            .map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </div>
      {!query && (
        <EmptyState
          title="Search for a movie"
          message="Enter a movie title above to discover movies."
        />
      )}
      {query && movies.length > 0 && (
        <div className="pagination">
          <button
            onClick={() =>
              setSearchParams({
                query,
                page: page - 1,
              })
            }
            disabled={page === 1}
          >
            ←
          </button>

          {getPageNumbers().map((pageNumber, index) =>
            pageNumber === "..." ? (
              <span key={`dots-${index}`} className="pagination-dots">
                ...
              </span>
            ) : (
              <button
                key={pageNumber}
                className={pageNumber === page ? "active" : ""}
                onClick={() =>
                  setSearchParams({
                    query,
                    page: pageNumber,
                  })
                }
              >
                {pageNumber}
              </button>
            ),
          )}

          <button
            onClick={() =>
              setSearchParams({
                query,
                page: page + 1,
              })
            }
            disabled={page === totalPages}
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}

export default Search;
