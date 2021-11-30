import { WiRaindrop } from 'react-icons/wi';

const Hourly = ({ data, getDate }) => {
  return (
    <div className="hourly-container">
      <div className="hourly-forecast">
        {data.hourly.forecast.map((hour, index) => (
          <div className="hour" key={index}>
            <span className="info">{getDate(hour.time)[2]}</span>
            {hour.precipProb > 15 && (
              <div className="info precib" title="Вероятность осадков">
                <WiRaindrop size="1.5em" />
                {hour.precipProb}%
              </div>
            )}
            <img
              className="img-sm "
              src={require(`../../img/weather/${hour.symbol}.svg`).default}/* src={`${process.env.REACT_APP_ICON_URL}${hour.symbol}.png`} */
              alt={hour.symbolPhrase}
              title={hour.symbolPhrase}
            />
            <span className="info hourly-info">
              {`${Math.round(hour.temperature)}°`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hourly;