import React from "react";
import "./App.css";
import init from "./game/game";

function App() {
  React.useEffect(() => {
    init();
    console.log("App initialized");
  }, []);
  return <div className="App"></div>;
}

export default App;
