import styled from "styled-components";
import colors from "../../assets/colors";
import { ReactComponent as Info } from "../../assets/images/info.svg";
import { useState, useEffect } from 'react'; 

const ToastContainerStyle = styled.div<{props:ToastProps, show:boolean}>`
    position: absolute;
    top : ${props => props.props.top}%;
    left : ${props => props.props.left}%;
    transform: translate(-50%, -50%);
    z-index: 100;
    display: flex;
    flex-direction: row;
    background-color: ${colors.button};
    width : ${props => props.props.width}px;
    height : 70px;
    opacity: ${props => props.show ? 0.88 : 0};
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

interface Props {
    toastprop : ToastProps,
    validprop : boolean,
    setValid : React.Dispatch<React.SetStateAction<boolean>>,
}

interface ToastProps {
    content : string,
    start_time : number,
    title : string,
    width : number,
    height : number,
    top : number,
    left : number,
}


const ToastCenter:React.FunctionComponent<Props> = ({toastprop, validprop, setValid}) => {    
    
    const [showToast, setShowToast] = useState<boolean>(false);

    const effectTest = () => {
        let timer = setTimeout(() => {
            setShowToast(true);
            let innerTimer = setTimeout(() => {
                setShowToast(false); 
                setValid(false);
            }, 2500)
        }, toastprop.start_time);
        return () => {clearTimeout(timer)};
    }

    useEffect(() => {
        console.log(validprop);
        if(validprop === true){
            effectTest();
        }
    }, [validprop])
    

    return(
        <ToastContainerStyle props={toastprop} show={showToast}> 
            <Info/>
            <div className="container">
                <ToastTitleStyle>{toastprop.title}</ToastTitleStyle>
                <ToastContentStyle>{toastprop.content}</ToastContentStyle>
            </div>
        </ToastContainerStyle>
    )
}

export default ToastCenter;