import React, { useState, SyntheticEvent } from "react";
import "./App.css";
import CirclePart from "./Components/CirclePart";
import useInterval from "./logic/useInterval";
import TimeInput from "./Components/TimeInput";
import TimeDisplay from "./Components/TimeDisplay";

const initialTimerDuration: number = 25 * 60; // in seconds
const initialDegrees: number = 0.01 // will show full circle

const App: React.FC = (): JSX.Element => {
  const getNow = (): number => Math.trunc(new Date().getTime() / 1000);
  const calcDegreesPerSecond = (timerDuration: number) =>
    // protect division by zero
    timerDuration === 0 ? 360 : 360 / timerDuration;

  // init
  const now: number = getNow();
  // timerDuration is in seconds
  let [timerDuration, setTimerDuration] = useState<number>(
    initialTimerDuration
  );
  let [startTime, setStartTime] = useState<number>(now);
  let degreesPerSecond: number = calcDegreesPerSecond(timerDuration);
  let [degrees, setDegrees] = useState<number>(initialDegrees);
  let [showNumericTimer, setShowNumericTimer] = useState<boolean>(false);
  let [delay, setDelay] = useState<number | null>(1000);

  const handleTimeChange = (evt: SyntheticEvent): void => {
    const updatedTimerDuration: number =
      (evt.target as HTMLInputElement).valueAsNumber * 60;
    setTimerDuration(updatedTimerDuration);
    degreesPerSecond = calcDegreesPerSecond(updatedTimerDuration);

    const now = getNow();
    setStartTime(now);
    setDegrees(initialDegrees);
    setDelay(1000);
  };

  useInterval(() => {
    // update remaining time every second
    const secondsPassed: number = getNow() - startTime;
    setDegrees(degreesPerSecond * secondsPassed);
    secondsPassed >= timerDuration && setDelay(null);
  }, delay!);

  return (
    <div className="app">
      <TimeInput
        id="minutes"
        value={timerDuration / 60}
        onChange={handleTimeChange}
      />

      {delay ? (
        <CirclePart diameter={400} degrees={degrees || initialDegrees} />
      ) : (
        <h1>your time is up!</h1>
      )}

      <TimeDisplay
        now={now}
        startTime={startTime}
        timerDuration={timerDuration}
        showNumericTimer={showNumericTimer}
        onChange={() => setShowNumericTimer(!showNumericTimer)}
      />
    </div>
  );
};

export default App;
