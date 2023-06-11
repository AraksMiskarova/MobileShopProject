import { React, useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { fetchUserData } from '../../redux/slices/registration';
import { fetchUserToken } from '../../redux/slices/authorization';

import style from './SigInPage.module.scss';

function SigInPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passError, setPassError] = useState([]);
  const [status, setStatus] = useState(false);
  const [pass, setPass] = useState();

  const onSubmit = async values => {
    setStatus(true);
    const data = await dispatch(fetchUserData(values));

    if (!data.payload) {
      setStatus(false);
      return setPassError(
        'Oooops,something went wrong, please try again later.',
      );
    }

    if (data.payload && data.payload.name === 'AxiosError') {
      if (data.payload.response && data.payload.response.data.password) {
        setPassError(data.payload.response.data.password);
      }
      if (data.payload.response && data.payload.response.data.firstName) {
        setPassError(data.payload.response.data.firstName);
      }
      if (data.payload.response && data.payload.response.data.lastName) {
        setPassError(data.payload.response.data.lastName);
      }
      if (data.payload.response && data.payload.response.data.message) {
        setPassError(data.payload.response.data.message);
      }
      if (data.payload.response && data.payload.response.data.login) {
        setPassError(data.payload.response.data.login);
      }
      return setStatus(false);
    }

    if (data.payload) {
      const logIn = async () => {
        const authData = await dispatch(
          fetchUserToken({
            loginOrEmail: data.payload.email,
            password: pass,
          }),
        );
        if (authData) {
          navigate('/');
          return window.localStorage.setItem('token', authData.payload);
        }
        setStatus(false);
      };
      logIn();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      login: '',
      lastName: '',
      firstName: '',
      email: '',
      password: '',
    },
    mode: 'onChange',
  });

  return (
    <div className={style.sigInBcgr}>
      <Paper className={style.sigInPage} elevation={0}>
        <Typography className={style.title} variant="h5">
          Create an account
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={style.avatar}>
            <Avatar sx={{ width: 100, height: 100 }} />
          </div>
          <TextField
            error={Boolean(errors.firstName?.message)}
            helperText={errors.firstName?.message}
            {...register('firstName', { required: 'Enter First Name' })}
            type="name"
            className={style.field}
            label="First Name"
            fullWidth
          />
          <TextField
            error={Boolean(errors.lastName?.message)}
            helperText={errors.lastName?.message}
            {...register('lastName', { required: 'Enter Last Name' })}
            type="name"
            className={style.field}
            label="Last Name"
            fullWidth
          />
          <TextField
            error={Boolean(errors.login?.message)}
            helperText={errors.login?.message}
            {...register('login', { required: 'Enter Login' })}
            type="login"
            className={style.field}
            label="Login"
            fullWidth
          />
          <TextField
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            type="email"
            {...register('email', { required: 'Enter e-mail' })}
            className={style.field}
            label="E-Mail"
            fullWidth
          />
          <TextField
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            type="password"
            {...register('password', { required: 'Enter password' })}
            className={style.field}
            label="Password"
            fullWidth
            onChange={e => setPass(e.target.value)}
          />
          <div
            className={
              passError.length === 0 ? style.errors_none : style.errors
            }
          >
            <p>{passError}</p>
          </div>
          <Button
            disabled={!isValid || status}
            type="submit"
            size="large"
            variant="contained"
            fullWidth
          >
            SiGN UP
          </Button>
        </form>
      </Paper>
    </div>
  );
}

export default SigInPage;
