import React, { useEffect, useState } from "react";
import ChooseCity from "../components/ChooseCity/ChooseCity.tsx";
import MainWeather from "../components/MainWeather/MainWeather.tsx";
import NextDayWeatherTable from "../components/NextDayWeatherTable/NextDayWeatherTable.tsx";
import { useGeoLocation } from "../hooks/useGeolocation.tsx";
import {
  fetchWeatherByCityName,
  fetchWeatherByGeo,
} from "../service/MainPageService.ts";
import { WeatherData, WeatherDataFiveDays } from "../types/types.ts";

interface City {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  UserCities: {
    id: number;
    cityId: number;
    userId: number;
  };
}

const MainPage: React.FC = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherFiveDays, setWeatherFiveDays] =
    useState<WeatherDataFiveDays | null>(null);
  const [cityName, setCityName] = useState<string>("");
  const [favoriteCities, setFavoriteCities] = useState<City[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const getPayloadFromToken = (token: string) => {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = JSON.parse(atob(base64));
        return jsonPayload;
      };
      const payload = getPayloadFromToken(token);
      setFavoriteCities(payload.favoriteCities || []);
    }
  }, []);

  const { geo } = useGeoLocation();

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        if (cityName) {
          const { weather, weatherFiveDays } = await fetchWeatherByCityName(
            cityName
          );
          setWeather(weather);
          setWeatherFiveDays(weatherFiveDays);
        } else if (geo) {
          const { weather, weatherFiveDays } = await fetchWeatherByGeo(
            geo.lat,
            geo.lon
          );
          setWeather(weather);
          setWeatherFiveDays(weatherFiveDays);
        }
      } catch (err) {
        setError("Failed to fetch weather data");
      }
    };

    fetchWeather();
  }, [geo, cityName]);

  return (
    <div>
      <ChooseCity
        weather={weather}
        setCityName={setCityName}
        favoriteCities={favoriteCities}
      />
      <MainWeather weather={weather} />
      <NextDayWeatherTable weatherFiveDays={weatherFiveDays} />
    </div>
  );
};

export default MainPage;
