import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import colors from "../../assets/colors";
import NaverLogin from "../../pages/Login/NaverLogin";
import GoogleLogin from "../../pages/Login/GoogleLogin";
import KakaoLogin from "../../pages/Login/KakaoLogin";

const ModalStyle = styled.div`
  .title {
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
    margin-bottom: 40px;
  }

  .login-button {
    width: 250px;
    cursor: pointer;
    margin: 0 auto;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 65px;
      //   object-fit: cover;
    }
  }

  .login-button:active {
    transform: scale(0.98);
  }
`;
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "350px",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "8px",
    margin: "32px auto",
    padding: "40px",
    zIndex: "10",
  },
  overlay: {
    zIndex: "10",
    background: "rgba(0, 0, 0, 0.5)",
  },
};
interface Modaltype {
  isOpen: boolean;
  setIsOpen: any;
}
const LoginModal = ({ isOpen, setIsOpen }: Modaltype) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        ariaHideApp={false}
        contentLabel="Example Modal"
      >
        <ModalStyle>
          <div className="title">소셜로그인</div>
          <div className="login-button">
            <KakaoLogin />
          </div>
          <div className="login-button">
            <NaverLogin />
          </div>
          <div className="login-button">
            <GoogleLogin />
          </div>
        </ModalStyle>
      </Modal>
    </>
  );
};

export default LoginModal;
