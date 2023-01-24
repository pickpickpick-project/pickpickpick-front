import styled from "styled-components";
import colors from "../../assets/colors";
import ImageSwiper from "../../components/Portfolio/ImageSwiper";
import { ReactComponent as Profile } from "../../assets/images/Home/profile.svg";

const PageStyle = styled.div`
  padding: 135px 0px 140px 0px;
  color: ${colors.text};
  .images-container {
    height: 500px;
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
  }

  .artist-section {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .artist-img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background: gray;
    margin-right: 20px;
  }

  .artist-info {
    text-align: center;
  }

  .artist-info-name {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .inquiry-button {
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
  }
`;
const PortfolioDetail = () => {
  return (
    <PageStyle>
      <div className="images-container">
        <ImageSwiper />
      </div>
      <div className="bottom-section">
        <div className="artist-section">
          <div className="artist-img">
            <Profile width="100px" height="100px" />
          </div>
          <div className="arist-info">
            <div className="artist-info-name">작가 이름</div>
            <div className="artist-info-introduce">안녕하세용</div>
          </div>
        </div>
        <div className="inquiry-button">작가에게 문의하기</div>
      </div>
    </PageStyle>
  );
};

export default PortfolioDetail;
