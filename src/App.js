import './App.css';
import { useEffect, useState, useCallback } from 'react';
import moment from 'moment';
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
  windText,
  effectsInfo,
} from './utils/utils';

moment.locale('ru');

let timeoutID;
let blurTimeout;

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [windUnits, setWindUnits] = useState(
    localStorage.getItem('windUnits') || 'MS'
  );
  const [tempUnits, setTempUnits] = useState(
    localStorage.getItem('tempUnits') || 'C'
  );
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem('savedLocations')) || []
  );
  const [defaultCity, setDefaultCity] = useState(
    Number(localStorage.getItem('defaultCity')) || ''
  );
  const [conditions, setConditions] = useState(null);
  /* const [isLoading, setIsLoading] = useState(false); */
  const [searchOn, setSearchOn] = useState(false);

  useEffect(() => {
    let coordinates;
    const fetchData = async () => {
      /* setIsLoading(true); */
      coordinates =
        defaultCity ||
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
        windUnits,
        tempUnits
      );
      const location = allData[0];
      const current = allData[1].current;
      const hourly = allData[2];
      const daily = allData[3];
      /* console.log(allData); */
      setConditions(effectsInfo(current.symbol));
      setData({ location, current, daily, hourly });
      /* setIsLoading(false); */
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    }, [defaultCity]);

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
    }, [data, windUnits]);

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
    }, [data, tempUnits]);

  const handleRemoveCity = useCallback(
    (id) => {
      if (id === defaultCity) {
        handleChooseDefault(id);
      }
      const newList = savedLocations.filter((city) => city.id !== id);
      setSavedLocations(newList);
      localStorage.setItem('savedLocations', JSON.stringify(newList));
    }, [defaultCity, savedLocations, handleChooseDefault]);

  const handleCityClick = useCallback(
    (id) => {
      getWeather(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [conditions]);

  const getWeather = async (id) => {
    /* setIsLoading(true); */
    let locInfo;
    if (!id) {
      locInfo = await Foreca.getLocation(city);
    }
    const allData = await Foreca.getAllData(
      id || locInfo[0].id,
      windUnits,
      tempUnits
    );
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
    /* setIsLoading(false); */
  };

  const getDate = useCallback(
    (date) => [
      moment(date).format('dddd'),
      moment(date).format('DD.MM'),
      moment(date).format('HH:mm'),
    ], []);

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
          />
          <WeatherEffects conditions={conditions}/>
          <Current
            data={data}
            getDate={getDate}
            windUnit={windText(windUnits)}
            conditions={conditions}
          />
          <Hourly data={data} getDate={getDate} />
          <Daily data={data} getDate={getDate} windUnit={windText(windUnits)} />
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
