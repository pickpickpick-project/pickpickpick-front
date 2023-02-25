import styled from "styled-components"
import { PageStyled } from "../../assets/pageStyle"
import { BigText, SmallText } from "../../assets/CommonStyled"
import { ReactComponent as CommentSVG } from "../../assets/images/post/comment.svg";
import Comment from "../../components/Comment/Comment";
import { useParams, useNavigate, useLocation } from "react-router";
import { useState, useEffect, Suspense } from "react";
import { getPostData } from "../../api/board";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getUserInfo } from "../../api/user";
import CommonImgCarousel from "../../components/Common/ImageCarousel";
import { ProductPostBoxStyled, ProductPostTextareaStyled } from "../Product/ProductPostPage";
import CommonYellowButton from "../../components/Common/Button";
import { getCommentList, handleSubmitComment } from "../../api/comment";
import BoardMenu from "../../components/Board/button";

const PostViewStyled = styled(PageStyled)`
    padding : 135px 16px 100px 16px;
    
`

const PostViewContainerStyled = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 50px;
    width : 800px;
    margin : 0 auto;

    .post-img{
        width : 50px;
        height : 50px;
        border-radius: 50px;
    }

    .comment-container{
        display : flex;
        align-items: center;
        margin-top : 15px;
    }
`

const PostViewInfoContainerStyled = styled.div`
    display : flex;
    flex-direction : row;   
    margin-top : 30px;
    align-items: center;
    .post-date{
        color : #777777;
        margin-top : 5px;
    }

    .post-info{
        margin-left : 15px;
        margin-right : auto;
    }
`

const PostViewWritingContainerStyled = styled.div`
    width : 100%;
    line-height: 1.6;
    overflow-wrap : break-word;

    margin-top : 50px;
`

const PostViewCommentContainerStyled = styled.div`
    width : 100%;
    background-color : rgb(249, 250, 251);
    height : 500px;
    border-top : 0.0625rem solid rgb(231, 231, 231);
    padding : 135px 16px 100px 16px;

    .button-wrapper{
        display: flex;
        justify-content: end;
        margin-top : 30px;
    }
`
const PostViewCommentWrapperStyled = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 50px;
    width : 800px;
    margin : 0 auto;
`

const PostView = () => {
    
    const [ postImg, setPostImg ] = useState<any>([]);
    const [ textareaValue, setTextareaValue ] = useState<string>('');
    
    const navigate = useNavigate();
    const param = useParams();
    const boardNum = Number(param.id);
    const {state} = useLocation();
    const userId = Number(localStorage.getItem('userId'));
    const { data : getPostInfo } = useQuery("PostInfo", () => getPostData(boardNum!));
    const { data : getUser } = useQuery("getUser", () => getUserInfo(userId));
    const { data : getComment } = useQuery("getComment", () => getCommentList(boardNum));   
    const queryClient = useQueryClient();
    const { mutate : posting } = useMutation(handleSubmitComment, {
        onSuccess : data => {
            queryClient.invalidateQueries("getComment");   // 캐시 무효화 갱신된 데이터 불러올 수 있다.
            console.log(data);
        },
        onError : data => {
            console.log(data);
        }
    })

    const onSubmitComment = () => {
        setTextareaValue('');
        posting({
            postNum : Number(param.id),
            commentContent : textareaValue,
            userNum : userId,
        })
    }

    const textareaOnChange = (e:any) => {
        setTextareaValue(e.target.value);
    }

    const onClickPostEdit = () => {

    }
    // useQuery로 불러오기 전에 렌더링이 되는 것 같다. 데이터 불러오고 렌더링 완료되어야 하는데. 
    // 문제 직면.
    
    if(getPostInfo===undefined || getUser === undefined || getComment === undefined){
        return(
            <div>loadingloadingloadingloading</div>
        )
    }

    const propsData ={
        boardNum : state.boardNum,
        postTitle : getPostInfo.data.postTitle,
        postContent : getPostInfo.data.postContent,
        postNum : getPostInfo.data.postNum,
    }

    return(

        // <button className="edit" onClick={() => navigate(`/writing/${getPostInfo.data.postNum}`, {
        //     state : {
        //         title : getPostInfo.data.postTitle,
        //         postContent : getPostInfo.data.postContent,
        //         postNum : getPostInfo.data.postNum,
        //     }
        // })}>edit</button> 
        <> 
            <PostViewStyled>
                <PostViewContainerStyled>
                    <BigText>{getPostInfo!.data.postTitle}</BigText>
                    <PostViewInfoContainerStyled style={{marginBottom:"20px"}}>
                        <img className="post-img" src={getUser!.data.imageUrl}/>
                        <div className="post-info">
                            <p className="post-user-name">{getPostInfo!.data.userName}</p>
                        </div>
                        
                        {
                            getPostInfo.data.userNum === userId ?
                            <BoardMenu props={propsData}/>
                            :
                            null
                        }
                    </PostViewInfoContainerStyled>
                    {
                        getPostInfo?.data.postImgs.length === 0 ? 
                        null
                        :
                        <CommonImgCarousel data={[...getPostInfo.data.postImgs]}></CommonImgCarousel>
                    }
                    <PostViewWritingContainerStyled>
                        <p>
                            {getPostInfo!.data.postContent}
                        </p>
                    </PostViewWritingContainerStyled>
                    <div className="comment-container">
                        <CommentSVG/>
                        <SmallText>{getComment.data.length}</SmallText>
                    </div>
                </PostViewContainerStyled>
            </PostViewStyled>
            <PostViewCommentContainerStyled>
                {getComment.data.map((comment) =>
                    <Comment props={comment}/>
                )}
                <PostViewCommentWrapperStyled>
                    <ProductPostBoxStyled>
                        <SmallText style={{marginBottom:"20px"}}>댓글</SmallText>
                        <ProductPostTextareaStyled placeholder="댓글을 입력하세요" rows={8} cols={50} value={textareaValue} onChange={textareaOnChange}></ProductPostTextareaStyled>
                        <div className="button-wrapper">
                            <CommonYellowButton width={150} height={50} hover={false} text={"등록"} onClick={() => {onSubmitComment()}}/>
                        </div>
                    </ProductPostBoxStyled>
                </PostViewCommentWrapperStyled>
            </PostViewCommentContainerStyled>
        </>
    )
}

export default PostView