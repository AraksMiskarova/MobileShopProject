import { React, useEffect, useState } from 'react';
import { Drawer, IconButton, Paper, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSearchProduct, searchState } from '../../../redux/slices/search';
import { fetchAddProductsCart } from '../../../redux/slices/cartBackEnd';
import ShoppingCartItem from '../../Smart/ShoppingCartItem/ShoppingCartItem';
import { stateSelectedProducts } from '../../../redux/slices/cartLocal';

function MobileModalSearch() {
  const dispatch = useDispatch();
  const [stateDraw, setStateDrawer] = useState(false);
  const [prodArr, setProdArr] = useState([]);
  const { status, searchProducts } = useSelector(searchState);
  const selectedProducts = useSelector(stateSelectedProducts);
  const prodQuantity = prodArr.length <= 0;

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
    }
  }, 1500);
  const handleOpen = () => {
    setStateDrawer(true);
  };

  const handleIncreaseCountBack = prodId => {
    dispatch(fetchAddProductsCart({ productId: prodId }));
  };

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(searchProducts);
    }
  }, [status]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SearchIcon style={{ color: '#ffffff', fontSize: 50 }} />
      </IconButton>
      <Drawer
        anchor="bottom"
        open={stateDraw}
        PaperProps={{
          style: { width: '100%', height: '100%', overflowY: 'auto' },
        }}
      >
        <Paper>
          <TextField
            style={{
              marginTop: '12px',
            }}
            id="outlined-basic"
            label="Enter product name"
            variant="standard"
            fullWidth
            InputLabelProps={{
              style: {
                marginLeft: '30px',
                fontSize: '23px',
                top: '-10px',
              },
            }}
            onChange={event => handleFetchSearch(event)}
          />
          <div
            style={{
              overflow: 'hidden',
            }}
          >
            {status === 'loading' || prodQuantity ? (
              <div
                style={{
                  marginLeft: 'auto',
                  marginRight: 'auto',
                  width: '100%',
                  textAlign: 'center',
                }}
              >
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
                popperClose={() => setStateDrawer(false)}
              />
            )}
          </div>
        </Paper>
        <IconButton
          style={{
            position: 'absolute',
            right: '0px',
          }}
          onClick={() => setStateDrawer(false)}
        >
          <Close />
        </IconButton>
      </Drawer>
    </>
  );
}

export default MobileModalSearch;
