import React from "react";
import ReactDOM from "react-dom";

import "./index.css";

function App() {
  // useState hook to save the darkMode bool
  const [darkMode, setDarkMode] = React.useState(getInitialMode());

  // saving the darkMode book to localStorage
  React.useEffect(() => {
    localStorage.setItem("dark", JSON.stringify(darkMode));
  }, [darkMode]);

  // returning the saved preference of darkMode
  function getInitialMode() {
    const isReturningUser = "dark" in localStorage;
    const savedMode = JSON.parse(localStorage.getItem("dark"));
    const userPreferDark = getPreferColorScheme();
    // if mode was saved => light / dark
    if(isReturningUser) {
      return savedMode;
    } else if(userPreferDark) {
      return true;
      // otherwise => light
    } else {
      return false;
    }
  }

  function getPreferColorScheme() {
    if (!window.matchMedia) return;

    return window.matchMedia("(prefers-color-scheme: dark)");
  }

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <nav>

        <div className="toggle-container">
          
          <span style={{color: !darkMode ? "yellow" : "grey"}}>☀</span>
          
          <span className="toggle">
            <input 
                checked={darkMode} 
                onChange={() => setDarkMode(prevMode => !prevMode)}
                type="checkbox"
                className="checkbox"
                id="checkbox" />
            <label htmlFor="checkbox" />
          </span>

          <span style={{color: !darkMode ? "grey" : "blue"}}>☾</span>
        </div>

      </nav>
      <main>
        <h1>{darkMode ? "Dark Mode" : "Light Mode"}</h1>
        <h2>Toggle the switch to see some magic happen!</h2>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
