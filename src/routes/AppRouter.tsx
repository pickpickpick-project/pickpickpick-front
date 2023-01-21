import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import MyHeartPage from "../pages/Heart/MyHeartPage";
import Main from "../pages/Home/Main";
import PortfolioDetail from "../pages/Portfolio/PortfolioDetail";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="portfolio/:id" element={<PortfolioDetail />} />
        <Route path="heart" element={<MyHeartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
