import { memo } from 'react';
import {
  WiHumidity,
  WiBarometer,
  WiWindDeg,
  WiUmbrella,
  WiRaindrop,
} from 'react-icons/wi';
import './Daily.css';

const Daily = memo(({ data, getDate, getWindDirect, windUnit }) => {
  const iconSize = window.innerWidth <= 640 ? '1.5em' : '2em';
  return (
    <div className="forecast">
      {data.daily.forecast.map((day, index) => (
        <div className="day-forecast" key={index}>
          <div className="date-info">
            <span className="date">
              {index === 0 ? 'Сегодня' : getDate(day.date)[0]}
            </span>
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
          <div className="info extra" title="Вероятность осадков">
            <WiUmbrella size="2em" /> <span>{day.precipProb}%</span>
          </div>
          <span className="info extra precipRate" title="Количество осадков">
            <WiRaindrop size={iconSize} viewBox="0 -2 30 30" />{' '}
            {Math.round(day.precipAccum)} мм
          </span>
          <span className="info extra windSpeed" title="Скорость ветра">
            <WiWindDeg
              style={{ transform: `rotate(${day.windDir}deg)` }}
              title={`Направление ветра: ${getWindDirect(day.windDir)}`}
            />
            {day.maxWindSpeed} {windUnit}
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
