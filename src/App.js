import './App.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Foreca from './api/foreca';
import getLocationByIp from './api/whois';
import Current from './components/Current/Current';
import Hourly from './components/Hourly/Hourly';
import Daily from './components/Daily/Daily';
import SearchBar from './components/SearchBar/SearchBar';
import { IoMenu, IoStarOutline } from 'react-icons/io5';

moment.locale('ru');

let timeoutID;
let blurTimeout;

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem('savedLocations')) || []
  );
  const [defaultCity, setDefaultCity] = useState(
    Number(localStorage.getItem('defaultCity')) || ''
  );

  useEffect(() => {
    console.log('i render');
    /* let lon, lat; */
    let coordinates;
    const fetchData = async () => {
      coordinates =
        defaultCity ||
        (await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              /* lon = position.coords.longitude;
            lat = position.coords.latitude;
            resolve({ lon, lat }); */
              /* coordinates = `${position.coords.longitude},${position.coords.latitude}`; */
              resolve(
                `${position.coords.longitude},${position.coords.latitude}`
              );
            },
            (error) => {
              console.log(`${error.message}`);
              resolve(getLocationByIp());
            }
          );
        }));
      const allData = await Foreca.getAllData(coordinates);
      const location = allData[0];
      const current = allData[1].current;
      const hourly = allData[2];
      const daily = allData[3];
      console.log(allData);
      setData({ location, current, daily, hourly });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(() => {
      Foreca.getLocation(e.target.value).then((response) => {
        setSearchResults(response);
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timeoutID);
    timeoutID = null;
    setSearchResults('');
    getWeather();
    setCity('');
  };

  const handleSearchChoice = (e) => {
    getWeather(e.currentTarget.id);
    setCity('');
    setSearchResults('');
  };

  const focusOut = () => {
    blurTimeout = setTimeout(() => {
      if (document.getElementById('search-results')) {
        document.getElementById('search-results').style.display = 'none';
      }
    }, 100);
  };

  const focusOn = () => {
    clearTimeout(blurTimeout);
    const searchBar = document.getElementById('search-results');
    if (searchBar) {
      searchBar.style.display = 'block';
    }
  };

  const handleSettingsClick = () => {
    setHidden(!hidden);
  };

  const handleAddCityClick = () => {
    const repeatCheck = savedLocations.find((el) => el.id === data.location.id);
    if (!repeatCheck) {
      let cities = [...savedLocations, data.location];
      setSavedLocations(cities);
      localStorage.setItem('savedLocations', JSON.stringify(cities));
    }
  };

  const handleChooseDefault = (id) => {
    const newID = id === defaultCity ? '' : id;
    setDefaultCity(newID);
    localStorage.setItem('defaultCity', newID);
  };

  const getWeather = async (id) => {
    let locInfo;
    if (!id) {
      locInfo = await Foreca.getLocation(city);
    }
    const allData = await Foreca.getAllData(id || locInfo[0].id);
    const location = allData[0];
    const current = allData[1].current;
    const hourly = allData[2];
    const daily = allData[3];
    setData({ location, current, daily, hourly });
  };

  const getDate = (date) => [
    moment(date).format('dddd'),
    moment(date).format('DD.MM'),
    moment(date).format('HH:mm'),
  ];

  return (
    <div
      className="App"
      /* id={data ? data.current.symbol.replace(' ', '') : 'clear-day'} */
    >
      {data && (
        <div className="day">
          <div id='topbar'>
            <SearchBar
              searchResults={searchResults}
              city={city}
              handleSearchChoice={handleSearchChoice}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              focusOut={focusOut}
              focusOn={focusOn}
            />
            <button id="menu" onClick={handleSettingsClick}>
              <IoMenu />
            </button>
          </div>
          <div id="settings-container">
            <div id="settings" /* hidden={hidden} */ className={hidden ? `hidden` : ''}>
              <span>Избранное:</span>
              <ul id="savedList">
                {savedLocations.length > 0 &&
                  savedLocations.map((loc) => (
                    <div className="city" key={loc.id}>
                      <li onClick={() => getWeather(loc.id)}>{loc.name}</li>
                      <IoStarOutline
                        title="Выбрать по умолчанию"
                        className={
                          loc.id === defaultCity ? 'star gold' : 'star'
                        }
                        onClick={() => handleChooseDefault(loc.id)}
                      />
                    </div>
                  ))}
              </ul>
              <button id="add-button" onClick={handleAddCityClick}>
                Добавить текущий
              </button>
            </div>
          </div>
          <Current data={data} getDate={getDate} />
          <Hourly data={data} getDate={getDate} />
          <Daily data={data} getDate={getDate} />
          <div id="more">
            <a
              href={`https://www.foreca.com/ru/${data.location.id}/${data.location.name}-${data.location.adminArea}-${data.location.country}`}
              rel="noreferrer"
              target="_blank"
            >
              Детальный прогноз
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
