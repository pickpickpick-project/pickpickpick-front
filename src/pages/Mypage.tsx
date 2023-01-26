import styled from "styled-components";
import colors from "../assets/colors";
import {ReactComponent as Logo} from "../assets/images/Home/profile.svg"
import MypageProfile from "../components/Mypage/Mypage_profile";
import MypageCarousel from "../components/Mypage/Mypage_carousel";
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
            <MypageCarousel title={"판매"}/>
            <MypageCarousel title={"구매"}/>
        </MypageStyled>
    )
}

export default Mypage;