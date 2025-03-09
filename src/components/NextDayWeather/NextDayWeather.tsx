import React from "react";
import classes from "./NextDayWeather.module.css";
import { WeatherInfo } from "../../types/types";

interface NextDayWeatherProps {
  weatherSlice: WeatherInfo[] | null;
  dayIndex: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>; // Обработчик клика
}

const NextDayWeather: React.FC<NextDayWeatherProps> = ({
  weatherSlice,
  dayIndex,
  onClick,
}) => {
  if (!weatherSlice || weatherSlice.length === 0) {
    return <div>Loading...</div>;
  }

  const dayWeather: WeatherInfo =
    weatherSlice.length === 1
      ? weatherSlice[0]
      : weatherSlice[Math.round(weatherSlice.length / 2)];

  const date = new Date();
  const day = date.getDate() + dayIndex;
  const month = date.getMonth() + 1;
  return (
    <div className={classes.nextDayWeather} onClick={onClick}>
      <h1>
        {day.toString().padStart(2, "0")}
        {"."}
        {month.toString().padStart(2, "0")}
      </h1>
      <img
        src={`https://openweathermap.org/img/wn/${dayWeather.icon}.png`}
        alt="weather-icon"
      />
      <h2>{dayWeather.main}</h2>
      <h3>{dayWeather.temp.toFixed(0)} °C</h3>
    </div>
  );
};

export default NextDayWeather;
