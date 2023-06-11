import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import MainCardSlider from '../../Simple/MainCardSlider/MainCardSlider';
import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';
import style from './MainCard.module.scss';
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

function MainCard({
  product,
  imageUrls,
  name,
  currentPrice,
  color,
  description,
}) {
  const dispatch = useDispatch();

  // *** Not authorized logic ***

  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    setIsFavorite(Boolean(isExist));
  }, ['favorites', selectedProductsFav]);

  const handleBuyNow = e => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(product);
    dispatch(setSelectedProducts(data));
  };
  const handleAddToFav = () => {
    const isExist = selectedProductsFav.find(
      item => item.itemNo === product.itemNo,
    );
    if (isExist) return;

    const data = selectedProductsFav.concat(product);
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
  const location = useLocation();

  const handleBuyCartBack = () => {
    if (isDisabled) {
      return;
    }
    dispatch(fetchAddProductsCart({ productId: product._id }));
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
  }, [
    selectedProducts,
    isAuth,
    productsCartBack,
    location.pathname,
    product.itemNo,
  ]);

  return (
    <Card className={style.card}>
      <MainCardSlider imageUrls={imageUrls} />
      <CardContent className={style.cardContent}>
        <div className={style.typography}>
          <Typography variant="p">{name}</Typography>
          <Typography variant="p">{currentPrice}$</Typography>
        </div>
        <div className={style.cardDescrip}>
          <Typography variant="p">Color: {color}</Typography>
          <Typography variant="p">{description}</Typography>
        </div>
        <div className={style.cardIcon}>
          <NavLink onClick={isAuth ? handleBuyCartBack : handleBuyNow}>
            <ButtonDark
              label={isDisabled ? 'Added' : 'BUY NOW'}
              disabled={isDisabled}
              style={{ fontWeight: 800, fontSize: 25 }}
            />
          </NavLink>
          <button
            className={style.cardFavButton}
            type="button"
            onClick={handleToggleFavorite}
          >
            {isFavorite ? (
              <FavoriteIcon
                style={{ color: 'red', width: 55, height: 55, borderRadius: 5 }}
              />
            ) : (
              <FavoriteIcon
                style={{
                  width: 55,
                  height: 55,
                  borderRadius: 5,
                }}
              />
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

MainCard.defaultProps = {
  name: 'iPhone 14 Pro Max',
  currentPrice: '1000$',
  description: 'Here is some cool product description',
  color: 'Here is some cool color',
};

MainCard.propTypes = {
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
  description: PropTypes.string,
  color: PropTypes.string,
  imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MainCard;
