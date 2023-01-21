import { useNavigate } from "react-router";
import styled from "styled-components";
import colors from "../../assets/colors";
import MainContent from "../../components/Home/MainContent";
import Img from "../../assets/images/Home/content.jpg";
import Img2 from "../../assets/images/Home/content2.jpg";
import Masonry from "@mui/lab/Masonry";
// import { styled } from "@mui/material/styles";

const MainStyle = styled.div`
  padding: 60px 16px 140px 16px;
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
    width: 6em;
    height: 6em;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    background-color: ${colors.button};
  }

  .contents-container {
    width: 100%;
  }
`;

const Main = () => {
  let navigate = useNavigate();
  return (
    <MainStyle>
      <section className="main">
        <div className="tags">
          <button className="tag">#일러스트</button>
          <button className="tag">#캐리커쳐</button>
          <button className="tag">#웹툰 콘티</button>
          <button className="tag">#캐릭터</button>
          <button className="tag">#이모티콘</button>
        </div>
        <div className="contents-container">
          {/* <MainContent src={Img} />
          <MainContent src={Img2} />
          <MainContent src={Img} />
          <MainContent src={Img2} /> */}
          <Masonry columns={2} spacing={2}>
            {itemData.map((item, index) => (
              <div key={index}>
                <img
                  src={`${item.img}?w=162&auto=format`}
                  srcSet={`${item.img}?w=162&auto=format&dpr=2 2x`}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    borderBottomLeftRadius: 4,
                    borderBottomRightRadius: 4,
                    display: "block",
                    width: "100%",
                  }}
                />
              </div>
            ))}
          </Masonry>
        </div>
      </section>
    </MainStyle>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    title: "Snacks",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1529655683826-aba9b3e77383",
    title: "Tower",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Breakfast",
  },
  {
    img: "https://images.unsplash.com/photo-1627328715728-7bcc1b5db87d",
    title: "Tree",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1627000086207-76eabf23aa2e",
    title: "Camping Car",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1627328561499-a3584d4ee4f7",
    title: "Mountain",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

export default Main;
