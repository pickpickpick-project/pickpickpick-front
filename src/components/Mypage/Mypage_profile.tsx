import styled from "styled-components";
import {
  CommonIntroduceBoxContainerStyled,
  CommonIntroduceBoxWrapperStyled,
  CommonIntroduceBoxStyled,
} from "../../assets/CommonStyled";
import { BigText } from "../../assets/CommonStyled";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { useEffect, useState } from "react";
import { getUserInfo } from "../../api/user";
import colors from "../../assets/colors";
import { updateUserInfo } from "../../api/user";
import MypageMenu from "./button";
import EditModal from "./editModal";
const ProfileStyled = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`;

const ProfileIntroductContainer = styled(CommonIntroduceBoxWrapperStyled)`
  display: flex;
`;

const ProfileContainerStyled = styled.div`
  width: 650px;

  .Container{
    display: flex;
  }
`;

const ProfileImageStyled = styled.img`
  border-radius: 10px;
`;

const ProfileIntroduceEditBtnStyled = styled.button`
  width: 50px;
  height: 20px;
  margin-left: 15px;
  border: none;
  background-color: white;
  box-shadow: 6px 8px 14px rgb(0 0 0 / 8%);
  border-radius: 5px;
  cursor: pointer;
`;

const ProfileIntroduceBoxStyled = styled(CommonIntroduceBoxStyled)`
  width: 90%;
  height: 100px;
`;

const ProfileIntroduceInputStyled = styled.textarea`
  width: 90%;
  height: 100px;
  background-color: white;
  padding: 16px;
  box-shadow: 6px 8px 14px rgb(0 0 0 / 8%);
  border-radius: 12px;
  color: ${colors.text};
  border: none;
  &:focus {
    outline: none;
  }
`;

interface Email {
  email: string | null;
}

const MypageProfile = ({ email }: Email) => {
  const { data: User } = useQuery("getUserInfo", () =>
    getUserInfo(Number(localStorage.getItem("userId")))
  );

  const [ introduceText, setIntroduceText ] = useState("소개 글을 입력해 주세요");
  const [ introduceBoxValid, setIntroduceBoxValid ] = useState(true);
  const [ btnState, setBtnState ] = useState(true);
  const [ editModalShow, setEditModalShow ] = useState<boolean>(false);

  const ImgURL =
    User?.data.imageUrl[0] === "h"
      ? User?.data.imageUrl
      : `https://api.pppick.store/${User?.data.imageUrl}`;

  const queryClient = useQueryClient();
  const { mutate: updateInfo } = useMutation(updateUserInfo, {
    onSuccess: data => {
      queryClient.invalidateQueries("getUserInfo");
    },

    onError: data => {
      console.log(data);
    },
  });

  const onClickBtn = () => {
    setIntroduceBoxValid(!introduceBoxValid);
    if (!introduceBoxValid) {
      updateInfo({
        userNum: Number(User?.data.id!),
        userIntro: introduceText,
        userNick: User?.data.nickName!,
        userPhone: User?.data.phone!,
      });
    }
    setBtnState(!introduceBoxValid);
  };

  useEffect(() => {
    setIntroduceText(User?.data.intro!);
  }, [User?.data.intro]);

  return (
    <ProfileStyled>
      <ProfileImageStyled src={ImgURL} width="90" height="90" />
      <ProfileContainerStyled>
        <div className="Container">
            <BigText style={{marginRight:"auto"}}>{User?.data.name}</BigText>
            <MypageMenu/>
        </div>
        <CommonIntroduceBoxContainerStyled style={{ marginTop: "20px" }}>
          <ProfileIntroductContainer>
              <ProfileIntroduceBoxStyled>
                {introduceText}
              </ProfileIntroduceBoxStyled>
          </ProfileIntroductContainer>
        </CommonIntroduceBoxContainerStyled>
      </ProfileContainerStyled>
      <EditModal/>
    </ProfileStyled>
  );
};

export default MypageProfile;
