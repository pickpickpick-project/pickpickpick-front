import { useNavigate } from "react-router";
import styled from "styled-components";
import colors from "../../assets/colors";

const ContainerStyle = styled.div<{ now: string }>`
  border-right: 2px solid black;

  .page-button {
    border-bottom: 1px solid black;
    padding: 40px;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }

  .${props => props.now} {
    background-color: ${colors.button};
  }
`;

interface Now {
  now: string;
}

const AdminContainer = ({ now }: Now) => {
  const navigate = useNavigate();
  return (
    <ContainerStyle now={now}>
      <div
        className="page-button user"
        onClick={() => navigate("/admin/manage/user")}
      >
        회원관리
      </div>
      <div
        className="page-button product"
        onClick={() => navigate("/admin/manage/product")}
      >
        상품관리
      </div>
      <div
        className="page-button portfolio"
        onClick={() => navigate("/admin/manage/portfolio")}
      >
        포트폴리오관리
      </div>
      <div
        className="page-button payment"
        onClick={() => navigate("/admin/manage/payment")}
      >
        결제관리
      </div>
    </ContainerStyle>
  );
};

export default AdminContainer;