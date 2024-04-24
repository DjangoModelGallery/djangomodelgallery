import { useEffect, useState } from "react";

export default function useDarkMode() {
  const [isDarkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const localTheme = window.localStorage.getItem("dark-mode");
      const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return localTheme ? localTheme === "true" : systemTheme;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const html = document.documentElement;
      if (isDarkMode) {
        html.classList.add("dark");
        html.classList.remove("light");
      } else {
        html.classList.add("light");
        html.classList.remove("dark");
      }
      window.localStorage.setItem("dark-mode", isDarkMode.toString());
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
}
