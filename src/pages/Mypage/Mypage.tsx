import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import colors from "../../assets/colors";
import MypageProfile from "../../components/Mypage/Mypage_profile";
import CommonCarousel from "../../components/Common/Carousel";
import { CommonText } from "../../components/Artist/ArtistStyled";
import { useMutation, useQuery } from "react-query";
import { getUserPortfolio, PortfolioData } from "../../api/portfolio";
import { getWorkList, WorkList } from "../../api/work";
import { getUserInfo } from "../../api/user";
import { editInfoModalShow } from "../../recoil";
import { useRecoilState } from "recoil";
import {
  getOrderList,
  handlePaymentCancel,
} from "../../api/order";
import { Pagination } from "@mui/material";
import { Paging, Table } from "../Admin/ManageUserPage";
import axios from "axios";
import Spinner from "../../components/Common/spinner";

const MypageStyled = styled.div<{showInfoModal:boolean}>`
  padding: 125px 16px 140px 16px;
  height: 100%;
  margin: 0 auto;
  width: 900px;
  display: flex;
  flex-direction: column;
  color: ${colors.text};
  overflow-y: ${props => props.showInfoModal ? "hidden" : "none"};
  position : ${props => props.showInfoModal ? "fixed" : "none"};
`;

const Mypage = (): React.ReactElement => {
  const [ showInfoModal, setShowInfoModal ] = useRecoilState<boolean>(editInfoModalShow);
  const merchantUid = useRef("");
  const orderStatus = useRef("");
  const cancelPrice = useRef(0);
  const userId = Number(localStorage.getItem("userId"));
  let user_email = localStorage.getItem("email");
  const getProductListData = useQuery("getWorkList", () => getWorkList(userId));
  const getPortfolioData = useQuery("getPortfolioList", () =>
    getUserPortfolio(userId)
  );
  const { data: User } = useQuery("getUser", () => getUserInfo(userId));
  const { data: OrderList, refetch } = useQuery(
    ["getOrder", orderStatus.current],
    () => getOrderList(userId)
  );
  const ordertArr = OrderList?.data.data ?? [];
  const count = Math.ceil(ordertArr.length / 4);
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(ordertArr.slice(0, 4));

  const productListCount = getProductListData.data?.length;
  const portfolioListCount = getPortfolioData.data?.data.length;

  let productArray: WorkList[] = []
  let portfolioArray: PortfolioData[] = []
  for (let i = 0; i < productListCount!; i++) {
    productArray.push(getProductListData.data![i])
  }
  for (let i = 0; i < portfolioListCount; i++) {
    portfolioArray.push(getPortfolioData.data.data[i])
  }

  const { mutate: cancel } = useMutation(handlePaymentCancel, {
    onSuccess: data => {
      orderStatus.current = "CANCEL";

      axios
        .get("https://api.pppick.store/orders/status/", {
          params: {
            merchantUid: merchantUid.current,
            orderStatus: orderStatus.current,
          },
        })
        .then(res => {
          refetch();
        })
        .catch(res => console.log(res));
    },
    onError: data => {},
  });

  const onClickOrderStatusComplete = (item: any) => {
    orderStatus.current = "COMPLETE";
    merchantUid.current = item.merchantUid;

    axios
      .get("https://api.pppick.store/orders/status/", {
        params: {
          merchantUid: merchantUid.current,
          orderStatus: orderStatus.current,
        },
      })
      .then(res => refetch())
      .catch(res => console.log(res));
  };

  const onClickOrderStatusCancel = (item: any) => {
    cancelPrice.current = item.orderPrice;
    merchantUid.current = item.merchantUid;
    orderStatus.current = "CANCEL";

    cancel({
      merchantUid: merchantUid.current,
      cancelRequestAmount: cancelPrice.current,
    });
  };

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageItems(ordertArr.slice(4 * (value - 1), 4 * value));
  };

  useEffect(() => {
    setPageItems(ordertArr?.slice(0, 4));
  }, [ordertArr]);

  useEffect(() => {}, [merchantUid.current]);

  useEffect(() => {}, [orderStatus.current]);

  return getPortfolioData.status === "loading" || 
        getProductListData.status === "loading" 
  ? (
    <Spinner/>
  ) : (
    <MypageStyled showInfoModal={showInfoModal}>
      <MypageProfile email={user_email} />
      <CommonText>포트폴리오</CommonText>
      <CommonCarousel data={portfolioArray} category={"portfolio"} />
      <CommonText>판매</CommonText>
      <CommonCarousel data={productArray} category={"work"} />
      <CommonText>구매 이력</CommonText>
      <Table>
        <table>
          <thead>
            <tr>
              <th className="num">주문 번호</th>
              <th>상품 이름</th>
              <th>수량</th>
              <th>가격</th>
              <th>주문 상태</th>
            </tr>
          </thead>

          <tbody>
            {ordertArr !== undefined ? (
              pageItems.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.orderNum}</td>
                  <td>{item.workName}</td>
                  <td>{item.orderCount}</td>
                  <td>{item.workPrice}</td>
                  <td>
                    {item.orderStatus === "CONFIRM" ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <h3>결제 완료</h3>
                        <button
                          onClick={() => onClickOrderStatusComplete(item)}
                        >
                          구매 확정
                        </button>
                        <button onClick={() => onClickOrderStatusCancel(item)}>
                          구매 취소
                        </button>
                      </div>
                    ) : item.orderStatus === "COMPLETE" ? (
                      "구매확정"
                    ) : (
                      "구매취소"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <Spinner/>
            )}
          </tbody>
        </table>
      </Table>
      {ordertArr.length === 0 ? null : (
        <Paging>
          <Pagination count={count} page={page} onChange={handlePage} />
        </Paging>
      )}
      {/* <CommonText>구매</CommonText>
            <CommonCarousel data={portfolioData}/> */}
    </MypageStyled>
  );
};

export default Mypage;
