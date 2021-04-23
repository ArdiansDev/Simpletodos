import React from "react";
import "./App.css";
import Sidebar from "./component/Sidebar";
import Todos from "./component/Todos";

function App() {
  return (
    <div className="App">
      <Sidebar />
      <Todos />
    </div>
  );
}

export default App;
