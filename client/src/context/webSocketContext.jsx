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
  const [connectionStatus, setConnectionStatus] = React.useState("");

  React.useEffect(() => {
    setLoading(true);
    const WSS = new WebSocket(host);
    setWss(WSS);
    setLoading(false);

    WSS.onopen = () => {
      setConnectionStatus("connected");
    };

    WSS.onclose = () => {
      setConnectionStatus("disconnected");
    };

    return () => {
      WSS.close();
    };
  }, []);

  return (
    <wsContext.Provider
      value={{ wss, isConnected: connectionStatus === "connected" }}
    >
      {!loading && (
        <>
          <div
            style={{
              // position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              textAlign: "center",
              padding: "10px",
              backgroundColor:
                connectionStatus === "connected" ? "green" : "red",
            }}
          >
            {connectionStatus}
          </div>
          {children}
        </>
      )}
    </wsContext.Provider>
  );
};

export { WebSocketProvider, useWebSocket };
