import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Popper, Backdrop } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { fetchSearchProduct, searchState } from '../../../redux/slices/search';
import { stateSelectedProducts } from '../../../redux/slices/cartLocal';
import style from './InputNav.module.scss';

import ShoppingCartItem from '../ShoppingCartItem/ShoppingCartItem';
import {
  fetchAddProductsCart,
  increaseTotalQuantity,
} from '../../../redux/slices/cartBackEnd';

function InputNav({ label }) {
  const dispatch = useDispatch();
  const [prodArr, setProdArr] = useState([]);
  const prodQuantity = prodArr.length <= 0;

  const [searchStatusLocal, setSearchStatus] = useState(false);
  const { status, searchProducts } = useSelector(searchState);
  const selectedProducts = useSelector(stateSelectedProducts);

  const [anchorEl, setAnchorEl] = useState(null);

  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleFetchSearch = debounce(event => {
    const inputElement = event.target;
    const inputValue = inputElement.value;
    if (inputValue) {
      const data = {
        query: inputValue,
      };
      dispatch(fetchSearchProduct(data));
      setSearchStatus(false);
    }
    if (inputValue === '') {
      setSearchStatus(true);
    }
  }, 1500);

  const handleInputClick = event => {
    if (!searchStatusLocal) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handlePopperClose = () => {
    setTimeout(() => {
      setAnchorEl(null);
    }, 150);
  };

  const open = Boolean(anchorEl);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(searchProducts);
    }
  }, [status]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  // Auth addCartBack

  const handleIncreaseCountBack = prodId => {
    dispatch(fetchAddProductsCart({ productId: prodId }));
    dispatch(increaseTotalQuantity());
  };

  return (
    <div className={style.root}>
      <form
        className={style.form}
        onSubmit={e => {
          e.preventDefault();
        }}
      >
        <div className={style.group}>
          <input
            className={style.input}
            id="search"
            type="text"
            required
            onFocus={handleInputClick}
            onChange={event => handleFetchSearch(event)}
          />
          <span className={style.bar}>{}</span>
          <label className={style.label}>
            {searchStatusLocal ? 'Search' : label}
          </label>
        </div>
      </form>
      <Popper
        className={style.popper}
        open={open}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        {status === 'loading' || prodQuantity ? (
          <div className={style.wrapper}>
            <p>Ooops...</p>
            <p>Product not found</p>
            <SentimentVeryDissatisfiedIcon fontSize="large" />
          </div>
        ) : (
          <ShoppingCartItem
            items={prodArr}
            searchSettings="false"
            sx={{ fontSize: 15 }}
            addItemBack={handleIncreaseCountBack}
            popperClose={handlePopperClose}
          />
        )}
      </Popper>
      <Backdrop
        open={open}
        onClick={handlePopperClose}
        style={{
          zIndex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          height: '100%',
          marginTop: '150px',
          marginBottom: '0px',
        }}
      />
    </div>
  );
}

InputNav.defaultProps = {
  label: 'Search',
};

InputNav.propTypes = {
  label: PropTypes.string,
};
export default InputNav;
