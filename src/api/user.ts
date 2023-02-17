import api from "./api";


interface User {
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: UserData, 
}

interface UserData {
    id: number,
    name: string,
    email: string,
    nickname: string,
    phone: string,
    intro: string,
    imageUrl: string,
    role: string,
    emailVerified: any, //수정필요
    provider: string,
    providerId: number,
}

export const getUserInfo = async (userNum: number) =>{
    const response = await api.get<User>(`user/${userNum}`);
    return response.data;
}
