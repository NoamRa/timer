import React, { Fragment } from "react";

interface TimeDisplayProps {
  now: number;
  startTime: number;
  timerDuration: number;
  showNumericTimer: boolean;
  onChange: () => void;
}

const TimeDisplay: React.FC<TimeDisplayProps> = (props): JSX.Element => {
  const { now, startTime, timerDuration, showNumericTimer, onChange } = props;
  const passed: number = now - startTime;
  const remaining = Math.abs(now - startTime - timerDuration);

  return (
    <Fragment>
      <input type="checkbox" checked={showNumericTimer} onChange={onChange} />
      {showNumericTimer && (
        <Fragment>
          Time Passed - {`${Math.trunc(passed / 60)}:${passed % 60}`}
          <br />
          Time Remaining - {`${Math.trunc(remaining / 60)}:${remaining % 60}`}
        </Fragment>
      )}
    </Fragment>
  );
};

export default TimeDisplay;
