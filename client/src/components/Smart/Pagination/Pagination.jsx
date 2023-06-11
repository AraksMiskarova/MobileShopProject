import { React, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  filterProdState,
  setSelectPage,
} from '../../../redux/slices/filterProducts';
import { fetchCartProducts } from '../../../redux/slices/cartBackEnd';

function PaginationRounded() {
  const dispatch = useDispatch();
  const [pageTotal, setPageTotal] = useState(null);
  const { products, status, selectPage, viewCount } =
    useSelector(filterProdState);

  const handlePageChange = (event, value) => {
    dispatch(setSelectPage(value));
    if (status === 'loaded') {
      setTimeout(() => {
        dispatch(fetchCartProducts());
      }, 400);
    }
  };

  useEffect(() => {
    if (status === 'loaded') {
      const pageQuantity =
        viewCount === 'all'
          ? 1
          : Math.ceil(products.productsQuantity / viewCount);
      setPageTotal(pageQuantity);
    }
  }, [status]);

  return (
    <Stack spacing={2}>
      <Pagination
        page={parseInt(selectPage, 10)}
        count={pageTotal ?? 1}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        size="small"
        showFirstButton
        showLastButton
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 20,
          display: viewCount === 'all' ? 'none' : '',
        }}
      />
    </Stack>
  );
}

export default PaginationRounded;
