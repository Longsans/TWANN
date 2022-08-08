import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const useProvideHistory = () => {
  const location = useLocation();
  const [previousLocation, setPreviousLocation] = useState(location.pathname);
  const [currentLocationCopy, setCurrentLocationCopy] = useState(
    location.pathname
  );
  const isFirstNavigation = useRef(true);

  useEffect(() => {
    if (isFirstNavigation.current) {
      isFirstNavigation.current = false;
      setCurrentLocationCopy(location.pathname);
    } else {
      setPreviousLocation(currentLocationCopy);
      setCurrentLocationCopy(location.pathname);
    }
  }, [location]);

  return {
    currentLocation: currentLocationCopy,
    previousLocation,
  };
};
