import React, { useState } from "react";
import classes from "./Modals.module.css";
import MyInput from "../UI/MyInput/MyInput.tsx";
import MyButton from "../UI/MyButton/MyButton.tsx";
import { changePassword } from "../../api/profileApi.ts";

interface ModalPasswordProps {
  onClose: () => void;
}

const ModalUsername: React.FC<ModalPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");

  const handleChangePassword = () => {
    changePassword({ email, password, newPassword });
    onClose();
  };

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={classes.modalContainer} onClick={handleClickOutside}>
      <div className={classes.modalContent}>
        <h2>Change user</h2>
        <label>Enter your email:</label>
        <MyInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Old Password:</label>
        <MyInput
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>New Password:</label>
        <MyInput
          type="text"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <MyButton onClick={handleChangePassword}>Change password</MyButton>
      </div>
    </div>
  );
};

export default ModalUsername;
