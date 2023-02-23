import api from "./api";

interface ProductPost{
    files : any,
    workDesc : string,
    workName : string,
    workPrice : number,
    workerNum : number,
}


export const handleSubmitProduct = async ( params : ProductPost) => {
    const {files,  workDesc, workName, workPrice, workerNum } = params;
    const response = await api.post<ProductPost>('works', {
        files,
        workDesc,
        workName,
        workPrice,
        workerNum,
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })

    return response.data
}

export const deleteProduct = async (params: {workNum: number}) =>{
    const {workNum} = params;
    const response = await api.delete(`works/${workNum}`);
    return response.data;
}