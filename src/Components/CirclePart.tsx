import React from "react";

interface CirclePartProps {
  diameter: number;
  degrees: number;
}

const CirclePart: React.FC<CirclePartProps> = props => {
  const { diameter, degrees } = props;
  const degreesToRadians = (degrees: number): number => (
    // also rotate by 90 deg counter-clockwise
    Math.PI / 180 * (degrees - 90)
  );
  const viewBox: string = [0, 0, diameter, diameter].join(" ");
  
  const radius: number = diameter / 2;
  const rads: number = degreesToRadians(degrees);

  // convert from polar coordinates to Cartesian coordinates + move center by radius
  const circumferenceX: number = radius + radius * Math.cos(rads);
  const circumferenceY: number = radius + radius * Math.sin(rads);
  const largeArc = degrees >= 180 ? 0 : 1;

  const circlePart = `
    M${radius},${radius}
    L${circumferenceX},${circumferenceY}
    A${radius},${radius} 0,${largeArc},1 ${radius},0
    Z
  `.trim()
  .replace(/\s\s/g, "");

  return (
    <svg
      width={diameter}
      height={diameter}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <path d={circlePart} />
    </svg>
  );
};

export default CirclePart;
