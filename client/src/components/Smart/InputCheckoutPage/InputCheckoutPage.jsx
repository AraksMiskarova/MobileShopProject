import { React, useEffect } from 'react';
import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useField } from 'formik';
import { useDispatch } from 'react-redux';
import {
  updateFormEmail,
  updateFormLastName,
  updateFormName,
  updateFormPhoneNumber,
} from '../../../redux/slices/checkout';

function InputCheckoutPage({ name, ...otherProps }) {
  const dispatch = useDispatch();
  const [field, meta] = useField(name);
  const configTextField = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined',
    helperText: '',
  };

  if (meta && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  useEffect(() => {
    if (field.name === 'firstName') {
      dispatch(updateFormName(field.value));
    }
    if (field.name === 'lastName') {
      dispatch(updateFormLastName(field.value));
    }
    if (field.name === 'email') {
      dispatch(updateFormEmail(field.value));
    }
    if (field.name === 'phoneNumber') {
      dispatch(updateFormPhoneNumber(field.value));
    }
  }, [field.value]);

  return <TextField {...configTextField} />;
}
InputCheckoutPage.defaultProps = {
  name: '',
};

InputCheckoutPage.propTypes = {
  name: PropTypes.string,
};
export default InputCheckoutPage;
