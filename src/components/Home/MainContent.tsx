import styled from "styled-components";

const ContentStyle = styled.div`
  border: 1px solid black;
  height: 17em;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const MainContent = () => {
  return (
    <ContentStyle>
      <div className="content">컨텐츠</div>
    </ContentStyle>
  );
};

export default MainContent;
