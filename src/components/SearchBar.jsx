import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    navigate(
      `/search?query=${encodeURIComponent(trimmedQuery)}`
    );
  }

  

  return (
    <form
      className="search-bar search-form"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(event) =>
          setQuery(event.target.value)
        }
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;