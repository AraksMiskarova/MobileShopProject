import * as React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Container, useMediaQuery } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterProdState,
  setMostPrice,
  setLeastPrice,
  setViewCount,
} from '../../redux/slices/filterProducts';

// import { searchState } from '../../redux/slices/search';

import style from './ItemsList.module.scss';
import ListCard from '../../components/Smart/ListCard/ListCard';
import ListCardSkeleton from '../../components/Smart/ListCard/ListCardSkeleton';
import PhonesAccordion from '../../components/MultiComponentsIC/ProductAccordion/PhonesAccordion';
import AccessoriesAccordion from '../../components/MultiComponentsIC/ProductAccordion/AccessoriesAccordion';
import PaginationRounded from '../../components/Smart/Pagination/Pagination';
import { stateSelectedProducts } from '../../redux/slices/cartLocal';
import { stateSelectedProductsFav } from '../../redux/slices/wishList';
import { fetchCartProducts } from '../../redux/slices/cartBackEnd';

function ItemsListPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  // ALL FILTER LOGIC IS IN THE ACCORDION COMPONENT

  const [prodArr, setProdArr] = useState([]);
  const { status, products } = useSelector(filterProdState);
  const prodQuantity = prodArr <= 0;

  const selectedProducts = useSelector(stateSelectedProducts);
  const selectedProductsFav = useSelector(stateSelectedProductsFav);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    if (status === 'loaded') {
      setProdArr(products.products);
    }
  }, [status]);

  // Set View Setting
  const { viewCount } = useSelector(filterProdState);
  const [currentView, setCurrentView] = React.useState('9');

  React.useEffect(() => {
    if (viewCount) {
      setCurrentView(viewCount);
    }
  }, [viewCount]);

  const setViewProducts = e => {
    const value = e.target.textContent.trim();
    dispatch(setViewCount(value));
    setCurrentView(value);
  };

  const handleMostPrice = () => {
    dispatch(setMostPrice());
    setTimeout(() => {
      dispatch(fetchCartProducts());
    }, 400);
  };

  const handleLeastPrice = () => {
    dispatch(setLeastPrice());

    setTimeout(() => {
      dispatch(fetchCartProducts());
    }, 400);
  };

  // logic current categor
  const queryParams = location.search.substring(1);
  const categoryParams = new URLSearchParams(queryParams);
  const category = categoryParams.get('categories');

  const [isPhonesCategory, setIsPhonesCategory] = useState(true);

  const handleIsPhones = () => {
    setIsPhonesCategory(!isPhonesCategory);
  };

  React.useEffect(() => {
    if (category === 'phons') {
      setIsPhonesCategory(true);
    }
    if (category === 'accessories') {
      setIsPhonesCategory(false);
    }
  }, []);

  const isMobile = useMediaQuery('(max-width:1170px)');

  return (
    <Container maxWidth="lg">
      {' '}
      <div className={style.root}>
        <div
          style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
          }}
        >
          <h2 className={style.title}>All Category</h2>
          <div className={style.viewProdSetting}>
            <div>
              <span>View:</span>
              <button
                type="button"
                onClick={setViewProducts}
                style={{
                  textDecoration: currentView === '9' ? 'underline' : '',
                }}
              >
                9
              </button>
              <button
                type="button"
                onClick={setViewProducts}
                style={{
                  textDecoration: currentView === '15' ? 'underline' : '',
                }}
              >
                15
              </button>
              <button
                type="button"
                onClick={setViewProducts}
                style={{
                  textDecoration: currentView === '21' ? 'underline' : '',
                }}
              >
                21
              </button>
            </div>
            <div>
              <KeyboardDoubleArrowUpIcon onClick={handleMostPrice} />
              <span>Price</span>
              <KeyboardDoubleArrowDownIcon onClick={handleLeastPrice} />
            </div>
          </div>
        </div>
        <Grid display="flex" flexDirection={isMobile ? 'column' : 'row'}>
          <Grid marginRight={isMobile ? '' : 1} marginTop={1}>
            <div className={style.categoryContainer}>
              <button
                type="button"
                className={isPhonesCategory ? style.current : style.noCurrent}
                onClick={isPhonesCategory ? null : handleIsPhones}
              >
                phones
              </button>
              <button
                type="button"
                className={isPhonesCategory ? style.noCurrent : style.current}
                onClick={isPhonesCategory ? handleIsPhones : null}
              >
                accessories
              </button>
            </div>
            {isPhonesCategory ? <PhonesAccordion /> : <AccessoriesAccordion />}
          </Grid>
          {status === 'loading' ? (
            <Grid container spacing={1} marginTop={0} marginBottom={5}>
              {Array.from({ length: 9 }).map((_, index) => (
                <ListCardSkeleton key={index} />
              ))}
            </Grid>
          ) : (
            <>
              {prodQuantity ? (
                <Grid container spacing={1} margin="auto">
                  <div className={style.wrapper}>
                    <p>Ooops...</p>
                    <p>
                      There were no products with suitable filter settings, try
                      changing your search parameters.
                    </p>
                    <SentimentVeryDissatisfiedIcon fontSize="large" />
                  </div>
                </Grid>
              ) : (
                <Grid container spacing={1} marginTop={0} marginBottom="auto">
                  {prodArr.map((product, index) => (
                    <ListCard
                      product={product}
                      key={index}
                      imageUrl={product.imageUrls[0]}
                      name={product.name}
                      currentPrice={product.currentPrice}
                      itemNo={product.itemNo}
                    />
                  ))}
                </Grid>
              )}
              <div>{}</div>
            </>
          )}
        </Grid>
        <div style={{ marginTop: '20px' }}>
          <PaginationRounded />
        </div>
      </div>
    </Container>
  );
}

export default ItemsListPage;
