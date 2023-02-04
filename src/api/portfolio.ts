import api from "./api";
import { Portfolio } from "./types";


export async function getUserPortfolioImgs(userNum: number){
    const response = await  api.get<Portfolio>(`portfolio?userNum=${userNum}`);
    return response.data;
}