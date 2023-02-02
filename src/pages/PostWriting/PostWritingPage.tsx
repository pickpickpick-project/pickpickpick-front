import React from "react";
import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import colors from "../../assets/colors";

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import CommonYellowButton from "../../components/Common/Button";
const PostWritingPageStyle = styled(PageStyled)`
    .button-wrapper{
        display: flex;
        justify-content: end;
        margin-top : 30px;
    }
`

const PostTitleInputWrapper = styled.div`
    margin : 30px 0;
    display : flex;
    input{
        border: none;
        font-size : 32px;
        &:focus {
            outline : none;
        }
    }

`


const PostWritingPage = () => {
    return(
        <PostWritingPageStyle>
            <PostTitleInputWrapper>
                <input placeholder="문의글 제목"/>
            </PostTitleInputWrapper>
            <Editor
                initialValue="문의 내용"
                previewStyle="vertical"
                height="600px"
                initialEditType="markdown"
                useCommandShortcut={true}
            />
            <div className="button-wrapper">
                <CommonYellowButton width={200} height={50} hover={false} text={"제출하기"} onClick={() => {}}/>
            </div>
        </PostWritingPageStyle>
    )
}

export default PostWritingPage;