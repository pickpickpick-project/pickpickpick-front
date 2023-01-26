import styled from "styled-components";
import colors from "../../assets/colors";

const PageStyle = styled.div`
  padding: 135px 16px 140px 16px;
  margin: 0 auto;
  width: 1200px;
  color: ${colors.text};
`;

const ProductPage = () => {
  return (
    <PageStyle>
      <div>product</div>
    </PageStyle>
  );
};

export default ProductPage;
