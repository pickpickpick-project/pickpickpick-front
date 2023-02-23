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
    nickName: string,
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

////////////////

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
}

export const updateUserInfo = async(params:UserUpdatePost) => {
    const { userNum, userIntro, userNick, userPhone } = params
    const response = await api.post<UserUpdateResponse>(`user/update/${userNum}`, {
        userIntro,
        userNick,
        userPhone,
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })

    return response.data;
}