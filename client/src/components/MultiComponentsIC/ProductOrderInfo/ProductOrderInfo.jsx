import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Stack, Typography, Divider, Box } from '@mui/material';
import ShoppingCartItem from '../../Smart/ShoppingCartItem/ShoppingCartItem';
import {
  stateSelectedProducts,
  toggleDrawer,
} from '../../../redux/slices/cartLocal';
import FooterShoppingCart from '../../Simple/FooterShoppingCart/FooterShoppingCart';
import style from './ProductOrderInfo.module.scss';
import ButtonsCheckoutPage from '../../UI/Buttons/ButtonsCheckoutPage/ButtonsCheckoutPage';
import { checkoutState, fetchNewOrder } from '../../../redux/slices/checkout';
import { cartBackState } from '../../../redux/slices/cartBackEnd';

import { isAuthenticated } from '../../../helpers/authentication/authentication';

function ProductOrderInfo() {
  const isAuth = isAuthenticated();
  const { productsCartBack } = useSelector(cartBackState);
  const selectedProducts = useSelector(stateSelectedProducts);

  const result = isAuth
    ? productsCartBack &&
      productsCartBack.reduce((acc, prod) => {
        return acc + prod.product.currentPrice * prod.cartQuantity;
      }, 0)
    : selectedProducts &&
      selectedProducts.reduce(
        (previousValue, currentItem) =>
          previousValue + currentItem.quantityCart * currentItem.currentPrice,
        0,
      );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handelBackToCart = () => {
    dispatch(toggleDrawer(true));
  };

  //  Logic OrderInfo
  // Contact Form
  const { contactsForm, contactsFormStatus } = useSelector(checkoutState);

  const nameBool = Boolean(contactsForm.firstName.length > 0);
  const surnameBool = Boolean(contactsForm.lastName.length > 0);
  const emailBool = Boolean(contactsForm.email.length > 0);
  const phoneBool = Boolean(contactsForm.phoneNumber.length > 0);

  // Delivery and payment

  const { deliveryAddress, shipping, paymentInfo, deliveryPaymentStatus } =
    useSelector(checkoutState);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const countryBool = Boolean(deliveryAddress.country.length > 0);
  const cityBool = Boolean(deliveryAddress.city.length > 0);
  const addressBool = Boolean(deliveryAddress.address.length > 0);
  const postalBool = Boolean(deliveryAddress.postal.length > 0);

  useEffect(() => {
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
  }, [shipping, paymentInfo]);

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
        letterSubject: `Dear ${contactsForm.firstName} , Thank you for order!`,
        letterHtml: `<h1>Your order is placed.</h1>
        <p>Delivery city: ${deliveryAddress.city.split(' ').shift()}.</p> 
        <p>Delivery Address: ${deliveryAddress.address}</p>
        <p>Payment amount: ${result}$</p>
        <p>We are glad that You choose us! See You soon!</p>`,
        products: isAuth
          ? productsCartBack && productsCartBack
          : selectedProducts.map(prod => {
              return { product: prod, cartQuantity: prod.quantityCart };
            }),
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
    navigate('/successful-order');
    dispatch(fetchNewOrder(order));
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
        {isAuth ? (
          productsCartBack &&
          productsCartBack.map(prod => (
            <ShoppingCartItem
              key={prod.product.itemNo}
              items={null}
              itemBack={prod.product}
              cartBackId={prod._id}
              cartBackQuantity={prod.cartQuantity}
              buttonDisplay
              quantityDisplay
            />
          ))
        ) : (
          <ShoppingCartItem
            items={selectedProducts}
            buttonDisplay
            quantityDisplay
          />
        )}

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
          <Typography
            className={style.section__contacts__info}
            style={!nameBool ? { color: 'red' } : {}}
            variant="p"
          >
            Name: {nameBool ? contactsForm.firstName : ' Not entered'}
          </Typography>
          <Typography
            className={style.section__contacts__info}
            style={!surnameBool ? { color: 'red' } : {}}
            variant="p"
          >
            Surname: {surnameBool ? contactsForm.lastName : ' Not entered'}
          </Typography>
          <Typography
            className={style.section__contacts__info}
            style={!emailBool ? { color: 'red' } : {}}
            variant="p"
          >
            Email: {emailBool ? contactsForm.email : ' Not entered'}
          </Typography>
          <Typography
            className={style.section__contacts__info}
            style={!phoneBool ? { color: 'red' } : {}}
            variant="p"
          >
            PhoneNumber:
            {phoneBool ? contactsForm.phoneNumber : ' Not entered'}
          </Typography>
        </Box>
        <Divider />
        <Box className={style.section__delivery}>
          <Typography variant="h6" className={style.section__delivery__tittle}>
            Delivery and Payment:
          </Typography>
          <Typography
            className={style.section__delivery__info}
            style={!countryBool ? { color: 'red' } : {}}
            variant="p"
          >
            Country: {countryBool ? deliveryAddress.country : ' Not entered'}
          </Typography>
          <Typography
            className={style.section__delivery__info}
            style={!cityBool ? { color: 'red' } : {}}
            variant="p"
          >
            City:{' '}
            {cityBool
              ? deliveryAddress.city.split(' ').shift()
              : ' Not entered'}
          </Typography>
          <Typography
            className={style.section__delivery__info}
            style={!addressBool ? { color: 'red' } : {}}
            variant="p"
          >
            Address: {addressBool ? deliveryAddress.address : ' Not entered'}
          </Typography>
          <Typography
            className={style.section__delivery__info}
            style={!postalBool ? { color: 'red' } : {}}
            variant="p"
          >
            Postal:
            {postalBool ? deliveryAddress.postal : ' Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Delivery method:
            {deliveryMethod ?? ' Not entered'}
          </Typography>
          <Typography className={style.section__delivery__info} variant="p">
            Payment method:
            {paymentMethod ?? ' Not entered'}
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
