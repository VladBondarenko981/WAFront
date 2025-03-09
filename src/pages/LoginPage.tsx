import React, { useState } from "react";
import LoginTable from "../components/LoginTable/LoginTable.tsx";
import { handleLogin } from "../api/loginApi.ts";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = await handleLogin({ email, password });
      localStorage.setItem("token", token);
      setSuccessMessage("Login successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Login failed", error);
      setError(error.message);
    }
  };

  return (
    <LoginTable
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      onLogin={handleSubmit}
      error={error}
      successMessage={successMessage}
    />
  );
};

export default LoginPage;
