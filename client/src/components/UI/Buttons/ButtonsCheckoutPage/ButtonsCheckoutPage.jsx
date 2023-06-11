import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';

function ButtonsCheckoutPage({
  label,
  onClick,
  variant,
  style,
  size,
  type,
  disabled,
}) {
  return (
    <Button
      variant={variant}
      onClick={onClick}
      style={{
        minWidth: 170,
        maxWidth: 250,
        margin: '5px auto',
        borderRadius: 2,
        ...style,
      }}
      size={size}
      type={type}
      disabled={disabled}
    >
      {label}
    </Button>
  );
}

ButtonsCheckoutPage.defaultProps = {
  onClick: null,
  label: 'My Button',
  variant: 'contained',
  style: null,
  size: 'large',
  type: 'submit',
  disabled: false,
};

ButtonsCheckoutPage.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  style: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  size: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

export default ButtonsCheckoutPage;
