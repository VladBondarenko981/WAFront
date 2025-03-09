import React from "react";
import classes from "./RegistrationTable.module.css";
import MyButton from "../UI/MyButton/MyButton.tsx";
import MyInput from "../UI/MyInput/MyInput.tsx";

interface RegistrationTableProps {
  email: string;
  password: string;
  username: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  onRegistration: () => void;
  error: string;
  successMessage: string;
}

const RegistrationTable: React.FC<RegistrationTableProps> = ({
  email,
  password,
  username,
  setEmail,
  setPassword,
  setUsername,
  onRegistration,
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
      <div className={classes.inputContainer}>
        <label htmlFor="username">Enter your username:</label>
        <MyInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <MyButton onClick={onRegistration}>Click</MyButton>
      {successMessage ? <div>{successMessage}</div> : <div>{error}</div>}
    </div>
  );
};

export default RegistrationTable;
