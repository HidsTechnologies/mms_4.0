import React from "react";
import { STATIONS_ARRAY } from "../constants";
import { getNoOfSteps } from "../utills";

const TableRow = ({ element }) => {
  return (
    <tr>
      <td>{element.id}</td>
      <td>{element.type}</td>
      <td>{element.status.toString()}</td>
      {STATIONS_ARRAY.map((station, i) => (
        <CreateStepsUI key={i} station={station} data={element[station]} />
      ))}
    </tr>
  );
};

export default TableRow;

const CreateStepsUI = ({ station, data }) => {
  const noOfSteps = getNoOfSteps(station);
  const stepsUI = new Array(noOfSteps).fill(null).map((_, index) => {
    const step = data[`step${index + 1}`];
    return (
      <td key={index}>
        {step?.time && (
          <div className={step.status ? "pass" : "fail"}>
            {/* {new Date(step.time).getTime()} */}
            {step.time}
          </div>
        )}
      </td>
    );
  });
  return stepsUI;
};
