import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import styled from "styled-components";
import { getUserInfo } from "../../api/user";
import { getWorkId } from "../../api/work";
import colors from "../../assets/colors";
import ProductCarousel from "../../components/Product/ProductCarousel";

const PageStyle = styled.div`
  padding: 165px 16px 140px 16px;
  margin: 0 auto;
  width: 1200px;
  color: ${colors.text};
  


  display: flex;
  justify-content: space-between;

  .image-section {
    height: 488px;
    width: 652px;
    object-fit: cover;
  }

  .purchase-section {
    min-width: 450px;
    height: 488px;
    margin-left: 58px;
    padding: 24px 24px 0px;
    border: 1px solid rgb(228, 229, 237);
    position: relative;

    .name {
      font-weight: bold;
      margin: 0px 0px 8px;
      color: rgb(48, 52, 65);
      font-size: 20px;
      // word-break: keep-all;
      line-height: 1.5;
      padding-bottom: 16px;
      border-bottom: 1px solid rgb(228, 229, 237);
    }

.priceAndArtist{
  display: flex;
  justify-content: space-between;
}

    .artist, .description {
      color: rgb(48, 52, 65);
      font-size: 14px;
      margin-top: 4px;
      line-height: 1.5;
      white-space: pre-wrap;
}
    }
    .price {
      margin-bottom: 16px;
      color: rgb(48, 52, 65);
      font-size: 18px;
      font-weight: 700;
    }
  }

  .button-section{
   
    margin-top: 24px;
    padding: 0px 24px;

    .amount{
      position: absolute;
      bottom: 120px;
      font-size: 20px;
      font-weight: 700;

      span{
        margin-right : 20px;
      }
      .minus, .plus{
        background-color: ${colors.bgcolor}
        font-size: 30px;
        cursor: pointer;
      }
    }

    .purchase-button{
      outline: none;
      border-width: 1px;
      border-style: solid;
      border-radius: 4px;
      font-weight: 500;
      transition: background-color 0.3s ease 0s, border-color 0.3s ease 0s;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: absolute;
      bottom: 40px;
      width: 420px;
      height: 52px;
      font-size: 16px;
      min-width: 80px;
      background-color: rgb(255, 212, 0);
      border-color: rgb(255, 212, 0);
      font-weight: bold
    }

    .purchase-button:hover{
      filter: brightness(90%);
    }
  }
`;

const ProductPage = () => {
  let { id } = useParams();
  const [amount, setAmout] = useState(1);
  const { data } = useQuery("work", () => getWorkId(Number(id)));
  const { data: User, refetch } = useQuery("getUserIn", () =>
    getUserInfo(data?.data.workInfo.workerNum ?? 1)
  );

  const [imgView, setImgView] = useState<string>("");

  const workInfo = data?.data.workInfo;
  const workImg = data?.data.workInfo.workImages;

  const handleAmout = (text: string) => {
    console.log(imgView);
    if (text === "add") {
      setAmout(amount + 1);
    } else {
      if (amount === 0) return;
      setAmout(amount - 1);
    }
  };

  useEffect(() => {
    if (data) {
      refetch();
    }
  }, [data]);

  return (
    <PageStyle>
      <div className="image-section">
        <ProductCarousel workImg={workImg} />
      </div>
      <div className="purchase-section">
        <div className="name">{workInfo?.workName}</div>
        <div className="priceAndArtist">
          <div className="price">{workInfo?.workPrice}원</div>
          <div className="artist">{User?.data.name}</div>
        </div>

        <div className="description">{workInfo?.workDesc}</div>

        <div className="button-section">
          <div className="amount">
            <span className="minus" onClick={() => handleAmout("sub")}>
              -
            </span>
            <span>수량 ({amount})</span>
            <span className="plus" onClick={() => handleAmout("add")}>
              +
            </span>
          </div>
          <button className="purchase-button">구매하기</button>
        </div>
      </div>
    </PageStyle>
  );
};

export default ProductPage;
