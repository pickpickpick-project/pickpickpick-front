import Slider from "react-slick";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/images/Portfolio/arrow-btn.svg";

const SwiperStyle = styled.div`
  display: flex;
  width: 100%;

  .slick-arrow {
    z-index: 1;
    cursor: pointer;

    .slick-prev::before,
    .slick-next::before {
      opacity: 0;
      display: none;
    }
  }

  .slick-slider {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .slick-list {
    width: ${window.innerWidth - 300}px;
    height: 500px;
  }
  .slick-track {
    display: flex;
    height: 500px;
  }

  .item-img {
    // width: 500px;
    height: 500px;
    transition: 0.3s all ease-out;

    img {
      height: 500px;
    }
  }

  .item-img:hover {
    transform: scale(1.05);
  }
`;

const Div = styled.div`
  position: absolute;
  left: 30px;
  z-index: 99;
  text-align: center;
`;

const DivNext = styled.div`
  position: absolute;
  right: 30px;
  z-index: 99;
  text-align: center;
`;
const ImageSwiper = () => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    autoplay: true,
    prevArrow: (
      <Div>
        <Arrow style={{ transform: "rotate(180deg)" }} />
      </Div>
    ),
    nextArrow: (
      <DivNext>
        <Arrow />
      </DivNext>
    ),
  };

  return (
    <SwiperStyle>
      <Slider {...settings}>
        {itemData.map((item, idx) => (
          <div key={idx} className="item-img">
            <img src={item.img} alt="" />
          </div>
        ))}
      </Slider>
    </SwiperStyle>
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
];

export default ImageSwiper;
