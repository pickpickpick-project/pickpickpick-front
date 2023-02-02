import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import { BigText, SmallText } from "../../assets/CommonStyled";
import colors from "../../assets/colors";
import CommonYellowButton from "../../components/Common/Button";
const OrderPageStyle = styled(PageStyled)`

    .OrderButtonWrapper{
        width : 100%;
        display: flex;
        justify-content: end;
    }
`

const OrderBoxContainer = styled.div`
    width : 70%;
    height : 250px;
    border : 1px solid rgb(228, 229, 237);
    margin : 0 auto;
    margin-top : 50px;
    padding : 40px;
`

const OrderInfoContainer = styled.div`
    display: flex;
    flex-direction : row;
    margin-top : 10px;
`

const OrderImgBox = styled.div`
    width : 100px;
    height : 100px;
    background-color: black;
`

const OrderTextContainer = styled.div`
    display : flex;
    flex-direction: column;
    margin-left : 15px;
`

const DivideLine = styled.div`
    
    height: 1px;
    width : 100%;
    margin : 0 auto;
    margin : 30px 0;
    background-color: rgb(228, 229, 237);
`
const OrderPriceContainer = styled.div`
    display: flex;
    flex-direction : row;
    align-items: center;
`


const OrderPage = () => {
    return (
        <OrderPageStyle>
            <BigText>결제하기</BigText>
            <OrderBoxContainer>
                <SmallText>주문 내역</SmallText>
                <OrderInfoContainer>
                    <OrderInfoContainer>
                        <OrderImgBox/>
                        <OrderTextContainer>
                            <h3>"압도적인 디자인 퀄리티" 실력으로 증명하겠습니다.</h3>
                            <h3>디자인영롱</h3>
                        </OrderTextContainer>
                    </OrderInfoContainer>
                </OrderInfoContainer>
                <DivideLine/>
                <OrderPriceContainer>
                    <BigText>총 결제금액 : </BigText>
                    <BigText>79,000원</BigText>
                </OrderPriceContainer>
                <div className="OrderButtonWrapper">
                    <CommonYellowButton onClick={()=>{}} width={200} height={50} hover={false} text={"결제하기"}/>
                </div>
            </OrderBoxContainer>
        </OrderPageStyle>
    )
}

export default OrderPage;