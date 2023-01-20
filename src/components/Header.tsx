import styled from "styled-components";
import colors from "../assets/colors";
import { ReactComponent as Logo } from "../assets/images/Home/PPPick-logo.svg";
const HeaderStyle = styled.div`
  height: 74px;
  width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  background-color: pink;
`;

const Header = () => {
  return (
    <HeaderStyle>
      <Logo />
      <div className="header-right"></div>
    </HeaderStyle>
  );
};

export default Header;
