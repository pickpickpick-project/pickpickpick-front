import { useState } from "react";
import { WorkImg } from "../../api/work";

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
