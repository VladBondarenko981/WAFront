import React from "react";
import NextDayWeather from "../NextDayWeather/NextDayWeather.tsx";
import classes from "./NextDayWeatherTable.module.css";
import { WeatherDataFiveDays, WeatherInfo } from "../../types/types"; // Импортируем типы
import DigitalWeather from "../DigitalWeather/DigitalWeather.tsx";
import { useState } from "react";

interface NextDayWeatherTableProps {
  weatherFiveDays: WeatherDataFiveDays | null;
}

const NextDayWeatherTable: React.FC<NextDayWeatherTableProps> = ({
  weatherFiveDays,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const handleOutsideClick = (e: React.MouseEvent) => {
    if (
      !(e.target as HTMLElement).closest(`.${classes.nextDaysWeatherTable}`)
    ) {
      setActiveIndex(null);
    }
  };

  if (!weatherFiveDays || !weatherFiveDays.weather) {
    return <div>Loading...</div>;
  }

  const partWeather: WeatherInfo[][] = [];
  let index = 0;

  const data = new Date();
  const indexTodayWeather = Math.floor((24 - data.getHours()) / 3);

  partWeather.push(
    weatherFiveDays.weather.slice(index, index + indexTodayWeather)
  );
  index += indexTodayWeather;

  for (let i = 0; i < 4; i++) {
    partWeather.push(weatherFiveDays.weather.slice(index, index + 8));
    index += 8;
  }
  if (partWeather[0].length === 0) partWeather[0].push(partWeather[1][0]);
  return (
    <div>
      <div className={classes.nextDaysWeatherTable}>
        {partWeather.map((weatherSlice, index) => (
          <NextDayWeather
            key={index}
            dayIndex={index}
            weatherSlice={weatherSlice}
            onClick={() => handleClick(index)}
          />
        ))}
      </div>
      <div className={classes.DigitalWeatherTable}>
        {partWeather.map((weatherSlice, index) => (
          <DigitalWeather
            key={index}
            weatherSlice={weatherSlice}
            className={activeIndex === index ? "tableActive" : "tableHidden"}
          />
        ))}
      </div>
    </div>
  );
};

export default NextDayWeatherTable;
