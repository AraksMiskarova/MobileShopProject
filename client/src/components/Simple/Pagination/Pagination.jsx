import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import {
  filterProdState,
  setSelectPage,
} from '../../../redux/slices/filterProducts';

function PaginationRounded() {
  const dispatch = useDispatch();
  const [pageTotal, setPageTotal] = useState(null);
  const { products, status, selectPage } = useSelector(filterProdState);

  const handlePageChange = (event, value) => {
    dispatch(setSelectPage(value));
  };

  useEffect(() => {
    if (status === 'loaded') {
      const pageQuantity = Math.ceil(products.productsQuantity / 9);
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
        style={{ marginLeft: 'auto', marginRight: 'auto', marginBottom: 20 }}
      />
    </Stack>
  );
}

export default PaginationRounded;
