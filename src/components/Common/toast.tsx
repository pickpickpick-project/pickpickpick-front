import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Info } from "../../assets/images/info.svg";
import { useState, useEffect } from 'react'; 

const ToastContainerStyle = styled.div<{props:ToastProps, show:boolean}>`
    position: absolute;
    top : ${props => props.props.top_pos}px;
    right : ${props => props.props.right_pos}px;
    z-index: 100;
    display: flex;
    flex-direction: row;
    background-color: ${colors.button};
    width : 250px;
    height : 70px;
    opacity: ${props => props.show ? 0.95 : 0};
    border-radius: 7px;
    justify-content: center;
    align-items: center;
    padding : 7px;
    transition : ease-in-out 0.5s;
    word-break: keep-all;

    .container{
        display : flex;
        flex-direction: column;
        margin-left : 10px;
    }
`

const ToastTitleStyle = styled.div`
    font-size : 14px;
    font-weight : bold;
    margin-bottom : 5px;
`

const ToastContentStyle = styled.div`
    font-size : 12px;
`

interface ToastProps {
    title : string,
    content : string,
    top_pos : number,
    right_pos : number,
    start_time : number,
}

const Toast = ({props} : {props:ToastProps}) => {
    const [effectTrue, setEffectTrue] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);
    const [flag, setFlag] = useState<boolean>(true);
    useEffect(() => {
        if(flag === true){
            window.addEventListener('scroll', handleScroll);
        }
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScroll = () => {
        if(effectTrue === false && flag===true){
            if(window.scrollY >= 100){
                setEffectTrue(true)
            }
        }
    }

    useEffect(() => {
        if(effectTrue === true){
            let timer = setTimeout(() => {
                setShowToast(true);
                let innerTimer = setTimeout(() => {
                    setShowToast(false); 
                    setFlag(false);
                }, 4000)
            }, props.start_time);
            return () => {clearTimeout(timer)};
        } 
    }, [effectTrue])
    

    return(
        <ToastContainerStyle props={props} show={showToast}> 
            <Info/>
            <div className="container">
                <ToastTitleStyle>{props.title}</ToastTitleStyle>
                <ToastContentStyle>{props.content}</ToastContentStyle>
            </div>
        </ToastContainerStyle>
    )
}

export default Toast;