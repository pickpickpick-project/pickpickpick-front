import api from "./api";



interface CommentList {
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: CommentDataList[]
}

interface CommentDataList {
        commentNum: number ,
        commentContent: string,
        userNum: number,
        userNick: string,
        postNum: number,
}


export const getCommentList = async(postNum:number) => {
    const response = await api.get<CommentList>(`api/post/${postNum}/comment`);
    return response.data
} 

////



interface CommentPostResponse{
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data : CommentPostResponsetData
}

interface CommentPostResponsetData {
        commentNum: number,
        commentContent: string,
        userNum: number,
        userNick: string,
        postNum: number
}

interface CommentPost {
    postNum : number
    commentContent : string
    userNum : number
}


export const handleSubmitComment = async(params : CommentPost) => {
    const {postNum, commentContent, userNum} = params;
    const response = await api.post<CommentPostResponsetData>(`api/post/${postNum}/comment`, {
        postNum,
        commentContent,
        userNum,
    },{
        headers: {
            "Content-Type": "application/json",
          },
    })
    return response.data;
}



////////////////


interface CommentDeleteResponse{
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: null,
}


export const handleDeleteComment = async(commentNum:number) => {
    const response = await api.delete<CommentDeleteResponse>(`api/comment/${commentNum}`,
    {
        headers: {
            "Content-Type": "application/json",
          },
    })
}



/////


interface CommentEditResponse{
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: CommentEditData,
}

interface CommentEditData{
    commentNum: number,
    commentContent: string,
    userNum: number,
    userNick: string,
    postNum: number,
}

interface CommentEditParams{
    commentNum : number,
    commentContent : string
}

export const handleEditComment = async(params:CommentEditParams) => {
    const { commentNum, commentContent } = params
    const response = await api.put<CommentEditResponse>(`api/comment/${commentNum}`, {
        commentContent
    }, {
        headers : {
            "Content-Type": "application/json",
        }
    })

    return response.data;
}