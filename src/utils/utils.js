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

export const getMoonInfo = (deg) => {
  let iconName;
  let phaseName;
  switch (true) {
    case deg >= 0 && deg <= 13:
      iconName = 'WiMoonNew';
      break;

    case deg > 13 && deg <= 26:
      iconName = 'WiMoonWaxingCrescent1';
      break;

    case deg > 26 && deg <= 39:
      iconName = 'WiMoonWaxingCrescent2';
      break;

    case deg > 39 && deg <= 51:
      iconName = 'WiMoonWaxingCrescent3';
      break;

    case deg > 51 && deg <= 64:
      iconName = 'WiMoonWaxingCrescent4';
      break;

    case deg > 64 && deg <= 77:
      iconName = 'WiMoonWaxingCrescent5';
      break;
    
    case deg > 77 && deg < 90:
      iconName = 'WiMoonWaxingCrescent6';
      break;

    case deg >= 90 && deg <= 103:
      iconName = 'WiMoonFirstQuarter';
      break;

    case deg > 103 && deg <= 116:
      iconName = 'WiMoonWaxingGibbous1';
      break;

    case deg > 116 && deg <= 129:
      iconName = 'WiMoonWaxingGibbous2';
      break;
    
    case deg > 129 && deg <= 141:
      iconName = 'WiMoonWaxingGibbous3';
      break;

    case deg > 141 && deg <= 154:
      iconName = 'WiMoonWaxingGibbous4';
      break;

    case deg > 154 && deg <= 167:
      iconName = 'WiMoonWaxingGibbous5';
      break;

    case deg > 167 && deg < 180:
      iconName = 'WiMoonWaxingGibbous6';
      break;

    case deg >= 180 && deg <= 193:
      iconName = 'WiMoonFull';
      break;

    case deg > 193 && deg <= 206:
      iconName = 'WiMoonWaningGibbous1';
      break;

    case deg > 206 && deg <= 219:
      iconName = 'WiMoonWaningGibbous2';
      break;

    case deg > 219 && deg <= 231:
      iconName = 'WiMoonWaningGibbous3';
      break;

    case deg > 231 && deg <= 244:
      iconName = 'WiMoonWaningGibbous4';
      break;

    case deg > 244 && deg <= 257:
      iconName = 'WiMoonWaningGibbous5';
      break;

    case deg > 257 && deg < 270:
      iconName = 'WiMoonWaningGibbous6';
      break;
    
    case deg >= 270 && deg <= 283:
      iconName = 'WiMoonThirdQuarter';
      break;

    case deg > 283 && deg <= 296:
      iconName = 'WiMoonWaningCrescent1';
      break;

    case deg > 296 && deg <= 309:
      iconName = 'WiMoonWaningCrescent2';
      break;

    case deg > 309 && deg <= 321:
      iconName = 'WiMoonWaningCrescent3';
      break;

    case deg > 321 && deg <= 334:
      iconName = 'WiMoonWaningCrescent4';
      break;

    case deg > 334 && deg <= 347:
      iconName = 'WiMoonWaningCrescent5';
      break;

    case deg > 347 && deg < 360:
      iconName = 'WiMoonWaningCrescent6';
      break;
      
    case deg > 347 && deg <= 360:
      iconName = 'WiMoonWaningCrescent6';
      break;
      
    default:
      break;
  };
  switch (true) {
    case deg >= 0 && deg <= 13:
      phaseName = 'Новолуние'
      break;
    case deg > 13 && deg < 90:
      phaseName = 'Молодая луна'
      break;
    case deg >= 90 && deg <= 103:
      phaseName = 'Первая четверть';
      break;
    case deg > 103 && deg < 180:
      phaseName = 'Прибывающая луна';
      break;
    case deg >= 180 && deg <= 193:
      phaseName = 'Полнолуние';
      break;
    case deg > 193 && deg < 270:
      phaseName = 'Убывающая луна';
      break;
    case deg >= 270 && deg <= 283:
      phaseName = 'Последняя четверть';
      break;
    case deg > 283 && deg <= 296:
      phaseName = 'Старая луна';
      break;
    default:
      break;
  }

  return { iconName, phaseName };
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
    return 113;
  }
  if(currentTime < sunrise) {
    return 0;
  }
  const daytime = (sunset - sunrise) / 3600;
  const timeFromSunrise = (currentTime - sunrise) / 3600;
  const currentSunPos = 113 * (timeFromSunrise / daytime);
  console.log(Math.round(currentSunPos))
  return Math.round(currentSunPos);
};