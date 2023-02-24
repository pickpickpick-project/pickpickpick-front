import styled from "styled-components";
import { PageStyled } from "../../assets/pageStyle";
import { BigText, SmallText } from "../../assets/CommonStyled";
import { useLocation, useParams } from "react-router";
import CommonYellowButton from "../../components/Common/Button";
import { useQuery } from "react-query";
import { getProductData } from "../../api/product";
import { RequestPayResponse, RequestPayParams } from "../../api/import";

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
    

    const onClickPayment = () => {
        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp05604134"); // 가맹점 식별코드
    
        /* 2. 결제 데이터 정의하기 */
        const data: RequestPayParams = {
          pg: "html5_inicis", // PG사 : https://portone.gitbook.io/docs/sdk/javascript-sdk/payrq#undefined-1 참고
          pay_method: "card", // 결제수단
          merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
          amount: 101, // 결제금액
          name: "아임포트 결제 데이터 분석", // 주문명
          buyer_name: "홍길동", // 구매자 이름
          buyer_tel: "01012341234", // 구매자 전화번호
          buyer_email: "example@example", // 구매자 이메일
          buyer_addr: "신사동 661-16", // 구매자 주소
          buyer_postcode: "06018", // 구매자 우편번호
        };
    
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
      };
    
      /* 3. 콜백 함수 정의하기 */
      function callback(response: RequestPayResponse) {
        const { success, error_msg } = response;
    
        if (success) {
          alert("결제 성공");
        } else {
          alert(`결제 실패: ${error_msg}`);
        }
      }
    
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
                        <CommonYellowButton onClick={()=>{onClickPayment()}} width={200} height={50} hover={false} text={"결제하기"}/>
                    </div>
                </OrderBoxContainer>
            </>
            }
        </OrderPageStyle>
    )
}

export default OrderPage;