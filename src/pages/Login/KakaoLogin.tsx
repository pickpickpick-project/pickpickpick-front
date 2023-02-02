import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Kakao from "../../assets/images/Home/kakao.png";
import { REST_API_KEY, REDIRECT_URI } from "../../assets/Login/KakaoLoginData";
import { setCookie } from "../../util/cookie";
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
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=account_email,openid`;
  const KAKAO_URL = `http://ec2-52-79-45-14.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao`;
  const loaction = useLocation();
  const navigate = useNavigate();
  const KAKAO_CODE = loaction.search.split("=")[1];
  const [excuted, setExcuted] = useState<boolean>(false);

  const getKakaoToken = useCallback(async () => {
    try {
      await axios
        .get(
          `ec2-52-79-45-14.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao`,
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(res => {
          setExcuted(true);
          const idToken = res.data.id_token;
          //   setCookie("accessJwtToken", jwtToken);
          const decodedUserInfo: UserInfo = jwt_decode(idToken);
          console.log(decodedUserInfo);

          if (res.data.access_token) {
            localStorage.setItem("userId", decodedUserInfo.sub);
            localStorage.setItem("nickname", decodedUserInfo.nickname);
            localStorage.setItem("email", decodedUserInfo.email);
          }
        });
    } catch (err) {
      console.log(err, "카카오로그인에러");
    }
  }, []);

  const handleLogin = () => {
    window.location.href = KAKAO_URL;
  };

  useEffect(() => {
    console.log("화면들어옴", excuted);
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
