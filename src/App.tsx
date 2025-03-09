// В компоненте App.tsx
import React, { useState, useEffect } from "react";
import "./styles/App.css"; // Убедитесь, что путь к файлу правильный
import Header from "./components/Header/Header.tsx";
import MainPage from "./pages/MainPage.tsx";
import UserProfile from "./pages/UserProfile.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import RegistrationPage from "./pages/RegistrationPage.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/registration" element={<RegistrationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
