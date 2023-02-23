import styled from 'styled-components';
import { CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled, CommonIntroduceBoxStyled } from '../../assets/CommonStyled';
import { BigText } from '../../assets/CommonStyled';
import { useQuery } from 'react-query';
import { useState } from 'react';
import { getUserInfo } from '../../api/user';
import colors from '../../assets/colors';
const ProfileStyled = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    justify-content: space-around;
    align-items: center;
`

const ProfileIntroductContainer = styled(CommonIntroduceBoxWrapperStyled)`
    display : flex;
`

const ProfileContainerStyled = styled.div`
    width : 650px;
`

const ProfileImageStyled = styled.img`
    border-radius: 10px;
`   

const ProfileIntroduceEditBtnStyled = styled.button`
    width : 50px;
    height : 20px;
    margin-left : 15px;
    border : none;
    background-color: white;
    box-shadow: 6px 8px 14px rgb(0 0 0 / 8%);
    border-radius: 5px;
    cursor: pointer;
`

const ProfileIntroduceBoxStyled = styled(CommonIntroduceBoxStyled)`
    width : 90%;
    height : 100px;
`

const ProfileIntroduceInputStyled = styled.textarea`
    width : 90%;
    height : 100px;
    background-color: white;
    padding : 16px;
    box-shadow: 6px 8px 14px rgb(0 0 0 / 8%);
    border-radius: 12px;
    color : ${colors.text};
    border : none;
    &:focus{
        outline : none;
    }
`

interface Email {
    email : string|null,
}


const MypageProfile = ({email}:Email) => {
    
    const { data : User} = useQuery("getUserInfo", () => getUserInfo(Number(localStorage.getItem('userId'))));
    const [ introduceText, setIntroduceText ] = useState('소개 글을 입력해 주세요');
    const onChangeInput = (e:any) => {
        setIntroduceText(e.target.value);
    }
    const [ introduceBoxValid, setIntroduceBoxValid ] = useState(true);
    const [ btnState, setBtnState ] = useState(true);
    const onClickBtn = () => {
        setIntroduceBoxValid(!introduceBoxValid)
        setBtnState(!introduceBoxValid);
    }

    
    return (
        <ProfileStyled>
                <ProfileImageStyled src={User?.data.imageUrl}width="90" height="90"/>
                <ProfileContainerStyled>
                    <BigText>{User?.data.name}</BigText>
                        <CommonIntroduceBoxContainerStyled style={{marginTop:"20px"}}>
                            <ProfileIntroductContainer>
                                {introduceBoxValid === true ? 
                                <ProfileIntroduceBoxStyled>{introduceText}</ProfileIntroduceBoxStyled>
                                :
                                <ProfileIntroduceInputStyled value={introduceText} onChange={onChangeInput}/>
                            }
                                <ProfileIntroduceEditBtnStyled onClick={onClickBtn}>
                                    {
                                        btnState === true ? 'edit' : 'submit'
                                    }
                                </ProfileIntroduceEditBtnStyled>
                            </ProfileIntroductContainer>
                        </CommonIntroduceBoxContainerStyled>
                </ProfileContainerStyled>        
        </ProfileStyled>
    )
}

export default MypageProfile;