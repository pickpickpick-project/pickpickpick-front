import styled from "styled-components";
import colors from "../../assets/colors";
import HeartItem from "../../components/Heart/HeartItem";

const PageStyle = styled.div`
  padding: 135px 16px 140px 16px;
  margin: 0 auto;
  width: 1200px;
  display: flex;
  color: ${colors.text};

  .left-section {
    width: 200px;
    margin-right: 40px;
    .title {
      font-size: 22px;
      font-weight: bold;
      padding-bottom: 16px;
      border-bottom: 3px solid ${colors.button};
    }
    .tag-list {
      margin-top: 20px;
      font-size: 14px;
    }
    .tag {
      padding: 8px 0;
    }
    .tag:hover {
      font-weight: 700;
      cursor: pointer;
    }
  }

  .heart-section {
    display: flex;
    flex-flow: row-wrap;
    margin: 40px 0;
  }
`;
const MyHeartPage = () => {
  return (
    <PageStyle>
      <div className="left-section">
        <div className="title">나의 찜목록</div>
        <div className="tag-list">
          <div className="tag">전체 (1)</div>
          <div className="tag">일러스트 (0)</div>
          <div className="tag">캐리커쳐 (0)</div>
          <div className="tag">웹툰·콘티 (0)</div>
          <div className="tag">캐릭터 (0)</div>
          <div className="tag">이모티콘 (0)</div>
        </div>
      </div>
      <div className="heart-section">
        {itemData.map((item, index) => (
          <div key={index}>
            <HeartItem item={item} />
          </div>
        ))}
      </div>
    </PageStyle>
  );
};

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f",
    title: "Snacks",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
];
export default MyHeartPage;
