import styled from "styled-components";
import colors from "../../assets/colors";

const PageStyle = styled.div`
  padding: 165px 16px 140px 16px;
  margin: 0 auto;
  width: 1200px;
  color: ${colors.text};
  


  display: flex;
  justify-content: space-between;

  .image-section {
    height: 488px;
    width: 652px;
    object-fit: cover;
    background-color: pink;
  }

  .purchase-section {
    height: 488px;
    margin-left: 58px;
    padding: 24px 24px 0px;
    border: 1px solid rgb(228, 229, 237);
    position: relative;

    .name {
      font-weight: bold;
      margin: 0px 0px 8px;
      color: rgb(48, 52, 65);
      font-size: 20px;
      // word-break: keep-all;
      line-height: 1.5;
      padding-bottom: 16px;
      border-bottom: 1px solid rgb(228, 229, 237);
    }

.priceAndArtist{
  display: flex;
  justify-content: space-between;
}

    .artist, .description {
      color: rgb(48, 52, 65);
      font-size: 14px;
      margin-top: 4px;
      line-height: 1.5;
      white-space: pre-wrap;
}
    }
    .price {
      margin-bottom: 16px;
      color: rgb(48, 52, 65);
      font-size: 18px;
      font-weight: 700;
    }
  }

  .button-section{
   
    margin-top: 24px;
    padding: 0px 24px;


    .purchase-button{
      outline: none;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s ease 0s, border-color 0.3s ease 0s;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: absolute;
      bottom: 40px;
      width: 420px;
      height: 52px;
      font-size: 16px;
      min-width: 80px;
      background-color: rgb(255, 212, 0);
      border-color: rgb(255, 212, 0);
      font-weight: bold
    }

    .purchase-button:hover{
      filter: brightness(90%);
    }
  }
`;

const ProductPage = () => {
  return (
    <PageStyle>
      <div className="image-section">product</div>
      <div className="purchase-section">
        <div className="name">
          "고퀼리티 로고제작" 로고는 로고디자인 전문가에게
        </div>
        <div className="priceAndArtist">
          <div className="price">65,000원</div>
          <div className="artist">김작가</div>
        </div>

        <div className="description">샬라샬라 {"\n"} ggg 좋아용</div>

        <div className="button-section">
          <button className="purchase-button">구매하기</button>
        </div>
      </div>
    </PageStyle>
  );
};

export default ProductPage;
