import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Current from "./Current";

let container = null;
beforeEach(() => {
  // подготавливаем DOM-элемент, куда будем рендерить
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // подчищаем после завершения
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders with or without a name", () => {
  act(() => {
    render(<Current />, container);
  });
  expect(container).toBe(true);

  act(() => {
    render(<Current data={dataCurrent} />, container);
  });
  expect(container.getElementById('name')).toBe("Ставангер");
});


const dataCurrent = {
  "location": {
      "id": 103137115,
      "name": "Ставангер",
      "country": "Норвегия",
      "timezone": "Europe/Oslo",
      "adminArea": "Rogaland Fylke",
      "lon": 5.75,
      "lat": 58.966667175
  },
  "current": {
      "time": "2021-12-12T18:31+01:00",
      "symbol": "n300",
      "symbolPhrase": "преимущественно облачно",
      "temperature": 6,
      "feelsLikeTemp": 3,
      "relHumidity": 92,
      "dewPoint": 4,
      "windSpeed": 4,
      "windDir": 150,
      "windDirString": "SE",
      "windGust": 7,
      "precipProb": 3,
      "precipRate": 0,
      "cloudiness": 93,
      "thunderProb": 0,
      "uvIndex": 0,
      "pressure": 1014.99,
      "visibility": 41558
  }
}

const symbols = ['d000', 'd100', 'd200', 'd300', 
'd400', 'd500', 'd600', 'd210', 'd310', 'd410', 
'd220', 'd320', 'd420', 'd430', 'd240', 'd340', 
'd440', 'd211', 'd311', 'd411', 'd221', 'd321', 
'd421', 'd431', 'd212', 'd312', 'd412', 'd222', 
'd322', 'd422', 'd432', 'n000', 'n100', 'n200', 
'n300', 'n400', 'n500', 'n600', 'n210', 'n310', 
'n410', 'n220', 'n320', 'n420', 'n430', 'n240', 
'n340', 'n440', 'n211', 'n311', 'n411', 'n221', 
'n321', 'n421', 'n431', 'n212', 'n312', 'n412', 
'n222', 'n322', 'n422', 'n432'];
