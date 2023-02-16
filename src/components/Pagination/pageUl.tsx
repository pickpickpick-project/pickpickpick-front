import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { inquiryBoardCurrentPage, inquiryBoardPostPerPage } from "../../recoil";
import { ReactComponent as ArrowLeft } from "../../assets/images/Mypage/arrow-left.svg";
import { ReactComponent as ArrowRight } from "../../assets/images/Mypage/arrow-right.svg";


const PageUl = styled.ul`
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top : 20px;
        align-items: center;
    `;


const PageLi = styled.li`
    width : 40px;
    height : 40px;
    line-height : 40px;
    text-align : center;
    background-color: antiquewhite;
    border-radius: 50%;
    cursor: pointer;
    margin-right : 15px;    // last-child 제외하는 방법을 모르겠음.
`;
    

const PageSpan = styled.span`
    
`;


const PaginationBottomUl = ({pagination, totalPosts, postPerPage}:any) => {
    const pageNumbers = [];
    for(let i=1; i <= Math.ceil(totalPosts / postPerPage); i++){
        pageNumbers.push(i);
    }
    return(
            <PageUl>
                <ArrowLeft style={{marginRight:"15px", cursor:"pointer"}}/>
                {pageNumbers.map((number) => (  // type 공부 후에 타입 지정하기.
                    <PageLi key={number} onClick={() => pagination(number)}>
                        <PageSpan>{number}</PageSpan>
                    </PageLi>
                ))}
                <ArrowRight style={{cursor:"pointer"}}/>
            </PageUl>
    )
}

export default PaginationBottomUl;