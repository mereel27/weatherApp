import MoonIcon from '../MoonIcon/MoonIcon';
import {
  WiDaySunny,
  WiBarometer,
  WiWindDeg,
  WiRaindrops,
  WiMoonrise,
  WiMoonset,
} from 'react-icons/wi';
import { RiEyeLine } from 'react-icons/ri';
import { getMoonInfo, uvIndex, getSunPos } from '../../utils/utils';
import { memo } from 'react';

const Details = memo(({ data, moment, tempUnits, getWindDirect, translations, lang }) => {
  const sunPos = getSunPos(
    data.daily.forecast[0].sunriseEpoch,
    data.daily.forecast[0].sunsetEpoch,
    data.current.time
  );
  return (
    <div id="details-container">
      <div className="details-block">
        <span className="details-cat-name">{translations.sunMoon[lang]}</span>
        <div id="sun-info">
          <div id="sunrise" className="details-desc">
            <span>{data.daily.forecast[0].sunrise.slice(0, 5)}</span>
          </div>
          <div id="sunset" className="details-desc">
            <span>{data.daily.forecast[0].sunset.slice(0, 5)}</span>
          </div>
          <div className="details-desc" id="daytime">
            {<span className='details-desc'>Долгота дня</span>}
            <span>
              {moment
                .utc(
                  (data.daily.forecast[0].sunsetEpoch -
                    data.daily.forecast[0].sunriseEpoch) *
                    1000
                )
                .format(`H [${translations.h[lang]}] m [${translations.min[lang]}]`)}
            </span>
          </div>
          <div id="graph">
            <div id="sun-graph" style={{ transform: `rotate(${sunPos}deg)` }}>
              {sunPos ? <WiDaySunny size="2.5em" className="sun" /> : ''}
            </div>
          </div>
        </div>
        <div className="grid-block">
          <div className="details-section col1 row1">
            <WiDaySunny size="2.5em" />
            <div className="details-desc">
              <span className="details-heading">{translations.uv[lang]}</span>
              <span>
                {data.current.uvIndex} - {translations[uvIndex(data.current.uvIndex)][lang]}
              </span>
            </div>
          </div>
          <div className="details-section col2 row1">
            <MoonIcon
              name={getMoonInfo(data.daily.forecast[0].moonPhase).iconName}
              size="2.5em"
            />
            <div className="details-desc">
              <span className="details-heading">{translations.moonPhase[lang]}</span>
              <span>
                {translations[getMoonInfo(data.daily.forecast[0].moonPhase).phaseName][lang]}
              </span>
            </div>
          </div>
          <div className="details-section col1 row2">
            <WiMoonrise size="2.5em" viewBox="5 3 20 23" />
            <div className="details-desc">
              <span className="details-heading">{translations.moonrise[lang]}</span>
              <span>
                {data.daily.forecast[0].moonrise
                  ? data.daily.forecast[0].moonrise.slice(0, 5)
                  : translations.yesterday[lang]}
              </span>
            </div>
          </div>
          <div className="details-section col2 row2">
            <WiMoonset size="2.5em" viewBox="5 3 20 23" />
            <div className="details-desc">
              <span className="details-heading">{translations.moonset[lang]}</span>
              <span>
                {data.daily.forecast[0].moonset
                  ? data.daily.forecast[0].moonset.slice(0, 5)
                  : translations.allDay[lang]}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="details-block">
        <span className="details-cat-name">{translations.details[lang]}</span>
        <div className="grid-block">
          <div className="details-section col1 row1">
            <WiBarometer size="2.5em" />
            <div className="details-desc">
              <span className="details-heading">{translations.pressure[lang]}</span>
              <span>{Math.round(data.current.pressure)} {translations.hpa[lang]}</span>
            </div>
          </div>
          <div className="details-section col2 row1">
            <WiRaindrops size="2.5em" viewBox="5 3 20 20" />
            <div className="details-desc">
              <span className="details-heading">{translations.dewPoint[lang]}</span>
              <span>
                {Math.round(data.current.dewPoint)} {tempUnits}°
              </span>
            </div>
          </div>
          <div className="details-section col1 row2">
            <RiEyeLine size="2.5em" viewBox="0 -3 24 31" />
            <div className="details-desc">
              <span className="details-heading">{translations.visibility[lang]}</span>
              <span>{Math.round(data.current.visibility / 1000)} {translations.km[lang]}</span>
            </div>
          </div>
          <div className="details-section col2 row2">
            <WiWindDeg
              size="2.5em"
              style={{ transform: `rotate(${data.current.windDir}deg)` }}
            />
            <div className="details-desc">
              <span className="details-heading">{translations.windDirShort[lang]}</span>
              <span>{translations[getWindDirect(data.current.windDir)][lang]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Details;
