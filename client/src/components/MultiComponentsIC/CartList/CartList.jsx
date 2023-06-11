import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Typography } from '@mui/material';

// import style from './NavIcon.module.scss';
import ShoppingCart from '../../Smart/ShoppingCart/ShoppingCart';

function CartList({ onClickClose }) {
  return (
    <Box sx={{ maxWidth: 550 }}>
      <Box
        sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}
      >
        <Button
          variant="text"
          sx={{
            backgroundColor: 'black',
            width: 60,
            color: 'white',
            fontSize: 15,
          }}
          onClick={onClickClose}
        >
          X
        </Button>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ fontSize: 32, color: 'black' }}>
          Shopping Cart
        </Typography>
      </Box>
      <Box sx={{ width: '100%' }} role="presentation" onKeyDown={onClickClose}>
        <ShoppingCart />
      </Box>
    </Box>
  );
}

CartList.propTypes = {
  onClickClose: PropTypes.func.isRequired,
};

export default CartList;
