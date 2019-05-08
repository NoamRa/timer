import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import CirclePart from "./Components/CirclePart";

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef(() => {});

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

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
