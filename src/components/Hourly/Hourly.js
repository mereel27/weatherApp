import { WiRaindrop } from 'react-icons/wi';

const Hourly = ({ data, getDate }) => {
  return (
    <div className="hourly-container">
      <div className="hourly-forecast">
        {data.hourly.forecast.map((hour, index) => (
          <div className="hour" key={index}>
            <span className="info">{getDate(hour.time)[2]}</span>
            {hour.precipProb > 15 && (
              <div className="info precib" title="chance of rain">
                <WiRaindrop size="1.5em" />
                {hour.precipProb}%
              </div>
            )}
            <img
              className="img-sm "
              src={require(`../../img/weather/${hour.symbol}.svg`).default}
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