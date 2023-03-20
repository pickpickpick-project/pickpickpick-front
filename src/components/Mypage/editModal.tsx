import React, { useState, useRef } from "react";
import styled from "styled-components";
import CommonYellowButton from "../Common/Button";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { getUserInfo, updateUserInfo } from "../../api/user";
import { editInfoModalShow } from "../../recoil";
import { useRecoilState } from "recoil";

const EditModalStyle = styled.div<{showInfoModal:boolean}>`
    display : ${props => props.showInfoModal ? 'flex' : 'none'}; 
    width : 100%;
    height : 100%;
    background-color : black;
    opacity : 0.8;
    position : fixed;
    top : 0;
    left : 0;
    z-index : 1000;
    justify-content: center;
    align-items: center;
`

const EditModalContainer = styled.div`
    width : 25%;
    height : 60%;
    padding : 5%;
    background-color : white;
    border-radius: 15px;
    display : flex;
    flex-direction: column;
    align-items: flex-start;
    opacity : 1;

    .edit-container{
        width : 100%;
        display : flex;
        flex-direction: row;
        align-items: center;
        margin-bottom : 10%;
        div:not(:last-child){
            margin-right : 30px;
        }

        input{
            border : none;
            border-bottom : 1px solid black;
            outline: none;
        }

        textarea{
            width : 100%;
            height : 80px;
            border : none;
            resize : none;
        }
    }

    .introduce{
        margin-bottom : 30%;
        height : 20%;
        width : 100%;
    }

    .btn{
        justify-content: end;
    }

`



const EditModal:React.FunctionComponent = () => {    
    const userId = Number(localStorage.getItem('userId'));
    const { data: User } = useQuery("getUser", () => getUserInfo(userId));
    const [ nickname, setNickname ] = useState<string>(User?.data.name!);
    const [ introduce, setIntroduce ] = useState<string>(User?.data.intro!);
    const [ img, setImg ] = useState<File[]>([]);
    const [ showInfoModal, setShowInfoModal ] = useRecoilState<boolean>(editInfoModalShow);
    const [ contact, setContact ] = useState<string>(User?.data.phone!);
    const imgRef = useRef<HTMLInputElement>(null);

    const onChangeNickname = (event : React.ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value)
    }

    const onChangeIntroduce = (event : React.ChangeEvent<HTMLTextAreaElement>) => {
        setIntroduce(event.target.value)
    }

    const onChangeContact = (event : React.ChangeEvent<HTMLInputElement>) => {
        setContact(event.target.value);
    }

    const onChangeImg = (event: React.ChangeEvent<HTMLInputElement>) => {
        setImg(Array.from(event.target.files || []))
    }
    
    const queryClient = useQueryClient();
    const { mutate : EditUserInfo } = useMutation(updateUserInfo, {
        onSuccess : data => {
            queryClient.invalidateQueries("getUserInfo");
        },

        onError : data => {
            console.log(data);
        },
    });

    const onClickEdit = () => {
        if(img.length === 0){
            EditUserInfo({
                userNum: Number(User?.data.id!),
                userIntro: introduce,
                userNick: nickname,
                userPhone: contact,
            })
        }else{
            EditUserInfo({
                userNum: Number(User?.data.id!),
                userIntro: introduce,
                userNick: nickname,
                userPhone: contact,
                userImg : img,
            })
        }
        onClickBtn();
    }

    const onClickBtn = () => {
        setShowInfoModal(!showInfoModal);
        console.log(showInfoModal);
      }
    return(
        <EditModalStyle showInfoModal={showInfoModal}>
            <EditModalContainer>
                <div className="edit-container">
                    <div>닉네임</div>
                    <input value={nickname} onChange={onChangeNickname} placeholder="닉네임"/>
                </div>
                <div className="edit-container">
                    <div>연락처</div>
                    <input value={contact} onChange={onChangeContact} placeholder="연락처"/>
                </div>                
                <div style={{marginTop:"30px"}} className="edit-container introduce">
                    <div style={{width :"20%"}}>소개</div>
                    <textarea value={introduce} rows={20} cols={50} placeholder="소개 글" onChange={onChangeIntroduce}></textarea>
                </div>
                <div className="edit-container image" >
                    <div style={{width:"45%"}}>대표 이미지</div>
                    <input ref={imgRef} type="file" id="input-file" onChange={onChangeImg}/>
                </div>
                <div className="edit-container btn">
                    <CommonYellowButton text="변경" width={60} height={40} hover={false} onClick={() => {onClickEdit()}}/>   
                    {/* <CommonYellowButton text="변경" width={60} height={40} hover={false} onClick={() => {onClickBtn()}}/>    */}
                </div>
            </EditModalContainer> 
        </EditModalStyle>
    )
}


export default EditModal