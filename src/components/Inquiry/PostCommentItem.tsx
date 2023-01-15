import styled from "styled-components";

const ItemStyle = styled.div`
  .post-comment-item {
    padding: 20px;
    border-bottom: 1px solid gray;

    .post-comment-item-info {
      font-size: 14px;
      color: gray;
    }

    .post-comment-item-content {
      margin-top: 20px;
    }
  }
`;

const PostCommentItem = () => {
  return (
    <ItemStyle>
      <div className="post-comment-item">
        <div className="post-comment-item-info">작성자 날짜</div>
        <div className="post-comment-item-content">댓글내용</div>
      </div>
    </ItemStyle>
  );
};

export default PostCommentItem;
