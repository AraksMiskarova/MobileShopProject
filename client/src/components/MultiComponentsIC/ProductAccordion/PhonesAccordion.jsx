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
import PriceSlider from '../../Smart/PriceSlider/PriceSliderPhones';

import {
  filterProdState,
  fetchFilterPhones,
  setMaxPrice,
  setMinPrice,
  setSelectPage,
  setViewCount,
  setMostPrice,
  setLeastPrice,
} from '../../../redux/slices/filterProducts';

import style from './ProductAccordion.module.scss';

function PhonesAccordion() {
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
  const [selectBrand, setSelectBrand] = useState([]);

  const delSelectBrand = value => {
    const newSelectBrand = selectBrand.filter(brand => brand !== value);
    setSelectBrand(newSelectBrand);
    setPageOne();
  };

  // filter color
  const [selectColor, setSelectColor] = useState([]);

  const delSelectColor = value => {
    const newSelectColor = selectColor.filter(color => color !== value);
    setSelectColor(newSelectColor);
    setPageOne();
  };

  // filter display
  const [selectDisplay, setSelectDisplay] = useState([]);

  const delSelectDisplay = value => {
    const newSelectDisplay = selectDisplay.filter(display => display !== value);
    setSelectDisplay(newSelectDisplay);
    setPageOne();
  };

  // filter price
  const { filterMinPrice, filterMaxPrice } = useSelector(filterProdState);

  // filter memory
  const [selectMemory, setSelectMemory] = useState([]);

  const delSelectMemory = value => {
    const newSelectMemory = selectMemory.filter(memory => memory !== value);
    setSelectMemory(newSelectMemory);
    setPageOne();
  };

  // filter ViewProducts
  const { viewCount, sortPrice } = useSelector(filterProdState);

  // create filter URL params
  const urlParams = new URLSearchParams();

  if (selectPage) {
    urlParams.set('startPage', selectPage);
  }

  if (selectBrand.length > 0) {
    urlParams.set('brand', selectBrand);
  }

  if (selectColor.length > 0) {
    urlParams.set('color', selectColor);
  }

  if (selectDisplay.length > 0) {
    urlParams.set('display', selectDisplay);
  }

  if (filterMinPrice) {
    urlParams.set('minPrice', filterMinPrice);
  }

  if (filterMaxPrice) {
    urlParams.set('maxPrice', filterMaxPrice);
  }

  if (selectMemory.length > 0) {
    urlParams.set('memoryStorage', selectMemory);
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
      dispatch(fetchFilterPhones(url));
      navigate(`/products/filter?categories=phons&${url}`);
    }, 50);
    return () => clearTimeout(timer);
  }, [
    selectColor,
    selectBrand,
    selectDisplay,
    filterMaxPrice,
    filterMinPrice,
    selectPage,
    selectMemory,
    viewCount,
    sortPrice,
  ]);

  // Implemented the ability to reuse the link without
  // losing the set parameters in the filter
  useEffect(() => {
    const params = new URLSearchParams(queryParams);

    const category = params.get('categories');
    if (category !== 'phons') {
      return;
    }
    const color = params.get('color');
    const brand = params.get('brand');
    const display = params.get('display');
    const minPrice = params.get('minPrice');
    const maxPrice = params.get('maxPrice');
    const startPage = params.get('startPage');
    const memoryStorage = params.get('memoryStorage');
    const viewProd = params.get('perPage');
    const sortView = params.get('sort');
    if (color) {
      const colorArr = color.split(',');
      setSelectColor(prevColorArr => prevColorArr.concat(colorArr));
    }
    if (brand) {
      const brandArr = brand.split(',');
      setSelectBrand(prevBrandArr => prevBrandArr.concat(brandArr));
    }
    if (display) {
      const displayArr = display.split(',');
      setSelectDisplay(prevDispArr => prevDispArr.concat(displayArr));
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
    if (memoryStorage) {
      const memoryArr = memoryStorage.split(',');
      setSelectMemory(prevMemoryArr => prevMemoryArr.concat(memoryArr));
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
            <Typography>Phones</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Accordion
                className={style.accordion}
                expanded={expanded === 0}
                onChange={handleChange(0)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Brand</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Apple"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectBrand([...selectBrand, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectBrand(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Apple')}
                          />
                        }
                        label="Apple"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Samsung"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectBrand([...selectBrand, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectBrand(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Samsung')}
                          />
                        }
                        label="Samsung"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Huawei"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectBrand([...selectBrand, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectBrand(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Huawei')}
                          />
                        }
                        label="Huawei"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Xiaomi"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectBrand([...selectBrand, e.target.name]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectBrand(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Xiaomi')}
                          />
                        }
                        label="Xiaomi"
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
                  <Typography>Phone memory capacity</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="128"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectMemory([
                                  ...selectMemory,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectMemory(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('128')}
                          />
                        }
                        label="128GB"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="256"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectMemory([
                                  ...selectMemory,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectMemory(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('256')}
                          />
                        }
                        label="256GB"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="512"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectMemory([
                                  ...selectMemory,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectMemory(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('512')}
                          />
                        }
                        label="512GB"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                  </div>
                </AccordionDetails>
              </Accordion>
              <Accordion className={style.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Display</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <div className={style.checkbox}>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="LCD"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectDisplay([
                                  ...selectDisplay,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectDisplay(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('LCD')}
                          />
                        }
                        label="LCD"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Organic"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectDisplay([
                                  ...selectDisplay,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectDisplay(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Organic')}
                          />
                        }
                        label="OLED"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="AMOLED"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectDisplay([
                                  ...selectDisplay,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectDisplay(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('AMOLED')}
                          />
                        }
                        label="AMOLED"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                    <span>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="Retina"
                            inputProps={{ 'aria-label': 'Checkbox demo' }}
                            onChange={e => {
                              if (e.target.checked) {
                                setSelectDisplay([
                                  ...selectDisplay,
                                  e.target.name,
                                ]);
                                setPageOne();
                              }
                              if (!e.target.checked) {
                                delSelectDisplay(e.target.name);
                              }
                            }}
                            checked={queryParams.includes('Retina')}
                          />
                        }
                        label="Retina"
                        style={{ marginLeft: '0px' }}
                      />
                    </span>
                  </div>
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

export default PhonesAccordion;
