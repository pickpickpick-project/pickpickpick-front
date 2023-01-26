import { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Profile } from "../../assets/images/Home/profile.svg";
import ModalTag from "./ModalTag";

const ModalStyle = styled.div`
  .modal {
    display: flex;
    flex-direction: column;
    // padding: 40px;
    min-height: 600px;
    width: 100%;
    z-index: 2;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .artist-info {
      display: flex;
      align-items: center;
    }
    .artist-img {
      width: 42px;
      height: 42px;
      border-radius: 50%;
      background: gray;
      margin-right: 20px;
    }
    .artist-info-name {
      font-size: 16px;
    }
    .inquiry-button {
      color: ${colors.text};
      background-color: ${colors.button};
      padding: 1px 6px;
      width: 179px;
      height: 43px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 7px;
      font-weight: bold;
      font-size: 16px;
      filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
      cursor: pointer;
      transition: 0.2s all ease-out;
    }
    .inquiry-button:hover {
      filter: brightness(90%);
    }
  }

  .modal-body {
    display: flex;
    margin-top: 40px;
    gap: 40px;

    .modal-info {
      flex-basis: 330px;

      .modal-info-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
      .modal-info-type,
      .modal-info-date {
        color: rgb(114, 117, 133);
        margin: 0px;
        font-weight: normal;
        font-size: 14px;
      }
      .modal-info-title {
        margin-top: 8px;
        font-size: 20px;
        line-height: 31px;
        font-weight: 700;
        color: rgb(48, 52, 65);
      }

      .modal-info-tags {
        margin: 24px 0px 0px;
        font-weight: normal;
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
        border-top: 1px solid rgba(0, 0, 0, 0.12);
        padding-top: 24px;
      }
    }
    .modal-img {
      width: 700px;

      img {
        width: 100%;
        border-radius: 4px;
      }
    }
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
    width: "1080px",
    backgroundColor: "rgb(255, 255, 255)",
    borderRadius: "8px",
    margin: "32px auto",
    padding: "40px",
    zIndex: "2",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.5)",
  },
};

interface Modaltype {
  isOpen: boolean;
  setIsOpen: any;
  portfolioNum: number;
}

const PortfolioModal = ({ isOpen, setIsOpen, portfolioNum }: Modaltype) => {
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalStyle>
          <div className="modal">
            <div className="modal-header">
              <div className="artist-info">
                <div className="artist-img">
                  <Profile width="42px" height="42px" />
                </div>
                <div className="artist-info-name">작가 이름</div>
              </div>
              <div className="inquiry-button">작가에게 문의하기</div>
            </div>
            <div className="modal-body">
              <div className="modal-info">
                <div className="modal-info-top">
                  <div className="modal-info-type">일러스트</div>
                  <div className="modal-info-date">2023-01-24</div>
                </div>

                <div className="modal-info-title">귀여운고양이</div>

                <div className="modal-info-tags">
                  {tags.map((item, index) => (
                    <ModalTag key={index} tag={item} />
                  ))}
                </div>
              </div>
              <div className="modal-img">
                <img
                  src="https://cdn2.thecatapi.com/images/vuf7bvOCM.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </ModalStyle>
      </Modal>
    </>
  );
};

const tags = ["로고", "로고제작", "로고디자인", "공공기관로고", "회사로고"];

export default PortfolioModal;
