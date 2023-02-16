import styled from "styled-components";
import colors from "../assets/colors";
import {ReactComponent as Logo} from "../assets/images/Home/profile.svg"
import MypageProfile from "../components/Mypage/Mypage_profile";
import CommonCarousel from "../components/Common/Carousel";
import { CommonText } from "../components/Artist/ArtistStyled";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { getUserPortfolio } from "../api/portfolio";
import { useQuery } from "react-query";



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
    const data = useQuery("getList", () => getUserPortfolio(Number(localStorage.getItem('userId'))));
    let user_email = localStorage.getItem('email');

    return (
        data.status === 'loading' ?
        <div>loading</div> :
        <MypageStyled>
            <MypageProfile email={user_email}/>
            <CommonText>포트폴리오</CommonText>
            <CommonCarousel data={data.data.data} category={'portfolio'}/> 
            {/* <CommonText>판매</CommonText>
            <CommonCarousel data={portfolioList}/>
            <CommonText>구매</CommonText>
            <CommonCarousel data={portfolioList}/> */}
        </MypageStyled>
    )
}

export default Mypage;