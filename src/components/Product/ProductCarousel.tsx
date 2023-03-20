import ImageSwiperItem from "../Portfolio/ImageSwiperItem";
import Slider from "react-slick";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/images/Portfolio/arrow-btn.svg";
import { WorkImg } from "../../api/work";

const SwiperStyle = styled.div`
  display: flex;
  //   width: 100%;

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
    width: 652px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .slick-list {
    width: 652px;
    height: 488px;
    overflow: hidden;
  }
  .slick-track {
    display: flex;
    height: 488px;
  }

  .item-img {
    width: 652px;
    height: 488px;
    transition: 0.3s all ease-out;
    cursor: pointer;

    img {
      width: 100%;
      height: 488px;
    }
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

interface Img {
  workImg: WorkImg[];
}

const ProductCarousel = ({ workImg }: Img) => {
  const settings = {
    className: "slider variable-width",
    dots: false,
    infinite: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
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
        {workImg?.map((item, idx) => (
          <ImageSwiperItem key={idx} item={item} />
        ))}
      </Slider>
    </SwiperStyle>
  );
};

export default ProductCarousel;
