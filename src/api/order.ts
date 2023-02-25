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
    merchantUid : string,
    orderCount : number,
    orderPrice : number,
    userNum : number,
    workNum : number
}

export const postOrder = async(params : OrderParams) => {
    const { merchantUid, orderCount, orderPrice, userNum, workNum } = params;
    const response = await api.post<OrderResponse>('/orders', {
        merchantUid,
        orderCount,
        orderPrice,
        userNum,
        workNum,
    })
    return response.data
}