import styled from "styled-components";
import colors from "../../assets/colors";
import AdminContainer from "../../components/Admin/AdminContainer";
import Calendar from "../../components/Admin/Calendar";

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

const ManagePaymentPage = () => {
  return (
    <PageStyle>
      <div className="container">
        <AdminContainer now={"payment"} />
        <Calendar />
      </div>
    </PageStyle>
  );
};

export default ManagePaymentPage;
