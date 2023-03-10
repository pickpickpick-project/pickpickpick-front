import { useNavigate } from "react-router";
import styled from "styled-components";
import colors from "../../assets/colors";
import Masonry from "@mui/lab/Masonry";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Key,
  useCallback,
  useEffect,
  useRef,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from "react";
import MainContent from "../../components/Home/MainContent";
import {
  getPortfolioList,
  getTagPortfolio,
  PortfolioData,
} from "../../api/portfolio";
import { useQuery } from "react-query";
import { getFavorites } from "../../api/favorites";
import Spinner from "../../components/Common/spinner";

const MainStyle = styled.div`
  padding: 115px 16px 140px 16px;
  
  .tags {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 40px;
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

const TagInputWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  margin-bottom : 10px;
`;

const TagInput = styled.input`
  border: 1px solid yellow;
  &:focus {
    outline: 1px solid yellow;
  }
`;

const Main = () => {
  const navigate = useNavigate();
  // const [posts, setPosts] = useState<Portfolio>([]);
  // const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  // const [load, setLoad] = useState<boolean>(false);
  // const page = useRef<number>(1);
  // const [ref, inView] = useInView();

  const { data: List } = useQuery("getList", getPortfolioList);
  const ListInfo = List?.data ?? [{ id: 0, portfolioName: "" }];
  const [type, setType] = useState<number>(0);
  const [tagValue, setTagValue] = useState<string>("");
  const [completeTag, setCompleteTag] = useState<string>("");
  const [searchFlag, setSearchFlag] = useState<boolean>(false);

  const { data: getTag } = useQuery(
    ["getTagPortfolio", completeTag],
    () => getTagPortfolio({ tags: completeTag }),
    {
      enabled: !!completeTag, // ?????? ??????????????? useQuery ??????
    }
  );

  const onChangeTextValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(e.target.value);
    console.log(tagValue);
  };

  const handleOnKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setCompleteTag(tagValue);
      console.log("enter", completeTag);
      setSearchFlag(true);
    }
  };

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

  const onClickType = (type: number) => {
    setType(type);
    setSearchFlag(false);
    setCompleteTag("");
    setTagValue("");
  };

  return (
    // <MainStyle isLoad={load}>
    <MainStyle>
      <section className="main">
        <TagInputWrapper>
            <TagInput placeholder="????????? ?????? ??? ??????" value={tagValue} onChange={onChangeTextValue} onKeyPress={handleOnKeyPress}/>
        </TagInputWrapper>
        <div className="tags">
          <button className="tag" onClick={() => onClickType(0)}>
            ????????????
          </button>
          <button className="tag" onClick={() => onClickType(1)}>
            #????????????
          </button>
          <button className="tag" onClick={() => onClickType(2)}>
            #????????????
          </button>
          <button className="tag" onClick={() => onClickType(3)}>
            #??????????????
          </button>
          <button className="tag" onClick={() => onClickType(4)}>
            #?????????
          </button>
          <button className="tag" onClick={() => onClickType(5)}>
            #????????????
          </button>
        </div>
        
        <div className="contents-container" id="scrollArea">
          <Masonry columns={3} spacing={2}>
            {searchFlag === true ? ( // ?????? ????????? ??????
              getTag === undefined ? (
                <Spinner/> // ?????? ????????? ???????????? ???
              ) : (
                getTag.data.map((data: any, index: number) => (
                  <div
                    key={data.portfolioNum ?? index}
                    className="content-item"
                    onClick={() => navigate(`/portfolio/${data.portfolioNum}`)}
                  >
                    <MainContent item={data} />
                  </div>
                ))
              )
            ) : type === 0 ? ( // ??????
              ListInfo?.map((item: any, index: number) => (
                <div
                  key={item.id ?? index}
                  className="content-item"
                  onClick={() => navigate(`/portfolio/${item.portfolioNum}`)}
                >
                  <MainContent item={item} />
                </div>
              ))
            ) : type === 1 ? (
              ListInfo?.map((item: any, index: number) =>
                item.portfolioType === 1 ? ( // ?????? 1
                  <div
                    key={item.id ?? index}
                    className="content-item"
                    onClick={() => navigate(`/portfolio/${item.portfolioNum}`)}
                  >
                    <MainContent item={item} />
                  </div>
                ) : null
              )
            ) : type === 2 ? (
              ListInfo?.map((item: any, index: number) =>
                item.portfolioType === 2 ? ( // ?????? 2
                  <div
                    key={item.id ?? index}
                    className="content-item"
                    onClick={() => navigate(`/portfolio/${item.portfolioNum}`)}
                  >
                    <MainContent item={item} />
                  </div>
                ) : null
              )
            ) : type === 3 ? (
              ListInfo?.map((item: any, index: number) =>
                item.portfolioType === 3 ? ( // ?????? 3
                  <div
                    key={item.id ?? index}
                    className="content-item"
                    onClick={() => navigate(`/portfolio/${item.portfolioNum}`)}
                  >
                    <MainContent item={item} />
                  </div>
                ) : null
              )
            ) : type === 4 ? (
              ListInfo?.map((item: any, index: number) =>
                item.portfolioType === 4 ? ( // ?????? 4
                  <div
                    key={item.id ?? index}
                    className="content-item"
                    onClick={() => navigate(`/portfolio/${item.portfolioNum}`)}
                  >
                    <MainContent item={item} />
                  </div>
                ) : null
              )
            ) : null}
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
