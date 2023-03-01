import styled from "styled-components";
import { PortfolioImgs } from "../../api/portfolio";

const ItemStyle = styled.div`
  width: 100%;
  padding: 0px 12px;
  margin-bottom: 48px;
  cursor: pointer;

  .item-img {
    width: 212px;
    height: 160px;
    border-radius: 7px;
    border: 1px solid rgb(242, 243, 247);

    img {
      width: 100%;
      height: 100%;
      border-radius: 7px;
    }
  }

  .artist {
    width: 100%;
    padding-top: 16px;
    font-size: 16px;
  }
`;
interface Item {
  item: Favorites;
}

interface Favorites {
  id: number;
  portfolioName: string;
  portfolioImgList: PortfolioImgs[];
}

const HeartItem = ({ item }: Item) => {
  const baseURL = "http://api.pppick.store/";
  return (
    <ItemStyle>
      <div className="item-img">
        {item.portfolioImgList !== undefined &&
        item.portfolioImgList.length > 0 ? (
          <img
            src={baseURL + item.portfolioImgList[0]?.portfolioImgAddr}
            alt=""
          />
        ) : (
          <h1>이미지가 없습니다.</h1>
        )}
      </div>
      <div className="artist">{item.portfolioName}</div>
    </ItemStyle>
  );
};

export default HeartItem;
