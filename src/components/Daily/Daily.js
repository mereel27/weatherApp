import { memo } from 'react';
import {
  WiHumidity,
  WiBarometer,
  WiWindDeg,
  WiUmbrella,
  WiRaindrop,
} from 'react-icons/wi';
import './Daily.css';

const Daily = memo(
  ({ data, getDate, getWindDirect, windUnits, lang, translations }) => {
    const iconSize = window.innerWidth <= 640 ? '1.5em' : '2em';
    return (
      <div className="forecast">
        {data.daily.forecast.map((day, index) => (
          <div className="day-forecast" key={index}>
            <div className="date-info">
              <span className="date">
                {index === 0 ? translations.today[lang] : getDate(day.date)[0]}
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
            <div className="info extra" title={translations.precipProb[lang]}>
              <WiUmbrella size="2em" /> <span>{day.precipProb}%</span>
            </div>
            <span
              className="info extra precipRate"
              title={translations.precipRate[lang]}
            >
              <WiRaindrop size={iconSize} viewBox="0 -2 30 30" />{' '}
              {Math.round(day.precipAccum)} {translations.mm[lang]}
            </span>
            <span
              className="info extra windSpeed"
              title={translations.windSpeed[lang]}
            >
              <WiWindDeg
                style={{ transform: `rotate(${day.windDir + 180}deg)` }}
                title={`${translations.windDir[lang]}: ${translations[getWindDirect(
                  day.windDir)][lang]}`}
              />
              {day.maxWindSpeed} {translations[windUnits][lang]}
            </span>
            <span className="info extra" title={translations.relHumidity[lang]}>
              <WiHumidity size="2em" />
              {day.minRelHumidity}%
            </span>
            <span className="info extra" title={translations.pressure[lang]}>
              <WiBarometer size="2em" />
              {day.pressure.toFixed()} {translations.hpa[lang]}
            </span>
          </div>
        ))}
      </div>
    );
  }
);

export default Daily;
