import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
// TODO: use module.scss
const CardWrapper = styled(Box)`
  width: 100%;
  max-width: 520px;
  height: 240px;
  margin: 20px auto;
  position: relative;
`;
const CardBack = styled(Box)`
  width: 100%;
  max-width: 400px;
  height: 220px;
  border: 1px solid grey;
  border-radius: 15px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: #ececec;
  @media (max-width: 570px) {
    bottom: -55px;
  }
`;
const CardBackLine = styled(Box)`
  width: 100%;
  height: 60px;
  background: #c0c0c0;
  position: absolute;
  top: 30px;
`;
const CardBackCvv = styled(Box)`
  position: absolute;
  right: 18px;
  bottom: 20px;
  width: 100px;
  padding: 5px;
`;
const CardFront = styled(Grid)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 220px;
  border: 1px solid grey;
  border-radius: 15px;
  position: absolute;
  background: #ececec;
  padding: 5px 5px 20px 5px;
`;
const CardFrontNumber = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin: 0 16px;
`;

function PaymentCard() {
  const [isNumberError, setIsNumberError] = useState(false);
  const [isMounthError, setIsMounthError] = useState(false);
  const [isYearError, setIsYearError] = useState(false);
  const [isCvvError, setIsCvvError] = useState(false);

  const handleChangeNumber = value => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(value) && value.length === 4) {
      setIsNumberError(false);
    } else {
      setIsNumberError(true);
    }
  };

  const handleChangeMounth = value => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(value) && value.length === 2) {
      setIsMounthError(false);
    } else {
      setIsMounthError(true);
    }
  };
  const handleChangeYear = value => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(value) && value.length === 2) {
      setIsYearError(false);
    } else {
      setIsYearError(true);
    }
  };
  const handleChangeCvv = value => {
    const regex = /^[0-9\b]+$/;
    if (regex.test(value) && value.length === 3) {
      setIsCvvError(false);
    } else {
      setIsCvvError(true);
    }
  };

  const isMobile = useMediaQuery('(max-width:570px)');

  return (
    <CardWrapper>
      <CardBack>
        <CardBackLine />
        <CardBackCvv>
          <Typography
            variant="p"
            sx={{
              color: '#000000',
              fontSize: '14px',
              textTransform: 'uppercase',
            }}
          >
            CVV/CVC
          </Typography>
          <TextField
            sx={{
              width: '100%',
              textAlign: 'center',
              position: 'relative',
              '& input': {
                textAlign: 'center',
                padding: '5px',
              },
            }}
            FormHelperTextProps={{
              style: {
                width: '91px',
                textAlign: 'center',
                fontSize: isMobile ? '10px' : '12px',
                position: 'absolute',
                top: '29px',
                marginLeft: '0px',
              },
            }}
            name="inputCvv"
            variant="outlined"
            error={isCvvError}
            helperText={isCvvError ? 'Enter number!' : ''}
            onChange={e => handleChangeCvv(e.target.value)}
            InputProps={{
              inputProps: {
                pattern: '[0-9]*',
                inputMode: 'numeric',
                maxLength: 3,
              },
            }}
          />
        </CardBackCvv>
      </CardBack>
      <CardFront container spacing={2}>
        <Grid item xs={12} style={{ paddingTop: '0px', paddingLeft: '0px' }}>
          <CardFrontNumber>
            <Typography
              variant="p"
              sx={{
                color: '#000000',
                fontSize: '14px',
                textTransform: 'uppercase',
              }}
            >
              Card Number
            </Typography>
            <Stack
              spacing={2}
              direction="row"
              display="flex"
              alignItems="center"
            >
              <img
                style={{ width: isMobile ? '30px' : '50px', margin: '0px' }}
                src="/img_payment/mastercard.png"
                alt="mastercard_logo"
              />
              <img
                style={{ width: isMobile ? '30px' : '50px', margin: '0px' }}
                src="/img_payment/visa.png"
                alt="visa_logo"
              />
              <img
                style={{ width: isMobile ? '30px' : '50px', marginLeft: '5px' }}
                src="/img_payment/maestro.png"
                alt="maestro_logo"
              />
            </Stack>
          </CardFrontNumber>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Grid item xs={2}>
              <TextField
                FormHelperTextProps={{
                  style: {
                    width: isMobile ? '235px' : '330px',
                    textAlign: 'center',
                    fontSize: isMobile ? '10px' : '12px',
                    position: 'absolute',
                    top: '29px',
                  },
                }}
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  position: 'relative',
                  '& input': {
                    textAlign: 'center',
                    padding: '5px',
                  },
                }}
                name="cardNumber"
                variant="outlined"
                error={isNumberError}
                helperText={isNumberError ? 'Enter number!' : ''}
                onChange={e => handleChangeNumber(e.target.value)}
                InputProps={{
                  inputProps: {
                    pattern: '[0-9]*',
                    inputMode: 'numeric',
                    maxLength: 4,
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  '& input': {
                    textAlign: 'center',
                    padding: '5px',
                  },
                }}
                name="cardNumber"
                variant="outlined"
                error={isNumberError}
                onChange={e => handleChangeNumber(e.target.value)}
                InputProps={{
                  inputProps: {
                    pattern: '[0-9]*',
                    inputMode: 'numeric',
                    maxLength: 4,
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  '& input': {
                    textAlign: 'center',
                    padding: '5px',
                  },
                }}
                name="cardNumber"
                variant="outlined"
                error={isNumberError}
                onChange={e => handleChangeNumber(e.target.value)}
                InputProps={{
                  inputProps: {
                    pattern: '[0-9]*',
                    inputMode: 'numeric',
                    maxLength: 4,
                  },
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={{
                  width: '100%',
                  textAlign: 'center',
                  '& input': {
                    textAlign: 'center',
                    padding: '5px',
                  },
                }}
                name="cardNumber"
                variant="outlined"
                error={isNumberError}
                onChange={e => handleChangeNumber(e.target.value)}
                InputProps={{
                  inputProps: {
                    pattern: '[0-9]*',
                    inputMode: 'numeric',
                    maxLength: 4,
                  },
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ paddingTop: '0px', paddingLeft: '0px' }}>
          <Typography
            variant="p"
            sx={{
              display: 'block',
              margin: 'auto',
              marginTop: '25px',
              color: '#000000',
              fontSize: '14px',
              width: '135px',
              textTransform: 'uppercase',
            }}
          >
            Valid thru
          </Typography>
        </Grid>
        <Grid item xs={2} style={{ paddingTop: '0px', paddingLeft: '0px' }}>
          <Typography
            variant="p"
            sx={{
              color: '#000000',
              fontSize: '12px',
              textTransform: 'uppercase',
            }}
          >
            Mounth
          </Typography>
          <TextField
            sx={{
              position: 'relative',
              width: '100%',
              textAlign: 'center',
              '& input': {
                textAlign: 'center',
                padding: '5px',
              },
            }}
            FormHelperTextProps={{
              style: {
                textAlign: 'center',
                marginTop: '5px',
                fontSize: isMobile ? '10px' : '12px',
                width: '91px',
                marginRight: '13px',
                marginInline: isMobile ? '-21px' : '-13px',
                position: 'absolute',
                top: '29px',
              },
            }}
            name="Mounth"
            variant="outlined"
            error={isMounthError}
            helperText={isMounthError ? 'Enter number!' : ''}
            onChange={e => handleChangeMounth(e.target.value)}
            InputProps={{
              inputProps: {
                pattern: '[0-9]*',
                inputMode: 'numeric',
                maxLength: 2,
              },
            }}
          />
        </Grid>
        <Grid item xs={2} style={{ paddingTop: '0px', paddingLeft: '0px' }}>
          <Typography
            variant="p"
            sx={{
              color: '#000000',
              fontSize: '12px',
              textTransform: 'uppercase',
            }}
          >
            Year
          </Typography>
          <TextField
            sx={{
              position: 'relative',
              width: '100%',
              textAlign: 'center',
              '& input': {
                textAlign: 'center',
                padding: '5px',
              },
            }}
            FormHelperTextProps={{
              style: {
                textAlign: 'center',
                marginTop: '5px',
                fontSize: isMobile ? '10px' : '12px',
                width: '91px',
                marginRight: '13px',
                marginInline: isMobile ? '-21px' : '-13px',
                position: 'absolute',
                top: '29px',
              },
            }}
            name="Year"
            variant="outlined"
            error={isYearError}
            helperText={isYearError ? 'Enter number!' : ''}
            onChange={e => handleChangeYear(e.target.value)}
            InputProps={{
              inputProps: {
                pattern: '[0-9]*',
                inputMode: 'numeric',
                maxLength: 4,
              },
            }}
          />
        </Grid>
      </CardFront>
    </CardWrapper>
  );
}
export default PaymentCard;
