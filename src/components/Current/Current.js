/* import { WiStrongWind, WiUmbrella, WiHumidity } from 'react-icons/wi'; */
import Logo from '../Logo';
import './Current.css';
import Snowfall from '../backgrounds/Snowfall';

const Current = ({ data, getDate, windUnit }) => {
  /* console.log(data) */
  return (
    <div className="current">
      <Snowfall />
      <span id="country-name">{data.location.country || ''}</span>
      <span id="name">{data.location.name || ''}</span>
      <div className="info">
        <span id="big-temp">{`${Math.round(data.current.temperature)}`}</span>
        <span id="celc">°</span>
      </div>
      <img
        className="img-xl"
        /* src={
          require(`../../img/weather/${data.current.symbol}.svg`).default
        } */ src={`${process.env.REACT_APP_ICON_URL}${data.current.symbol}.png`}
        alt={data.current.symbolPhrase}
        title={data.current.symbolPhrase}
      />
      <span id="description">{data.current.symbolPhrase || ''}</span>
      <div className="current-more-info">
        <span className="more" title="Скорость ветра">
          <span className="more-desc">Ветер:</span>
          {`${data.current.windSpeed} - ${data.current.windGust} ${windUnit}`} 
        </span>
        <span className="more" title="Относительная влажность">
          <span className="more-desc">Влажность:</span>
          {data.current.relHumidity}%
        </span>
        <span className="more" title="Вероятность осадков">
          <span className="more-desc">Осадки:</span>
         {/*  <WiUmbrella size="1.25em" /> */}
          {data.current.precipProb}%
        </span>
      </div>
      <div className="meta">
        <a href="https://www.foreca.com/ru" rel="noreferrer" target="_blank">
          <Logo className="logo" />
        </a>
        <span>{`Обновлено: ${getDate(data.current.time)[2]}`}</span>
      </div>
    </div>
  );
};

export default Current;
