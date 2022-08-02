import { useContext, createContext } from "react";

export const authContext = createContext();

export const useAuth = () => {
  const auth = useContext(authContext);
  return auth;
};
