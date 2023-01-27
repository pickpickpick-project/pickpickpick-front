import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {ReactComponent as ArrowLeft} from "../assets/images/Mypage/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../assets/images/Mypage/arrow-right.svg";
import {CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled} from "../components/IntroduceBox"


const ArrowStyled = styled.span<{left?:number, right?:number}>`
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
const CarouselStyled = styled.div`
    width : 100%; // 900px
    margin : 0 0 50px 0;
    position : relative;
           
`

const CarouselContainerStyled = styled.div<{width:number}>`
    width : ${(props) => props.width || 900}px;
    height : 200px;
    position: relative;
    display: flex;
    flex-direction: row;
`
const CarouselElementContainerStyled = styled.div`
    width : 274px;
    margin-right : 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`


const CarouselElementImgStyled = styled.div`
    background-color: black;
    height : 60%;
    width : 60%;
    margin : 0 auto;
    margin-bottom : 10px;
`

const CarouselTextStyled = styled.span`
    text-align : center;
`

const CommonCarousel = () => {
    const repeat = [1, 2, 3, 4, 5]; // 게시물 개수 test
    const TOTAL_SLIDES = repeat.length;
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const slideRef = useRef<HTMLDivElement>(null);
    
    const onClickArrowRight = () => {
        console.log(currentSlide);
        if(currentSlide === 0){
            return
        }else{
            setCurrentSlide(currentSlide+1);
        }
    }

    const onClickArrowLeft = () => {
        console.log(currentSlide);
        if(currentSlide === -(TOTAL_SLIDES)+3){
            return
        }else{
            setCurrentSlide(currentSlide-1);
        }
    }


    useEffect(() => {
        slideRef.current!.style.transition = "all 0.5s ease-in-out";
        slideRef.current!.style.transform = `translateX(${currentSlide*300}px)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
      }, [currentSlide]);

    return (
        <CarouselStyled>
            <ArrowStyled left={-35}>
                <ArrowLeft onClick={onClickArrowLeft}></ArrowLeft>
            </ArrowStyled>
            <ArrowStyled right={-35}>
                <ArrowRight onClick={onClickArrowRight}></ArrowRight>
            </ArrowStyled>
            <CommonIntroduceBoxContainerStyled style={{overflow:'hidden'}}>
                <CommonIntroduceBoxWrapperStyled>
                    {/* 게시물의 개수에 따라서  */}
                    <CarouselContainerStyled width={repeat.length * 300} ref={slideRef}>   
                        {repeat.map((value:number, index:number) => {return(
                            <CarouselElementContainerStyled>
                                <CarouselElementImgStyled></CarouselElementImgStyled>
                                <CarouselTextStyled>{index}</CarouselTextStyled>
                                <CarouselTextStyled>10,000원</CarouselTextStyled>
                            </CarouselElementContainerStyled>
                        )})}
                    </CarouselContainerStyled>
                </CommonIntroduceBoxWrapperStyled>
            </CommonIntroduceBoxContainerStyled>
        </CarouselStyled>
    )
}

export default CommonCarousel