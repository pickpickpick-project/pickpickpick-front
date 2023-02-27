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


interface ProductResponse{
        result: boolean,
        msg: string,
        code: string,
        errorMsg: string,
        data: ProductData
}

interface ProductData{
    workInfo: ProductInfo
}

interface ProductInfo{
        workNum: number,
        workerNum: number,
        workName: string,
        workDesc: string
        workPrice: number,
        workImages: ProductImages[]
}

interface ProductImages{
        workImgNum: number,
        workImgName: string,
        workImgOriginName: string,
        workImgSrcPath: string,
        size: number,
}

export const getProductData = async(workNum:number) => {    
    const response = await api.get<ProductResponse>(`works/${workNum}`);
    return response.data;
}

export const deleteProduct = async (params: {workNum: number}) =>{
    const {workNum} = params;
    const response = await api.delete(`works/${workNum}`);

    return response.data;
}



interface ProductEdit{
    files : any,
    workDesc : string,
    workName : string,
    workPrice : number,
    workerNum : number,
    workNum : number,
}

export const editProduct = async(params:ProductEdit) => {
    console.log(params);
    const { files, workDesc, workName, workPrice, workerNum, workNum } = params;
    const response = await api.post('works/edit', {
        files,
        workDesc,
        workName, 
        workPrice, 
        workerNum, 
        workNum,
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })
    return response.data;
}