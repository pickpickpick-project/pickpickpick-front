import styled from "styled-components";
import BoardTable from "../../components/Inquiry/BoardTable";

const InquiryStyle = styled.div`
  .header {
    height: 60px;
    background-color: lightgray;
  }

  .main {
    margin: 40px 10rem;
    margin-bottom: 60px;
  }

  .title {
    font-size: 24px;
    font-weight: bold;
    margin: 50px 0;
  }

  .write {
    display: flex;
    justify-content: flex-end;
    margin-top: 50px;

    .write-button {
      font-size: 18px;
      padding: 5px 20px;
      cursor: pointer;
    }
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    background-color: lightgray;
    height: 60px;
  }
`;

const InquiryBoard = () => {
  return (
    <InquiryStyle>
      <div className="header">헤더</div>
      <section className="main">
        <div className="title">문의 게시판</div>
        <BoardTable />
        <div className="write">
          <button className="write-button">글 작성</button>
        </div>
      </section>
      <footer>footer</footer>
    </InquiryStyle>
  );
};

export default InquiryBoard;
