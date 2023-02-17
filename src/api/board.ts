import api from "./api";

// 작가별 문의게시판의 게시글 목록 조회

interface BoardList {
    result : boolean,
    msg : string,
    code : string,
    errorMsg : string,
    data : BoardListElement[]
}

interface BoardListElement {
    postNum : number,
    userName : string,
    postTitle : string,
}

export const getBoardList = async (userNumber:number) => {
    const response = await api.get<BoardList>(`board/${userNumber}/post`);
    return response.data
}