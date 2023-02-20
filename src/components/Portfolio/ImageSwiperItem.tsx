import { useState } from "react";
import { PortfolioImg } from "../../api/types";
import { WorkImg } from "../../api/work";
import baseURL from "../../api/api";

interface Item {
  item: WorkImg;
}

const ImageSwiperItem = ({ item }: Item) => {
  const baseURL =
    "http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/";
  return (
    <>
      <div className="item-img">
        <img src={baseURL + item.workImgSrcPath} alt="" />
      </div>
    </>
  );
};

export default ImageSwiperItem;
