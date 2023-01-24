import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { REST_API_KEY, REDIRECT_URI } from "../../assets/Login/KakaoLoginData";
import colors from "../../assets/colors";

const KakaoLogout = () => {
  const navigate = useNavigate();

  const getKakaoLogout = useCallback(async () => {
    //로그아웃
    // try {
    //   await axios
    //     .post(`https://kapi.kakao.com/v1/user/logout`, {
    //       headers: {
    //         "Content-type": "application/x-www-form-urlencoded",
    //         Authorization: `Bearer token`,
    //       },
    //     })
    //     .then(res => {
    //       console.log(res.data, "카카오 로그아웃");
    //       localStorage.clear();
    //       navigate("/");
    //     });
    // } catch (err) {
    //   console.log(err, "카카오로그아웃에러");
    // }

    //카카오계정과 함께 로그아웃
    // try {
    //   await axios
    //     .get(
    //       `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${REDIRECT_URI}`
    //     )
    //     .then(res => {
    //       console.log(res.data, "카카오 로그아웃");
    //       localStorage.clear();
    //       navigate("/");
    //     });
    // } catch (err) {
    //   console.log(err, "카카오로그아웃에러");
    // }

    localStorage.clear();
    navigate("/");
  }, []);

  return (
    <div
      className="menu-item"
      style={{
        fontSize: "15px",
        width: "100px",
        padding: "7px 0",
        textAlign: "center",
        color: colors.text,
      }}
      onClick={getKakaoLogout}
    >
      로그아웃
    </div>
  );
};

export default KakaoLogout;
