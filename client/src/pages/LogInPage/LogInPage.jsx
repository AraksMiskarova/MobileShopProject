import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserToken } from '../../redux/slices/authorization';

import { fetchCartProducts } from '../../redux/slices/cartBackEnd';
import { fetchCustomerData } from '../../redux/slices/customer';
import style from './LogInpage.module.scss';

function LogInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passError, setPassError] = useState([]);
  const [status, setStatus] = useState(false);

  const onSubmit = async values => {
    setStatus(true);
    const data = await dispatch(fetchUserToken(values));
    if (!data.payload) {
      setStatus(false);
      return setPassError(
        'Oooops,something went wrong, please try again later.',
      );
    }

    if (data.payload && data.payload.name === 'AxiosError') {
      setStatus(false);
      return setPassError('Invalid Login, Email or Password');
    }

    if (data.payload) {
      setStatus(false);
      window.localStorage.setItem('token', data.payload);
      dispatch(fetchCustomerData())
        .then(customer => {
          dispatch(fetchCartProducts());
          const customerData = JSON.stringify(customer.payload._id);
          window.localStorage.setItem('customer', customerData);
          navigate('/');
        })
        .catch(error => {
          console.warn('Error fetching customer data:', error);
        });
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      loginOrEmail: 'test@test.ua',
      password: '1234567',
    },
    mode: 'onChange',
  });

  return (
    <div className={style.logInBcgr}>
      <Paper className={style.logInPage} elevation={0}>
        <Typography
          className={style.title}
          style={{ marginBottom: 30 }}
          variant="p"
        >
          Account login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            className={style.field}
            label="E-Mail"
            error={Boolean(errors.loginOrEmail?.message)}
            helperText={errors.loginOrEmail?.message}
            {...register('loginOrEmail', { required: 'Enter your email' })}
            fullWidth
          />
          <TextField
            className={style.field}
            label="Password"
            fullWidth
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Enter your password' })}
          />
          <div
            className={
              passError.length === 0 ? style.errors_none : style.errors
            }
          >
            <p>{passError}</p>
          </div>
          <Button
            type="submit"
            size="large"
            variant="contained"
            fullWidth
            disabled={!isValid || status}
          >
            Log In
          </Button>
        </form>
        <NavLink to="/signup">
          <Button type="button" size="small" variant="contained">
            Sign UP
          </Button>
        </NavLink>
      </Paper>
    </div>
  );
}

export default LogInPage;
