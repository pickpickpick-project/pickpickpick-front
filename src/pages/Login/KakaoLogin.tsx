import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import Kakao from "../../assets/images/Home/kakao.png";
import { snsState } from "../../recoil/login";

const KakaoLogin = () => {
  const KAKAO_AUTH_URL = `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:3000/oauth2/redirect`;
  const loaction = useLocation();
  const searchParams = new URLSearchParams(loaction.search);
  const token = searchParams.get("token");
  const [excuted, setExcuted] = useState<boolean>(false);
  const sns = localStorage.getItem("sns");

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
          localStorage.setItem("userId", res.data.data.userNum);

          navigate("/");
        });
    } catch (err) {}
  }, []);

  const handleLoginKakao = () => {
    localStorage.setItem("sns", "kakao");
    window.location.href = KAKAO_AUTH_URL;
  };

  useEffect(() => {
    if (!loaction.search || excuted) return;
    if (sns === "kakao") {
      getKakaoToken();
    }
  }, [sns]);

  return (
    <div onClick={handleLoginKakao}>
      <img src={Kakao} alt="kakao" />
    </div>
  );
};

export default KakaoLogin;
