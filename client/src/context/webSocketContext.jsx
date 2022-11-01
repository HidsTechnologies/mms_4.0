import React from "react";
import { HOST_URL } from "../constants";

const wsContext = React.createContext();

const useWebSocket = () => {
  const socket = React.useContext(wsContext);
  if (!socket) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return socket;
};

const WebSocketProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(true);
  const [wss, setWss] = React.useState(null);
  const host = HOST_URL.replace("http", "ws");

  React.useEffect(() => {
    setLoading(true);
    const wss = new WebSocket(host);
    setWss(wss);
    setLoading(false);
    return () => {
      wss.close();
    };
  }, []);

  return (
    <wsContext.Provider value={wss}>{!loading && children}</wsContext.Provider>
  );
};

export { WebSocketProvider, useWebSocket };
