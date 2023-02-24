import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getAdminProduct } from "../../api/admin";
import { deleteProduct } from "../../api/product";
import colors from "../../assets/colors";
import AdminContainer from "../../components/Admin/AdminContainer";
import { Paging, Search, Table } from "./ManageUserPage";

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

const ManageProductPage = () => {
  const { data: AdminProduct } = useQuery("adminProduct", getAdminProduct);
  const userArr = AdminProduct?.data ?? [];
  const count = Math.ceil(userArr.length / 8);
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(userArr.slice(0, 8));
  const [pageFiltered, setPageFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("name");
  const [filtered, setFiltered] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteProduct, {
    onSuccess: data => {
      queryClient.invalidateQueries("deleteProduct");
      console.log(data, "유저삭제");
      if (data.msg === "Success") {
        window.location.reload();
      }
    },
    onError: error => {
      console.log(error, "유저삭제에러");
    },
  });
  const handleDeleteProduct = (id: number) => {
    mutate({
      workNum: id,
    });
  };

  const handlePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    setPageItems(userArr.slice(8 * (value - 1), 8 * value));
  };

  const onChangeOption = (e: any) => {
    setOption(e.target.value);
  };

  const handleSearch = (e: any) => {
    setInput(e.target.value);
  };

  const handleOnKeyPress = (e: any) => {
    setFiltered(true);
    if (e.key === "Enter") {
      setPageFiltered(userArr.filter((v: any) => v.workName.includes(input)));
    }
  };

  useEffect(() => {
    if (!input) {
      setFiltered(false);
    }
  }, [input]);

  useEffect(() => {
    setPageItems(userArr.slice(0, 8));
  }, [userArr]);

  return (
    <PageStyle>
      <div className="container">
        <AdminContainer now={"product"} />
        <Table>
          <Search>
            <select onChange={onChangeOption}>
              <option value="name">상품이름</option>
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
                    <th>상품이름</th>
                    <th>상품가격</th>
                    <th>상품설명</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {pageFiltered.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.workNum}</td>
                      <td>{item.workName}</td>
                      <td>{item.workPrice}</td>
                      <td>
                        {item.workDesc && item.workDesc.length > 10
                          ? item.workDesc.slice(0, 10) + "..."
                          : item.workDesc}
                      </td>
                      <td
                        className="delete"
                        onClick={() => handleDeleteProduct(item.workNum)}
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
                    <th>상품이름</th>
                    <th>상품가격</th>
                    <th>상품설명</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {pageItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.workNum}</td>
                      <td>{item.workName}</td>
                      <td>{item.workPrice}</td>
                      <td>
                        {item.workDesc && item.workDesc.length > 10
                          ? item.workDesc.slice(0, 10) + "..."
                          : item.workDesc}
                      </td>
                      <td
                        className="delete"
                        onClick={() => handleDeleteProduct(item.workNum)}
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

export default ManageProductPage;
