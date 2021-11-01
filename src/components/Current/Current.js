import { WiStrongWind, WiUmbrella, WiHumidity } from 'react-icons/wi';
import Logo from '../Logo';

const Current = ({ data, getDate }) => {
  return (
    <div className="current">
      <span id="name">{data.name || ''}</span>
      <span>{getDate(data.current.time)[0] || ''}</span>
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
          <WiStrongWind size="1.25em" title="wind speed" />{' '}
          {`${data.current.windSpeed} - ${data.current.windGust}`} m/s
        </span>
        <span className="info">
          <WiHumidity size="1.25em" title="air humidity" />
          {data.current.relHumidity}%
        </span>
        <span className="info" title="chance of rain">
          <WiUmbrella size="1.25em" />
          {data.current.precipProb}%
        </span>
      </div>
      <div className="meta">
        <a href="https://www.foreca.com/"><Logo className='logo' /></a>
        <span>{`Updated: ${getDate(data.current.time)[2]}`}</span>
      </div>
    </div>
  );
};

export default Current;