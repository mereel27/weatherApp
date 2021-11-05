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
    console.log(timeoutID);
    setCity(e.target.value);
    if (timeoutID) {
      clearTimeout(timeoutID);
      timeoutID = null;
    }
    timeoutID = setTimeout(() => {
      Foreca.getLocation(city)
      .then(response => console.log(response));
    }, 2000)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    setCity('');
  };

  const getWeather = async () => {
    const locInfo = await Foreca.getLocation(city);
    console.log(locInfo);
    const allData = await Foreca.getAllData(locInfo.id);
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
      id={data ? data.current.symbol.replace(' ', '') : 'clear-day'}
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
      {data && (
        <div className="day">
          <Current data={data} getDate={getDate} />
          <Hourly data={data} getDate={getDate} />
          <Daily data={data} getDate={getDate} />
          <div id="more">
            <a href={`https://www.foreca.com/${data.location.id}/${data.location.name}-${data.location.adminArea}-${data.location.country}`}rel="noreferrer" target='_blank'>Детальный прогноз</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
