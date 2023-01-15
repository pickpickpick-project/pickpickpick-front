import styled from "styled-components";
import PostCommentItem from "../../components/Inquiry/PostCommentItem";

const PostStyle = styled.div`
  .header {
    height: 60px;
    background-color: lightgray;
  }

  .main {
    margin: 40px 10rem;
    margin-bottom: 60px;
  }

  .post-header {
    font-size: 20px;
    margin: 50px;
    padding-left: 20px;
    border-bottom: 1px solid black;

    .post-header-title {
      margin: 20px 0;
      font-weight: bold;
    }
    .post-header-info {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }
  .post-body {
    margin: 50px;
    padding: 20px;
  }

  .post-comment {
    border-top: 1px solid black;
    margin: 50px;
    padding: 20px;

    .post-comment-title {
      font-weight: bold;
      font-size: 18px;
      margin: 20px 0;
    }

    .post-comment-section {
      width: 100%;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 50px;

      .post-comment-input {
        width: 80%;
        height: 80px;
        padding: 20px;
      }

      .post-comment-button {
        height: 80px;
        margin-left: 20px;
        width: 80px;
      }
    }
  }

  footer {
    position: relative;
    bottom: 0;
    width: 100%;
    background-color: lightgray;
    height: 60px;
  }
`;

const InquirtPost = () => {
  return (
    <PostStyle>
      <div className="header">헤더</div>
      <section className="main">
        <div className="post-header">
          <div className="post-header-title">제목</div>
          <div className="post-header-info">작성자 날짜</div>
        </div>
        <div className="post-body">요청사항</div>
        <div className="post-comment">
          <div className="post-comment-title">댓글</div>
          <div className="post-comment-container">
            <PostCommentItem />
            <PostCommentItem />
            <PostCommentItem />
          </div>

          <div className="post-comment-section">
            <textarea className="post-comment-input" />
            <button className="post-comment-button">등록</button>
          </div>
        </div>
      </section>
      <footer>footer</footer>
    </PostStyle>
  );
};

export default InquirtPost;
