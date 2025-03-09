import React from "react";
import classes from "./DigitalWeather.module.css";
import { WeatherDataFiveDays } from "../../types/types";
import { WeatherInfo } from "../../types/types";

interface DigitalWeatherProops {
  weatherSlice: WeatherInfo[] | null;
  className: string;
}

const DigitalWeather: React.FC<DigitalWeatherProops> = ({
  weatherSlice,
  className,
}) => {
  return localStorage.getItem("token") ? (
    <table className={`${classes[className]}`}>
      <tr>
        {weatherSlice?.map((el, index) => {
          const startTime =
            weatherSlice.length < 8 ? 24 - weatherSlice.length * 3 : 0;
          return (
            <td>{(startTime + index * 3).toString().padStart(2, "0")}:00</td>
          );
        })}
      </tr>
      <tr>
        {weatherSlice?.map((el) => {
          return (
            <td>
              <img src={`https://openweathermap.org/img/wn/${el.icon}.png`} />
            </td>
          );
        })}
      </tr>
      <th>Air temperature, °C</th>
      <tr>
        {weatherSlice?.map((el) => {
          return <td>{el.temp.toFixed(0)} °C</td>;
        })}
      </tr>
      <th>Gusts of wind m/c</th>
      <tr>
        {weatherSlice?.map((el) => {
          return <td>{el.wind} km/h</td>;
        })}
      </tr>
    </table>
  ) : (
    <table className={`${classes[className]}`}>
      <tr>
        <th>To see the weather you need to Login!</th>
      </tr>
    </table>
  );
};

export default DigitalWeather;
