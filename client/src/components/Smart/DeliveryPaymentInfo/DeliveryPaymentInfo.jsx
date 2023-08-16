import {
  Box,
  Divider,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Form, Formik } from 'formik';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDrawer } from '../../../redux/slices/cartLocal';
import {
  checkoutState,
  updateDeliveryAddress,
  updateDeliveryPaymentStatus,
  updatePaymentInfo,
  updateShipping,
} from '../../../redux/slices/checkout';

import {
  fetchNovaPost,
  novaPostState,
  updateWarehousesCity,
} from '../../../redux/slices/novaPost';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import PaymentCard from '../PaymentCard/PaymentCard';

function DeliveryPaymentInfo({ handelContinue }) {
  const dispatch = useDispatch();

  // NovaPost logic

  const { warehouses, warehousesCity } = useSelector(novaPostState);
  const [warehousesLocal, setWarehousesLocal] = useState(null);

  useEffect(() => {
    if (warehouses) {
      setWarehousesLocal(warehouses);
    }
  }, [warehouses]);

  const [viewWarehouses, setViewWarehouses] = useState(20);

  const handleScroll = event => {
    const container = event.target;
    if (
      container.scrollTop + container.clientHeight ===
      container.scrollHeight
    ) {
      setViewWarehouses(viewWarehouses + 20);
    }
  };

  useEffect(() => {
    if (viewWarehouses !== 20)
      dispatch(
        fetchNovaPost({
          fetchLimit: viewWarehouses,
          fetchCity: warehousesCity,
        }),
      );
  }, [viewWarehouses]);

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
    // update logic
    // create object with value
    // then using keys when you select option
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
      if (value === 'Kyiv 01000') {
        dispatch(fetchNovaPost({ fetchCity: 'Київ', fetchLimit: 20 }));
        dispatch(updateWarehousesCity('Київ'));
        setViewWarehouses(20);
      }
      if (value === 'Kharkiv 61000') {
        dispatch(
          fetchNovaPost({
            fetchCity: 'Харків',
            fetchLimit: 20,
          }),
        );
        dispatch(updateWarehousesCity('Харків'));
        setViewWarehouses(20);
      }
      if (value === 'Lviv 79000') {
        dispatch(fetchNovaPost({ fetchCity: 'Львів', fetchLimit: 20 }));
        dispatch(updateWarehousesCity('Львів'));
        setViewWarehouses(20);
      }
      if (value === 'Dnipro 49000') {
        dispatch(fetchNovaPost({ fetchCity: 'Дніпро', fetchLimit: 20 }));
        dispatch(updateWarehousesCity('Дніпро'));
        setViewWarehouses(20);
      }
      if (value === 'Odesa 65000') {
        dispatch(fetchNovaPost({ fetchCity: 'Одеса', fetchLimit: 20 }));
        dispatch(updateWarehousesCity('Одеса'));
        setViewWarehouses(20);
      }
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
  const [paymentMethod, setPaymentMethod] = useState('payment-upon-delivery');
  const handleChangePayment = event => {
    const { value } = event.target;
    setPaymentMethod(value);
    dispatch(updatePaymentInfo(value));
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
  const isSmallScreen = useMediaQuery('(max-width:500px)');
  const isMediumScreen = useMediaQuery('(max-width:900px)');

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
                flexDirection: isMediumScreen ? 'column' : 'row',
                alignItems: isMediumScreen ? 'stretch' : 'center',
                pb: 3,
              }}
            >
              <FormControlLabel
                value="PostOfficeDelivery"
                control={<Radio />}
                label="Delivery to the Nova Post Office"
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: isMediumScreen ? 'column' : 'row',
                  justifyContent: isMediumScreen
                    ? 'space-between'
                    : 'space-around',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                <Select
                  name="city"
                  value={deliveryTypeStatus ? '' : deliveryAddress.city}
                  onChange={handleDeliveryAddress}
                  displayEmpty
                  sx={{
                    width: isMediumScreen ? '100%' : '120px',
                    maxWidth: isSmallScreen ? '320px' : '380px',
                    margin: '10px 0',
                  }}
                  disabled={deliveryTypeStatus}
                >
                  <MenuItem value="" disabled>
                    City
                  </MenuItem>
                  <MenuItem value="Kyiv 01000">Kyiv</MenuItem>
                  <MenuItem value="Kharkiv 61000">Kharkiv</MenuItem>
                  <MenuItem value="Lviv 79000">Lviv</MenuItem>
                  <MenuItem value="Dnipro 49000">Dnipro</MenuItem>
                  <MenuItem value="Odesa 65000">Odesa</MenuItem>
                </Select>
                <Select
                  name="office"
                  value={deliveryTypeStatus ? '' : deliveryAddress.address}
                  onChange={event => {
                    handleDeliveryAddress(event);
                  }}
                  displayEmpty
                  sx={{
                    minWidth: '200px',
                    maxWidth: isSmallScreen ? '320px' : '380px',
                    width: '100%',
                    margin: '10px 0',
                  }}
                  disabled={deliveryTypeStatus}
                  MenuProps={{
                    PaperProps: {
                      style: { maxHeight: '300px', overflowX: 'scroll' },
                      onScroll: handleScroll,
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    Post Office
                  </MenuItem>
                  {warehousesLocal &&
                    warehousesLocal.map((office, index) => {
                      return (
                        <MenuItem
                          value={office.ShortAddress}
                          style={{ maxWidth: '300px', fontSize: '13px' }}
                          key={index}
                        >
                          {office.Description}
                        </MenuItem>
                      );
                    })}
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
                flexDirection: isMediumScreen ? 'column' : 'row',
                alignItems: isMediumScreen ? 'stretch' : 'center',
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
                  display: 'flex',
                  flexDirection: isMediumScreen ? 'column' : 'row',
                  justifyContent: isMediumScreen
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
                  sx={{
                    minWidth: '200px',
                    maxWidth: isSmallScreen ? '320px' : '380px',
                    width: '100%',
                    margin: '10px 0',
                  }}
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
            {paymentMethod === 'payment-by-card' && <PaymentCard />}
          </RadioGroup>
        </Form>
      </Formik>
      <Stack
        sx={{
          padding: isMediumScreen ? '30px 20px' : '50px 20px',
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
