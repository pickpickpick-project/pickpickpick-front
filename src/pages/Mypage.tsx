import styled from "styled-components";
import colors from "../assets/colors";
import MypageProfile from "../components/Mypage/Mypage_profile";
import CommonCarousel from "../components/Common/Carousel";
import { CommonText } from "../components/Artist/ArtistStyled";
import { useQuery } from "react-query";
import { getUserPortfolio } from "../api/portfolio";
import { getWorkList } from "../api/work";

const MypageStyled = styled.div`
    padding: 125px 16px 140px 16px;
    height : 100%;
    margin: 0 auto;
    width: 900px;
    display: flex;
    flex-direction: column;
    color: ${colors.text};
`

interface test{
    portfolio_id : number,
    user_id : number,
    portfolio_name : string,
    portfolio_type : number | string,
}

interface props{
    portfolioProps : test[];
}
 
const Mypage = ():React.ReactElement => {
    const userId = Number(localStorage.getItem('userId'));
    let user_email = localStorage.getItem('email');
    const getWorkListData = useQuery("getWorkList", () => getWorkList(userId));
    const getPortfolioData = useQuery("getPortfolioList", () => getUserPortfolio(userId));
    console.log(getWorkListData.data);
    
    
    

    return (
        getPortfolioData.status === 'loading' || getWorkListData.status === 'loading'?
        <div>loadingloadingloadingloadingloading</div> :
        <MypageStyled>
            <MypageProfile email={user_email}/>
            <CommonText>포트폴리오</CommonText>
            <CommonCarousel data={getPortfolioData.data.data} category={'portfolio'}/> 
            <CommonText>판매</CommonText>
            <CommonCarousel data={getWorkListData.data} category={'work'}/>
            {/* <CommonText>구매</CommonText>
            <CommonCarousel data={portfolioData}/> */}
        </MypageStyled>
    )
}

export default Mypage;