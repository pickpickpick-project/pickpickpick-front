import React from 'react';
import styled from 'styled-components';
import colors from '../../assets/colors';
import MoonLoader from "react-spinners/ClipLoader";

const SpinnerContainerStyle = styled.div`
    height : 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Spinner = () => {
    return(
        <SpinnerContainerStyle>
            <MoonLoader 
                color = {colors.button} 
            />
        </SpinnerContainerStyle>
    )
}

export default Spinner;