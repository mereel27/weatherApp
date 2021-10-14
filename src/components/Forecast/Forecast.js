import './Forecast.css';
import { getWindDirect } from '../../utils/utils';
import { WiStrongWind, WiUmbrella, WiHumidity, WiBarometer } from 'react-icons/wi';

const Forecast = ({data, getDate, getTemp }) => {
  return (
    <div className='day' id='clear-night'>

      <div className='current'>
        <span id='name'>{data.name || ''}</span>
        <span>{getDate(data.current.time)[0] || ''}</span>
        <span className='info' id='big-temp'>{getTemp(data.current.temperature) || ''}</span>
        <img 
          className='hui2' 
          src={`https://developer.foreca.com/static/images/symbols/${data.current.symbol}.png`} 
          alt={data.current.symbolPhrase} 
          title={data.current.symbolPhrase}
        />
        <p className='description'>{data.current.symbolPhrase || ''}</p>
      </div>

      <div className="hourly-forecast">
        {data.hourly.forecast.map((hour, index) => (
          <div className='hour' key={index}>
            <span>{getDate(hour.time)[2]}</span>
            <span className='hourly-info'>{getTemp(hour.temperature)}</span>
            <img 
              className='hui3' 
              src={`https://developer.foreca.com/static/images/symbols/${hour.symbol}.png`} 
              alt={hour.symbolPhrase} 
              title={hour.symbolPhrase}
            />
            <span className='info' title='chance of rain'><WiUmbrella size='1.75em' />{hour.precipProb}%</span>
          </div>
        ))}
      </div>

      <div className='forecast'>
        {data.daily.forecast.slice(1).map((day, index) => (
          <div className='day-forecast' key={index}>
              <span>{getDate(day.date)[0]}</span>
              <span className='info'>{getDate(day.date)[1]}</span>
            <span className='info'>{`${day.maxTemp} / ${getTemp(day.minTemp)}`}</span>
            <img className='hui' src={`https://developer.foreca.com/static/images/symbols/${day.symbol}.png`} alt={day.symbolPhrase} title={day.symbolPhrase}/>
            <span className='info'><WiStrongWind size='2em'/> {day.maxWindSpeed} m/s</span>
            <span className='info'>{getWindDirect(day.windDir)}</span>
            <span className='info'><WiHumidity size='2em' />{day.minRelHumidity}%</span>
            <span className='info'><WiBarometer size='2em' />{day.pressure.toFixed()} hPa</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Forecast;