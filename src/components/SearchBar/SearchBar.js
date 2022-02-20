import { IoSearch } from 'react-icons/io5';
import './SearchBar.css';

const SearchBar = ({
  handleSearchOn,
  searchOn,
  handleSubmit,
  handleChange,
  searchResults,
  handleSearchChoice,
  city,
  focusOut,
  focusOn,
}) => {
  return (
    <div id="search-bar">
      <form
        onSubmit={handleSubmit}
        className={searchOn ? 'search-on' : 'search-off'}
      >
        <input
          type="text"
          placeholder="Поиск"
          value={city}
          onChange={handleChange}
          onFocus={focusOn}
          onBlur={focusOut}
        ></input>
        <button id="search-button" type="button" onClick={handleSearchOn}>
          <IoSearch />
        </button>
      </form>
      {searchResults && searchResults.length > 0 && (
        <div id="search-results">
          <ul>
            {searchResults.map((res) => (
              <li key={res.id} id={res.id} onClick={handleSearchChoice}>
                <span className="location-name">{res.name}</span>
                <span className="area">
                  {res.country}
                  {res.adminArea && `, ${res.adminArea}`}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
