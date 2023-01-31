import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import {CommonIntroduceBoxStyled } from "../../components/Common/IntroduceBox";
import { inquiryBoardCurrentPage, inquiryBoardPostPerPage } from "../../recoil";
import { useRecoilState } from "recoil";
import PaginationBottomUl from "../../components/Pagination/pageUl";
import BoardPost from "./BoardPost";

const BoardContainerStyled = styled.div`
    width : 650px;
    margin : 0 auto;
    background-color: beige;
`



const BoardPage = () => {

    const TestBoardElements = [
        {title : "test1", idx : 1},
        {title : "test2", idx : 2},
        {title : "test3", idx : 3},
        {title : "test4", idx : 4},
        {title : "test5", idx : 5},
        {title : "test6", idx : 6},
        {title : "test7", idx : 7},
        {title : "test8", idx : 8},
    ];

    const [boardCurrentPage, setBoardCurrentPage] = useRecoilState<number>(inquiryBoardCurrentPage);    // 현재 페이지
    const [boardPostPerPage, setBoardPostPerPage] = useRecoilState<number>(inquiryBoardPostPerPage);    // 한 페이지당 게시물 개수
    let indexOfLast = boardCurrentPage * boardPostPerPage;    // last index
    let indexOfFirst = indexOfLast - boardPostPerPage;        // first index

    const currentPosts = (TestBoardElements:any) => {           // 
        const currentPostsArray = TestBoardElements.slice(indexOfFirst, indexOfLast);
        console.log(currentPostsArray, indexOfFirst, indexOfLast);
        return currentPostsArray;
      };
      
    
    return (
        <PageStyled>
            <h1 style={{marginBottom : "40px", fontWeight:"700", fontSize:"20px"}}>문의 게시판</h1>
            <BoardContainerStyled>
                <BoardPost post={currentPosts(TestBoardElements)}/>  
                {/* BoardPost 한 페이지에 있는 UI */}
                <PaginationBottomUl totalPosts={TestBoardElements.length} postPerPage={boardPostPerPage} pagination={setBoardCurrentPage}/>
                {/*  */}
            </BoardContainerStyled>
        </PageStyled>
    )
}

export default BoardPage;