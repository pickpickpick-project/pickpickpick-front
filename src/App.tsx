import React from "react";
import { RecoilRoot } from "recoil";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Reset } from "styled-reset";
import Header from "./components/Common/Header";
import Main from "./pages/Home/Main";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <RecoilRoot>
        <div className="App" style={{ margin: "-8px" }}>
            <Reset/>
            <AppRouter />
        </div>
    </RecoilRoot>
  );
}

export default App;
