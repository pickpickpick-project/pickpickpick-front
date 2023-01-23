import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import colors from "../../assets/colors";
import Masonry from "@mui/lab/Masonry";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { useCallback, useEffect, useRef, useState } from "react";
import MainContent from "../../components/Home/MainContent";

const MainStyle = styled.div<{ isLoad: boolean }>`
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

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Main = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const [posts, setPosts] = useState<Post[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [load, setLoad] = useState<boolean>(false);
  const page = useRef<number>(1);
  const [ref, inView] = useInView();

  const fetch = useCallback(async () => {
    setLoad(true);
    try {
      const { data } = await axios.get<Post[]>(
        `https://api.thecatapi.com/v1/images/?limit=4&page=${page.current}&order=DESC`,
        {
          headers: {
            "x-api-key": "17d94b92-754f-46eb-99a0-65be65b5d18f",
          },
        }
      );

      setPosts(prevPosts => [...prevPosts, ...data]);
      setHasNextPage(data.length === 4);
      if (data.length) {
        page.current += 1;
      }
    } catch (err) {
      console.error(err);
    }
    setLoad(false);
  }, []);

  useEffect(() => {
    console.log(inView, hasNextPage, page.current, load);
    if (inView && hasNextPage) {
      fetch();
    }
  }, [fetch, hasNextPage, inView, load]);

  return (
    <MainStyle isLoad={load}>
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
          <Masonry columns={2} spacing={2}>
            {posts?.map(
              (
                item,
                index //쿼리스트링
              ) => (
                <div
                  key={index}
                  className="content-item"
                  onClick={index => navigate(`/portfolio/${1}`)}
                >
                  <MainContent item={item} />
                </div>
              )
            )}
          </Masonry>
          <div className="load" ref={ref}>
            {load && <CircularProgress color="inherit" />}
          </div>
        </div>
      </section>
    </MainStyle>
  );
};

const itemData = [
  {
    url: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
    tag: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    title: "Snacks",
    tag: 1,
  },
  {
    url: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
    tag: 2,
  },
  {
    url: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    title: "Tower",
  },
  {
    url: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    url: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
];

export default Main;
