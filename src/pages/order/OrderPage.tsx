import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import { BigText, SmallText } from "../../assets/CommonStyled";
import { useLocation, useParams } from "react-router";
import CommonYellowButton from "../../components/Common/Button";
import { useQuery } from "react-query";
import { getProductData } from "../../api/product";
const OrderPageStyle = styled(PageStyled)`

    .OrderButtonWrapper{
        width : 100%;
        display: flex;
        justify-content: end;
    }
`

const OrderBoxContainer = styled.div`
    width : 70%;
    height : 400px;
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

const OrderImgBox = styled.img`
    width : 200px;
    height : 200px;
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

    const { state } = useLocation();
    const { id } = useParams();
    const { data : productInfo } = useQuery('getProduct', () => getProductData(Number(id)));
    const product = productInfo?.data.workInfo
    const product_img = product?.workImages.length! > 0 ? `http://ec2-15-164-113-99.ap-northeast-2.compute.amazonaws.com:8080/${product?.workImages[0].workImgSrcPath}` : 'https://ibb.co/2hz8Jgr'
    
    return (
        
        <OrderPageStyle>
            {
                product === undefined ? <div>loading</div>
                :
            <>
                <BigText>결제하기</BigText>
                <OrderBoxContainer>
                    <SmallText>주문 내역</SmallText>
                    <OrderInfoContainer>
                        <OrderInfoContainer>
                            <OrderImgBox src={product_img}/>
                            <OrderTextContainer>
                                <h2 style={{marginBottom:"15px", fontWeight:"bold"}}>{product.workDesc}</h2>
                                <h3>{product.workName}</h3>
                            </OrderTextContainer>
                        </OrderInfoContainer>
                    </OrderInfoContainer>
                    <DivideLine/>
                    <OrderPriceContainer>
                        <BigText>총 결제금액 : </BigText>
                        <BigText>{product.workPrice! * state}원</BigText>
                    </OrderPriceContainer>
                    <div className="OrderButtonWrapper">
                        <CommonYellowButton onClick={()=>{}} width={200} height={50} hover={false} text={"결제하기"}/>
                    </div>
                </OrderBoxContainer>
            </>
            }
        </OrderPageStyle>
    )
}

export default OrderPage;