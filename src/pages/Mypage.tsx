import styled from "styled-components";
import colors from "../assets/colors";
import {ReactComponent as Logo} from "../assets/images/Home/profile.svg"
import MypageProfile from "../components/Mypage/Mypage_profile";
import CommonCarousel from "../components/Carousel";
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
            <h1>판매</h1>
            <CommonCarousel/>
            <h1>구매</h1>
            <CommonCarousel/>
        </MypageStyled>
    )
}

export default Mypage;