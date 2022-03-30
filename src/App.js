import './App.css';
import { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
import translations from './utils/translations';
import 'moment/locale/ru';
import Foreca from './api/foreca';
import getLocationByIp from './api/whois';
import Current from './components/Current/Current';
import Hourly from './components/Hourly/Hourly';
import Daily from './components/Daily/Daily';
import SearchBar from './components/SearchBar/SearchBar';
import Settings from './components/Settings/Settings';
import WeatherEffects from './components/WeatherEffects/WeatherEffects';
import { IoMenu } from 'react-icons/io5';
import {
  windUnitsConverter,
  tempUnitsConverter,
  effectsInfo,
  getWindDirect,
} from './utils/utils';
import Details from './components/Details/Details';

let timeoutID;
let blurTimeout;

function App() {
  const [city, setCity] = useState('');
  const [defaultCity, setDefaultCity] = useState(
    Number(localStorage.getItem('defaultCity')) || ''
  );
  const [currentLocation, setCurrentLocation] = useState(defaultCity || '');
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [windUnits, setWindUnits] = useState(
    localStorage.getItem('windUnits') || 'ms'
  );
  const [tempUnits, setTempUnits] = useState(
    localStorage.getItem('tempUnits') || 'C'
  );
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem('savedLocations')) || []
  );
  const [conditions, setConditions] = useState(null);
  const [searchOn, setSearchOn] = useState(false);
  const userLang = navigator.language.slice(0, 2);
  const [lang, setLang] = useState(localStorage.getItem('weatherAppLang') || (['en', 'ru'].includes(userLang) && userLang ) || 'en');

  useEffect(() => {
    moment.locale(lang);
    let coordinates;
    const fetchData = async () => {
      coordinates =
        currentLocation ||
        (await new Promise((resolve) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
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
      const allData = await Foreca.getAllData(
        coordinates,
        windUnits.toUpperCase(),
        tempUnits,
        lang
      );
      /* console.log(allData) */
      const location = allData[0];
      const current = allData[1].current;
      const hourly = allData[2];
      const daily = allData[3];
      const newCond = effectsInfo(current.symbol);
      const sameCond = JSON.stringify(newCond) === JSON.stringify(conditions);
      if (!sameCond) {
        setConditions(newCond);
      }
      setData({ location, current, daily, hourly });
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLocation, lang]);

  const changeLocation = async (id) => {
    let locInfo;
    if (!id) {
      locInfo = await Foreca.getLocation(city, lang);
    }
    setCurrentLocation(id || locInfo[0].id);
  };

  const handleSearchOn = () => {
    setSearchOn(!searchOn);
  };

  const handleChange = (e) => {
    setCity(e.target.value);
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(() => {
      Foreca.getLocation(e.target.value, lang).then((response) => {
        setSearchResults(response);
      });
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timeoutID);
    timeoutID = null;
    setSearchResults('');
    changeLocation();
    setCity('');
  };

  const handleSearchChoice = (e) => {
    changeLocation(e.currentTarget.id);
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

  const handleAddCityClick = useCallback(() => {
    const repeatCheck = savedLocations.find((el) => el.id === data.location.id);
    if (!repeatCheck) {
      let cities = [...savedLocations, data.location];
      setSavedLocations(cities);
      localStorage.setItem('savedLocations', JSON.stringify(cities));
    }
  }, [savedLocations, data]);

  const handleChooseDefault = useCallback(
    (id) => {
      const newID = id === defaultCity ? '' : id;
      setDefaultCity(newID);
      localStorage.setItem('defaultCity', newID);
    },
    [defaultCity]
  );

  const handleLang = useCallback((e) => {
    localStorage.setItem('weatherAppLang', e.target.value);
    setLang(e.target.value);
  }, []);

  const handleWind = useCallback(
    (e) => {
      const newSpeed = windUnitsConverter(
        windUnits,
        e.target.value,
        data.current.windSpeed
      );
      const newGust = windUnitsConverter(
        windUnits,
        e.target.value,
        data.current.windGust
      );

      localStorage.setItem('windUnits', e.target.value);
      setWindUnits(e.target.value);

      setData((prevState) => ({
        ...prevState,
        current: {
          ...prevState.current,
          windSpeed: Math.round(newSpeed),
          windGust: Math.round(newGust),
        },
        daily: {
          forecast: [...prevState.daily.forecast].map((day) => ({
            ...day,
            maxWindSpeed: Math.round(
              windUnitsConverter(windUnits, e.target.value, day.maxWindSpeed)
            ),
          })),
        },
      }));
    },
    [data, windUnits]
  );

  const handleTemp = useCallback(
    (e) => {
      const newTemp = tempUnitsConverter(
        tempUnits,
        e.target.value,
        data.current.temperature
      );
      localStorage.setItem('tempUnits', e.target.value);
      setTempUnits(e.target.value);

      setData((prevState) => ({
        ...prevState,
        current: {
          ...prevState.current,
          temperature: Math.round(newTemp),
          dewPoint: tempUnitsConverter(
            tempUnits,
            e.target.value,
            prevState.current.temperature
          ),
        },
        daily: {
          forecast: [...prevState.daily.forecast].map((day) => ({
            ...day,
            maxTemp: tempUnitsConverter(tempUnits, e.target.value, day.maxTemp),
            minTemp: tempUnitsConverter(tempUnits, e.target.value, day.minTemp),
          })),
        },
        hourly: {
          forecast: [...prevState.hourly.forecast].map((day) => ({
            ...day,
            temperature: tempUnitsConverter(
              tempUnits,
              e.target.value,
              day.temperature
            ),
          })),
        },
      }));
    },
    [data, tempUnits]
  );

  const handleRemoveCity = useCallback(
    (id) => {
      if (id === defaultCity) {
        handleChooseDefault(id);
      }
      const newList = savedLocations.filter((city) => city.id !== id);
      setSavedLocations(newList);
      localStorage.setItem('savedLocations', JSON.stringify(newList));
    },
    [defaultCity, savedLocations, handleChooseDefault]
  );

  const handleCityClick = useCallback(
    (id) => {
      changeLocation(id);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [conditions, windUnits, tempUnits]
  );

  const getDate = useCallback(
    (date) => [
      moment(date).format('ddd'),
      moment(date).format('DD.MM'),
      moment(date).format('HH:mm'),
    ],
    []
  );

  return (
    <div
      className={`App ${
        conditions &&
        (conditions.night ? 'night' : conditions.cloudyDay ? 'cloudy' : '')
      }`}
      id={data ? data.current.symbol.replace(' ', '') : 'clear-day'}
    >
      {data && (
        <div className="day">
          <div id="topbar">
            <SearchBar
              searchResults={searchResults}
              city={city}
              handleSearchChoice={handleSearchChoice}
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              focusOut={focusOut}
              focusOn={focusOn}
              searchOn={searchOn}
              handleSearchOn={handleSearchOn}
              translations={translations}
              lang={lang}
            />
            <button
              className={hidden ? '' : 'menu-active'}
              id="menu"
              onClick={handleSettingsClick}
            >
              <IoMenu />
            </button>
          </div>
          <Settings
            hidden={hidden}
            defaultCity={defaultCity}
            savedLocations={savedLocations}
            handleCityClick={handleCityClick}
            handleRemoveCity={handleRemoveCity}
            handleChooseDefault={handleChooseDefault}
            handleAddCityClick={handleAddCityClick}
            handleTemp={handleTemp}
            handleWind={handleWind}
            tempUnits={tempUnits}
            windUnits={windUnits}
            lang={lang}
            handleLang={handleLang}
            translations={translations}
          />
          <WeatherEffects conditions={conditions} />
          <Current
            data={data}
            getDate={getDate}
            windUnit={windUnits}
            translations={translations}
            lang={lang}
          />
          <Hourly data={data} getDate={getDate} />
          <Daily
            data={data}
            getDate={getDate}
            windUnits={windUnits}
            getWindDirect={getWindDirect}
            translations={translations}
            lang={lang}
          />
          <div id="more">
            <a
              href={`https://www.foreca.com/${lang}/${data.location.id}/${data.location.name}-${data.location.adminArea}-${data.location.country}`}
              rel="noreferrer"
              target="_blank"
            >
              {translations.forecast[lang]}
            </a>
          </div>
          <Details
            data={data}
            moment={moment}
            tempUnits={tempUnits}
            getWindDirect={getWindDirect}
            translations={translations}
            lang={lang}
          />
        </div>
      )}
    </div>
  );
}

export default App;
