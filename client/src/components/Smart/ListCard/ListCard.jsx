import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import style from './ListCard.module.scss';

import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/cartLocal';

import {
  setSelectedProductsFav,
  stateSelectedProductsFav,
} from '../../../redux/slices/wishList';

import {
  cartBackState,
  fetchAddProductsCart,
  increaseTotalQuantity,
} from '../../../redux/slices/cartBackEnd';

import { isAuthenticated } from '../../../helpers/authentication/authentication';

function ListCard({
  product,
  name,
  currentPrice,
  imageUrl,
  itemNo,
  lg,
  md,
  sm,
}) {
  const dispatch = useDispatch();

  // *** Not authorized logic ***

  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    setIsFavorite(Boolean(isExist));
  }, ['favorites', selectedProductsFav]);

  const handleBuyNow = (e, params) => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(params);
    dispatch(setSelectedProducts(data));
    setIsDisabled(true);
    // localStorage.setItem(params.itemNo, JSON.stringify(true));
  };

  const handleAddToFav = params => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(params);
    dispatch(setSelectedProductsFav(data));
  };

  const handleRemoveFromFav = params => {
    const data = selectedProductsFav.filter(
      item => item.itemNo !== params.itemNo,
    );
    dispatch(setSelectedProductsFav(data));
    setIsFavorite(false);
  };

  const handleToggleFavorite = () => {
    if (isFavorite) {
      handleRemoveFromFav(product);
      localStorage.removeItem(product.itemNo);
    } else {
      handleAddToFav(product);
      localStorage.setItem('favorites', JSON.stringify(product));
    }
  };

  // *** AUTHORIZED logic ***
  const isAuth = isAuthenticated();

  const handleBuyCartBack = (e, prodId) => {
    dispatch(fetchAddProductsCart({ productId: prodId }));
    dispatch(increaseTotalQuantity());
    setIsDisabled(true);
  };

  // logic isDisabled button

  const { productsCartBack } = useSelector(cartBackState);

  useEffect(() => {
    if (isAuth) {
      if (productsCartBack) {
        setIsDisabled(
          productsCartBack.some(item => item.product.itemNo === product.itemNo),
        );
      }
    } else {
      setIsDisabled(
        selectedProducts.some(item => item.itemNo === product.itemNo),
      );
    }
  }, [selectedProducts, isAuth, productsCartBack, product.itemNo]);

  // Logic added BrowsingHistory

  // rewrite and use data in url

  const handleAddBrowsingHistory = () => {
    const prodBrowsingHistory = JSON.parse(
      localStorage.getItem('prodBrowsingHistory') || '[]',
    );

    if (prodBrowsingHistory.length === 4) {
      prodBrowsingHistory.pop();
    }

    prodBrowsingHistory.unshift(product);

    localStorage.setItem(
      'prodBrowsingHistory',
      JSON.stringify(prodBrowsingHistory),
    );
  };

  const isMobile = useMediaQuery('(max-width:1170px)');

  return (
    <Grid
      item
      xs={12}
      sm={sm}
      md={md}
      lg={lg}
      style={isMobile ? {} : { maxHeight: '440px' }}
    >
      {' '}
      <Stack spacing={4}>
        <Card className={style.card}>
          <NavLink
            to={`/products/${itemNo}`}
            className={style.mainLink}
            onClick={isAuth && handleAddBrowsingHistory}
          >
            <CardMedia
              className={style.cardMedia}
              component="img"
              image={imageUrl}
              alt={name}
            />
          </NavLink>
          <CardContent className={style.cardContent}>
            <NavLink
              to={`/products/${itemNo}`}
              className={style.mainLink}
              onClick={isAuth && handleAddBrowsingHistory}
            >
              <div className={style.typography}>
                <Typography variant="p">{name}</Typography>
                <Typography variant="p">{currentPrice}$</Typography>
              </div>
            </NavLink>
            <div className={style.cardIcon}>
              <ButtonDark
                label={isDisabled ? 'Added' : 'BUY NOW'}
                disabled={isDisabled}
                onClick={
                  isAuth
                    ? e => handleBuyCartBack(e, product._id)
                    : e => handleBuyNow(e, product)
                }
              />
              <button
                className={style.cardFavButton}
                type="button"
                onClick={handleToggleFavorite}
              >
                {isFavorite ? (
                  <FavoriteIcon style={{ color: 'red' }} />
                ) : (
                  <FavoriteIcon />
                )}
              </button>
            </div>
          </CardContent>
        </Card>
      </Stack>
    </Grid>
  );
}

ListCard.defaultProps = {
  name: 'iPhone 14 Pro Max',
  currentPrice: 1000,
  imageUrl: './logo2.png',
  itemNo: '00000',
  lg: 4,
  md: 4,
  sm: 6,
};

ListCard.propTypes = {
  product: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.number,
    ]),
  ).isRequired,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  imageUrl: PropTypes.string,
  itemNo: PropTypes.string,
  lg: PropTypes.number,
  md: PropTypes.number,
  sm: PropTypes.number,
};

export default ListCard;
