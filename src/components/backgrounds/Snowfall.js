import './Snow.css';
import { useEffect } from 'react';
import * as Snow from '../../utils/snow';
import * as Stars from '../../utils/stars2';

const Snowfall = () => {
  useEffect(() => {
      console.log('snow start')
      var snow = new Stars.default({
        /* mode: 'snow', */
        id: 'snow',
        /* min_size: 1,
        max_size: 2 */
      });
      //Can run the snowfall by calling:
      /* snow.start(); */
      snow.animate();
  }, []);
  return <div id="snow">
          {/* <div id="weather-background"></div> */}
          <div id="moon"></div>
        </div>;
};

export default Snowfall;
