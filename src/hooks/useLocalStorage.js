import { useState, useEffect, useRef } from "react";

export const useLocalStorage = (key) => {
  const [value, setValue] = useState();
  const isFirstRender = useRef(true);

  useEffect(() => {
    const jsonString = localStorage.getItem(key);
    setValue(JSON.parse(jsonString));
  }, []);

  useEffect(() => {
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
