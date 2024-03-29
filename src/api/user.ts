import api from "./api";


export interface User {
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
    nickName: string,
    phone: string,
    intro: string,
    imageUrl: string,
    role: string,
    emailVerified: null, //수정필요
    provider: string,
    providerId: number,
}

export const getUserInfo = async (userNum: number) =>{
    const response = await api.get<User>(`user/${userNum}`);
    return response.data;
}


export const deleteUser = async (params: {userNum: number}) =>{
    const {userNum} = params;
    const response = await api.delete<User>(`user/delete/${userNum}`);
    return response.data;
}

interface UserUpdateResponse{
    result : boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: UserNum
}


interface UserNum{
    userNum : number
}


interface UserUpdatePost{
    userNum : number
    userIntro : string
    userNick : string
    userPhone : string
    userImg? : File[]
}

export const updateUserInfo = async(params:UserUpdatePost) => {
    const { userNum, userIntro, userNick, userPhone, userImg } = params
    const response = await api.post<UserUpdateResponse>(`user/update/${userNum}`, {
        userIntro,
        userNick,
        userPhone,
        userImg,
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })

    return response.data;
}