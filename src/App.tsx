import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Home/Main";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="App" style={{ margin: "-8px" }}>
      <Header />
      <AppRouter />
    </div>
  );
}

export default App;
