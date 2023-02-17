import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Logo } from "../../assets/images/Home/PPPick-logo.svg";
import { ReactComponent as Profile } from "../../assets/images/Home/profile.svg";
import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import { Navigate, useNavigate } from "react-router";
import KakaoLogin from "../../pages/Login/KakaoLogin";
import KakaoLogout from "../../pages/Login/KakaoLogout";
import { getUserInfo } from "../../api/user";
import { useQuery } from "react-query";

const HeaderStyle = styled.div`
  position: fixed;
  z-index: 10;
  background-color: #ffffff;
  width: 100%;
  border-bottom: 1px solid #e4e5ed;

  .header {
    height: 74px;
    width: 1200px;
    margin: 0 auto;
    padding: 0 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .login-button {
    width: 150px;
    cursor: pointer;

    img {
      width: 100%;
    }
  }

  .login-button:active {
    transform: scale(0.98);
  }

  .profile {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    transition: 0.2s all ease-out;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  .profile: hover {
    cursor: pointer;
    filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
  }
`;

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <a href="http://localhost:3000/mypage">
        <div
          className="menu-item"
          style={{
            fontSize: "15px",
            width: "120px",
            padding: "7px 0",
            textAlign: "center",
            color: colors.text,
          }}
        >
          마이페이지
        </div>
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a href="http://localhost:3000/heart">
        <div
          className="menu-item"
          style={{
            fontSize: "15px",
            width: "120px",
            padding: "7px 0",
            textAlign: "center",
            color: colors.text,
          }}
        >
          나의 찜목록
        </div>
      </a>
    ),
  },
  {
    key: "3",
    label: (
      <a href="http://localhost:3000/portfolio/post">
        <div
          className="menu-item"
          style={{
            fontSize: "15px",
            width: "120px",
            padding: "7px 0",
            textAlign: "center",
            color: colors.text,
          }}
        >
          포트폴리오 등록
        </div>
      </a>
    ),
  },
  {
    key: "4",
    label: (
      <KakaoLogout />
      // <div
      //   className="menu-item"
      //   style={{
      //     fontSize: "15px",
      //     width: "100px",
      //     padding: "7px 0",
      //     textAlign: "center",
      //     color: colors.text,
      //   }}
      // >
      //   로그아웃
      // </div>
    ),
  },
];

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const navigate = useNavigate();

  const userId = Number(localStorage.getItem("userId"));

  const { data: User } = useQuery("getUser", () => getUserInfo(userId));

  useEffect(() => {
    if (userId) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [userId]);

  return (
    <HeaderStyle>
      <div className="header">
        <Logo
          onClick={() => {
            navigate("/");
            window.location.reload();
          }}
          style={{ cursor: "pointer" }}
        />
        <div className="header-right">
          <div className="login">
            {isLogin ? (
              <>
                <Dropdown menu={{ items }} overlayStyle={{ zIndex: 11 }}>
                  <div className="profile">
                    {User?.data.imageUrl ? (
                      <img src={User?.data.imageUrl} alt="" />
                    ) : (
                      <Profile width="45px" height="45px" />
                    )}
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <div className="login-button">
                  <KakaoLogin />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </HeaderStyle>
  );
};

export default Header;
