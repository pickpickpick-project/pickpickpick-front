import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import { inquiryBoardCurrentPage, inquiryBoardPostPerPage } from "../../recoil";
import { useRecoilState } from "recoil";
import PaginationBottomUl from "../../components/Pagination/pageUl";
import BoardPost from "./BoardList";
import CommonYellowButton from "../../components/Common/Button";
import { getBoardList, BoardListElement } from "../../api/board";
import { useParams, useNavigate } from "react-router";
import React , { useState, useEffect } from "react";
import ToastCenter from "../../components/Common/toastcenter";


const BoardContainerStyled = styled.div`
    position : relative;
    width : 650px;
    margin : 0 auto;
`


const BoardPage = () => {
    const [boardCurrentPage, setBoardCurrentPage] = useRecoilState<number>(inquiryBoardCurrentPage);    // 현재 페이지
    const [boardPostPerPage, setBoardPostPerPage] = useRecoilState<number>(inquiryBoardPostPerPage);    // 한 페이지당 게시물 개수
    const [boardData, setBoardData] = useState<BoardListElement[]>([]);
    const navigate = useNavigate();
    const param = useParams();
    const ArtistId = Number(param.id);
    
    const [valid, setValid] = useState<boolean>(false);

    const onClickInquireBtn = () => {
        if(localStorage.getItem("userId") === null){
            setValid(true);
        }else{
            navigate(`/writing/${ArtistId}`)
        }
    }

    const toastProps = {
        title : "문의하기",
        content : "로그인 후 문의글 작성 이용 가능합니다.",
        start_time : 200,
        width : 250,
        height : 50,
        top : 50,
        left : 50,
    }

    

    let indexOfLast = boardCurrentPage * boardPostPerPage;    // last index
    let indexOfFirst = indexOfLast - boardPostPerPage;        // first index
    
    const currentPosts = (testBoardList:BoardListElement[]) => {           // 
        const currentPostsArray = testBoardList.slice(indexOfFirst, indexOfLast);
        return currentPostsArray;
      };

    useEffect(() => {
        getBoardList(ArtistId)
        .then((res: BoardListElement[]) => setBoardData([...res])) 
    }, []) 

    useEffect(() => {
    }, [valid])
    return (
            <PageStyled>
                <h1 style={{marginBottom : "40px", fontWeight:"700", fontSize:"20px"}}>문의 게시판</h1>
                <BoardContainerStyled>
                    <BoardPost post={currentPosts(boardData)}/>  
                    {/* BoardPost 한 페이지에 있는 UI */}
                    <PaginationBottomUl totalPosts={boardData?.length} postPerPage={boardPostPerPage} pagination={setBoardCurrentPage}/>
                    {/*  */}
                    <CommonYellowButton onClick={() => onClickInquireBtn()} width={200} height={50} hover={false} text={'문의글 작성하기'}/>
                    <ToastCenter toastprop={toastProps} validprop={valid} setValid={setValid}/>
                </BoardContainerStyled>
                
            </PageStyled>
    )
}

export default BoardPage;