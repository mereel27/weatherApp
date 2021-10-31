import './App.css';
import '../src/components/Forecast/Forecast.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import Foreca from './api/foreca';
import { BiSearch } from 'react-icons/bi';
import Current from './components/Current/Current';
import Hourly from './components/Hourly/Hourly';
import Daily from './components/Daily/Daily';

const iconURL = process.env.REACT_APP_ICON_URL;

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
      const name = allData[0].name;
      const current = allData[1].current;
      const hourly = allData[2];
      const daily = allData[3];
      console.log(allData);
      setData({ name, current, daily, hourly });
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
    console.log(city);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    setCity('');
  };

  const getWeather = async () => {
    const location = await Foreca.getLocation(city);
    console.log(location);
    const allData = await Foreca.getAllData(location.id);
    const name = allData[0].name;
    const current = allData[1].current;
    const hourly = allData[2];
    const daily = allData[3];
    setData({ name, current, daily, hourly });
  };

  const getDate = (date) => [
    moment(date).format('dddd'),
    moment(date).format('DD.MM'),
    moment(date).format('HH:mm'),
  ];

  const timeOfDay = () => {
    const day = new Date().getHours();
    if (day >= 5 && day <= 18) {
      return 'day';
    } else {
      return 'night';
    }
  };


  return (
    <div
      className="App"
      id={data ? data.current.symbolPhrase + '-' + timeOfDay() : 'clear-day'}
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
          {console.log(data.current.symbolPhrase + '-' + timeOfDay())}
          <Current data={data} getDate={getDate} iconURL={iconURL} />
          <Hourly data={data} getDate={getDate} iconURL={iconURL} />
          <Daily data={data} getDate={getDate} iconURL={iconURL} />
        </div>
      )}
    </div>
  );
}

export default App;
