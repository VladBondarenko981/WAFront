import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import MyButton from "../UI/MyButton/MyButton.tsx";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload();
  };
  return (
    <div className={classes.mainStyle}>
      <div>
        <Link to="/">Home page</Link>
      </div>
      {localStorage.getItem("token") ? (
        <div className={classes.Log}>
          <Link to="/profile">Personal account</Link>
          <MyButton onClick={handleClick}>Выйти</MyButton>
        </div>
      ) : (
        <div className={classes.UnLog}>
          <Link to="/registration">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Header;
