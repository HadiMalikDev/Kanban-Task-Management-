import React, { useEffect, createContext, useState } from "react";

const ThemeContext = createContext("darkTheme");

const getTheme = () => {
  const theme = localStorage.getItem("theme");
  if (!theme) {
    // Default theme is taken as dark-theme
    localStorage.setItem("theme", "darkTheme");
    return "darkTheme";
  } else {
    return theme;
  }
};

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("darkTheme");

  function toggleTheme() {
    if (theme === "darkTheme") {
      setTheme("lightTheme");
    } else {
      setTheme("darkTheme");
    }
  }
  useEffect(() => {
    setTheme(getTheme);
  }, []);
  useEffect(() => {
    const refreshTheme = () => {
      localStorage.setItem("theme", theme);
    };

    refreshTheme();
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default { ThemeContext, ThemeProvider };
