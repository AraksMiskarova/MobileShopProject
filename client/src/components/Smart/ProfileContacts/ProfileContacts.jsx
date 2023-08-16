import { Box, Grid, TextField } from '@mui/material';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { isAuthenticated } from '../../../helpers/authentication/authentication';
import { updateFormStatus } from '../../../redux/slices/checkout';
import {
  customerState,
  fetchCustomerData,
} from '../../../redux/slices/customer';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

// TODO: refactoring component and  code
function ProfileContacts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  const handleIsValid = isValid => {
    const timer = setTimeout(() => {
      setIsFormValid(isValid);
      dispatch(updateFormStatus(isValid));
    }, 50);
    return () => clearTimeout(timer);
  };

  // Authenticated Logic
  const isAuth = isAuthenticated();
  const { customer } = useSelector(customerState);
  const [customerData, setCustomerData] = useState(customer);

  useEffect(() => {
    if (customer) {
      setCustomerData(customer);
    }
  }, [customer]);

  useEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  // logic put Data

  const handleNewData = values => {
    const newDataBool = Boolean(
      customer.firstName === values.firstName &&
        customer.lastName === values.lastName &&
        customer.phoneNumber === values.phoneNumber &&
        customer.email === values.email,
    );
    if (!newDataBool && isFormValid) {
      dispatch(fetchCustomerData(values));
    }

    return null;
  };

  // logic disabled Button

  const [isDisabledButton, setIsDisabledButton] = useState(true);

  useEffect(() => {
    if (isFormValid) {
      setIsDisabledButton(false);
    }
    if (!isFormValid) {
      setIsDisabledButton(true);
    }
  }, [isFormValid]);

  return (
    <Formik
      onSubmit={values => {
        handleNewData(values);
      }}
      initialValues={{
        firstName: customerData && customerData.firstName,
        lastName: customerData && customerData.lastName,
        email: customerData && customerData.email,
        phoneNumber: customerData && customerData.phoneNumber,
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
        phoneNumber: Yup.number().min(
          10,
          'Please enter your phone number correctly',
        ),
      })}
    >
      {({ isValid }) => {
        handleIsValid(isValid);
        return (
          <Form>
            <Grid container spacing={5} direction="column">
              <Grid item xs={6} display="flex">
                <Box width="100%" marginRight="10px" position="relative">
                  <Field type="text" id="firstName" name="firstName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="First Name"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="firstName"
                    component="div"
                    style={{
                      position: 'absolute',
                      bottom: '-25px',
                      color: 'red',
                    }}
                  />
                </Box>
                <Box width="100%" marginLeft="10px" position="relative">
                  <Field type="text" id="lastName" name="lastName">
                    {({ field }) => (
                      <TextField
                        {...field}
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                      />
                    )}
                  </Field>
                  <ErrorMessage
                    name="lastName"
                    component="div"
                    style={{
                      position: 'absolute',
                      bottom: '-25px',
                      color: 'red',
                    }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} position="relative">
                <Field type="text" id="email" name="email">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="div"
                  style={{
                    position: 'absolute',
                    bottom: '-25px',
                    color: 'red',
                  }}
                />
              </Grid>
              <Grid item xs={12} position="relative">
                <Field type="phone" id="phoneNumber" name="phoneNumber">
                  {({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      variant="outlined"
                      fullWidth
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  style={{
                    position: 'absolute',
                    bottom: '-25px',
                    color: 'red',
                  }}
                />
              </Grid>
            </Grid>
            <Box
              sx={{
                textAlign: 'center',
                marginTop: '30px',
              }}
            >
              <ButtonDark
                label="Edit Data"
                type="submit"
                style={{ width: '250px' }}
                disabled={isDisabledButton}
              />
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
}

export default ProfileContacts;
