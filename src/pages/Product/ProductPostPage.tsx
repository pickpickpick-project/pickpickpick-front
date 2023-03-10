
import styled from "styled-components";
import { BigText, SmallText } from "../../assets/CommonStyled";
import { PageStyled } from "../../assets/pageStyle";
import { useState, useRef, useEffect } from "react";
import CommonYellowButton from "../../components/Common/Button";
import { useMutation, useQueryClient } from "react-query";
import { handleSubmitProduct, editProduct } from "../../api/product";
import { useNavigate, useLocation } from "react-router";
import colors from "../../assets/colors";


const ProductPostStyled = styled(PageStyled)``

export const ProductPostBoxStyled = styled.div`
    padding: 24px;
    border: 1px solid #e4e5ed;
    display: flex;
    flex-direction: column;
    margin-bottom : 24px;
`

export const ProductPostInputStyled = styled.input`
    width: 70%;
    height: 30px;
    padding: 7px 14px;
    border: none;
    border-bottom: 1px solid #9a9ba7;
    &:focus{
        outline: 0;
    }
`

const ProductPostTypeContainerStyled = styled.div<{ type: string }>`
    margin-top: 12px;
    padding: 16px;
    border: 1px solid rgb(228, 229, 237);
    border-radius: 4px;
    display: flex;
    column-gap: 40px;

    #${props => props.type} {
            background-color: #ffd400;
            border-color: #ffd400;
        }
`

const ProductPostTypeItemStyled = styled.div`
    display: flex;
    align-items: center;
`

const ProductPostRadioStyled = styled.div`
        width: 18px;
        height: 18px;
        border-radius: 50%;
        border: 1px solid #979797;
        margin-right: 5px;
`

const ProductPostLabelStyled = styled.label`
    
`
export const ProductPostImageContainer = styled.div`
    width : 300px;
    height : 300px;

    img{
        width : 300px;
        height : 300px;
    }
`

const ProductPostButtonContainer = styled.div`
    display: flex;
    width : 100%;
    justify-content: end;
`

export const ProductPostTextareaStyled = styled.textarea`
    
    padding : 10px;
    resize : none;
    
    &:focus{
        outline:0;
        
    }
`

export const ProductPostImageStyled = styled.div`
    display: flex;
`

export const ProductPostPage = () => {
    const location = useLocation(); 
    const navigate = useNavigate();
    const [ textareaValue, setTextareaValue ] = useState<string>("");
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>(0);
    const [showImages, setShowImages] = useState([]);
    const [ sendImages, setSendImages ] = useState<any>([]);
    const [ files, setFiles] = useState<File[]>([]);
    const userId = Number(localStorage.getItem('userId'));
    let fileURLs:any = [];
    let file;
    
    
    useEffect(() => {
        if(location.state !== null){
            setProductPrice(location.state.workPrice);
            setProductName(location.state.workName);
            setTextareaValue(location.state.workDesc);
        }
    }, [])


    const textareaOnChange = (e:any) => {
        setTextareaValue(e.target.value);
    }

    const handleAddImages = (event:any) => {
        console.log(event);
        const imageLists = event.target.files;
        console.log(event.target.files);
        
        setFiles([...imageLists]);
        console.log(files);
    
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

    const onChangeName = (e: any) => {
        setProductName(e.target.value);
      };
    
    const onChangePrice = (e: any) => {
        setProductPrice(e.target.value);
    }

    const queryClient = useQueryClient();
    const { mutate : posting } = useMutation(handleSubmitProduct, {
        onSuccess : data => {
            queryClient.invalidateQueries("getWorkList");
            navigate('/mypage');
        },
        onError : (error) => {
            console.log(error);
        }
    });

    const { mutate : edit } = useMutation(editProduct, {
        onSuccess : data => {
            queryClient.invalidateQueries("getWorkList");
            navigate('/mypage');
        },
        onError : (error) => {
            console.log(error);
        }
    });

    const onClickPostHandler = () => {
        posting({
            files : files,
            workDesc : textareaValue,
            workName : productName,
            workPrice : productPrice,
            workerNum : userId,
            }
        )
    }

    const onClickEditHandler = () => {
        edit({
            files : files,
            workDesc : textareaValue,
            workName : productName,
            workPrice : productPrice,
            workerNum : userId,
            workNum : location.state.workNum
        })
    }
    console.log(location);
    return(
        <ProductPostStyled>
            <BigText style={{marginBottom:"30px"}}>?????? ????????????</BigText>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>?????? ??????</SmallText>
                <ProductPostInputStyled
                    className="input-name"
                    placeholder="?????? ????????? ???????????????."
                    value={productName}
                    onChange={onChangeName}
                />
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>?????? ??????</SmallText>
                <ProductPostInputStyled
                    className="input-name"
                    placeholder="?????? ????????? ???????????????."
                    value={productPrice}
                    onChange={onChangePrice}
                />
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>?????? ??????</SmallText>
                <ProductPostTextareaStyled placeholder="?????? ????????? ???????????????" rows={8} cols={50} value={textareaValue} onChange={textareaOnChange}></ProductPostTextareaStyled>
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>?????? ????????? ?????????</SmallText>
                    <ProductPostImageStyled>
                        {showImages.map((image, id) => (
                            <ProductPostImageContainer key={id}>
                                <img src={image} alt={`${image}-${id}`} />
                            </ProductPostImageContainer>
                        ))}
                    </ProductPostImageStyled>
                    <input type="file" id="input-file" multiple onChange={handleAddImages}/>
            </ProductPostBoxStyled>
            <ProductPostButtonContainer>
                {
                    location.state === null ?
                    <CommonYellowButton text={"????????????"} width={200} height={50} hover={false} onClick={()=>{onClickPostHandler()}}/> :
                    <CommonYellowButton text={"????????????"} width={200} height={50} hover={false} onClick={()=>{onClickEditHandler()}}/>
                }
                
            </ProductPostButtonContainer>
        </ProductPostStyled>
    )
}