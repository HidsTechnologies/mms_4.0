import { STATIONS, STATIONS_ARRAY } from "../constants";
import React from "react";
import { getNoOfSteps } from "../utills";

const TableHeader = () => {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Element Type</th>
        <th>Status</th>
        {STATIONS_ARRAY.map((station) => {
          return (
            <th colSpan={getNoOfSteps(station)} key={station}>
              {station}
            </th>
          );
        })}
      </tr>
      {/* steps */}
      <tr>
        <th></th>
        <th></th>
        <th></th>

        {STATIONS_ARRAY.map((station) => (
          <CreateSteps station={STATIONS[station]} />
        ))}
      </tr>
    </thead>
  );
};

const CreateSteps = ({ station }) => {
  const noOfSteps = getNoOfSteps(station);
  const stepsUI = new Array(noOfSteps).fill(0).map((_, i) => {
    return <th key={`${station}${i}`}>Step {i + 1}</th>;
  });
  return stepsUI;
};

export default TableHeader;
