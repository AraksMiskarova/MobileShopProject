import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Menu, MenuItem, useMediaQuery } from '@mui/material';
import PropTypes from 'prop-types';
import { React, useState } from 'react';
import { NavLink } from 'react-router-dom';

import MobileModalSearch from '../../MultiComponentsIC/MobileModalSearch/MobileModalSearch';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import ButtonNav from '../../UI/Buttons/ButtonNav/ButtonNav';

import style from './NavLinks.module.scss';

function NavLinks({
  cartCount,
  favCount,
  nameAvatar,
  isAuth,
  onClickLogOut,
  onClickOpenDrawer,
}) {
  const isMobile = useMediaQuery('(max-width:768px)');

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={style.mainRoot}>
      {!isMobile ? (
        <div className={style.root}>
          <NavLink to="/" className={style.link}>
            <ButtonNav className={style.button} label="Home" />
          </NavLink>
          <NavLink to="/products/filter?" className={style.link}>
            <ButtonNav label="All goods" />
          </NavLink>
          <NavLink to="/about-us">
            <ButtonNav label="About us" />
          </NavLink>
          <NavLink to="/contact" className={style.link}>
            <ButtonNav label="Contact" />
          </NavLink>
          <NavLink to="/menage-products" className={style.link}>
            <ButtonNav label="Menage products" />
          </NavLink>
        </div>
      ) : (
        <div className={style.rootMob}>
          <MobileModalSearch />
          <IconButton onClick={handleOpen}>
            <MenuIcon style={{ color: '#ffffff', fontSize: 50 }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              style: {
                width: 300,
                backgroundColor: '#000000',
                border: '1px solid #ffffff',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            }}
          >
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLink to="/" className={style.link}>
                <ButtonNav
                  label="Home"
                  style={{
                    width: 100,
                  }}
                />
              </NavLink>
            </MenuItem>
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLink to="/products" className={style.link}>
                <ButtonNav label="All goods" />
              </NavLink>
            </MenuItem>
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLink to="/about-us" className={style.link}>
                <ButtonNav label="About us" />
              </NavLink>
            </MenuItem>
            <MenuItem
              onClick={handleClose}
              style={{ marginBottom: 20, marginLeft: '25px' }}
            >
              <NavLink to="/contact" className={style.link}>
                <ButtonNav label="Contact" />
              </NavLink>
            </MenuItem>
            <MenuItem style={{ marginLeft: '25px' }} onClick={handleClose}>
              <NavLink to="/menage-products" className={style.link}>
                <ButtonNav label="Menage products" />
              </NavLink>
            </MenuItem>
            <MenuItem onClick={handleClose} style={{ marginBottom: 20 }}>
              <NavIcon
                favCount={favCount}
                cartCount={cartCount}
                nameAvatar={nameAvatar}
                isAuth={isAuth}
                onClickLogOut={onClickLogOut}
                onClickOpenDrawer={onClickOpenDrawer}
              />
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}

NavLinks.defaultProps = {
  onClickLogOut: null,
  onClickOpenDrawer: null,
  cartCount: 666,
  favCount: 999,
  nameAvatar: 'Jhon Dou',
  isAuth: false,
};

NavLinks.propTypes = {
  cartCount: PropTypes.number,
  favCount: PropTypes.number,
  nameAvatar: PropTypes.string,
  isAuth: PropTypes.bool,
  onClickLogOut: PropTypes.func,
  onClickOpenDrawer: PropTypes.func,
};

export default NavLinks;
