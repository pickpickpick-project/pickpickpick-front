import axios from "axios";
import { Portfolio } from "./types";


export async function getUserPortfolioImgs(userNum: number){
    const response = await  axios.get<Portfolio>(`portfolio?userNum=${userNum}`);
    return response.data;
}