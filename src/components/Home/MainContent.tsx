import styled from "styled-components";
import { ReactComponent as Heart } from "../../assets/images/Portfolio/heart.svg";
import { ReactComponent as HeartFilled } from "../../assets/images/Portfolio/heart-filled.svg";
import { useState } from "react";

const ContentStyle = styled.div`
  .item-heart {
    z-index: 10;
    position: absolute;
    top: 30px;
    right: 30px;
    transition: 0.2s all ease-out;
  }

  .item-heart:hover {
    transform: scale(1.1);
  }
`;

const MainContent = ({ item }: any) => {
  //interface만들기
  const [isHeart, setIsHeart] = useState<boolean>(false);
  // const [heartList, setHeartList] = useState<number>([]);

  const heartItem = (item: any) => {
    item.stopPropagation();
    setIsHeart(!isHeart);
    // setHeartList(heartList => [...heartList, item.portfolioNum])
  };

  return (
    <ContentStyle>
      <div className="item-heart" onClick={item => heartItem(item)}>
        {isHeart ? <HeartFilled /> : <Heart />}
      </div>
      <img
        src={`${item.url}?w=162&auto=format`}
        srcSet={`${item.url}?w=162&auto=format&dpr=2 2x`}
        alt={item.title}
        loading="lazy"
        style={{
          borderBottomLeftRadius: 4,
          borderBottomRightRadius: 4,
          display: "block",
          width: "100%",
        }}
      />
    </ContentStyle>
  );
};

export default MainContent;
