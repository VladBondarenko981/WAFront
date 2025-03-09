import React, { useState } from "react";
import classes from "./Modals.module.css";
import MyInput from "../UI/MyInput/MyInput.tsx";
import MyButton from "../UI/MyButton/MyButton.tsx";
import { changeUsername } from "../../api/profileApi.ts";
import { useNavigate } from "react-router-dom";

interface ModalUsernameProps {
  onClose: () => void;
}

const ModalUsername: React.FC<ModalUsernameProps> = ({ onClose }) => {
  const [oldUsername, setOldUsername] = useState<string>("");
  const [newUsername, setNewUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleChangeUsername = async () => {
    changeUsername({ oldUsername, newUsername });
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
        <label>Old username:</label>
        <MyInput
          type="text"
          value={oldUsername}
          onChange={(e) => setOldUsername(e.target.value)}
        />
        <label>New username:</label>
        <MyInput
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <MyButton onClick={handleChangeUsername}>Change user</MyButton>
      </div>
    </div>
  );
};

export default ModalUsername;
