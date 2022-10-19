import { ELEMENT_TYPES, STATIONS } from "./constants";

export const getElementType = () =>
  ELEMENT_TYPES[Math.floor(Math.random() * ELEMENT_TYPES.length)];

export const getRandomBool = () => Math.random() >= 0.5;

export const getCurrentTime = () => new Date().toLocaleTimeString();

export const createNewElement = (id) => ({
  id,
  type: getElementType(),
  status: true,
  currentStation: STATIONS.feeder,
  currentStep: 1,
  nextStation: null,
  feeder: {
    status: true,
    time: getCurrentTime(),
    step1: {
      status: true,
      time: getCurrentTime(),
    },
    step2: {},
    step3: {},
    step4: {},
  },
  inspection: {},
  buffer: {},
  process: {},
  assembly: {},
  sorting: {},
});

// TODO - NEED More work on this function
export const updateElement = (element, station, step, last) => {
  let updatedElement = { ...element };
  if (step == 1) {
    updatedElement.currentStation = station;
    updatedElement.currentStep = 1;
    updatedElement[station] = {
      status: true,
      time: getCurrentTime(),
      step1: {
        status: true,
        time: getCurrentTime(),
      },
    };
  } else {
    updatedElement.currentStep = step;
    updatedElement[station][`step${step}`] = {
      status: true,
      time: getCurrentTime(),
    };
  }
  if (step == last) {
    updatedElement.nextStation = getNextStation(station);
  }
  return updatedElement;
};

export const getNextStation = (currentStation) => {
  switch (currentStation) {
    case STATIONS.feeder:
      return STATIONS.inspection;
    case STATIONS.inspection:
      return STATIONS.buffer;
    case STATIONS.buffer:
      return STATIONS.process;
    case STATIONS.process:
      return STATIONS.assembly;
    case STATIONS.assembly:
      return STATIONS.sorting;
    case STATIONS.sorting:
      return null;
    default:
      return STATIONS.feeder;
  }
};

export const getNoOfSteps = (station) => {
  switch (station) {
    case "feeder":
      return 4;
    case "inspection":
      return 1;
    case "buffer":
      return 1;
    case "process":
      return 1;
    case "assembly":
      return 1;
    case "sorting":
      return 1;
    default:
      return 0;
  }
};
