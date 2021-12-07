import { getWindDirect } from "../../utils/utils";
import {
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiWindDeg
} from 'react-icons/wi';
import './Daily.css';

const Daily = ({ data, getDate }) => {
  return (
    <div className="forecast">
      {data.daily.forecast.map((day, index) => (
        <div className="day-forecast" key={index}>
            <div className="date-info">
              <span className='date'>{getDate(day.date)[0]}</span>
              <span className="info small">{getDate(day.date)[1]}</span>
            </div>
          <img
            className="weather-icon"
            src={require(`../../img/weather/${day.symbol}.svg`).default}  /* src={`${process.env.REACT_APP_ICON_URL}${day.symbol}.png`} */
            alt={day.symbolPhrase}
            title={day.symbolPhrase}
          />
          <span className="info daily-temp">{`${Math.round(day.maxTemp)}° / ${Math.round(day.minTemp)}°`}</span>
          <span className="info extra" title="Скорость ветра">
            <WiStrongWind size="2em" /> {day.maxWindSpeed} m/s
          </span>
          <span
            className="info extra"
            title={`Направление ветра: ${getWindDirect(day.windDir)}`}
            style={{ transform: `rotate(${day.windDir}deg)` }}
          >
            <WiWindDeg size="2.2em" />
          </span>
          <span className="info extra" title="Относительная влажность">
            <WiHumidity size="2.2em" />
            {day.minRelHumidity}%
          </span>
          <span className="info extra" title="Атмосферное давление">
            <WiBarometer size="2.2em" />
            {day.pressure.toFixed()} hPa
          </span>
        </div>
      ))}
    </div>
  );
};

export default Daily;