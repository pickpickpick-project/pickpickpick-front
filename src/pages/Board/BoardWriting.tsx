import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import colors from "../../assets/colors";
import { ProductPostBoxStyled, ProductPostTextareaStyled, ProductPostImageContainer, ProductPostImageStyled, ProductPostInputStyled } from "../Product/ProductPostPage";
import CommonYellowButton from "../../components/Common/Button";
import { SmallText } from "../../assets/CommonStyled";
import { useMutation, useQueryClient } from "react-query";
import { handleSubmitBoard, handlePostEdit } from "../../api/board";
import { usePagination } from "@mui/lab";
import { useParams, useNavigate, useLocation } from "react-router";
const PostWritingPageStyle = styled(PageStyled)`
    .button-wrapper{
        display: flex;
        justify-content: end;
        margin-top : 30px;
    }

    .password-input-container{
        width : 100%;
        display : flex;
        justify-content: end;
    }
`

const PostTitleInputWrapper = styled.div`
    margin : 30px 0;
    display : flex;
    input{
        width : 100%;
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
    const [ imgFiles, setImgFiles ] = useState<any>([]);    // 이미지 배열
    const [ title, setTitle ] = useState<string>('');   // 제목
    const [ artistNum, setArtistNum ] = useState<number>(); // 작가 고유 번호
    const [ content, setContent ] = useState<string>();     // 문의 글
    const [ password, setPassword ] = useState<string>(''); // 비밀번호
    const userId = Number(localStorage.getItem('userId'));  // 유저 id 
    const param = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    
    useEffect(() => {
        setArtistNum(Number(param.id));
    }, [])

    useEffect(() => {
        if(location.state !== null){
            setTitle(location.state.title);
            setContent(location.state.postContent)
        }
    }, [])
    
    let fileURLs:any = [];
    let file;
    
    const handleAddImages = (event:any) => {
        const imageLists = event.target.files;
        let imageUrlLists:any = [];
        setImgFiles([...imageLists]);
        
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
    
    const onChangeTitle = (e : React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    }

    const onChangeContent = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
        setContent(e.target.value);
    }

    const onChangePassword = (e : React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const queryClient = useQueryClient();
    const { mutate : posting } = useMutation(handleSubmitBoard, {
        onSuccess : data => {
            queryClient.invalidateQueries("handleSubmitBoard");
            if(data.msg === "Success"){
                navigate(`/board/${param.id}`);
            }
            
        },
        onError : data => {
            console.log(data);
            
        }
    })

    const { mutate : edit } = useMutation(handlePostEdit, {
        onSuccess : data => {
            navigate(`/board/${location.state.boardNum}`)
        },
        onError : data => {
            console.log(data);
        }
    }) 

    const onSubmit = () => {
        posting({
            postBoardNum : artistNum!,
            files : imgFiles,
            postContent : content!, 
            postPwd : password,
            postTitle : title,
            userNum : userId,
        })
    }

    const onEdit = () => {
        console.log("onEdit함수 진입");
        
        edit({
            postNum : location.state.postNum,
            files : imgFiles,
            postContent : content!,
            postTitle : title,
        })
    }
    return(
        <PostWritingPageStyle>
            <PostTitleInputWrapper>
                <input value={title} onChange={onChangeTitle} placeholder="문의글 제목"/>
            </PostTitleInputWrapper>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>문의글 작성</SmallText>
                <ProductPostTextareaStyled value={content} onChange={onChangeContent} placeholder="문의글을 작성해주세요" rows={10}></ProductPostTextareaStyled>
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>이미지 첨부</SmallText>
                    <ProductPostImageStyled>
                        {showImages.map((image, id) => (
                                <ProductPostImageContainer key={id}>
                                    <img src={image} alt={`${image}-${id}`} />
                                </ProductPostImageContainer>
                            ))}
                    </ProductPostImageStyled>
                    <input type="file" id="input-file" multiple onChange={handleAddImages}/>
            </ProductPostBoxStyled>
            <div className="password-input-container">
            {
                location.state === null ? 
                <ProductPostBoxStyled style={{width:'15%'}}>
                            <SmallText>비밀번호</SmallText>
                            <ProductPostInputStyled value={password} onChange={onChangePassword}/>                             
                </ProductPostBoxStyled> :
                null
            }   
            </div>
            <div className="button-wrapper">
                {
                    location.state === null ? 
                    <CommonYellowButton width={200} height={50} hover={false} text={"제출하기"} onClick={() => {onSubmit()}}/> :
                    <CommonYellowButton width={200} height={50} hover={false} text={"수정하기"} onClick={() => {onEdit()}}/>
                }
                

            </div>
        </PostWritingPageStyle>
    )
}

export default PostWritingPage;