import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Kakao from "../../assets/images/Home/kakao.png";
import jwt_decode from "jwt-decode";

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

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect`;
  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  const [excuted, setExcuted] = useState<boolean>(false);
  console.log(token);

  const navigate = useNavigate();

  const getKakaoToken = useCallback(async () => {
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
          console.log("데이터" + JSON.stringify(res.data));
          const idToken = res.data.data.jwt;
          const decodedUserInfo: UserInfo = jwt_decode(idToken);
          console.log(decodedUserInfo);

          if (decodedUserInfo) {
            localStorage.setItem("userId", decodedUserInfo.sub);
            localStorage.setItem("nickname", decodedUserInfo.nickname);
            localStorage.setItem("email", decodedUserInfo.email);
          }
          navigate("/");
        });
    } catch (err) {
    }
  }, []);

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (!loaction.search || excuted) return;
    getKakaoToken();
  }, []);

  return (
    <div onClick={handleLogin}>
      <img src={Kakao} alt="kakao" />
    </div>
  );
};

export default KakaoLogin;
