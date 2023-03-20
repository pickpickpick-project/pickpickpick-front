import axios from "axios";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";

const NaverRedirect = () => {
  const navigate = useNavigate();
  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  useEffect(() => {
    console.log("naver redirect");
    try {
      axios
        .get(`http://api.pppick.store/auth/token?token=${token}`, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        })
        .then(res => {
          localStorage.setItem("userId", res.data.data.userNum);
          navigate("/");
        });
    } catch (err) {
      console.log(err, "네이버 에러");
    }
  }, []);

  return;
};

export default NaverRedirect;
