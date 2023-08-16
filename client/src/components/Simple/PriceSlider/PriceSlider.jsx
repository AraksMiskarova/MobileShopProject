import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import * as React from 'react';

import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  setMaxPrice,
  setMinPrice,
  setSelectPage,
} from '../../../redux/slices/filterProducts';

// TODO: not correct using "* React"

export default function NonLinearSlider() {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = location.search.substring(1);

  const [rangeValues, setRangeValues] = React.useState([]);

  // Resetting the slider when switching to another route
  React.useEffect(() => {
    dispatch(setMinPrice(400));
    dispatch(setMaxPrice(2000));
    setRangeValues([400, 2000]);
  }, [location.pathname]);

  // Getting value from search parameters
  React.useEffect(() => {
    const params = new URLSearchParams(queryParams);
    const minQuery = params.get('minPrice');
    const maxQuery = params.get('maxPrice');
    const minPrice = minQuery === null ? 400 : Number(minQuery);
    const maxPrice = maxQuery === null ? 2000 : Number(maxQuery);
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
        min={400}
        step={200}
        max={2000}
        aria-labelledby="slider"
      />
    </Box>
  );
}
