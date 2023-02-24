import { useQuery } from "react-query";
import styled from "styled-components";
import colors from "../../assets/colors";
import AdminContainer from "../../components/Admin/AdminContainer";
import Calendar from "../../components/Admin/Calendar";
import { Paging, Search, Table } from "./ManageUserPage";
import { getAdminPayment } from "../../api/admin";
import { useEffect, useState } from "react";
import { Pagination } from "@mui/material";
import { useRecoilValue } from "recoil";
import { endDateState, startDateState } from "../../recoil/calendar";

const PageStyle = styled.div`
  padding: 135px 16px 140px 16px;
  margin: 0 auto;
  width: 1200px;
  color: ${colors.text};
  position: relative;
  top: 50%;

  .container {
    border: 1px solid black;
    display: flex;
    border-radius: 6px;
    // height: 700px;
  }
`;

const Container = styled.div`
  height: 700px;
`;

const ManagePaymentPage = () => {
  const { data: AdminPayment } = useQuery("adminPayment", getAdminPayment);
  const paymentArr = AdminPayment?.data ?? [];
  const count = Math.ceil(paymentArr.length / 7);
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(paymentArr.slice(0, 7));
  const [pageFiltered, setPageFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("payer");
  const [filtered, setFiltered] = useState(false);

  const startDate = useRecoilValue(startDateState);
  const endDate = useRecoilValue(endDateState);

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageItems(paymentArr.slice(7 * (value - 1), 7 * value));
  };
  const onChangeOption = (e: any) => {
    setOption(e.target.value);
  };

  const handleSearch = (e: any) => {
    setInput(e.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter" && option === "payer") {
      setFiltered(true);
      setPageFiltered(
        paymentArr.filter((v: any) => v.payerName.includes(input))
      );
    } else if (e.key === "Enter" && option === "work") {
      setFiltered(true);
      setPageFiltered(
        paymentArr.filter((v: any) => v.workName.includes(input))
      );
    } else if (e.key === "Enter" && option === "worker") {
      setFiltered(true);
      setPageFiltered(
        paymentArr.filter((v: any) => v.workerName.includes(input))
      );
    }
  };

  useEffect(() => {
    if (!input) {
      setFiltered(false);
    }
  }, [input]);
  useEffect(() => {
    setPageItems(paymentArr.slice(0, 7));
  }, [paymentArr]);

  const handleDate = () => {
    setFiltered(true);
    setPageFiltered(
      paymentArr.filter(
        (v: any) =>
          v.paymentDate.slice(0, 10) >= startDate &&
          v.paymentDate.slice(0, 10) <= endDate
      )
    );
  };

  return (
    <PageStyle>
      <div className="container">
        <AdminContainer now={"payment"} />
        <Container>
          <Calendar handleDate={handleDate} />
          <Table>
            <Search>
              <select onChange={onChangeOption}>
                <option value="payer">구매자명</option>
                <option value="work">상품명</option>
                <option value="worker">작가명</option>
              </select>
              <input
                value={input}
                onChange={handleSearch}
                onKeyPress={handleOnKeyPress}
                placeholder={"엔터를 눌러주세요"}
              />
            </Search>
            {filtered ? (
              <div
                style={{ overflowY: "scroll", height: "528px", width: "100%" }}
              >
                <table style={{ width: "100%" }}>
                  <thead>
                    <tr>
                      <th className="num">번호</th>
                      <th>결제수</th>
                      <th>가격</th>
                      <th>결제방법</th>
                      <th>결제일</th>
                      <th>구매자명</th>
                      <th>상품명</th>
                      <th>작가명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageFiltered.map((item: any) => (
                      <tr key={item.paymentId}>
                        <td>{item.paymentId}</td>
                        <td>{item.paymentCount}</td>
                        <td>{item.paymentPrice}</td>
                        <td>{item.payMethod}</td>
                        <td>{item.paymentDate.slice(0, 10)}</td>
                        <td>{item.payerName}</td>
                        <td>
                          {item.workName && item.workName.length > 5
                            ? item.workName.slice(0, 5) + "..."
                            : item.workName}
                        </td>
                        <td>{item.workerName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <>
                <table>
                  <thead>
                    <tr>
                      <th className="num">번호</th>
                      <th>결제수</th>
                      <th>가격</th>
                      <th>결제방법</th>
                      <th>결제일</th>
                      <th>구매자명</th>
                      <th>상품명</th>
                      <th>작가명</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageItems.map((item: any) => (
                      <tr key={item.paymentId}>
                        <td>{item.paymentId}</td>
                        <td>{item.paymentCount}</td>
                        <td>{item.paymentPrice}</td>
                        <td>{item.payMethod}</td>
                        <td>{item.paymentDate.slice(0, 10)}</td>
                        <td>{item.payerName}</td>
                        <td>
                          {item.workName && item.workName.length > 5
                            ? item.workName.slice(0, 5) + "..."
                            : item.workName}
                        </td>
                        <td>{item.workerName}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Paging>
                  <Pagination count={count} page={page} onChange={handlePage} />
                </Paging>
              </>
            )}
          </Table>
        </Container>
      </div>
    </PageStyle>
  );
};

export default ManagePaymentPage;
