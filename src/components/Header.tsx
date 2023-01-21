import { useEffect, useState } from "react";
import styled from "styled-components";
import colors from "../assets/colors";
import { ReactComponent as Logo } from "../assets/images/Home/PPPick-logo.svg";
import { ReactComponent as Profile } from "../assets/images/Home/profile.svg";
import type { MenuProps } from "antd";
import { Dropdown, Button } from "antd";
import Kakao from "../assets/images/Home/kakao.png";
import { Navigate, useNavigate } from "react-router";

const HeaderStyle = styled.div`
  position: fixed;
  z-index: 9999;
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

    img {
      width: 100%;
    }
  }

  .profile {
    height: 50px;
    display: flex;
    align-items: center;
    transition: 0.2s all ease-out;
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
      <div
        className="menu-item"
        style={{
          fontSize: "15px",
          width: "100px",
          padding: "7px 0",
          textAlign: "center",
          color: colors.text,
        }}
      >
        마이페이지
      </div>
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
            width: "100px",
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
      <div
        className="menu-item"
        style={{
          fontSize: "15px",
          width: "100px",
          padding: "7px 0",
          textAlign: "center",
          color: colors.text,
        }}
      >
        로그아웃
      </div>
    ),
  },
];

const Header = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const navigate = useNavigate();

  return (
    <HeaderStyle>
      <div className="header">
        <Logo onClick={() => navigate("/")} style={{ cursor: "pointer" }} />
        <div className="header-right">
          <div className="login">
            {isLogin ? (
              <>
                <Dropdown menu={{ items }}>
                  <div className="profile">
                    <Profile />
                  </div>
                </Dropdown>
              </>
            ) : (
              <>
                <div className="login-button">
                  <img src={Kakao} alt="kakao" />
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
