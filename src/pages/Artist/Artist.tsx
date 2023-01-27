import styled from "styled-components";
import { ReactComponent as ArtistImg } from "../../assets/images/Home/profile.svg"
import colors from "../../assets/colors";
import ArtistIntroduce from "../../components/Artist/Introduce";

const ArtistStyled = styled.div`
    padding: 140px 0px 140px 0px;
    width: 1200px;
    margin: 0 auto;
    background-color: beige;

    .artist-banner-container{
        width : 1140px;
        height : 120px;
        background-color: #fafafc;
        border-radius: 4px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding : 10px 30px;

        .artist-banner-elements{
            flex : 1;
            padding-left : 20px;
            height : 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .artist-banner-title{
            font-size : 20px;
            font-weight : 500;  
        }

        .artist-banner-button-wrapper{
            display: flex;
            justify-content: flex-end;
        }
        .artist-banner-button{
            width : 269px;
            height : 52px;
            background-color: ${colors.button};
            border-radius : 6px;
            display: flex;
            justify-content: center;
            align-items: center;
            color : ${colors.text};
            font-size : 16px;
            font-weight: 500;
            
        }
    }
`

const ArtistPage = () => {
    return(
        <ArtistStyled>
            <div className="artist-banner-container">
                <ArtistImg width="100" height="100"/>
                <div className="artist-banner-elements">
                    <div className="artist-banner-title">Test</div>
                    <div className="artist-banner-button-wrapper">
                        <div className="artist-banner-button">문의하기</div>
                    </div>
                </div>
            </div>
            <ArtistIntroduce/>
        </ArtistStyled>
    )
}

export default ArtistPage;