import {ReactComponent as Logo} from '../../assets/images/Home/profile.svg';
import styled from 'styled-components';
import colors from '../../assets/colors';


const ProfileStyled = styled.div`
    display : flex;
    flex-direction: row;
    width : 100%;
    justify-content: space-around;
    align-items: center;
    .profile-container{
        width : 650px;

        .profile-introduce-wrapper{
            background-color: #fafafc;
            border-radius: 12px;
            padding : 24px;

            .profile-introduce{
                background-color: white;
                padding : 16px;
                box-shadow: 0 4px 14px rgb(48 52 65 / 8%);
                border-radius: 12px;
                color : ${colors.text};
            }
        }
    }
`

const MypageProfile = () => {
    return (
        <ProfileStyled>
                <Logo width="90" height="90"/>
                <div className="profile-container">
                    <h2>닉네임닉네임닉네임</h2>
                    <div className="profile-introduce-wrapper">
                        <div className="profile-introduce">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                            Eius, officia, alias consequatur eveniet reprehenderit facilis
                            laborum exercitationem dignissimos aut iusto tempore nostrum aliquam harum? 
                            Qui natus error facilis rerum illo, cumque sed assumenda eum a? Commodi repellendus 
                            possimus ex vel consequatur? Odio itaque, natus vel numquam ducimus sed soluta dolores!
                        </div>
                    </div>
                </div>
        </ProfileStyled>
    )
}

export default MypageProfile;