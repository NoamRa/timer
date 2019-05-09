import React, { useState } from "react";
import "./App.css";
import CirclePart from "./Components/CirclePart";
import useInterval from "./logic/useInterval";

const App: React.FC = () => {
  let [degrees, setDegrees] = useState(1);

  useInterval(() => {
    setDegrees((degrees % 359) + 1);
  }, 1);

  return (
    <div className="app">
      <CirclePart diameter={500} degrees={degrees} />
    </div>
  );
};

export default App;
