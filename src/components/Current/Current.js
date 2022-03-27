import { memo } from 'react';
import Logo from '../Logo';
import './Current.css';
import { WiHumidity, WiUmbrella, WiStrongWind } from 'react-icons/wi';

const Current = memo(({ data, getDate, windUnit, translations, lang }) => {
  /* console.log('current render') */
  return (
    <div className="current">
      <span id="country-name">{data.location.country || ''}</span>
      <span id="name">{data.location.name || ''}</span>
      <div className="info temp">
        <span id="big-temp">{`${Math.round(data.current.temperature)}`}</span>
        <span id="celc">°</span>
      </div>
      {/* <img
        className="img-xl"
         src={`${process.env.REACT_APP_ICON_URL}${data.current.symbol}.png`}
        alt={data.current.symbolPhrase}
        title={data.current.symbolPhrase}
      /> */}
      <span id="description">{data.current.symbolPhrase || ''}</span>
      <div className="current-more-info">
        <div className="more" title={translations.windSpeed[lang]}>
          <span className="more-desc">
            <WiStrongWind size="2em" />
          </span>
          <span className="more-desc">{translations.wind[lang]}</span>
          <span className="more-desc">{`${data.current.windSpeed} - ${data.current.windGust} ${translations[windUnit][lang]}`}</span>
        </div>
        <div className="more" title={translations.relHumidity[lang]}>
          <span className="more-desc">
            <WiHumidity size="2em" />
          </span>
          <span className="more-desc">{translations.humidity[lang]}</span>
          <span className="more-desc">{data.current.relHumidity}%</span>
        </div>
        <div className="more" title={translations.precipProb[lang]}>
          <span className="more-desc">
            <WiUmbrella size="2em" />
          </span>
          <span className="more-desc">{translations.precipProbShort[lang]}</span>
          <span className="more-desc">{data.current.precipProb}%</span>
        </div>
      </div>
      <div className="meta">
        <a href="https://www.foreca.com/ru" rel="noreferrer" target="_blank">
          <Logo className="logo" />
        </a>
        <span>{translations.updated[lang]}: {getDate(data.current.time)[2]}</span>
      </div>
    </div>
  );
});

export default Current;
