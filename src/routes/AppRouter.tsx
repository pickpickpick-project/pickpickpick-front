import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Home/Main";
import PortfolioDetail from "../pages/Portfolio/PortfolioDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="portfolio/:id" element={<PortfolioDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
