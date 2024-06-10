import React, { useState, createContext } from "react";
import Cookies from "js-cookie";

const AuthenticationAPI = createContext();

export const AuthenticationContext = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [deviceID, setDeviceID] = useState(0);
  const [user, setUser] = useState({
    id: "",
    fullName: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const [accessToken, setAccessToken] = useState(Cookies.get("accessToken"));

  return (
    <AuthenticationAPI.Provider
      value={{ isLogin, setIsLogin, user, setUser, deviceID, setDeviceID, accessToken, setAccessToken }}
    >
      {children}
    </AuthenticationAPI.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthenticationAPI;
