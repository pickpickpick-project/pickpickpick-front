import { useState } from "react";
import PortfolioModal from "./PortfolioModal";

interface Post {
  //파일 따로 빼서 import 하기
  userId: number;
  id: number;
  title: string;
  body: string;
  url: string;
  portfolioNum: number;
}

interface Item {
  item: Post;
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
        item={item}
      />
    </>
  );
};

export default ImageSwiperItem;
