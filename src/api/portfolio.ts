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
     portfolioImgList: any,
     portfolioTags: PortfolioTags[],
}

interface PortfolioTags {
    tag: TagInfo,
}
interface TagInfo {
    id: number,
    tagName: string,
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