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

export const updateElement = (element, station, step, last) => {
  let updatedElement = { ...element };
  let status =
    station === STATIONS.inspection && step === 2 ? getRandomBool() : true;
  if (step == 1) {
    updatedElement.currentStation = station;
    updatedElement.currentStep = 1;
    updatedElement[station] = {
      status,
      time: getCurrentTime(),
      step1: {
        status,
        time: getCurrentTime(),
      },
    };
  } else {
    updatedElement.currentStep = step;
    updatedElement[station][`step${step}`] = {
      status,
      time: getCurrentTime(),
    };
  }

  if (step == last) {
    updatedElement.nextStation = getNextStation(station);
  }

  if (!status) {
    updatedElement.nextStation = null;
    updatedElement.currentStep = 0;
    updatedElement[station].status = status;
    updatedElement.status = status;
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
  return NoOfSteps[station];
};

let NoOfSteps = {
  feeder: 4,
  inspection: 2,
  buffer: 1,
  process: 4,
  assembly: 1,
  sorting: 1,
};
