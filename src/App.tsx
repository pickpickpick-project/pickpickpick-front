import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "./components/Common/Header";
import Main from "./pages/Home/Main";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="App" style={{ margin: "-8px" }}>
        <Reset/>
        <AppRouter />
    </div>
  );
}

export default App;
