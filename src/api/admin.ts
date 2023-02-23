import api from "./api";

export const getAdminUser = async () =>{
    const response = await api.get(`admin/manage/user`);
    return response.data;
}

export const getAdminProduct = async () =>{
    const response = await api.get(`admin/manage/work`);
    return response.data;
}