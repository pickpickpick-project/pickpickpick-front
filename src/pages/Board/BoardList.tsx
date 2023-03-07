import { useNavigate } from "react-router";
import styled from "styled-components";
import { CommonIntroduceBoxStyled } from "../../assets/CommonStyled";
import MovePage from "../../util/navigate";
import { useParams } from "react-router";


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
    const params = useParams();
    const boardNum = Number(params.id);
    const navigate = useNavigate()
    return(
        <div>
            <BoardPostContainerStyled>
                {posts.post.map((e:any) => 
                    <BoardPostWrapperStyled onClick={() => navigate(`/board/postview/${e.postNum}`, {
                        state : {
                            boardNum
                        }
                    })}>
                        <BoardPostStyled>{e.postTitle}</BoardPostStyled>
                    </BoardPostWrapperStyled>
                )}
            </BoardPostContainerStyled>
        </div>
    )
}

export default BoardPost;