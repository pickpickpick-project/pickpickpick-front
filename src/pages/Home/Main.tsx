import { useNavigate } from "react-router";
import styled from "styled-components";
import colors from "../../assets/colors";
import Masonry from "@mui/lab/Masonry";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Key, useCallback, useEffect, useRef, useState } from "react";
import MainContent from "../../components/Home/MainContent";
import { getPortfolioList } from "../../api/portfolio";
import { useQuery } from "react-query";

const MainStyle = styled.div`
  padding: 135px 16px 140px 16px;
  
  .tags {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  .tag {
    font-size: 17px;
    font-weight: bold;
    width: 7rem;
    height: 7rem;
    border: 1px solid #e4e5ed;;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${colors.button};
    transition: 0.2s all ease-out;
  }

  .tag:hover{
    font-size:19px;
  }

  .contents-container {
    width: 100%;
    position: relative;
  }

  .content-item {
    cursor: pointer;
    position: relative;

    img {
      transition:  0.2s all ease-out;
      transform 0.3s ease 0s;
    }
    img:hover {
      transform: scale(1.005);
      filter: brightness(0.8);
    }
  }
  }

  .load{
    position: absolute,
    margin: 0 auto;
    display: flex;
    width: 100%;
    justify-content: center;
    align-items:center;
  }

 
`;

const Main = () => {
  const navigate = useNavigate();

  // const [posts, setPosts] = useState<Portfolio>([]);
  // const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  // const [load, setLoad] = useState<boolean>(false);
  // const page = useRef<number>(1);
  // const [ref, inView] = useInView();

  const { data } = useQuery("getList", getPortfolioList);
  const List = data?.data ?? [];

  // const getMainPortfolioImgs = useCallback(async () => {
  //   setLoad(true);
  //   try {
  //     // const { data } = await axios.get<Post[]>(
  //     //   `https://api.thecatapi.com/v1/images/?limit=4&page=${page.current}&order=DESC`,
  //     // );
  //     const { data } = await api.get<Portfolio>(
  //       `portfolio/list/?limit=4&page=${page.current}`
  //     );

  //     setPosts(prevPosts => [...prevPosts, ...data.data]);
  //     setHasNextPage(data.data.length === 4);
  //     if (data.data.length) {
  //       page.current += 1;
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setLoad(false);
  // }, []);

  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     getMainPortfolioImgs();
  //   }
  // }, [getMainPortfolioImgs, hasNextPage, inView, load]);

  return (
    // <MainStyle isLoad={load}>
    <MainStyle>
      <section className="main">
        <div className="tags">
          <button className="tag" onClick={() => navigate("/1")}>
            #일러스트
          </button>
          <button className="tag" onClick={() => navigate("/2")}>
            #캐리커쳐
          </button>
          <button className="tag" onClick={() => navigate("/3")}>
            #웹툰·콘티
          </button>
          <button className="tag" onClick={() => navigate("/4")}>
            #캐릭터
          </button>
          <button className="tag" onClick={() => navigate("/5")}>
            #이모티콘
          </button>
        </div>
        <div className="contents-container" id="scrollArea">
          <Masonry columns={3} spacing={2}>
            {List?.map((item: any) => (
              <div
                key={item.id}
                className="content-item"
                onClick={() => navigate(`/portfolio/${item.id}`)}
              >
                <h1>{item.portfolioName}</h1>
                <MainContent item={item} />
              </div>
            ))}
          </Masonry>
          {/* <div className="load" ref={ref}>
            {load && <CircularProgress color="inherit" />}
          </div> */}
        </div>
      </section>
    </MainStyle>
  );
};

export default Main;
