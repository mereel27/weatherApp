import { memo } from 'react';
import { getWindDirect } from '../../utils/utils';
import {
  WiStrongWind,
  WiHumidity,
  WiBarometer,
  WiWindDeg,
  WiUmbrella,
  WiRaindrop
} from 'react-icons/wi';
import './Daily.css';

const Daily = memo(({ data, getDate, windUnit }) => {
  const precibIcon = window.innerWidth <= 640 ? <WiRaindrop /> : <WiUmbrella size="2em"/>;
  return (
    <div className="forecast">
      {data.daily.forecast.map((day, index) => (
        <div className="day-forecast" key={index}>
          <div className="date-info">
            <span className="date">{index === 0 ? 'Сегодня' : getDate(day.date)[0]}</span>
            <span className="info small">{getDate(day.date)[1]}</span>
          </div>
          <img
            className="weather-icon"
            /* src={
              require(`../../img/weather/${day.symbol}.svg`).default
            } */ src={`${process.env.REACT_APP_ICON_URL}${day.symbol}.svg`}
            alt={day.symbolPhrase}
            title={day.symbolPhrase}
          />
          <span className="info daily-temp">{`${Math.round(
            day.maxTemp
          )}° / ${Math.round(day.minTemp)}°`}</span>
          <div className="info extra precipProb" title="Вероятность осадков">
            {precibIcon} <span>{day.precipProb}%</span>
          </div>
          <span className="info extra" title="Количество осадков">
            <WiRaindrop size="2em" /> {day.precipAccum} мм
          </span>
          <span className="info extra" title="Скорость ветра">
            <WiStrongWind size="2em" /> {day.maxWindSpeed} {windUnit}
          </span>
          <span
            className="info extra"
            title={`Направление ветра: ${getWindDirect(day.windDir)}`}
            style={{ transform: `rotate(${day.windDir}deg)` }}
          >
            <WiWindDeg size="2em" />
          </span>
          <span className="info extra" title="Относительная влажность">
            <WiHumidity size="2em" />
            {day.minRelHumidity}%
          </span>
          <span className="info extra" title="Атмосферное давление">
            <WiBarometer size="2em" />
            {day.pressure.toFixed()} hPa
          </span>
        </div>
      ))}
    </div>
  );
});

export default Daily;
