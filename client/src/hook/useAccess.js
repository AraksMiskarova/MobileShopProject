import { useSelector } from 'react-redux';
import { customerState } from '../redux/slices/customer';

export const useAccess = () => {
  const customer = useSelector(customerState);

  const getCustomerInState = () => {
    return customer;
  };

  const isAdmin = () => {
    // eslint-disable-next-line no-unused-expressions
    return customer?.customer?.isAdmin;
  };

  return { getCustomerInState, isAdmin };
};
