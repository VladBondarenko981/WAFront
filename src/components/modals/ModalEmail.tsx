import React, { useState } from "react";
import classes from "./Modals.module.css";
import MyInput from "../UI/MyInput/MyInput.tsx";
import MyButton from "../UI/MyButton/MyButton.tsx";
import { changeEmail } from "../../api/profileApi.ts";
import { useNavigate } from "react-router-dom";

interface ModalEmailProps {
  onClose: () => void;
}

const ModalUsername: React.FC<ModalEmailProps> = ({ onClose }) => {
  const [oldEmail, setOldEmail] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const navigate = useNavigate();

  const handleChangeEmail = () => {
    changeEmail({ oldEmail, newEmail });
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
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
        <label>Old email:</label>
        <MyInput
          type="text"
          value={oldEmail}
          onChange={(e) => setOldEmail(e.target.value)}
        />
        <label>New email:</label>
        <MyInput
          type="text"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <MyButton onClick={handleChangeEmail}>Change email</MyButton>
      </div>
    </div>
  );
};

export default ModalUsername;
