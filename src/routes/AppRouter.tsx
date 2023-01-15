import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "../pages/Home/Main";
import InquiryBoard from "../pages/Inquiry/InquiryBoard";
import InquiryPost from "../pages/Inquiry/InquiryPost";
import InquiryWritePage from "../pages/Inquiry/InquiryWirtePage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/inquiry" element={<InquiryBoard />} />
        <Route path="/inquiry/post/:id" element={<InquiryPost />} />
        <Route path="/inquiry/write" element={<InquiryWritePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
