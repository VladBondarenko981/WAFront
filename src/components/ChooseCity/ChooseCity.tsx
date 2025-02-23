import React, { useState } from "react";
import classes from "./ChooseCity.module.css";
import MyButton from "../UI/MyButton/MyButton.tsx";
import MyInput from "../UI/MyInput/MyInput.tsx";
import { WeatherData } from "../../types/types.ts";
import { getCityWeather, setFavoriteCity } from "../../api/weatherApi.ts";

// Обновляем тип для favoriteCities
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
//
interface ChooseCityProops {
  weather: WeatherData | null;
  setCityName: React.Dispatch<React.SetStateAction<string>>;
  favoriteCities: City[];
}

const ChooseCity: React.FC<ChooseCityProops> = ({
  weather,
  setCityName,
  favoriteCities,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputValue(e.target.value);

  const handleChange = () => {
    setCityName(inputValue);
    setFeedback(null);
  };

  const getPayloadFromToken = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64));
    return jsonPayload;
  };

  const handleSecondChange = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует.");
      }
      const idUser = getPayloadFromToken(token);
      await setFavoriteCity(inputValue, idUser.id);
      setFeedback(`Город "${inputValue}" успешно добавлен в избранные!`);
    } catch (error) {
      console.error(error);
      setFeedback("Ошибка: не удалось добавить город в избранные.");
    }
  };

  return (
    <div className={classes.mainStyle}>
      <div>
        <h1>{weather?.name}</h1>
      </div>
      <div className={classes.secondStyle}>
        <MyInput type="text" value={inputValue} onChange={handleInputChange} />
        <MyButton onClick={handleChange}>Получить данные</MyButton>
      </div>
      <div>
        {localStorage.getItem("token") && (
          <MyButton onClick={handleSecondChange}>
            Добавить город в Избранные
          </MyButton>
        )}
      </div>
      <div>
        {favoriteCities.length > 0 ? (
          <ul className={classes.favCities}>
            {favoriteCities.map((city) => (
              <MyButton onClick={() => setCityName(city.name)}>
                {city.name}
              </MyButton>
            ))}
          </ul>
        ) : (
          <p>Ваш список избранных городов пуст.</p>
        )}
      </div>
    </div>
  );
};

export default ChooseCity;
