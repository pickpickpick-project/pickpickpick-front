import api from "./api";

export const deletePayment = async (params: {portfolioNm: number}) =>{
    const {portfolioNm} = params;
    const response = await api.delete(`payment/${portfolioNm}`);
    return response.data;
}