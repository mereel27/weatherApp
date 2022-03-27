import { memo } from 'react';
import { IoStarOutline, IoTrash } from 'react-icons/io5';
import './Settings.css';

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
    lang,
    handleLang,
    translations,
  }) => {
    /* console.log('settings render') */
    return (
      <div id="settings-container">
        <div id="settings" className={hidden ? `hidden` : ''}>
          <span>{translations.favorites[lang]}</span>
          <ul id="savedList">
            {savedLocations.length > 0 &&
              savedLocations.map((loc) => (
                <div className="city" key={loc.id}>
                  <IoStarOutline
                    title={translations.default[lang]}
                    className={loc.id === defaultCity ? 'star gold' : 'star'}
                    onClick={() => handleChooseDefault(loc.id)}
                  />
                  <li onClick={() => handleCityClick(loc.id)}>{loc.name}</li>
                  <IoTrash
                    title={translations.delete[lang]}
                    className="remove"
                    onClick={() => handleRemoveCity(loc.id)}
                  />
                </div>
              ))}
          </ul>
          <button id="add-button" onClick={handleAddCityClick}>
            {translations.current[lang]}
          </button>
          <div id="units-settings">
            <div className="switch-container">
              <span>{translations.temp[lang]}</span>
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
              <span>{translations.wind[lang]}</span>
              <div className="radio-field">
                <input
                  type="radio"
                  id="radio-three"
                  name="switch-two"
                  value="ms"
                  defaultChecked={windUnits === 'ms'}
                  onChange={handleWind}
                />
                <label htmlFor="radio-three">
                  <span>{translations.ms[lang]}</span>
                </label>
                <input
                  className="radio-four"
                  type="radio"
                  id="radio-four"
                  name="switch-two"
                  value="kmh"
                  defaultChecked={windUnits === 'kmh'}
                  onChange={handleWind}
                />
                <label htmlFor="radio-four">
                  <span>{translations.kmh[lang]}</span>
                </label>
                <input
                  type="radio"
                  id="radio-five"
                  name="switch-two"
                  value="mph"
                  defaultChecked={windUnits === 'mph'}
                  onChange={handleWind}
                />
                <label htmlFor="radio-five">
                  <span>{translations.mph[lang]}</span>
                </label>
              </div>
            </div>
            <div className="switch-container">
              <span>{translations.lang[lang]}</span>
              <div className="radio-field">
                <input
                  /* className="radio-c" */
                  type="radio"
                  id="en"
                  name="switch-three"
                  value="en"
                  defaultChecked={lang === 'en'}
                  onChange={handleLang}
                />
                <label htmlFor="en">
                  <span>EN</span>
                </label>
                <input
                  /* className="radio-f" */
                  type="radio"
                  id="ru"
                  name="switch-three"
                  value="ru"
                  defaultChecked={lang === 'ru'}
                  onChange={handleLang}
                />
                <label htmlFor="ru">
                  <span>RU</span>
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
