import { useContext, createContext, useEffect } from "react";
import { DateTime } from "luxon";
import jwtDecode from "jwt-decode";

export const authContext = createContext();

export const useAuth = () => {
  const auth = useContext(authContext);

  useEffect(() => {
    if (auth.token) {
      const jwt = jwtDecode(auth.token);
      const expiry = DateTime.fromSeconds(jwt.exp);
      if (expiry < DateTime.now()) {
        alert("Your session has expired, please log in again.");
        auth.signOut();
      }
    }
  });

  return auth;
};
