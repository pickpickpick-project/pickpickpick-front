import styled from "styled-components";
import { CommonIntroduceBoxStyled } from "../../assets/CommonStyled";
import MovePage from "../../util/navigate";


const BoardPostWrapperStyled = styled(CommonIntroduceBoxStyled)`
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

const BoardPostContainerStyled = styled.ul`

`

const BoardPostStyled = styled.div`
    display: flex;
    &::before{
        display : block;
        margin-right : 16px;
        font-weight : 700;
        content : "Q";
    }
`

const BoardPost = (posts:any) => {
    return(
        <div>
            <BoardPostContainerStyled>
                {posts.post.map((e:any) => 
                    <BoardPostWrapperStyled onClick={MovePage(`board/postview/${e.postNum}`)}>
                        <BoardPostStyled>{e.postTitle}</BoardPostStyled>
                    </BoardPostWrapperStyled>
                )}
            </BoardPostContainerStyled>
        </div>
    )
}

export default BoardPost;