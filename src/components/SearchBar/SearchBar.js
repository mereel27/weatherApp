import { BiSearch } from 'react-icons/bi';

const SearchBar = ({
  handleSubmit,
  handleChange,
  searchResults,
  handleSearchChoice,
  city,
  focusOut,
  focusOn
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Поиск"
          value={city}
          onChange={handleChange}
          onFocus={focusOn}
          onBlur={focusOut}
        ></input>
        <button id="search-button" type="submit" disabled={city ? false : true}>
          <BiSearch />
        </button>
      </form>
      {searchResults && searchResults.length > 0 && (
        <div id="search-results">
          <ul>
            {searchResults.map((res) => (
              <li key={res.id} id={res.id} onClick={handleSearchChoice}>
                <span>{res.name}</span>, {res.country}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
