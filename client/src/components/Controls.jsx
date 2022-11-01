import React from "react";
import { STATIONS, STATIONS_ARRAY } from "../constants";
import { useData } from "../context/dataContext";
import { getNoOfSteps } from "../utills";

const Controls = () => {
  const { handleReset } = useData();
  return (
    <div>
      <button onClick={handleReset}>RESET</button>
      <div
        style={{
          display: "flex",
          gap: "1rem",
          //   alignItems: "center",
          textAlign: "center",
          textTransform: "capitalize",
        }}
      >
        {STATIONS_ARRAY.map((station) => (
          <StationButtons station={station} />
        ))}
      </div>
    </div>
  );
};

export default Controls;

const StationButtons = ({ station }) => {
  const noOfSteps = getNoOfSteps(station);
  const buttons = new Array(noOfSteps).fill(0).map((_, index) => {
    return <Button key={index} station={station} step={index + 1} />;
  });

  return (
    <div
      className="flex flex-col p-1"
      style={{
        margin: "0.5rem",
      }}
    >
      <div className="border-1 px-1 ">
        <h4>{station} station</h4>
      </div>
      <div className="border-1 flex flex-col p-1">{buttons}</div>
    </div>
  );
};

const Button = ({ station, step }) => {
  const { handleStepsButton } = useData();

  return (
    <button onClick={() => handleStepsButton(station, step)}>
      Step {step}
    </button>
  );
};
