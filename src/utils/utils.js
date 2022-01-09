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
  console.log(value)
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
  console.log(value);
  switch (true) {
    case prevUnit === 'C' && newUnit === 'F':
      return (value * 9/5) + 32;
    case prevUnit === 'F' && newUnit === 'C':
      return (value - 32) * 5/9;
    default:
      break;
  }
}