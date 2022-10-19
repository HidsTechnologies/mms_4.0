import React from "react";
import { Manager } from "socket.io-client";
import { HOST_URL } from "../constants";

const socketContext = React.createContext();

const useSocket = () => {
  const socket = React.useContext(socketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

const SocketProvider = ({ children }) => {
  // namespace socket
  // const socket = io(host, {
  //   path: "/socket.io",
  //   transports: ["websocket"],
  //   autoConnect: true,
  //   reconnection: true,
  //   reconnectionDelay: 1000,
  //   reconnectionDelayMax: 5000,
  //   reconnectionAttempts: Infinity,
  // });

  const [loading, setLoading] = React.useState(true);

  const [feederSocket, setFeederSocket] = React.useState(null);
  const [inspectionSocket, setInspectionSocket] = React.useState(null);
  const [bufferSocket, setBufferSocket] = React.useState(null);
  const [processSocket, setProcessSocket] = React.useState(null);
  const [assemblySocket, setAssemblySocket] = React.useState(null);
  const [sortingSocket, setSortingSocket] = React.useState(null);

  React.useEffect(() => {
    setLoading(true);
    const manager = new Manager(HOST_URL, {
      path: "/socket.io",
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      reconnectionAttempts: 10,
    });

    setFeederSocket(manager.socket("/feeder"));
    setInspectionSocket(manager.socket("/inspection"));
    setBufferSocket(manager.socket("/buffer"));
    setProcessSocket(manager.socket("/process"));
    setAssemblySocket(manager.socket("/assembly"));
    setSortingSocket(manager.socket("/sorting"));
    setLoading(false);
    return () => {
      manager.disconnect();
    };
  }, []);

  // const [socket, setSocket] = React.useState(
  //   io("http://localhost:8080/feeder")
  // );

  // React.useEffect(() => {
  //   const newSocket = io("http://localhost:8080/feeder");
  //   setSocket(newSocket);
  //   return () => newSocket.close();
  // }, []);

  const value = {
    feederSocket,
    inspectionSocket,
    bufferSocket,
    processSocket,
    assemblySocket,
    sortingSocket,
  };

  return (
    <socketContext.Provider value={value}>
      {!loading && children}
    </socketContext.Provider>
  );
};

export { SocketProvider, useSocket };
