import api from "./api"

// /user/follow  팔로우

interface FollowResponse{    
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: {},
}

// 팔로우 하는 사람 : 현재 user
// 팔로우 당하는 사람 : 작가페이지 user

export const handleFollow = async(userId:number, artistId:number) => {
    const response = await api.post<FollowResponse>(`user/follow`, {
        followerNum : userId,
        followingNum : artistId,
    },{
        headers: {
            "Content-Type": "multipart/form-data",
          },   
    })

    return response.data
}

/// /user/follow/cancle  팔로우 취소

interface FollowCancleResponse{    
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: {},
}

export const handleFollowCancle = async(userId : number, artistId : number) => {
    const response = await api.patch<FollowCancleResponse>('user/follow/cancle', {
        followNum : userId,
        followingNum : artistId,
    }, {
        headers: {
            "Content-Type": "multipart/form-data",
          },   
    })
    return response.data;
}

// /user/follower/{id}

interface FollowListResponse{    
    result: boolean,
    msg: string,
    code: string,
    errorMsg: string,
    data: FollowListData,
}

interface FollowListData{
        id: number,
        name: string,
        email: string,
        nickName: string,
        phone: string,
        intro: string,
        imageUrl: string,
        role: string,
        emailVerified: null,
        provider: string,
        providerId: null,
}


export const getFollowerList = async(userId : number) => {
    const response = await api.get<FollowListResponse>(`user/follower/${userId}`);
    return response.data;
}

//

export const getFollowingList = async(userId : number) => {
    const response = await api.get<FollowListResponse>(`user/following/${userId}`);
    return response.data;
}
