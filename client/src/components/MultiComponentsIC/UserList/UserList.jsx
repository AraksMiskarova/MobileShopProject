import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { customerState, getCustomers } from '../../../redux/slices/customer';
import style from '../ProductList/ProductList.module.scss';
import TableUsers from './TableUser';

function ProductList() {
  const dispatch = useDispatch();
  const selectedProducts = useSelector(customerState);
  const urlParams = new URLSearchParams();

  useEffect(() => {
    const url = decodeURIComponent(urlParams.toString().replace(/%2C/g, ','));
    dispatch(getCustomers(url));
  }, []);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Container maxWidth="lg" className={style.container}>
      {!selectedProducts?.products?.products && 'loading'}
      {selectedProducts?.products?.products && (
        // eslint-disable-next-line react/react-in-jsx-scope
        <TableUsers items={[]} />
      )}
    </Container>
  );
}

export default ProductList;
