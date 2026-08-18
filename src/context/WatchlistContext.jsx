import { createContext, useEffect, useState } from "react";

export const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem("watchlist");

    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  function addToWatchlist(movie) {
    setWatchlist((currentWatchlist) => {
      const alreadyExists = currentWatchlist.some(
        (item) => item.id === movie.id,
      );

      if (alreadyExists) {
        return currentWatchlist;
      }

      return [...currentWatchlist, movie];
    });
  }

  function removeFromWatchlist(movieId) {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== movieId),
    );
  }

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        setWatchlist,
        addToWatchlist,
        removeFromWatchlist,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export default WatchlistProvider;
