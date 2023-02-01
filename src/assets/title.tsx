import styled from "styled-components";


const TitleStyle = styled.h1`
    font-size : 24px;
    font-weight : 700;   
`

type TitleProp = {
    title : String,
}

const Title = (prop:TitleProp) => {
    return(
        <TitleStyle>{prop.title}</TitleStyle>
    )
}

export default Title;