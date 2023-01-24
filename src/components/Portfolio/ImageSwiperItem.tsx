import { useState } from "react";
import PortfolioModal from "./PortfolioModal";
import { PortfolioImg } from "../../api/types";

interface Item {
  item: PortfolioImg;
}

const ImageSwiperItem = ({ item }: Item) => {
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <div className="item-img" onClick={openModal}>
        <img src={item.url} alt="" />
      </div>
      <PortfolioModal
        isOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        portfolioNum={item.portfolioNum}
      />
    </>
  );
};

export default ImageSwiperItem;
