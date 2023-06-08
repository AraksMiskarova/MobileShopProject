import { Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { customerState, getCustomers } from '../../../redux/slices/customer';
import style from '../ProductList/ProductList.module.scss';
import TableCustomers from './TableUser';

function ProductList() {
  const dispatch = useDispatch();
  const selectedCustomers = useSelector(customerState);

  useEffect(() => {
    dispatch(getCustomers());
  }, []);

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <Container maxWidth="lg" className={style.container}>
      {selectedCustomers.status === 'loading' && 'loading'}
      {selectedCustomers.customers && (
        // eslint-disable-next-line react/react-in-jsx-scope
        <TableCustomers items={selectedCustomers.customers} />
      )}
    </Container>
  );
}

export default ProductList;
