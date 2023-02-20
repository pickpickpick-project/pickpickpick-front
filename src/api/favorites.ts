import api from "./api";


export const getFavorites = async (id: number) =>{
    const response = await api.get(`portfolio/favorites/${id}`);
    return response.data;
}


export async function postFavorites(params: {
    portfolioNum: number,
    userNum: number,
}){
    const {portfolioNum, userNum} = params;
    const response = await api.post(`portfolio/favorites/add`,{
        portfolioNum,
        userNum 
    });

    return response.data;
}

export async function patchFavorites(params: {
    portfolioNum: number,
    userNum: number,
}){
    const {portfolioNum, userNum} = params;
    const response = await api.patch(`portfolio/favorites/cancelLike`,{
        portfolioNum,
        userNum 
    });

    return response.data;
}