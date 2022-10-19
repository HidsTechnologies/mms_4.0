export const HOST_URL = import.meta.env.VITE_HOST_URL;

export const STATIONS = {
  feeder: "feeder",
  inspection: "inspection",
  buffer: "buffer",
  process: "process",
  assembly: "assembly",
  sorting: "sorting",
};

// convert object to array
export const STATIONS_ARRAY = Object.keys(STATIONS).map((key) => STATIONS[key]);

export const ELEMENT_TYPES = ["wood", "metal", "plastic"];
