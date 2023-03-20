import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Google from "../../assets/images/Home/google.png";
import jwt_decode from "jwt-decode";
import { useRecoilState } from "recoil";
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

const GoogleLogin = () => {
  const KAKAO_AUTH_URL = `https://api.pppick.store/oauth2/authorization/google?redirect_uri=https://www.pppick.store/oauth2/redirect`;
  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  const [excuted3, setExcuted3] = useState<boolean>(false);
  const sns = localStorage.getItem("sns");

  const navigate = useNavigate();

  const getGoogleToken = useCallback(async () => {
    try {
      await axios
        .get(`https://api.pppick.store/auth/token?token=${token}`, {
          headers: {
            "Content-type": "application/x-www-form-urlencoded",
          },
        })
        .then(res => {
          setExcuted3(true);
          localStorage.setItem("userId", res.data.data.userNum);
          navigate("/");
        });
    } catch (err) {}
  }, []);

  const handleLoginGoogle = () => {
    localStorage.setItem("sns", "google");
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (!loaction.search || excuted3) return;
    if (sns === "google") {
      getGoogleToken();
    }
  }, [sns]);

  return (
    <div onClick={handleLoginGoogle}>
      <img src={Google} alt="google" />
    </div>
  );
};

export default GoogleLogin;
