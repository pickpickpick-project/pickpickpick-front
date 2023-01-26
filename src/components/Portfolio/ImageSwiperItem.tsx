import { useState } from "react";
import { PortfolioImg } from "../../api/types";

interface Item {
  item: PortfolioImg;
}

const ImageSwiperItem = ({ item }: Item) => {
  return (
    <>
      <div className="item-img">
        <img src={item.url} alt="" />
      </div>
    </>
  );
};

export default ImageSwiperItem;
