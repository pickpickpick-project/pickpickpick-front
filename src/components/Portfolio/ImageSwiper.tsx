import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { ReactComponent as Arrow } from "../../assets/images/Portfolio/arrow-btn.svg";
import ImageSwiperItem from "./ImageSwiperItem";
import { PortfolioImg } from "../../api/types";
import { useQuery } from "react-query";
import { getPortfolioId, PortfolioData } from "../../api/portfolio";
import { useParams } from "react-router";

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
    cursor: pointer;

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

const ImageSwiper = (imgArr: any) => {
  const baseURL = "http://api.pppick.store/";
  return (
    <SwiperStyle>
      <Slider {...settings}>
        {imgArr.data?.map((item: any, index: number) => (
          <div className="item-img" key={index}>
            <img src={baseURL + item.portfolioImgAddr} alt="" />
          </div>
        ))}
      </Slider>
    </SwiperStyle>
  );
};

export default ImageSwiper;
