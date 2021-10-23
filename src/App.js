import './App.css';
import { useEffect, useState } from 'react';
import Forecast from './components/Forecast/Forecast';
import moment from 'moment';
import Foreca from './api/foreca';
import { BiSearch } from 'react-icons/bi';


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
      })
      const allData = await Foreca.getAllData(`${lon},${lat}`);
      const name = allData[0].name;
      const current = allData[1].current;
      const hourly = allData[2];
      const daily = allData[3];
      console.log(allData)
      setData({ name, current, daily, hourly });
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setCity(e.target.value);
    console.log(city)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather();
    setCity('');
  };

  const getWeather = async () => {
    const location = await Foreca.getLocation(city);
    console.log(location)
    const allData = await Foreca.getAllData(location.id);
    const name = allData[0].name;
    const current = allData[1].current;
    const hourly = allData[2];
    const daily = allData[3];
    setData({ name, current, daily, hourly });
  };

  const getDate = (date) => [moment(date).format('dddd'), moment(date).format('DD.MM'), moment(date).format('HH:mm')];
  const getTemp = (temp) => `${Math.round(temp)} °C`;
  /* const getIcon = (icon, big) => big ? `${iconURL}${icon}@2x.png` : `${iconURL}${icon}.png`; */

  return (
    <div className="App" id='clear-night'>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={handleChange}
        ></input>
        <button id='search-button' type="submit" disabled={city ? false : true}><BiSearch /></button>
      </form>
      {/* {data.cod === '404' && <div>{data.message}</div>} */}
      {data && (
        <Forecast data={data} getDate={getDate} getTemp={getTemp} />
      )}
    </div>
  );
}

export default App;

