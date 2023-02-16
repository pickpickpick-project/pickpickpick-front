import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/Common/Header";
import MyHeartPage from "../pages/Heart/MyHeartPage";
import Main from "../pages/Home/Main";
import KakaoLogin from "../pages/Login/KakaoLogin";
import PortfolioDetail from "../pages/Portfolio/PortfolioDetail";
import Mypage from "../pages/Mypage";
import PostPortfolio from "../pages/Portfolio/PostPortfolio";

import ArtistPage from "../pages/Artist/Artist";
import ProductPage from "../pages/Product/ProductPage";
import ManageUserPage from "../pages/Admin/ManageUserPage";
import ManageProductPage from "../pages/Admin/ManagerProductPage";
import ManagePortfolioPage from "../pages/Admin/ManagerPortfolioPage";
import ManagePaymentPage from "../pages/Admin/ManagePaymentPage";
import BoardPage from "../pages/Board/BoardPage";
import PostWritingPage from "../pages/PostWriting/PostWritingPage";
import OrderPage from "../pages/order/OrderPage";
import PostView from "../pages/PostView/PostView";

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
        <Route path="mypage" element={<Mypage />} />
        <Route path="artist/:id" element={<ArtistPage />} />
        <Route path="product/:id" element={<ProductPage />} />
        <Route path="admin/manage/user" element={<ManageUserPage />} />
        <Route path="admin/manage/product" element={<ManageProductPage />} />
        <Route
          path="admin/manage/portfolio"
          element={<ManagePortfolioPage />}
        />
        <Route path="admin/manage/payment" element={<ManagePaymentPage />} />
        <Route path="board/:id" element={<BoardPage />} />
        <Route path="writing" element={<PostWritingPage />} />
        <Route path="order" element={<OrderPage />} />
        <Route path="board/post/:id" element={<PostView/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
