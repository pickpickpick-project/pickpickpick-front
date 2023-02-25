import api from "./api";

interface OrderResponse{
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: OrderResponseData,
}

interface OrderResponseData{
    merchant_uid: string
}

interface OrderParams{
    orderCount : number,
    orderPrice : number,
    userNum : number,
    workNum : number
}

export const postOrder = async(params : OrderParams) => {
    const { orderCount, orderPrice, userNum, workNum } = params;
    console.log(params);
    
    const response = await api.post<OrderResponse>('orders', {
        orderCount,
        orderPrice,
        userNum,
        workNum
    })
    return response.data
}