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

export interface WorkInfo {
    workerNum: number,
    workNum: number,
    workName: string,
    workDesc: string,
    workPrice: number,
    workImages: WorkImg[],
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

interface WorkListTest extends Array<WorkList>{     // 배열로 받아준다.
    data : WorkList[];
}

export interface WorkList {
    workerNum : number,
    workNum : number,
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
    const response = await api.get<WorkListTest>(`works/users/${workerNum}`);
    return response.data;
}