import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { getFavorites } from "../../api/favorites";
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
    flex-flow: wrap;
    margin: 40px 0;
  }
`;
const MyHeartPage = () => {
  const userId = Number(localStorage.getItem("userId"));
  const navigate = useNavigate();
  const { data } = useQuery("getFavorites", () => getFavorites(userId));
  const itemData = data?.data ?? [{}];
  console.log(itemData);

  return (
    <PageStyle>
      <div className="title">나의 찜목록</div>

      <div className="heart-section">
        {itemData?.map((item: any, index: number) => (
          <div
            key={index}
            onClick={() => navigate(`/portfolio/${item.portfolioNum}`)}
          >
            <HeartItem item={item} />
          </div>
        ))}
      </div>
    </PageStyle>
  );
};

export default MyHeartPage;
