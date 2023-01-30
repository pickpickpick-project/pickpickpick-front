import styled from "styled-components";
import { ReactComponent as ArtistImg } from "../../assets/images/Home/profile.svg"
import colors from "../../assets/colors";
import ArtistIntroduce from "../../components/Artist/Introduce";
import CommonYellowButton from "../../components/Common/Button";
import { CommonText } from "../../components/Artist/ArtistStyled";
import CommonCarousel from "../../components/Common/Carousel";
const ArtistBannerContainerStyled = styled.div`
    width : 1140px;
    height : 120px;
    background-color: ${colors.bgcolor};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding : 10px 30px;
`

const ArtistBannerElementContainerStyled = styled.div`
        flex : 1;
        padding-left : 20px;
        height : 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
`

const ArtistStyled = styled.div`
    padding: 140px 0px 140px 0px;
    width: 1200px;
    margin: 0 auto;
`

const ArtistBannerTitleStyled = styled.span`
    font-size : 20px;
    font-weight : 500;  
`

const ArtistBannerButtonWrapperStyled = styled.div`
    display: flex;
    justify-content: flex-end;
`

const ArtistPage = () => {
    return(
        <ArtistStyled>
            <ArtistBannerContainerStyled>
                <ArtistImg width="100" height="100"/>
                <ArtistBannerElementContainerStyled>
                    <ArtistBannerTitleStyled>Title</ArtistBannerTitleStyled>
                    <ArtistBannerButtonWrapperStyled>
                        <CommonYellowButton width={269} height={52} text={"문의하기"} hover={false}/>
                    </ArtistBannerButtonWrapperStyled>
                </ArtistBannerElementContainerStyled>
            </ArtistBannerContainerStyled>
            <ArtistIntroduce/>
            <CommonText>포트폴리오</CommonText>
            <CommonCarousel data={[1, 2, 3, 4, 5, 6]}></CommonCarousel>
            <CommonText>서비스</CommonText>
            <CommonCarousel data={[1, 2, 3, 4, 5, 6]}></CommonCarousel>
        </ArtistStyled>
    )
}


export default ArtistPage;