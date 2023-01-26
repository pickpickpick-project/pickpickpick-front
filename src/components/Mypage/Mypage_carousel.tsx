import styled from "styled-components";
import {ReactComponent as ArrowLeft} from "../../assets/images/Mypage/arrow-left.svg";
import {ReactComponent as ArrowRight} from "../../assets/images/Mypage/arrow-right.svg";

const MypageCarouselStyled = styled.div`
    width : 100%; // 900px
    margin : 50px 0 50px 0;
    position : relative;

    .mypage-arrow-left{
            position : absolute;
            top : 60%;
            left : -20px;
            width : 15px;
            height : 15px;
            cursor: pointer;
        }

    .mypage-arrow-right{
        position: absolute;
        right : -20px;
        top : 60%;
        width : 15px;
        height : 15px;
        cursor: pointer;
    }

    .mypage-carousel{
        overflow: hidden;
    }
    

    .mypage-carousel-box{
        width : 1500px;
        height : 200px;
        position: relative;

    }
    .mypage-carousel-container{
        display: flex;
        flex-direction: row;
        height : 100%;
        
        .mypage-carousel-element-container{
            width : 290px;
            margin-right : 10px;

            .mypage-carousel-element-img{
                background-color: black;
                height : 60%;
                width : 60%;
                margin : 0 auto;
                margin-bottom : 10px;
            }

            .mypage-carousel-element-title{
                text-align: center;
            }
            .mypage-carousel-element-price{
                text-align: center;
            }
        }

    }
`


const MypageCarousel = ({title}:any) => {
    return (
        <MypageCarouselStyled>
            <ArrowLeft className="mypage-arrow-left"></ArrowLeft>
            <ArrowRight className="mypage-arrow-right"></ArrowRight>
            <div className="mypage-carousel">
                <h1>{title}</h1>
                <div className="mypage-carousel-box">
                    <div className="mypage-carousel-container">
                        <div className="mypage-carousel-element-container">
                            <div className="mypage-carousel-element-img"></div>
                            <div className="mypage-carousel-element-title">Test</div>
                            <div className="mypage-carousel-element-price">10,000원</div>
                        </div>
                        <div className="mypage-carousel-element-container">
                            <div className="mypage-carousel-element-img"></div>
                            <div className="mypage-carousel-element-title">Test</div>
                            <div className="mypage-carousel-element-price">10,000원</div>
                        </div>
                        <div className="mypage-carousel-element-container">
                            <div className="mypage-carousel-element-img"></div>
                            <div className="mypage-carousel-element-title">Test</div>
                            <div className="mypage-carousel-element-price">10,000원</div>
                        </div>
                        <div className="mypage-carousel-element-container">
                            <div className="mypage-carousel-element-img"></div>
                            <div className="mypage-carousel-element-title">Test</div>
                            <div className="mypage-carousel-element-price">10,000원</div>
                        </div>
                    </div>
                </div>
            </div>
        </MypageCarouselStyled>
    )
}

export default MypageCarousel