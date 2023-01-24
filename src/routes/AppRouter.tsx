import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import MyHeartPage from "../pages/Heart/MyHeartPage";
import Main from "../pages/Home/Main";
import KakaoLogin from "../pages/Login/KakaoLogin";
import PortfolioDetail from "../pages/Portfolio/PortfolioDetail";
import PostPortfolio from "../pages/Portfolio/PostPortfolio";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/:id" element={<Main />} />
        <Route path="portfolio/:id" element={<PortfolioDetail />} />
        <Route path="/portfolio/post" element={<PostPortfolio />} />
        <Route path="heart" element={<MyHeartPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
