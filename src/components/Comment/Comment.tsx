import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserInfo } from "../../api/user";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import { handleDeleteComment } from "../../api/comment";


const CommentStyled = styled.div`
    width : 800px;
    margin : 0 auto;
    background-color : white;
    padding : 20px;
    border : 1px solid rgb(230, 238, 245);
    margin-bottom : 30px;
    display : flex;
    border-radius: 10px;
    flex-direction: column;

    .delete{
        position: absolute;
        right : 0;
        top : 0;
        cursor: pointer;
    }

`

const CommentUserInfoContainerStyled = styled.div`
    position: relative;
    display : flex;
    flex-direction : row;
    align-items: center;
    margin-bottom : 10px;
`

const CommentUserInfoImgStyled = styled.img`
    width : 50px;
    height : 50px;
    border-radius: 50%;
`
const CommentUserInfoTextStyled = styled.div`
    display : flex;
    flex-direction: column;
    margin-left : 20px;
    
`

const CommentUserInfoUserNameStyled = styled.p`

`

const CommentInfoDateStyled = styled.p`
    color : #777777;
`

const CommentWritingStyled = styled.p`
    
`

interface CommentData {
    props : Comment
}

interface Comment {
    commentContent : string,
    commentNum : number,
    postNum : number,
    userNick : string,
    userNum : number,
}

const Comment = (props:CommentData) => {
    const userId = Number(localStorage.getItem('userId'))
    const { data : getUser } = useQuery("getCommentUser", () => getUserInfo(props.props.userNum))
    console.log(props);
    
    
    const queryClient = useQueryClient();
    const { mutate : del } = useMutation(handleDeleteComment, {
        onSuccess : data => {
            queryClient.invalidateQueries("getComment");
            console.log(data);
        },
        onError : data => {
            console.log(data);    
        }
    })

    const onClickDelete = () => {
        del(props.props.commentNum);
    }
    
    return(
        <CommentStyled key={props.props.commentContent}>
            <CommentUserInfoContainerStyled>
                <div className="container">
                    <CommentUserInfoImgStyled src={getUser?.data.imageUrl}/>
                    <CommentUserInfoTextStyled>
                        <CommentUserInfoUserNameStyled>{getUser?.data.name}</CommentUserInfoUserNameStyled>
                    </CommentUserInfoTextStyled>
                </div>
                {getUser?.data.id === userId ? <Delete onClick={() => onClickDelete()} className="delete"/> : null}
            </CommentUserInfoContainerStyled>
            <CommentWritingStyled>
                {props.props.commentContent}
            </CommentWritingStyled>
        </CommentStyled>
    )
}

export default Comment;