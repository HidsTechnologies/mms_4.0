import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./context/socketContext";
import { DataProvider } from "./context/dataContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </SocketProvider>
  </React.StrictMode>
);
