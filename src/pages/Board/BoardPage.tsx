import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import {CommonIntroduceBoxStyled } from "../../components/Common/IntroduceBox";



const BoardContainerStyled = styled.div`
    width : 650px;
    margin : 0 auto;
    background-color: beige;
`

const BoardElementWrapperStyled = styled(CommonIntroduceBoxStyled)`
    width : 600px;
    height : 40px;
    margin : 0 auto;
    margin-bottom : 30px;
    line-height : 40px;
    transition : all 0.3s ease-in-out;
    cursor: pointer;
    &:hover{
        transform : translateY(-3px)
    };
`

const BoardElementContainerStyled = styled.ul`

`

const BoardElementStyled = styled.div`
    display: flex;
    &::before{
        display : block;
        margin-right : 16px;
        font-weight : 700;
        content : "Q";
    }
`


const BoardPage = () => {
    return (
        <PageStyled>
            <h1 style={{marginBottom : "40px", fontWeight:"700", fontSize:"20px"}}>문의 게시판</h1>
            <BoardContainerStyled>
                <BoardElementContainerStyled>
                    <BoardElementWrapperStyled>
                        <BoardElementStyled>안녕하세요</BoardElementStyled>
                    </BoardElementWrapperStyled>
                    <BoardElementWrapperStyled>
                        <BoardElementStyled>안녕하세요</BoardElementStyled>
                    </BoardElementWrapperStyled>
                    <BoardElementWrapperStyled>
                        <BoardElementStyled>안녕하세요</BoardElementStyled>
                    </BoardElementWrapperStyled>
                    <BoardElementWrapperStyled>
                        <BoardElementStyled>안녕하세요</BoardElementStyled>
                    </BoardElementWrapperStyled>
                    <BoardElementWrapperStyled>
                        <BoardElementStyled>안녕하세요</BoardElementStyled>
                    </BoardElementWrapperStyled>
                </BoardElementContainerStyled>
            </BoardContainerStyled>
        </PageStyled>
    )
}

export default BoardPage;