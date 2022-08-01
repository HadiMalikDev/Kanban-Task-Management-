import React from "react";
const { ThemeContext } = require("../context/ThemeContext").default;

export default function ToggleTheme() {
  const { toggleTheme, theme } = React.useContext(ThemeContext);
  return (
    <div className="toggleTheme">
      <img src="/lightTheme.png"></img>
      <div className="toggleSwitch">
        <label>
          <input
            type="checkbox"
            onChange={() => toggleTheme()}
            checked={theme === "darkTheme"}
          />
          <span className="slider"></span>
        </label>
      </div>
      <img src="/darkTheme.png"></img>
    </div>
  );
}
