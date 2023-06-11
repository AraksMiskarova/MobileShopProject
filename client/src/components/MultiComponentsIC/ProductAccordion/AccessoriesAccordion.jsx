/* eslint-disable no-unused-vars */
import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { FormControlLabel, FormGroup, useMediaQuery } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Checkbox from '@mui/material/Checkbox';
import PriceSlider from '../../Smart/PriceSlider/PriceSliderAccessories';

import {
  filterProdState,
  fetchFilterAccessories,
  setMaxPrice,
  setMinPrice,
  setSelectPage,
  setViewCount,
  setMostPrice,
  setLeastPrice,
} from '../../../redux/slices/filterProducts';

import style from './ProductAccordion.module.scss';

function AccessoriesAccordion() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:1170px)');
  const [expanded, setExpanded] = useState(isMobile ? 1 : 0);

  // Getting current search parameters
  const queryParams = location.search.substring(1);

  // Pagination
  const { selectPage } = useSelector(filterProdState);
  const setPageOne = () => {
    dispatch(setSelectPage(1));
  };

  // filter brand
  const [selectCategories, setSelectCategories] = useState([]);

  const delSelectCategories = value => {
    const newSelectCategories = selectCategories.filter(
      categories => categories !== value,
    );
    setSelectCategories(newSelectCategories);
    setPageOne();
  };

  // filter color
  const [selectColor, setSelectColor] = useState([]);

  const delSelectColor = value => {
    const newSelectColor = selectColor.filter(color => color !== value);
    setSelectColor(newSelectColor);
    setPageOne();
  };

  // filter price
  const { filterMinPrice, filterMaxPrice } = useSelector(filterProdState);

  // filter ViewProducts
  const { viewCount, sortPrice } = useSelector(filterProdState);

  // create filter URL params
  const urlParams = new URLSearchParams();

  if (selectPage) {
    urlParams.set('startPage', selectPage);
  }

  if (selectCategories.length > 0) {
    urlParams.set('accessoriesCategories', selectCategories);
  }

  if (selectColor.length > 0) {
    urlParams.set('color', selectColor);
  }

  if (filterMinPrice) {
    urlParams.set('minPrice', filterMinPrice);
  }

  if (filterMaxPrice) {
    urlParams.set('maxPrice', filterMaxPrice);
  }

  if (viewCount) {
    urlParams.set('perPage', viewCount);
  }

  if (sortPrice) {
    urlParams.set('sort', sortPrice);
  }

  const url = decodeURIComponent(urlParams.toString().replace(/%2C/g, ','));

  // dispatch filter URL
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(fetchFilterAccessories(url));
      navigate(`/products/filter?categories=accessories&${url}`);
    }, 50);
    return () => clearTimeout(timer);
  }, [
    selectColor,
    selectCategories,
    filterMaxPrice,
    filterMinPrice,
    selectPage,
    viewCount,
    sortPrice,
  ]);

  // Implemented the ability to reuse the link without
  // losing the set parameters in the filter
  useEffect(() => {
    const params = new URLSearchParams(queryParams);

    const category = params.get('categories');
    if (category !== 'accessories') {
      return;
    }

    const color = params.get('color');
    const selCategory = params.get('accessoriesCategories');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const startPage = params.get('startPage');
    const viewProd = params.get('perPage');
    const sortView = params.get('sort');
    if (color) {
      const colorArr = color.split(',');
      setSelectColor(prevColorArr => prevColorArr.concat(colorArr));
    }
    if (selCategory) {
      const selCategoryArr = selCategory.split(',');
      setSelectCategories(prevCategoryArr =>
        prevCategoryArr.concat(selCategoryArr),
      );
    }
    if (minPrice) {
      dispatch(setMinPrice(minPrice));
    }
    if (maxPrice) {
      dispatch(setMaxPrice(maxPrice));
    }
    if (startPage) {
      dispatch(setSelectPage(startPage));
    }
    if (viewProd) {
      dispatch(setViewCount(viewProd));
    }
    if (sortView) {
      if (sortView === '-currentPrice') {
        dispatch(setLeastPrice());
      }
      if (sortView === '+currentPrice') {
        dispatch(setMostPrice());
      }
    }
  }, []);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <FormGroup>
      <div>
        <Accordion
          className={style.accordion}
          expanded={expanded === 0}
          onChange={handleChange(0)}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Accessories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Accordion
                className={style.accordion}
                expanded={expanded === 0}
                onChange={handleChange(0)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Catrgories</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Headphones"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectCategories([
                                  ...selectCategories,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectCategories(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Headphones')}
                          />
                        }
                        label="Headphones"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Charger"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectCategories([
                                  ...selectCategories,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectCategories(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Charger')}
                          />
                        }
                        label="Charger"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Cases"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectCategories([
                                  ...selectCategories,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectCategories(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Cases')}
                          />
                        }
                        label="Cases"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion
                className={style.accordion}
                expanded={expanded === 0}
                onChange={handleChange(0)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <PriceSlider />
                </AccordionDetails>
              </Accordion>
              <Accordion className={style.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Color</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="black"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectColor([...selectColor, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectColor(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('black')}
                          />
                        }
                        label="Black"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="white"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectColor([...selectColor, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectColor(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('white')}
                          />
                        }
                        label="White"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="other"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectColor([...selectColor, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectColor(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('other')}
                          />
                        }
                        label="Other"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </FormGroup>
  );
}

export default AccessoriesAccordion;
