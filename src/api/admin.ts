import api from "./api";

export const getAdminUser = async () =>{
    const response = await api.get(`admin/manage/user`);
    return response.data;
}

export const getAdminProduct = async () =>{
    const response = await api.get(`admin/manage/work`);
    return response.data;
}
export const getAdminPortfolio = async () =>{
    const response = await api.get(`admin/manage/portfolio`);
    return response.data;
}

export const getAdminPayment = async () =>{
    const response = await api.get(`admin/manage/payment`);
    return response.data;
}

export const postAdminSignIn = async (params:{id:string, password:string}) =>{
    const {id, password} = params;
    const response = await api.post(`admin/login?id=${id}&password=${password}`);
    return response.data;
}