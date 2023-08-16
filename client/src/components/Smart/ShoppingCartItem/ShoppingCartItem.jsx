import { Close } from '@mui/icons-material';
import { Box, Button, Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  setSelectedProducts,
  stateSelectedProducts,
} from '../../../redux/slices/cartLocal';
import style from './ShoppingCartItem.module.scss';

import { isAuthenticated } from '../../../helpers/authentication/authentication';

const itemPropType = PropTypes.shape({
  _id: PropTypes.string,
  name: PropTypes.string,
  currentPrice: PropTypes.number,
  imageUrls: PropTypes.arrayOf(PropTypes.string),
  count: PropTypes.number,
  itemNo: PropTypes.string,
});

const itemsPropType = PropTypes.arrayOf(itemPropType);

// TODO: refactoring component !!!

function ShoppingCartItem({
  buttonDisplay,
  quantityDisplay,
  searchSettings,
  items,
  remove,
  increase,
  decrease,
  addItemBack,
  itemBack,
  cartBackQuantity,
  removeBack,
  increaseBack,
  decreaseBack,
  popperClose,
}) {
  const isAuth = isAuthenticated();
  const dispatch = useDispatch();
  const selectedProducts = useSelector(stateSelectedProducts);
  const handleBuyNow = (e, params) => {
    e.stopPropagation();

    const isExist = selectedProducts.find(
      item => item.itemNo === params.itemNo,
    );
    if (isExist) return;

    const data = selectedProducts.concat(params);
    dispatch(setSelectedProducts(data));
  };
  if (!isAuth || searchSettings) {
    return (
      <div className={style.wrapper}>
        {items?.map(item => (
          <div className={style.items} key={item.itemNo}>
            <NavLink to={`/products/${item.itemNo}`} onClick={popperClose}>
              <img className={style.image} src={item.imageUrls[0]} alt="img" />
            </NavLink>
            <div className={style.position}>
              <Box className={style.info}>
                <NavLink
                  to={`/products/${item.itemNo}`}
                  style={{ color: '#000000', textDecoration: 'none' }}
                >
                  <Typography className={style.name}>{item.name}</Typography>
                </NavLink>
                <Typography className={style.price}>
                  Price: ${item.currentPrice}
                </Typography>
              </Box>
              <div>
                <div className={style.location}>
                  <div>
                    <Box className={style.buttons}>
                      <Button
                        className={`${
                          buttonDisplay ? style.buttonsNone : style.button
                        }`}
                        style={{ width: searchSettings ? '150px' : '' }}
                        sx={{
                          backgroundColor: '#A9A9A9',
                          fontSize: 20,
                        }}
                        size="small"
                        onClick={
                          searchSettings
                            ? e =>
                                isAuth
                                  ? addItemBack(item._id)
                                  : [handleBuyNow(e, item), popperClose()]
                            : () => decrease(item.itemNo, item.quantityCart)
                        }
                      >
                        {searchSettings ? 'Buy now' : '-'}
                      </Button>
                      <p
                        className={searchSettings ? style.itemNone : style.item}
                      >
                        {quantityDisplay
                          ? `Qty: ${item.quantityCart}`
                          : item.quantityCart}
                      </p>
                      <Button
                        className={`${
                          buttonDisplay || searchSettings
                            ? style.buttonsNone
                            : style.button
                        }`}
                        sx={{
                          backgroundColor: '#A9A9A9',
                          fontSize: 25,
                        }}
                        onClick={() => increase(item.itemNo)}
                      >
                        +
                      </Button>
                    </Box>
                  </div>
                  <div className={style.delete}>
                    <Button
                      className={`${
                        buttonDisplay || searchSettings
                          ? style.buttonsNone
                          : style.button
                      }`}
                      sx={{ fontSize: 15 }}
                      onClick={() => remove(item.itemNo)}
                    >
                      <Close />
                    </Button>
                  </div>
                </div>
              </div>
              <Divider />
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (isAuth && !searchSettings) {
    return (
      <div className={style.wrapper}>
        <div className={style.items}>
          <NavLink to={`/products/${itemBack.itemNo}`} onClick={popperClose}>
            <img
              className={style.image}
              src={itemBack.imageUrls[0]}
              alt="img"
            />
          </NavLink>
          <div className={style.position}>
            <Box className={style.info}>
              <NavLink
                to={`/products/${itemBack.itemNo}`}
                onClick={popperClose}
                style={{ color: '#000000', textDecoration: 'none' }}
              >
                <Typography className={style.name}>{itemBack.name}</Typography>
              </NavLink>
              <Typography className={style.price}>
                Price: ${itemBack.currentPrice}
              </Typography>
            </Box>
            <div>
              <div className={style.location}>
                <div>
                  <Box className={style.buttons}>
                    <Button
                      className={`${
                        buttonDisplay ? style.buttonsNone : style.button
                      }`}
                      sx={{
                        backgroundColor: '#A9A9A9',
                        fontSize: 20,
                      }}
                      size="small"
                      onClick={() =>
                        decreaseBack(itemBack._id, cartBackQuantity)
                      }
                    >
                      -
                    </Button>
                    <p className={searchSettings ? style.itemNone : style.item}>
                      {quantityDisplay
                        ? `Qty: ${cartBackQuantity}`
                        : cartBackQuantity}
                    </p>
                    <Button
                      className={`${
                        buttonDisplay || searchSettings
                          ? style.buttonsNone
                          : style.button
                      }`}
                      sx={{
                        backgroundColor: '#A9A9A9',
                        fontSize: 25,
                      }}
                      onClick={() => increaseBack(itemBack._id)}
                    >
                      +
                    </Button>
                  </Box>
                </div>
                <div className={style.delete}>
                  <Button
                    className={`${
                      buttonDisplay || searchSettings
                        ? style.buttonsNone
                        : style.button
                    }`}
                    sx={{ fontSize: 15 }}
                    onClick={() => removeBack(itemBack._id)}
                  >
                    <Close />
                  </Button>
                </div>
              </div>
            </div>
            <Divider />
          </div>
        </div>
      </div>
    );
  }
}

ShoppingCartItem.defaultProps = {
  buttonDisplay: false,
  searchSettings: false,
  items: {
    _id: null,
    name: null,
    price: null,
    img: null,
    count: null,
  },
  quantityDisplay: false,
  itemBack: {
    _id: null,
    name: null,
    price: null,
    img: null,
    count: null,
  },
  remove: null,
  increase: null,
  decrease: null,
  cartBackQuantity: null,
  increaseBack: null,
  decreaseBack: null,
  removeBack: null,
  addItemBack: null,
  popperClose: null,
};

ShoppingCartItem.propTypes = {
  buttonDisplay: PropTypes.bool,
  quantityDisplay: PropTypes.bool,
  searchSettings: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  items: itemsPropType,
  remove: PropTypes.func,
  increase: PropTypes.func,
  decrease: PropTypes.func,
  itemBack: itemPropType,
  cartBackQuantity: PropTypes.number,
  increaseBack: PropTypes.func,
  decreaseBack: PropTypes.func,
  removeBack: PropTypes.func,
  addItemBack: PropTypes.func,
  popperClose: PropTypes.func,
};

export default ShoppingCartItem;
