import React, { useState } from "react";
import classes from "./LoginTable.module.css";
import MyButton from "../UI/MyButton/MyButton.tsx";
import MyInput from "../UI/MyInput/MyInput.tsx";

interface LoginTableProps {
  email: string;
  password: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  onLogin: () => void;
  error: string;
  successMessage: string;
}

const LoginTable: React.FC<LoginTableProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  onLogin,
  error,
  successMessage,
}) => {
  return (
    <div className={classes.mainStyle}>
      <div className={classes.inputContainer}>
        <label htmlFor="email">Enter your email:</label>
        <MyInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className={classes.inputContainer}>
        <label htmlFor="password">Enter your password:</label>
        <MyInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <MyButton onClick={onLogin}>Click</MyButton>
      {successMessage ? <div>{successMessage}</div> : <div>{error}</div>}
    </div>
  );
};

export default LoginTable;
