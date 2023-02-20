import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import {CommonIntroduceBoxStyled } from "../../assets/CommonStyled";
import { inquiryBoardCurrentPage, inquiryBoardPostPerPage } from "../../recoil";
import { useRecoilState } from "recoil";
import PaginationBottomUl from "../../components/Pagination/pageUl";
import BoardPost from "./BoardPost";
import CommonYellowButton from "../../components/Common/Button";
import MovePage from "../../util/navigate";
import { getBoardList } from "../../api/board";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import React , { useState, useEffect } from "react";


const BoardContainerStyled = styled.div`
    width : 650px;
    margin : 0 auto;
`

const BoardPage = () => {
    const [boardCurrentPage, setBoardCurrentPage] = useRecoilState<number>(inquiryBoardCurrentPage);    // 현재 페이지
    const [boardPostPerPage, setBoardPostPerPage] = useRecoilState<number>(inquiryBoardPostPerPage);    // 한 페이지당 게시물 개수
    const [boardData, setBoardData] = useState<any>([]);
    
    const param = useParams();
    const ArtistId = Number(param.id);

    let indexOfLast = boardCurrentPage * boardPostPerPage;    // last index
    let indexOfFirst = indexOfLast - boardPostPerPage;        // first index
    
    const currentPosts = (testBoardList:any) => {           // 
        const currentPostsArray = testBoardList.slice(indexOfFirst, indexOfLast);
        return currentPostsArray;
      };

    useEffect(() => {
        getBoardList(ArtistId)
        .then((res:any) => setBoardData([...res])) 
    }, [])
    // console.log(getBoardListData);
    // console.log(getBoardListData.data?.data);    

    return (
            <PageStyled>
                <h1 style={{marginBottom : "40px", fontWeight:"700", fontSize:"20px"}}>문의 게시판</h1>
                <BoardContainerStyled>
                    <BoardPost post={currentPosts(boardData)}/>  
                    {/* BoardPost 한 페이지에 있는 UI */}
                    <PaginationBottomUl totalPosts={boardData?.length} postPerPage={boardPostPerPage} pagination={setBoardCurrentPage}/>
                    {/*  */}
                    <CommonYellowButton onClick={MovePage('writing')} width={200} height={50} hover={false} text={'문의글 작성하기'}/>
                </BoardContainerStyled>
            </PageStyled>
    )
}

export default BoardPage;