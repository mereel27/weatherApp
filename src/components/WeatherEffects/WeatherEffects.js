import './WeatherEffects.css';
import { useEffect } from 'react';
import * as PrecipEffect from '../../utils/PrecipEffect';
import * as Stars from '../../utils/stars';

const WeatherEffects = ({conditions}) => {
  const {rain, snow, night, cloudiness} = conditions;
  const clearNight = !cloudiness && night;
  const clearDay = !cloudiness && !night;
  const precip = rain || snow;
  console.log(conditions)
  console.log(clearNight)
  
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conditions]);
  return <div id="weather-effect">
          {cloudiness && <div id="clouds-effect"></div>}
          {clearNight && <div id="moon"></div>}
          {clearDay && <div id="sun"></div>}
        </div>;
};

export default WeatherEffects;
