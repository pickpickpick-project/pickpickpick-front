import api from "./api";

interface Work {
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: WorkData, 
}

interface WorkData {
    workInfo: WorkInfo,
}

interface WorkInfo {
    workerNum: number,
      workName: string,
      workDesc: string,
      workPrice: number,
      workImages: WorkImg[] | any,
}
export interface WorkImg {
    workImgNum: number,
    workImgName: string,
    workImgOriginName : string,
    workImgSrcPath: string,
    size: number,
}


export const getWorkId = async (workNum: number) =>{
    const response = await api.get<Work>(`works/${workNum}`);
    return response.data;
}


// ---------------


interface WorkList {
    workerNum : number,
    workName : string,
    workDesc : string,
    workPrice : number,
    files : WorkListElementImg[]
}

interface WorkListElementImg {
    workImgNum : number,
    workImgName : string,
    workImgOriginName : string,
    workImgSrcPath : string,
    size : number,
}


export const getWorkList = async (workerNum : number) => {
    const response = await api.get<WorkList>(`works/users/${workerNum}`);
    return response.data;
}