import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  setMinPrice,
  setMaxPrice,
  setSelectPage,
} from '../../../redux/slices/filterProducts';

export default function NonLinearSlider() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = location.search.substring(1);

  const [rangeValues, setRangeValues] = React.useState([]);

  const categoryParams = new URLSearchParams(queryParams);
  const category = categoryParams.get('categories');

  // Resetting the slider when switching to another route
  React.useEffect(() => {
    dispatch(setMinPrice(4));
    dispatch(setMaxPrice(1000));
    setRangeValues([4, 1000]);
  }, [location.pathname, category]);

  // Getting value from search parameters
  React.useEffect(() => {
    const params = new URLSearchParams(queryParams);
    const minQuery = params.get('minPrice');
    const maxQuery = params.get('maxPrice');
    const minPrice = minQuery === null ? 4 : Number(minQuery);
    const maxPrice = maxQuery === null ? 1000 : Number(maxQuery);
    setRangeValues([minPrice, maxPrice]);
  }, [queryParams]);

  const handleChange = (event, newValue) => {
    setRangeValues([newValue[0], newValue[1]]);
  };

  const handleChangeCommitted = (event, newValue) => {
    dispatch(setMinPrice(newValue[0]));
    dispatch(setMaxPrice(newValue[1]));
    dispatch(setSelectPage(1));
  };

  return (
    <Box sx={{ width: 230 }}>
      <Typography id="slider">{`${rangeValues[0]}USD - ${rangeValues[1]}USD`}</Typography>
      <Slider
        value={rangeValues}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        valueLabelDisplay="auto"
        marks={false}
        min={4}
        step={24}
        max={1000}
        aria-labelledby="slider"
      />
    </Box>
  );
}
