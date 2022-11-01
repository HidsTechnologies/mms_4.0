import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// import { SocketProvider } from "./context/socketContext";
import { WebSocketProvider } from "./context/webSocketContext";
import { DataProvider } from "./context/dataContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <WebSocketProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </WebSocketProvider>
  </React.StrictMode>
);
