import styled from "styled-components";

const ContentStyle = styled.div`
  // height: 50rem;
  cursor: pointer;
  // height: 100%;
  // position: relative;

  // :after {
  //   content: "";
  //   display: block;
  //   padding-bottom: 100%;
  }
  img {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const MainContent = ({ src }: any) => {
  return (
    <ContentStyle>
      <img src={src} className="content" />
    </ContentStyle>
  );
};

export default MainContent;
