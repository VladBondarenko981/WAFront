import React, { useState } from "react";
import classes from "./UserTable.module.css";
import { UserData } from "../../types/types";
import MyButton from "../UI/MyButton/MyButton.tsx";
import ModalUsername from "../modals/ModalUsername.tsx";
import ModalEmail from "../modals/ModalEmail.tsx";
import ModalPassword from "../modals/ModalPassword.tsx";

interface UserTableProps {
  userData: UserData | null;
}

const UserTable: React.FC<UserTableProps> = ({ userData }) => {
  const [isModalOpenUsername, setIsModalOpenUsername] = useState(false);
  const [isModalOpenEmail, setIsModalOpenEmail] = useState(false);
  const [isModalOpenPassword, setIsModalOpenPassword] = useState(false);

  const openModalUsername = () => setIsModalOpenUsername(true);
  const closeModalUsername = () => setIsModalOpenUsername(false);
  const openModalEmail = () => setIsModalOpenEmail(true);
  const closeModalEmail = () => setIsModalOpenEmail(false);
  const openModalPassword = () => setIsModalOpenPassword(true);
  const closeModalPassword = () => setIsModalOpenPassword(false);
  return (
    <div className={classes.mainStyle}>
      <div className={classes.partStyle}>
        <h1>Profile Photo</h1>
        <img src="https://fotoblik.ru/wp-content/uploads/2023/09/avatarki-dlia-profilia-3.webp" />
      </div>
      <div className={classes.partStyleSecond}>
        <div>
          <h1>Username:</h1>
          <h2>{userData?.username}</h2>
          <MyButton onClick={openModalUsername}>Change username</MyButton>
        </div>
        <div>
          <h1>Mail:</h1>
          <h2>{userData?.email}</h2>
          <MyButton onClick={openModalEmail}>Change User Email</MyButton>
        </div>
        <div>
          <h1>Password:</h1>
          <MyButton onClick={openModalPassword}>Change user password</MyButton>
        </div>
      </div>
      {isModalOpenUsername && <ModalUsername onClose={closeModalUsername} />}
      {isModalOpenEmail && <ModalEmail onClose={closeModalEmail} />}
      {isModalOpenPassword && <ModalPassword onClose={closeModalPassword} />}
    </div>
  );
};

export default UserTable;
