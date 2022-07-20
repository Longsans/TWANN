import { useState, useEffect } from "react";

export const useToken = () => {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    console.log(localStorage.getItem(TOKEN_NAME));
    setAccessToken(localStorage.getItem(TOKEN_NAME));
  }, []);

  useEffect(() => {
    console.log(accessToken);
    if (accessToken) {
      localStorage.setItem(TOKEN_NAME, accessToken);
    } else {
      localStorage.removeItem(TOKEN_NAME);
    }
  }, [accessToken]);

  return [accessToken, setAccessToken];
};

export const TOKEN_NAME = "token";
export const PERSIST_NAME = "persistToken";
