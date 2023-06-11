import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';
import FormControl from '@mui/material/FormControl';
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem,
  Select,
  Box,
  Typography,
  TextField,
  Divider,
  Stack,
} from '@mui/material';
import { toggleDrawer } from '../../../redux/slices/cartLocal';
import {
  updateDeliveryAddress,
  updateDeliveryPaymentStatus,
  updatePaymentInfo,
  updateShipping,
  checkoutState,
} from '../../../redux/slices/checkout';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';

function DeliveryPaymentInfo({ handelContinue }) {
  const dispatch = useDispatch();

  const { deliveryAddress, shipping, paymentInfo } = useSelector(checkoutState);

  // LOGIC Type delivery
  const [deliveryTypeStatus, setDeliveryTypeStatus] = React.useState(false);
  React.useEffect(() => {
    if (shipping === 'PostOfficeDelivery') {
      setDeliveryTypeStatus(false);
      dispatch(
        updateDeliveryAddress({
          ...deliveryAddress,
        }),
      );
    }
    if (shipping === 'CourierDeliveryKyiv') {
      setDeliveryTypeStatus(true);
    }
  }, [shipping]);

  // LOGIC Delivery to the post office

  const handleDeliveryAddress = event => {
    const { name } = event.target;
    const { value } = event.target;
    const regex = /\d+/g;
    const postal = value.match(regex);
    if (name === 'city') {
      dispatch(
        updateDeliveryAddress({
          ...deliveryAddress,
          city: value,
          postal: postal[0],
        }),
      );
    }
    if (name === 'office') {
      dispatch(
        updateDeliveryAddress({
          ...deliveryAddress,
          address: value,
        }),
      );
    }
  };

  // LOGIC Courier Delivery to the address

  const [inputErrorStatus, setInputErrorStatus] = React.useState(false);

  const handleChangeInput = value => {
    dispatch(
      updateDeliveryAddress({
        ...deliveryAddress,
        address: value,
      }),
    );
    if (value.length > 0) {
      setInputErrorStatus(false);
    }
    if (value.length <= 0) {
      setInputErrorStatus(true);
    }
  };

  const handleDeliveryType = event => {
    const { value } = event.target;
    dispatch(updateShipping(value));
    if (value === 'CourierDeliveryKyiv') {
      dispatch(
        updateDeliveryAddress({
          ...deliveryAddress,
          city: 'Kyiv 01000',
          address: '',
          postal: '01000',
        }),
      );
      setInputErrorStatus(true);
    }
  };

  React.useEffect(() => {
    if (shipping === 'PostOfficeDelivery') {
      setInputErrorStatus(false);
    }
  }, [shipping]);

  // LOGIC Payment

  const handleChangePayment = event => {
    dispatch(updatePaymentInfo(event.target.value));
  };

  // LOGIC Continue Button

  const deliveryStatus = Boolean(
    deliveryAddress.country &&
      deliveryAddress.city &&
      deliveryAddress.address &&
      deliveryAddress.postal,
  );
  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  const mainStatus = Boolean(deliveryStatus && shipping && paymentInfo);

  React.useEffect(() => {
    if (mainStatus) {
      dispatch(dispatch(updateDeliveryPaymentStatus(true)));
    }
    if (!mainStatus) {
      dispatch(dispatch(updateDeliveryPaymentStatus(false)));
    }
  }, [mainStatus]);

  // Responsive Logic
  const [isSmallScreen, setIsSmallScreen] = useState(false);
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
          deliveryType: '',
          city: '',
          office: '',
          price: '',
          duration: '',
        }}
      >
        <Form>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Delivery options</Typography>
          </Box>
          <Divider />
          <RadioGroup
            name="deliveryType"
            value={shipping}
            onChange={handleDeliveryType}
            sx={{ margin: '15px auto' }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                alignItems: isSmallScreen ? 'stretch' : 'center',
                pb: 3,
              }}
            >
              <FormControlLabel
                value="PostOfficeDelivery"
                control={<Radio />}
                label="Delivery to the post office"
              />
              <Box
                sx={{
                  pl: 2,
                  display: 'flex',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  justifyContent: isSmallScreen
                    ? 'space-between'
                    : 'space-around',
                  width: '100%',
                }}
              >
                <Select
                  name="city"
                  value={deliveryTypeStatus ? '' : deliveryAddress.city}
                  onChange={handleDeliveryAddress}
                  displayEmpty
                  sx={{ minWidth: '120px', margin: '10px 0' }}
                  disabled={deliveryTypeStatus}
                >
                  <MenuItem value="" disabled>
                    City
                  </MenuItem>
                  <MenuItem value="Kyiv 01000">Kyiv</MenuItem>
                  <MenuItem value="Kharkiv 61000">Kharkiv</MenuItem>
                  <MenuItem value="Lviv 79000">Lviv</MenuItem>
                  <MenuItem value="Dnipropetrovsk 49000">
                    Dnipropetrovsk
                  </MenuItem>
                  <MenuItem value="Donetsk 83000">Donetsk</MenuItem>
                  <MenuItem value="Odesa 65000">Odesa</MenuItem>
                  <MenuItem value="Sevastopol 99000">Sevastopol</MenuItem>
                </Select>
                <Select
                  name="office"
                  value={deliveryTypeStatus ? '' : deliveryAddress.address}
                  onChange={handleDeliveryAddress}
                  displayEmpty
                  sx={{ minWidth: '200px', margin: '10px 0' }}
                  disabled={deliveryTypeStatus}
                >
                  <MenuItem value="" disabled>
                    Post Office
                  </MenuItem>
                  <MenuItem value="officeAdress1">Office 1</MenuItem>
                  <MenuItem value="officeAdress2">Office 2</MenuItem>
                  <MenuItem value="officeAdress3">Office 3</MenuItem>
                </Select>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                  }}
                >
                  <Typography variant="subtitle2">
                    Cost of delivery: 5$
                  </Typography>
                  <Typography variant="subtitle2">
                    Delivery duration: 3-4 days
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: isSmallScreen ? 'column' : 'row',
                alignItems: isSmallScreen ? 'stretch' : 'center',
                pb: 3,
              }}
            >
              <FormControlLabel
                value="CourierDeliveryKyiv"
                control={<Radio />}
                label="Courier"
              />
              <Box
                sx={{
                  pl: 2,
                  display: 'flex',
                  flexDirection: isSmallScreen ? 'column' : 'row',
                  justifyContent: isSmallScreen
                    ? 'space-between'
                    : 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Typography variant="subtitle2">
                  *Delivery only available in Kiev
                </Typography>
                <TextField
                  name="inputAddress"
                  label="Address"
                  variant="outlined"
                  error={inputErrorStatus}
                  helperText={inputErrorStatus ? 'Enter address!' : ''}
                  onChange={e => handleChangeInput(e.target.value)}
                  disabled={!deliveryTypeStatus}
                />
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-evenly',
                    mt: 1,
                  }}
                >
                  <Typography variant="subtitle2">
                    Cost of delivery: 5$
                  </Typography>
                  <Typography variant="subtitle2">
                    Delivery duration: on the same day
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: 2, mb: 2 }}>
              <Typography variant="h6">Payment options</Typography>
            </Box>
            <Divider />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <FormControl
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <RadioGroup
                  name="paymentMethod"
                  value={paymentInfo ?? 'payment-upon-delivery'}
                  onChange={handleChangePayment}
                >
                  <FormControlLabel
                    value="payment-upon-delivery"
                    control={<Radio />}
                    label="Payment upon delivery"
                  />
                  <FormControlLabel
                    value="payment-by-card"
                    control={<Radio />}
                    label="Payment by card"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </RadioGroup>
        </Form>
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
          disabled={!mainStatus}
          onClick={() => {
            handelContinue();
          }}
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

DeliveryPaymentInfo.propTypes = {
  handelContinue: PropTypes.func.isRequired,
};

export default DeliveryPaymentInfo;
