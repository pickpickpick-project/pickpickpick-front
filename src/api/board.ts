import api from "./api";

// 작가별 문의게시판의 게시글 목록 조회

interface BoardList {
    result : boolean,
    msg : string,
    code : string,
    errorMsg : string,
    data : BoardListElement[]
}

export interface BoardListElement {
    postNum : number,
    userName : string,
    postTitle : string,
}

export const getBoardList = async (userNumber:number) => {
    const response = await api.get<BoardList>(`board/${userNumber}/post`)
    .then(
        res => res.data.data
    )
    return response
}

//------------------------------------------


interface BoardPostingInfo{
    result : boolean,
    msg : string,
    code : string,
    errorMsg : string,
    data : BoardPostingInfoData
}


interface BoardPostingInfoData{
    postNum: number,
    userNum: number,
    userName: string,
    postTitle: string,
    postContent: string,
    postPwd: string,
    comments: BoardComment[],
    postImgs: BoardPostingImg[]
}

interface BoardComment{
        commentNum: number,
        commentContent: string,
        userNum: number,
        userNick: string,
        postNum: number,
}

interface BoardPostingImg{
    postImgNum: number,
    origFileName: string,
    postImgName: string,
    filePath: string,
    postImgSize: number,
}

export const getPostData = async(postNum:number) => {
    const response = await api.get<BoardPostingInfo>(`post/${postNum}`);
    return response.data;
}


//------------------------------------------

interface BoardPost{
    postBoardNum : number,
    files : File[]
    postContent : string, 
    postPwd : string,
    postTitle : string,
    userNum : number,
}

export const handleSubmitBoard = async( params : BoardPost ) => {   // 작가별 문의게시판에 게시물 등록
    const { postBoardNum, files, postContent, postPwd, postTitle, userNum } = params;
    const response = await api.post<BoardList>(`board/${postBoardNum}/post`, {
        postBoardNum, 
        files, 
        postContent, 
        postPwd, 
        postTitle, 
        userNum
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })

    return response.data;
}


////////////////////

interface BoardPostEditResponse{
    result : boolean,
    msg : string,
    code : string,
    errorMsg : string,
    data : BoardPostEditData
}

interface BoardPostEditData{
    postNum : number
}

interface BoardPostEditParams{
    postNum : number,
    files : File[],
    postContent : string,
    postTitle : string,
}

export const handlePostEdit = async(params : BoardPostEditParams) => {
    const { postNum, files, postContent, postTitle } = params
    const response = await api.post<BoardPostEditResponse>(`post/${postNum}`, {
        files,
        postContent,
        postTitle,
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },
    })
    return response.data
}


/////////


interface BoardPostRemoveResponse{
    result : boolean,
    msg : string,
    code : string,
    errorMsg : string,
    data : null,
}

export const removeBoardPost = async(postNum:number) => {
    const response = await api.delete<BoardPostRemoveResponse>(`post/${postNum}`);
    return response.data;
}