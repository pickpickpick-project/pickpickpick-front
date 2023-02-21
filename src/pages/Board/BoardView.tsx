import styled from "styled-components"
import { PageStyled } from "../../assets/pageStyle"
import { BigText, SmallText } from "../../assets/CommonStyled"
import { ReactComponent as CommentSVG } from "../../assets/images/post/comment.svg";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Comment from "../../components/Comment/Comment";
import { useParams } from "react-router";
import { useState, useEffect, Suspense } from "react";
import { getPostData } from "../../api/board";
import { useQuery } from "react-query";
import { getUserInfo } from "../../api/user";
import CommonImgCarousel from "../../components/Common/ImageCarousel";



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
`
const PostViewCommentWrapperStyled = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 50px;
    width : 800px;
    margin : 0 auto;
`



const PostView = () => {

    const param = useParams();
    const [ postImg, setPostImg ] = useState<any>([]);
    const boardNum = Number(param.id);
    
    const userId = Number(localStorage.getItem('userId'));
    const { data : getPostInfo } = useQuery("PostInfo", () => getPostData(boardNum!))
    const { data : getUser } = useQuery("getUser", () => getUserInfo(userId))
    
    // useQuery로 불러오기 전에 렌더링이 되는 것 같다. 데이터 불러오고 렌더링 완료되어야 하는데. 
    // 문제 직면.
    
    if(getPostInfo===undefined || getUser === undefined){
        return(
            <div>loadingloadingloadingloading</div>
        )
    }

    return(
        <> 
            <PostViewStyled>
                <PostViewContainerStyled>
                    <BigText>{getPostInfo!.data.postTitle}</BigText>
                    <PostViewInfoContainerStyled style={{marginBottom:"20px"}}>
                        <img className="post-img" src={getUser!.data.imageUrl}/>
                        <div className="post-info">
                            <p className="post-user-name">{getPostInfo!.data.userName}</p>
                        </div>
                    </PostViewInfoContainerStyled>
                    <CommonImgCarousel data={[...getPostInfo.data.postImgs]}></CommonImgCarousel>
                    <PostViewWritingContainerStyled>
                        <p>
                            {getPostInfo!.data.postContent}
                        </p>
                    </PostViewWritingContainerStyled>
                    <div className="comment-container">
                        <CommentSVG/>
                        <SmallText>0</SmallText>
                    </div>
                </PostViewContainerStyled>
            </PostViewStyled>
            <PostViewCommentContainerStyled>
                <Comment/>
                <Comment/>
                <PostViewCommentWrapperStyled>
                    <BigText>댓글</BigText>
                    <Editor 
                        placeholder="마크다운 문법을 활용하여 댓글을 입력해 보세요"
                        previewStyle="tab"
                        height="250px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        toolbarItems={[]}
                    />
                </PostViewCommentWrapperStyled>
            </PostViewCommentContainerStyled>
        </>
    )
}

export default PostView