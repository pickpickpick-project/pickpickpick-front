import { useQuery } from "react-query";
import styled from "styled-components";
import { getAdminProduct } from "../../api/admin";
import colors from "../../assets/colors";
import AdminContainer from "../../components/Admin/AdminContainer";
import { Table } from "./ManageUserPage";

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

const ManageProductPage = () => {
  const { data: AdminProduct } = useQuery("adminProduct", getAdminProduct);
  const userArr = AdminProduct?.data ?? [];
  return (
    <PageStyle>
      <div className="container">
        <AdminContainer now={"product"} />
        <Table>
          <table>
            <thead>
              <tr>
                <th>상품아이디</th>
                <th>상품이름</th>
                <th>상품가격</th>
                <th>상품설명</th>
              </tr>
            </thead>
            <tbody>
              {userArr.map((item: any) => (
                <tr key={item.id}>
                  <td>{item.workNum}</td>
                  <td>{item.workName}</td>
                  <td>{item.workPrice}</td>
                  <td>{item.workDesc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Table>
      </div>
    </PageStyle>
  );
};

export default ManageProductPage;
