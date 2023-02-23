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
    border: 2px solid black;
    display: flex;
    border-radius: 6px;
    height: 700px;
  }
`;

export const Table = styled.div`
  width: 80%;
  overflow-y: scroll;
  display: flex;
  justify-content: center;
  font-size: 18px;
  padding: 40px 0;

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
    overflow-y: scroll;
  }

  .delete {
    font-weight: 700;
    background-color: ${colors.button};
    cursor: pointer;
  }
`;

const ManageUserPage = () => {
  const { data: AdminUser } = useQuery("adminUser", getAdminUser);
  const userArr = AdminUser?.data ?? [];

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

  return (
    <PageStyle>
      <div className="container">
        <AdminContainer now={"user"} />
        <Table>
          <table>
            <thead>
              <tr>
                <th>회원아이디</th>
                <th>이름</th>
                <th>이메일</th>
                <th>닉네임</th>
                <th>전화번호</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {userArr.map((item: any) => (
                <tr key={item.id}>
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
        </Table>
      </div>
    </PageStyle>
  );
};

export default ManageUserPage;
