import React, { createContext, useContext } from "react";

export const locationsContext = createContext();

export const useHistory = () => {
  const locations = useContext(locationsContext);
  return locations;
};
