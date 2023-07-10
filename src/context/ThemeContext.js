import React, { createContext, useState } from "react";

export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const styling = {
    backgroundColor: theme === "dark" ? "var(--bg-main)" : "white",
    backgroundBoard: theme === "dark" ? "var(--bg-board)" : "snow",
    txtColor: theme === "dark" ? "white" : "black",
    borders: theme === "dark" ? "1px solid white" : "1px solid var(--gray-4)",
    paddingBottom: "90px",
    tabsBorders: theme === "dark" ? "white 1px solid" : "var(--red) 1px solid",
    tabsColor: theme === "dark" ? "white" : "var(--red)",
    pagination: theme === "dark" ? "white" : "snow",
    filter: theme === "dark" ? "var(--gray-2)" : "snow",
    transaction: theme === "dark" ? "snow" : "snow",
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, styling }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
