import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getAdminPortfolio } from "../../api/admin";
import colors from "../../assets/colors";
import AdminContainer from "../../components/Admin/AdminContainer";
import { Paging, Search, Table } from "./ManageUserPage";
import { deletePortfolio } from "../../api/portfolio";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
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
    height: 700px;
  }
`;

const ManagePortfolioPage = () => {
  const { data: AdminPortfolio } = useQuery("adminUser", getAdminPortfolio);
  const portfolioArr = AdminPortfolio?.data ?? [];
  const count = Math.ceil(portfolioArr.length / 8);
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(portfolioArr.slice(0, 8));
  const [pageFiltered, setPageFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("name");
  const [filtered, setFiltered] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deletePortfolio, {
    onSuccess: data => {
      queryClient.invalidateQueries("deletePortfolio");
      console.log(data, " 포폴삭제");
      if (data.msg === "Success") {
        window.location.reload();
      }
    },
    onError: error => {
      console.log(error, "포폴삭제에러");
    },
  });

  const handleDeleteUser = (id: number) => {
    mutate({
      portfolioNm: id,
    });
  };

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageItems(portfolioArr.slice(8 * (value - 1), 8 * value));
  };

  const onChangeOption = (e: any) => {
    setOption(e.target.value);
  };

  const handleSearch = (e: any) => {
    setInput(e.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    if (e.key === "Enter") {
      setFiltered(true);
      setPageFiltered(
        portfolioArr.filter((v: any) => v.portfolioName.includes(input))
      );
    }
  };

  useEffect(() => {
    if (!input) {
      setFiltered(false);
    }
  }, [input]);

  useEffect(() => {
    setPageItems(portfolioArr.slice(0, 8));
  }, [portfolioArr]);

  return (
    <PageStyle>
      <div className="container">
        <AdminContainer now={"portfolio"} />
        <Table>
          <Search>
            <select onChange={onChangeOption}>
              <option value="name">포트폴리오이름</option>
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
                    <th>포트폴리오이름</th>
                    <th>타입</th>
                    <th>작성일</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {pageFiltered?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.portfolioNum}</td>
                      <td>
                        {item.portfolioName && item.portfolioName.length > 10
                          ? item.portfolioName.slice(0, 10) + "..."
                          : item.portfolioName}
                      </td>
                      <td>{item.portfolioType}</td>
                      <td>
                        {item.portfolioDate && item.portfolioDate.slice(0, 10)}
                      </td>
                      <td
                        className="delete"
                        onClick={() => {
                          handleDeleteUser(item.portfolioNum);
                        }}
                      >
                        삭제
                      </td>
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
                    <th>포트폴리오이름</th>
                    <th>타입</th>
                    <th>작성일</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems?.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.portfolioNum}</td>
                      <td>
                        {item.portfolioName && item.portfolioName.length > 10
                          ? item.portfolioName.slice(0, 10) + "..."
                          : item.portfolioName}
                      </td>
                      <td>{item.portfolioType}</td>
                      <td>
                        {item.portfolioDate && item.portfolioDate.slice(0, 10)}
                      </td>
                      <td
                        className="delete"
                        onClick={() => {
                          handleDeleteUser(item.portfolioNum);
                        }}
                      >
                        삭제
                      </td>
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
      </div>
    </PageStyle>
  );
};

export default ManagePortfolioPage;
