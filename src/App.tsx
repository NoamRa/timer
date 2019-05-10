import React, { useState, SyntheticEvent } from "react";
import "./App.css";
import CirclePart from "./Components/CirclePart";
import useInterval from "./logic/useInterval";
import TimeInput from "./Components/TimeInput";

const initialTimerDuration: number = 25 * 60; // in seconds

const App: React.FC = (): JSX.Element => {
  const getNow = (): number => Math.trunc(new Date().getTime() / 1000);
  const calcDegreesPerSecond = (timerDuration: number) => 360 / timerDuration;

  // init
  const now: number = getNow();
  // timerDuration is in seconds
  let [timerDuration, setTimerDuration] = useState(initialTimerDuration);
  let [startTime, setStartTime] = useState(now);
  let degreesPerSecond: number = calcDegreesPerSecond(timerDuration);
  let [degrees, setDegrees] = useState(degreesPerSecond * (startTime - now));
  let [showNumericTimer, setShowNumericTimer] = useState(false);

  const handleTimeChange = (evt: SyntheticEvent): void => {
    const updatedTimerDuration: number =
      (evt.target as HTMLInputElement).valueAsNumber * 60;
    setTimerDuration(updatedTimerDuration);
    degreesPerSecond = calcDegreesPerSecond(updatedTimerDuration);

    const now = getNow();
    setStartTime(now);
    degrees = degreesPerSecond * (now - startTime);
  };

  useInterval(() => {
    // update remaining time every second
    const secondsPassed: number = getNow() - startTime;
    setDegrees(degreesPerSecond * secondsPassed);
  }, 1000);

  const renderTimeDisplay = (): JSX.Element => {
    const now: number = getNow();
    const passed: number = now - startTime;
    const remaining = Math.abs(now - startTime - timerDuration);
    return (
      <React.Fragment>
        Time Passed - {`${Math.trunc(passed / 60)}:${passed % 60}`}
        <br />
        Time Remaining - {`${Math.trunc(remaining / 60)}:${remaining % 60}`}
      </React.Fragment>
    );
  };

  return (
    <div className="app">
      <TimeInput
        id="minutes"
        value={timerDuration / 60}
        onChange={handleTimeChange}
      />
      <CirclePart diameter={500} degrees={degrees} />
      <input
        type="checkbox"
        checked={showNumericTimer}
        onChange={() => setShowNumericTimer(!showNumericTimer)}
      />
      {showNumericTimer && renderTimeDisplay()}
    </div>
  );
};

export default App;
