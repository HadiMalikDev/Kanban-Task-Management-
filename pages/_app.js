import "../styles/globals.css";
import "../styles/fonts.css";

import React from "react";
const { ThemeProvider } = require("../context/ThemeContext").default;
const { TasksProvider } = require("../context/TasksContext").default;
function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <TasksProvider>
        <Component {...pageProps} />
      </TasksProvider>
    </ThemeProvider>
  );
}

export default MyApp;
