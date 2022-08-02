import React from "react";
import { locationsContext } from "../hooks/useHistory";
import { useProvideHistory } from "../hooks/useProvideHistory";

export const ProvideHistory = ({ children }) => {
  const history = useProvideHistory();
  return (
    <locationsContext.Provider value={history}>
      {children}
    </locationsContext.Provider>
  );
};
