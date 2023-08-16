import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

export default function FooterShoppingCart({ amount }) {
  // TODO: write styles in object
  return (
    <Typography
      sx={{
        fontSize: 16,
        color: '#000000',
        fontWeight: '600',
        margin: 'auto',
      }}
    >
      Total amount: ${amount}
    </Typography>
  );
}

FooterShoppingCart.defaultProps = {
  amount: 0,
};

FooterShoppingCart.propTypes = {
  amount: PropTypes.number,
};
