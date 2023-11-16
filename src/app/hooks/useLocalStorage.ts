import { useState, useEffect } from "react";

const useLocalStorage = (key: string, defaultValue?: null | string) => {
  const isClient = typeof window !== "undefined"; // Check if window is defined

  const [state, setState] = useState(() => {
    if (isClient) {
      const storedValue = window.localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (isClient) {
      window.localStorage.setItem(key, JSON.stringify(state));
    }
  }, [key, state, isClient]);

  return [state, setState];
};

export default useLocalStorage;
