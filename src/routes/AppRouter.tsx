import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Header";
import MyHeartPage from "../pages/Heart/MyHeartPage";
import Main from "../pages/Home/Main";
import KakaoLogin from "../pages/Login/KakaoLogin";
import PortfolioDetail from "../pages/Portfolio/PortfolioDetail";
import Mypage from "../pages/Mypage";
import PostPortfolio from "../pages/Portfolio/PostPortfolio";
import ArtistPage from "../pages/Artist/Artist";


const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/:id" element={<Main />}/>
        <Route path="portfolio/:id" element={<PortfolioDetail />}/>
        <Route path="/portfolio/post" element={<PostPortfolio />}/>
        <Route path="heart" element={<MyHeartPage />}/>
        <Route path="mypage" element={<Mypage/>}/>
        <Route path="artist" element={<ArtistPage/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
