import React from "react";
import Main from "./pages/Home/Main";
import InquiryBoard from "./pages/Inquiry/InquiryBoard";
import InquirtPost from "./pages/Inquiry/InquiryPost";
import InquiryWritePage from "./pages/Inquiry/InquiryWirtePage";

function App() {
  return (
    <div className="App" style={{ margin: "-8px" }}>
      {/* <Main /> */}
      {/* <InquiryBoard /> */}
      {/* <InquiryWritePage /> */}
      <InquirtPost />
    </div>
  );
}

export default App;
