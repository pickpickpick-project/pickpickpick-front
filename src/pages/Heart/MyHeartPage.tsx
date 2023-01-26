import styled from "styled-components";
import colors from "../../assets/colors";
import HeartItem from "../../components/Heart/HeartItem";

const PageStyle = styled.div`
  padding: 135px 16px 140px 16px;
  margin: 0 auto;
  width: 1200px;
  color: ${colors.text};

  .title {
    font-size: 22px;
    font-weight: bold;
    padding-bottom: 16px;
    border-bottom: 3px solid ${colors.button};
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
      <div className="title">나의 찜목록</div>

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
