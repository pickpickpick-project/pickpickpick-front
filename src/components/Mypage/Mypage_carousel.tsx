import styled from "styled-components";
import {ReactComponent as ArrowLeft} from "../../assets/images/Mypage/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../assets/images/Mypage/arrow-right.svg";
import {CommonIntroduceBoxContainerStyled, CommonIntroduceBoxWrapperStyled} from "../../components/Common/IntroduceBox"


const ArrowStyled = styled.span<{left?:number, right?:number}>`
    position : absolute;
    top : 60%;
    left :  ${(props) => props.left}px;
    right : ${(props) => props.right}px;
    width : 15px;
    height : 15px;
    cursor: pointer;
`
const MypageCarouselStyled = styled.div`
    width : 100%; // 900px
    margin : 50px 0 50px 0;
    position : relative;
           
`

const CarouselContainerStyled = styled.div<{width:number}>`
    width : ${(props) => props.width || 900}px;
    height : 200px;
    position: relative;
    display: flex;
    flex-direction: row;
`
const CarouselElementContainerStyled = styled.div`
    width : 274px;
    margin-right : 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
`


const CarouselElementImgStyled = styled.div`
    background-color: black;
    height : 60%;
    width : 60%;
    margin : 0 auto;
    margin-bottom : 10px;
`

const CarouselTextStyled = styled.span`
    text-align : center;
`

const MypageCarousel = ({title}:any) => {
    const repeat = [1, 2, 3, 4]; // 게시물 개수 test
    return (
        <MypageCarouselStyled>
            <h1>{title}</h1>
            <ArrowStyled left={-35}>
                <ArrowLeft></ArrowLeft>
            </ArrowStyled>
            <ArrowStyled right={-35}>
                <ArrowRight></ArrowRight>
            </ArrowStyled>
            <CommonIntroduceBoxContainerStyled style={{overflow:'hidden'}}>
                <CommonIntroduceBoxWrapperStyled>
                    {/* 게시물의 개수에 따라서  */}
                    <CarouselContainerStyled width={repeat.length * 300}>   
                        {repeat.map((value:number, index:number) => {return(
                            <CarouselElementContainerStyled>
                                <CarouselElementImgStyled></CarouselElementImgStyled>
                                <CarouselTextStyled>TEST</CarouselTextStyled>
                                <CarouselTextStyled>10,000원</CarouselTextStyled>
                            </CarouselElementContainerStyled>
                        )})}
                    </CarouselContainerStyled>
                </CommonIntroduceBoxWrapperStyled>
            </CommonIntroduceBoxContainerStyled>
        </MypageCarouselStyled>
    )
}

export default MypageCarousel