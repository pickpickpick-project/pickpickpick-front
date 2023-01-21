import styled from "styled-components";

const ItemStyle = styled.div`
  width: 25%;
  padding: 0px 12px;
  margin-bottom: 48px;

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
    padding-top: 16px;
    font-size: 16px;
  }
`;

const HeartItem = ({ item }: any) => {
  return (
    <ItemStyle>
      <div className="item-img">
        <img src={item.img} alt="" />
      </div>
      <div className="artist">{item.title}</div>
    </ItemStyle>
  );
};

export default HeartItem;
