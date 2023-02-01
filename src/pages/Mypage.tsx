import styled from "styled-components";
import colors from "../assets/colors";
import {ReactComponent as Logo} from "../assets/images/Home/profile.svg"
import MypageProfile from "../components/Mypage/Mypage_profile";
import CommonCarousel from "../components/Common/Carousel";
import { CommonText } from "../components/Artist/ArtistStyled";
const MypageStyled = styled.div`
    padding: 125px 16px 140px 16px;
    height : 100%;
    margin: 0 auto;
    width: 900px;
    display: flex;
    flex-direction: column;
    color: ${colors.text};
`

const Mypage = () => {
    return (
        <MypageStyled>
            <MypageProfile/>
            <CommonText>판매</CommonText>
            <CommonCarousel data={[1, 2, 3, 4 ,5, 6, 7]}/>
            <CommonText>구매</CommonText>
            <CommonCarousel data={[1, 2]}/>
        </MypageStyled>
    )
}

export default Mypage;