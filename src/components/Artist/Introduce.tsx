import styled from "styled-components";
import colors from "../../assets/colors";
import { CommonText } from "./ArtistStyled";
import { CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled, CommonIntroduceBoxStyled } from '../IntroduceBox';

const ArtistIntroduceStyled = styled.div`
    margin-top : 50px;
`

const ArtistIntroduce = () => {
    return(
        <ArtistIntroduceStyled>
            <CommonText>소개</CommonText>
            <CommonIntroduceBoxContainerStyled width={700} style={{marginTop:`30px`}}>
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
        </ArtistIntroduceStyled>
    )
}

export default ArtistIntroduce;