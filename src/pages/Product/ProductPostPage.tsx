
import styled from "styled-components";
import { BigText, SmallText } from "../../assets/CommonStyled";
import { PageStyled } from "../../assets/pageStyle";
import { useState, useRef } from "react";
import Images from "../../components/Product/ProductImage";
import CommonYellowButton from "../../components/Common/Button";
const ProductPostStyled = styled(PageStyled)``

const ProductPostBoxStyled = styled.div`
    padding: 24px;
    border: 1px solid #e4e5ed;
    display: flex;
    flex-direction: column;
    margin-bottom : 24px;
`

const ProductPostInputStyled = styled.input`
    width: 500px;
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

const ProductPostTagContainerStyled = styled.div`
    display: flex;
    flex-wrap: wrap;

    .input-tag{
        width: 500px;
        height: 30px;
        padding: 7px 14px;
        border: none;

        &:focus{
            outline: 0;
        }
    }

    .tag {
        font-size: 16px;
        font-weight: 500;
        align-items: center;
        padding: 8px 16px;
        margin: 0 12px 12px 0;
        border-radius: 1rem;
        background-color: #f8f9fa;
        color: #ffd400;
        cursor: pointer;
    }
`
const ProductPostImageContainer = styled.div`
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

export const ProductPostPage = () => {
    const [productName, setProductName] = useState<string>("");
    const [productPrice, setProductPrice] = useState<number>();
    const [checkedType, setCheckedType] = useState<string>("illust");
    const [checkedTypeNum, setCheckedTypeNum] = useState<number>(1);
    const [tagArr, setTagArr] = useState<string[]>([]);
    const [tagName, setTagName] = useState("");
    const [tag, setTag] = useState<string>("");
    const [postImages, setPostImages] = useState([]); // 서버로 보낼 이미지 데이터
    const [detailImages, setDetailImages] = useState<any>([]); // 프리뷰 보여줄 이미지 데이터
    const tagRef = useRef<any>();
    const [showImages, setShowImages] = useState([]);
    
    const handleAddImages = (event:any) => {
        const imageLists = event.target.files;
        let imageUrlLists:any = [...showImages];
    
        for (let i = 0; i < imageLists.length; i++) {
          const currentImageUrl = URL.createObjectURL(imageLists[i]);
          imageUrlLists.push(currentImageUrl);
        }
    
        if (imageUrlLists.length > 6) {
          imageUrlLists = imageUrlLists.slice(0, 6);
        }
    
        setShowImages(imageUrlLists);
      };
    
    const handleDeleteImage = (id:number) => {     // 이미지 삭제
        setShowImages(showImages.filter((_, index) => index !== id));
      };


    const onChangeName = (e: any) => {
        setProductName(e.target.value);
      };
    
    const onChangePrice = (e: any) => {
        setProductPrice(e.target.value);
    }

    const onClickRadio = (type: string, typeNum: number) => {
    setCheckedType(type);
    setCheckedTypeNum(typeNum);
    };

    const deleteTag = (e: any) => {
        const newTagArr = tagArr.filter(v => v !== e.target.outerText);
        setTagArr(newTagArr);
      };
    
    const onChangeTag = (e: any) => {
    setTag(e.target.value);
    };

    const addTag = (tag: string) => {
        if (tagArr.includes(tag)) return;
        setTagArr(tagArr => [...tagArr, tag]);
    
        setTagName("#" + tagArr.join(" #"));
      };
    

    return(
        <ProductPostStyled>
            <BigText style={{marginBottom:"30px"}}>상품 등록하기</BigText>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>상품 이름</SmallText>
                <ProductPostInputStyled
                    className="input-name"
                    placeholder="상품 이름을 입력하세요."
                    value={productName}
                    onChange={onChangeName}
                />
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText>상품 가격</SmallText>
                <ProductPostInputStyled
                    className="input-name"
                    placeholder="상품 가격을 입력하세요."
                    value={productPrice}
                    onChange={onChangePrice}
                />
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>상품 타입</SmallText>
                <ProductPostTypeContainerStyled type={checkedType}>
                    <ProductPostTypeItemStyled onClick={() => onClickRadio("illust", 1)}>
                        <ProductPostRadioStyled id="illust"></ProductPostRadioStyled>
                        <ProductPostLabelStyled htmlFor="illust">일러스트</ProductPostLabelStyled>
                    </ProductPostTypeItemStyled>
                    <ProductPostTypeItemStyled onClick={() => onClickRadio("caricature", 2)}>
                        <ProductPostRadioStyled id="caricature"></ProductPostRadioStyled>
                        <ProductPostLabelStyled htmlFor="caricature">캐리커쳐</ProductPostLabelStyled>
                    </ProductPostTypeItemStyled>
                    <ProductPostTypeItemStyled onClick={() => onClickRadio("webtoon", 3)}>
                        <ProductPostRadioStyled id="webtoon"></ProductPostRadioStyled>
                        <ProductPostLabelStyled htmlFor="webtoon">웹툰·콘티</ProductPostLabelStyled>
                    </ProductPostTypeItemStyled>
                    <ProductPostTypeItemStyled onClick={() => onClickRadio("character", 4)}>
                        <ProductPostRadioStyled id="character"></ProductPostRadioStyled>
                        <ProductPostLabelStyled htmlFor="character">캐릭터</ProductPostLabelStyled>
                    </ProductPostTypeItemStyled>
                    <ProductPostTypeItemStyled onClick={() => onClickRadio("emoticon", 5)}>
                        <ProductPostRadioStyled id="emoticon"></ProductPostRadioStyled>
                        <ProductPostLabelStyled htmlFor="emoticon">이모티콘</ProductPostLabelStyled>
                    </ProductPostTypeItemStyled>
                </ProductPostTypeContainerStyled>
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>상품 태그</SmallText>
                <ProductPostTagContainerStyled>
                    <ProductPostTagContainerStyled>
                    {tagArr.map((item, index) => (
                        <div key={index} className="tag" onClick={deleteTag}>
                        {item}
                        </div>
                    ))}
                    <input
                        ref={tagRef}
                        className="input-tag"
                        placeholder="태그를 입력하고 엔터를 누르세요."
                        value={tag}
                        onChange={onChangeTag}
                        onKeyPress={e => {
                        if (e.key === "Enter") {
                            addTag(tag);
                            setTag("");
                        }
                        }}
                    />
                    </ProductPostTagContainerStyled>
                </ProductPostTagContainerStyled>
            </ProductPostBoxStyled>
            <ProductPostBoxStyled>
                <SmallText style={{marginBottom:"20px"}}>상품 이미지 업로드</SmallText>
                <ProductPostTagContainerStyled>
                    {showImages.map((image, id) => (
                        <ProductPostImageContainer key={id} onClick={() => handleDeleteImage(id)}>
                            <img src={image} alt={`${image}-${id}`} />
                        </ProductPostImageContainer>
                    ))}
                    <label htmlFor="input-file" onChange={handleAddImages}>
                        <input type="file" id="input-file" multiple />
                    </label>
                </ProductPostTagContainerStyled>
            </ProductPostBoxStyled>
            <ProductPostButtonContainer>
                <CommonYellowButton text={"등록하기"} width={200} height={50} hover={false} onClick={()=>{}}/>
            </ProductPostButtonContainer>
        </ProductPostStyled>        
    )
}