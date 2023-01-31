import styled, { css } from "styled-components";
import colors from "../../assets/colors";
import { ButtonHTMLAttributes } from "react";
const CommonYelowButtonStyled = styled.div<{width?:number, height?:number, hover?:any, onClick?:any}>`
    color: ${colors.text};
    background-color: ${colors.button};
    width: ${(props) => `${props.width}px`};
    height: ${(props) => `${props.height}px`};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 7px;
    font-weight: bold;
    font-size: 16px;
    cursor: pointer;

    ${props => props.hover ? css `
        transition: 0.2s all ease-out;
        filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.3));
        &:hover{
            filter: brightness(90%);
        }
    ` : ``}
`

interface YellowButtonProps {
    text : string;
    width : number;
    height : number;
    hover : boolean;
    onClick : ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
}

const CommonYellowButton = ({text, ...props} : YellowButtonProps) => {
    
    return(
        <CommonYelowButtonStyled onClick={props.onClick} width={props.width} height={props.height} hover={props.hover}>{text}</CommonYelowButtonStyled>
    )
}

export default CommonYellowButton