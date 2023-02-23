import api from "./api";

interface Portfolio {
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: PortfolioData[] | any, 
}

export interface PortfolioData {
    portfolioNum: number,
     user: number,
     portfolioName: string,
     portfolioType: string,
     portfolioDate: string,
     portfolioImgList: PortfolioImgs[],
     portfolioTags: PortfolioTags[],
}
export interface PortfolioImgs {
    portfolioImgNum: number,
    portfolioImgOriginName : string,
    portfolioImgName: string,
    portfolioImgAddr: string,
}

interface PortfolioTags {
    tag: TagInfo,
}
interface TagInfo {
    tagNum: number,
    tagName: string,
}



export const getPortfolioList = async () =>{
    const response = await  api.get<Portfolio>(`portfolio/list`);
    return response.data;
}

export const getPortfolioId = async (portfolioNum: number) =>{
    const response = await api.get<Portfolio>(`portfolio/${portfolioNum}`);
    return response.data;
}

export async function postPortfolio(params: {
    files: any,
    portfolioDate: string,
    portfolioName: string,
    portfolioType: string,
    tagName: string
    userNum: number,
}){
    const {files, portfolioDate, portfolioName, portfolioType, tagName, userNum} = params;
    const response = await api.post<Portfolio>(`portfolio/save`,{
        files,
        portfolioDate, 
        portfolioName, 
        portfolioType, 
        tagName,
        userNum 
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    });


    return response.data;
}


export async function getUserPortfolio(userNum: number){
    const response = await  api.get(`portfolio/list/user/${userNum}`);
    return response.data;
}

export async function getPortfolioInfo(portfolioNumber:number){
    const response = await api.get(`portfolio/${portfolioNumber}`);
    return response.data.data
}

export const deletePortfolio = async (params: {portfolioNm: number}) =>{
    const {portfolioNm} = params;
    const response = await api.delete<Portfolio>(`portfolio/${portfolioNm}`);
    return response.data;
}