import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const MypageCarouselStyled = styled.div`
    width : 100%;
    height : 200px;
    margin-bottom : 60px;

    .mypage-carousel-container{
        height : 100%;
    }

    .carousel{
        button{
            background-color: black;
        }
        .slick-list{
            .slick-slide{
                padding : 5px;
            }
        }
    }

    .carousel-element-container{
        background-color: #fff00f;
        height : 150px;
        display : flex;
        flex-direction: column;

        .carousel-element-img{
            width : 100%;
            height : 60%;
            background-color: aliceblue;
        }
    }
    
`

const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

const MypageCarousel = ({title}:any) => {
    return (
        <MypageCarouselStyled>
            <div className="mypage-carousel-container">
                <h1>{title}</h1>
                <Slider className="carousel" {...settings}>
                    <div className="carousel-element-container">
                        <div className="carousel-element-img"></div>
                        <div className="carousel-element-title">test</div>
                        <div className="carousel-element-price">1,000</div>
                    </div>
                    <div className="carousel-element-container">
                        <div className="carousel-element-img"></div>
                        <div className="carousel-element-title">test</div>
                        <div className="carousel-element-price">1,000</div>
                    </div>
                    <div className="carousel-element-container">
                        <div className="carousel-element-img"></div>
                        <div className="carousel-element-title">test</div>
                        <div className="carousel-element-price">1,000</div>
                    </div>
                    <div className="carousel-element-container">
                        <div className="carousel-element-img"></div>
                        <div className="carousel-element-title">test</div>
                        <div className="carousel-element-price">1,000</div>
                    </div>
                </Slider>
            </div>
        </MypageCarouselStyled>
    )
}

export default MypageCarousel