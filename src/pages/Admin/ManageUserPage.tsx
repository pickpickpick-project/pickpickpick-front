import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import { getAdminUser } from "../../api/admin";
import { deleteUser } from "../../api/user";
import colors from "../../assets/colors";
import AdminContainer from "../../components/Admin/AdminContainer";

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

export const Table = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 18px;
  padding: 40px 20px;

  thead {
    font-weight: 700;
  }

  th,
  td {
    border: 1px solid black;
    padding: 20px;
  }

  tbody {
    height: 100px;
  }

  .delete {
    font-weight: 700;
    background-color: ${colors.button};
    cursor: pointer;
    width: 80px;
    text-align: center;
  }

  .num {
    width: 40px;
  }
`;

export const Paging = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const Search = styled.div`
  display: flex;
  margin-bottom: 20px;
  input {
    width: 300px;
  }
`;

const ManageUserPage = () => {
  const { data: AdminUser } = useQuery("adminUser", getAdminUser);
  const userArr = AdminUser?.data ?? [];
  const count = Math.ceil(userArr.length / 8);
  const [page, setPage] = useState(1);
  const [pageItems, setPageItems] = useState(userArr.slice(0, 8));
  const [pageFiltered, setPageFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [option, setOption] = useState("name");
  const [filtered, setFiltered] = useState(false);

  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteUser, {
    onSuccess: data => {
      queryClient.invalidateQueries("deleteUser");
      console.log(data, "유저삭제");
      if (data.msg === "Success") {
        window.location.reload();
      }
    },
    onError: error => {
      console.log(error, "유저삭제에러");
    },
  });

  const handleDeleteUser = (id: number) => {
    mutate({
      userNum: id,
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
    if (e.key === "Enter" && option === "name") {
      setFiltered(true);
      setPageFiltered(userArr.filter((v: any) => v.name.includes(input)));
    }
    if (e.key === "Enter" && option === "email") {
      setFiltered(true);
      setPageFiltered(userArr.filter((v: any) => v.email.includes(input)));
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
        <AdminContainer now={"user"} />
        <Table>
          <Search>
            <select onChange={onChangeOption}>
              <option value="name">이름</option>
              <option value="email">이메일</option>
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
                    <th>이름</th>
                    <th>이메일</th>
                    <th>닉네임</th>
                    <th>전화번호</th>
                    <th>삭제</th>
                  </tr>
                </thead>
                <tbody>
                  {pageFiltered.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.nickname}</td>
                      <td>{item.phone}</td>
                      <td
                        className="delete"
                        onClick={() => {
                          handleDeleteUser(item.id);
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
                    <th>이름</th>
                    <th>이메일</th>
                    <th>닉네임</th>
                    <th>전화번호</th>
                    <th>삭제</th>
                  </tr>
                </thead>

                <tbody>
                  {pageItems.map((item: any, index: number) => (
                    <tr key={index}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.nickname}</td>
                      <td>{item.phone}</td>
                      <td
                        className="delete"
                        onClick={() => {
                          handleDeleteUser(item.id);
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

export default ManageUserPage;
