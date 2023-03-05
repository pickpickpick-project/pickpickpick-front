import { ChangeEvent, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserInfo } from "../../api/user";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../assets/images/delete.svg";
import { handleDeleteComment, handleEditComment } from "../../api/comment";


const CommentStyled = styled.div`
    position : relative;
    width : 800px;
    margin : 0 auto;
    background-color : white;
    padding : 20px;
    border : 1px solid rgb(230, 238, 245);
    margin-bottom : 30px;
    display : flex;
    border-radius: 10px;
    flex-direction: row;

    .edit-container{
        right : 0;
        top : 0;
        cursor: pointer;
        display: flex;
        margin-left : 20px;
        flex-direction : column;
        
    }

`

const CommentUserInfoContainerStyled = styled.div`
    display : flex;
    flex-direction : column;
    align-items: center;
    margin-bottom : 10px;
    justify-content: center;
    margin-right : 20px;
`

const CommentUserInfoImgStyled = styled.img`
    width : 50px;
    height : 50px;
    border-radius: 50%;
`
const CommentUserInfoTextStyled = styled.div`
    margin-top : 20px;
    display : flex;
    flex-direction: column;
    justify-content: center;
    
`

const CommentUserInfoUserNameStyled = styled.p`
    
`

const CommentInfoDateStyled = styled.p`
    color : #777777;
`

const CommentWritingStyled = styled.div`
    width : 100%;
    margin-right : auto;
    .textarea{
        border : none;
        width : 100%;
        height : 100%;

    }
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
    // console.log(props);
    const userId = Number(localStorage.getItem('userId'))
    const { data : getUser } = useQuery("getCommentUser", () => getUserInfo(props.props.userNum))
    const [ editBtn, setEditBtn ] = useState<boolean>(true);
    const [ textareaValue, setTextareaValue ] = useState<string>(props.props.commentContent)
    
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

    const { mutate : edit } = useMutation(handleEditComment, {
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

    const onChangeTextarea = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setTextareaValue(e.target.value);
    }

    const onClickEdit = () => {
        if(editBtn === false){
            edit({
                commentNum : props.props.commentNum,
                commentContent:textareaValue
            })
        }
        setEditBtn(!editBtn);

    }
    
    return(
        <CommentStyled key={props.props.commentContent}>
            <CommentUserInfoContainerStyled>
                <CommentUserInfoImgStyled src={getUser?.data.imageUrl}/>
                <CommentUserInfoTextStyled>
                    <CommentUserInfoUserNameStyled>{getUser?.data.name}</CommentUserInfoUserNameStyled>
                </CommentUserInfoTextStyled>
            </CommentUserInfoContainerStyled>
            <CommentWritingStyled>
                {
                    editBtn === true ?
                    <div>
                        {props.props.commentContent}
                    </div>
                    :
                    <textarea className="textarea" value={textareaValue} onChange={onChangeTextarea}/>
                }
            </CommentWritingStyled>
            {/* 본인 댓글만 삭제할 수 있도록 */}
            {getUser?.data.id === userId ? 
                <div className="edit-container">
                    <Delete style={{marginBottom : '10px'}} onClick={() => onClickDelete()}/>
                    <button onClick={() => onClickEdit()}>
                        {
                            editBtn === true ? 
                            'edit'
                            :
                            'submit'
                        } 
                    </button>
                    
                </div>
                :
                 null} 
        </CommentStyled>
    )
}

export default Comment;