import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Naver from "../../assets/images/Home/naver.png";

interface UserInfo {
  aud: string;
  auth_time: number;
  email: string;
  exp: number;
  iat: number;
  iss: string;
  nickname: string;
  sub: string;
}

const NaverLogin = () => {
  const NAVER_AUTH_URL = `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/naver?redirect_uri=http://localhost:3000/oauth2/redirect`;
  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  const [excuted, setExcuted] = useState<boolean>(false);

  const navigate = useNavigate();

  const getNaverToken = useCallback(async () => {
    console.log("여기1");
    try {
      await axios
        .get(
          `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/auth/token?token=${token}`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(res => {
          setExcuted(true);
          localStorage.setItem("userId", res.data.data.userNum);
          navigate("/");
        });
    } catch (err) {
      console.log(err, "네이버 에러");
    }
  }, []);

  const handleLoginNaver = () => {
    console.log("naver");
    window.location.href = NAVER_AUTH_URL;
  };

  useEffect(() => {
    console.log("여기2");
    if (!loaction.search || excuted) return;
    getNaverToken();
    console.log("여기3");
  }, []);

  return (
    <div onClick={handleLoginNaver}>
      <img src={Naver} alt="naver" />
    </div>
  );
};

export default NaverLogin;
