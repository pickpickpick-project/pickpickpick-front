import { useNavigate } from "react-router";
import styled from "styled-components";
import MainContent from "../../components/Home/MainContent";

const MainStyle = styled.div`
  .header {
    height: 60px;
    background-color: lightgray;
  }

  .main {
    margin: 40px 10rem;
    margin-bottom: 60px;
  }

  .tags {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 40px;
  }

  .tag {
    font-size: 18px;
    width: 9em;
    height: 2em;
    border-radius: 8px;
    cursor: pointer;
  }

  .contents-container {
    border: 1px solid black;
    background-color: lightgray;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    column-gap: 40px;
    padding: 40px 30px;
  }

  footer {
    background-color: lightgray;
    height: 60px;
  }
`;

const Main = () => {
  let navigate = useNavigate();
  return (
    <MainStyle>
      <div className="header">header</div>
      <section className="main">
        <div className="tags">
          <button className="tag">#일러스트</button>
          <button className="tag">#캐리커쳐</button>
          <button className="tag">#웹툰 콘티</button>
          <button className="tag">#캐릭터</button>
          <button className="tag">#이모티콘</button>
        </div>
        <div className="contents-container">
          <MainContent />
          <MainContent />
          <MainContent />
          <MainContent />
        </div>
      </section>
      <footer onClick={() => navigate("/inquiry")}>문의게시판 가기</footer>
    </MainStyle>
  );
};

export default Main;
