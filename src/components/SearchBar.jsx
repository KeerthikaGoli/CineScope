function SearchBar({ value, onChange, onSubmit }) {
  return (
    <form className="search-form" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={value}
        onChange={onChange}
      />

      <button type="submit">
        Search
      </button>
    </form>
  );
}

export default SearchBar;