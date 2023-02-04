import styled from "styled-components";
import colors from "../../assets/colors";
import ImageSwiper from "../../components/Portfolio/ImageSwiper";
import { ReactComponent as Profile } from "../../assets/images/Home/profile.svg";
import ModalTag from "../../components/Portfolio/ModalTag";
import CommonYellowButton from "../../components/Common/Button";
import MovePage from "../../util/navigate";
import { ReactComponent as Heart } from "../../assets/images/Portfolio/heart.svg";
import { ReactComponent as HeartFilled } from "../../assets/images/Portfolio/heart-filled.svg";
import { useState } from "react";

const PageStyle = styled.div`
  padding: 135px 0px 40px 0px;
  color: ${colors.text};
  .images-container {
    height: 450px;
    display: flex;
    overflow: hidden;
  }

  .bottom-section {
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: ${colors.bgcolor};
    padding: 20px;
    border-radius: 8px;
  }

  .artist-section {
    display: flex;
    // justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    margin-left: 10px;
    cursor: pointer;
  }

  .artist-img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background: gray;
    margin-right: 20px;
  }

  .artist-info {
    text-align: center;
  }

  .artist-info-name {
    font-size: 18px;
  }

  /* .inquiry-button {
    color: ${colors.text};
    background-color: ${colors.button};
    padding: 1px 6px;
    width: 269px;
    height: 52px;
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
  } */

  .modal-info {
    .modal-info-top {
      width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }
    .modal-info-type {
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
    .item-heart {
      position: absolute;
      top: 0px;
      right: 30px;
      transition: 0.2s all ease-out;
      // background: red;
      cursor: pointer;
      color: black;
    }

    .item-heart:hover {
      transform: scale(1.1);
    }
    .modal-info-tags {
      margin: 24px 0px 0px;
      font-weight: normal;
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      padding: 14px 24px 0 0;
    }
  }
`;
const PortfolioDetail = () => {
  const [isHeart, setIsHeart] = useState<boolean>(false);
  const heartItem = (item: any) => {
    item.stopPropagation();
    setIsHeart(!isHeart);
    // setHeartList(heartList => [...heartList, item.portfolioNum])
  };
  return (
    <PageStyle>
      <div className="images-container">
        <ImageSwiper />
      </div>
      <div className="bottom-section">
        <div className="modal-info">
          <div className="modal-info-top">
            <div className="modal-info-type">일러스트</div>
            {/* 날짜 하트로 바꾸기 */}
            <div className="item-heart" onClick={item => heartItem(item)}>
              {isHeart ? <HeartFilled /> : <Heart />}
            </div>
          </div>
          <div className="modal-info-title">귀여운고양이</div>
          <div className="modal-info-tags">
            {tags.map((item, index) => (
              <ModalTag key={index} tag={item} />
            ))}
          </div>
        </div>
        <div className="right-section">
          <div onClick={MovePage("artist")} className="artist-section">
            <div className="artist-img">
              <Profile width="45px" height="45px" />
            </div>
            <div className="arist-info">
              <div className="artist-info-name">작가 이름</div>
            </div>
          </div>
          <CommonYellowButton
            onClick={MovePage("board")}
            text={"작가에게 문의하기"}
            width={269}
            height={52}
            hover={true}
          />
        </div>
      </div>
    </PageStyle>
  );
};
const tags = [
  "로고",
  "로고제작",
  "로고디자인",
  "공공기관로고",
  "회사로고",
  "로고",
  "로고제작",
  "로고디자인",
  "공공기관로고",
  "회사로고",
  "로고",
  "로고제작",
  "로고디자인",
  "공공기관로고",
  "회사로고",
];

export default PortfolioDetail;
