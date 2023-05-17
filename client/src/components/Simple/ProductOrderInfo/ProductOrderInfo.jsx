import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Stack, Typography, Divider, Box } from '@mui/material';
import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import {
  stateSelectedProducts,
  toggleDrawer,
} from '../../../redux/slices/shopping-cart';
import FooterShoppingCart from '../FooterShoppingCart/FooterShoppingCart';
import style from './ProductOrderInfo.module.scss';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import { checkoutState } from '../../../redux/slices/checkout';

function ProductOrderInfo() {
  const selectedProducts = useSelector(stateSelectedProducts);
  const result = selectedProducts.reduce(
    (previousValue, currentItem) =>
      previousValue + currentItem.quantityCart * currentItem.currentPrice,
    0,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  //  Logic OrderInfo
  // Contact Form
  const { contactsForm, contactsFormStatus } = useSelector(checkoutState);
  const [contactsInfo, setContactsInfo] = useState(null);

  useEffect(() => {
    if (contactsFormStatus) {
      setContactsInfo(contactsForm);
    }
  }, [contactsForm, contactsFormStatus]);

  // Delivery and payment

  const { deliveryAddress, shipping, paymentInfo, deliveryPaymentStatus } =
    useSelector(checkoutState);
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  useEffect(() => {
    if (deliveryPaymentStatus) {
      setDeliveryInfo(deliveryAddress);
    }
    if (shipping === 'CourierDeliveryKyiv') {
      setDeliveryMethod('Courier for Kyiv');
    }
    if (shipping === 'PostOfficeDelivery') {
      setDeliveryMethod('Delivery by mail to the office');
    }
    if (paymentInfo === 'payment-upon-delivery') {
      setPaymentMethod('Cash on delivery');
    }
    if (paymentInfo === 'payment-by-card') {
      setPaymentMethod('Payment by bank card');
    }
  }, [deliveryAddress, shipping, paymentInfo, deliveryPaymentStatus]);

  // Order

  const [order, setOder] = useState({
    products: [],
    deliveryAddress: {
      country: '',
      city: '',
      address: '',
      postal: '',
    },
    shipping: '',
    paymentInfo: '',
    status: 'not shipped',
    email: '',
    mobile: '',
    letterSubject: 'Thank you for order! You are welcome!',
    letterHtml: `<h1>Your order is placed.</h1>`,
  });

  useEffect(() => {
    if (contactsFormStatus && deliveryPaymentStatus && selectedProducts) {
      setOder({
        ...order,
        deliveryAddress: {
          ...order.deliveryAddress,
          country: deliveryAddress.country,
          city: deliveryAddress.city.split(' ').shift(),
          address: deliveryAddress.address,
          postal: deliveryAddress.postal,
        },
        shipping: deliveryMethod,
        paymentInfo: paymentMethod,
        status: 'not shipped',
        email: contactsForm.email,
        mobile: contactsForm.phoneNumber,
        letterSubject: 'Thank you for order! You are welcome!',
        letterHtml: `<h1>Your order is placed.</h1><p>City:${deliveryAddress.city
          .split(' ')
          .shift()}. Address: ${deliveryAddress.address}
          Payment amount: ${result}</p>`,
        products: selectedProducts,
      });
    }
  }, [
    contactsForm,
    deliveryAddress,
    deliveryMethod,
    paymentMethod,
    deliveryPaymentStatus,
    contactsFormStatus,
  ]);

  const handleConfirmOrder = () => {
    console.log('Order>>>>', order);
  };

  const confirmOrderStatus = Boolean(
    deliveryPaymentStatus && contactsFormStatus,
  );

  // Logic small Screen

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
    <Grid container className={style.container}>
      <Grid item xs={isSmallScreen ? 12 : 6} className={style.ItemContainer}>
        <Typography variant="h6" className={style.title}>
          Cart Products
        </Typography>
        <Divider />
        <ShoppingCartItem
          items={selectedProducts}
          buttonDisplay
          quantityDisplay
        />
        <FooterShoppingCart amount={result} />
      </Grid>
      <Grid item xs={isSmallScreen ? 12 : 6} className={style.ItemContainer}>
        <Typography variant="h6" className={style.title}>
          Order Information
        </Typography>
        <Divider />
        <Box className={style.section__contacts}>
          <Typography variant="h6" className={style.section__contacts__tittle}>
            Contacts:
          </Typography>
          <Typography className={style.section__contacts__info} variant="p">
            Name: {contactsInfo ? contactsInfo.firstName : 'Not entered'}
          </Typography>
          <Typography className={style.section__contacts__info} variant="p">
            Surname: {contactsInfo ? contactsInfo.lastName : 'Not entered'}
          </Typography>
          <Typography className={style.section__contacts__info} variant="p">
            Email: {contactsInfo ? contactsInfo.email : 'Not entered'}
          </Typography>
          <Typography className={style.section__contacts__info} variant="p">
            PhoneNumber:
            {contactsInfo ? contactsInfo.phoneNumber : 'Not entered'}
          </Typography>
        </Box>
        <Divider />
        <Box className={style.section__delivery}>
          <Typography variant="h6" className={style.section__delivery__tittle}>
            Delivery and Payment:
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Country: {deliveryInfo ? deliveryInfo.country : 'Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            City:{' '}
            {deliveryInfo
              ? deliveryInfo.city.split(' ').shift()
              : 'Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Address: {deliveryInfo ? deliveryInfo.address : 'Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Postal:
            {deliveryInfo ? deliveryInfo.postal : 'Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Delivery method:
            {deliveryMethod ?? 'Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Payment method:
            {paymentMethod ?? 'Not entered'}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12}>
        <Stack
          sx={{
            padding: isSmallScreen ? '30px 20px' : '50px 20px',
          }}
          direction="column"
          spacing={3}
        >
          <ButtonsCheckoutPage
            label="Confirm order"
            variant="contained"
            size="large"
            disabled={!confirmOrderStatus}
            onClick={handleConfirmOrder}
          />
          <ButtonsCheckoutPage
            label="Back to Cart"
            variant="outlined"
            size="large"
            onClick={handelBackToCart}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
export default ProductOrderInfo;
