import React, { useState } from "react";
import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import colors from "../../assets/colors";
import { ProductPostBoxStyled, ProductPostTextareaStyled, ProductPostImageContainer } from "../Product/ProductPostPage";
import CommonYellowButton from "../../components/Common/Button";
import { SmallText } from "../../assets/CommonStyled";

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

    const [showImages, setShowImages] = useState([]);
    const [ sendImages, setSendImages ] = useState<any>([]);
    let fileURLs:any = [];
    let file;
    
    const handleAddImages = (event:any) => {
        const imageLists = event.target.files;
        let imageUrlLists:any = [];
        
        for (let i = 0; i < imageLists.length; i++) {
            file = imageLists[i];
            let reader = new FileReader();
            reader.onload = () => {
                fileURLs[i] = reader.result;
                setSendImages([...fileURLs]);
            }
            reader.readAsDataURL(file);
            const currentImageUrl = URL.createObjectURL(imageLists[i]);
            imageUrlLists.push(currentImageUrl);
        }
        
        
        if (imageUrlLists.length > 6) {
          imageUrlLists = imageUrlLists.slice(0, 6);
        }
    
        setShowImages(imageUrlLists);
      };


    return(
        <PostWritingPageStyle>
            <PostTitleInputWrapper>
                <input placeholder="문의글 제목"/>
            </PostTitleInputWrapper>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>문의글 작성</SmallText>
                <ProductPostTextareaStyled placeholder="문의글을 작성해주세요" rows={10}></ProductPostTextareaStyled>
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>이미지 첨부</SmallText>
                {showImages.map((image, id) => (
                        <ProductPostImageContainer key={id}>
                            <img src={image} alt={`${image}-${id}`} />
                        </ProductPostImageContainer>
                    ))}
                    <input type="file" id="input-file" multiple onChange={handleAddImages}/>
            </ProductPostBoxStyled>
            <div className="button-wrapper">
                <CommonYellowButton width={200} height={50} hover={false} text={"제출하기"} onClick={() => {}}/>
            </div>
        </PostWritingPageStyle>
    )
}

export default PostWritingPage;