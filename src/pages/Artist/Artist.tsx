import styled from "styled-components";
import { useMutation, useQuery, useQueryClient } from "react-query";
import colors from "../../assets/colors";
import ArtistIntroduce from "../../components/Artist/Introduce";
import CommonYellowButton from "../../components/Common/Button";
import { CommonText } from "../../components/Artist/ArtistStyled";
import CommonCarousel from "../../components/Common/Carousel";
import { useNavigate, useParams } from "react-router";
import { getUserInfo } from "../../api/user";
import { getUserPortfolio } from "../../api/portfolio";
import { getWorkList } from "../../api/work";
import Follow from "../../components/follow/Follow";

const ArtistBannerContainerStyled = styled.div`
  width: 1140px;
  height: 120px;
  background-color: ${colors.bgcolor};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 30px;
`;

const ArtistBannerElementContainerStyled = styled.div`
  flex: 1;
  padding-left: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ArtistStyled = styled.div`
  padding: 140px 0px 140px 0px;
  width: 1200px;
  margin: 0 auto;
`;

const ArtistBannerTitleStyled = styled.span`
  font-size: 20px;
  font-weight: 500;
`;

const ArtistBannerButtonWrapperStyled = styled.div`
  display: flex;
  justify-content: flex-end;
`;
const ArtistImageStyled = styled.img`
  border-radius: 15px;
`;

const ArtistPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const artistId = Number(params.id);
  const { data: User } = useQuery("getUserArtist", () => getUserInfo(artistId));
  const getPortfolioData = useQuery("getPortfolioList", () =>
    getUserPortfolio(artistId)
  );
  const getWorkListData = useQuery("getWorkList", () => getWorkList(artistId));
  const ImgURL =
    User?.data.imageUrl[0] === "h"
      ? User?.data.imageUrl
      : `https://api.pppick.store/${User?.data.imageUrl}`;

  return (
    <ArtistStyled>
      {getWorkListData?.data === undefined ||
      getPortfolioData.data?.data === undefined ||
      User?.data === undefined ? (
        <div>loading</div>
      ) : (
        <>
          <ArtistBannerContainerStyled>
            <ArtistImageStyled src={ImgURL} width="100" height="100" />
            <ArtistBannerElementContainerStyled>
              <ArtistBannerTitleStyled style={{ marginBottom: "30px" }}>
                {User?.data.name}
              </ArtistBannerTitleStyled>
              <ArtistBannerButtonWrapperStyled>
                <Follow artistId={artistId} />
                <CommonYellowButton
                  onClick={() => navigate(`/board/${User?.data.id}`)}
                  text={"문의하기"}
                  width={269}
                  height={52}
                  hover={false}
                />
              </ArtistBannerButtonWrapperStyled>
            </ArtistBannerElementContainerStyled>
          </ArtistBannerContainerStyled>
          <ArtistIntroduce userData={User?.data} />
          <CommonText>포트폴리오</CommonText>
          <CommonCarousel
            data={getPortfolioData.data.data}
            category={"portfolio"}
          ></CommonCarousel>
          <CommonText>판매</CommonText>
          <CommonCarousel data={getWorkListData.data} category={"work"} />
        </>
      )}
    </ArtistStyled>
  );
};

export default ArtistPage;
