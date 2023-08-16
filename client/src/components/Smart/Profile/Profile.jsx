import { Box } from '@mui/material';
import { React } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/slices/authorization';
import ProfileAvatar from '../../Ordinary/ProfileAvatar/ProfileAvatar';
import ProfileContacts from '../ProfileContacts/ProfileContacts';

export default function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    // TODO: fix code , use serviceToken
    navigate('/');
    window.location.reload();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('customer');
    return dispatch(logout());
  };

  return (
    <Box display="flex" margin="10px 0px">
      <Box
        display="flex"
        flexDirection="column"
        backgroundColor="#ffffff"
        sx={{
          borderRadius: '10px',
          padding: '20px 30px',
          paddingTop: '10px',
        }}
      >
        <ProfileAvatar handleClick={handleLogOut} />
      </Box>
      <Box
        backgroundColor="#ffffff"
        sx={{
          width: '100%',
          marginLeft: '10px',
          padding: '20px 30px',
          borderRadius: '10px',
        }}
      >
        <ProfileContacts />
      </Box>
    </Box>
  );
}
