import React, { useState, useEffect } from "react";
import UserTable from "../components/UserTable/UserTable.tsx";
import { UserData } from "../types/types.ts";

const UserProfile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  const getPayloadFromToken = (token: string) => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = JSON.parse(atob(base64));
    return jsonPayload;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserData(getPayloadFromToken(token));
    }
  }, []);
  return <UserTable userData={userData} />;
};

export default UserProfile;
