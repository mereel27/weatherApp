import { WiStrongWind, WiUmbrella, WiHumidity } from 'react-icons/wi';
import Logo from '../Logo';

const Current = ({ data, getDate }) => {
  return (
    <div className="current">
      <span id="name">{data.location.name || ''}</span>
      <span className="date">{getDate(data.current.time)[0] || ''}</span>
      <span className="info" id="big-temp">
        {`${Math.round(data.current.temperature)}°`}
      </span>
      <img
        className="img-xl"
        src={`${process.env.REACT_APP_ICON_URL}${data.current.symbol}.png`}
        alt={data.current.symbolPhrase}
        title={data.current.symbolPhrase}
      />
      <p className="description">{data.current.symbolPhrase || ''}</p>
      <div className="current-more-info">
        <span className="info">
          <WiStrongWind size="1.25em" title="Скорость ветра" />{' '}
          {`${data.current.windSpeed} - ${data.current.windGust}`} м/с
        </span>
        <span className="info">
          <WiHumidity size="1.25em" title="Относительная влажность" />
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
