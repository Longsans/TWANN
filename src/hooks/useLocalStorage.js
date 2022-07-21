import { useState, useEffect, useRef } from "react";

export const useLocalStorage = (key) => {
  const [value, setValue] = useState();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const jsonString = localStorage.getItem(key);
    setValue(JSON.parse(jsonString));
    if (key === "user") console.log(`first set: ${JSON.stringify(value)}`);
  }, []);

  useEffect(() => {
    if (key === "user") console.log(`on change: ${JSON.stringify(value)}`);
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    } else {
      localStorage.removeItem(key);
    }
  }, [value]);

  return [value, setValue];
};
