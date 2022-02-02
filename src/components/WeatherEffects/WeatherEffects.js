import './WeatherEffects.css';
import { useEffect } from 'react';
import * as PrecipEffect from '../../utils/PrecipEffect';
import * as Stars from '../../utils/stars';
import { memo } from 'react';

const WeatherEffects = memo(({conditions}) => {
  const {rain, snow, night, cloudiness, cloudyDay} = conditions;
  const clearNight = !cloudiness && night;
  const clearDay = !cloudiness && !night;
  const precip = rain || snow;
  /* console.log(`Clear day - ${clearDay}`) */
  
  useEffect(() => {
      if(clearNight) {
        const stars = new Stars.default({
          id: 'weather-effect',
        });
        stars.animate();
      }
      if(precip) {
        const precipEffect = new PrecipEffect.default({
          mode: snow ? 'snow' : 'rain',
          id: 'weather-effect',
          min_size: 1,
          max_size: 2
        });
        precipEffect.start();
      }
      return () => {
        const canvas = document.querySelector('canvas');
        canvas && canvas.remove();
      }
  }, [clearNight, precip, snow]);
  return (
    <div id="weather-effect">
          {cloudyDay && 
            <>
            <div id="clouds-effect2"></div>
            <div id="clouds-effect3"></div>
            </>
          }
          {clearNight && <div id="moon"></div>}
          {clearDay && <div id="sun"></div>}
    </div>
  );
});

export default WeatherEffects;
