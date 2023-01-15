import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./pages/Home/Main";
import InquiryBoard from "./pages/Inquiry/InquiryBoard";
import InquiryPost from "./pages/Inquiry/InquiryPost";
import InquiryWritePage from "./pages/Inquiry/InquiryWirtePage";
import AppRouter from "./routes/AppRouter";

function App() {
  return (
    <div className="App" style={{ margin: "-8px" }}>
      <AppRouter />
    </div>
  );
}

export default App;
