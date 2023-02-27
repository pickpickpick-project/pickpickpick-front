import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {ReactComponent as ArrowLeft} from "../../assets/images/Mypage/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../assets/images/Mypage/arrow-right.svg";
import { CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled } from "../../assets/CommonStyled";
import MovePage from "../../util/navigate";
import BoardMenu from "../Board/button";
import ProductMenu from "../Product/button";
import { useNavigate } from "react-router";


export const ArrowStyled = styled.span<{left?:number, right?:number}>`
    position : absolute; 
    top : 50%;
    left :  ${(props) => props.left}px;
    right : ${(props) => props.right}px;
    width : 15px;
    height : 15px;
    cursor: pointer;
    &:hover{
        transition : all 0.2s ease-in-out;
        transform: scale(1.3);
    }
`

export const CarouselStyled = styled.div<{width:number}>`
    width : ${(props) => props.width || 900}px; // 900px
    margin : 0 0 50px 0;
    position : relative;
`

export const CarouselContainerStyled = styled.div<{width:number}>`
    width : ${(props) => props.width || 900}px;
    height : 200px;
    position: relative;
    display: flex;
    flex-direction: row;
`

export const CarouselElementContainerStyled = styled.div`
    width : 284px;
    height : 100%;
    margin-right : 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const CarouselElementImgStyled = styled.img`
    height : 60%;
    width : 60%;
    margin : 0 auto;
    margin-bottom : 10px;
    cursor: pointer;
`

const CarouselTextStyled = styled.span`
    text-align : center;
`

interface test{
    portfolio_id : number,
    user_id : number,
    portfolio_name : string,
    portfolio_type : number | string,
}

interface props{
    portfolioProps : test[];
}

const CommonCarousel = ({ data, category } : any,) => {
    const navigate = useNavigate();
    const [ arrowFlag, setArrowFlag ] = useState(true);
    let page_category:any = {
        portfolio : {
            name : 'portfolio',
            link : 'portfolio',
            img : 'portfolioImgList'
        },
        work : {
            name : 'work',
            link : 'product',
            img : 'files'
        }
    }
    const page_type = page_category[category].link;
    const page_img = page_category[category].img
    // const repeat = [1, 2, 3, 4, 5]; // 게시물 개수 test
    const TOTAL_SLIDES = data.length;
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slideRef = useRef<HTMLDivElement>(null);
    
    const onClickArrowLeft = () => {
        if(currentSlide === 0){
            return
        }else{
            setCurrentSlide(currentSlide+1);
        }
    }

    const onClickArrowRight = () => {
        if(currentSlide === -(TOTAL_SLIDES)+3){
            return
        }else{
            setCurrentSlide(currentSlide-1);
        }
    }

    useEffect(() => {
        if(data.length <= 3){
            setArrowFlag(false);
        }
        slideRef.current!.style.transition = "all 0.5s ease-in-out";
        slideRef.current!.style.transform = `translateX(${currentSlide*300}px)`;
      }, [currentSlide]);

    return (
        <CarouselStyled width={900} >
            {arrowFlag === true ? 
                <>
                    <ArrowStyled left={-35}>
                        <ArrowLeft onClick={onClickArrowLeft}></ArrowLeft>
                    </ArrowStyled>
                    <ArrowStyled right={-35}>
                        <ArrowRight onClick={onClickArrowRight}></ArrowRight>
                    </ArrowStyled> 
                </> 
                : 
                null
            }
            <CommonIntroduceBoxContainerStyled style={{overflow:'hidden'}}>
                <CommonIntroduceBoxWrapperStyled>
                    {/* 게시물의 개수에 따라서  */}
                    <CarouselContainerStyled width={data.length * 300} ref={slideRef}> 
                        {data.map((data:any) => {
                            const key = `${category}Num`
                            let imgSrc;
                            
                            switch (category){
                                
                                case 'portfolio':
                                    imgSrc = data[page_img].length === 0 ? 'https://i.ibb.co/t8C6xSr/Portfolio.png' : `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/${data[page_img][0].portfolioImgAddr}`
                                    break
                                case 'work':
                                    imgSrc = data[page_img].length === 0 ? 'https://i.ibb.co/t8C6xSr/Portfolio.png' : `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/${data[page_img][0].workImgSrcPath}`
                                    break
                            }
                            
                            const name = `${page_category[category].name}Name`
                            const dataName = data[name];   
                            
                            let query_id = 0;  
                            if(page_category[category].name === 'portfolio'){
                                query_id = data.portfolioNum;
                            }else if(page_category[category].name === 'work'){
                                query_id = data.workNum;
                            }
                            return(
                            <CarouselElementContainerStyled key={data[key]} >
                                <CarouselElementImgStyled onClick={() => navigate(`/${page_type}/${query_id}`)} src={imgSrc}></CarouselElementImgStyled>
                                <CarouselTextStyled>{dataName}</CarouselTextStyled>
                                {
                                    page_category[category].name === 'work' ?
                                    <ProductMenu productData={data}/> :
                                    null
                                }
                            </CarouselElementContainerStyled>
                        )})}
                    </CarouselContainerStyled>
                </CommonIntroduceBoxWrapperStyled>
            </CommonIntroduceBoxContainerStyled>
        </CarouselStyled>
    )
}

export default CommonCarousel