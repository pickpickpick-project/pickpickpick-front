import styled from "styled-components";
import colors from "../../assets/colors";
import { CommonText } from "./ArtistStyled";
import { CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled, CommonIntroduceBoxStyled } from '../../assets/CommonStyled';

const ArtistIntroduceStyled = styled.div`
    margin-top : 50px;
`

interface User {
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: UserData, 
}

interface UserData {
    id: number,
    name: string,
    email: string,
    nickName: string,
    phone: string,
    intro: string,
    imageUrl: string,
    role: string,
    emailVerified: null, //수정필요
    provider: string,
    providerId: number,
}

const ArtistIntroduce = ({userData} : {userData : UserData}) => {
    return(
        <ArtistIntroduceStyled>
            <CommonText>소개</CommonText>
            <CommonIntroduceBoxContainerStyled width={700} style={{marginTop:`30px`}}>
                <CommonIntroduceBoxWrapperStyled style={{width:"100%", height:"100px"}}>
                    <CommonIntroduceBoxStyled style={{width:"95%", height:"80%"}}>
                        {userData.intro}
                    </CommonIntroduceBoxStyled>
                </CommonIntroduceBoxWrapperStyled>
            </CommonIntroduceBoxContainerStyled>
        </ArtistIntroduceStyled>
    )
}

export default ArtistIntroduce;