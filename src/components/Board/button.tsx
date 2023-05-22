import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import { removeBoardPost } from '../../api/board';
import { useMutation } from 'react-query';

interface Props{
    boardNum : number,
    postTitle : string, 
    postContent : string, 
    postNum : number,
}



export default function BoardMenu({props}:{props:Props}) {
    const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // <button className="edit" onClick={() => navigate(`/writing/${getPostInfo.data.postNum}`, {
        //     state : {
        //         title : getPostInfo.data.postTitle,
        //         postContent : getPostInfo.data.postContent,
        //         postNum : getPostInfo.data.postNum,
        //     }
        // })}>edit</button> 

  const onClickEdit = () => {
    navigate(`/writing/${props.postNum}`, {
        state : {
            boardNum : props.boardNum,
            title : props.postTitle,
            postContent : props.postContent,
            postNum : props.postNum,
        }
    })
  }

  const { mutate : deletePost } = useMutation(removeBoardPost, {
    onSuccess : data => {
    },
    onError : data => {
        console.log(data);
    }
  });

  const onClickRemove = () => {
        deletePost(props.postNum);
        navigate(`/board/${props.boardNum}`);
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
        <MenuItem onClick={() => onClickEdit()}>Edit</MenuItem>
        <MenuItem onClick={() => onClickRemove()}>Remove</MenuItem>
      </Menu>
    </div>
  );
}
