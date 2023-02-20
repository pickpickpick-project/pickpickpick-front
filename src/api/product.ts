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
    console.log(files);
    
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