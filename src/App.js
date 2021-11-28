import './App.css';
import '../src/components/Forecast/Forecast.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import Foreca from './api/foreca';
import { BiSearch } from 'react-icons/bi';
import Current from './components/Current/Current';
import Hourly from './components/Hourly/Hourly';
import Daily from './components/Daily/Daily';

moment.locale('ru');

let timeoutID;

function App() {
  const [city, setCity] = useState('');
  const [data, setData] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    let lon, lat;
    const fetchData = async () => {
      await new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            lon = position.coords.longitude;
            lat = position.coords.latitude;
            resolve({ lon, lat });
          },
          (error) => console.log(`${error.message}`)
        );
      });
      const allData = await Foreca.getAllData(`${lon},${lat}`);
      const location = allData[0];
      const current = allData[1].current;
      const hourly = allData[2];
      const daily = allData[3];
      console.log(allData);
      setData({ location, current, daily, hourly });
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(() => {
      Foreca.getLocation(e.target.value).then((response) => {
        console.log(response);
        setSearchResults(response);
      });

    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timeoutID);
    timeoutID = null;
    setSearchResults('')
    getWeather();
    setCity('');
  };

  const handleSearchChoice = (e) => {
    console.log(e.target.id)
    getWeather(e.target.id);
    setCity('');
    setSearchResults('');
  }

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
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        ></input>
        <button id="search-button" type="submit" disabled={city ? false : true}>
          <BiSearch />
        </button>
      </form>
      {searchResults && searchResults.length > 0 &&
          <div id="search-results">
            <ul>
            {searchResults.map(res => (
              <li 
                key={res.id}
                id={res.id}
                onClick={handleSearchChoice}
              >
                  <span>{res.name}</span>, {res.country}
              </li>
            ))}
            </ul>
          </div>
        }
      {data && (
        <div className="day">
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
