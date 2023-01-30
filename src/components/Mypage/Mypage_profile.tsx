import {ReactComponent as Logo} from '../../assets/images/Home/profile.svg';
import styled from 'styled-components';
import colors from '../../assets/colors';
import { CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled, CommonIntroduceBoxStyled } from '../Common/IntroduceBox';


const ProfileStyled = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    justify-content: space-around;
    align-items: center;

`

const ProfileContainerStyled = styled.div`
    width : 650px;
`




const MypageProfile = () => {
    return (
        <ProfileStyled>
                <Logo width="90" height="90"/>
                <ProfileContainerStyled>
                    <h2>닉네임닉네임닉네임</h2>
                        <CommonIntroduceBoxContainerStyled>
                            <CommonIntroduceBoxWrapperStyled>
                                <CommonIntroduceBoxStyled>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                                    Eius, officia, alias consequatur eveniet reprehenderit facilis
                                    laborum exercitationem dignissimos aut iusto tempore nostrum aliquam harum? 
                                    Qui natus error facilis rerum illo, cumque sed assumenda eum a? Commodi repellendus 
                                    possimus ex vel consequatur? Odio itaque, natus vel numquam ducimus sed soluta dolores!
                                </CommonIntroduceBoxStyled>
                            </CommonIntroduceBoxWrapperStyled>
                        </CommonIntroduceBoxContainerStyled>
                </ProfileContainerStyled>        
        </ProfileStyled>
    )
}

export default MypageProfile;