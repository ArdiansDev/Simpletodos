import React from "react";
import Sidebar from "./component/Sidebar";
import Todos from "./component/Todos";

function Home() {
  return (
    <div className="App">
      <Sidebar />
      <Todos />
    </div>
  );
}

export default Home;
