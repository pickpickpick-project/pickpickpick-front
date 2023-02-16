import api from "./api";

export async function getUserPortfolio(userNum: number){
    const response = await  api.get(`portfolio/list/user/${userNum}`);
    return response.data;
}

export async function getPortfolioInfo(portfolioNumber:number){
    const response = await api.get(`portfolio/${portfolioNumber}`);
    return response.data.data
}
