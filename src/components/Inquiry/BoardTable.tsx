import styled from "styled-components";

const TableStyle = styled.div`
  .board {
    height: 500px;
    border: 1px solid black;
    width: 100%;

    .board-top > tr {
      display: grid;
      grid-template-columns: 1fr 5fr 3fr 4fr;
      align-items: center;
      height: 50px;
      background-color: lightgray;
      font-size: 18px;
      font-weight: bold;
    }

    tbody > tr {
      display: grid;
      grid-template-columns: 1fr 5fr 3fr 4fr;
      align-items: center;
      height: 50px
      font-size: 16px;
      border-bottom: 1px solid black;
      cursor: pointer;
    }

    th,
    td {
      padding: 0.6em;
      vertical-align: middle;
      text-align: center;
    }
  }
`;

const BoardTable = () => {
  return (
    <TableStyle>
      <table className="board">
        <thead className="board-top">
          <tr>
            <th className="board-top-order">1 </th>
            <th className="board-top-title">제목</th>
            <th className="board-top-writer">작성자</th>
            <th className="board-top-date">작성날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>제목입니다</td>
            <td>픽픽픽</td>
            <td>2023-01-15</td>
          </tr>
          <tr>
            <td>2</td>
            <td>제목입니다</td>
            <td>픽픽픽</td>
            <td>2023-01-15</td>
          </tr>
        </tbody>
      </table>
    </TableStyle>
  );
};

export default BoardTable;
