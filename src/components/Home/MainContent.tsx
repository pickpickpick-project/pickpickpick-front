import styled from "styled-components";
import { ReactComponent as Heart } from "../../assets/images/Portfolio/heart.svg";
import { ReactComponent as HeartFilled } from "../../assets/images/Portfolio/heart-filled.svg";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getFavorites,
  patchFavorites,
  postFavorites,
} from "../../api/favorites";
import { useRecoilState } from "recoil";
import { heartListState } from "../../recoil/heart";

const ContentStyle = styled.div`
  .item-heart {
    z-index: 9;
    position: absolute;
    top: 30px;
    right: 30px;
    transition: 0.2s all ease-out;
  }

  .item-heart:hover {
    transform: scale(1.1);
  }
`;

interface Item {
  item: Portfolio;
}
interface Portfolio {
  portfolioNum: number;
  portfolioName: string;
}

const MainContent = ({ item }: Item) => {
  const url = `https://images.unsplash.com/photo-1593134257782-e89567b7718a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8cHVwcHl8ZW58MHx8MHx8&auto=format&fit=crop&w=400&q=60`;
  const userNum = Number(localStorage.getItem("userId"));

  const [isHeart, setIsHeart] = useState<boolean>(false);
  const [click, setClick] = useState(false);

  const { data, refetch } = useQuery("getFavorites", () =>
    getFavorites(userNum)
  );
  const favoritesData = data?.data ?? [{}];

  let heartArr: number[] = [];

  useEffect(() => {
    favoritesData.map((v: any) => {
      heartArr.push(v.portfolioNum);
    });
  }, []);

  const queryClient = useQueryClient();
  const { mutate: favorites } = useMutation(postFavorites, {
    onSuccess: data => {
      queryClient.invalidateQueries("postFavorites");
      console.log(data, "좋아요");
      if (data.msg === "Success") {
      }
    },
    onError: error => {
      console.log(error, "좋아요에러");
    },
  });

  const { mutate: cancleFavorites } = useMutation(patchFavorites, {
    onSuccess: data => {
      queryClient.invalidateQueries("patchFavorites");
      console.log(data, "좋아요취소");
      if (data.msg === "Success") {
      }
    },
    onError: error => {
      console.log(error, "좋아요취소에러");
    },
  });

  useEffect(() => {
    if (heartArr.includes(item.portfolioNum)) {
      setIsHeart(true);
    } else {
      setIsHeart(false);
    }
  }, []);

  useEffect(() => {
    refetch();
    if (isHeart && click) {
      favorites({
        portfolioNum: item.portfolioNum,
        userNum,
      });
    } else if (!isHeart && click) {
      cancleFavorites({
        portfolioNum: item.portfolioNum,
        userNum,
      });
    }
    setClick(false);
  }, [isHeart, click]);

  const heartItem = (it: any) => {
    it.stopPropagation();
    setClick(true);
    setIsHeart(!isHeart);
  };

  return (
    <ContentStyle>
      <div className="item-heart" onClick={it => heartItem(it)}>
        {isHeart ? <HeartFilled /> : <Heart />}
      </div>
      <img
        src={`${url}?w=162&auto=format`}
        srcSet={`${url}?w=162&auto=format&dpr=2 2x`}
        alt={item.portfolioName}
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
