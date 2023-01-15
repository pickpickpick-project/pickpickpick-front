import styled from "styled-components";

const PageStyle = styled.div`
  .header {
    height: 60px;
    background-color: lightgray;
  }

  .main {
    margin: 40px 10rem;
    margin-bottom: 60px;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: lightgray;
    height: 60px;
  }
`;

const InquiryWritePage = () => {
  return (
    <PageStyle>
      <div className="header">헤더</div>
      <section className="main"></section>
      <footer>footer</footer>
    </PageStyle>
  );
};

export default InquiryWritePage;
