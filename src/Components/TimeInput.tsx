import React from "react";

interface TimeInputProps {
  id: string;
  value: number;
  onChange: (value: any) => void;
}

const TimeInput: React.FC<TimeInputProps> = props => {
  const { id, value, onChange } = props;

  return (
    <React.Fragment>
      <label htmlFor={id}>{id}</label>
      <input
        required
        type="number"
        name={id}
        id={id}
        min={1}
        value={value}
        onChange={onChange}
      />
    </React.Fragment>
  );
};

export default TimeInput;
