import React from "react";
import Router from "@/routers/index";
import { HashRouter } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <HashRouter>{Router}</HashRouter>
    </div>
  );
}

export default App;
