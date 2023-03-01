import { useState } from "react";
import { WorkImg } from "../../api/work";

interface Item {
  item: WorkImg;
}

const ImageSwiperItem = ({ item }: Item) => {
  const baseURL = "http://api.pppick.store/";
  return (
    <>
      <div className="item-img">
        <img src={baseURL + item.workImgSrcPath} alt="" />
      </div>
    </>
  );
};

export default ImageSwiperItem;
