import { memo } from 'react';
import { IoStarOutline, IoTrash } from 'react-icons/io5';

const Settings = memo(
  ({
    hidden,
    defaultCity,
    savedLocations,
    handleCityClick,
    handleRemoveCity,
    handleChooseDefault,
    handleAddCityClick,
    handleTemp,
    tempUnits,
    handleWind,
    windUnits,
  }) => {
    /* console.log('settings render') */
    return (
      <div id="settings-container">
        <div id="settings" className={hidden ? `hidden` : ''}>
          <span>Избранное:</span>
          <ul id="savedList">
            {savedLocations.length > 0 &&
              savedLocations.map((loc) => (
                <div className="city" key={loc.id}>
                  <IoStarOutline
                    title="Выбрать по умолчанию"
                    className={loc.id === defaultCity ? 'star gold' : 'star'}
                    onClick={() => handleChooseDefault(loc.id)}
                  />
                  <li onClick={() => handleCityClick(loc.id)}>{loc.name}</li>
                  <IoTrash
                    title="Удалить"
                    className="remove"
                    onClick={() => handleRemoveCity(loc.id)}
                  />
                </div>
              ))}
          </ul>
          <button id="add-button" onClick={handleAddCityClick}>
            Добавить текущий
          </button>
          <div id="units-settings">
            <div className="switch-container">
              <span>Температура:</span>
              <div className="radio-field">
                <input
                  className="radio-c"
                  type="radio"
                  id="radio-c"
                  name="switch-one"
                  value="C"
                  defaultChecked={tempUnits === 'C'}
                  onChange={handleTemp}
                />
                <label htmlFor="radio-c">
                  <span>C°</span>
                </label>
                <input
                  className="radio-f"
                  type="radio"
                  id="radio-f"
                  name="switch-one"
                  value="F"
                  defaultChecked={tempUnits === 'F'}
                  onChange={handleTemp}
                />
                <label htmlFor="radio-f">
                  <span>F°</span>
                </label>
              </div>
            </div>
            <div className="switch-container">
              <span>Ветер:</span>
              <div className="radio-field">
                <input
                  type="radio"
                  id="radio-three"
                  name="switch-two"
                  value="MS"
                  defaultChecked={windUnits === 'MS'}
                  onChange={handleWind}
                />
                <label htmlFor="radio-three">
                  <span>м/с</span>
                </label>
                <input
                  className="radio-four"
                  type="radio"
                  id="radio-four"
                  name="switch-two"
                  value="KMH"
                  defaultChecked={windUnits === 'KMH'}
                  onChange={handleWind}
                />
                <label htmlFor="radio-four">
                  <span>км/ч</span>
                </label>
                <input
                  type="radio"
                  id="radio-five"
                  name="switch-two"
                  value="MPH"
                  defaultChecked={windUnits === 'MPH'}
                  onChange={handleWind}
                />
                <label htmlFor="radio-five">
                  <span>миль/ч</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default Settings;
