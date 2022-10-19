import React, { useState } from "react";
import "./App.css";
import Controls from "./components/Controls";
import TableHeader from "./components/TableHeader";
import TableRow from "./components/TableRow";
import { useData } from "./context/dataContext";

function App() {
  const { elements } = useData();
  return (
    <div>
      {/* Controls Button */}
      <Controls />
      {/* Table */}
      <table>
        {/* Table Header */}
        <TableHeader />
        {/* Table Body */}
        <tbody>
          {elements.map((element) => (
            <TableRow key={element.id} element={element} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
