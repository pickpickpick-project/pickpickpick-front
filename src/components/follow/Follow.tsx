import styled from "styled-components";
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from "react-query"; 
import colors from "../../assets/colors";
import { getFollowerList, getFollowingList, handleFollow, handleFollowCancel } from "../../api/follow";
const FollowContainerStyled = styled.div`
    margin-right : auto;
    display : flex;
    width : 250px;
    justify-content: space-around;
`
const FollowNumberContainerStyled = styled.div`
    text-align: center;
    cursor : pointer;
    h1{
        font-weight: bold;
    }
`

const FollowButtonStyled = styled.button`
    border : none;
    width : 80px;
    height : 25px;
    cursor: pointer;
    border-radius: 7px;
    background-color: ${colors.button};
`

const FollowModalContainer = styled.div`
    width : 100vw;
    height : 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top : 0;
    left : 0;
    z-index : 10;
`
const FollowModal = styled.div`
    width : 20%;
    height : 55%;
    position : absolute;
    top : 25%;
    left : 37.5%;
    background-color: white;
`

const Follow = ({artistId} : {artistId : number}) => {   
    const [ modalOpen, setModalOpen ] = useState(false); 
    const [ follow, setFollow ] = useState(false);
    const [ followerList, setFollowerList ] = useState<any>([]);
    const [ followingList, setFollowingList ] = useState<any>([]);
    const [ followListFlag, setFollowListFlag ] = useState(false);
    
    const userId = Number(localStorage.getItem('userId'))

    const { data : getFollowing } = useQuery('getFollowing', () => getFollowingList(artistId),{
        enabled : !!artistId,
        onSuccess : data => {
            console.log(data);
            setFollowingList([...data.data]);    // 팔로워 목록 usestate에 담기
        }
    });

    const { data : getFollower } = useQuery('getFollower', () => getFollowerList(artistId),{
        enabled : !!artistId,
        onSuccess : data => {
            console.log(data);
            setFollowerList([...data.data]);    // 팔로워 목록 usestate에 담기
            for(let i=0; i<data.data.length; i++){
                if(data.data[i].id === userId){ // 현재 유저가 이미 팔로잉 한 상태
                    setFollow(true);
                }
            }
        }
    });
    const queryClient = useQueryClient();

    const { mutate : following } = useMutation(handleFollow, {
        onSuccess : data => {
            console.log(data);
            // setFollowingList([...data.data]);   // 팔로잉 목록 usestate에 담기
            setFollow(!follow);
            queryClient.invalidateQueries("getFollower");
        },
        onError : data => {
            console.log(data);
        }
    })

    const { mutate : followCancel } = useMutation(handleFollowCancel, {
        onSuccess : data => {
            console.log(data);
            setFollow(!follow);
            queryClient.invalidateQueries("getFollower");
            queryClient.invalidateQueries("getFollowing");
            
        },
        onError : data => {
            console.log(data);
        }
    })

    const onClickModal = () => {
        if(modalOpen === true){ // 모달창 떠 있는 경우
            setModalOpen(!modalOpen);
            document.body.style.overflow = "unset";
        }else{   // 모달창 없는 경우
            setModalOpen(!modalOpen);
            document.body.style.overflow = "hidden";
        }
    }

    const onClickFollowingModal = () => {
        setFollowListFlag(true);    // 팔로잉 보여주기
        onClickModal();

    }

    const onClickFlowerModal = () => { 
        setFollowListFlag(false);   // 팔로워 보여주기
        onClickModal();
    }


    const onClickFollowBtn = () => {
        if(follow === true){    // 팔로잉 한 상태
            followCancel({userId, artistId})
        }else{                  // 팔로잉 안한 상태
            following({userId, artistId})
        }
    }

    useEffect(() => {

    },[followingList])

    return(
        <FollowContainerStyled>
            { modalOpen === true ? 
                <FollowModalContainer onClick={onClickModal}>
                    <FollowModal>
                        <ul>
                            {followListFlag === false ?
                                    followerList.map((data:any) => 
                                        <li>{data.name}</li>
                                    )
                                    :
                                    followingList.map((data:any) => 
                                        <li>{data.name}</li>
                                    )
                            }
                        </ul>
                    </FollowModal>
                </FollowModalContainer>
                :
                null
            }   
            <FollowNumberContainerStyled onClick={onClickFlowerModal}>
                <h3>팔로우</h3>
                <h1>{getFollower?.data.length}</h1>
            </FollowNumberContainerStyled>
            <FollowNumberContainerStyled onClick={onClickFollowingModal}>
                <h3>팔로잉</h3>
                <h1>{getFollowing?.data.length}</h1>
            </FollowNumberContainerStyled>
            <FollowNumberContainerStyled>
                {
                follow === false ? 
                <FollowButtonStyled onClick={onClickFollowBtn}>팔로우</FollowButtonStyled>
                :
                <FollowButtonStyled onClick={onClickFollowBtn}>팔로우 취소</FollowButtonStyled>
                }   
            </FollowNumberContainerStyled>
            
        </FollowContainerStyled>
    )
}

export default Follow