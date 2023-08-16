import { Avatar, Button } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function AvatarUser({
  nameAvatar,
  avatarSrc,
  isAuth,
  onClickLogOut,
  isProfil,
}) {
  const firstLetter = nameAvatar.charAt(0).toUpperCase();

  // take out the all styles in a separate object

  return isAuth ? (
    <>
      <Avatar
        sx={
          isProfil
            ? { width: 136, height: 136, fontSize: '65px' }
            : { width: 56, height: 56 }
        }
        src={avatarSrc}
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        {firstLetter}
      </Avatar>
      <Button
        variant="contained"
        color="secondary"
        onClick={onClickLogOut}
        style={
          isProfil
            ? { display: 'none' }
            : {
                borderRadius: 2,
                fontFamily: 'montserrat',
                fontSize: 13,
                fontWeight: 600,
                padding: 1,
                marginTop: 10,
                width: '100%',
              }
        }
      >
        Log Out
      </Button>
    </>
  ) : (
    <Button
      variant="contained"
      color="secondary"
      style={{
        borderRadius: 2,
        fontFamily: 'montserrat',
      }}
    >
      Log in
    </Button>
  );
}

AvatarUser.defaultProps = {
  avatarSrc: '#',
  nameAvatar: 'Alex Dou',
  isAuth: false,
  isProfil: false,
};

AvatarUser.propTypes = {
  nameAvatar: PropTypes.string,
  avatarSrc: PropTypes.string,
  isAuth: PropTypes.bool,
  onClickLogOut: PropTypes.func.isRequired,
  isProfil: PropTypes.bool,
};

export default AvatarUser;
