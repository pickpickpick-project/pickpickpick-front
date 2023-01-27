import styled from "styled-components"
import colors from "../assets/colors"

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
    box-shadow: 0 4px 14px rgb(48 52 65 / 8%);
    border-radius: 12px;
    color : ${colors.text};
`

