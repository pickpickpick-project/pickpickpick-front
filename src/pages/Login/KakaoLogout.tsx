import axios from "axios";
import { useCallback } from "react";
import { useNavigate } from "react-router";
// import { REST_API_KEY, REST_API_KEY } from "../../assets/Login/KakaoLoginData";
import colors from "../../assets/colors";

const KakaoLogout = () => {
  const navigate = useNavigate();
  const ACCESS_TOKEN = localStorage.getItem("accessToken");

  const getKakaoLogout = useCallback(async () => {
    // try {
    //   await axios
    //     .post(`https://kapi.kakao.com/v1/user/logout`, {
    //       headers: {
    //         "Content-type": "application/x-www-form-urlencoded",
    //         Authorization: `Bearer Ermn7FRSTmxUHsoyPB_UKVlrER7CylsUIRmHM5vzCiolkQAAAYXezNmc`,
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
