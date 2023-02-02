import styled from "styled-components";
import colors from "./colors"


export const BoxContainerStlyed = styled.div`
    width : 70%;
    height : 400px;
    border : 1px solid rgb(228, 229, 237);
`

export const CommonIntroduceBoxContainerStyled = styled.div<{width?:number, height?:number}>`
    width : ${(props) => `${props.width}px` || `${100}%`};
    height : ${(props) => `${props.height}px` || `${100}%`}; 
`

export const CommonIntroduceBoxWrapperStyled = styled.div`
    background-color: #fafafc;
    border-radius: 12px;
    padding : 24px;
`

export const CommonIntroduceBoxStyled = styled.div`
    background-color: white;
    padding : 16px;
    box-shadow: 6px 8px 14px rgb(0 0 0 / 8%);
    border-radius: 12px;
    color : ${colors.text};
`

export const BigText = styled.h1`
    font-size : 24px;
    font-weight : 700;   
    color : ${colors.text};
`

export const SmallText = styled.h1`
    font-size : 15px;
    font-weight : bold;
    color : ${colors.text};
`


