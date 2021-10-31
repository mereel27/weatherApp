import { getWindDirect } from "../../utils/utils";
import {
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiWindDeg
} from 'react-icons/wi';

const Daily = ({ data, getDate, iconURL }) => {
  return (
    <div className="forecast">
      {data.daily.forecast.slice(1).map((day, index) => (
        <div className="day-forecast" key={index}>
            <div className="date-info">
              <span>{getDate(day.date)[0]}</span>
              <span className="info small">{getDate(day.date)[1]}</span>
            </div>
          <img
            className="weather-icon"
            src={`${iconURL}${day.symbol}.png`}
            alt={day.symbolPhrase}
            title={day.symbolPhrase}
          />
          <span className="info daily-temp">{`${Math.round(day.maxTemp)}° / ${Math.round(day.minTemp)}°`}</span>
          <span className="info extra">
            <WiStrongWind size="2em" /> {day.maxWindSpeed} m/s
          </span>
          <span
            className="info extra"
            title={`Wind direction: ${getWindDirect(day.windDir)}`}
            style={{ transform: `rotate(${day.windDir}deg)` }}
          >
            <WiWindDeg size="2.2em" />
          </span>
          <span className="info extra">
            <WiHumidity size="2.2em" />
            {day.minRelHumidity}%
          </span>
          <span className="info extra">
            <WiBarometer size="2.2em" />
            {day.pressure.toFixed()} hPa
          </span>
        </div>
      ))}
    </div>
  );
};

export default Daily;