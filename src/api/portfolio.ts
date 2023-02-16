import api from "./api";

interface Portfolio {
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: PortfolioData[] | any, 
}

interface PortfolioData {
    id: number,
     user: number,
     portfolioName: string,
     portfolioType: string,
     portfolioDate: string,
}



export const getPortfolioList = async () =>{
    const response = await  api.get<Portfolio>(`portfolio/list`);
    return response.data;
}

export const getPortfolioId = async (id: number) =>{
    const response = await api.get<Portfolio>(`portfolio/${id}`);
    return response.data;
}

export async function postPortfolio(params: {
    file: FormData,
    portfolioDate: string,
    portfolioName: string,
    portfolioType: string,
    userNum: number,
}){
    const {file, portfolioDate, portfolioName, portfolioType, userNum} = params;
    const response = await api.post<Portfolio>(`portfolio/save`,{
        file,
        portfolioDate, 
        portfolioName, 
        portfolioType, 
        userNum 
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });
    return response.data;
}