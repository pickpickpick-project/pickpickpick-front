import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {ReactComponent as ArrowLeft} from "../../assets/images/Mypage/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../assets/images/Mypage/arrow-right.svg";
import { CarouselStyled, ArrowStyled, CarouselContainerStyled, CarouselElementContainerStyled,
    CarouselElementImgStyled } from "./Carousel";
import { CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled } from "../../assets/CommonStyled";
import MovePage from "../../util/navigate";

const CommonImgCarousel = ({ data } : any,) => {
    
    const [ arrowFlag, setArrowFlag ] = useState(true);
    
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
        if(data.length <= 2){
            setArrowFlag(false);
        }
        slideRef.current!.style.transition = "all 0.5s ease-in-out";
        slideRef.current!.style.transform = `translateX(${currentSlide*300}px)`;
      }, [currentSlide]);

    return (
        <CarouselStyled width={600}>
            {arrowFlag === true ? 
                <>
                    <ArrowStyled left={-35}>
                        <ArrowLeft onClick={onClickArrowLeft}></ArrowLeft>
                    </ArrowStyled>
                    <ArrowStyled right={-105}>
                        <ArrowRight onClick={onClickArrowRight}></ArrowRight>
                    </ArrowStyled> 
                </> 
                : 
                null
            }
            <CommonIntroduceBoxContainerStyled width={600} style={{overflow:'hidden'}}>
                <CommonIntroduceBoxWrapperStyled>
                    {/* 게시물의 개수에 따라서  */}
                    <CarouselContainerStyled width={600} ref={slideRef}> 
                        {data.map((data:any) => {
                            const imgSrc = `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/${data.filePath}`
                            return(
                            <CarouselElementContainerStyled key={imgSrc}>
                                <CarouselElementImgStyled src={imgSrc}/>
                            </CarouselElementContainerStyled>
                        )})}
                    </CarouselContainerStyled>
                </CommonIntroduceBoxWrapperStyled>
            </CommonIntroduceBoxContainerStyled>
        </CarouselStyled>
    )
}

export default CommonImgCarousel