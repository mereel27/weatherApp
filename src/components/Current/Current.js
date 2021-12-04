import { WiStrongWind, WiUmbrella, WiHumidity } from 'react-icons/wi';
import Logo from '../Logo';

const Current = ({ data, getDate }) => {
  return (
    <div className="current">
      <span id="country-name">{data.location.country || ''}</span>
      <span id="name">{data.location.name || ''}</span>
      <div className="info">
        <span id="big-temp">{`${Math.round(data.current.temperature)}`}</span>
        <span id="celc">°</span>
      </div>
      <img
        className="img-xl"
        src={require(`../../img/weather/${data.current.symbol}.svg`).default}/* src={`${process.env.REACT_APP_ICON_URL}${data.current.symbol}.png`} */
        alt={data.current.symbolPhrase}
        title={data.current.symbolPhrase}
      />
      <span id="description">{data.current.symbolPhrase || ''}</span>
      <div className="current-more-info">
        <span className="info" title="Скорость ветра">
          <WiStrongWind size="1.25em" />{' '}
          {`${data.current.windSpeed} - ${data.current.windGust}`} м/с
        </span>
        <span className="info" title="Относительная влажность">
          <WiHumidity size="1.25em" />
          {data.current.relHumidity}%
        </span>
        <span className="info" title="Вероятность осадков">
          <WiUmbrella size="1.25em" />
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
