import React, { useState } from "react";
import RegistrationTable from "../components/RegistrationTable/RegistrationTable.tsx";
import { handleRegistration } from "../api/registrationApi.ts";
import { useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const token = await handleRegistration({ email, password, username });
      localStorage.setItem("token", token);
      setSuccessMessage("Registration successful!");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error("Registration failed", error);
      setError(error.message);
    }
  };

  return (
    <RegistrationTable
      email={email}
      password={password}
      username={username}
      setEmail={setEmail}
      setPassword={setPassword}
      setUsername={setUsername}
      onRegistration={handleSubmit}
      error={error}
      successMessage={successMessage}
    />
  );
};

export default RegistrationPage;
