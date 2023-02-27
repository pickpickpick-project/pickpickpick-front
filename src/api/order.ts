import { useEffect } from "react";
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

///


interface PaymentVerifyResponse{
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: PaymentVerifyData
}

interface PaymentVerifyData{
        payment: PaymentData
}

interface PaymentData{
    paymentNum: number,
    merchantUid: string,
    pg: string,
    paymentCount: number,
    paymentPrice: number,
    payMethod: string,
    paymentDate: string,
    paymentStatus: string
}

interface PaymentParams{
    imp_uid : string,
    merchantUid : string,
}

export const paymentVerify = async(params:PaymentParams) => {
    const { imp_uid, merchantUid } = params
    console.log(params);
    
    const response = await api.post<PaymentVerifyResponse>('payment/verify',{
        imp_uid,
        merchantUid,
    });
    return response.data;
}

////////////



interface OrderStatusResponse{
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: {}
}

interface OrderStatusParams{
    merchantUid : string,
    orderStatus : string,
}

export const getOrderStatus = async(params:OrderStatusParams) => {
    console.log(params);
    const response = await api.get<OrderStatusResponse>('orders/status/',{params});
    return response.data;
}



////////////////////////////////////////////////


export const getOrderList = async(userNum : number) => {
    const response = await api.get(`orders/user/${userNum}`);
    return response.data;
}


////////////

interface PaymentCancel{
    merchant_uid : string,
    cancel_request_amount : number,
}

export const handlePaymentCancel = async(params : PaymentCancel) => {
    const { merchant_uid, cancel_request_amount } = params;
    const response = await api.post('payment/cancel', {
        merchant_uid,
        cancel_request_amount,
    })
    return response.data;
}


