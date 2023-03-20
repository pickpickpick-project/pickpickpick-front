import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import Naver from "../../assets/images/Home/naver.png";
import { snsState } from "../../recoil/login";

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
    const NAVER_AUTH_URL = `https://api.pppick.store/oauth2/authorization/naver?redirect_uri=http://localhost:3000//oauth2/redirect`;
  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  const [excuted2, setExcuted2] = useState<boolean>(false);
  const sns = localStorage.getItem("sns");
  const navigate = useNavigate();

  const getNaverToken = useCallback(async () => {
    try {
      await axios
      .get(`https://api.pppick.store/auth/token?token=${token}`, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        })
        .then(res => {
          setExcuted2(true);
          localStorage.setItem("userId", res.data.data.userNum);
          navigate("/");
        });
    } catch (err) {
      console.log(err, "네이버 에러");
    }
  }, []);

  const handleLoginNaver = () => {
    localStorage.setItem("sns", "naver");
    window.location.href = NAVER_AUTH_URL;
  };

  useEffect(() => {
    if (!loaction.search || excuted2) return;
    if (sns === "naver") {
      getNaverToken();
    }
  }, []);

  return (
    <div onClick={handleLoginNaver}>
      <img src={Naver} alt="naver" />
    </div>
  );
};

export default NaverLogin;
