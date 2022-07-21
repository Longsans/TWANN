import { useContext, createContext } from "react";

export const authContext = createContext();

export const useAuth = () => {
  return useContext(authContext);
};

export const TOKEN_NAME = "token";
export const PERSIST_NAME = "persistToken";
