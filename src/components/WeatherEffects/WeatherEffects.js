import './WeatherEffects.css';
import { useEffect } from 'react';
import * as PrecipEffect from '../../utils/PrecipEffect';
import * as Stars from '../../utils/stars';
import { memo } from 'react';

const WeatherEffects = memo(({conditions}) => {
  const {rain, snow, night, cloudiness} = conditions;
  const clearNight = !cloudiness && night;
  const clearDay = !cloudiness && !night;
  const precip = rain || snow;
  console.log('effect render')
  
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
  return <div id="weather-effect">
          {cloudiness && <div id="clouds-effect"></div>}
          {clearNight && <div id="moon"></div>}
          {clearDay && <div id="sun"></div>}
        </div>;
});

export default WeatherEffects;
