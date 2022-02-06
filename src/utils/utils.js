export const getWindDirect = (deg) => {
  switch (true) {
    case deg > 350 || deg <= 10:
      return 'Север';
    case deg > 10 && deg < 80:
      return 'Северо-восток';
    case deg >= 80 && deg <= 100:
      return 'Восток';
    case deg > 100 && deg < 170:
      return 'Юго-восток';
    case deg >= 170 && deg <= 190:
      return 'Юг';
    case deg > 190 && deg < 260:
      return 'Юго-запад';
    case deg >= 260 && deg <= 280:
      return 'Запад';
    case deg > 280 && deg < 350:
      return 'Северо-запад';
    default:
      return 'N/A';
  }
};

export const move = (evt) => {
  evt.preventDefault();
  evt.currentTarget.scrollLeft += evt.deltaY;
}

export const windUnitsConverter = (prevUnit, newUnit, value) => {
  switch (true) {
    case prevUnit === 'MS' && newUnit === 'KMH':
      return value * 3.6;
    case prevUnit === 'MS' && newUnit === 'MPH':
      return value * 2.237;
    case prevUnit === 'KMH' && newUnit === 'MS':
      return value / 3.6;
    case prevUnit === 'KMH' && newUnit === 'MPH':
      return value / 1.609;
    case prevUnit === 'MPH' && newUnit === 'MS':
      return value / 2.237;
    case prevUnit === 'MPH' && newUnit === 'KMH':
      return value * 1.609;
    default:
      break;
  }
};

export const windText = (unit) => {
  switch (true) {
    case unit === 'MS':
      return 'м/с';
    case unit === 'KMH':
      return 'км/ч';
    case unit === 'MPH':
    return 'миль/ч';
    default:
      break;
  }
};

export const tempUnitsConverter = (prevUnit, newUnit, value) => {
  switch (true) {
    case prevUnit === 'C' && newUnit === 'F':
      return (value * 9/5) + 32;
    case prevUnit === 'F' && newUnit === 'C':
      return (value - 32) * 5/9;
    default:
      break;
  }
};

export const effectsInfo = (symbol) => {
  const cloudiness = Number(symbol.charAt(1)) > 2 ? true : false;
  const snow = symbol.charAt(3) === '2' && Number(symbol.charAt(2)) >= 2 ? true : false;
  const rain = Number(symbol.charAt(3)) <= 1 && Number(symbol.charAt(2)) >= 2 ? true : false;
  const night = symbol.charAt(0) === 'n' ? true : false;
  const cloudyDay = !night && cloudiness;
  return {cloudiness, cloudyDay, snow, rain, night};
};

export const getSunPos = (sunrise, sunset, time) => {
  const currentTime = Math.floor(Date.parse(time) / 1000);
  /* console.log(`local time is ${time}`);
  console.log(`local epoch time is ${currentTime}`);
  console.log(`local sunset time is ${sunset}`) */
  if (currentTime > sunset) {
    return 127;
  }
  if(currentTime < sunrise) {
    return 0;
  }
  const daytime = (sunset - sunrise) / 3600;
  const timeFromSunrise = (currentTime - sunrise) / 3600;
  const currentSunPos = 127 * (timeFromSunrise / daytime);
  console.log(Math.round(currentSunPos))
  return Math.round(currentSunPos);
};