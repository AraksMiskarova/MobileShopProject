import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { stateSelectedProducts } from '../../../redux/slices/cartLocal';
import { fetchFilterPhones } from '../../../redux/slices/filterProducts';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function ProductList({ value }) {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(stateSelectedProducts);
  const urlParams = new URLSearchParams();

  useEffect(() => {
    const url = decodeURIComponent(urlParams.toString().replace(/%2C/g, ','));
    dispatch(fetchFilterPhones(url));
  }, []);

  console.log('selectedProducts', selectedProducts);

  return (
    <TabPanel value={value} index={value}>
      {selectedProducts.length && JSON.parse(selectedProducts)}
    </TabPanel>
  );
}

ProductList.propTypes = {
  value: PropTypes.number.isRequired,
};

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default ProductList;
