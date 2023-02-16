import styled from "styled-components"
import { PageStyled } from "../../assets/pageStyle"
import { BigText, SmallText } from "../../assets/CommonStyled"
import { ReactComponent as CommentSVG } from "../../assets/images/post/comment.svg";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Comment from "../../components/Comment/Comment";

const PostViewStyled = styled(PageStyled)`
    padding : 135px 16px 100px 16px;
`

const PostViewContainerStyled = styled.div`
    display : flex;
    flex-direction : column;
    margin-top : 50px;
    width : 800px;
    margin : 0 auto;

    img{
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
    return(
        <>
        <PostViewStyled>
            <PostViewContainerStyled>
                <BigText>TestTestTestTestTestTest</BigText>
                <PostViewInfoContainerStyled>
                    <img src='data:image/jpeg;base64,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'/>
                    <div className="post-info">
                        <p className="post-user-name">박정도</p>
                        <p className="post-date">test</p>
                    </div>
                </PostViewInfoContainerStyled>
                <PostViewWritingContainerStyled>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                         Neque ullam veritatis quas explicabo, 
                         quidem cupiditate dolor aut hic consequatur ut eius consectetur consequuntur tenetur debitis magni ipsum dolorum iure minima.
                         Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste consequuntur architecto ea ex quidem eveniet nemo aspernatur praesentium, earum nihil, aperiam deserunt vel saepe perspiciatis, temporibus labore eius voluptatem quas expedita? Obcaecati natus saepe mollitia, nesciunt corrupti modi? Recusandae culpa incidunt inventore ut perspiciatis excepturi 
                         deserunt sapiente ad, modi eaque ipsum deleniti tempore repudiandae quae odio vero necessitatibus sit iusto tenetur maiores rem libero eos! Omnis, earum recusandae? Veniam a necessitatibus provident id iusto, sed earum commodi praesentium nemo mollitia modi laudantium, deleniti accusamus in maiores quisquam. Saepe incidunt adipisci modi atque, omnis asperiores? Quidem est pariatur modi autem sint!
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