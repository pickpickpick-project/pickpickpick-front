import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useMutation, useQueryClient } from 'react-query';
import { deleteProduct } from '../../api/product';
import { editInfoModalShow } from '../../recoil';
import { useRecoilState } from 'recoil';



export default function MypageMenu() {
    
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [ showInfoModal, setShowInfoModal ] = useRecoilState<boolean>(editInfoModalShow);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickBtn = () => {
    setShowInfoModal(!showInfoModal);
    handleClose();
    console.log(showInfoModal);
  }



  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16 12c0 1.1.9 2 2 2s2-.9 2-2-.9-2-2-2-2 .9-2 2Zm-2 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Zm-6 0c0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2 2-.9 2-2Z" fill="#263747"></path></svg>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => onClickBtn()}>개인정보 수정</MenuItem>
      </Menu>
    </div>
  );
}
