import React, { useEffect, useState } from 'react';
import { Divider, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import InputCheckoutPage from '../../Smart/InputCheckoutPage/InputCheckoutPage';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import { toggleDrawer } from '../../../redux/slices/cartLocal';
import {
  checkoutState,
  updateFormStatus,
} from '../../../redux/slices/checkout';
import { isAuthenticated } from '../../../helpers/authentication/authentication';
import { customerState } from '../../../redux/slices/customer';

function FormContacts({ handelContinue }) {
  const dispatch = useDispatch();
  const [isFormValid, setIsFormValid] = useState(false);
  const { contactsForm } = useSelector(checkoutState);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const contactsContent = Boolean(
    contactsForm.firstName ||
      contactsForm.lastName ||
      contactsForm.email ||
      contactsForm.phoneNumber,
  );

  const continueStatus = contactsContent && isFormValid;

  const handleIsValid = isValid => {
    const timer = setTimeout(() => {
      setIsFormValid(isValid);
      dispatch(updateFormStatus(isValid));
    }, 50);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    dispatch(updateFormStatus(isFormValid));
  }, [isFormValid]);

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  // Authenticated Logic
  const isAuth = isAuthenticated();
  const { customer } = useSelector(customerState);

  // Responsive Logic

  const handleScreenSize = () => {
    setIsSmallScreen(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleScreenSize();
    window.addEventListener('resize', handleScreenSize);
    return () => {
      window.removeEventListener('resize', handleScreenSize);
    };
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          firstName: isAuth ? customer.firstName : contactsForm.firstName,
          lastName: isAuth ? customer.lastName : contactsForm.lastName,
          email: isAuth ? customer.email : contactsForm.email,
          phoneNumber: isAuth ? customer.phoneNumber : contactsForm.phoneNumber,
        }}
        validationSchema={Yup.object({
          firstName: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid name')
            .required('Name is required*'),
          lastName: Yup.string()
            .matches(/^[A-Za-z ]*$/, 'Please enter valid surname')
            .required('Surname is required*'),
          email: Yup.string()
            .email('Please enter a valid email address')
            .required('Email is required*'),
          phoneNumber: Yup.number()
            .min(10, 'Please enter your phone number correctly')
            .required('The phone number is required*'),
        })}
      >
        {({ isValid }) => {
          handleIsValid(isValid);
          return (
            <Form sx={{ padding: '30px 10px' }}>
              <Grid container spacing={5} direction="column">
                <Grid item xs={12}>
                  <Typography variant="h6">Main Information</Typography>
                  <Divider />
                </Grid>
                <Grid item xs={6}>
                  <InputCheckoutPage name="firstName" label="First Name" />
                </Grid>
                <Grid item xs={6}>
                  <InputCheckoutPage name="lastName" label="Last Name" />
                </Grid>
                <Grid item xs={12}>
                  <InputCheckoutPage name="email" label="Email" />
                </Grid>
                <Grid item xs={12}>
                  <InputCheckoutPage name="phoneNumber" label="Phone Number" />
                </Grid>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <Stack
        sx={{
          padding: isSmallScreen ? '30px 20px' : '50px 20px',
        }}
        direction="column"
        spacing={3}
      >
        <ButtonsCheckoutPage
          label="Continue"
          variant="contained"
          size="large"
          type="submit"
          onClick={() => {
            handelContinue();
          }}
          disabled={!continueStatus}
        />
        <ButtonsCheckoutPage
          label="Back to Cart"
          variant="outlined"
          size="large"
          onClick={handelBackToCart}
        />
      </Stack>
    </>
  );
}

FormContacts.propTypes = {
  handelContinue: PropTypes.func.isRequired,
};
export default FormContacts;
