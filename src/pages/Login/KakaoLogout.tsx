import { useCallback } from "react";
import { useNavigate } from "react-router";
import colors from "../../assets/colors";

const KakaoLogout = () => {
  const navigate = useNavigate();

  const getKakaoLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className="menu-item"
      style={{
        fontSize: "15px",
        width: "120px",
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
