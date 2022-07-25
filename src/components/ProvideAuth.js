import React from "react";
import { authContext } from "../hooks/useAuth";
import { useProvideAuth } from "../hooks/useProvideAuth";

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {!auth.loadingInitial && children}
    </authContext.Provider>
  );
};
