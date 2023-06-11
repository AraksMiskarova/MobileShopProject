import { React, useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  useMediaQuery,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../redux/slices/authorization';
import {
  toggleDrawer,
  stateDrawer,
  stateSelectedProducts,
} from '../../../redux/slices/cartLocal';

import Logo from '../../UI/Logo/Logo';
import NavLinks from '../../Ordinary/NavLinks/NavLinks';
import NavIcon from '../../Simple/NavIcon/NavIcon';
import InputNav from '../../Smart/InputNav/InputNav';
import CartList from '../CartList/CartList';
import { stateSelectedProductsFav } from '../../../redux/slices/wishList';
import {
  cartBackState,
  fetchCartProducts,
} from '../../../redux/slices/cartBackEnd';

import { isAuthenticated } from '../../../helpers/authentication/authentication';

function Navbar() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isAuth, setIsAuth] = useState(false);
  const stateDraw = useSelector(stateDrawer);
  const cartProducts = useSelector(stateSelectedProducts);
  const { totalQuantityBack } = useSelector(cartBackState);
  const favProducts = useSelector(stateSelectedProductsFav);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate('/');
    window.location.reload();
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('customer');
    setIsAuth(false);
    return dispatch(logout());
  };

  useEffect(() => {
    const authenticated = isAuthenticated();
    if (!authenticated) {
      return setIsAuth(false);
    }
    if (authenticated) {
      setIsAuth(true);
    }
  }, [location.pathname]);

  const handleDrawerOpen = () => {
    dispatch(toggleDrawer(true));
  };

  const handleDrawerClose = () => {
    dispatch(toggleDrawer(false));
    setTimeout(() => {
      if (isAuth) {
        dispatch(fetchCartProducts());
      }
    }, 50);
  };

  const isMobile = useMediaQuery('(max-width:768px)');

  const totalQuantity = cartProducts.reduce(
    (total, item) => total + item.quantityCart,
    0,
  );

  const isTab = useMediaQuery('(max-width:940px)');

  return (
    <div>
      {!isMobile ? (
        <AppBar position="static" style={{ height: '153px' }}>
          <Toolbar style={{ padding: '0' }}>
            <Typography
              style={isTab ? { marginRight: '-30px', marginLeft: '-30px' } : {}}
              variant="h6"
            >
              <Logo />
            </Typography>
            <NavLinks />
            <InputNav />
            <NavIcon
              favCount={favProducts.length}
              cartCount={isAuth ? totalQuantityBack : totalQuantity}
              nameAvatar="Artur Tech"
              isAuth={isAuth}
              onClickLogOut={handleLogOut}
              onClickOpenDrawer={handleDrawerOpen}
            />
            <Drawer anchor="right" open={stateDraw} onClose={handleDrawerClose}>
              <CartList onClickClose={handleDrawerClose} />
            </Drawer>
          </Toolbar>
        </AppBar>
      ) : (
        <AppBar position="static" style={{ height: '153px' }}>
          <Toolbar>
            <Typography variant="h6">
              <Logo />
            </Typography>
            <NavLinks
              favCount={favProducts.length}
              cartCount={isAuth ? totalQuantityBack : totalQuantity}
              nameAvatar="Artur Tech"
              isAuth={isAuth}
              onClickLogOut={handleLogOut}
              onClickOpenDrawer={handleDrawerOpen}
            />
            <Drawer anchor="right" open={stateDraw} onClose={handleDrawerClose}>
              <CartList onClickClose={handleDrawerClose} />
            </Drawer>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}

export default Navbar;
