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
        .get(
          `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/auth/token?token=${token}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        )
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
