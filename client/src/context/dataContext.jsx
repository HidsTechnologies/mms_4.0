import React from "react";
import { STATIONS } from "../constants";
import { createNewElement, getNoOfSteps, updateElement } from "../utills";
import { useSocket } from "./socketContext";
import { useWebSocket } from "./webSocketContext";

const dataContext = React.createContext();

const useData = () => {
  const data = React.useContext(dataContext);
  if (!data) {
    throw new Error("useData must be used within a DataProvider");
  }
  return data;
};

const initialState = {
  feeder: {},
  inspection: {},
  buffer: {},
  process: {},
  assembly: {},
  sorting: {},
};

const DataProvider = ({ children }) => {
  const [data, setData] = React.useState([]);
  //   const [elementAt, dispatch] = React.useReducer(reducer, initialState);

  // const {
  //   feederSocket,
  //   inspectionSocket,
  //   bufferSocket,
  //   processSocket,
  //   assemblySocket,
  //   sortingSocket,
  // } = useSocket();

  const wss = useWebSocket();
  // send message to server
  const sendMessage = (data) => {
    console.log("sendMessage", data);
    // switch (data.station) {
    //   case STATIONS.feeder:
    //     feederSocket.emit("data", data);
    //     break;
    //   case STATIONS.inspection:
    //     inspectionSocket.emit("data", data);
    //     break;
    //   case STATIONS.buffer:
    //     bufferSocket.emit("data", data);
    //     break;
    //   case STATIONS.process:
    //     processSocket.emit("data", data);
    //     break;
    //   case STATIONS.assembly:
    //     assemblySocket.emit("data", data);
    //     break;
    //   case STATIONS.sorting:
    //     sortingSocket.emit("data", data);
    //     break;
    //   default:
    //     break;
    // }
    let payload = `${data.station},${data.step},${data.elementType},${data.status}`;
    wss.send(payload);
  };

  //   funtions
  const addNewElement = () => {
    let id = data.length + 1;
    const newElement = createNewElement(id);
    setData([...data, newElement]);
    sendMessage({
      step: 1,
      station: STATIONS.feeder,
      elementType: newElement.type,
      status: newElement.status,
    });
  };

  const handleStepsButton = (station, step) => {
    let elementIndex = null;
    const last = getNoOfSteps(station);
    if (step === 1) {
      if (station === STATIONS.feeder) {
        addNewElement();
        return;
      } else {
        elementIndex = data.findIndex((ele) => ele.nextStation === station);
      }
    } else {
      elementIndex = data.findIndex(
        (ele) => ele.currentStation === station && ele.currentStep === step - 1
      );
    }

    if (elementIndex === -1 || elementIndex === null) {
      alert("No element found");
      return;
    }

    const newData = [...data];
    const element = newData[elementIndex];
    const updatedElement = updateElement(element, station, step, last);
    newData[elementIndex] = updatedElement;
    setData(newData);
    sendMessage({
      step,
      station,
      elementType: updatedElement.type,
      status: updatedElement.status,
    });
  };

  const handleReset = () => {
    setData([]);
  };

  const value = {
    elements: data,
    // elementAt,
    handleStepsButton,
    handleReset,
  };

  return <dataContext.Provider value={value}>{children}</dataContext.Provider>;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_ELEMENT_AT":
      return { ...state, elementAt: action.payload };
    default:
      return state;
  }
};

export { DataProvider, useData };
